#!/usr/bin/env python3
"""Offline-first local documentation cache for AI context.

Stdlib-only CLI (no third-party dependencies). Fetches documentation pages
from a fixed allowlist of exact official public documentation URLs, stores
them under ``.cache/ai-context`` and serves them back without re-downloading
while the cache entry is fresh (TTL: 7 days).

Usage:
    python scripts/ai_context.py list
    python scripts/ai_context.py fetch NAME [--refresh]
    python scripts/ai_context.py show NAME

Options:
    --cache-dir DIR   Override the cache directory (default: .cache/ai-context)

Safety rules enforced:
    - Only allowlisted exact URLs are fetched; arbitrary URLs are rejected.
    - No custom headers and no credentials are ever sent.
    - Redirects are followed only when they stay HTTPS on the same host.
    - Responses larger than 2 MiB are rejected.
    - Nothing is silently served stale: an expired cache is a clear error
      unless a successful refresh happens.
    - Cache writes are atomic: body + metadata live in a single JSON file
      written via temp file + os.replace.
    - The tool never bulk-loads cached docs; content is only printed on an
      explicit ``show NAME``.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CACHE_DIR = os.path.join(".cache", "ai-context")
CACHE_VERSION = 1
TTL_DAYS = 7
TTL = timedelta(days=TTL_DAYS)
TIMEOUT_SECONDS = 15
MAX_RESPONSE_BYTES = 2 * 1024 * 1024  # 2 MiB

# Allowlist: exact official public documentation URLs (no wildcards).
# Keys are short CLI names; values are exact URLs that are fetched verbatim.
ALLOWLIST = {
    "react": "https://react.dev/reference/react",
    "typescript": "https://www.typescriptlang.org/docs/handbook/basic-types.html",
    "vite": "https://vite.dev/guide/",
    "spring-boot": "https://docs.spring.io/spring-boot/docs/3.2.5/reference/html/index.html",
    "java-17": "https://docs.oracle.com/en/java/javase/17/docs/api/index.html",
    "fastapi": "https://fastapi.tiangolo.com/tutorial/",
    "opencode-config": "https://opencode.ai/v2/docs/config/",
    "opencode-plugins": "https://opencode.ai/v2/docs/build/plugins/",
}


class AiContextError(Exception):
    """Base error for this tool; message is safe to show to the user."""


class InvalidNameError(AiContextError):
    """Requested name is not in the allowlist (or unsafe as a filename)."""


class StaleCacheError(AiContextError):
    """Cached entry exists but is older than the TTL and network failed."""


class CacheCorruptError(AiContextError):
    """Cached entry failed integrity verification (hash mismatch)."""


class FetchError(AiContextError):
    """Network-level failure (DNS, timeout, HTTP status, size, redirect)."""


# ---------------------------------------------------------------------------
# Cache layout (single JSON file per name: metadata + body, atomic write)
# ---------------------------------------------------------------------------


def _safe_name(name: str) -> str:
    """Validate a name so the cache filename can never escape the cache dir."""
    allowed = set("abcdefghijklmnopqrstuvwxyz0123456789-._")
    if not name or any(c not in allowed for c in name):
        raise InvalidNameError(
            f"invalid name {name!r}: use lowercase letters, digits, '-', '.', '_'"
        )
    return name


def allowlisted_url(name: str) -> str:
    """Return the exact allowlisted URL for a name or raise InvalidNameError."""
    if name not in ALLOWLIST:
        known = ", ".join(sorted(ALLOWLIST))
        raise InvalidNameError(
            f"unknown name {name!r}; known names: {known}"
        )
    _safe_name(name)
    return ALLOWLIST[name]


def cache_path(name: str, cache_dir: str | None = None) -> str:
    """Path of the JSON cache file for a name."""
    return os.path.join(cache_dir or CACHE_DIR, f"{_safe_name(name)}.json")


def load_entry(name: str, cache_dir: str | None = None) -> dict | None:
    """Load a cache entry (metadata + body); None if missing or unreadable."""
    path = cache_path(name, cache_dir)
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as handle:
            entry = json.load(handle)
    except (OSError, json.JSONDecodeError):
        return None
    return entry if isinstance(entry, dict) else None


def store_entry_atomic(name: str, entry: dict, cache_dir: str | None = None) -> str:
    """Atomically write one JSON file containing body + metadata."""
    directory = cache_dir or CACHE_DIR
    os.makedirs(directory, exist_ok=True)
    path = cache_path(name, directory)
    fd, tmp_path = tempfile.mkstemp(dir=directory, prefix=".tmp-", suffix=".json")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(entry, handle)
        os.replace(tmp_path, path)  # atomic on POSIX and Windows
    except BaseException:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise
    return path


# ---------------------------------------------------------------------------
# Timestamps, hashing, freshness
# ---------------------------------------------------------------------------


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_now_iso() -> str:
    return utc_now().isoformat()


def parse_timestamp(value: str | None) -> datetime | None:
    """Parse a stored ISO-8601 timestamp; None if missing/invalid."""
    if not value or not isinstance(value, str):
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def sha256_hex(body: str) -> str:
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


def is_stale(entry: dict | None, now: datetime | None = None) -> bool:
    """True when the entry is missing, has bad metadata, or is past the TTL."""
    if entry is None:
        return True
    fetched = parse_timestamp(entry.get("fetched"))
    if fetched is None:
        return True
    if now is None:
        now = utc_now()
    return fetched > now or (now - fetched) >= TTL


def format_age(entry: dict, now: datetime | None = None) -> str:
    """Human-readable age of a cache entry."""
    fetched = parse_timestamp(entry.get("fetched"))
    if fetched is None:
        return "unknown age"
    seconds = max(0, int(((now or utc_now()) - fetched).total_seconds()))
    days, rest = divmod(seconds, 86400)
    hours, rest = divmod(rest, 3600)
    minutes = rest // 60
    if days:
        return f"{days}d {hours}h"
    if hours:
        return f"{hours}h {minutes}m"
    return f"{minutes}m"


# ---------------------------------------------------------------------------
# HTTP (allowlisted URL only, no custom headers, safe redirects, size cap)
# ---------------------------------------------------------------------------


def redirect_allowed(new_url: str, current_url: str) -> bool:
    """Only HTTPS redirects to the exact same host (netloc) are allowed."""
    new_parsed = urllib.parse.urlparse(new_url)
    current_parsed = urllib.parse.urlparse(current_url)
    return (
        new_parsed.scheme == "https"
        and new_parsed.netloc != ""
        and new_parsed.netloc.lower() == current_parsed.netloc.lower()
    )


class SafeRedirectHandler(urllib.request.HTTPRedirectHandler):
    """urllib redirect handler that rejects non-HTTPS or cross-host hops."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not redirect_allowed(newurl, req.full_url):
            raise urllib.error.HTTPError(
                req.full_url,
                code,
                f"redirect to {newurl} rejected (only https same-host redirects allowed)",
                headers,
                fp,
            )
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def build_opener() -> urllib.request.OpenerDirector:
    # Ignore environment proxies, which may carry credentials. No auth/cookie
    # handlers are installed, and Request receives no user-provided headers.
    return urllib.request.build_opener(
        urllib.request.ProxyHandler({}), SafeRedirectHandler()
    )


