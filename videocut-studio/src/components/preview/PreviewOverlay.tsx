"use client";

import { useRef, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";

export default function PreviewOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tracks, playhead } = useEditorStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tracks.forEach((track) => {
      if (track.hidden) return;
      track.clips.forEach((clip) => {
        if (playhead >= clip.start && playhead < clip.start + clip.duration) {
          ctx.save();
          ctx.globalAlpha = clip.opacity ?? 1;
          const x = clip.x ?? 50;
          const y = clip.y ?? 50;
          const w = clip.width ?? 200;
          const h = clip.height ?? 100;

          if (clip.text) {
            ctx.font = `${clip.fontSize || 24}px ${clip.fontFamily || "Arial"}`;
            ctx.fillStyle = clip.fontColor || "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (clip.shadowColor) {
              ctx.shadowColor = clip.shadowColor;
              ctx.shadowBlur = 10;
            }
            ctx.fillText(clip.text, x + w / 2, y + h / 2);
            ctx.shadowBlur = 0;
          }

          if (clip.backgroundColor) {
            ctx.fillStyle = clip.backgroundColor;
            ctx.fillRect(x, y, w, h);
          }

          if (clip.borderColor) {
            ctx.strokeStyle = clip.borderColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, h);
          }

          ctx.restore();
        }
      });
    });
  }, [tracks, playhead]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
