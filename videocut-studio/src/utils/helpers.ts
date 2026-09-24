export function formatTime(seconds: number, showFrames = false): string {
  if (isNaN(seconds) || seconds < 0) {
    return showFrames ? "00:00:00:00" : "00:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const frames = Math.floor((seconds % 1) * 30);

  if (showFrames) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = bytes / Math.pow(k, i);
  const formatted = i === 0 ? `${size}` : `${size.toFixed(2)}`;

  return `${formatted} ${sizes[i]}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function generateId(): string {
  return crypto.randomUUID();
}

export async function getVideoMetadata(file: File): Promise<{
  duration: number;
  width: number;
  height: number;
  fps: number;
}> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      const fps = 30;

      URL.revokeObjectURL(url);

      resolve({ duration, width, height, fps });
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load video metadata"));
    };

    setTimeout(() => {
      URL.revokeObjectURL(url);
      reject(new Error("Metadata load timeout"));
    }, 10000);
  });
}

export function checkBrowserSupport(): {
  supported: boolean;
  missing: string[];
  details: Record<string, boolean>;
} {
  const details: Record<string, boolean> = {
    webWorkers: typeof Worker !== "undefined",
    webCodecs: typeof (self as unknown as { VideoEncoder?: unknown }).VideoEncoder !== "undefined",
    webAudio: typeof AudioContext !== "undefined",
    indexedDB: typeof indexedDB !== "undefined",
    fileApi: typeof File !== "undefined" && typeof FileReader !== "undefined",
    canvas: typeof document.createElement("canvas").getContext !== "undefined",
    webGL: (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        );
      } catch {
        return false;
      }
    })(),
    offscreenCanvas: typeof OffscreenCanvas !== "undefined",
    mediaRecorder: typeof MediaRecorder !== "undefined",
    webAssembly: typeof WebAssembly !== "undefined",
  };

  const missing = Object.entries(details)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature);

  return {
    supported: missing.length === 0,
    missing,
    details,
  };
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function rectContainsPoint(
  rect: { x: number; y: number; width: number; height: number },
  point: { x: number; y: number }
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

export function rectsIntersect(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  );
}

export function isValidColor(color: string): boolean {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
}

export function parseColor(color: string): { r: number; g: number; b: number; a: number } | null {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const data = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    a: data[3] / 255,
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  downloadBlob(blob, filename);
}

export function clampTime(time: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, time));
}

export function getClipDuration(clip: { inPoint?: number; outPoint?: number; duration?: number }): number {
  if (clip.outPoint && clip.inPoint !== undefined) {
    return clip.outPoint - clip.inPoint;
  }
  return clip.duration || 0;
}

export function isClipAtTime(clip: { start: number; duration: number }, time: number): boolean {
  return time >= clip.start && time < clip.start + clip.duration;
}

export function getClipAtTime(tracks: { clips: { start: number; duration: number }[] }[], time: number) {
  for (const track of tracks) {
    for (const clip of track.clips) {
      if (isClipAtTime(clip, time)) {
        return clip;
      }
    }
  }
  return null;
}

export function getTrackById(tracks: { id: string }[], trackId: string) {
  return tracks.find((track) => track.id === trackId) || null;
}

export function getClipById(
  tracks: { id: string; clips: { id: string }[] }[],
  clipId: string
) {
  for (const track of tracks) {
    const clip = track.clips.find((c) => c.id === clipId);
    if (clip) return { clip, trackId: track.id };
  }
  return null;
}

export function hexToRgba(hex: string, alpha = 1): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rgbaToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
