"""Offline tests: python3 -m unittest discover -s tests -p test_ai_context.py."""

import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from unittest.mock import Mock, patch
import urllib.error
import urllib.request


SPEC = importlib.util.spec_from_file_location(
    "ai_context", Path(__file__).resolve().parents[1] / "scripts" / "ai_context.py"
)
ai_context = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ai_context)


class CacheTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.cache = self.directory.name
        self.now = datetime(2026, 9, 17, tzinfo=timezone.utc)
        clock = patch.object(ai_context, "utc_now", return_value=self.now)
        clock.start()
        self.addCleanup(clock.stop)
        # All core-operation tests are offline, including unexpected fetches.
        network = patch.object(ai_context, "http_get", side_effect=ai_context.FetchError("offline"))
        self.network = network.start()
        self.addCleanup(network.stop)

    def seed(self, age=timedelta(0)):
        entry = {
            "name": "react",
            "url": ai_context.ALLOWLIST["react"],
            "final_url": ai_context.ALLOWLIST["react"],
            "fetched": (self.now - age).isoformat(),
            "sha256": ai_context.sha256_hex("cached body"),
            "ttl_days": 7,
            "cache_version": 1,
            "body": "cached body",
        }
        ai_context.store_entry_atomic("react", entry, self.cache)
        return entry

    def test_fresh_fetch_uses_cache_without_network(self):
        self.seed(timedelta(days=6, hours=23, minutes=59))
        entry, cached = ai_context.fetch("react", cache_dir=self.cache)
        self.assertTrue(cached)
        self.assertEqual(entry["body"], "cached body")
        self.network.assert_not_called()

    def test_ttl_boundary_and_future_timestamp(self):
        entry = self.seed(timedelta(days=7))
        self.assertTrue(ai_context.is_stale(entry, self.now))
        entry["fetched"] = (self.now - timedelta(days=7) + timedelta(microseconds=1)).isoformat()
        self.assertFalse(ai_context.is_stale(entry, self.now))
        entry["fetched"] = (self.now + timedelta(seconds=1)).isoformat()
        self.assertTrue(ai_context.is_stale(entry, self.now))
        for timestamp in (None, "invalid", 12):
            entry["fetched"] = timestamp
            self.assertTrue(ai_context.is_stale(entry, self.now))

    def test_refresh_replaces_fresh_cache_with_atomic_metadata(self):
        self.seed()
        self.network.side_effect = None
        self.network.return_value = ("new body", ai_context.ALLOWLIST["react"])
        entry, cached = ai_context.fetch("react", refresh=True, cache_dir=self.cache)
        self.assertFalse(cached)
        self.network.assert_called_once_with(ai_context.ALLOWLIST["react"])
        self.assertEqual(entry["body"], "new body")
        self.assertEqual(entry["fetched"], self.now.isoformat())
        self.assertEqual(entry["ttl_days"], 7)
        self.assertEqual(entry["sha256"], ai_context.sha256_hex("new body"))
        files = list(Path(self.cache).iterdir())
        self.assertEqual([file.name for file in files], ["react.json"])
        self.assertEqual(json.loads(files[0].read_text()), entry)

    def test_expired_fetch_refreshes_when_online(self):
        self.seed(timedelta(days=7))
        self.network.side_effect = None
        self.network.return_value = ("updated", ai_context.ALLOWLIST["react"])
        entry, cached = ai_context.fetch("react", cache_dir=self.cache)
        self.assertFalse(cached)
        self.assertEqual(entry["body"], "updated")

    def test_stale_offline_is_error_and_preserves_cache(self):
        original = self.seed(timedelta(days=7))
        with self.assertRaisesRegex(ai_context.StaleCacheError, "refusing to serve stale"):
            ai_context.fetch("react", cache_dir=self.cache)
        self.assertEqual(ai_context.load_entry("react", self.cache), original)

    def test_missing_offline_is_error(self):
        with self.assertRaisesRegex(ai_context.AiContextError, "no cached copy"):
            ai_context.fetch("react", cache_dir=self.cache)

    def test_failed_forced_refresh_preserves_fresh_cache(self):
        original = self.seed()
        with self.assertRaisesRegex(ai_context.AiContextError, "keeping the existing fresh"):
            ai_context.fetch("react", refresh=True, cache_dir=self.cache)
        self.assertEqual(ai_context.load_entry("react", self.cache), original)

    def test_show_is_offline_and_rejects_stale_missing(self):
        with self.assertRaisesRegex(ai_context.AiContextError, "not cached"):
            ai_context.show("react", self.cache)
        self.seed()
        self.assertEqual(ai_context.show("react", self.cache)["body"], "cached body")
        self.seed(timedelta(days=7))
        with self.assertRaisesRegex(ai_context.StaleCacheError, "cache is stale"):
            ai_context.show("react", self.cache)
        self.network.assert_not_called()

    def test_invalid_names_never_touch_network(self):
        for name in ("unknown", "../react", "https://example.com", "", "react/../../x"):
            for operation in (ai_context.fetch, ai_context.show):
                with self.subTest(name=name, operation=operation.__name__):
                    with self.assertRaises(ai_context.InvalidNameError):
                        operation(name, cache_dir=self.cache)
        self.network.assert_not_called()

    def test_corrupted_body_and_wrong_provenance_are_rejected(self):
        for field, value in (("body", "tampered"), ("url", "https://example.com/")):
            entry = self.seed()
            entry[field] = value
            ai_context.store_entry_atomic("react", entry, self.cache)
            with self.assertRaises(ai_context.CacheCorruptError):
                ai_context.show("react", self.cache)

    def test_atomic_failure_keeps_old_entry_and_cleans_temp_file(self):
        original = self.seed()
        with patch.object(ai_context.os, "replace", side_effect=OSError("disk error")):
            with self.assertRaises(OSError):
                ai_context.store_entry_atomic("react", {"body": "new"}, self.cache)
        self.assertEqual(ai_context.load_entry("react", self.cache), original)
        self.assertEqual([p.name for p in Path(self.cache).iterdir()], ["react.json"])

    def test_cli_list_does_not_print_body_or_fetch(self):
        self.seed()
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            self.assertEqual(ai_context.main(["--cache-dir", self.cache, "list"]), 0)
        self.assertIn("opencode-config", output.getvalue())
        self.assertNotIn("cached body", output.getvalue())
        self.network.assert_not_called()

    def test_cli_invalid_name_and_stale_show_exit_nonzero(self):
        errors = io.StringIO()
        self.seed(timedelta(days=8))
        with contextlib.redirect_stderr(errors):
            self.assertEqual(ai_context.main(["--cache-dir", self.cache, "fetch", "bad"]), 2)
            self.assertEqual(ai_context.main(["--cache-dir", self.cache, "show", "react"]), 1)
        self.assertIn("unknown name", errors.getvalue())
        self.assertIn("stale", errors.getvalue())


