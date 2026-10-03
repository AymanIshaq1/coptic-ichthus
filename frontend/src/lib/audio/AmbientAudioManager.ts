/**
 * AmbientAudioManager — Premium Ambient Audio System
 *
 * Plays a continuous ambient background track.
 * Uses MediaElementAudioSourceNode for memory efficiency (streaming)
 * while using a GainNode for ultra-smooth crossfading.
 */

// We import the asset so Vite bundles it and gives us the correct URL.
import ambientAudioSrc from '@/image/ambient-bg.mpeg';
import { trackAudioPlay } from '@/lib/analytics';

const AMBIENT_MAX_VOLUME = 0.12; // 12% max volume for subtlety
const FADE_DURATION = 1.5; // Seconds

class AmbientAudioManager {
  private audioEl: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private initialized = false;
  private enabled = true;
  private isDucked = false;

  constructor() {
    this.enabled = this.readPreference();
    this.watchReducedMotion();
  }

  private readPreference(): boolean {
    try {
      const v = localStorage.getItem('ambient-sound-enabled');
      return v === null ? true : v === 'true';
    } catch {
      return true;
    }
  }

  private savePreference(v: boolean): void {
    try {
      localStorage.setItem('ambient-sound-enabled', String(v));
    } catch {
      // Ignore quota or private-mode errors
    }
  }

  private watchReducedMotion(): void {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)');
    
    // If user has sensory reduction preferences and hasn't explicitly set a preference,
    // default the ambient audio to off.
    if (mq.matches && localStorage.getItem('ambient-sound-enabled') === null) {
      this.enabled = false;
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(v: boolean): void {
    this.enabled = v;
    this.savePreference(v);

    if (!v) {
      this.fadeOut();
    } else {
      if (this.initialized) {
        this.fadeIn();
      } else {
        this.init(); // Initialize and play
      }
    }
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    if (!this.enabled) return; // Wait until enabled before allocating resources

    this.initialized = true;

    try {
      const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;

      this.ctx = new Ctor();
      this.audioEl = new Audio(ambientAudioSrc);
      this.audioEl.loop = true;
      this.audioEl.crossOrigin = 'anonymous';

      const source = this.ctx.createMediaElementSource(this.audioEl);
      this.gainNode = this.ctx.createGain();
      
      // Start with 0 volume to prevent abrupt sounds
      this.gainNode.gain.value = 0;
      
      source.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      await this.audioEl.play();
      this.fadeIn();
      trackAudioPlay('ambient_background', 'ambient_system');
    } catch (e) {
      // Silently fail on autoplay prevention or other audio errors
      console.warn("Ambient audio initialization failed:", e);
    }
  }

  private getTargetVolume(): number {
    if (!this.enabled) return 0;
    if (this.isDucked) return AMBIENT_MAX_VOLUME * 0.4;
    return AMBIENT_MAX_VOLUME;
  }

  private fadeIn(): void {
    if (!this.ctx || !this.gainNode || !this.audioEl) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    
    if (this.audioEl.paused) {
      this.audioEl.play().catch(() => {});
    }

    const t = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(t);
    // Exponential ramp feels more natural for audio volume, but linear is safer for 0 -> X.
    // We'll use a fast jump to a very low value, then exponential ramp.
    const currentGain = Math.max(this.gainNode.gain.value, 0.001);
    this.gainNode.gain.setValueAtTime(currentGain, t);
    
    const target = Math.max(this.getTargetVolume(), 0.001);
    this.gainNode.gain.exponentialRampToValueAtTime(target, t + FADE_DURATION);
  }

  private fadeOut(): void {
    if (!this.ctx || !this.gainNode || !this.audioEl) return;
    
    const t = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(t);
    const currentGain = Math.max(this.gainNode.gain.value, 0.001);
    this.gainNode.gain.setValueAtTime(currentGain, t);
    
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, t + FADE_DURATION);
    this.gainNode.gain.linearRampToValueAtTime(0, t + FADE_DURATION + 0.1);
    
    // Pause the media element to save battery/CPU when fully faded out
    setTimeout(() => {
      if (!this.enabled && this.audioEl && !this.audioEl.paused) {
        this.audioEl.pause();
      }
    }, FADE_DURATION * 1000 + 200);
  }

  /**
   * Dim the volume (e.g., when a notification or interaction sound plays)
   */
  duck(): void {
    if (!this.enabled || this.isDucked) return;
    this.isDucked = true;
    this.fadeIn(); // Evaluates getTargetVolume and adjusts
  }

  /**
   * Restore volume back to max ambient level
   */
  restore(): void {
    if (!this.enabled || !this.isDucked) return;
    this.isDucked = false;
    this.fadeIn();
  }
}

export const ambientAudioManager = new AmbientAudioManager();
