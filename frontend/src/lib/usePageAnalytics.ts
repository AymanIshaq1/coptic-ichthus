import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initGA,
  trackPageView,
  trackPageEnter,
  trackPageExit,
} from './analytics';

/**
 * Custom hook to handle SPA route transitions, active page engagement tracking,
 * and visibility state detection using the Page Visibility API.
 */
export function usePageAnalytics(): void {
  const location = useLocation();
  const currentPathRef = useRef<string>(location.pathname);
  const activeTimeRef = useRef<number>(0);
  const lastActiveTimestampRef = useRef<number>(Date.now());
  const isTabVisibleRef = useRef<boolean>(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  // 1. Initialize GA once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Helper to pause/accumulate active viewing time
  const accumulateActiveTime = () => {
    if (isTabVisibleRef.current) {
      const now = Date.now();
      const elapsed = (now - lastActiveTimestampRef.current) / 1000;
      if (elapsed > 0) {
        activeTimeRef.current += elapsed;
      }
      lastActiveTimestampRef.current = now;
    }
  };

  // 2. Track Route Changes & Calculate Active Engagement Time
  useEffect(() => {
    const newPath = location.pathname;
    const oldPath = currentPathRef.current;

    // Send page exit event for previous path if there was accumulated time
    accumulateActiveTime();
    if (activeTimeRef.current > 0.5) {
      trackPageExit(oldPath || 'home', activeTimeRef.current);
    }

    // Reset timer for new page
    activeTimeRef.current = 0;
    lastActiveTimestampRef.current = Date.now();
    currentPathRef.current = newPath;

    // Track SPA Page View & Page Enter
    trackPageView(newPath);
    trackPageEnter(newPath || 'home');
  }, [location.pathname]);

  // 3. Handle Page Visibility changes (switching tabs or minimizing window)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Tab became active again - restart timestamp
        isTabVisibleRef.current = true;
        lastActiveTimestampRef.current = Date.now();
      } else {
        // Tab went into background - pause and accumulate time up to now
        accumulateActiveTime();
        isTabVisibleRef.current = false;
      }
    };

    const handleBeforeUnload = () => {
      accumulateActiveTime();
      if (activeTimeRef.current > 0.5) {
        trackPageExit(currentPathRef.current || 'home', activeTimeRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
