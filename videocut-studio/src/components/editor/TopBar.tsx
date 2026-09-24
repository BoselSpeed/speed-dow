"use client";

import {
  Play,
  Square,
  Save,
  FolderOpen,
  Download,
  Undo2,
  Redo2,
  Sun,
  Moon,
  Settings2,
  Type,
  LassoSelect,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

export default function TopBar() {
  const {
    project,
    theme,
    direction,
    activeTool,
    toggleTheme,
    toggleDirection,
    setActiveTool,
    setProjectName,
    setSaved,
    setModified,
  } = useEditorStore();

  const handleNewProject = () => {
    if (project.modified && !confirm("Discard unsaved changes?")) return;
    setProjectName("Untitled Project");
    setSaved(false);
    setModified(false);
  };

  const handleSave = () => {
    setSaved(true);
    setModified(false);
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-[#0B0F19] px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-700">
            <LassoSelect className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">VideoCut Studio</span>
        </div>
        <div className="hidden md:flex items-center gap-1 border-l border-gray-700 pl-4">
          <button
            onClick={handleNewProject}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FolderOpen className="h-4 w-4" />
            New
          </button>
          <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <FolderOpen className="h-4 w-4" />
            Open
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1 border-r border-gray-700 pr-2">
          <button
            onClick={() => useEditorStore.getState().undo()}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => useEditorStore.getState().redo()}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 border-r border-gray-700 pr-2">
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProjectName(e.target.value)}
            className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-white focus:border-violet-500 focus:outline-none"
          />
          {project.modified && (
            <span className="text-xs text-yellow-400">Unsaved</span>
          )}
          {project.saved && (
            <span className="text-xs text-green-400">Saved</span>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1 border-r border-gray-700 pr-2">
          <button
            onClick={() => setActiveTool("select")}
            className={`rounded-md p-2 transition-colors ${activeTool === "select" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            title="Select"
          >
            <LassoSelect className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveTool("text")}
            className={`rounded-md p-2 transition-colors ${activeTool === "text" ? "bg-violet-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            title="Text"
          >
            <Type className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleDirection}
            className="rounded-md px-2 py-1 text-xs font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title="Toggle text direction"
          >
            {direction.toUpperCase()}
          </button>
          <button
            className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