def decode_response(resp, request_url: str) -> tuple[str, str]:
    """Read a response with the 2 MiB cap and validate the final URL."""
    final_url = resp.geturl()
    final_parsed = urllib.parse.urlparse(final_url)
    request_parsed = urllib.parse.urlparse(request_url)
    if final_parsed.scheme != "https":
        raise FetchError(f"final URL is not https: {final_url}")
    if final_parsed.netloc.lower() != request_parsed.netloc.lower():
        raise FetchError(f"redirected off-host to {final_url}")
    data = resp.read(MAX_RESPONSE_BYTES + 1)
    if len(data) > MAX_RESPONSE_BYTES:
        raise FetchError(
            f"response from {final_url} exceeds {MAX_RESPONSE_BYTES} byte limit"
        )
    return data.decode("utf-8", errors="replace"), final_url


def http_get(url: str, timeout: int = TIMEOUT_SECONDS) -> tuple[str, str]:
    """GET an allowlisted URL. Returns (body_text, final_url).

    Sends no custom headers and no credentials.
    """
    if url not in ALLOWLIST.values():
        raise FetchError("URL is not allowlisted")
    request = urllib.request.Request(url, method="GET")
    try:
        with build_opener().open(request, timeout=timeout) as response:
            return decode_response(response, url)
    except urllib.error.HTTPError as exc:
        exc.close()
        raise FetchError(f"HTTP {exc.code} for {url}: {exc.reason}") from exc
    except urllib.error.URLError as exc:
        raise FetchError(f"network error for {url}: {exc.reason}") from exc
    except OSError as exc:
        raise FetchError(f"network error for {url}: {exc}") from exc


# ---------------------------------------------------------------------------
# Core operations
# ---------------------------------------------------------------------------


def verify_entry(name: str, entry: dict) -> None:
    """Raise CacheCorruptError if the stored body does not match its hash."""
    if (
        entry.get("url") != allowlisted_url(name)
        or entry.get("name") != name
        or entry.get("cache_version") != CACHE_VERSION
    ):
        raise CacheCorruptError(f"{name}: invalid cache provenance; fetch --refresh")
    body = entry.get("body")
    stored_hash = entry.get("sha256")
    if not isinstance(body, str) or not isinstance(stored_hash, str):
        raise CacheCorruptError(f"{name}: cache entry is missing body or hash")
    if sha256_hex(body) != stored_hash:
        raise CacheCorruptError(
            f"{name}: cache hash mismatch (corrupted); re-run fetch {name} --refresh"
        )


