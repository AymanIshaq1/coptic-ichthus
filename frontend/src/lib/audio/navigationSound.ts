/**
 * navigationSound.ts
 *
 * Ultra-soft ambient pad — pure sine waves only.
 * No instruments, no bells, no strings, no drums, no whoosh.
 *
 * Three pure sine tones form a gentle C-major chord that swells in slowly
 * and fades away softly — like a warm breath or a gentle ambient glow.
 * Completely unobtrusive. Duration ~600ms total.
 */

class NavigationSoundService {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private lastPlayedTime: number = 0;

  constructor() {
    this.enabled = this.readPreference();
  }

  private readPreference(): boolean {
    if (typeof window === 'undefined') return true;
    try {
      const val = localStorage.getItem('nav-sound-enabled');
      return val === null ? true : val === 'true';
    } catch {
      return true;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(value: boolean): void {
    this.enabled = value;
    try {
      localStorage.setItem('nav-sound-enabled', String(value));
    } catch {}
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) this.playChime();
    return this.enabled;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctor) this.ctx = new Ctor();
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  /**
   * Soft Ambient Pad:
   * Three pure sine waves (C4, E4, G4) with a gentle volume curve:
   *   - Slow rise over 120ms (no click, no attack)
   *   - Brief sustain
   *   - Smooth exponential fade to silence by 600ms
   *
   * Volume is intentionally very low so it registers as "presence"
   * rather than a distinct sound.
   */
  public playChime(options?: { volume?: number }): void {
    if (!this.enabled) return;

    const nowMs = Date.now();
    if (nowMs - this.lastPlayedTime < 400) return;
    this.lastPlayedTime = nowMs;

    const ctx = this.getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});

    const t = ctx.currentTime;
    const vol = options?.volume ?? 0.07; // very gentle volume

    // C4 · E4 · G4 — soft major chord, pure sine only
    const notes = [261.63, 329.63, 392.0];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Slightly stagger each note by 20ms for a gentle "bloom" effect
      const start = t + i * 0.02;

      gain.gain.setValueAtTime(0.0001, start);
      // Slow, smooth rise — no click, no attack transient
      gain.gain.linearRampToValueAtTime(vol, start + 0.12);
      // Smooth exponential fall to silence
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.65);
    });
  }
}

export const navigationSound = new NavigationSoundService();
export const playNavigationSound = (options?: { volume?: number }) => navigationSound.playChime(options);
