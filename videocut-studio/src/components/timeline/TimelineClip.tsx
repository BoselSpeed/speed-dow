"use client";

import { useState, useRef, useCallback } from "react";
import { MoreVertical, Scissors, Copy, Trash2 } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

const PIXELS_PER_SECOND = 50;

export function TimelineClip({
  clip,
  track,
  zoom,
}: {
  clip: ReturnType<typeof useEditorStore.getState>["tracks"][0]["clips"][0];
  track: ReturnType<typeof useEditorStore.getState>["tracks"][0];
  zoom: number;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [isResizing, setIsResizing] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const clipRef = useRef<HTMLDivElement>(null);
  const { selectedClipIds, setSelectedClipIds, updateClip, splitClip, duplicateClip, removeClip, snapToGrid } =
    useEditorStore();

  const width = clip.duration * PIXELS_PER_SECOND * zoom;
  const left = clip.start * PIXELS_PER_SECOND * zoom;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (track.locked) return;
    e.stopPropagation();
    setIsSelected(true);
    setSelectedClipIds([clip.id]);
  };

  const handleResizeStart = (e: React.MouseEvent, side: "left" | "right") => {
    if (track.locked) return;
    e.stopPropagation();
    setIsResizing(side);
    const startX = e.clientX;
    const originalStart = clip.start;
    const originalDuration = clip.duration;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaTime = deltaX / (PIXELS_PER_SECOND * zoom);
      let newStart = originalStart;
      let newDuration = originalDuration;

      if (side === "left") {
        newStart = Math.max(0, originalStart + deltaTime);
        newDuration = originalDuration - (newStart - originalStart);
      } else {
        newDuration = Math.max(0.1, originalDuration + deltaTime);
      }

      updateClip(clip.id, { start: newStart, duration: newDuration });
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (track.locked || isResizing) return;
    e.stopPropagation();
    setIsDragging(true);
    const startX = e.clientX;
    const originalStart = clip.start;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaTime = deltaX / (PIXELS_PER_SECOND * zoom);
      let newStart = Math.max(0, originalStart + deltaTime);
      if (snapToGrid) {
        const gridSize = 1 / zoom;
        newStart = Math.round(newStart / gridSize) * gridSize;
      }
      updateClip(clip.id, { start: newStart });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(true);
  };

  return (
    <>
      <div
        ref={clipRef}
        className={`absolute top-1 bottom-1 rounded-md border-2 transition-all ${
          isSelected
            ? "border-violet-400 shadow-lg shadow-violet-500/20"
            : "border-transparent hover:border-gray-600"
        } ${isDragging ? "opacity-70" : ""}`}
        style={{
          left,
          width: Math.max(width, 20),
          backgroundColor: clip.color || track.color,
        }}
        onMouseDown={handleMouseDown}
        onMouseDownCapture={handleDragStart}
        onContextMenu={handleContextMenu}
      >
        <div className="flex h-full items-center px-2">
          <span className="truncate text-xs font-medium text-white">
            {clip.name}
          </span>
        </div>
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize hover:bg-white/20"
          onMouseDown={(e) => handleResizeStart(e, "left")}
        />
        <div
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize hover:bg-white/20"
          onMouseDown={(e) => handleResizeStart(e, "right")}
        />
        <div className="absolute bottom-1 right-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(true);
            }}
            className="rounded p-0.5 text-white/70 hover:text-white"
          >
            <MoreVertical className="h-3 w-3" />
          </button>
        </div>
      </div>
      {showMenu && (
        <div
          className="fixed z-50 rounded-lg border border-gray-700 bg-gray-800 py-1 shadow-xl"
          style={{
            left: clipRef.current?.getBoundingClientRect().right || 0,
            top: clipRef.current?.getBoundingClientRect().top || 0,
          }}
        >
          <button
            onClick={() => {
              splitClip(clip.id, clip.start + clip.duration / 2);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Scissors className="h-4 w-4" />
            Split
          </button>
          <button
            onClick={() => {
              duplicateClip(clip.id);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </button>
          <button
            onClick={() => {
              removeClip(clip.id);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </>
  );
}
