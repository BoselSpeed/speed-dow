import type { Project, Clip, ExportProgress } from "@/types";

export interface PreviewEngineOptions {
  width: number;
  height: number;
  fps: number;
}

export class PreviewEngine {
  private static instance: PreviewEngine;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private options: PreviewEngineOptions;
  private currentProject: Project | null = null;
  private isPlaying = false;
  private currentTime = 0;
  private lastFrameTime = 0;
  private onTimeUpdate?: (time: number) => void;
  private onFrame?: (frame: ImageBitmap | HTMLCanvasElement) => void;

  static getInstance(): PreviewEngine {
    if (!PreviewEngine.instance) {
      PreviewEngine.instance = new PreviewEngine();
    }
    return PreviewEngine.instance;
  }

  constructor(options?: Partial<PreviewEngineOptions>) {
    this.options = {
      width: options?.width || 1920,
      height: options?.height || 1080,
      fps: options?.fps || 30,
    };
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
  }

  setProject(project: Project): void {
    this.currentProject = project;
    this.currentTime = 0;
  }

  setOptions(options: Partial<PreviewEngineOptions>): void {
    this.options = { ...this.options, ...options };

    if (this.canvas) {
      this.canvas.width = this.options.width;
      this.canvas.height = this.options.height;
    }
  }

  play(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.lastFrameTime = performance.now();
    this.renderLoop();
  }

  pause(): void {
    this.isPlaying = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  stop(): void {
    this.pause();
    this.currentTime = 0;
    this.renderFrame(0);
  }

  seek(time: number): void {
    if (!this.currentProject) return;

    this.currentTime = Math.max(0, Math.min(time, this.currentProject.duration));
    this.renderFrame(this.currentTime);

    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime);
    }
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  setCallbacks(callbacks: { onTimeUpdate?: (time: number) => void; onFrame?: (frame: HTMLCanvasElement | ImageBitmap) => void }): void {
    this.onTimeUpdate = callbacks.onTimeUpdate;
    this.onFrame = callbacks.onFrame;
  }

  private renderLoop = (): void => {
    if (!this.isPlaying || !this.currentProject) return;

    const now = performance.now();
    const deltaTime = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    this.currentTime += deltaTime;

    if (this.currentTime >= this.currentProject.duration) {
      this.currentTime = this.currentProject.duration;
      this.pause();
    }

    this.renderFrame(this.currentTime);

    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime);
    }

    if (this.isPlaying) {
      this.animationFrameId = requestAnimationFrame(this.renderLoop);
    }
  };

  renderFrame(time: number): void {
    if (!this.ctx || !this.canvas || !this.currentProject) return;

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const videoTracks = this.currentProject.tracks
      .filter((track) => track.type === "video")
      .sort((a, b) => a.order - b.order);

    for (const track of videoTracks) {
      if (track.muted || !track.visible) continue;

      const clip = track.clips.find((c) => time >= c.start && time < c.start + c.duration);

      if (clip && clip.type === "video" && (clip as { asset?: { url?: string } }).asset?.url) {
        const assetUrl = (clip as { asset: { url: string } }).asset.url;
        const img = new Image();
        img.src = assetUrl;

        if (img.complete) {
          this.ctx.globalAlpha = clip.opacity;
          this.ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
          this.ctx.globalAlpha = 1;
        }
      }
    }

    const textTracks = this.currentProject.tracks.filter((track) => track.type === "text");
    for (const track of textTracks) {
      if (track.muted || !track.visible) continue;

      const clip = track.clips.find((c) => time >= c.start && time < c.start + c.duration);

      if (clip && clip.type === "text") {
        const textClip = clip as { text: string; fontSize: number; color: string; position: { x: number; y: number } };

        this.ctx.font = `${textClip.fontSize}px Arial`;
        this.ctx.fillStyle = textClip.color;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        const x = (textClip.position.x / 100) * this.canvas.width;
        const y = (textClip.position.y / 100) * this.canvas.height;

        this.ctx.fillText(textClip.text, x, y);
      }
    }

    if (this.onFrame) {
      this.onFrame(this.canvas);
    }
  }

  renderFrameAtTime(time: number): void {
    this.currentTime = time;
    this.renderFrame(time);
  }

  getFrameBuffer(): ImageData | null {
    if (!this.ctx || !this.canvas) return null;
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvas(): HTMLCanvasElement | null {
    return this.canvas;
  }

  resize(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;

    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  dispose(): void {
    this.pause();
    this.canvas = null;
    this.ctx = null;
    this.currentProject = null;
    this.onTimeUpdate = undefined;
    this.onFrame = undefined;
  }
}

export const previewEngine = PreviewEngine.getInstance();
