#!/usr/bin/env sh

# ============================================================
# WeatherGPT - Universal Startup Script
#
# Compatible with: bash, zsh, sh
# Fish users: use start.fish
#
# Services started:
#   Java backend       :8080  (Spring Boot — weather/climate/alerts)
#   Python ML backend  :8000  (FastAPI + LangChain agent + route weather)
#   frontend           :5173  (React/Vite — unified app, all pages)
#   voice service      :8001  (Python TTS/STT, optional)
#
# Usage:
#   ./start.sh              Start all services
#   ./start.sh backend      Java backend only
#   ./start.sh ml           Python ML backend only
#   ./start.sh frontend     Frontend only
#   ./start.sh voice        Voice service only
#   ./start.sh setup        Install all dependencies
#   ./start.sh test         Run backend tests
#   ./start.sh build        Build all
#   ./start.sh stop         Stop all services
#   ./start.sh status       Show running services
# ============================================================

set -eu

PROJECT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
ML_DIR="$PROJECT_DIR/ML"
VOICE_DIR="$PROJECT_DIR/voice_service"
VENV_DIR="$PROJECT_DIR/.venv"

BACKEND_PORT=8080
ML_PORT=8000
FRONTEND_PORT=5173
VOICE_PORT=8001

BACKEND_PID="" ML_PID="" FRONTEND_PID="" VOICE_PID=""

# ------------------------------------------------------------
# Colors
# ------------------------------------------------------------
if [ -t 1 ]; then
    RED="$(printf '\033[0;31m')" GREEN="$(printf '\033[0;32m')"
    YELLOW="$(printf '\033[1;33m')" BLUE="$(printf '\033[0;34m')" NC="$(printf '\033[0m')"
else
    RED="" GREEN="" YELLOW="" BLUE="" NC=""
fi
info()    { printf "%s[INFO]%s %s\n"  "$BLUE"   "$NC" "$1"; }
success() { printf "%s[OK]%s %s\n"    "$GREEN"  "$NC" "$1"; }
warn()    { printf "%s[WARN]%s %s\n"  "$YELLOW" "$NC" "$1"; }
error()   { printf "%s[ERROR]%s %s\n" "$RED"    "$NC" "$1"; }

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------
require_command() { command -v "$1" >/dev/null 2>&1 || { error "Required command not found: $1"; exit 1; }; }

port_in_use() {
    if command -v lsof >/dev/null 2>&1; then lsof -i ":$1" >/dev/null 2>&1; return $?; fi
    if command -v ss   >/dev/null 2>&1; then ss -ltn 2>/dev/null | grep -q ":$1 "; return $?; fi
    return 1
}

# Describe whatever is listening on a port, for an actionable error message.
port_owner_desc() {
    local pids pid
    if command -v lsof >/dev/null 2>&1; then
        pids="$(lsof -ti ":$1" -sTCP:LISTEN 2>/dev/null || true)"
        if [ -n "$pids" ]; then
            for pid in $pids; do
                printf "pid %s: %s\n" "$pid" "$(ps -p "$pid" -o args= 2>/dev/null | cut -c1-160)"
            done
            return 0
        fi
    fi
    if command -v ss >/dev/null 2>&1; then
        ss -ltnp 2>/dev/null | grep ":$1 " | cut -c1-160 || true
    fi
}

# Refuse to start when a port we need is already taken.
#
# This exists because a stale ML process once held :8000 with a placeholder
# environment while start.sh reported "Port 8000 in use - assuming ML backend is
# running" and carried on. The app then talked to a leftover process that was
# not the one it launched, which is a far worse failure than a refusal: nothing
# in the output says the service underneath is not the intended one.
check_ports_free() {
    local blocked=0 port name desc
    for entry in "$BACKEND_PORT:Java backend" "$ML_PORT:Python ML backend" \
                 "$FRONTEND_PORT:Frontend" "$VOICE_PORT:Voice service"; do
        port="${entry%%:*}"; name="${entry#*:}"
        if port_in_use "$port"; then
            error "Port $port is already in use, needed by: $name"
            port_owner_desc "$port" | while IFS= read -r line; do
                printf "      %s\n" "$line"
            done
            blocked=1
        fi
    done
    if [ "$blocked" -ne 0 ]; then
        printf "\n"
        error "Refusing to start: an existing process is serving one of the ports above."
        error "It may be a stale run, and the app would silently talk to THAT process"
        error "instead of a freshly started one. Stop it first, then retry:"
        error "    ./start.sh stop"
        error "    (or free the specific port, e.g. kill \$(lsof -ti :8000))"
        exit 1
    fi
}

