# WeatherGPT Voice Service
# Python microservice for speech-to-text and text-to-speech
# Called by the Java Spring Boot backend for voice processing

from fastapi import FastAPI, File, HTTPException, Query
from fastapi.responses import Response
from pydantic import BaseModel
from typing import Optional
import logging
import os

# Read the project-root .env, if there is one, so VOICE_ENABLED can be set the
# same way OPENROUTER_API_KEY is for the ML service. Without this a
# VOICE_ENABLED=true line in .env would be silently ignored and the service
# would stay a no-op while appearing correctly configured.
#
# A real environment variable still wins, so a one-off override keeps working:
#   VOICE_ENABLED=true ./start.sh
_VOICE_ENV_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"
)
if os.path.isfile(_VOICE_ENV_FILE):
    try:
        from dotenv import load_dotenv

        load_dotenv(_VOICE_ENV_FILE, override=False)
    except ImportError:  # pragma: no cover - dependency guard
        logging.getLogger("voice").warning(
            "python-dotenv not installed; export VOICE_ENABLED in the shell instead."
        )

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="WeatherGPT Voice Service",
    description="Speech-to-text and text-to-speech service for WeatherGPT",
    version="1.0.0"
)


# =============================================================================
# Models
# =============================================================================

class STTResponse(BaseModel):
    success: bool
    text: Optional[str] = None
    error: Optional[str] = None


class TTSResponse(BaseModel):
    success: bool
    audio_base64: Optional[str] = None
    mime_type: Optional[str] = None
    error: Optional[str] = None


# =============================================================================
# Configuration
# =============================================================================

# Set to True to enable server-side STT/TTS, False for no-op mode.
#
# Read from the environment so it can actually be turned on. This was a
# hardcoded `False`, and start.sh's `VOICE_ENABLED="${VOICE_ENABLED:-false}"`
# was removed during the Ollama cleanup as if it were an Ollama variable. It was
# not: the net result was that voice could not be enabled by any means, and
# /health reported healthy while every request silently returned nothing.
#
# Defaults to False, so behaviour is unchanged unless explicitly requested.
# Enabling it loads the Whisper "base" model on first use, which downloads
# roughly 140MB. start.sh passes the variable through.
VOICE_ENABLED: bool = os.environ.get("VOICE_ENABLED", "false").strip().lower() in (
    "1", "true", "yes", "on",
)

# Default TTS format
DEFAULT_TTS_FORMAT: str = "audio/wav"

# Supported audio formats for STT
SUPPORTED_STT_FORMATS = ["audio/wav", "audio/mpeg", "audio/mp3", "audio/flac", "audio/opus"]


# =============================================================================
# Speech-to-Text Service
# =============================================================================

class SpeechToTextService:
    """
    Converts audio to text.
    
    When VOICE_ENABLED is False, returns empty (no-op mode).
    When enabled, uses available STT engine (Whisper local, or cloud provider).
    """

    def __init__(self, enabled: bool = VOICE_ENABLED):
        self.enabled = enabled
        self._engine = None
        if enabled:
            self._initialize_engine()

    def _initialize_engine(self):
        """Initialize the STT engine (Whisper or cloud provider)."""
        try:
            # Try to import whisper (OpenAI Whisper - local, offline)
            import whisper
            logger.info("Initializing Whisper STT engine...")
            self._engine = whisper.load_model("base")
            logger.info("Whisper STT engine initialized successfully")
        except ImportError:
            logger.warning("Whisper not available. Install with: pip install openai-whisper")
            self._engine = None
        except Exception as e:
            logger.error(f"Failed to initialize Whisper: {e}")
            self._engine = None

    def transcribe(self, audio_bytes: bytes, content_type: str) -> Optional[str]:
        """
        Transcribe audio to text.
        
        Args:
            audio_bytes: Raw audio data
            content_type: MIME type of the audio (e.g., "audio/wav", "audio/mpeg")
        
        Returns:
            Transcribed text, or None if transcription fails or is disabled
        """
        if not self.enabled:
            logger.info("STT is disabled (no-op mode)")
            return None

        if not audio_bytes:
            logger.warning("Empty audio data provided")
            return None

        if content_type not in SUPPORTED_STT_FORMATS:
            logger.warning(f"Unsupported audio format: {content_type}")
            return None

        try:
            if self._engine is None:
                # Fallback: try to load whisper on demand
                try:
                    import whisper
                    self._engine = whisper.load_model("base")
                except Exception as e:
                    logger.error(f"Failed to load Whisper on demand: {e}")
                    return None

            # Whisper expects a file path or numpy array
            # For simplicity, save to temp file and transcribe
            import tempfile
            import os

            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
                tmp.write(audio_bytes)
                tmp_path = tmp.name

            try:
                result = self._engine.transcribe(tmp_path)
                text = result.get("text", "").strip()
                logger.info(f"Transcription result: {text[:50]}..." if len(text) > 50 else f"Transcription result: {text}")
                return text if text else None
            finally:
                os.unlink(tmp_path)

        except Exception as e:
            logger.error(f"STT transcription failed: {e}")
            return None


