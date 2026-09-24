import { create } from "zustand";

export type TrackType = "video" | "audio" | "text" | "image" | "effect" | "subtitle";
export type ClipType = "video" | "audio" | "text" | "image" | "effect" | "subtitle";
export type Tool = "select" | "media" | "audio" | "text" | "transitions" | "filters" | "effects" | "stickers" | "images" | "screen-record" | "camera-record" | "ai";
export type Quality = "low" | "medium" | "high" | "custom";
export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "4:3";
export type ExportFormat = "mp4" | "webm" | "gif" | "mp3" | "wav" | "png" | "jpg";
export type ExportStage = "idle" | "encoding" | "rendering" | "finalizing" | "complete" | "error";

export interface Clip {
  id: string;
  type: ClipType;
  name: string;
  start: number;
  duration: number;
  trackId: string;
  sourceUrl?: string;
  thumbnailUrl?: string;
  waveform?: number[];
  color: string;
  locked?: boolean;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  speed?: number;
  pitch?: number;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  shadowColor?: string;
  opacity?: number;
  rotation?: number;
  animation?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  filters?: Record<string, number>;
  effects?: Record<string, number>;
  children?: React.ReactNode;
}

export interface Track {
  id: string;
  name: string;
  type: TrackType;
  height: number;
  locked: boolean;
  muted: boolean;
  hidden: boolean;
  clips: Clip[];
  color: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: "video" | "image" | "audio" | "gif" | "srt" | "vtt" | "json";
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  size: number;
  width?: number;
  height?: number;
  fps?: number;
  uploadedAt: Date;
}

export interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  position?: { x: number; y: number };
  rtl?: boolean;
}

export interface Marker {
  id: string;
  time: number;
  label: string;
  color: string;
}

export interface ExportSettings {
  format: ExportFormat;
  resolution: string;
  frameRate: number;
  quality: Quality;
  aspectRatio: AspectRatio;
  audioOnly: boolean;
  includeSubtitles: boolean;
  bitrate?: number;
}

export interface EditorState {
  project: {
    name: string;
    saved: boolean;
    modified: boolean;
    lastSaved?: Date;
  };
  theme: "dark" | "light";
  direction: "ltr" | "rtl";
  activeTool: Tool;
  activePanel: string | null;
  sidebarCollapsed: boolean;
  tracks: Track[];
  playhead: number;
  duration: number;
  zoom: number;
  snapToGrid: boolean;
  selectedClipIds: string[];
  mediaLibrary: MediaAsset[];
  subtitles: Subtitle[];
  markers: Marker[];
  history: { past: string[]; future: string[] };
  export: {
    settings: ExportSettings;
    stage: ExportStage;
    progress: number;
    currentStage: string;
    estimatedTimeRemaining?: number;
    error?: string;
  };
  ai: Record<string, { loading: boolean; result?: string; error?: string }>;
}

export type EditorActions = {
  setProjectName: (name: string) => void;
  setSaved: (saved: boolean) => void;
  setModified: (modified: boolean) => void;
  toggleTheme: () => void;
  toggleDirection: () => void;
  setActiveTool: (tool: Tool) => void;
  setActivePanel: (panel: string | null) => void;
  toggleSidebar: () => void;
  addTrack: (track: Track) => void;
  removeTrack: (id: string) => void;
  updateTrack: (id: string, updates: Partial<Track>) => void;
  reorderTracks: (fromIndex: number, toIndex: number) => void;
  addClip: (clip: Clip) => void;
  removeClip: (id: string) => void;
  updateClip: (id: string, updates: Partial<Clip>) => void;
  splitClip: (id: string, time: number) => void;
  duplicateClip: (id: string) => void;
  setPlayhead: (time: number) => void;
  setDuration: (duration: number) => void;
  setZoom: (zoom: number) => void;
  toggleSnapToGrid: () => void;
  setSelectedClipIds: (ids: string[]) => void;
  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;
  addSubtitle: (subtitle: Subtitle) => void;
  updateSubtitle: (id: string, updates: Partial<Subtitle>) => void;
  removeSubtitle: (id: string) => void;
  addMarker: (marker: Marker) => void;
  removeMarker: (id: string) => void;
  undo: () => void;
  redo: () => void;
  pushHistory: (state: string) => void;
  setExportSettings: (settings: Partial<ExportSettings>) => void;
  setExportStage: (stage: ExportStage) => void;
  setExportProgress: (progress: number) => void;
  setExportCurrentStage: (stage: string) => void;
  setExportEstimatedTime: (time: number) => void;
  setExportError: (error: string | undefined) => void;
  setAiStatus: (tool: string, status: { loading?: boolean; result?: string; error?: string }) => void;
};

