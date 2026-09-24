import { create } from "zustand";
import type {
  Project,
  Track,
  Clip,
  VideoClip,
  AudioClip,
  TextClip,
  ImageClip,
  SubtitleClip,
  HistoryEntry,
  ExportProgress,
  MediaAsset,
  ExportSettings,
} from "@/types";

interface EditorStoreState {
  currentProject: Project | null;
  history: HistoryEntry[];
  historyIndex: number;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
  selectedClipIds: string[];
  activeTool: "select" | "blade" | "hand" | "text" | "marker" | "zoom" | "trim";
  zoom: number;
  playheadPosition: number;
  isPlaying: boolean;
  exportProgress: ExportProgress;
  snapEnabled: boolean;
  showGrid: boolean;
  isExporting: boolean;
  activePanel: string;
  assets: MediaAsset[];
  exportSettings: ExportSettings;
  exportStage: string;
  exportCurrentStage: string;
  exportEstimatedTime: number | null;
  exportError: string | null;
}

interface EditorStoreActions {
  newProject: (name?: string) => Project;
  loadProject: (project: Project) => void;
  updateProject: (updates: Partial<Project>) => void;
  setProjectName: (name: string) => void;
  setDuration: (duration: number) => void;
  setFps: (fps: number) => void;
  setResolution: (width: number, height: number) => void;

  addTrack: (track: Omit<Track, "id">) => void;
  removeTrack: (trackId: string) => void;
  updateTrack: (trackId: string, updates: Partial<Track>) => void;

  addClip: (clip: Omit<Clip, "id"> & { id?: string }) => void;
  removeClip: (clipId: string) => void;
  updateClip: (clipId: string, updates: Partial<Clip>) => void;
  splitClip: (clipId: string, splitTime: number) => void;
  trimClip: (clipId: string, start: number, duration: number) => void;
  moveClip: (clipId: string, newTrackId: string, newStart: number) => void;
  duplicateClip: (clipId: string) => void;

  addVideoClip: (clip: Omit<VideoClip, "id"> & { type: "video" }) => void;
  addAudioClip: (clip: Omit<AudioClip, "id"> & { type: "audio" }) => void;
  addTextClip: (clip: Omit<TextClip, "id"> & { type: "text" }) => void;
  addImageClip: (clip: Omit<ImageClip, "id"> & { type: "image" }) => void;
  addSubtitleClip: (clip: Omit<SubtitleClip, "id"> & { type: "subtitle" }) => void;

  selectClip: (clipId: string, addToSelection?: boolean) => void;
  deselectClip: (clipId: string) => void;
  selectAllClips: () => void;
  clearSelection: () => void;

  setPlayhead: (position: number) => void;
  setZoom: (zoom: number) => void;
  setActiveTool: (tool: EditorStoreState["activeTool"]) => void;
  togglePlayPause: () => void;
  setPlaying: (playing: boolean) => void;

  setSnapEnabled: (enabled: boolean) => void;
  setShowGrid: (show: boolean) => void;
  setActivePanel: (panel: string) => void;

  addAsset: (asset: MediaAsset) => void;
  removeAsset: (assetId: string) => void;

  undo: () => void;
  redo: () => void;

  export: (settings: Partial<ExportSettings>) => Promise<void>;
  cancelExport: () => void;
  setExportSettings: (settings: Partial<ExportSettings>) => void;
  setExportStage: (stage: string) => void;
  setExportCurrentStage: (stage: string) => void;
  setExportEstimatedTime: (time: number | null) => void;
  setExportError: (error: string | null) => void;
  setIsExporting: (exporting: boolean) => void;