class NetworkTests(unittest.TestCase):
    def setUp(self):
        self.url = ai_context.ALLOWLIST["react"]
        self.response = Mock()
        self.response.geturl.return_value = self.url
        self.response.read.return_value = b"documentation"
        opener_patch = patch.object(ai_context, "build_opener")
        self.opener = opener_patch.start().return_value
        self.addCleanup(opener_patch.stop)
        self.opener.open.return_value.__enter__ = Mock(return_value=self.response)
        self.opener.open.return_value.__exit__ = Mock(return_value=False)

    def test_timeout_and_no_custom_headers(self):
        body, final_url = ai_context.http_get(self.url)
        self.assertEqual((body, final_url), ("documentation", self.url))
        args, kwargs = self.opener.open.call_args
        self.assertEqual(kwargs, {"timeout": 15})
        self.assertEqual(args[0].full_url, self.url)
        self.assertEqual(args[0].header_items(), [])
        self.response.read.assert_called_once_with(2 * 1024 * 1024 + 1)

    def test_oversized_response_rejected_and_exact_limit_accepted(self):
        self.response.read.return_value = b"x" * (ai_context.MAX_RESPONSE_BYTES + 1)
        with self.assertRaisesRegex(ai_context.FetchError, "exceeds"):
            ai_context.http_get(self.url)
        self.response.read.return_value = b"x" * ai_context.MAX_RESPONSE_BYTES
        self.assertEqual(len(ai_context.http_get(self.url)[0]), ai_context.MAX_RESPONSE_BYTES)

    def test_unallowlisted_direct_url_rejected(self):
        with self.assertRaisesRegex(ai_context.FetchError, "not allowlisted"):
            ai_context.http_get("https://example.com/")
        self.opener.open.assert_not_called()

    def test_redirect_restrictions_before_following(self):
        handler = ai_context.SafeRedirectHandler()
        request = urllib.request.Request(self.url)
        for target in (
            "http://react.dev/other", "https://example.com/", "file:///etc/passwd",
            "https://react.dev.evil.example/", "https://user:password@react.dev/",
            "https://react.dev:444/",
        ):
            with self.subTest(target=target):
                with self.assertRaises(urllib.error.HTTPError) as caught:
                    handler.redirect_request(request, None, 302, "Found", {}, target)
                caught.exception.close()
        redirected = handler.redirect_request(
            request, None, 302, "Found", {}, "https://react.dev/learn"
        )
        self.assertEqual(redirected.full_url, "https://react.dev/learn")

    def test_final_url_defense(self):
        self.response.geturl.return_value = "https://example.com/"
        with self.assertRaisesRegex(ai_context.FetchError, "off-host"):
            ai_context.http_get(self.url)
        self.response.read.assert_not_called()

    def test_network_failure_wrapped(self):
        self.opener.open.side_effect = urllib.error.URLError("offline")
        with self.assertRaisesRegex(ai_context.FetchError, "offline"):
            ai_context.http_get(self.url)

    def test_official_versioned_urls(self):
        self.assertEqual(ai_context.ALLOWLIST["vite"], "https://vite.dev/guide/")
        self.assertEqual(ai_context.ALLOWLIST["spring-boot"],
                         "https://docs.spring.io/spring-boot/docs/3.2.5/reference/html/index.html")
        self.assertEqual(ai_context.ALLOWLIST["opencode-config"],
                         "https://opencode.ai/v2/docs/config/")
        self.assertEqual(ai_context.ALLOWLIST["opencode-plugins"],
                         "https://opencode.ai/v2/docs/build/plugins/")
        self.assertNotIn("react-18-types", ai_context.ALLOWLIST)


if __name__ == "__main__":
    unittest.main()
