import type { Project, Clip, ExportProgress } from "@/types";

interface RenderMessage {
  type: "render-frame" | "cancel" | "get-capabilities";
  payload?: {
    project?: Project;
    currentTime?: number;
    resolution?: { width: number; height: number };
    settings?: {
      width: number;
      height: number;
    };
  };
  id?: string;
}

interface RenderResponse {
  type: string;
  payload?: {
    frame?: Blob;
    currentTime?: number;
    capabilities?: {
      offscreenCanvas: boolean;
      webCodecs: boolean;
    };
  };
  id?: string;
  error?: string;
}

const resolveMessage = (event: MessageEvent): RenderMessage => event.data as RenderMessage;

self.onmessage = async (event: MessageEvent) => {
  const message = resolveMessage(event);

  try {
    switch (message.type) {
      case "get-capabilities":
        handleGetCapabilities(message);
        break;
      case "render-frame":
        await handleRenderFrame(message);
        break;
      case "cancel":
        handleCancel(message);
        break;
      default:
        postMessage({
          type: "error",
          id: message.id,
          error: `Unknown message type: ${message.type}`,
        });
    }
  } catch (error) {
    postMessage({
      type: "error",
      id: message.id,
      error: (error as Error).message,
    });
  }
};

function handleGetCapabilities(message: RenderMessage): void {
  const response: RenderResponse = {
    type: "capabilities",
    id: message.id,
    payload: {
      capabilities: {
        offscreenCanvas: typeof OffscreenCanvas !== "undefined",
        webCodecs: typeof (self as unknown as { VideoEncoder?: unknown }).VideoEncoder !== "undefined",
      },
    },
  };

  postMessage(response);
}

async function handleRenderFrame(message: RenderMessage): Promise<void> {
  const { project, currentTime = 0, resolution = { width: 1920, height: 1080 } } = message.payload || {};

  if (!project) {
    throw new Error("Project is required for rendering");
  }

  const canvas = new OffscreenCanvas(resolution.width, resolution.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context in worker");
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, resolution.width, resolution.height);

  const videoTracks = project.tracks
    .filter((track) => track.type === "video")
    .sort((a, b) => a.order - b.order);

  for (const track of videoTracks) {
    if (track.muted || !track.visible) continue;

    const clip = track.clips.find(
      (c: Clip) => currentTime >= c.start && currentTime < c.start + c.duration
    );

    if (clip && clip.type === "video" && (clip as { asset?: { url?: string } }).asset?.url) {
      try {
        const assetUrl = (clip as { asset: { url: string } }).asset.url;
        const img = await loadImageInWorker(assetUrl);
        const clipTime = currentTime - clip.start + clip.inPoint;

        ctx.globalAlpha = clip.opacity;

        const scale = Math.max(resolution.width / (img.width || resolution.width), resolution.height / (img.height || resolution.height));
        const scaledWidth = (img.width || resolution.width) * scale;
        const scaledHeight = (img.height || resolution.height) * scale;
        const x = (resolution.width - scaledWidth) / 2;
        const y = (resolution.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        ctx.globalAlpha = 1;
      } catch (error) {
        console.error("Error rendering video frame in worker:", error);
      }
    }
  }

  const textTracks = project.tracks.filter((track) => track.type === "text");
  for (const track of textTracks) {
    if (track.muted || !track.visible) continue;

    const clip = track.clips.find(
      (c: Clip) => currentTime >= c.start && currentTime < c.start + c.duration
    );

    if (clip && clip.type === "text") {
      const textClip = clip as {
        text: string;
        fontSize: number;
        color: string;
        position: { x: number; y: number };
      };

      ctx.font = `${textClip.fontSize}px Arial`;
      ctx.fillStyle = textClip.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = (textClip.position.x / 100) * resolution.width;
      const y = (textClip.position.y / 100) * resolution.height;

      ctx.fillText(textClip.text, x, y);
    }
  }

  const blob = await canvas.convertToBlob({ type: "image/png", quality: 1.0 });

  const response: RenderResponse = {
    type: "frame-rendered",
    id: message.id,
    payload: {
      frame: blob,
      currentTime,
    },
  };

  postMessage(response, [blob]);
}

function handleCancel(message: RenderMessage): void {
  postMessage({
    type: "cancelled",
    id: message.id,
  });
}

function loadImageInWorker(url: string): Promise<ImageBitmap> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      createImageBitmap(img)
        .then(resolve)
        .catch(reject);
    };
    img.onerror = () => reject(new Error("Failed to load image in worker"));
    img.src = url;
  });
}

function postMessage(message: RenderResponse, transfer?: Transferable[]): void {
  (self as unknown as { postMessage: (message: unknown, transfer?: Transferable[]) => void }).postMessage(message, transfer);
}