# =============================================================================
# Text-to-Speech Service
# =============================================================================

class TextToSpeechService:
    """
    Converts text to spoken audio.
    
    When VOICE_ENABLED is False, returns empty (no-op mode).
    When enabled, uses available TTS engine (gTTS, pyttsx3, or cloud provider).
    """

    def __init__(self, enabled: bool = VOICE_ENABLED):
        self.enabled = enabled
        self._engine = None
        if enabled:
            self._initialize_engine()

    def _initialize_engine(self):
        """Initialize the TTS engine."""
        try:
            # Try gTTS first (Google Text-to-Speech, requires internet)
            from gtts import gTTS
            logger.info("Initializing gTTS engine (requires internet)")
            self._engine = "gtts"
        except ImportError:
            logger.warning("gTTS not available. Install with: pip install gTTS")
            try:
                # Fallback to pyttsx3 (offline, system voices)
                import pyttsx3
                logger.info("Initializing pyttsx3 engine (offline)")
                self._engine = pyttsx3.init()
            except ImportError:
                logger.warning("pyttsx3 not available. Install with: pip install pyttsx3")
                self._engine = None
        except Exception as e:
            logger.error(f"Failed to initialize TTS engine: {e}")
            self._engine = None

    def synthesize(self, text: str, audio_format: Optional[str] = None, lang: Optional[str] = "en") -> Optional[dict]:
        """
        Synthesize text to speech audio.
        
        Args:
            text: Text to speak
            audio_format: Desired audio format (e.g., "audio/wav", "audio/mpeg")
                          If None, uses default format
            lang: Language code (e.g., "en", "hi", "ta", "te", "bn", "mr", "gu")
        
        Returns:
            Dict with 'audio' (bytes) and 'mime_type' (str), or None if synthesis fails
        """
        if not self.enabled:
            logger.info("TTS is disabled (no-op mode)")
            return None

        if not text or not text.strip():
            logger.warning("Empty text provided for TTS")
            return None

        if audio_format is None:
            audio_format = DEFAULT_TTS_FORMAT

        safe_lang = lang if lang in ["en", "hi", "ta", "te", "bn", "mr", "gu", "kn", "ml", "pa"] else "en"

        try:
            if self._engine == "gtts":
                return self._synthesize_gtts(text, audio_format, safe_lang)
            elif isinstance(self._engine, object):  # pyttsx3
                return self._synthesize_pyttsx3(text, audio_format)
            else:
                logger.error("No TTS engine available")
                return None

        except Exception as e:
            logger.error(f"TTS synthesis failed: {e}")
            return None

    def _synthesize_gtts(self, text: str, audio_format: str, lang: str = "en") -> Optional[dict]:
        """Synthesize using gTTS (Google Text-to-Speech)."""
        from gtts import gTTS
        import io

        try:
            tts = gTTS(text=text, lang=lang, slow=False)
            
            audio_buffer = io.BytesIO()
            tts.write_to_fp(audio_buffer)
            audio_bytes = audio_buffer.getvalue()
            
            mime_type = "audio/mpeg" if audio_format.endswith("mp3") else "audio/ogg"
            
            logger.info(f"gTTS synthesized {len(audio_bytes)} bytes of audio (lang={lang})")
            return {"audio": audio_bytes, "mime_type": mime_type}

        except Exception as e:
            logger.error(f"gTTS synthesis failed: {e}")
            return None

    def _synthesize_pyttsx3(self, text: str, audio_format: str) -> Optional[dict]:
        """Synthesize using pyttsx3 (offline, system voices)."""
        import pyttsx3
        import io
        import wave
        import struct

        try:
            engine = pyttsx3.init()
            
            # Set properties
            engine.setProperty('rate', 150)  # Speed of speech
            engine.setProperty('volume', 1.0)  # Volume 0-1
            
            # Save to bytes
            audio_buffer = io.BytesIO()
            
            # pyttsx3 can save to file, we'll capture that
            temp_path = "/tmp/weathergpt_tts.wav"
            engine.save_to_file(text, temp_path)
            engine.runAndWait()
            
            # Read the generated WAV file
            with open(temp_path, 'rb') as f:
                audio_bytes = f.read()
            
            # Clean up temp file
            import os
            os.unlink(temp_path)
            
            logger.info(f"pyttsx3 synthesized {len(audio_bytes)} bytes of audio")
            return {"audio": audio_bytes, "mime_type": "audio/wav"}

        except Exception as e:
            logger.error(f"pyttsx3 synthesis failed: {e}")
            return None


