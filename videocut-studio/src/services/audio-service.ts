export class AudioService {
  private static instance: AudioService;
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private currentGain: GainNode | null = null;
  private isPlaying = false;

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async playAudio(
    url: string,
    startTime = 0,
    endTime?: number
  ): Promise<void> {
    this.stopAudio();

    try {
      const context = this.getAudioContext();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      const source = context.createBufferSource();
      const gain = context.createGain();

      source.buffer = audioBuffer;
      source.connect(gain);
      gain.connect(context.destination);

      source.onended = () => {
        this.isPlaying = false;
      };

      const duration = endTime
        ? Math.min(endTime - startTime, audioBuffer.duration - startTime)
        : audioBuffer.duration - startTime;

      source.start(0, startTime, duration);

      this.currentSource = source;
      this.currentGain = gain;
      this.isPlaying = true;
    } catch (error) {
      console.error("Error playing audio:", error);
      throw error;
    }
  }

  stopAudio(): void {
    if (this.currentSource) {
      try {
        this.currentSource.onended = null;
        this.currentSource.stop();
      } catch {
        // already stopped
      }
      this.currentSource = null;
    }

    if (this.currentGain) {
      this.currentGain.disconnect();
      this.currentGain = null;
    }

    this.isPlaying = false;
  }

  setVolume(volume: number): void {
    if (this.currentGain) {
      this.currentGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  mute(): void {
    if (this.currentGain) {
      this.currentGain.gain.value = 0;
    }
  }

  unmute(volume = 1): void {
    if (this.currentGain) {
      this.currentGain.gain.value = volume;
    }
  }

  async extractAudioFromVideo(videoUrl: string): Promise<AudioBuffer | null> {
    try {
      const context = this.getAudioContext();
      const response = await fetch(videoUrl);
      const arrayBuffer = await response.arrayBuffer();
      return await context.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error("Error extracting audio from video:", error);
      return null;
    }
  }

  async applyAudioEffect(
    audioBuffer: AudioBuffer,
    effectType: "reverb" | "echo" | "distortion" | "compressor" | "lowpass" | "highpass"
  ): Promise<AudioBuffer> {
    const context = this.getAudioContext();
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;

    switch (effectType) {
      case "reverb":
        const convolver = offlineContext.createConvolver();
        const reverbBuffer = await this.createReverbImpulse(offlineContext);
        convolver.buffer = reverbBuffer;
        source.connect(convolver);
        convolver.connect(offlineContext.destination);
        break;

      case "echo":
        const delay = offlineContext.createDelay(1.0);
        delay.delayTime.value = 0.3;
        const feedback = offlineContext.createGain();
        feedback.gain.value = 0.4;
        source.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(offlineContext.destination);
        break;

      case "distortion":
        const distortion = offlineContext.createWaveShaper();
        distortion.curve = this.makeDistortionCurve(50) as Float32Array<ArrayBuffer>;
        distortion.oversample = "4x";
        source.connect(distortion);
        distortion.connect(offlineContext.destination);
        break;

      case "compressor":
        const compressor = offlineContext.createDynamicsCompressor();
        compressor.threshold.value = -50;
        compressor.knee.value = 40;
        compressor.ratio.value = 12;
        source.connect(compressor);
        compressor.connect(offlineContext.destination);
        break;

      case "lowpass":
        const lowpass = offlineContext.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 1000;
        source.connect(lowpass);
        lowpass.connect(offlineContext.destination);
        break;

      case "highpass":
        const highpass = offlineContext.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 1000;
        source.connect(highpass);
        highpass.connect(offlineContext.destination);
        break;

      default:
        source.connect(offlineContext.destination);
    }

    source.start();
    return await offlineContext.startRendering();
  }

  private async createReverbImpulse(context: OfflineAudioContext): Promise<AudioBuffer> {
    const length = context.sampleRate * 2;
    const impulse = context.createBuffer(2, length, context.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }

    return impulse;
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  async decodeAudioData(arrayBuffer: ArrayBuffer | ArrayBufferLike): Promise<AudioBuffer | null> {
    try {
      const context = this.getAudioContext();
      const buffer = arrayBuffer instanceof ArrayBuffer ? arrayBuffer : new Uint8Array(arrayBuffer as ArrayBufferLike).buffer as ArrayBuffer;
      return await context.decodeAudioData(buffer.slice(0));
    } catch (error) {
      console.error("Error decoding audio data:", error);
      return null;
    }
  }

  dispose(): void {
    this.stopAudio();

    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const audioService = AudioService.getInstance();
