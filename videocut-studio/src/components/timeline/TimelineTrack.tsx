"use client";

import { useState, useRef } from "react";
import { GripVertical, Eye, EyeOff, Lock, Unlock, Volume2, VolumeX } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { TimelineClip } from "./TimelineClip";

const PIXELS_PER_SECOND = 50;

export function TimelineTrack({ track, zoom }: { track: ReturnType<typeof useEditorStore.getState>["tracks"][0]; zoom: number }) {
  const { updateTrack, addClip } = useEditorStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const clipData = e.dataTransfer.getData("application/clip");
    if (clipData) {
      const clip = JSON.parse(clipData);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const start = x / (PIXELS_PER_SECOND * zoom);
      addClip({ ...clip, trackId: track.id, start: Math.max(0, start) });
    }
  };

  return (
    <div
      className={`flex h-16 border-b border-gray-800 ${
        isDragOver ? "bg-violet-900/20" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="flex w-48 flex-shrink-0 items-center gap-1 border-r border-gray-800 bg-[#111827] px-2">
        <button className="cursor-move text-gray-500 hover:text-gray-300">
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="flex-1 truncate text-xs text-gray-300">{track.name}</span>
        <button
          onClick={() => updateTrack(track.id, { muted: !track.muted })}
          className="text-gray-500 hover:text-gray-300"
        >
          {track.muted ? (
            <VolumeX className="h-3 w-3" />
          ) : (
            <Volume2 className="h-3 w-3" />
          )}
        </button>
        <button
          onClick={() => updateTrack(track.id, { hidden: !track.hidden })}
          className="text-gray-500 hover:text-gray-300"
        >
          {track.hidden ? (
            <EyeOff className="h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
        </button>
        <button
          onClick={() => updateTrack(track.id, { locked: !track.locked })}
          className="text-gray-500 hover:text-gray-300"
        >
          {track.locked ? (
            <Lock className="h-3 w-3" />
          ) : (
            <Unlock className="h-3 w-3" />
          )}
        </button>
      </div>
      <div className="relative flex-1">
        {track.clips.map((clip) => (
          <TimelineClip
            key={clip.id}
            clip={clip}
            track={track}
            zoom={zoom}
          />
        ))}
      </div>
    </div>
  );
}
