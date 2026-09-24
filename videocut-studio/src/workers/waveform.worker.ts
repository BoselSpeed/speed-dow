interface WaveformMessage {
  type: "analyze" | "cancel" | "get-config";
  payload?: {
    audioData?: ArrayBuffer;
    samples?: number;
    channel?: number;
  };
  id?: string;
}

interface WaveformResponse {
  type: string;
  payload?: {
    waveform?: number[];
    samples?: number;
    duration?: number;
    channels?: number;
    sampleRate?: number;
  };
  id?: string;
  error?: string;
}

self.onmessage = async (event: MessageEvent<WaveformMessage>) => {
  const message = event.data;

  try {
    switch (message.type) {
      case "get-config":
        handleGetConfig(message);
        break;
      case "analyze":
        await handleAnalyze(message);
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

function handleGetConfig(message: WaveformMessage): void {
  postMessage({
    type: "config",
    id: message.id,
    payload: {
      sampleRate: 44100,
      channels: 2,
      defaultSamples: 200,
    },
  });
}

async function handleAnalyze(message: WaveformMessage): Promise<void> {
  const { audioData, samples = 200, channel = 0 } = message.payload || {};

  if (!audioData) {
    throw new Error("audioData is required for analysis");
  }

  const audioContext = new OfflineAudioContext(1, audioData.byteLength, 44100);
  const decodedBuffer = await audioContext.decodeAudioData(audioData.slice(0));

  const numberOfChannels = decodedBuffer.numberOfChannels;
  const duration = decodedBuffer.duration;
  const sampleRate = decodedBuffer.sampleRate;

  const channelData = decodedBuffer.getChannelData(Math.min(channel, numberOfChannels - 1));
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

  postMessage({
    type: "waveform",
    id: message.id,
    payload: {
      waveform: normalized,
      samples,
      duration,
      channels: numberOfChannels,
      sampleRate,
    },
  });
}

function handleCancel(message: WaveformMessage): void {
  postMessage({
    type: "cancelled",
    id: message.id,
  });
}

function postMessage(message: WaveformResponse, transfer?: Transferable[]): void {
  (self as unknown as { postMessage: (message: unknown, transfer?: Transferable[]) => void }).postMessage(message, transfer);
}
