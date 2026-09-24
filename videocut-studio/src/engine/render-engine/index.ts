import type { Project, ExportSettings, ExportProgress } from "@/types";

export interface RenderEngineOptions {
  width: number;
  height: number;
  fps: number;
  format: string;
  quality: number;
}

export interface RenderFrame {
  time: number;
  blob: Blob;
}

export class RenderEngine {
  private static instance: RenderEngine;
  private worker: Worker | null = null;
  private isRendering = false;
  private abortController: AbortController | null = null;
  private onProgress?: (progress: ExportProgress) => void;

  static getInstance(): RenderEngine {
    if (!RenderEngine.instance) {
      RenderEngine.instance = new RenderEngine();
    }
    return RenderEngine.instance;
  }

  async initialize(): Promise<void> {
    try {
      this.worker = new Worker(
        new URL("../workers/render.worker.ts", import.meta.url),
        { type: "module" }
      );

      this.worker.onmessage = (event: MessageEvent) => {
        const { type, payload, error } = event.data;

        if (error) {
          console.error("Render worker error:", error);
          return;
        }

        if (type === "frame-rendered" && payload && this.onProgress) {
          this.onProgress({
            progress: (payload.currentTime / 100) * 100,
            currentFrame: Math.floor(payload.currentTime),
            totalFrames: 100,
            estimatedTimeRemaining: 0,
            status: "encoding",
          });
        }
      };

      this.worker.onerror = (error) => {
        console.error("Render worker error:", error);
      };
    } catch (error) {
      console.error("Failed to initialize render engine:", error);
      this.worker = null;
    }
  }

  async renderProject(
    project: Project,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void
  ): Promise<Blob[]> {
    if (this.isRendering) {
      throw new Error("Rendering already in progress");
    }

    this.isRendering = true;
    this.onProgress = onProgress;
    this.abortController = new AbortController();

    try {
      const frames: Blob[] = [];
      const frameDuration = 1 / settings.fps;
      const startTime = settings.startTime || 0;
      const endTime = settings.endTime || project.duration;
      const totalFrames = Math.floor((endTime - startTime) * settings.fps);

      if (this.worker) {
        const messageId = crypto.randomUUID();

        for (let frame = 0; frame < totalFrames; frame++) {
          if (this.abortController.signal.aborted) {
            throw new Error("Render cancelled");
          }

          const currentTime = startTime + frame * frameDuration;

          const response = await this.sendMessageToWorker({
            type: "render-frame",
            id: messageId,
            payload: {
              project,
              currentTime,
              resolution: {
                width: settings.resolution === "4k" ? 3840 : settings.resolution === "1080p" ? 1920 : settings.resolution === "720p" ? 1280 : settings.resolution === "480p" ? 854 : 640,
                height: settings.resolution === "4k" ? 2160 : settings.resolution === "1080p" ? 1080 : settings.resolution === "720p" ? 720 : settings.resolution === "480p" ? 480 : 360,
              },
              settings: {
                width: settings.resolution === "4k" ? 3840 : settings.resolution === "1080p" ? 1920 : settings.resolution === "720p" ? 1280 : settings.resolution === "480p" ? 854 : 640,
                height: settings.resolution === "4k" ? 2160 : settings.resolution === "1080p" ? 1080 : settings.resolution === "720p" ? 720 : settings.resolution === "480p" ? 480 : 360,
              },
            },
          });

          if (response.payload?.frame) {
            frames.push(response.payload.frame);
          }

          onProgress({
            progress: ((frame + 1) / totalFrames) * 100,
            currentFrame: frame + 1,
            totalFrames,
            estimatedTimeRemaining: Math.max(0, Math.floor(((totalFrames - frame - 1) * frameDuration * 1000) / 1000)),
            status: "encoding",
          });

          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      } else {
        const { previewEngine } = await import("../preview-engine/index");
        const engine = previewEngine;

        for (let frame = 0; frame < totalFrames; frame++) {
          if (this.abortController.signal.aborted) {
            throw new Error("Render cancelled");
          }

          const currentTime = startTime + frame * frameDuration;

          engine.renderFrameAtTime(currentTime);
          const canvas = engine.getCanvas();

          if (canvas) {
            const blob = await new Promise<Blob>((resolve) => {
              canvas!.toBlob((b: Blob | null) => resolve(b!), "image/png", 1.0);
            });
            frames.push(blob);
          }

          onProgress({
            progress: ((frame + 1) / totalFrames) * 100,
            currentFrame: frame + 1,
            totalFrames,
            estimatedTimeRemaining: Math.max(0, Math.floor(((totalFrames - frame - 1) * frameDuration * 1000) / 1000)),
            status: "encoding",
          });

          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }

      onProgress({
        progress: 100,
        currentFrame: totalFrames,
        totalFrames,
        estimatedTimeRemaining: 0,
        status: "completed",
      });

      return frames;
    } catch (error) {
      onProgress({
        progress: 0,
        currentFrame: 0,
        totalFrames: 0,
        estimatedTimeRemaining: 0,
        status: "error",
        error: (error as Error).message,
      });
      throw error;
    } finally {
      this.isRendering = false;
      this.abortController = null;
      this.onProgress = undefined;
    }
  }

  cancelRender(): void {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.isRendering = false;
  }

  getRenderStatus(): { isRendering: boolean } {
    return { isRendering: this.isRendering };
  }

  private sendMessageToWorker(message: { type: string; payload?: unknown; id?: string }): Promise<{ type: string; payload?: { frame?: Blob }; id?: string; error?: string }> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error("Worker not initialized"));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error("Worker response timeout"));
      }, 30000);

      const handler = (event: MessageEvent) => {
        const data = event.data;
        if (data.id === message.id) {
          clearTimeout(timeout);
          this.worker!.removeEventListener("message", handler);
          resolve(data);
        }
      };

      this.worker.addEventListener("message", handler);
      this.worker.postMessage(message);
    });
  }

  dispose(): void {
    this.cancelRender();

    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const renderEngine = RenderEngine.getInstance();
