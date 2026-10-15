import { MapPin, Menu, Moon, Sun, X } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';
import type { LocationState } from '../location/LocationContext';

interface AppHeaderProps {
  locationName: string | null;
  locationStatus: LocationState['status'];
  lang: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onLocationClick?: () => void;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

/**
 * Top header: brand wordmark + location pill + EN/हिं toggle + theme
 * button. On mobile a menu button opens the nav drawer. No other chrome.
 *
 * The location pill reflects the canonical state truthfully: it shows the
 * selected name when one exists, the in-flight GPS lookup while the browser
 * is resolving a fix, and an explicit "select a location" prompt otherwise —
 * it never fabricates a place (§no-location).
 */
export default function AppHeader({
  locationName,
  locationStatus,
  lang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onLocationClick,
  drawerOpen,
  onToggleDrawer,
}: AppHeaderProps) {
  // Truthful pill copy for every LocationState discriminant.
  //
  // P3-014: a location restored from localStorage is a real prior choice but
  // NOT evidence of where the user is now, so it is named as saved. Showing it
  // as though it were a live fix is exactly the failure the original "no
  // default city" rule existed to prevent.
  const isRestored = locationStatus === 'restored';
  const pillLabel = locationName
    ? isRestored
      ? `${locationName}, saved from your last visit`
      : locationName
    : locationStatus === 'requesting-gps'
      ? 'Finding your location…'
      : locationStatus === 'denied' || locationStatus === 'error'
        ? 'Location unavailable'
        : 'Select a location';

  /**
   * P2-007: the accessible name must describe what activation WILL do.
   *
   * When permission is denied the browser will not prompt again, so the pill
   * opens the manual search rather than repeating a doomed GPS request. Saying
   * "Use my location" there would promise an action the control does not
   * perform, which is the same dead-control problem in a different form.
   */
  const pillAction = isRestored
    ? 'Use my current location instead'
    : locationStatus === 'denied'
      ? 'Search for a location'
      : locationStatus === 'error'
        ? 'Retry my location'
        : 'Use my location';

  return (
    <header className="top app-header">
      <button
        className="rail-toggle"
        onClick={onToggleDrawer}
        aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={drawerOpen}
      >
        {drawerOpen ? <X /> : <Menu />}
      </button>

      <span className="brand">WeatherGPT</span>

      <button
        type="button"
        className="location-pill"
        onClick={onLocationClick}
        title={pillAction}
        /* The visible text is a STATE ("Location unavailable", or the city
           name), so it is what a screen reader would otherwise announce — it
           tells the user what happened but not that activating the control
           does anything. Naming the action is what makes the control usable
           without sight; the state is still conveyed visually. */
        aria-label={pillAction}
        data-location-restored={isRestored ? 'true' : 'false'}
      >
        <MapPin />
        <span>{pillLabel}</span>
        {isRestored && (
          <span className="location-saved-tag" aria-hidden="true">saved</span>
        )}
      </button>

      <div className="lang-toggle" role="group" aria-label="Language">
        <button
          type="button"
          className={`lang-opt ${lang === 'en' ? 'on' : ''}`}
          data-lang="en"
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className={`lang-opt ${lang === 'hi' ? 'on' : ''}`}
          data-lang="hi"
          onClick={() => onLanguageChange('hi')}
        >
          हिं
        </button>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </header>
  );
}