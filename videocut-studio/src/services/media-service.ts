import type { MediaAsset } from "@/types";
import { SUPPORTED_VIDEO_FORMATS, SUPPORTED_AUDIO_FORMATS, SUPPORTED_SUBTITLE_FORMATS } from "@/utils/constants";

const SUPPORTED_IMAGE_FORMATS = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
]);

const SUPPORTED_MIME_TYPES = new Set([
  ...SUPPORTED_VIDEO_FORMATS,
  ...SUPPORTED_AUDIO_FORMATS,
  ...SUPPORTED_IMAGE_FORMATS,
  ...SUPPORTED_SUBTITLE_FORMATS,
]);

export class MediaService {
  private static instance: MediaService;
  private objectUrls: Map<string, string> = new Map();

  static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }
    return MediaService.instance;
  }

  async importMedia(file: File): Promise<MediaAsset> {
    if (!SUPPORTED_MIME_TYPES.has(file.type)) {
      throw new Error(`Unsupported file format: ${file.type}`);
    }

    const url = URL.createObjectURL(file);
    const id = crypto.randomUUID();
    this.objectUrls.set(id, url);

    const assetType = this.getAssetType(file.type);
    const metadata = await this.extractMetadata(file, url, assetType);

    const asset: MediaAsset = {
      id,
      name: file.name,
      file,
      url,
      type: assetType,
      mimeType: file.type,
      duration: (metadata.duration as number) || 0,
      width: metadata.width as number | undefined,
      height: metadata.height as number | undefined,
      fps: metadata.fps as number | undefined,
      size: file.size,
      metadata,
      createdAt: new Date(),
    };

    if (assetType === "video") {
      asset.thumbnail = await this.generateThumbnail(url, 1);
    }

    if (assetType === "audio") {
      asset.waveform = await this.generateWaveform(url);
    }

    return asset;
  }

  private getAssetType(mimeType: string): MediaAsset["type"] {
    if (mimeType.startsWith("video")) return "video";
    if (mimeType.startsWith("audio")) return "audio";
    if (mimeType.startsWith("image")) return "image";
    if (
      mimeType === "application/x-subrip" ||
      mimeType === "text/vtt" ||
      mimeType === "application/json"
    ) {
      return "subtitle";
    }
    return "video";
  }

  private async extractMetadata(
    file: File,
    url: string,
    type: MediaAsset["type"]
  ): Promise<Record<string, unknown>> {
    const metadata: Record<string, unknown> = {};

    if (type === "video" || type === "audio" || type === "image") {
      try {
        const media = await this.createMediaElement(url, type);
        await new Promise<void>((resolve, reject) => {
          media.onloadedmetadata = () => resolve();
          media.onerror = () => reject(new Error("Failed to load media metadata"));
          setTimeout(() => reject(new Error("Metadata load timeout")), 10000);
        });

        metadata.duration = (media as HTMLMediaElement).duration || 0;

        if (type === "video" || type === "image") {
          const video = media as HTMLVideoElement;
          metadata.width = video.videoWidth;
          metadata.height = video.videoHeight;
        }

        if (type === "video") {
          metadata.fps = this.estimateFps(media as HTMLVideoElement);
        }

        URL.revokeObjectURL((media as HTMLMediaElement).src);
      } catch (error) {
        console.error("Error extracting metadata:", error);
      }
    }

    return metadata;
  }

  private createMediaElement(url: string, type: MediaAsset["type"]): Promise<HTMLVideoElement | HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (type === "image") {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      } else {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.src = url;
        video.onloadedmetadata = () => resolve(video);
        video.onerror = reject;
      }
    });
  }

  private estimateFps(video: HTMLVideoElement): number {
    if (video.getVideoPlaybackQuality) {
      const quality = video.getVideoPlaybackQuality();
      return quality.totalVideoFrames > 0 ? 30 : 30;
    }
    return 30;
  }

  async generateThumbnail(videoUrl: string, time: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.currentTime = time;
      video.muted = true;
      video.preload = "metadata";

      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 180;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL("image/jpeg", 0.7);
        resolve(thumbnail);
      };

      video.onerror = () => {
        reject(new Error("Failed to load video for thumbnail generation"));
      };

      setTimeout(() => {
        reject(new Error("Thumbnail generation timeout"));
      }, 10000);
    });
  }

  async generateWaveform(audioUrl: string): Promise<number[]> {
    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);
      const samples = 200;
      const blockSize = Math.floor(channelData.length / samples);
      const waveform: number[] = [];

      for (let i = 0; i < samples; i++) {
        let sum = 0;
        const start = i * blockSize;
        const end = Math.min(start + blockSize, channelData.length);

        for (let j = start; j < end; j++) {
          sum += Math.abs(channelData[j]);
        }

        waveform.push(sum / (end - start));
      }

      const max = Math.max(...waveform);
      const normalized = waveform.map((val) => (max > 0 ? val / max : 0));

      audioContext.close();
      return normalized;
    } catch (error) {
      console.error("Error generating waveform:", error);
      return new Array(200).fill(0);
    }
  }

  revokeUrl(id: string): void {
    const url = this.objectUrls.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      this.objectUrls.delete(id);
    }
  }

  cleanup(): void {
    this.objectUrls.forEach((url, id) => {
      URL.revokeObjectURL(url);
    });
    this.objectUrls.clear();
  }

  getObjectUrl(id: string): string | undefined {
    return this.objectUrls.get(id);
  }

  validateFile(file: File): { valid: boolean; error?: string } {
    if (!SUPPORTED_MIME_TYPES.has(file.type)) {
      return {
        valid: false,
        error: `Unsupported file format: ${file.type}. Supported formats: ${Array.from(SUPPORTED_MIME_TYPES).join(", ")}`,
      };
    }

    if (file.size === 0) {
      return { valid: false, error: "File is empty" };
    }

    const maxSize = 10 * 1024 * 1024 * 1024;
    if (file.size > maxSize) {
      return { valid: false, error: "File size exceeds 10GB limit" };
    }

    return { valid: true };
  }

  async extractFrame(videoUrl: string, time: number): Promise<string> {
    return this.generateThumbnail(videoUrl, time);
  }

  async getVideoDuration(file: File): Promise<number> {
    const url = URL.createObjectURL(file);
    try {
      const metadata = await this.extractMetadata(file, url, "video");
      return metadata.duration as number || 0;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

export const mediaService = MediaService.getInstance();