# Single-port form of the guard, for `./start.sh ml` and friends.
#
# The full-stack `start` path was guarded, but the per-service commands were
# not, and each start_* function then fell back to "Port N in use - assuming
# X is running". That sentence IS the bug: a stale ML process started before
# the .env existed kept answering :8000, reported itself as not configured,
# and the operator debugging it was staring at a key that process had never
# read. "Assume it is running" is never safe when the point of the command is
# to run the code you just edited.
refuse_port_occupied() {
    local port="$1" desc="$2"
    error "Port $port is already in use, needed by: $desc"
    port_owner_desc "$port" | while IFS= read -r line; do
        printf "      %s\n" "$line"
    done
    printf "\n"
    error "Refusing to start $desc."
    error "An existing process is serving that port, so the app would talk to"
    error "THAT process instead of the code you just changed. It may be a stale"
    error "run from before your edits, which is how a valid key ends up reported"
    error "as missing. Stop it first, then retry:"
    error "    ./start.sh stop"
    error "    (or free the specific port, e.g. kill \$(lsof -ti :$port))"
    exit 1
}

stop_port() {
    if command -v lsof >/dev/null 2>&1; then
        PIDS="$(lsof -ti ":$1" 2>/dev/null || true)"
        if [ -n "$PIDS" ]; then
            warn "Stopping process on port $1..."
            for P in $PIDS; do kill "$P" 2>/dev/null || true; done
            sleep 1
            for P in $(lsof -ti ":$1" 2>/dev/null || true); do kill -9 "$P" 2>/dev/null || true; done
            success "Port $1 freed."
        fi
    fi
}

python_cmd()  { [ -f "$VENV_DIR/bin/python" ]  && echo "$VENV_DIR/bin/python"  || (command -v python3 >/dev/null 2>&1 && echo python3 || echo python); }
uvicorn_cmd() { [ -f "$VENV_DIR/bin/uvicorn" ] && echo "$VENV_DIR/bin/uvicorn" || echo uvicorn; }
pip_cmd()     { [ -f "$VENV_DIR/bin/pip" ]     && echo "$VENV_DIR/bin/pip"     || (command -v pip3 >/dev/null 2>&1 && echo pip3 || echo pip); }

# ------------------------------------------------------------
# Cleanup
# ------------------------------------------------------------
cleanup() {
    printf "\n"; info "Stopping WeatherGPT..."
    for P in $BACKEND_PID $ML_PID $FRONTEND_PID $VOICE_PID; do
        [ -n "$P" ] && kill "$P" 2>/dev/null || true
    done
    success "WeatherGPT stopped."; exit 0
}
trap cleanup INT TERM

# ------------------------------------------------------------
# Java backend
# ------------------------------------------------------------
start_backend() {
    require_command java; require_command mvn
    [ -f "$BACKEND_DIR/pom.xml" ] || { error "pom.xml not found"; exit 1; }
    if port_in_use "$BACKEND_PORT"; then refuse_port_occupied "$BACKEND_PORT" "Java backend"; fi
    info "Starting Java backend (Spring Boot) on :$BACKEND_PORT..."
    ( cd "$BACKEND_DIR" && mvn spring-boot:run ) & BACKEND_PID=$!
    COUNT=0
    while [ "$COUNT" -lt 90 ]; do
        port_in_use "$BACKEND_PORT" && { success "Java backend → http://localhost:$BACKEND_PORT"; return; }
        kill -0 "$BACKEND_PID" 2>/dev/null || { error "Java backend exited unexpectedly."; exit 1; }
        sleep 1; COUNT=$((COUNT+1))
    done
    error "Java backend did not start in 90 seconds."; exit 1
}

