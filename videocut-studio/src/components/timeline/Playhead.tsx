"use client";

import { useRef, useCallback } from "react";
import { useEditorStore } from "@/store/editorStore";

const PIXELS_PER_SECOND = 50;

export function Playhead({ playhead, zoom }: { playhead: number; zoom: number }) {
  const { setPlayhead, snapToGrid, duration } = useEditorStore();
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      isDragging.current = true;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const container = (e.target as HTMLElement).closest(".overflow-x-auto");
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = moveEvent.clientX - rect.left + container.scrollLeft - 192;
        let time = Math.max(0, x / (PIXELS_PER_SECOND * zoom));
        if (snapToGrid) {
          const gridSize = 1 / zoom;
          time = Math.round(time / gridSize) * gridSize;
        }
        setPlayhead(Math.min(time, duration));
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [zoom, snapToGrid, setPlayhead, duration]
  );

  const left = playhead * PIXELS_PER_SECOND * zoom;

  return (
    <div
      className="absolute top-0 z-20 h-full w-px cursor-ew-resize"
      style={{ left }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute -top-0 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-violet-400 bg-[#0B0F19]" />
      <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-violet-400" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-violet-600 px-1.5 py-0.5">
        <span className="text-xs font-mono text-white">
          {Math.floor(playhead / 60)}:{(playhead % 60).toFixed(2).padStart(5, "0")}
        </span>
      </div>
    </div>
  );
}
