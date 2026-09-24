import { audioService } from "@/services/audio-service";
import type { Clip, Track, Project } from "@/types";

export interface AudioEngineOptions {
  volume: number;
  muted: boolean;
  fadeIn: number;
  fadeOut: number;
}

export interface AudioTrackState {
  trackId: string;
  volume: number;
  muted: boolean;
  solo: boolean;
  pan: number;
}

export class AudioEngine {
  private static instance: AudioEngine;
  private isInitialized = false;
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private trackStates: Map<string, AudioTrackState> = new Map();
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private scheduledSources: AudioBufferSourceNode[] = [];
  private currentSources: Map<string, AudioBufferSourceNode> = new Map();
  private currentGains: Map<string, GainNode> = new Map();
  private options: AudioEngineOptions;
  private onTimeUpdate?: (time: number) => void;
  private animationFrameId: number | null = null;
  private startTime = 0;
  private pausedAt = 0;
  private isPlaying = false;
  private project: Project | null = null;

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  constructor(options?: Partial<AudioEngineOptions>) {
    this.options = {
      volume: options?.volume ?? 1,
      muted: options?.muted ?? false,
      fadeIn: options?.fadeIn ?? 0,
      fadeOut: options?.fadeOut ?? 0,
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.audioContext = audioService.getAudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.options.muted ? 0 : this.options.volume;

      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize audio engine:", error);
      throw error;
    }
  }

  setProject(project: Project): void {
    this.project = project;
  }

  async loadTracks(tracks: Track[]): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    for (const track of tracks) {
      if (track.type !== "audio") continue;

      this.trackStates.set(track.id, {
        trackId: track.id,
        volume: 1,
        muted: track.muted,
        solo: false,
        pan: 0,
      });

      for (const clip of track.clips) {
        if (clip.type === "audio" && clip.asset?.url) {
          const audioUrl = clip.asset.url;
          try {
            const buffer = await this.loadAudioBuffer(audioUrl);
            this.audioBuffers.set(clip.id, buffer);
          } catch (error) {
            console.error(`Failed to load audio for clip ${clip.id}:`, error);
          }
        }
      }
    }
  }

  async play(startTime = 0): Promise<void> {
    if (!this.isInitialized || this.isPlaying) return;

    if (this.audioContext?.state === "suspended") {
      await this.audioContext.resume();
    }

    this.stop();
    this.startTime = this.audioContext!.currentTime - startTime;
    this.pausedAt = startTime;
    this.isPlaying = true;

    this.scheduleAllClips(startTime);
    this.startTimeUpdateLoop();
  }

  pause(): void {
    if (!this.isPlaying) return;

    this.pausedAt = this.getCurrentTime();
    this.stopAllSources();
    this.isPlaying = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  stop(): void {
    this.stopAllSources();
    this.isPlaying = false;
    this.pausedAt = 0;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  seek(time: number): void {
    const wasPlaying = this.isPlaying;
    this.stop();
    this.pausedAt = time;

    if (wasPlaying) {
      this.play(time);
    }
  }

  getCurrentTime(): number {
    if (!this.audioContext) return this.pausedAt;

    if (this.isPlaying) {
      return this.audioContext.currentTime - this.startTime;
    }

    return this.pausedAt;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  setVolume(volume: number): void {
    this.options.volume = Math.max(0, Math.min(1, volume));

    if (this.masterGain) {
      this.masterGain.gain.value = this.options.muted ? 0 : this.options.volume;
    }
  }

  setMuted(muted: boolean): void {
    this.options.muted = muted;

    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.options.volume;
    }
  }

  setTrackState(trackId: string, state: Partial<AudioTrackState>): void {
    const currentState = this.trackStates.get(trackId) || {
      trackId,
      volume: 1,
      muted: false,
      solo: false,
      pan: 0,
    };

    this.trackStates.set(trackId, { ...currentState, ...state });
  }

  getTrackState(trackId: string): AudioTrackState | undefined {
    return this.trackStates.get(trackId);
  }

  getAudioBuffer(clipId: string): AudioBuffer | undefined {
    return this.audioBuffers.get(clipId);
  }

  async applyEffect(clipId: string, effectType: "reverb" | "echo" | "distortion" | "compressor" | "lowpass" | "highpass"): Promise<AudioBuffer | null> {
    const buffer = this.audioBuffers.get(clipId);
    if (!buffer) return null;

    try {
      const result = await audioService.applyAudioEffect(buffer, effectType);
      this.audioBuffers.set(clipId, result);
      return result;
    } catch (error) {
      console.error("Error applying audio effect:", error);
      return null;
    }
  }

  private async loadAudioBuffer(url: string): Promise<AudioBuffer> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioService.decodeAudioData(arrayBuffer);

      if (!buffer) {
        throw new Error("Failed to decode audio buffer");
      }

      return buffer;
    } catch (error) {
      console.error("Error loading audio buffer:", error);
      throw error;
    }
  }

  private scheduleAllClips(fromTime: number): void {
    if (!this.project) return;

    const audioTracks = this.project.tracks.filter((track) => track.type === "audio");

    for (const track of audioTracks) {
      const trackState = this.trackStates.get(track.id);

      if (trackState?.muted) continue;

      for (const clip of track.clips) {
        if (clip.type !== "audio") continue;

        if (clip.muted) continue;

        const clipEnd = clip.start + clip.duration;
        if (clipEnd < fromTime) continue;

        const buffer = this.audioBuffers.get(clip.id);
        if (!buffer) continue;

        const offset = Math.max(0, fromTime - clip.start);
        const duration = clipEnd - fromTime;

        this.scheduleClip(clip.id, buffer, offset, duration, clip.volume);
      }
    }
  }

  private scheduleClip(
    clipId: string,
    buffer: AudioBuffer,
    offset: number,
    duration: number,
    volume: number
  ): void {
    if (!this.audioContext || !this.masterGain) return;

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const panner = this.audioContext.createStereoPanner();

    source.buffer = buffer;
    gain.gain.value = volume;
    panner.pan.value = 0;

    source.connect(gain);
    gain.connect(panner);
    panner.connect(this.masterGain);

    source.onended = () => {
      this.currentSources.delete(clipId);
      this.currentGains.delete(clipId);
    };

    source.start(0, offset, duration);

    this.currentSources.set(clipId, source);
    this.currentGains.set(clipId, gain);
    this.scheduledSources.push(source);
  }

  private stopAllSources(): void {
    for (const source of this.currentSources.values()) {
      try {
        source.onended = null;
        source.stop();
      } catch {
        // already stopped
      }
    }

    for (const gain of this.currentGains.values()) {
      gain.disconnect();
    }

    this.currentSources.clear();
    this.currentGains.clear();
    this.scheduledSources = [];
  }

  private startTimeUpdateLoop(): void {
    const update = () => {
      if (this.onTimeUpdate && this.isPlaying) {
        this.onTimeUpdate(this.getCurrentTime());
      }

      if (this.isPlaying) {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  setCallbacks(callbacks: { onTimeUpdate?: (time: number) => void }): void {
    this.onTimeUpdate = callbacks.onTimeUpdate;
  }

  getOptions(): AudioEngineOptions {
    return { ...this.options };
  }

  dispose(): void {
    this.stop();
    this.audioBuffers.clear();
    this.trackStates.clear();

    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isInitialized = false;
  }
}

export const audioEngine = AudioEngine.getInstance();
