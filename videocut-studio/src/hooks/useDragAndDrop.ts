import { useCallback, useRef, useState } from "react";
import type { Clip, Track, MediaAsset } from "@/types";

export interface DragState {
  isDragging: boolean;
  type: "move" | "trim-start" | "trim-end" | "resize" | null;
  clipId: string | null;
  startX: number;
  originalClip: Clip | null;
  currentTrackId: string | null;
}

export interface SnapPoint {
  time: number;
  trackId: string;
  type: "clip-start" | "clip-end" | "playhead";
}

export interface DropResult {
  trackId: string;
  start: number;
  duration: number;
}

const SNAP_THRESHOLD = 10;

export function useDragAndDrop(
  tracks: Track[],
  onClipMove: (clipId: string, newTrackId: string, newStart: number) => void,
  onClipTrim: (clipId: string, newStart: number, newDuration: number, trimType: "start" | "end") => void,
  zoom: number = 1,
  snapEnabled: boolean = true
) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    type: null,
    clipId: null,
    startX: 0,
    originalClip: null,
    currentTrackId: null,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const getSnapPoints = useCallback((): SnapPoint[] => {
    const points: SnapPoint[] = [];

    for (const track of tracks) {
      for (const clip of track.clips) {
        points.push({
          time: clip.start,
          trackId: track.id,
          type: "clip-start",
        });
        points.push({
          time: clip.start + clip.duration,
          trackId: track.id,
          type: "clip-end",
        });
      }
    }

    return points;
  }, [tracks]);

  const findSnapPoint = useCallback(
    (time: number, trackId: string): SnapPoint | null => {
      if (!snapEnabled) return null;

      const snapPoints = getSnapPoints();
      const threshold = SNAP_THRESHOLD / zoom;

      let closest: SnapPoint | null = null;
      let closestDistance = threshold;

      for (const point of snapPoints) {
        const distance = Math.abs(point.time - time);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = point;
        }
      }

      return closest;
    },
    [getSnapPoints, snapEnabled, zoom]
  );

  const handleDragStart = useCallback(
    (
      clip: Clip,
      type: DragState["type"],
      clientX: number
    ) => {
      setDragState({
        isDragging: true,
        type,
        clipId: clip.id,
        startX: clientX,
        originalClip: { ...clip },
        currentTrackId: clip.trackId,
      });
    },
    []
  );

  const handleDragMove = useCallback(
    (clientX: number): { newStart: number; newTrackId: string } | null => {
      if (!dragState.isDragging || !dragState.originalClip || !containerRef.current) {
        return null;
      }

      const deltaX = clientX - dragState.startX;
      const deltaTime = deltaX / zoom;
      const originalClip = dragState.originalClip;

      let newStart = originalClip.start;
      let newDuration = originalClip.duration;
      let newTrackId = dragState.currentTrackId || originalClip.trackId;

      if (dragState.type === "move") {
        newStart = Math.max(0, originalClip.start + deltaTime);
      } else if (dragState.type === "trim-start") {
        const maxTrim = originalClip.start + originalClip.duration - 0.1;
        newStart = Math.max(0, Math.min(maxTrim, originalClip.start + deltaTime));
        newDuration = originalClip.duration - (newStart - originalClip.start);
      } else if (dragState.type === "trim-end") {
        newDuration = Math.max(0.1, originalClip.duration + deltaTime);
      }

      const snapPoint = findSnapPoint(newStart, newTrackId);
      if (snapPoint) {
        if (dragState.type === "move") {
          newStart = snapPoint.time;
        } else if (dragState.type === "trim-start") {
          newStart = snapPoint.time;
          newDuration = originalClip.duration - (newStart - originalClip.start);
        }
      }

      return { newStart, newTrackId };
    },
    [dragState, findSnapPoint, zoom]
  );

  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging || !dragState.originalClip) {
      setDragState({
        isDragging: false,
        type: null,
        clipId: null,
        startX: 0,
        originalClip: null,
        currentTrackId: null,
      });
      return;
    }

    setDragState({
      isDragging: false,
      type: null,
      clipId: null,
      startX: 0,
      originalClip: null,
      currentTrackId: null,
    });
  }, [dragState]);

  const handleFileDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>): Promise<DropResult | null> => {
      event.preventDefault();
      setIsDraggingOver(false);

      const files = Array.from(event.dataTransfer.files);
      if (files.length === 0) return null;

      const { useEditorStore } = await import("@/store/editor-store");
      const store = useEditorStore.getState();

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let targetTrackIndex = Math.floor(y / 50);
      const tracks = store.currentProject?.tracks || [];
      targetTrackIndex = Math.max(0, Math.min(tracks.length - 1, targetTrackIndex));

      const targetTrack = tracks[targetTrackIndex];
      if (!targetTrack) return null;

      const startTime = x / zoom;

      return {
        trackId: targetTrack.id,
        start: Math.max(0, startTime),
        duration: 5,
      };
    },
    [zoom]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  }, []);

  return {
    dragState,
    containerRef,
    isDraggingOver,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleFileDrop,
    handleDragOver,
    handleDragLeave,
    findSnapPoint,
    getSnapPoints,
  };
}
