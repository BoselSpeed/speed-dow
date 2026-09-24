"use client";

import { useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Scissors,
  Trash2,
  Gauge,
  Music2,
  Waves,
} from "lucide-react";
import { useEditorStore } from "@/store/editor-store";

export default function AudioEditor() {
  const { currentProject, selectedClipIds, updateClip, splitClip, removeClip } =
    useEditorStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const tracks = currentProject?.tracks || [];
  const audioTrack = tracks.find((t: any) => t.type === "audio") || tracks[1];
  const selectedClip = audioTrack?.clips.find((c: any) => selectedClipIds.includes(c.id));
  const audioClip = selectedClip?.type === "audio" ? (selectedClip as any) : null;

  const generateWaveform = (count: number) => {
    return Array.from({ length: count }, () => Math.random() * 0.8 + 0.2);
  };

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Audio Editor</h3>
      </div>

      {!audioClip ? (
        <div className="rounded-lg border border-dashed border-gray-700 p-6 text-center">
          <Music2 className="mx-auto mb-2 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-400">Select an audio clip to edit</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-gray-400">Clip Name</label>
            <input
              type="text"
              value={audioClip.name}
              readOnly
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>Volume</span>
              <span>{Math.round((audioClip.volume || 1) * 100)}%</span>
            </label>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={audioClip.volume || 1}
                onChange={(e) =>
                  updateClip(audioClip.id, { volume: parseFloat(e.target.value) })
                }
                className="h-1 flex-1 cursor-pointer accent-violet-600"
              />
              <button
                onClick={() => updateClip(audioClip.id, { muted: !audioClip.muted })}
                className="text-gray-400 hover:text-white"
              >
                {audioClip.muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>Fade In</span>
              <span>{(audioClip.fadeIn || 0).toFixed(1)}s</span>
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={audioClip.fadeIn || 0}
              onChange={(e) =>
                updateClip(audioClip.id, { fadeIn: parseFloat(e.target.value) })
              }
              className="h-1 w-full cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>Fade Out</span>
              <span>{(audioClip.fadeOut || 0).toFixed(1)}s</span>
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={audioClip.fadeOut || 0}
              onChange={(e) =>
                updateClip(audioClip.id, { fadeOut: parseFloat(e.target.value) })
              }
              className="h-1 w-full cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>Speed</span>
              <span>{(audioClip.speed || 1).toFixed(2)}x</span>
            </label>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0.25"
                max="4"
                step="0.01"
                value={audioClip.speed || 1}
                onChange={(e) =>
                  updateClip(audioClip.id, { speed: parseFloat(e.target.value) })
                }
                className="h-1 flex-1 cursor-pointer accent-violet-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>Pitch</span>
              <span>{(audioClip.pitch || 1).toFixed(2)}x</span>
            </label>
            <div className="flex items-center gap-2">
              <Music2 className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.01"
                value={audioClip.pitch || 1}
                onChange={(e) =>
                  updateClip(audioClip.id, { pitch: parseFloat(e.target.value) })
                }
                className="h-1 flex-1 cursor-pointer accent-violet-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-gray-400">Waveform</label>
            <div className="flex h-16 items-end gap-0.5 rounded-lg border border-gray-700 bg-gray-800 p-2">
              {generateWaveform(100).map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-violet-500"
                  style={{ height: `${value * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-400">Effects</label>
            <div className="grid grid-cols-2 gap-2">
              {["Reverb", "Echo", "Bass Boost", "Treble"].map((effect) => (
                <button
                  key={effect}
                  className="rounded-md border border-gray-700 px-2 py-1.5 text-xs text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors"
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => splitClip(audioClip.id, audioClip.start + audioClip.duration / 2)}
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-gray-700 px-3 py-2 text-xs text-gray-300 hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              <Scissors className="h-3 w-3" />
              Split
            </button>
            <button
              onClick={() => removeClip(audioClip.id)}
              className="flex items-center justify-center gap-1 rounded-md border border-red-700 px-3 py-2 text-xs text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
