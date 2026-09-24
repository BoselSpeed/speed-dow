export interface MediaAsset {
  id: string;
  name: string;
  file: File;
  url: string;
  type: "video" | "audio" | "image" | "subtitle";
  mimeType: string;
  duration: number;
  width?: number;
  height?: number;
  fps?: number;
  size: number;
  thumbnail?: string;
  waveform?: number[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface Effect {
  id: string;
  type: string;
  name: string;
  params: Record<string, unknown>;
  enabled: boolean;
}

export interface Transition {
  id: string;
  type: string;
  duration: number;
  params: Record<string, unknown>;
}

export interface Keyframe {
  id: string;
  time: number;
  value: number;
  easing?: string;
  property: string;
}

export interface BaseClip {
  id: string;
  trackId: string;
  name: string;
  start: number;
  duration: number;
  inPoint: number;
  outPoint: number;
  effects: Effect[];
  transitions: Transition[];
  keyframes: Keyframe[];
  muted: boolean;
  locked: boolean;
  opacity: number;
  volume: number;
  metadata?: Record<string, unknown>;
}

export interface VideoClip extends BaseClip {
  type: "video";
  assetId: string;
  asset?: MediaAsset;
}

export interface AudioClip extends BaseClip {
  type: "audio";
  assetId: string;
  asset?: MediaAsset;
  fadeIn?: number;
  fadeOut?: number;
  speed?: number;
  pitch?: number;
}

export interface TextClip extends BaseClip {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  position: { x: number; y: number };
  alignment: "left" | "center" | "right";
}

export interface ImageClip extends BaseClip {
  type: "image";
  assetId: string;
  asset?: MediaAsset;
}

export interface SubtitleClip extends BaseClip {
  type: "subtitle";
  text: string;
  startTime: number;
  endTime: number;
  style?: Record<string, unknown>;
}

export type Clip = VideoClip | AudioClip | TextClip | ImageClip | SubtitleClip;

export interface Track {
  id: string;
  name: string;
  type: "video" | "audio" | "text" | "image";
  muted: boolean;
  locked: boolean;
  visible: boolean;
  clips: Clip[];
  order: number;
  height: number;
}

export interface ExportSettings {
  format: "mp4" | "webm" | "gif" | "mp3" | "wav" | "png" | "jpg";
  codec: "h264" | "vp9" | "av1" | "none";
  resolution: "360p" | "480p" | "720p" | "1080p" | "4k";
  fps: 24 | 30 | 60;
  quality: "low" | "medium" | "high" | "ultra";
  bitrate?: number;
  startTime?: number;
  endTime?: number;
  includeAudio: boolean;
  includeSubtitles: boolean;
  aspectRatio?: "16:9" | "9:16" | "1:1" | "4:5" | "4:3";
  audioOnly?: boolean;
}

export interface TimelineState {
  zoom: number;
  scrollLeft: number;
  playheadPosition: number;
  isPlaying: boolean;
  selectedClipIds: string[];
  activeTool: "select" | "blade" | "hand" | "text" | "marker" | "zoom" | "trim";
  snapEnabled: boolean;
  showGrid: boolean;
}

export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  fps: number;
  width: number;
  height: number;
  tracks: Track[];
  settings: ExportSettings;
  timelineState: TimelineState;
  assets: MediaAsset[];
}

export interface HistoryEntry {
  project: Project;
  timestamp: number;
  action: string;
}

export interface EditorState {
  currentProject: Project | null;
  history: HistoryEntry[];
  historyIndex: number;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
}

export type Tool =
  | "select"
  | "blade"
  | "hand"
  | "text"
  | "marker"
  | "zoom"
  | "trim";

export interface DragState {
  isDragging: boolean;
  type: "move" | "trim-start" | "trim-end" | "resize" | null;
  clipId: string | null;
  startX: number;
  originalClip: Clip | null;
}

export interface SnapPoint {
  time: number;
  trackId: string;
  type: "clip-start" | "clip-end";
}

export interface DropResult {
  trackId: string;
  start: number;
  duration: number;
}

export interface ExportProgress {
  progress: number;
  currentFrame: number;
  totalFrames: number;
  estimatedTimeRemaining: number;
  status: "idle" | "preparing" | "encoding" | "finalizing" | "completed" | "error" | "cancelled";
  error?: string;
}

export interface WorkerMessage {
  type: string;
  payload?: unknown;
  id?: string;
}

export interface WorkerResponse {
  type: string;
  payload?: unknown;
  id?: string;
  error?: string;
}