# =============================================================================
# Service Instances
# =============================================================================

stt_service = SpeechToTextService(enabled=VOICE_ENABLED)
tts_service = TextToSpeechService(enabled=VOICE_ENABLED)


# =============================================================================
# API Endpoints
# =============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "voice_enabled": VOICE_ENABLED,
        "stt_available": stt_service.enabled and stt_service._engine is not None,
        "tts_available": tts_service.enabled and tts_service._engine is not None
    }


@app.post("/stt/transcribe", response_model=STTResponse)
async def transcribe_audio(
    audio: bytes = File(...),
    content_type: str = File(default="audio/wav")
):
    """
    Transcribe audio to text using speech-to-text.
    
    - **audio**: Audio file (WAV, MP3, FLAC, or Opus)
    - **content_type**: MIME type of the audio
    
    Returns the transcribed text, or an error if transcription fails.
    
    When voice is disabled, returns success=False with a message.
    """
    if not stt_service.enabled:
        return STTResponse(
            success=False,
            error="Server-side STT is not configured. Please provide text directly or enable voice service."
        )

    text = stt_service.transcribe(audio, content_type)
    
    if text:
        return STTResponse(success=True, text=text)
    else:
        return STTResponse(
            success=False,
            error="Could not transcribe audio. Please try again or provide text directly."
        )


@app.post("/tts/synthesize", response_model=TTSResponse)
async def synthesize_speech(
    text: str,
    audio_format: str = Query(default="audio/wav", description="Desired audio format (audio/wav, audio/mpeg)"),
    lang: str = Query(default="en", description="Language code (en, hi, ta, te, bn, mr, gu)")
):
    """
    Synthesize text to spoken audio using text-to-speech.
    
    - **text**: Text to speak
    - **audio_format**: Desired audio format (audio/wav or audio/mpeg)
    - **lang**: Language code for multilingual synthesis
    
    Returns base64-encoded audio, or an error if synthesis fails.
    
    When voice is disabled, returns success=False with a message.
    """
    if not tts_service.enabled:
        return TTSResponse(
            success=False,
            error="Server-side TTS is not configured. Use browser speechSynthesis instead."
        )

    result = tts_service.synthesize(text, audio_format, lang)
    
    if result:
        import base64
        return TTSResponse(
            success=True,
            audio_base64=base64.b64encode(result["audio"]).decode("utf-8"),
            mime_type=result["mime_type"]
        )
    else:
        return TTSResponse(
            success=False,
            error="Could not synthesize speech. Please try again."
        )


@app.get("/tts/speak")
async def speak(
    text: str = Query(..., description="Text to speak"),
    audio_format: str = Query(default="audio/wav", description="Audio format"),
    lang: str = Query(default="en", description="Language code (en, hi, ta, te, bn, mr, gu)")
):
    """
    Synthesize and return audio file directly (for direct download).
    
    Convenience endpoint that returns raw audio bytes with appropriate Content-Type.
    """
    if not tts_service.enabled:
        raise HTTPException(
            status_code=503,
            detail="Server-side TTS is not configured. Use browser speechSynthesis instead."
        )

    result = tts_service.synthesize(text, audio_format)
    
    if result:
        from fastapi.responses import Response
        return Response(
            content=result["audio"],
            media_type=result["mime_type"],
            headers={
                "Content-Disposition": f'attachment; filename="weathergpt-voice.{audio_format.split("/")[-1]}"'
            }
        )
    else:
        raise HTTPException(status_code=500, detail="Failed to synthesize speech")


# =============================================================================
# Main
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting WeatherGPT Voice Service (voice_enabled={VOICE_ENABLED})")
    uvicorn.run(app, host="0.0.0.0", port=8001)