  setExportProgress: (progress: Partial<ExportProgress>) => void;
  saveSnapshot: (action: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const MAX_HISTORY = 50;

const initialState: EditorStoreState = {
  currentProject: null,
  history: [],
  historyIndex: -1,
  isDirty: false,
  isLoading: false,
  error: null,
  selectedClipIds: [],
  activeTool: "select",
  zoom: 1,
  playheadPosition: 0,
  isPlaying: false,
  exportProgress: {
    progress: 0,
    currentFrame: 0,
    totalFrames: 0,
    estimatedTimeRemaining: 0,
    status: "idle",
  },
  snapEnabled: true,
  showGrid: false,
  isExporting: false,
  activePanel: "media",
  assets: [],
  exportSettings: {
    format: "mp4",
    codec: "h264",
    resolution: "1080p",
    fps: 30,
    quality: "high",
    includeAudio: true,
    includeSubtitles: false,
  },
  exportStage: "",
  exportCurrentStage: "",
  exportEstimatedTime: null,
  exportError: null,
};

export const useEditorStore = create<EditorStoreState & EditorStoreActions>(
  (set, get) => ({
    ...initialState,

    newProject: (name = "Untitled Project") => {
      const project: Project = {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: 300,
        fps: 30,
        width: 1920,
        height: 1080,
        tracks: [],
        settings: {
          format: "mp4",
          codec: "h264",
          resolution: "1080p",
          fps: 30,
          quality: "high",
          includeAudio: true,
          includeSubtitles: true,
        },
        timelineState: {
          zoom: 1,
          scrollLeft: 0,
          playheadPosition: 0,
          isPlaying: false,
          selectedClipIds: [],
          activeTool: "select",
          snapEnabled: true,
          showGrid: false,
        },
        assets: [],
      };

      set({
        currentProject: project,
        isDirty: false,
        history: [{ project, timestamp: Date.now(), action: "create" }],
        historyIndex: 0,
        selectedClipIds: [],
        playheadPosition: 0,
        zoom: 1,
        isPlaying: false,
      });

      return project;
    },

    loadProject: (project) => {
      set({
        currentProject: project,
        isDirty: false,
        history: [{ project, timestamp: Date.now(), action: "load" }],
        historyIndex: 0,
        selectedClipIds: project.timelineState.selectedClipIds,
        playheadPosition: project.timelineState.playheadPosition,
        zoom: project.timelineState.zoom,
      });
    },

    updateProject: (updates) => {
      const { currentProject } = get();
      if (!currentProject) return;

      const updated = {
        ...currentProject,
        ...updates,
        updatedAt: new Date(),
      };

      set({ currentProject: updated, isDirty: true });
    },

    setProjectName: (name) => get().updateProject({ name }),
    setDuration: (duration) => get().updateProject({ duration }),
    setFps: (fps) => get().updateProject({ fps }),
    setResolution: (width, height) => get().updateProject({ width, height }),

    addTrack: (trackData) => {
      const { currentProject } = get();
      if (!currentProject) return;

      const track: Track = {
        ...trackData,
        id: crypto.randomUUID(),
      };

      get().saveSnapshot("addTrack");
      set({
        currentProject: {
          ...currentProject,
          tracks: [...currentProject.tracks, track],
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    removeTrack: (trackId) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().saveSnapshot("removeTrack");
      set({
        currentProject: {
          ...currentProject,
          tracks: currentProject.tracks.filter((t) => t.id !== trackId),
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    updateTrack: (trackId, updates) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().saveSnapshot("updateTrack");
      set({
        currentProject: {
          ...currentProject,
          tracks: currentProject.tracks.map((t) =>
            t.id === trackId ? { ...t, ...updates } : t
          ),
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    addClip: (clipData) => {
      const { currentProject } = get();
      if (!currentProject) return;

      const clip: Clip = {
        ...clipData,
        id: clipData.id || crypto.randomUUID(),
      } as Clip;

      get().saveSnapshot("addClip");

      const updatedTracks = currentProject.tracks.map((track) => {
        if (track.id === clip.trackId) {
          return {
            ...track,
            clips: [...track.clips, clip],
          };
        }
        return track;
      });

      set({
        currentProject: {
          ...currentProject,
          tracks: updatedTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    removeClip: (clipId) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().saveSnapshot("removeClip");

      const updatedTracks = currentProject.tracks.map((track) => ({
        ...track,
        clips: track.clips.filter((c) => c.id !== clipId),
      }));

      set({
        currentProject: {
          ...currentProject,
          tracks: updatedTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
        selectedClipIds: get().selectedClipIds.filter((id) => id !== clipId),
      });
    },

    updateClip: (clipId, updates) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().saveSnapshot("updateClip");

      const updatedTracks: Track[] = currentProject.tracks.map((track) => ({
        ...track,
        clips: track.clips.map((clip) =>
          clip.id === clipId ? { ...clip, ...updates } : clip
        ),
      })) as Track[];

      set({
        currentProject: {
          ...currentProject,
          tracks: updatedTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    splitClip: (clipId, splitTime) => {
      const { currentProject } = get();
      if (!currentProject) return;

      let splitClip: Clip | null = null;
      let trackId: string | null = null;

      for (const track of currentProject.tracks) {
        const clip = track.clips.find((c) => c.id === clipId);
        if (clip) {
          splitClip = clip;
          trackId = track.id;
          break;
        }
      }

      if (!splitClip || !trackId) return;

      const relativeTime = splitTime - splitClip.start;
      if (relativeTime <= 0 || relativeTime >= splitClip.duration) return;

      const firstHalf = {
        ...splitClip,
        duration: relativeTime,
        outPoint: splitClip.inPoint + relativeTime,
      };

      const secondHalf = {
        ...splitClip,
        id: crypto.randomUUID(),
        start: splitTime,
        duration: splitClip.duration - relativeTime,
        inPoint: splitClip.inPoint + relativeTime,
      };

      get().saveSnapshot("splitClip");

      const updatedTracks = currentProject.tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            clips: track.clips
              .filter((c) => c.id !== clipId)
              .concat([firstHalf as Clip, secondHalf as Clip]),
          };
        }
        return track;
      });

      set({
        currentProject: {
          ...currentProject,
          tracks: updatedTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    trimClip: (clipId, start, duration) => {
      get().updateClip(clipId, { start, duration });
    },

    moveClip: (clipId, newTrackId, newStart) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().saveSnapshot("moveClip");

      let movedClip: Clip | null = null;
      const updatedTracks = currentProject.tracks.map((track) => {
        const clipIndex = track.clips.findIndex((c) => c.id === clipId);
        if (clipIndex >= 0) {
          movedClip = { ...track.clips[clipIndex] };
          return {
            ...track,
            clips: track.clips.filter((c) => c.id !== clipId),
          };
        }
        return track;
      });

      if (!movedClip) return;

      const finalTracks = updatedTracks.map((track) => {
        if (track.id === newTrackId) {
          return {
            ...track,
            clips: [...track.clips, { ...movedClip, trackId: newTrackId, start: newStart } as Clip],
          };
        }
        return track;
      });

      set({
        currentProject: {
          ...currentProject,
          tracks: finalTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

    duplicateClip: (clipId) => {
      const { currentProject } = get();
      if (!currentProject) return;

      let sourceClip: Clip | null = null;
      let trackId: string | null = null;

      for (const track of currentProject.tracks) {
        const clip = track.clips.find((c) => c.id === clipId);
        if (clip) {
          sourceClip = clip;
          trackId = track.id;
          break;
        }
      }

      if (!sourceClip || !trackId) return;

      const newClip: Clip = {
        ...sourceClip,
        id: crypto.randomUUID(),
        start: sourceClip.start + sourceClip.duration,
      } as Clip;

      get().saveSnapshot("duplicateClip");

      const updatedTracks = currentProject.tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            clips: [...track.clips, newClip],
          };
        }
        return track;
      });

      set({
        currentProject: {
          ...currentProject,
          tracks: updatedTracks,
          updatedAt: new Date(),
        },
        isDirty: true,
      });
    },

  addVideoClip: (clipData: Omit<VideoClip, "id"> & { type: "video" }) => {
    const clip: VideoClip = {
      ...clipData,
      id: crypto.randomUUID(),
    };
    get().addClip(clip);
  },

  addAudioClip: (clipData: Omit<AudioClip, "id"> & { type: "audio" }) => {
    const clip: AudioClip = {
      ...clipData,
      id: crypto.randomUUID(),
    };
    get().addClip(clip);
  },

  addTextClip: (clipData: Omit<TextClip, "id"> & { type: "text" }) => {
    const clip: TextClip = {
      ...clipData,
      id: crypto.randomUUID(),
    };
    get().addClip(clip);
  },

  addImageClip: (clipData: Omit<ImageClip, "id"> & { type: "image" }) => {
    const clip: ImageClip = {
      ...clipData,
      id: crypto.randomUUID(),
    };
    get().addClip(clip);
  },

  addSubtitleClip: (clipData: Omit<SubtitleClip, "id"> & { type: "subtitle" }) => {
    const clip: SubtitleClip = {
      ...clipData,
      id: crypto.randomUUID(),
    };
    get().addClip(clip);
  },

    selectClip: (clipId, addToSelection = false) => {
      const { selectedClipIds } = get();
      if (addToSelection) {
        if (selectedClipIds.includes(clipId)) {
          set({ selectedClipIds: selectedClipIds.filter((id) => id !== clipId) });
        } else {
          set({ selectedClipIds: [...selectedClipIds, clipId] });
        }
      } else {
        set({ selectedClipIds: [clipId] });
      }
    },

    deselectClip: (clipId) => {
      set({
        selectedClipIds: get().selectedClipIds.filter((id) => id !== clipId),
      });
    },

    selectAllClips: () => {
      const { currentProject } = get();
      if (!currentProject) return;

      const allClipIds = currentProject.tracks.flatMap((track) =>
        track.clips.map((clip) => clip.id)
      );
      set({ selectedClipIds: allClipIds });
    },

    clearSelection: () => {
      set({ selectedClipIds: [] });
    },

    setPlayhead: (position) => {
      set({ playheadPosition: position });
      const { currentProject } = get();
      if (currentProject) {
        currentProject.timelineState.playheadPosition = position;
      }
    },

    setZoom: (zoom) => {
      const clampedZoom = Math.max(0.1, Math.min(10, zoom));
      set({ zoom: clampedZoom });
      const { currentProject } = get();
      if (currentProject) {
        currentProject.timelineState.zoom = clampedZoom;
      }
    },

    setActiveTool: (tool) => {
      set({ activeTool: tool });
      const { currentProject } = get();
      if (currentProject) {
        currentProject.timelineState.activeTool = tool;
      }
    },

    setPlaying: (playing) => {
      set({ isPlaying: playing });
      const { currentProject } = get();
      if (currentProject) {
        currentProject.timelineState.isPlaying = playing;
      }
    },

    setExportProgress: (progress) => {
      set({
        exportProgress: { ...get().exportProgress, ...progress },
      });
    },

    saveSnapshot: (action) => {
      const { currentProject, history, historyIndex } = get();
      if (!currentProject) return;

      const snapshot: HistoryEntry = {
        project: JSON.parse(JSON.stringify(currentProject)),
        timestamp: Date.now(),
        action,
      };

      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(snapshot);

      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1,
        isDirty: true,
      });
    },

    undo: () => {
      const { history, historyIndex, currentProject } = get();
      if (historyIndex <= 0 || !currentProject) return;

      const newIndex = historyIndex - 1;
      const snapshot = history[newIndex];

      set({
        currentProject: JSON.parse(JSON.stringify(snapshot.project)),
        historyIndex: newIndex,
        isDirty: true,
      });
    },

    redo: () => {
      const { history, historyIndex, currentProject } = get();
      if (historyIndex >= history.length - 1 || !currentProject) return;

      const newIndex = historyIndex + 1;
      const snapshot = history[newIndex];

      set({
        currentProject: JSON.parse(JSON.stringify(snapshot.project)),
        historyIndex: newIndex,
        isDirty: true,
      });
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    togglePlayPause: () => {
      const { isPlaying } = get();
      get().setPlaying(!isPlaying);
    },

    setSnapEnabled: (enabled) => set({ snapEnabled: enabled }),
    setShowGrid: (show) => set({ showGrid: show }),
    setActivePanel: (panel) => set({ activePanel: panel }),

    addAsset: (asset) => set({ assets: [...get().assets, asset] }),
    removeAsset: (assetId) =>
      set({ assets: get().assets.filter((a) => a.id !== assetId) }),

    export: async (settings) => {
      const { currentProject } = get();
      if (!currentProject) return;

      get().setIsExporting(true);
      get().setExportStage("preparing");
      get().setExportCurrentStage("preparing");
      get().setExportSettings({ ...get().exportSettings, ...settings });

      try {
        const { exportService } = await import("@/services/export-service");
        await exportService.exportVideo(currentProject, {
          ...get().exportSettings,
          ...settings,
        }, (progress) => {
          get().setExportProgress(progress);
        });
        get().setExportStage("completed");
        get().setIsExporting(false);
      } catch (error) {
        get().setExportError(error instanceof Error ? error.message : "Export failed");
        get().setIsExporting(false);
      }
    },

    cancelExport: () => {
      get().setExportStage("cancelled");
      get().setIsExporting(false);
    },

    setExportSettings: (settings) =>
      set({ exportSettings: { ...get().exportSettings, ...settings } }),
    setExportStage: (stage) => set({ exportStage: stage }),
    setExportCurrentStage: (stage) => set({ exportCurrentStage: stage }),
    setExportEstimatedTime: (time) => set({ exportEstimatedTime: time }),
    setExportError: (error) => set({ error }),
    setIsExporting: (exporting) => set({ isExporting: exporting }),

    reset: () => set(initialState),
  })
);