const initialTracks: Track[] = [
  {
    id: "track-1",
    name: "Video 1",
    type: "video",
    height: 80,
    locked: false,
    muted: false,
    hidden: false,
    clips: [],
    color: "#7C3AED",
  },
  {
    id: "track-2",
    name: "Audio 1",
    type: "audio",
    height: 60,
    locked: false,
    muted: false,
    hidden: false,
    clips: [],
    color: "#10B981",
  },
  {
    id: "track-3",
    name: "Text 1",
    type: "text",
    height: 50,
    locked: false,
    muted: false,
    hidden: false,
    clips: [],
    color: "#F59E0B",
  },
  {
    id: "track-4",
    name: "Effects",
    type: "effect",
    height: 50,
    locked: false,
    muted: false,
    hidden: false,
    clips: [],
    color: "#EF4444",
  },
  {
    id: "track-5",
    name: "Subtitles",
    type: "subtitle",
    height: 40,
    locked: false,
    muted: false,
    hidden: false,
    clips: [],
    color: "#3B82F6",
  },
];

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  project: {
    name: "Untitled Project",
    saved: false,
    modified: false,
  },
  theme: "dark",
  direction: "ltr",
  activeTool: "select",
  activePanel: null,
  sidebarCollapsed: false,
  tracks: initialTracks,
  playhead: 0,
  duration: 300,
  zoom: 1,
  snapToGrid: true,
  selectedClipIds: [],
  mediaLibrary: [],
  subtitles: [],
  markers: [],
  history: { past: [], future: [] },
  export: {
    settings: {
      format: "mp4",
      resolution: "1920x1080",
      frameRate: 30,
      quality: "high",
      aspectRatio: "16:9",
      audioOnly: false,
      includeSubtitles: true,
    },
    stage: "idle",
    progress: 0,
    currentStage: "",
  },
  ai: {},

  setProjectName: (name) =>
    set((state) => ({
      project: { ...state.project, name, modified: true },
    })),
  setSaved: (saved) =>
    set((state) => ({
      project: { ...state.project, saved, lastSaved: saved ? new Date() : state.project.lastSaved },
    })),
  setModified: (modified) =>
    set((state) => ({
      project: { ...state.project, modified },
    })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  toggleDirection: () =>
    set((state) => ({ direction: state.direction === "ltr" ? "rtl" : "ltr" })),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setActivePanel: (panel) => set({ activePanel: get().activePanel === panel ? null : panel }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  addTrack: (track) =>
    set((state) => ({ tracks: [...state.tracks, track] })),
  removeTrack: (id) =>
    set((state) => ({ tracks: state.tracks.filter((t) => t.id !== id) })),
  updateTrack: (id, updates) =>
    set((state) => ({
      tracks: state.tracks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  reorderTracks: (fromIndex, toIndex) =>
    set((state) => {
      const tracks = [...state.tracks];
      const [removed] = tracks.splice(fromIndex, 1);
      tracks.splice(toIndex, 0, removed);
      return { tracks };
    }),
  addClip: (clip) =>
    set((state) => ({
      tracks: state.tracks.map((t) =>
        t.id === clip.trackId ? { ...t, clips: [...t.clips, clip] } : t
      ),
    })),
  removeClip: (id) =>
    set((state) => ({
      tracks: state.tracks.map((t) => ({
        ...t,
        clips: t.clips.filter((c) => c.id !== id),
      })),
    })),
  updateClip: (id, updates) =>
    set((state) => ({
      tracks: state.tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      })),
    })),
  splitClip: (id, time) =>
    set((state) => {
      const newTracks = state.tracks.map((t) => {
        const clipIndex = t.clips.findIndex((c) => c.id === id);
        if (clipIndex === -1) return t;
        const clip = t.clips[clipIndex];
        if (time <= clip.start || time >= clip.start + clip.duration) return t;
        const splitPoint = time - clip.start;
        const leftClip = { ...clip, duration: splitPoint };
        const rightClip: Clip = {
          ...clip,
          id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          start: time,
          duration: clip.duration - splitPoint,
        };
        const clips = [...t.clips];
        clips.splice(clipIndex, 1, leftClip, rightClip);
        return { ...t, clips };
      });
      return { tracks: newTracks };
    }),
  duplicateClip: (id) =>
    set((state) => {
      const newTracks = state.tracks.map((t) => {
        const clip = t.clips.find((c) => c.id === id);
        if (!clip) return t;
        const newClip: Clip = {
          ...clip,
          id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          start: clip.start + clip.duration,
        };
        return { ...t, clips: [...t.clips, newClip] };
      });
      return { tracks: newTracks };
    }),
  setPlayhead: (time) => set({ playhead: Math.max(0, Math.min(time, get().duration)) }),
  setDuration: (duration) => set({ duration }),
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(zoom, 10)) }),
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  setSelectedClipIds: (ids) => set({ selectedClipIds: ids }),
  addMediaAsset: (asset) =>
    set((state) => ({ mediaLibrary: [...state.mediaLibrary, asset] })),
  removeMediaAsset: (id) =>
    set((state) => ({ mediaLibrary: state.mediaLibrary.filter((a) => a.id !== id) })),
  addSubtitle: (subtitle) =>
    set((state) => ({ subtitles: [...state.subtitles, subtitle] })),
  updateSubtitle: (id, updates) =>
    set((state) => ({
      subtitles: state.subtitles.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  removeSubtitle: (id) =>
    set((state) => ({ subtitles: state.subtitles.filter((s) => s.id !== id) })),
  addMarker: (marker) =>
    set((state) => ({ markers: [...state.markers, marker] })),
  removeMarker: (id) =>
    set((state) => ({ markers: state.markers.filter((m) => m.id !== id) })),
  undo: () => {
    const state = get();
    if (state.history.past.length === 0) return;
    const previous = state.history.past[state.history.past.length - 1];
    const newPast = state.history.past.slice(0, -1);
    set({
      tracks: JSON.parse(previous),
      history: { past: newPast, future: [JSON.stringify(state.tracks), ...state.history.future] },
    });
  },
  redo: () => {
    const state = get();
    if (state.history.future.length === 0) return;
    const next = state.history.future[0];
    const newFuture = state.history.future.slice(1);
    set({
      tracks: JSON.parse(next),
      history: { past: [...state.history.past, JSON.stringify(state.tracks)], future: newFuture },
    });
  },
  pushHistory: (stateString) =>
    set((state) => ({
      history: { past: [...state.history.past, stateString], future: [] },
    })),
  setExportSettings: (settings) =>
    set((state) => ({
      export: {
        ...state.export,
        settings: { ...state.export.settings, ...settings },
      },
    })),
  setExportStage: (stage) =>
    set((state) => ({
      export: { ...state.export, stage, progress: stage === "idle" ? 0 : state.export.progress },
    })),
  setExportProgress: (progress) =>
    set((state) => ({
      export: { ...state.export, progress: Math.max(0, Math.min(progress, 100)) },
    })),
  setExportCurrentStage: (currentStage) =>
    set((state) => ({
      export: { ...state.export, currentStage },
    })),
  setExportEstimatedTime: (estimatedTimeRemaining) =>
    set((state) => ({
      export: { ...state.export, estimatedTimeRemaining },
    })),
  setExportError: (error) =>
    set((state) => ({
      export: { ...state.export, error, stage: error ? "error" : state.export.stage },
    })),
  setAiStatus: (tool, status) =>
    set((state) => ({
      ai: { ...state.ai, [tool]: { ...state.ai[tool], ...status } },
    })),
}));