# ------------------------------------------------------------
# Python ML backend
# ------------------------------------------------------------
start_ml() {
    [ -f "$ML_DIR/main.py" ] || { warn "ML/main.py not found — skipping."; return; }
    UVCORN="$(uvicorn_cmd)"
    ! command -v "$UVCORN" >/dev/null 2>&1 && [ "$UVCORN" = "uvicorn" ] && { warn "uvicorn not found — skipping. Run: pip install -r ML/requirements.txt"; return; }
    if port_in_use "$ML_PORT"; then refuse_port_occupied "$ML_PORT" "Python ML backend"; fi
    info "Starting Python ML backend on :$ML_PORT..."
    ( cd "$ML_DIR" && "$(uvicorn_cmd)" main:app --host 0.0.0.0 --port "$ML_PORT" --reload ) & ML_PID=$!
    COUNT=0
    while [ "$COUNT" -lt 30 ]; do
        port_in_use "$ML_PORT" && { success "ML backend → http://localhost:$ML_PORT"; return; }
        kill -0 "$ML_PID" 2>/dev/null || { warn "ML backend exited — check your API configuration and logs."; return; }
        sleep 1; COUNT=$((COUNT+1))
    done
    warn "ML backend did not start in 30 seconds."
}

# ------------------------------------------------------------
# Voice service
# ------------------------------------------------------------
start_voice_service() {
    [ -f "$VOICE_DIR/main.py" ] || { warn "Voice service not found — skipping."; return; }
    if port_in_use "$VOICE_PORT"; then refuse_port_occupied "$VOICE_PORT" "Voice service"; fi
    info "Starting voice service on :$VOICE_PORT..."
    # VOICE_ENABLED is the voice service's own switch, not an Ollama one: it was
    # removed by mistake during the provider migration, which left the service
    # permanently in no-op mode and /health reporting healthy while every
    # request silently returned nothing. Defaults to false, so behaviour is
    # unchanged unless explicitly requested. Export VOICE_ENABLED=true to
    # enable it; the Whisper "base" model downloads on first use.
    ( cd "$VOICE_DIR" && VOICE_ENABLED="${VOICE_ENABLED:-false}" "$(python_cmd)" main.py ) & VOICE_PID=$!
    COUNT=0
    while [ "$COUNT" -lt 30 ]; do
        port_in_use "$VOICE_PORT" && { success "Voice service → http://localhost:$VOICE_PORT"; return; }
        kill -0 "$VOICE_PID" 2>/dev/null || { warn "Voice service exited."; return; }
        sleep 1; COUNT=$((COUNT+1))
    done
    warn "Voice service did not start in 30 seconds."
}

# ------------------------------------------------------------
# Frontend (unified app on :5173)
# ------------------------------------------------------------
start_frontend() {
    require_command npm
    [ -f "$FRONTEND_DIR/package.json" ] || { warn "frontend/package.json not found — skipping."; return; }
    if port_in_use "$FRONTEND_PORT"; then refuse_port_occupied "$FRONTEND_PORT" "Frontend"; fi
    info "Starting frontend on :$FRONTEND_PORT..."
    ( cd "$FRONTEND_DIR" && npm run dev ) & FRONTEND_PID=$!
    COUNT=0
    while [ "$COUNT" -lt 30 ]; do
        port_in_use "$FRONTEND_PORT" && { success "Frontend → http://localhost:$FRONTEND_PORT"; return; }
        kill -0 "$FRONTEND_PID" 2>/dev/null || { error "Frontend exited unexpectedly."; exit 1; }
        sleep 1; COUNT=$((COUNT+1))
    done
    warn "Frontend did not start in 30 seconds."
}