def fetch(
    name: str,
    refresh: bool = False,
    cache_dir: str | None = None,
    now: datetime | None = None,
) -> tuple[dict, bool]:
    """Fetch a doc into the cache. Returns (entry, served_from_cache).

    - Fresh cache + no --refresh: serve cache, no network.
    - Otherwise: fetch from the allowlisted URL.
    - Network failure with stale/missing cache: clear error, never stale data.
    """
    url = allowlisted_url(name)
    existing = load_entry(name, cache_dir)
    if existing is not None and not refresh and not is_stale(existing, now):
        verify_entry(name, existing)
        return existing, True

    try:
        body, final_url = http_get(url)
    except FetchError as exc:
        if existing is None:
            raise AiContextError(
                f"{name}: network fetch failed ({exc}) and no cached copy exists; "
                f"retry when online."
            ) from exc
        if is_stale(existing, now):
            raise StaleCacheError(
                f"{name}: network fetch failed ({exc}); cached copy from "
                f"{existing.get('fetched', '?')} exceeds the {TTL_DAYS}-day TTL — "
                f"refusing to serve stale content, retry when online."
            ) from exc
        raise AiContextError(
            f"{name}: network fetch failed ({exc}); keeping the existing fresh "
            f"cache from {existing.get('fetched', '?')} (use 'show {name}')."
        ) from exc

    entry = {
        "name": name,
        "url": url,
        "final_url": final_url,
        "fetched": utc_now_iso(),  # UTC ISO-8601
        "sha256": sha256_hex(body),
        "bytes": len(body.encode("utf-8")),
        "ttl_days": TTL_DAYS,
        "cache_version": CACHE_VERSION,
        "body": body,
    }
    store_entry_atomic(name, entry, cache_dir)
    return entry, False


def show(name: str, cache_dir: str | None = None, now: datetime | None = None) -> dict:
    """Return a cached entry; clear errors when missing, corrupt or stale."""
    allowlisted_url(name)
    entry = load_entry(name, cache_dir)
    if entry is None:
        raise AiContextError(
            f"{name}: not cached; run 'python scripts/ai_context.py fetch {name}'"
        )
    verify_entry(name, entry)
    if is_stale(entry, now):
        raise StaleCacheError(
            f"{name}: cache is stale (fetched {entry.get('fetched', '?')}, "
            f"TTL {TTL_DAYS} days); run 'python scripts/ai_context.py fetch "
            f"{name} --refresh'"
        )
    return entry


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def cmd_list(cache_dir: str | None) -> int:
    for name in sorted(ALLOWLIST):
        url = ALLOWLIST[name]
        entry = load_entry(name, cache_dir)
        if entry is None:
            state = "not cached"
        elif is_stale(entry):
            state = f"stale (fetched {entry.get('fetched', '?')})"
        else:
            state = f"fresh (fetched {format_age(entry)} ago)"
        print(f"{name:20} {url}  [{state}]")
    print(
        f"\n{len(ALLOWLIST)} allowlisted docs; TTL {TTL_DAYS} days; "
        "use 'fetch NAME [--refresh]' then 'show NAME'."
    )
    return 0


def cmd_fetch(name: str, refresh: bool, cache_dir: str | None) -> int:
    entry, from_cache = fetch(name, refresh=refresh, cache_dir=cache_dir)
    if from_cache:
        print(
            f"up-to-date: {name} (fetched {format_age(entry)} ago, "
            f"TTL {TTL_DAYS}d); use --refresh to force re-fetch."
        )
    else:
        print(
            f"cached: {name} from {entry['final_url']} "
            f"({entry['bytes']} bytes, sha256 {entry['sha256'][:12]}...)"
        )
    return 0


def cmd_show(name: str, cache_dir: str | None) -> int:
    entry = show(name, cache_dir=cache_dir)
    print(entry["body"])
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="ai_context",
        description="Allowlisted offline documentation cache (stdlib only).",
    )
    parser.add_argument(
        "--cache-dir",
        default=CACHE_DIR,
        help=f"cache directory (default: {CACHE_DIR})",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list", help="list allowlisted doc names and URLs")

    fetch_parser = subparsers.add_parser("fetch", help="fetch a doc into the cache")
    fetch_parser.add_argument("name", help="allowlisted doc name (see 'list')")
    fetch_parser.add_argument(
        "--refresh",
        action="store_true",
        help="re-fetch even if the cached entry is still fresh",
    )

    show_parser = subparsers.add_parser("show", help="print a cached doc")
    show_parser.add_argument("name", help="allowlisted doc name (see 'list')")

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.command == "list":
            return cmd_list(args.cache_dir)
        if args.command == "fetch":
            return cmd_fetch(args.name, args.refresh, args.cache_dir)
        if args.command == "show":
            return cmd_show(args.name, args.cache_dir)
    except InvalidNameError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    except AiContextError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    parser.error(f"unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
