import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { ambientAudioManager } from './AmbientAudioManager';

export interface AmbientAudioContextValue {
  enabled: boolean;
  toggle: () => void;
  duck: () => void;
  restore: () => void;
}

export const AmbientAudioContext = createContext<AmbientAudioContextValue>({
  enabled: true,
  toggle: () => {},
  duck: () => {},
  restore: () => {},
});

export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(() => ambientAudioManager.isEnabled());
  const initializedRef = useRef(false);

  const toggle = useCallback(() => {
    const turningOn = !ambientAudioManager.isEnabled();
    ambientAudioManager.setEnabled(turningOn);
    setEnabled(turningOn);
  }, []);

  const duck = useCallback(() => ambientAudioManager.duck(), []);
  const restore = useCallback(() => ambientAudioManager.restore(), []);

  // Global listener to initialize audio on first user interaction
  useEffect(() => {
    const initAudio = async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      await ambientAudioManager.init();
    };

    const handleInteraction = () => {
      initAudio();
      // Only need to initialize once to satisfy autoplay constraints
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
      document.removeEventListener('keydown', handleInteraction, true);
    };

    // Attach passive listeners to capture the first interaction smoothly
    document.addEventListener('click', handleInteraction, { capture: true, passive: true });
    document.addEventListener('touchstart', handleInteraction, { capture: true, passive: true });
    document.addEventListener('keydown', handleInteraction, { capture: true, passive: true });

    return () => {
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
      document.removeEventListener('keydown', handleInteraction, true);
    };
  }, []);

  return (
    <AmbientAudioContext.Provider value={{ enabled, toggle, duck, restore }}>
      {children}
    </AmbientAudioContext.Provider>
  );
}
