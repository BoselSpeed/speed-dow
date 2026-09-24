"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings2,
  Monitor,
  Grid3X3,
  Frame,
} from "lucide-react";
import { useEditorStore, AspectRatio, Quality } from "@/store/editorStore";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const frames = Math.floor((seconds % 1) * 30);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${frames.toString().padStart(2, "0")}`;
}

export default function PreviewPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const {
    playhead,
    setPlayhead,
    duration,
    zoom,
    tracks,
    theme,
    setActivePanel,
  } = useEditorStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState<Quality>("high");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");

  const aspectRatios: { value: AspectRatio; label: string; ratio: number }[] = [
    { value: "16:9", label: "16:9", ratio: 16 / 9 },
    { value: "9:16", label: "9:16", ratio: 9 / 16 },
    { value: "1:1", label: "1:1", ratio: 1 },
    { value: "4:5", label: "4:5", ratio: 4 / 5 },
    { value: "4:3", label: "4:3", ratio: 4 / 3 },
  ];

  const currentAspect = aspectRatios.find((a) => a.value === aspectRatio)?.ratio || 16 / 9;

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1a1a2e";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`Preview - ${formatTime(playhead)}`, canvas.width / 2, canvas.height / 2);

    if (showGrid) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo((canvas.width / 3) * i, 0);
        ctx.lineTo((canvas.width / 3) * i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, (canvas.height / 3) * i);
        ctx.lineTo(canvas.width, (canvas.height / 3) * i);
        ctx.stroke();
      }
    }

    if (showSafeArea) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      const margin = 0.1;
      ctx.strokeRect(
        canvas.width * margin,
        canvas.height * margin,
        canvas.width * (1 - margin * 2),
        canvas.height * (1 - margin * 2)
      );
    }

    tracks.forEach((track) => {
      if (track.hidden) return;
      track.clips.forEach((clip) => {
        if (
          playhead >= clip.start &&
          playhead < clip.start + clip.duration
        ) {
          ctx.fillStyle = clip.color || "#7C3AED";
          ctx.globalAlpha = clip.opacity ?? 1;
          const x = clip.x ?? (canvas.width * 0.1);
          const y = clip.y ?? (canvas.height * 0.1);
          const w = clip.width ?? (canvas.width * 0.8);
          const h = clip.height ?? (canvas.height * 0.8);
          ctx.fillRect(x, y, w, h);
          if (clip.text) {
            ctx.fillStyle = clip.fontColor || "#ffffff";
            ctx.font = `${clip.fontSize || 24}px ${clip.fontFamily || "Arial"}`;
            ctx.textAlign = "center";
            ctx.fillText(clip.text, canvas.width / 2, canvas.height / 2);
          }
          ctx.globalAlpha = 1;
        }
      });
    });
  }, [playhead, tracks, bgColor, showGrid, showSafeArea]);

  useEffect(() => {
    drawFrame();
  }, [drawFrame]);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      if (isPlaying) {
        const delta = (time - lastTime) / 1000;
        lastTime = time;
        const newPlayhead = playhead + delta;
        if (newPlayhead >= duration) {
          setIsPlaying(false);
          setPlayhead(0);
        } else {
          setPlayhead(newPlayhead);
        }
      } else {
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, playhead, duration, setPlayhead]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setActivePanel("text");
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-1 flex-col bg-black ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      <div className="flex flex-1 items-center justify-center p-4">
        <div
          className="relative overflow-hidden rounded-lg bg-gray-900 shadow-2xl"
          style={{
            aspectRatio: currentAspect,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="h-full w-full cursor-pointer"
            onClick={handleCanvasClick}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlayhead(0)}
                className="rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                className="rounded-lg bg-violet-600 p-3 text-white hover:bg-violet-700 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => setPlayhead(duration)}
                className="rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-black/50 px-3 py-1.5">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (parseFloat(e.target.value) > 0) setIsMuted(false);
                  }}
                  className="h-1 w-20 cursor-pointer accent-violet-600"
                />
              </div>
              <button
                onClick={handleFullscreen}
                className="rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-800 bg-[#0B0F19] px-4 py-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-white">
            {formatTime(playhead)}
          </span>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm font-mono text-gray-400">
            {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Monitor className="h-4 w-4 text-gray-400" />
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-white focus:border-violet-500 focus:outline-none"
            >
              {aspectRatios.map((ar) => (
                <option key={ar.value} value={ar.value}>
                  {ar.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Settings2 className="h-4 w-4 text-gray-400" />
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value as Quality)}
              className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-white focus:border-violet-500 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Grid3X3
              className={`h-4 w-4 cursor-pointer transition-colors ${
                showGrid ? "text-violet-400" : "text-gray-400"
              }`}
              onClick={() => setShowGrid(!showGrid)}
            />
            <Frame
              className={`h-4 w-4 cursor-pointer transition-colors ${
                showSafeArea ? "text-violet-400" : "text-gray-400"
              }`}
              onClick={() => setShowSafeArea(!showSafeArea)}
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-400">BG:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-6 w-8 cursor-pointer rounded border border-gray-700 bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
