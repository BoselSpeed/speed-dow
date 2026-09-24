export const DEFAULT_FPS = 30;
export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 10;
export const TIMELINE_SCROLL_SPEED = 5;
export const SNAP_THRESHOLD = 10;
export const MAX_HISTORY = 50;

export const SUPPORTED_VIDEO_FORMATS = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-matroska",
  "video/x-msvideo",
  "video/x-m4v",
]);

export const SUPPORTED_AUDIO_FORMATS = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/aac",
  "audio/mp4",
  "audio/ogg",
  "audio/flac",
  "audio/x-flac",
]);

export const SUPPORTED_IMAGE_FORMATS = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
]);

export const SUPPORTED_SUBTITLE_FORMATS = new Set([
  "application/x-subrip",
  "text/vtt",
  "application/json",
]);

export const SUPPORTED_FORMATS = new Set([
  ...SUPPORTED_VIDEO_FORMATS,
  ...SUPPORTED_AUDIO_FORMATS,
  ...SUPPORTED_IMAGE_FORMATS,
  ...SUPPORTED_SUBTITLE_FORMATS,
]);

export const EXPORT_FORMATS = {
  mp4: {
    label: "MP4",
    extensions: ["mp4"],
    mimeType: "video/mp4",
  },
  webm: {
    label: "WebM",
    extensions: ["webm"],
    mimeType: "video/webm",
  },
  gif: {
    label: "GIF",
    extensions: ["gif"],
    mimeType: "image/gif",
  },
  mp3: {
    label: "MP3",
    extensions: ["mp3"],
    mimeType: "audio/mpeg",
  },
  wav: {
    label: "WAV",
    extensions: ["wav"],
    mimeType: "audio/wav",
  },
  png: {
    label: "PNG",
    extensions: ["png"],
    mimeType: "image/png",
  },
  jpg: {
    label: "JPG",
    extensions: ["jpg", "jpeg"],
    mimeType: "image/jpeg",
  },
} as const;

export const RESOLUTIONS = {
  "360p": { width: 640, height: 360, label: "360p" },
  "480p": { width: 854, height: 480, label: "480p" },
  "720p": { width: 1280, height: 720, label: "720p" },
  "1080p": { width: 1920, height: 1080, label: "1080p" },
  "4k": { width: 3840, height: 2160, label: "4K" },
} as const;

export const FRAME_RATES = [24, 30, 60] as const;

export const QUALITY_SETTINGS = {
  low: { label: "Low", bitrate: "1M", value: 0.3 },
  medium: { label: "Medium", bitrate: "2.5M", value: 0.5 },
  high: { label: "High", bitrate: "5M", value: 0.7 },
  ultra: { label: "Ultra", bitrate: "10M", value: 1.0 },
} as const;

export const TIMELINE_CONSTANTS = {
  TRACK_HEIGHT: 60,
  HEADER_WIDTH: 200,
  RULER_HEIGHT: 30,
  MIN_CLIP_WIDTH: 4,
  SNAP_THRESHOLD_PIXELS: 10,
  SCROLL_SPEED: 5,
  PLAYHEAD_WIDTH: 2,
} as const;

export const TOOLTIPS: Record<string, string> = {
  select: "Select tool (V)",
  blade: "Blade / Split tool (B)",
  hand: "Hand tool (H)",
  text: "Text tool (T)",
  marker: "Add marker (M)",
  zoom: "Zoom tool",
  trim: "Trim tool",
  play: "Play / Pause (Space)",
  undo: "Undo (Ctrl+Z)",
  redo: "Redo (Ctrl+Shift+Z)",
  save: "Save project (Ctrl+S)",
  delete: "Delete selected clips (Delete)",
  copy: "Copy selected clips (Ctrl+C)",
  paste: "Paste selected clips (Ctrl+V)",
  cut: "Cut selected clips (Ctrl+X)",
  selectAll: "Select all clips (Ctrl+A)",
  zoomIn: "Zoom in (Ctrl+=)",
  zoomOut: "Zoom out (Ctrl+-)",
  split: "Split clip at playhead (Shift+S)",
  goToStart: "Go to start (Home)",
  goToEnd: "Go to end (End)",
};

export const STORAGE_KEYS = {
  PROJECTS: "videocut-studio-projects",
  CURRENT_PROJECT: "videocut-studio-current-project",
  SETTINGS: "videocut-studio-settings",
  ASSETS: "videocut-studio-assets",
} as const;

export const WORKER_TYPES = {
  RENDER: "render",
  FFMPEG: "ffmpeg",
  WAVEFORM: "waveform",
  AUDIO: "audio",
} as const;

export const MIME_TYPES = {
  VIDEO_MP4: "video/mp4",
  VIDEO_WEBM: "video/webm",
  VIDEO_OGG: "video/ogg",
  VIDEO_MOV: "video/quicktime",
  VIDEO_MKV: "video/x-matroska",
  VIDEO_AVI: "video/x-msvideo",
  VIDEO_M4V: "video/x-m4v",
  AUDIO_MP3: "audio/mpeg",
  AUDIO_WAV: "audio/wav",
  AUDIO_AAC: "audio/aac",
  AUDIO_M4A: "audio/mp4",
  AUDIO_OGG: "audio/ogg",
  AUDIO_FLAC: "audio/flac",
  IMAGE_JPEG: "image/jpeg",
  IMAGE_PNG: "image/png",
  IMAGE_GIF: "image/gif",
  IMAGE_WEBP: "image/webp",
  IMAGE_BMP: "image/bmp",
  SUBTITLE_SRT: "application/x-subrip",
  SUBTITLE_VTT: "text/vtt",
  SUBTITLE_JSON: "application/json",
} as const;

export const COLORS = {
  PRIMARY: "#3b82f6",
  SECONDARY: "#6b7280",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  BACKGROUND: "#0f172a",
  SURFACE: "#1e293b",
  BORDER: "#334155",
  TEXT: "#f8fafc",
  TEXT_SECONDARY: "#94a3b8",
} as const;

export const TRACK_COLORS = {
  video: "#3b82f6",
  audio: "#10b981",
  text: "#f59e0b",
  image: "#8b5cf6",
} as const;

export const TRANSITION_TYPES = {
  CUT: { label: "Cut", duration: 0 },
  FADE: { label: "Fade", duration: 1 },
  DISSOLVE: { label: "Dissolve", duration: 1 },
  WIPE: { label: "Wipe", duration: 1 },
  SLIDE: { label: "Slide", duration: 1 },
} as const;

export const EFFECT_PRESETS = {
  BLUR: {
    name: "Blur",
    params: { radius: 5 },
  },
  BRIGHTNESS: {
    name: "Brightness",
    params: { value: 1.2 },
  },
  CONTRAST: {
    name: "Contrast",
    params: { value: 1.1 },
  },
  SATURATION: {
    name: "Saturation",
    params: { value: 1.3 },
  },
  HUE_ROTATE: {
    name: "Hue Rotate",
    params: { degrees: 90 },
  },
  GRAYSCALE: {
    name: "Grayscale",
    params: { value: 1 },
  },
  SEPIA: {
    name: "Sepia",
    params: { value: 0.8 },
  },
  INVERT: {
    name: "Invert",
    params: { value: 1 },
  },
} as const;
