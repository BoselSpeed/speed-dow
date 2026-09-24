"use client";

import { useState } from "react";
import {
  Video,
  Image,
  Music,
  FileText,
  Sparkles,
  Palette,
  Wand2,
  Smile,
  Monitor,
  Camera,
  Bot,
  ChevronDown,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import { useEditorStore, Tool } from "@/store/editorStore";

const panels: { id: string; label: string; icon: React.ElementType; tool: Tool }[] = [
  { id: "media", label: "Media", icon: Video, tool: "media" },
  { id: "audio", label: "Audio", icon: Music, tool: "audio" },
  { id: "text", label: "Text", icon: FileText, tool: "text" },
  { id: "transitions", label: "Transitions", icon: Sparkles, tool: "transitions" },
  { id: "filters", label: "Filters", icon: Palette, tool: "filters" },
  { id: "effects", label: "Effects", icon: Wand2, tool: "effects" },
  { id: "stickers", label: "Stickers", icon: Smile, tool: "stickers" },
  { id: "images", label: "Images", icon: Image, tool: "images" },
  { id: "screen-record", label: "Screen Record", icon: Monitor, tool: "screen-record" },
  { id: "camera-record", label: "Camera", icon: Camera, tool: "camera-record" },
  { id: "ai", label: "AI Tools", icon: Bot, tool: "ai" },
];

export default function Sidebar() {
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>({
    media: true,
  });
  const { activePanel, setActivePanel, activeTool, setActiveTool, sidebarCollapsed } =
    useEditorStore();

  const togglePanel = (id: string) => {
    setExpandedPanels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePanelClick = (panel: typeof panels[0]) => {
    setActivePanel(panel.id);
    setActiveTool(panel.tool);
  };

  if (sidebarCollapsed) {
    return (
      <aside className="flex h-full w-14 flex-col items-center border-r border-gray-800 bg-[#111827] py-2">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const isActive = activePanel === panel.id || activeTool === panel.tool;
          return (
            <button
              key={panel.id}
              onClick={() => handlePanelClick(panel)}
              className={`mb-1 flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              title={panel.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-800 bg-[#111827]">
      <div className="flex-1 overflow-y-auto p-2">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const isExpanded = expandedPanels[panel.id];
          const isActive = activePanel === panel.id || activeTool === panel.tool;
          return (
            <div key={panel.id} className="mb-1">
              <button
                onClick={() => {
                  togglePanel(panel.id);
                  handlePanelClick(panel);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-600/20 text-violet-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{panel.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {panel.id === "media" && (
                    <>
                      <MediaPanelContent />
                    </>
                  )}
                  {panel.id === "audio" && (
                    <div className="rounded-md border border-dashed border-gray-700 p-4 text-center text-sm text-gray-500">
                      <Music className="mx-auto mb-2 h-6 w-6" />
                      <p>Record or import audio</p>
                      <div className="mt-2 flex justify-center gap-2">
                        <button className="rounded bg-violet-600 px-3 py-1 text-xs text-white hover:bg-violet-700">
                          Record
                        </button>
                        <button className="rounded bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600">
                          Import
                        </button>
                      </div>
                    </div>
                  )}
                  {panel.id === "text" && (
                    <div className="space-y-2">
                      <button className="flex w-full items-center gap-2 rounded-md border border-dashed border-gray-700 p-3 text-sm text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Text
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-md border border-dashed border-gray-700 p-3 text-sm text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Title
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-md border border-dashed border-gray-700 p-3 text-sm text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Subtitle
                      </button>
                    </div>
                  )}
                  {(panel.id === "transitions" || panel.id === "filters" || panel.id === "effects" || panel.id === "stickers") && (
                    <div className="grid grid-cols-3 gap-2">
                      {["Fade", "Slide", "Zoom", "Wipe", "Blur", "Glow"].map((item) => (
                        <button
                          key={item}
                          className="rounded-md border border-gray-700 p-2 text-xs text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                  {panel.id === "images" && (
                    <div className="space-y-2">
                      <button className="flex w-full items-center gap-2 rounded-md border border-dashed border-gray-700 p-3 text-sm text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors">
                        <Plus className="h-4 w-4" />
                        Upload Image
                      </button>
                    </div>
                  )}
                  {(panel.id === "screen-record" || panel.id === "camera-record") && (
                    <div className="rounded-md border border-dashed border-gray-700 p-4 text-center text-sm text-gray-500">
                      <Monitor className="mx-auto mb-2 h-6 w-6" />
                      <p>Click to start recording</p>
                    </div>
                  )}
                  {panel.id === "ai" && (
                    <div className="space-y-2">
                      {["Auto Translate", "Remove Silence", "Scene Detection", "Generate Summary", "Suggest Titles", "Enhance Audio", "Remove Noise", "Text to Speech", "Generate Captions"].map((tool) => (
                        <button
                          key={tool}
                          className="flex w-full items-center gap-2 rounded-md border border-gray-700 p-2 text-xs text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors"
                        >
                          <Bot className="h-3 w-3" />
                          {tool}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function MediaPanelContent() {
  const { mediaLibrary, addMediaAsset, removeMediaAsset } = useEditorStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      addMediaAsset({
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: file.name,
        type: file.type.startsWith("video")
          ? "video"
          : file.type.startsWith("image")
          ? "image"
          : file.type.startsWith("audio")
          ? "audio"
          : "json",
        url,
        size: file.size,
        uploadedAt: new Date(),
      });
    });
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
          isDragOver
            ? "border-violet-500 bg-violet-500/10"
            : "border-gray-700 hover:border-gray-600"
        }`}
      >
        <Video className="mx-auto mb-2 h-6 w-6 text-gray-500" />
        <p className="text-xs text-gray-400">Drop files here or click to browse</p>
        <p className="mt-1 text-xs text-gray-500">
          Video, Image, Audio, GIF, SRT, VTT, JSON
        </p>
      </div>
      {mediaLibrary.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {mediaLibrary.map((asset) => (
            <div
              key={asset.id}
              className="group relative rounded-lg border border-gray-700 bg-gray-800 p-2"
            >
              {asset.thumbnailUrl && (
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.name}
                  className="h-16 w-full rounded object-cover"
                />
              )}
              <p className="mt-1 truncate text-xs text-gray-300">{asset.name}</p>
              <p className="text-xs text-gray-500">
                {(asset.size / 1024 / 1024).toFixed(1)} MB
              </p>
              <button
                onClick={() => removeMediaAsset(asset.id)}
                className="absolute right-1 top-1 rounded bg-red-600 p-1 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
