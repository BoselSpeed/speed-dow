"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEditorStore } from "@/store/editor-store";
import { getRecentProjects } from "@/lib/db";
import type { Project } from "@/types";

const Editor = dynamic(() => import("@/app/editor/EditorPage").then((mod) => mod.EditorPage), { ssr: false });

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const { newProject, loadProject, setLoading, setError: setStoreError } = useEditorStore();

  const loadProjectData = useCallback(
    async (id: string) => {
      if (id === "new") {
        const emptyProject = newProject();
        setLoading(false);
        setIsLoading(false);
        return;
      }
      setLoading(true);
      setStoreError(null);
      try {
        const projects = await getRecentProjects();
        const project = projects.find((p) => p.id === id);
        if (project) {
          loadProject(project);
        } else {
          newProject();
        }
        setLoading(false);
        setIsLoading(false);
      } catch {
        setLoading(false);
        setIsLoading(false);
        setStoreError("فشل تحميل المشروع");
      }
    },
    [loadProject, newProject, setStoreError, setLoading],
  );

  useEffect(() => {
    setIsMounted(true);
    loadProjectData(params.id);
    return () => {
      setLoading(false);
      setIsLoading(false);
    };
  }, [params.id, loadProjectData, setLoading]);

  useEffect(() => {
    if (!isMounted) return;
    const handleFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
      if (e.key === "?" && e.shiftKey) {
        setShowShortcuts((s) => !s);
      }
      if (e.key === "e" && e.ctrlKey) {
        setShowExport((s) => !s);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMounted]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const handleNewProject = useCallback(() => {
    newProject();
    router.push("/editor/new");
  }, [newProject, router]);

  const handleExport = useCallback(() => {
    setShowExport(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0F19] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-400">جارِ تحميل المحرر...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0B0F19] text-white overflow-hidden">
      <header className="flex items-center justify-between px-4 h-12 bg-[#0E131F] border-b border-[#1E2437] shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="p-1.5 hover:bg-[#1E2437] rounded transition-colors"
            title="العودة للرئيسية"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10h10a4 4 0 014 4v2" />
              <path d="M7 14l-4-4 4-4" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.447.894L15 14m-6 2h.01M15 14v-.01M15 14h.01M8 6.5l-4.553 2.276A1 1 0 003 8.618v6.764a1 1 0 00.447.894L8 18.5m-6-12l4.553 2.276A1 1 0 008 8.618V4H3z" />
            </svg>
            <span className="font-bold text-sm">VideoCut Studio</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewProject}
            className="p-1.5 hover:bg-[#1E2437] rounded transition-colors"
            title="مشروع جديد (Ctrl+N)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14m-7-7h14" />
            </svg>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-[#1E2437] rounded transition-colors"
            title="وضع ملء الشاشة (F11)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
            </svg>
          </button>
          <button
            onClick={() => setShowShortcuts((s) => !s)}
            className="p-1.5 hover:bg-[#1E2437] rounded transition-colors"
            title="اختصارات لوحة المفاتيح"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2h8v8M2 12h8M20 12h-8M12 20v-8" />
            </svg>
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded text-xs font-medium transition-colors"
            title="تصدير (Ctrl+E)"
          >
            تصدير
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden relative">
        {error && (
          <div className="absolute top-2 right-2 z-30 bg-red-900/50 border border-red-700 rounded-lg px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}
        {showShortcuts && (
          <div className="absolute top-2 left-2 z-30 bg-[#0E131F] border border-[#1E2437] rounded-lg p-3 text-xs min-w-[240px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">اختصارات لوحة المفاتيح</span>
              <button onClick={() => setShowShortcuts(false)} className="text-zinc-400 hover:text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between"><span>تراجع</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">Ctrl+Z</kbd></div>
              <div className="flex justify-between"><span>إعادة</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">Ctrl+Shift+Z</kbd></div>
              <div className="flex justify-between"><span>حفظ</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">Ctrl+S</kbd></div>
              <div className="flex justify-between"><span>حذف</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">Delete</kbd></div>
              <div className="flex justify-between"><span>تشغيل</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">Space</kbd></div>
              <div className="flex justify-between"><span>ملء الشاشة</span><kbd className="px-1.5 py-0.5 bg-[#1E2437] rounded text-[10px]">F11</kbd></div>
            </div>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
}