# ------------------------------------------------------------
# Setup
# ------------------------------------------------------------
setup_project() {
    require_command mvn; require_command npm
    printf "\n============================================================\n"
    printf "                 WEATHERGPT SETUP\n"
    printf "============================================================\n\n"
    info "Installing Java backend dependencies (Maven)..."
    ( cd "$BACKEND_DIR" && mvn -q dependency:resolve ); success "Java deps resolved."
    info "Installing frontend dependencies (npm)..."
    ( cd "$FRONTEND_DIR" && npm install ); success "Frontend deps installed."

    PIP="$(pip_cmd)"
    VOICE_OK=1

    if [ -f "$ML_DIR/requirements.txt" ]; then
        info "Installing Python ML dependencies ($PIP)..."
        "$PIP" install -r "$ML_DIR/requirements.txt" -q
        success "Python ML deps installed."
    fi

    # The voice service runs from the SAME virtualenv as the ML service
    # (python_cmd), so its requirements have to be installed into that same
    # venv. Skipping them left ./start.sh setup reporting success while the
    # voice service died at startup with
    #   RuntimeError: Form data requires "python-multipart" to be installed
    # which is what happened once .venv existed and start.sh started preferring
    # it over the system interpreter.
    #
    # torch is installed FIRST, from the CPU-only wheel index, with
    # --no-cache-dir. This project transcribes CPU audio and never uses CUDA,
    # and the default torch pulls multi-gigabyte CUDA wheels. Installing it
    # first, and without a download cache, is what keeps the install inside the
    # filesystem quota: a plain `pip install -r voice_service/requirements.txt`
    # failed with OSError errno 122 (disk quota exceeded) while `df` reported
    # 400GB+ free, because the cached CUDA wheels plus their extraction crossed
    # the quota together. See README section 3a.
    if [ -f "$VOICE_DIR/requirements.txt" ]; then
        info "Installing CPU-only PyTorch for the voice service..."
        if ! "$PIP" install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch; then
            VOICE_OK=0
            warn "CPU-only PyTorch install FAILED — the voice service will NOT work."
            warn "  Retry:  $PIP install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch"
            warn "  Transcription also needs a system ffmpeg; see README section 3a."
        else
            success "CPU-only PyTorch installed."
            info "Installing the remaining voice dependencies ($PIP)..."
            if "$PIP" install --no-cache-dir -r "$VOICE_DIR/requirements.txt" -q; then
                success "Voice deps installed."
            else
                VOICE_OK=0
                warn "Voice dependency install FAILED — the voice service will NOT work."
                warn "  Retry:  $PIP install --no-cache-dir -r voice_service/requirements.txt"
                warn "  README: 'Voice service' documents a manual, opt-in install."
            fi
        fi
    fi

    printf "\n"
    if [ "$VOICE_OK" -eq 1 ]; then
        success "Setup complete. Run ./start.sh to launch."
    else
        warn "Setup finished with 1 problem: voice dependencies are missing."
        warn "Everything else installed. The app runs; only voice is unavailable."
    fi
    printf "\n"
}

# ------------------------------------------------------------
# Test / Build / Stop
# ------------------------------------------------------------
run_tests() { require_command mvn; info "Running Java backend tests..."; ( cd "$BACKEND_DIR" && mvn clean test ); success "Tests completed."; }

build_all() {
    require_command mvn; require_command npm
    info "Building Java backend..."; ( cd "$BACKEND_DIR" && mvn clean package -DskipTests ); success "Java backend built."
    info "Building frontend..."; ( cd "$FRONTEND_DIR" && npm run build ); success "Frontend built."
}

stop_services() {
    info "Stopping all services..."
    stop_port "$BACKEND_PORT"; stop_port "$ML_PORT"; stop_port "$FRONTEND_PORT"; stop_port "$VOICE_PORT"
    success "All services stopped."
}

