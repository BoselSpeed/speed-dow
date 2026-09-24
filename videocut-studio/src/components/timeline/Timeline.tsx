"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, Grid3X3, GripVertical } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { TimelineTrack } from "./TimelineTrack";
import { Playhead } from "./Playhead";

const PIXELS_PER_SECOND = 50;

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    tracks,
    playhead,
    duration,
    zoom,
    setPlayhead,
    setZoom,
    snapToGrid,
    toggleSnapToGrid,
    setSelectedClipIds,
    selectedClipIds,
    splitClip,
    duplicateClip,
    removeClip,
  } = useEditorStore();

  const snapTime = useCallback(
    (time: number) => {
      if (!snapToGrid) return time;
      const gridSize = 1 / zoom;
      return Math.round(time / gridSize) * gridSize;
    },
    [snapToGrid, zoom]
  );

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + containerRef.current.scrollLeft;
    const time = Math.max(0, x / (PIXELS_PER_SECOND * zoom));
    setPlayhead(snapTime(Math.min(time, duration)));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(Math.max(0.1, Math.min(zoom + delta, 10)));
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const timelineWidth = duration * PIXELS_PER_SECOND * zoom;

  return (
    <div className="flex h-64 flex-col border-t border-gray-800 bg-[#0B0F19]">
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs text-gray-400">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(10, zoom + 0.1))}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSnapToGrid}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
              snapToGrid
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Grid3X3 className="h-3 w-3" />
            Snap
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {tracks.length} tracks
          </span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-48 flex-shrink-0 flex-col border-r border-gray-800">
          <div className="h-8 border-b border-gray-800 bg-[#111827] px-2 flex items-center">
            <span className="text-xs font-medium text-gray-400">Tracks</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex h-16 items-center border-b border-gray-800 px-2"
              >
                <GripVertical className="mr-2 h-4 w-4 cursor-move text-gray-500" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-white">{track.name}</div>
                  <div className="text-xs text-gray-500">{track.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex flex-1 overflow-x-auto overflow-y-auto"
          onClick={handleTimelineClick}
          onWheel={handleWheel}
          onContextMenu={handleContextMenu}
        >
          <div className="relative" style={{ width: timelineWidth, minHeight: "100%" }}>
            <TimeRuler duration={duration} zoom={zoom} />
            <div className="relative">
              {tracks.map((track) => (
                <TimelineTrack key={track.id} track={track} zoom={zoom} />
              ))}
            </div>
            <Playhead playhead={playhead} zoom={zoom} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeRuler({ duration, zoom }: { duration: number; zoom: number }) {
  const pixelsPerSecond = PIXELS_PER_SECOND * zoom;
  const width = duration * pixelsPerSecond;
  const marks: { time: number; label: string }[] = [];
  const interval = zoom < 0.5 ? 10 : zoom < 1 ? 5 : zoom < 2 ? 2 : 1;
  for (let t = 0; t <= duration; t += interval) {
    marks.push({
      time: t,
      label: `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`,
    });
  }

  return (
    <div className="sticky top-0 z-10 flex h-8 border-b border-gray-800 bg-[#111827]">
      <div className="w-48 flex-shrink-0 border-r border-gray-800" />
      <div className="relative" style={{ width }}>
        {marks.map((mark) => (
          <div
            key={mark.time}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: mark.time * pixelsPerSecond }}
          >
            <span className="text-xs text-gray-500">{mark.label}</span>
            <div className="h-2 w-px bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
