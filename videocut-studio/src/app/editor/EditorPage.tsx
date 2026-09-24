"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useEditorStore } from "@/store/editor-store";
import { getRecentProjects, deleteProject } from "@/lib/db";
import type { Project, Clip } from "@/types";

export function EditorPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activePanel, setActivePanel] = useState<"browser" | "properties" | "effects">("browser");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentProject = useEditorStore((s) => s.currentProject);
  const tracks = currentProject?.tracks || [];
  const activeTool = useEditorStore((s) => s.activeTool);
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const playheadPosition = useEditorStore((s) => s.playheadPosition);
  const zoom = useEditorStore((s) => s.zoom);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const showGrid = useEditorStore((s) => s.showGrid);
  const exportProgress = useEditorStore((s) => s.exportProgress);
  const isExporting = useEditorStore((s) => s.isExporting);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    format: "mp4",
    codec: "h264",
    resolution: "1080p",
    fps: 30,
    quality: "high",
    includeAudio: true,
  });
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<"idle" | "preparing" | "encoding" | "finalizing" | "completed" | "error" | "cancelled">("idle");

  const loadRecentProjects = useCallback(async () => {
    try {
      const projects = await getRecentProjects(10);
      setRecentProjects(projects);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadRecentProjects();
  }, [loadRecentProjects]);

  const handleImportFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        const asset = {
          id: crypto.randomUUID(),
          name: file.name,
          file,
          url,
          type: (file.type.startsWith("video") ? "video" : file.type.startsWith("audio") ? "audio" : file.type.startsWith("image") ? "image" : file.type.startsWith("text") || file.name.endsWith(".srt") || file.name.endsWith(".ass") ? "subtitle" : "video") as "video" | "audio" | "image" | "subtitle",
          mimeType: file.type,
          duration: 0,
          size: file.size,
          createdAt: new Date(),
        };
        useEditorStore.getState().addAsset(asset);
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [],
  );

  const handleNewProject = useCallback(async () => {
    if (!newProjectName.trim()) return;
    const { newProject, loadProject } = useEditorStore.getState();
    const project = newProject();
    project.name = newProjectName.trim() || "مشروع جديد";
    project.id = crypto.randomUUID();
    loadProject(project);
    setShowNewProjectModal(false);
    setNewProjectName("");
    await loadRecentProjects();
  }, [newProjectName, loadRecentProjects]);

  const handleDeleteProject = useCallback(
    async (project: Project) => {
      await deleteProject(project.id);
      await loadRecentProjects();
    },
    [loadRecentProjects],
  );

  const handleDuplicateProject = useCallback(
    (project: Project) => {
      const { currentProject, loadProject } = useEditorStore.getState();
      if (currentProject) {
        loadProject({
          ...currentProject,
          id: crypto.randomUUID(),
          name: `${project.name} - نسخة`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    },
    [],
  );

  const handleCloseExport = useCallback(() => {
    setIsExportOpen(false);
    setExportError(null);
    setExportStatus("idle");
    useEditorStore.getState().setExportProgress({ progress: 0, currentFrame: 0, totalFrames: 0, estimatedTimeRemaining: 0, status: "idle" });
  }, []);

  const handleStartExport = useCallback(async () => {
    setExportStatus("preparing");
    setExportError(null);
    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");
      const ffmpeg = new FFmpeg();
      ffmpeg.on("progress", ({ progress }) => {
        useEditorStore.getState().setExportProgress({
          progress: Math.round(progress * 100),
          currentFrame: 0,
          totalFrames: 0,
          estimatedTimeRemaining: 0,
          status: "encoding",
        });
      });
      await ffmpeg.load({
        coreURL: await toBlobURL("https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js", "text/javascript"),
        wasmURL: await toBlobURL("https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm", "application/wasm"),
      });
      setExportStatus("finalizing");
      const { currentProject } = useEditorStore.getState();
      if (!currentProject) {
        setExportStatus("error");
        setExportError("لا يوجد مشروع مفتوح");
        return;
      }
      const projectJson = JSON.stringify(currentProject);
      const jsonBlob = new Blob([projectJson], { type: "application/json" });
      await ffmpeg.writeFile("project.json", await fetchFile(jsonBlob));
      await ffmpeg.exec(["-i", "project.json", "-c:v", "libx264", "-preset", "fast", "-c:a", "aac", "output.mp4"]);
      const data = await ffmpeg.readFile("output.mp4");
      const uint8Array = data instanceof Uint8Array ? data : new Uint8Array(new Uint8Array(data as unknown as ArrayBuffer).buffer);
      const blob = new Blob([uint8Array as unknown as BlobPart], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentProject.name || "videocut-export"}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportStatus("completed");
      useEditorStore.getState().setIsExporting(false);
      useEditorStore.getState().setExportProgress({ progress: 0, currentFrame: 0, totalFrames: 0, estimatedTimeRemaining: 0, status: "idle" });
    } catch {
      setExportStatus("error");
      setExportError("فشل التصدير");
    }
  }, []);

  const handleCloseNewProjectModal = useCallback(() => {
    setShowNewProjectModal(false);
    setNewProjectName("");
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0F19] text-white">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-12 bg-[#0E131F] border-l border-[#1E2437] flex flex-col items-center py-2 gap-1 shrink-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-[#1E2437] rounded-lg transition-colors"
            title="استيراد وسائط"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14m-7-7h14" />
            </svg>
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleImportFiles} accept="video/*,audio/*,image/*,.srt,.ass,.vtt" />
          <div className="flex-1" />
          <button
            onClick={() => {
              setShowNewProjectModal(true);
            }}
            className="p-2 hover:bg-[#1E2437] rounded-lg transition-colors"
            title="مشروع جديد"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14m-7-7h14" />
            </svg>
          </button>
          <button
            onClick={() => setIsExportOpen(true)}
            className="p-2 hover:bg-[#1E2437] rounded-lg transition-colors"
            title="تصدير"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {currentProject ? (
            <>
              <div className="flex-1 flex items-center justify-center bg-black relative">
                <div className="text-center text-zinc-500">
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <path d="M2 7h20" />
                    <path d="M7 12h3M7 16h6" />
                  </svg>
                  <p className="text-xs">معاينة الفيديو</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => useEditorStore.getState().togglePlayPause()}
                      className="p-2 bg-[#0E131F] hover:bg-[#1E2437] rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <span className="text-xs text-zinc-400">00:00:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">
                      {currentProject.width}x{currentProject.height}
                    </span>
                    <span className="text-xs text-zinc-400">{currentProject.fps}fps</span>
                  </div>
                </div>
              </div>

              <div className="h-48 bg-[#0E131F] border-t border-[#1E2437] flex flex-col shrink-0">
                <div className="flex items-center justify-between px-3 h-8 border-b border-[#1E2437]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400">ZOOM</span>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => useEditorStore.getState().setZoom(Number(e.target.value))}
                      className="w-20 h-1 accent-[#7C3AED]"
                    />
                    <span className="text-[10px] text-zinc-400">{Math.round(zoom * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400">
                      {new Date(playheadPosition * 1000).toISOString().slice(14, 19)}
                    </span>
                    <span className="text-[10px] text-zinc-400">/</span>
                    <span className="text-[10px] text-zinc-400">
                      {new Date((currentProject?.duration || 60) * 1000).toISOString().slice(14, 19)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400">المسارات: {tracks.length}</span>
                    <span className="text-[10px] text-zinc-400">الأصول: {currentProject.assets?.length || 0}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-auto relative">
                  <div className="h-full flex flex-col">
                    <div className="flex">
                      <div className="w-40 bg-[#0E131F] border-b border-[#1E2437] p-1 shrink-0">
                        <span className="text-[10px] text-zinc-400">التايم لاين</span>
                      </div>
                      <div className="flex-1 overflow-auto relative">
                        <div className="h-8 border-b border-[#1E2437] flex items-center relative" style={{ width: `${(currentProject.duration || 60) * 50}px` }}>
                          {showGrid &&
                            Array.from({ length: Math.round(currentProject.duration || 60) + 1 }).map((_, i) => (
                              <div key={i} className="absolute top-0 bottom-0 w-px bg-[#1E2437] opacity-40" style={{ left: `${i * 50}px` }}>
                                <span className="text-[8px] text-zinc-500 ml-0.5">{i}s</span>
                              </div>
                            ))}
                          <div
                            className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                            style={{ left: `${playheadPosition * 50}px` }}
                          >
                            <div className="w-2 h-2 bg-red-500 rounded-full -ml-px" />
                          </div>
                        </div>
                        <div className="relative" style={{ width: `${(currentProject.duration || 60) * 50}px` }}>
                          {tracks.map((track) => (
                            <div
                              key={track.id}
                              className="h-12 border-b border-[#1E2437] relative"
                              onDoubleClick={() => {
                                const clip = {
                                  id: crypto.randomUUID(),
                                  trackId: track.id,
                                  name: "Clip",
                                  start: playheadPosition,
                                  duration: 5,
                                  inPoint: 0,
                                  outPoint: 5,
                                  effects: [],
                                  transitions: [],
                                  keyframes: [],
                                  muted: false,
                                  locked: false,
                                  opacity: 1,
                                  volume: 1,
                                  type: track.type,
                                  assetId: currentProject.assets?.[0]?.id || crypto.randomUUID(),
                                } as Clip;
                                useEditorStore.getState().addClip({ ...clip, id: track.id });
                              }}
                            >
                              {track.clips.map((clip) => (
                                <div
                                  key={clip.id}
                                  className="absolute top-1 bottom-1 rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center px-2 cursor-pointer hover:bg-[#7C3AED]/30 transition-colors"
                                  style={{ left: `${clip.start * 50}px`, width: `${clip.duration * 50}px` }}
                                >
                                  <span className="text-[10px] truncate">{clip.name}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M2 7h20" />
                  <path d="M7 12h3M7 16h6" />
                </svg>
                <p className="text-sm mb-4">لا يوجد مشروع مفتوح</p>
                <button
                  onClick={() => {
                    const project = useEditorStore.getState().newProject();
                    useEditorStore.getState().loadProject(project);
                  }}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm transition-colors"
                >
                  إنشاء مشروع جديد
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-60 bg-[#0E131F] border-l border-[#1E2437] flex flex-col shrink-0">
          <div className="flex border-b border-[#1E2437]">
            <button
              onClick={() => setActivePanel("browser")}
              className={`flex-1 py-2 text-[10px] transition-colors ${activePanel === "browser" ? "text-white border-b-2 border-[#7C3AED]" : "text-zinc-400 hover:text-zinc-300"}`}
            >
              الوسائط
            </button>
            <button
              onClick={() => setActivePanel("properties")}
              className={`flex-1 py-2 text-[10px] transition-colors ${activePanel === "properties" ? "text-white border-b-2 border-[#7C3AED]" : "text-zinc-400 hover:text-zinc-300"}`}
            >
              الخصائص
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {activePanel === "browser" && (
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="بحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1E2437] border border-[#1E2437] rounded px-2 py-1.5 text-[10px] text-white placeholder-zinc-500 focus:border-[#7C3AED] outline-none"
                  />
                </div>
                {currentProject?.assets?.length === 0 ? (
                  <div className="text-center py-4">
                    <svg className="w-8 h-8 mx-auto mb-2 text-zinc-600 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="2" y="2" width="20" height="20" rx="2" />
                      <path d="M2 7h20" />
                    </svg>
                    <p className="text-[10px] text-zinc-500">لا توجد وسائط</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {currentProject?.assets?.map((asset) => (
                      <div key={asset.id} className="flex items-center gap-2 p-1.5 bg-[#1E2437] rounded hover:bg-[#1E2437]/70 cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-[#0B0F19] rounded flex items-center justify-center shrink-0">
                          {asset.type === "video" && <svg className="w-3 h-3 text-[#7C3AED]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
                          {asset.type === "audio" && <svg className="w-3 h-3 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l6-2v13" /></svg>}
                          {asset.type === "image" && <svg className="w-3 h-3 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15l4-4 4 4 6-6 4 4" /></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] truncate">{asset.name}</p>
                          <p className="text-[9px] text-zinc-500">{asset.mimeType}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activePanel === "properties" && (
              <div>
                {currentProject ? (
                  <div className="space-y-2">
                    <div>
                      <span className="text-[9px] text-zinc-500">الاسم</span>
                      <p className="text-[10px] truncate">{currentProject.name}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500">المدة</span>
                      <p className="text-[10px]">{currentProject.duration.toFixed(1)}s</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500">الحجم</span>
                      <p className="text-[10px]">{currentProject.width}x{currentProject.height}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500">FPS</span>
                      <p className="text-[10px]">{currentProject.fps}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-zinc-500 text-center py-4">لا يوجد مشروع مفتوح</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0E131F] border border-[#1E2437] rounded-lg p-4 min-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">مشروع جديد</span>
              <button onClick={handleCloseNewProjectModal} className="text-zinc-400 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="اسم المشروع..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewProject()}
              className="w-full bg-[#1E2437] border border-[#1E2437] rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-[#7C3AED] outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleNewProject} className="flex-1 px-3 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] rounded text-sm transition-colors">إنشاء</button>
              <button onClick={handleCloseNewProjectModal} className="px-3 py-2 bg-[#1E2437] hover:bg-[#1E2437]/70 rounded text-sm transition-colors">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0E131F] border border-[#1E2437] rounded-lg p-4 min-w-[360px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">تصدير الفيديو</span>
              <button onClick={handleCloseExport} className="text-zinc-400 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {exportStatus === "completed" ? (
              <div className="text-center py-4">
                <svg className="w-8 h-8 mx-auto mb-2 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                <p className="text-sm text-green-400 mb-2">تم التصدير بنجاح</p>
                <button onClick={handleCloseExport} className="px-4 py-2 bg-[#7C3AED] rounded text-sm">إغلاق</button>
              </div>
            ) : exportStatus === "error" ? (
              <div className="text-center py-4">
                <p className="text-sm text-red-400 mb-2">{exportError || "فشل التصدير"}</p>
                <button onClick={handleCloseExport} className="px-4 py-2 bg-[#7C3AED] rounded text-sm">إغلاق</button>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-[9px] text-zinc-500">الصيغة</span>
                    <select
                      value={exportSettings.format}
                      onChange={(e) => setExportSettings((s) => ({ ...s, format: e.target.value as "mp4" | "webm" | "gif" | "mp3" | "wav" }))}
                      className="w-full bg-[#1E2437] border border-[#1E2437] rounded px-2 py-1.5 text-xs text-white focus:border-[#7C3AED] outline-none"
                    >
                      <option value="mp4">MP4</option>
                      <option value="webm">WebM</option>
                      <option value="gif">GIF</option>
                      <option value="mp3">MP3</option>
                      <option value="wav">WAV</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500">الدقة</span>
                    <select
                      value={exportSettings.resolution}
                      onChange={(e) => setExportSettings((s) => ({ ...s, resolution: e.target.value as "360p" | "480p" | "720p" | "1080p" | "4k" }))}
                      className="w-full bg-[#1E2437] border border-[#1E2437] rounded px-2 py-1.5 text-xs text-white focus:border-[#7C3AED] outline-none"
                    >
                      <option value="360p">360p</option>
                      <option value="480p">480p</option>
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="4k">4K</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500">الجودة</span>
                    <select
                      value={exportSettings.quality}
                      onChange={(e) => setExportSettings((s) => ({ ...s, quality: e.target.value as "low" | "medium" | "high" | "ultra" }))}
                      className="w-full bg-[#1E2437] border border-[#1E2437] rounded px-2 py-1.5 text-xs text-white focus:border-[#7C3AED] outline-none"
                    >
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                      <option value="ultra">عالية جداً</option>
                    </select>
                  </div>
                </div>
                {exportStatus === "encoding" && (
                  <div className="mb-4">
                    <div className="h-2 bg-[#1E2437] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7C3AED] transition-all duration-300" style={{ width: `${exportProgress?.progress || 0}%` }} />
                    </div>
                    <p className="text-[10px] text-zinc-400 text-center mt-1">{exportProgress?.progress || 0}%</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleStartExport}
                    disabled={exportStatus !== "idle"}
                    className="flex-1 px-3 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] rounded text-sm disabled:opacity-30 transition-colors"
                  >
                    {exportStatus === "preparing" ? "جارِ التحضير..." : exportStatus === "encoding" ? "جارِ التصدير..." : exportStatus === "finalizing" ? "جارِ الإنهاء..." : "تصدير"}
                  </button>
                  <button onClick={handleCloseExport} className="px-3 py-2 bg-[#1E2437] hover:bg-[#1E2437]/70 rounded text-sm">إلغاء</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
