"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Download,
  Play,
  Pause,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

export default function SubtitleEditor() {
  const { subtitles, addSubtitle, updateSubtitle, removeSubtitle, playhead } =
    useEditorStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [fontSize, setFontSize] = useState(24);
  const [position, setPosition] = useState({ x: 50, y: 90 });
  const [rtl, setRtl] = useState(false);

  const selectedSubtitle = subtitles.find((s) => s.id === selectedId);

  const handleAdd = () => {
    if (!text.trim()) return;
    addSubtitle({
      id: `sub-${Date.now()}`,
      start,
      end,
      text: text.trim(),
      fontColor,
      backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
      fontSize,
      position,
      rtl,
    });
    setText("");
    setStart(end);
    setEnd(end + 5);
  };

  const handleSelect = (subtitle: (typeof subtitles)[0]) => {
    setSelectedId(subtitle.id);
    setText(subtitle.text);
    setStart(subtitle.start);
    setEnd(subtitle.end);
    setFontColor(subtitle.fontColor || "#ffffff");
    setBackgroundColor(subtitle.backgroundColor || "transparent");
    setFontSize(subtitle.fontSize || 24);
    setPosition(subtitle.position || { x: 50, y: 90 });
    setRtl(subtitle.rtl || false);
  };

  const handleUpdate = () => {
    if (!selectedId) return;
    updateSubtitle(selectedId, {
      text: text.trim(),
      start,
      end,
      fontColor,
      backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
      fontSize,
      position,
      rtl,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
  };

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Subtitles</h3>
        <div className="flex gap-1">
          <button className="rounded p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white" title="Import SRT">
            <Upload className="h-4 w-4" />
          </button>
          <button className="rounded p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white" title="Export SRT">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.id}
            onClick={() => handleSelect(subtitle)}
            className={`cursor-pointer rounded-lg border p-2 transition-colors ${
              selectedId === subtitle.id
                ? "border-violet-500 bg-violet-500/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">
                {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSubtitle(subtitle.id);
                  if (selectedId === subtitle.id) setSelectedId(null);
                }}
                className="text-gray-500 hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
            <p className="mt-1 truncate text-sm text-white">{subtitle.text}</p>
          </div>
        ))}
        {subtitles.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-500">No subtitles yet</p>
        )}
      </div>

      <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/50 p-3">
        <h4 className="mb-3 text-xs font-medium text-gray-400">
          {selectedId ? "Edit Subtitle" : "Add Subtitle"}
        </h4>
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-400">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-16 w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-sm text-white focus:border-violet-500 focus:outline-none"
            placeholder="Enter subtitle text..."
          />
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-gray-400">Start</label>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
              step="0.1"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">End</label>
            <input
              type="number"
              value={end}
              onChange={(e) => setEnd(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
              step="0.1"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-400">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value) || 24)}
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
            min="8"
            max="200"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-400">Font Color</label>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-gray-500" />
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="h-8 w-12 cursor-pointer rounded border border-gray-700 bg-transparent"
            />
            <span className="text-xs text-gray-400">{fontColor}</span>
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-400">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={backgroundColor === "transparent" ? "#000000" : backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-8 w-12 cursor-pointer rounded border border-gray-700 bg-transparent"
              disabled={backgroundColor === "transparent"}
            />
            <button
              onClick={() => setBackgroundColor(backgroundColor === "transparent" ? "#000000" : "transparent")}
              className="text-xs text-gray-400 hover:text-white"
            >
              {backgroundColor === "transparent" ? "Transparent" : "Opaque"}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-400">Position</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-gray-500">X: {position.x}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={position.x}
                onChange={(e) => setPosition({ ...position, x: parseInt(e.target.value) })}
                className="h-1 w-full cursor-pointer accent-violet-600"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Y: {position.y}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={position.y}
                onChange={(e) => setPosition({ ...position, y: parseInt(e.target.value) })}
                className="h-1 w-full cursor-pointer accent-violet-600"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rtl}
              onChange={(e) => setRtl(e.target.checked)}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 accent-violet-600"
            />
            <span className="text-sm text-gray-300">Right-to-Left (RTL)</span>
          </label>
        </div>
        <div className="flex gap-2">
          {selectedId ? (
            <button
              onClick={handleUpdate}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          )}
          {selectedId && (
            <button
              onClick={() => {
                removeSubtitle(selectedId);
                setSelectedId(null);
                setText("");
              }}
              className="rounded-lg border border-red-700 px-3 py-2 text-xs text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
