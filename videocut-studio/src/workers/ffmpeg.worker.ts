import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

interface FFmpegWorkerMessage {
  type: "load" | "run" | "cancel" | "cleanup" | "write-file" | "read-file";
  payload?: {
    coreURL?: string;
    wasmURL?: string;
    command?: string[];
    args?: string[];
    fileName?: string;
    fileData?: ArrayBuffer;
    outputFileName?: string;
    inputFiles?: { name: string; data: ArrayBuffer }[];
  };
  id?: string;
}

interface FFmpegWorkerResponse {
  type: string;
  payload?: {
    progress?: number;
    outputFileName?: string;
    fileData?: ArrayBuffer;
    loaded?: boolean;
    fileName?: string;
  };
  id?: string;
  error?: string;
}

let ffmpeg: FFmpeg | null = null;
let isLoaded = false;
let currentCommand: AbortController | null = null;

self.onmessage = async (event: MessageEvent<FFmpegWorkerMessage>) => {
  const message = event.data;

  try {
    switch (message.type) {
      case "load":
        await handleLoad(message);
        break;
      case "write-file":
        await handleWriteFile(message);
        break;
      case "run":
        await handleRun(message);
        break;
      case "read-file":
        await handleReadFile(message);
        break;
      case "cancel":
        handleCancel(message);
        break;
      case "cleanup":
        handleCleanup(message);
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

async function handleLoad(message: FFmpegWorkerMessage): Promise<void> {
  if (isLoaded && ffmpeg) {
    postMessage({
      type: "loaded",
      id: message.id,
      payload: { loaded: true },
    });
    return;
  }

  ffmpeg = new FFmpeg();

  ffmpeg.on("progress", ({ progress }) => {
    postMessage({
      type: "progress",
      id: message.id,
      payload: { progress: Math.min(progress * 100, 100) },
    });
  });

  ffmpeg.on("log", ({ message: logMessage }) => {
    console.log(`[FFmpeg] ${logMessage}`);
  });

  const { coreURL, wasmURL } = message.payload || {};

  await ffmpeg.load({
    coreURL: coreURL || "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/index.js",
    wasmURL: wasmURL || "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm",
  });

  isLoaded = true;

  postMessage({
    type: "loaded",
    id: message.id,
    payload: { loaded: true },
  });
}

async function handleWriteFile(message: FFmpegWorkerMessage): Promise<void> {
  if (!ffmpeg || !isLoaded) {
    throw new Error("FFmpeg not loaded");
  }

  const { fileName, fileData } = message.payload || {};

  if (!fileName || !fileData) {
    throw new Error("fileName and fileData are required");
  }

  await ffmpeg.writeFile(fileName, new Uint8Array(fileData));

  postMessage({
    type: "file-written",
    id: message.id,
    payload: { fileName },
  });
}

async function handleRun(message: FFmpegWorkerMessage): Promise<void> {
  if (!ffmpeg || !isLoaded) {
    throw new Error("FFmpeg not loaded");
  }

  currentCommand = new AbortController();

  const { command, args } = message.payload || {};

  if (!command || !args) {
    throw new Error("command and args are required");
  }

  try {
    await ffmpeg.exec([...command, ...args]);

    postMessage({
      type: "completed",
      id: message.id,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      postMessage({
        type: "cancelled",
        id: message.id,
      });
    } else {
      throw error;
    }
  } finally {
    currentCommand = null;
  }
}

async function handleReadFile(message: FFmpegWorkerMessage): Promise<void> {
  if (!ffmpeg || !isLoaded) {
    throw new Error("FFmpeg not loaded");
  }

  const { outputFileName } = message.payload || {};

  if (!outputFileName) {
    throw new Error("outputFileName is required");
  }

  const data = await ffmpeg.readFile(outputFileName);
  const buffer = data instanceof Uint8Array ? data.buffer : new TextEncoder().encode(data).buffer;
  const fileData = buffer instanceof ArrayBuffer ? buffer : new Uint8Array(buffer).buffer as unknown as ArrayBuffer;

  postMessage(
    {
      type: "file-read",
      id: message.id,
      payload: { outputFileName, fileData },
    },
    [fileData]
  );
}

function handleCancel(message: FFmpegWorkerMessage): void {
  if (currentCommand) {
    currentCommand.abort();
    currentCommand = null;
  }

  postMessage({
    type: "cancelled",
    id: message.id,
  });
}

function handleCleanup(message: FFmpegWorkerMessage): void {
  if (ffmpeg) {
    try {
      ffmpeg.terminate();
    } catch {
      // ignore termination errors
    }
    ffmpeg = null;
    isLoaded = false;
  }

  postMessage({
    type: "cleaned",
    id: message.id,
  });
}

function postMessage(message: FFmpegWorkerResponse, transfer?: Transferable[]): void {
  (self as unknown as { postMessage: (message: unknown, transfer?: Transferable[]) => void }).postMessage(message, transfer);
}
