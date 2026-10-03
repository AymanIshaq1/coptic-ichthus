/**
 * Google Analytics 4 (GA4) Integration Utility
 * 
 * Features:
 * - Environment variable based (VITE_GA_MEASUREMENT_ID)
 * - Safe fallback when ID is missing or blocked by adblockers
 * - SPA route tracking with deduplication
 * - Active engagement timing with Page Visibility API
 * - Privacy protection (PII scrubbing)
 * - Custom domain events for Church History
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Read GA4 Measurement ID from environment
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();

let isInitialized = false;
let lastTrackedPath: string | null = null;
let lastTrackedTime: number = 0;

/**
 * Scrub potentially sensitive strings to preserve privacy.
 */
function sanitizeValue(val: any): any {
  if (typeof val !== 'string') return val;
  // Redact email patterns
  const noEmail = val.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
  // Redact long digits (e.g., phone numbers or card-like strings)
  const noPhone = noEmail.replace(/\b\d{8,16}\b/g, '[REDACTED_NUMBER]');
  // Limit string length
  return noPhone.slice(0, 200);
}

/**
 * Sanitize event parameters
 */
function sanitizeParams(params?: Record<string, any>): Record<string, any> {
  if (!params) return {};
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    // Avoid sending sensitive parameter keys
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes('email') ||
      lowerKey.includes('phone') ||
      lowerKey.includes('password') ||
      lowerKey.includes('user') ||
      lowerKey.includes('name') && lowerKey.includes('user')
    ) {
      continue;
    }
    cleaned[key] = sanitizeValue(value);
  }
  return cleaned;
}

/**
 * Check if GA4 is active and configured
 */
export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-'));
}

/**
 * Initialize Google Analytics 4 asynchronously
 */
export function initGA(): void {
  if (isInitialized || typeof window === 'undefined') return;

  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer?.push(arguments);
    };

    // Load gtag script asynchronously
    const scriptId = 'ga4-gtag-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
      document.head.appendChild(script);
    }

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We control SPA page views manually
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    isInitialized = true;
  } catch (err) {
    // Gracefully handle any script loading or initialization errors
    console.warn('Google Analytics initialization skipped:', err);
  }
}

/**
 * Track custom events with automatic safety checks
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  try {
    const cleanEventName = eventName.trim().slice(0, 40);
    const cleanParams = sanitizeParams(params);

    if (window.gtag && isAnalyticsEnabled()) {
      window.gtag('event', cleanEventName, cleanParams);
    }
  } catch {
    // Silently ignore tracking errors so application is never disrupted
  }
}

/**
 * Track Single Page Application (SPA) Page Views with deduplication
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  // Prevent duplicate page view if fired twice for same route within 250ms
  if (lastTrackedPath === path && now - lastTrackedTime < 250) {
    return;
  }

  lastTrackedPath = path;
  lastTrackedTime = now;

  const pageTitle = title || document.title || 'Church History';
  const pageLocation = window.location.href;

  try {
    if (window.gtag && isAnalyticsEnabled()) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: pageTitle,
        page_location: pageLocation,
      });
    }
  } catch {
    // Silently catch error
  }
}

/**
 * Track when user opens or scrolls into a timeline
 */
export function trackTimelineOpen(pageName: string = 'history'): void {
  trackEvent('timeline_open', {
    page_name: pageName,
  });
}

/**
 * Track era selection on timeline
 */
export function trackTimelineEraSelected(eraName: string, pageName: string = 'history'): void {
  if (!eraName) return;
  trackEvent('timeline_era_selected', {
    era_name: eraName.trim().slice(0, 100),
    page_name: pageName,
  });
}

/**
 * Track search usage
 */
export function trackSearch(searchTerm: string, resultsCount?: number): void {
  const cleanTerm = searchTerm?.trim();
  if (!cleanTerm) return;

  trackEvent('search_used', {
    search_term: cleanTerm.slice(0, 100),
    results_count: typeof resultsCount === 'number' ? resultsCount : undefined,
  });
}

/**
 * Track audio/media playback
 */
export function trackAudioPlay(audioName: string, pageName: string = 'global'): void {
  if (!audioName) return;
  trackEvent('audio_played', {
    audio_name: audioName.trim().slice(0, 100),
    page_name: pageName,
  });
}

/**
 * Track when an important section is viewed or interacted with
 */
export function trackSectionView(sectionName: string, pageName: string): void {
  if (!sectionName) return;
  trackEvent('section_viewed', {
    section_name: sectionName.trim().slice(0, 100),
    page_name: pageName,
  });
}

/**
 * Track entering a page
 */
export function trackPageEnter(pageName: string): void {
  trackEvent('page_enter', {
    page_name: pageName,
  });
}

/**
 * Track exiting a page along with engagement duration
 */
export function trackPageExit(pageName: string, durationSeconds: number): void {
  if (durationSeconds <= 0) return;
  trackEvent('page_exit', {
    page_name: pageName,
    duration_seconds: Math.round(durationSeconds),
  });
}
