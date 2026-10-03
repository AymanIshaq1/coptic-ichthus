import { useContext } from 'react';
import { AmbientAudioContext, type AmbientAudioContextValue } from './AmbientAudioContext';

export function useAmbientAudio(): AmbientAudioContextValue {
  return useContext(AmbientAudioContext);
}
