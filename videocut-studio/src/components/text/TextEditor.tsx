"use client";

import { useState, useCallback } from "react";
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Palette,
  Text,
  RotateCw,
  Play,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

export default function TextEditor() {
  const { tracks, addClip, setActivePanel, selectedClipIds } = useEditorStore();
  const textTrack = tracks.find((t) => t.type === "text") || tracks[0];
  const [text, setText] = useState("Sample Text");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [borderColor, setBorderColor] = useState("#000000");
  const [shadowColor, setShadowColor] = useState("transparent");
  const [opacity, setOpacity] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">("center");
  const [animation, setAnimation] = useState<string>("none");
  const [duration, setDuration] = useState(5);

  const fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Impact",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
  ];

  const animations = [
    { value: "none", label: "None" },
    { value: "fadeIn", label: "Fade In" },
    { value: "typewriter", label: "Typewriter" },
    { value: "slideUp", label: "Slide Up" },
    { value: "slideDown", label: "Slide Down" },
    { value: "zoomIn", label: "Zoom In" },
    { value: "rotateIn", label: "Rotate In" },
  ];

  const handleAddText = useCallback(() => {
    addClip({
      id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: "text",
      name: text || "Text",
      start: 0,
      duration,
      trackId: textTrack.id,
      text,
      fontFamily,
      fontSize,
      fontColor,
      backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
      borderColor: borderColor === "#000000" ? undefined : borderColor,
      shadowColor: shadowColor === "transparent" ? undefined : shadowColor,
      opacity,
      rotation,
      animation,
      color: textTrack.color,
    });
  }, [
    text,
    fontFamily,
    fontSize,
    fontColor,
    backgroundColor,
    borderColor,
    shadowColor,
    opacity,
    rotation,
    animation,
    duration,
    addClip,
    textTrack,
  ]);

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Text Editor</h3>
        <button
          onClick={() => setActivePanel(null)}
          className="text-gray-400 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-20 w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-sm text-white focus:border-violet-500 focus:outline-none"
          placeholder="Enter text..."
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-gray-400">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value) || 24)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
            min="8"
            max="200"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="h-1 w-full cursor-pointer accent-violet-600"
          />
        </div>
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Background Color</label>
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

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Border Color</label>
        <div className="flex items-center gap-2">
          <Text className="h-4 w-4 text-gray-500" />
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-gray-700 bg-transparent"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Shadow Color</label>
        <div className="flex items-center gap-2">
          <Text className="h-4 w-4 text-gray-500" />
          <input
            type="color"
            value={shadowColor === "transparent" ? "#000000" : shadowColor}
            onChange={(e) => setShadowColor(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-gray-700 bg-transparent"
            disabled={shadowColor === "transparent"}
          />
          <button
            onClick={() => setShadowColor(shadowColor === "transparent" ? "#000000" : "transparent")}
            className="text-xs text-gray-400 hover:text-white"
          >
            {shadowColor === "transparent" ? "None" : "Enabled"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Rotation</label>
        <div className="flex items-center gap-2">
          <RotateCw className="h-4 w-4 text-gray-500" />
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-violet-600"
          />
          <span className="text-xs text-gray-400">{rotation}°</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Alignment</label>
        <div className="flex gap-1">
          {[
            { value: "left", icon: AlignLeft },
            { value: "center", icon: AlignCenter },
            { value: "right", icon: AlignRight },
            { value: "justify", icon: AlignJustify },
          ].map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setAlignment(value as typeof alignment)}
              className={`rounded-md p-2 transition-colors ${
                alignment === value
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Animation</label>
        <select
          value={animation}
          onChange={(e) => setAnimation(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
        >
          {animations.map((anim) => (
            <option key={anim.value} value={anim.value}>
              {anim.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Duration (seconds)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
          min="0.1"
          max="3600"
          step="0.1"
        />
      </div>

      <button
        onClick={handleAddText}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
      >
        <Play className="h-4 w-4" />
        Add to Timeline
      </button>
    </div>
  );
}
