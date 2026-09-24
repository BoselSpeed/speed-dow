"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  Film,
  Image,
  Music,
  FileText,
  Search,
  Trash2,
  Plus,
  Play,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

export default function MediaPanel() {
  const { mediaLibrary, addMediaAsset, removeMediaAsset, addClip, tracks } =
    useEditorStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
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
    },
    [addMediaAsset]
  );

  const filteredLibrary = mediaLibrary.filter((asset) => {
    if (filter !== "all" && asset.type !== filter) return false;
    if (search && !asset.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const handleAddToTimeline = (asset: (typeof mediaLibrary)[0]) => {
    const videoTrack = tracks.find((t) => t.type === "video") || tracks[0];
    const audioTrack = tracks.find((t) => t.type === "audio") || tracks[1];
    const targetTrack = asset.type === "audio" ? audioTrack : videoTrack;

    addClip({
      id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: asset.type === "audio" ? "audio" : "video",
      name: asset.name,
      start: 0,
      duration: asset.duration || 5,
      trackId: targetTrack.id,
      sourceUrl: asset.url,
      thumbnailUrl: asset.thumbnailUrl,
      color: targetTrack.color,
    });
  };

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="mb-4">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-6 transition-colors hover:border-violet-500 hover:bg-violet-500/5"
        >
          <Upload className="mb-2 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-400">Drop media here</p>
          <p className="text-xs text-gray-500">or click to browse</p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full rounded-md border border-gray-700 bg-gray-800 pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white focus:border-violet-500 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filteredLibrary.map((asset) => (
          <div
            key={asset.id}
            className="group relative rounded-lg border border-gray-700 bg-gray-800 p-2 transition-colors hover:border-gray-600"
          >
            {asset.thumbnailUrl ? (
              <img
                src={asset.thumbnailUrl}
                alt={asset.name}
                className="h-24 w-full rounded object-cover"
              />
            ) : (
              <div className="flex h-24 w-full items-center justify-center rounded bg-gray-700">
                {asset.type === "video" && <Film className="h-8 w-8 text-gray-500" />}
                {asset.type === "image" && <Image className="h-8 w-8 text-gray-500" />}
                {asset.type === "audio" && <Music className="h-8 w-8 text-gray-500" />}
                {asset.type === "json" && <FileText className="h-8 w-8 text-gray-500" />}
              </div>
            )}
            <div className="mt-2">
              <p className="truncate text-xs text-gray-300">{asset.name}</p>
              <p className="text-xs text-gray-500">
                {(asset.size / 1024 / 1024).toFixed(1)} MB
              </p>
              {asset.duration && (
                <p className="text-xs text-gray-500">
                  {Math.floor(asset.duration / 60)}:{(asset.duration % 60).toFixed(0).padStart(2, "0")}
                </p>
              )}
            </div>
            <div className="mt-2 flex gap-1">
              <button
                onClick={() => handleAddToTimeline(asset)}
                className="flex flex-1 items-center justify-center gap-1 rounded bg-violet-600 px-2 py-1 text-xs text-white hover:bg-violet-700"
              >
                <Plus className="h-3 w-3" />
                Add
              </button>
              <button
                onClick={() => removeMediaAsset(asset.id)}
                className="rounded bg-red-600 p-1 text-white hover:bg-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        {filteredLibrary.length === 0 && (
          <div className="col-span-2 py-8 text-center text-sm text-gray-500">
            No media found
          </div>
        )}
      </div>
    </div>
  );
}