print_summary() {
    printf "\n============================================================\n"
    printf "  WeatherGPT is running\n"
    printf "============================================================\n\n"
    printf "  %-32s %s\n" "Java backend (Spring Boot):"   "http://localhost:$BACKEND_PORT"
    printf "  %-32s %s\n" "Python ML backend (FastAPI):"  "http://localhost:$ML_PORT"
    printf "  %-32s %s\n" "Frontend (unified, all pages):" "http://localhost:$FRONTEND_PORT"
    port_in_use "$VOICE_PORT" && printf "  %-32s %s\n" "Voice service:" "http://localhost:$VOICE_PORT"
    printf "\n  Press Ctrl+C to stop all services.\n\n"
}

# ------------------------------------------------------------
# Main
# ------------------------------------------------------------
COMMAND="${1:-start}"
case "$COMMAND" in
    start)
        printf "\n============================================================\n"
        printf "                 WEATHERGPT STARTUP\n"
        printf "============================================================\n\n"
        # Refuse up front rather than starting what it can and warning about the
        # rest: a partially started stack is harder to reason about than none.
        check_ports_free
        start_backend; start_ml; start_voice_service; start_frontend
        print_summary
        while true; do
            sleep 30
            [ -n "$BACKEND_PID"  ] && ! kill -0 "$BACKEND_PID"  2>/dev/null && { error "Java backend stopped.";  cleanup; }
            [ -n "$FRONTEND_PID" ] && ! kill -0 "$FRONTEND_PID" 2>/dev/null && { error "Frontend stopped.";      cleanup; }
        done ;;
    backend)
        # Same refusal as the full-stack path, for the same reason: a
        # process already on the port is a process running old code.
        port_in_use "$BACKEND_PORT" && refuse_port_occupied "$BACKEND_PORT" "Java backend"
        start_backend; [ -n "$BACKEND_PID" ] && wait "$BACKEND_PID" ;;
    ml)
        # Same refusal as the full-stack path, for the same reason: a
        # process already on the port is a process running old code.
        port_in_use "$ML_PORT" && refuse_port_occupied "$ML_PORT" "Python ML backend"
        start_ml; [ -n "$ML_PID" ] && wait "$ML_PID" ;;
    frontend)
        # Same refusal as the full-stack path, for the same reason: a
        # process already on the port is a process running old code.
        port_in_use "$FRONTEND_PORT" && refuse_port_occupied "$FRONTEND_PORT" "Frontend"
        start_frontend; [ -n "$FRONTEND_PID" ] && wait "$FRONTEND_PID" ;;
    voice)
        # Same refusal as the full-stack path, for the same reason: a
        # process already on the port is a process running old code.
        port_in_use "$VOICE_PORT" && refuse_port_occupied "$VOICE_PORT" "Voice service"
        start_voice_service; [ -n "$VOICE_PID" ] && wait "$VOICE_PID" ;;
    setup)   setup_project ;;
    test)    run_tests ;;
    build)   build_all ;;
    stop)    stop_services ;;
    status)
        printf "\n============================================================\n"
        printf "                 WEATHERGPT STATUS\n"
        printf "============================================================\n\n"
        for ENTRY in "$BACKEND_PORT:Java backend" "$ML_PORT:Python ML backend" "$FRONTEND_PORT:Frontend" "$VOICE_PORT:Voice service"; do
            PORT="${ENTRY%%:*}"; NAME="${ENTRY#*:}"
            if port_in_use "$PORT"; then printf "  %-32s running → http://localhost:%s\n" "$NAME" "$PORT"
            else printf "  %-32s not running\n" "$NAME"; fi
        done; printf "\n" ;;
    *)
        error "Unknown command: $COMMAND"
        printf "\nUsage: ./start.sh [COMMAND]\n"
        printf "  start     Start all services (default)\n  backend   Java backend\n  ml        Python ML backend\n  frontend  Frontend\n  voice     Voice service\n  setup     Install deps\n  test      Run tests\n  build     Build all\n  stop      Stop all\n  status    Show status\n"
        exit 1 ;;
esac
