import type { Project, ExportSettings, ExportProgress } from "@/types";

export class ExportService {
  private static instance: ExportService;
  private abortController: AbortController | null = null;
  private isExporting = false;

  static getInstance(): ExportService {
    if (!ExportService.instance) {
      ExportService.instance = new ExportService();
    }
    return ExportService.instance;
  }

  async exportVideo(
    project: Project,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void
  ): Promise<Blob> {
    if (this.isExporting) {
      throw new Error("Export already in progress");
    }

    this.isExporting = true;
    this.abortController = new AbortController();

    onProgress({
      progress: 0,
      currentFrame: 0,
      totalFrames: Math.floor(
        ((settings.endTime || project.duration) - (settings.startTime || 0)) * settings.fps
      ),
      estimatedTimeRemaining: 0,
      status: "preparing",
    });

    try {
      if (typeof window !== "undefined" && "VideoEncoder" in window) {
        return await this.exportWithWebCodecs(project, settings, onProgress);
      } else if (typeof window !== "undefined" && "FFmpeg" in window) {
        return await this.exportWithFFmpeg(project, settings, onProgress);
      } else {
        return await this.exportFallback(project, settings, onProgress);
      }
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
      this.isExporting = false;
      this.abortController = null;
    }
  }

  private async exportWithWebCodecs(
    project: Project,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void
  ): Promise<Blob> {
    onProgress({
      progress: 0,
      currentFrame: 0,
      totalFrames: Math.floor(
        ((settings.endTime || project.duration) - (settings.startTime || 0)) * settings.fps
      ),
      estimatedTimeRemaining: 0,
      status: "encoding",
    });

    const frames: Blob[] = [];
    const frameDuration = 1 / settings.fps;
    const startTime = settings.startTime || 0;
    const endTime = settings.endTime || project.duration;
    const totalFrames = Math.floor((endTime - startTime) * settings.fps);

    for (let frame = 0; frame < totalFrames; frame++) {
      if (this.abortController?.signal.aborted) {
        throw new Error("Export cancelled");
      }

      const currentTime = startTime + frame * frameDuration;
      const frameBlob = await this.renderFrame(project, currentTime, settings);
      frames.push(frameBlob);

      onProgress({
        progress: ((frame + 1) / totalFrames) * 100,
        currentFrame: frame + 1,
        totalFrames,
        estimatedTimeRemaining: Math.max(
          0,
          Math.floor(((totalFrames - frame - 1) * frameDuration * 1000) / 1000)
        ),
        status: "encoding",
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    return new Blob(frames, { type: "image/gif" });
  }

  private async exportWithFFmpeg(
    project: Project,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void
  ): Promise<Blob> {
    onProgress({
      progress: 0,
      currentFrame: 0,
      totalFrames: Math.floor(
        ((settings.endTime || project.duration) - (settings.startTime || 0)) * settings.fps
      ),
      estimatedTimeRemaining: 0,
      status: "encoding",
    });

    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { fetchFile } = await import("@ffmpeg/util");

    const ffmpeg = new FFmpeg();

    ffmpeg.on("progress", ({ progress }) => {
      onProgress({
        progress: progress * 100,
        currentFrame: Math.floor(progress * 100),
        totalFrames: 100,
        estimatedTimeRemaining: 0,
        status: "encoding",
      });
    });

    await ffmpeg.load({
      coreURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/index.js",
      wasmURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm",
    });

    const videoTracks = project.tracks.filter((t) => t.type === "video");
    const audioTracks = project.tracks.filter((t) => t.type === "audio");

    const inputFiles: string[] = [];
    const outputFileName = `output.${settings.format === "mp4" ? "mp4" : settings.format}`;

    for (const track of videoTracks) {
      for (const clip of track.clips) {
        if ((clip as { asset?: { url?: string } }).asset?.url) {
          const fileName = `input_${clip.id}.${this.getExtension((clip as { asset?: { mimeType?: string } }).asset?.mimeType || "")}`;
          const fileData = await fetchFile((clip as { asset?: { url?: string } }).asset!.url!);
          await ffmpeg.writeFile(fileName, fileData);
          inputFiles.push(fileName);
        }
      }
    }

    await ffmpeg.exec([
      "-i", ...inputFiles,
      "-c:v", settings.codec === "h264" ? "libx264" : settings.codec === "vp9" ? "libvpx-vp9" : "libvpx",
      "-b:v", this.getBitrate(settings.quality),
      "-r", String(settings.fps),
      "-s", this.getResolutionString(settings.resolution),
      ...(settings.includeAudio && audioTracks.length > 0 ? ["-i", "audio.mp3", "-c:a", "aac"] : []),
      "-y",
      outputFileName,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const uint8Array = data instanceof Uint8Array ? data : new Uint8Array(new Uint8Array(data as unknown as ArrayBuffer).buffer);
    const blob = new Blob([uint8Array as unknown as BlobPart], { type: this.getMimeType(settings.format) });

    onProgress({
      progress: 100,
      currentFrame: 100,
      totalFrames: 100,
      estimatedTimeRemaining: 0,
      status: "completed",
    });

    return blob;
  }

  private async exportFallback(
    project: Project,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void
  ): Promise<Blob> {
    const frames: Blob[] = [];
    const frameDuration = 1 / settings.fps;
    const startTime = settings.startTime || 0;
    const endTime = settings.endTime || project.duration;
    const totalFrames = Math.floor((endTime - startTime) * settings.fps);

    for (let frame = 0; frame < totalFrames; frame++) {
      if (this.abortController?.signal.aborted) {
        throw new Error("Export cancelled");
      }

      const currentTime = startTime + frame * frameDuration;
      const frameBlob = await this.renderFrame(project, currentTime, settings);
      frames.push(frameBlob);

      onProgress({
        progress: ((frame + 1) / totalFrames) * 100,
        currentFrame: frame + 1,
        totalFrames,
        estimatedTimeRemaining: Math.max(
          0,
          Math.floor(((totalFrames - frame - 1) * frameDuration * 1000) / 1000)
        ),
        status: "encoding",
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    return new Blob(frames, { type: "image/png" });
  }

  private async renderFrame(
    project: Project,
    time: number,
    settings: ExportSettings
  ): Promise<Blob> {
    const canvas = document.createElement("canvas");
    canvas.width = this.getResolutionWidth(settings.resolution);
    canvas.height = this.getResolutionHeight(settings.resolution);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const videoTracks = project.tracks
      .filter((t) => t.type === "video")
      .sort((a, b) => a.order - b.order);

    for (const track of videoTracks) {
      if (track.muted || !track.visible) continue;

      const clip = track.clips.find(
        (c) => time >= c.start && time < c.start + c.duration
      );

      if (clip && clip.type === "video" && (clip as { asset?: { url?: string } }).asset?.url) {
        try {
          const asset = (clip as { asset: { url: string } }).asset;
          const img = await this.loadImage(asset.url);
          const clipTime = time - clip.start + clip.inPoint;

          ctx.globalAlpha = clip.opacity;
          ctx.drawImage(
            img,
            0,
            0,
            img.width || canvas.width,
            img.height || canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          ctx.globalAlpha = 1;
        } catch (error) {
          console.error("Error rendering video frame:", error);
        }
      }
    }

    const textTracks = project.tracks.filter((t) => t.type === "text");
    for (const track of textTracks) {
      if (track.muted || !track.visible) continue;

      const clip = track.clips.find(
        (c) => time >= c.start && time < c.start + c.duration
      );

      if (clip && clip.type === "text") {
        const textClip = clip as { text: string; fontSize: number; color: string; position: { x: number; y: number } };
        ctx.font = `${textClip.fontSize}px Arial`;
        ctx.fillStyle = textClip.color;
        ctx.fillText(
          textClip.text,
          (textClip.position.x / 100) * canvas.width,
          (textClip.position.y / 100) * canvas.height
        );
      }
    }

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob || new Blob()),
        "image/png",
        1.0
      );
    });
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  cancelExport(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.isExporting = false;
    }
  }

  getExportStatus(): { isExporting: boolean } {
    return { isExporting: this.isExporting };
  }

  private getExtension(mimeType: string): string {
    const map: Record<string, string> = {
      "video/mp4": "mp4",
      "video/webm": "webm",
      "video/ogg": "ogv",
      "audio/mpeg": "mp3",
      "audio/wav": "wav",
      "audio/ogg": "ogg",
    };
    return map[mimeType] || "mp4";
  }

  private getBitrate(quality: ExportSettings["quality"]): string {
    const bitrates: Record<string, string> = {
      low: "1M",
      medium: "2.5M",
      high: "5M",
      ultra: "10M",
    };
    return bitrates[quality] || "5M";
  }

  private getResolutionString(resolution: ExportSettings["resolution"]): string {
    const map: Record<string, string> = {
      "360p": "640x360",
      "480p": "854x480",
      "720p": "1280x720",
      "1080p": "1920x1080",
      "4k": "3840x2160",
    };
    return map[resolution] || "1920x1080";
  }

  private getResolutionWidth(resolution: ExportSettings["resolution"]): number {
    const map: Record<string, number> = {
      "360p": 640,
      "480p": 854,
      "720p": 1280,
      "1080p": 1920,
      "4k": 3840,
    };
    return map[resolution] || 1920;
  }

  private getResolutionHeight(resolution: ExportSettings["resolution"]): number {
    const map: Record<string, number> = {
      "360p": 360,
      "480p": 480,
      "720p": 720,
      "1080p": 1080,
      "4k": 2160,
    };
    return map[resolution] || 1080;
  }

  private getMimeType(format: ExportSettings["format"]): string {
    const map: Record<string, string> = {
      mp4: "video/mp4",
      webm: "video/webm",
      gif: "image/gif",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      png: "image/png",
      jpg: "image/jpeg",
    };
    return map[format] || "video/mp4";
  }
}

export const exportService = ExportService.getInstance();
