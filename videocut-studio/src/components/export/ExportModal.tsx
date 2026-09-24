"use client";

import { useState } from "react";
import {
  Download,
  X,
  Film,
  Image,
  Music,
  FileVideo,
  FileImage,
  FileAudio,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useEditorStore } from "@/store/editor-store";

type FormatValue = "mp4" | "webm" | "gif" | "mp3" | "wav" | "png" | "jpg";

const formats: { value: FormatValue; label: string; icon: typeof FileVideo; extensions: string[] }[] = [
  { value: "mp4", label: "MP4 Video", icon: FileVideo, extensions: ["mp4"] },
  { value: "webm", label: "WebM Video", icon: FileVideo, extensions: ["webm"] },
  { value: "gif", label: "GIF Animation", icon: Image, extensions: ["gif"] },
  { value: "mp3", label: "MP3 Audio", icon: FileAudio, extensions: ["mp3"] },
  { value: "wav", label: "WAV Audio", icon: FileAudio, extensions: ["wav"] },
  { value: "png", label: "PNG Sequence", icon: FileImage, extensions: ["png"] },
  { value: "jpg", label: "JPG Sequence", icon: FileImage, extensions: ["jpg"] },
];

const resolutions = [
  { value: "3840x2160", label: "4K (3840x2160)" },
  { value: "1920x1080", label: "Full HD (1920x1080)" },
  { value: "1280x720", label: "HD (1280x720)" },
  { value: "854x480", label: "SD (854x480)" },
];

const frameRates = [24, 30, 60];
const qualityPresets = [
  { value: "low" as const, label: "Low", bitrate: "1 Mbps" },
  { value: "medium" as const, label: "Medium", bitrate: "5 Mbps" },
  { value: "high" as const, label: "High", bitrate: "20 Mbps" },
  { value: "ultra" as const, label: "Ultra", bitrate: "40 Mbps" },
];

export default function ExportModal() {
  const {
    exportSettings,
    exportStage,
    exportCurrentStage,
    exportProgress,
    exportEstimatedTime,
    exportError,
    isExporting,
    setExportSettings,
    setExportStage,
    setExportCurrentStage,
    setExportProgress,
    setExportEstimatedTime,
    setExportError,
    setIsExporting,
    export: exportAction,
    cancelExport,
  } = useEditorStore();

  const [showModal, setShowModal] = useState(false);
  const [customBitrate, setCustomBitrate] = useState("");

  const isExportActive = isExporting || exportStage === "preparing" || exportStage === "encoding" || exportStage === "finalizing";

  const handleExport = async () => {
    setExportStage("preparing");
    setExportCurrentStage("Preparing project...");
    setExportProgress({ progress: 0, currentFrame: 0, totalFrames: 0, estimatedTimeRemaining: 0, status: "preparing" });

    try {
      await exportAction(exportSettings);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : "Export failed");
      setIsExporting(false);
    }
  };

  const handleCancel = () => {
    cancelExport();
    setExportStage("");
    setExportCurrentStage("");
    setExportProgress({ progress: 0, currentFrame: 0, totalFrames: 0, estimatedTimeRemaining: 0, status: "idle" });
    setExportEstimatedTime(null);
    setExportError(null);
    setIsExporting(false);
  };

  const handleDownload = () => {
    const blob = new Blob(["mock video content"], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export.${exportSettings.format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
      >
        <Download className="h-4 w-4" />
        Export
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="h-[90vh] w-full max-w-2xl rounded-xl border border-gray-700 bg-[#111827] shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Export Video</h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={isExportActive}
                className="text-gray-400 hover:text-white disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isExportActive ? (
              <div className="flex h-full flex-col items-center justify-center p-8">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-violet-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {exportCurrentStage || "Exporting..."}
                </h3>
                <div className="mb-4 h-2 w-full max-w-md rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-violet-600 transition-all duration-300"
                    style={{ width: `${exportProgress.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  {Math.round(exportProgress.progress)}%
                </p>
                {exportEstimatedTime && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    ~{Math.ceil(exportEstimatedTime)}s remaining
                  </p>
                )}
                {exportProgress.status === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-700 bg-red-900/20 p-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm text-red-400">{exportError || "Export failed"}</p>
                  </div>
                )}
                <button
                  onClick={handleCancel}
                  className="mt-6 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : exportStage === "completed" ? (
              <div className="flex h-full flex-col items-center justify-center p-8">
                <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">Export Complete!</h3>
                <p className="mb-6 text-sm text-gray-400">Your video is ready to download.</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {formats.map((format) => {
                      const Icon = format.icon;
                      return (
                        <button
                          key={format.value}
                          onClick={() =>
                            setExportSettings({ format: format.value })
                          }
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-colors ${
                            exportSettings.format === format.value
                              ? "border-violet-500 bg-violet-500/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <Icon className="h-6 w-6 text-gray-400" />
                          <span className="text-xs text-gray-300">
                            {format.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Resolution
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {resolutions.map((res) => (
                      <button
                        key={res.value}
                        onClick={() =>
                          setExportSettings({ resolution: res.value as any })
                        }
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          exportSettings.resolution === res.value
                            ? "border-violet-500 bg-violet-500/10 text-violet-400"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Frame Rate
                  </label>
                  <div className="flex gap-2">
                    {frameRates.map((fps) => (
                      <button
                        key={fps}
                        onClick={() =>
                          setExportSettings({ fps: fps as any })
                        }
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          exportSettings.fps === fps
                            ? "border-violet-500 bg-violet-500/10 text-violet-400"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {fps} FPS
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Quality
                  </label>
                  <div className="flex gap-2">
                    {qualityPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() =>
                          setExportSettings({ quality: preset.value })
                        }
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          exportSettings.quality === preset.value
                            ? "border-violet-500 bg-violet-500/10 text-violet-400"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {preset.label}
                        <span className="block text-xs text-gray-500">
                          {preset.bitrate}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {["16:9", "9:16", "1:1", "4:5", "4:3"].map((ar) => (
                      <button
                        key={ar}
                        onClick={() =>
                          setExportSettings({
                            aspectRatio: ar as any,
                          })
                        }
                        className={`rounded-lg border px-2 py-1.5 text-xs transition-colors ${
                          exportSettings.aspectRatio === ar
                            ? "border-violet-500 bg-violet-500/10 text-violet-400"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exportSettings.audioOnly}
                      onChange={(e) =>
                        setExportSettings({ audioOnly: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800 accent-violet-600"
                    />
                    <span className="text-sm text-gray-300">Audio only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exportSettings.includeSubtitles}
                      onChange={(e) =>
                        setExportSettings({
                          includeSubtitles: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800 accent-violet-600"
                    />
                    <span className="text-sm text-gray-300">Include subtitles</span>
                  </label>
                </div>

                <div className="rounded-lg border border-yellow-700 bg-yellow-900/20 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                    <p className="text-xs text-yellow-400">
                      Large exports may require significant memory and processing
                      time.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
                  >
                    <Film className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
