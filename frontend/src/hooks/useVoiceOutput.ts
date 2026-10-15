import { useCallback, useEffect, useRef, useState } from 'react';

export type SpeechStatus = 'idle' | 'speaking' | 'paused';

interface UseVoiceOutputReturn {
  status: SpeechStatus;
  currentlySpeakingId: string | null;
  speak: (text: string, messageId?: string, lang?: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSupported: boolean;
  isSpeaking: boolean;
}

/**
 * Preprocesses weather bot output into natural, fluent spoken English.
 * - Converts temperatures (32°C -> 32 degrees Celsius)
 * - Converts wind speeds (19 km/h -> 19 kilometers per hour)
 * - Converts pressure (1013 hPa -> 1013 hectopascals)
 * - Converts percentages (78% -> 78 percent)
 * - Strips emojis and raw markdown symbols that sound awkward when read aloud
 * - Expands common abbreviations for natural pacing
 */
export function prepareWeatherSpeechText(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // 2. Expand weather metrics & symbols into words
  text = text.replace(/(\d+(?:\.\d+)?)\s*°\s*C\b/gi, '$1 degrees Celsius');
  text = text.replace(/(\d+(?:\.\d+)?)\s*°\s*F\b/gi, '$1 degrees Fahrenheit');
  text = text.replace(/(\d+(?:\.\d+)?)\s*°/g, '$1 degrees');

  // Wind speed
  text = text.replace(/(\d+(?:\.\d+)?)\s*km\/h\b/gi, '$1 kilometers per hour');
  text = text.replace(/(\d+(?:\.\d+)?)\s*m\/s\b/gi, '$1 meters per second');

  // Air pressure
  text = text.replace(/(\d+(?:\.\d+)?)\s*hPa\b/gi, '$1 hectopascals');

  // Humidity & probability percentages
  text = text.replace(/(\d+(?:\.\d+)?)\s*%/g, '$1 percent');

  // Precipitation
  text = text.replace(/(\d+(?:\.\d+)?)\s*mm\/hr\b/gi, '$1 millimeters per hour');
  text = text.replace(/(\d+(?:\.\d+)?)\s*mm\b/gi, '$1 millimeters');

  // 3. Remove emojis (Unicode symbols, pictographs, weather emojis)
  text = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{FE00}-\u{FE0F}]/gu, '');

  // 4. Strip markdown formatting
  text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // bold
  text = text.replace(/\*(.*?)\*/g, '$1');     // italics
  text = text.replace(/`([^`]+)`/g, '$1');     // inline code
  text = text.replace(/^#+\s+/gm, '');         // headers
  text = text.replace(/^[•\-*]\s+/gm, '');    // bullets
  text = text.replace(/•/g, ',');

  // 5. Expand abbreviations for fluent audio delivery
  text = text.replace(/\be\.g\.,?\s*/gi, 'for example, ');
  text = text.replace(/\bi\.e\.,?\s*/gi, 'that is, ');
  text = text.replace(/\bapprox\.,?\s*/gi, 'approximately ');
  text = text.replace(/\btemp\b/gi, 'temperature');
  text = text.replace(/\bmax\b/gi, 'maximum');
  text = text.replace(/\bmin\b/gi, 'minimum');

  // 6. Clean punctuation & normalize spacing
  text = text.replace(/[\\/#_~]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Chooses the most natural, human-sounding English voice available in the browser.
 */
function selectBestVoice(voices: SpeechSynthesisVoice[], preferredLang: string = 'en-US'): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // 1. First priority: High-quality natural / neural cloud voices
  const naturalKeywords = ['natural', 'online', 'neural', 'google', 'premium'];
  const naturalVoice = voices.find(
    (v) => v.lang.startsWith('en') && naturalKeywords.some((k) => v.name.toLowerCase().includes(k))
  );
  if (naturalVoice) return naturalVoice;

  // 2. Second priority: Popular expressive system voices
  const preferredNames = ['samantha', 'jenny', 'aria', 'guy', 'zira', 'karen', 'daniel', 'serena'];
  const preferredVoice = voices.find(
    (v) => v.lang.startsWith('en') && preferredNames.some((name) => v.name.toLowerCase().includes(name))
  );
  if (preferredVoice) return preferredVoice;

  // 3. Third priority: exact language code match
  const exactMatch = voices.find((v) => v.lang.toLowerCase() === preferredLang.toLowerCase());
  if (exactMatch) return exactMatch;

  // 4. Fourth priority: any English voice
  const anyEnglish = voices.find((v) => v.lang.startsWith('en'));
  if (anyEnglish) return anyEnglish;

  return voices.find((v) => v.default) || voices[0] || null;
}

/**
 * Enhanced hook for reading WeatherGPT output aloud with natural voice selection,
 * specialized weather unit conversion, pause/resume, and Chrome keep-alive.
 */
export function useVoiceOutput(): UseVoiceOutputReturn {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimerRef = useRef<any>(null);

  const isSupported = typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined';

  // Load and cache voices
  useEffect(() => {
    if (!isSupported) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (!available || available.length === 0) return;
      setVoices((prev) => {
        if (prev.length === available.length) {
          const same = prev.every(
            (v, i) => v.name === available[i].name && v.lang === available[i].lang
          );
          if (same) return prev;
        }
        return available;
      });
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported]);

  // Clean up keep-alive timer helper
  const clearKeepAlive = useCallback(() => {
    if (keepAliveTimerRef.current) {
      clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
  }, []);

  // Stop speech completely
  const stop = useCallback(() => {
    if (!isSupported) return;
    clearKeepAlive();
    window.speechSynthesis.cancel();
    setStatus('idle');
    setCurrentlySpeakingId(null);
    utteranceRef.current = null;
  }, [isSupported, clearKeepAlive]);

  // Chrome 14-second freeze workaround: briefly pause and resume to reset Chrome's speech timer
  const startKeepAlive = useCallback(() => {
    clearKeepAlive();
    keepAliveTimerRef.current = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 9000);
  }, [clearKeepAlive]);

  // Speak method
  const speak = useCallback(
    (rawText: string, messageId?: string, lang: string = 'en-US') => {
      if (!isSupported || !rawText) return;

      // If already speaking the same message, clicking again toggles STOP
      if (messageId && currentlySpeakingId === messageId && status === 'speaking') {
        stop();
        return;
      }

      // Stop any current playback
      stop();

      const spokenText = prepareWeatherSpeechText(rawText);
      if (!spokenText) return;

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = lang;
      utterance.rate = 1.02; // natural conversational tempo
      utterance.pitch = 1.0;

      // Pick highest quality voice
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const bestVoice = selectBestVoice(currentVoices, lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        setStatus('speaking');
        if (messageId) setCurrentlySpeakingId(messageId);
        startKeepAlive();
      };

      utterance.onend = () => {
        setStatus('idle');
        setCurrentlySpeakingId(null);
        clearKeepAlive();
      };

      utterance.onerror = (e) => {
        // 'interrupted' or 'canceled' are normal when user clicks stop
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setStatus('idle');
        setCurrentlySpeakingId(null);
        clearKeepAlive();
      };

      utterance.onpause = () => setStatus('paused');
      utterance.onresume = () => setStatus('speaking');

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, status, currentlySpeakingId, voices, stop, startKeepAlive, clearKeepAlive]
  );

  const pause = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus('speaking');
    }
  }, [isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    status,
    currentlySpeakingId,
    speak,
    stop,
    pause,
    resume,
    isSupported,
    isSpeaking: status === 'speaking',
  };
}
