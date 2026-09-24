"use client";

import { useState } from "react";
import {
  Languages,
  Scissors,
  Camera,
  FileText,
  Sparkles,
  Volume2,
  Wand2,
  Mic,
  ImageIcon,
  ScissorsLineDashed,
  Clapperboard,
  User,
  Target,
  Captions,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

const aiTools = [
  { id: "auto-translate", label: "Auto Translate", icon: Languages, description: "Translate subtitles automatically" },
  { id: "remove-silence", label: "Remove Silence", icon: Scissors, description: "Remove silent parts from audio" },
  { id: "scene-detection", label: "Scene Detection", icon: Camera, description: "Detect scene changes automatically" },
  { id: "generate-summary", label: "Generate Summary", icon: FileText, description: "Create a summary of the video" },
  { id: "suggest-titles", label: "Suggest Titles", icon: Sparkles, description: "AI-powered title suggestions" },
  { id: "enhance-audio", label: "Enhance Audio", icon: Volume2, description: "Improve audio quality" },
  { id: "remove-noise", label: "Remove Noise", icon: Wand2, description: "Remove background noise" },
  { id: "text-to-speech", label: "Text to Speech", icon: Mic, description: "Convert text to speech" },
  { id: "change-background", label: "Change Background", icon: ImageIcon, description: "Replace video background" },
  { id: "suggest-cuts", label: "Suggest Cuts", icon: ScissorsLineDashed, description: "AI-powered editing suggestions" },
  { id: "generate-clips", label: "Generate Short Clips", icon: Clapperboard, description: "Create short clips from long video" },
  { id: "face-detection", label: "Face Detection", icon: User, description: "Detect faces in video" },
  { id: "object-tracking", label: "Object Tracking", icon: Target, description: "Track objects in video" },
  { id: "generate-captions", label: "Generate Captions", icon: Captions, description: "Auto-generate captions from audio" },
];

export default function AIToolsPanel() {
  const { ai, setAiStatus, setActivePanel } = useEditorStore();
  const [results, setResults] = useState<Record<string, string>>({});

  const handleToolClick = async (tool: typeof aiTools[0]) => {
    setAiStatus(tool.id, { loading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockResult = `AI processed: ${tool.label} completed successfully. This is a mock result ready for real API integration.`;
    setAiStatus(tool.id, { loading: false, result: mockResult });
    setResults((prev) => ({ ...prev, [tool.id]: mockResult }));
  };

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">AI Tools</h3>
        <button
          onClick={() => setActivePanel(null)}
          className="text-gray-400 hover:text-white"
        >
          <AlertCircle className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4 rounded-lg border border-violet-700 bg-violet-900/10 p-3">
        <p className="text-xs text-violet-300">
          All AI features use mock implementations. Replace the mock adapters with
          real API calls when integrating with AI services.
        </p>
      </div>

      <div className="space-y-2">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          const toolStatus = ai[tool.id];
          const isRunning = toolStatus?.loading;
          const result = results[tool.id] || toolStatus?.result;

          return (
            <div key={tool.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-violet-600/20 p-2">
                  <Icon className="h-4 w-4 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{tool.label}</h4>
                  <p className="text-xs text-gray-400">{tool.description}</p>
                  {isRunning && (
                    <div className="mt-2 flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-violet-400" />
                      <span className="text-xs text-violet-400">Processing...</span>
                    </div>
                  )}
                  {!isRunning && result && (
                    <div className="mt-2 flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-400" />
                      <p className="text-xs text-green-400">{result}</p>
                    </div>
                  )}
                  {toolStatus?.error && (
                    <div className="mt-2 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-red-400" />
                      <span className="text-xs text-red-400">{toolStatus.error}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleToolClick(tool)}
                  disabled={isRunning}
                  className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
                >
                  {isRunning ? "Running..." : "Run"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
