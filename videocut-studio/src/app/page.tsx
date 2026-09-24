"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getRecentProjects, saveSettings } from "@/lib/db";
import type { Project } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isRTL, setIsRTL] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  const loadRecentProjects = useCallback(async () => {
    try {
      const projects = await getRecentProjects(8);
      setRecentProjects(projects);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadRecentProjects();
  }, [loadRecentProjects]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, isRTL, isMounted]);

  const handleNewProject = useCallback(async () => {
    await saveSettings({ recentProjectIds: recentProjects.map((p) => p.id) });
    router.push("/editor/new");
  }, [recentProjects, router]);

  const handleContinueProject = useCallback(
    (projectId: string) => {
      router.push(`/editor/${projectId}`);
    },
    [router],
  );

  const toggleDemoMode = useCallback(() => {
    setIsDemoMode((prev) => !prev);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white">
      <nav className="flex items-center justify-between px-6 h-14 shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.447.894L15 14m-6 2h.01M15 14v-.01M15 14h.01M8 6.5l-4.553 2.276A1 1 0 003 8.618v6.764a1 1 0 00.447.894L8 18.5m-6-12l4.553 2.276A1 1 0 008 8.618V4H3z" />
          </svg>
          <span className="font-bold text-lg">VideoCut Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDemoMode}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${isDemoMode ? "bg-[#7C3AED] text-white" : "bg-[#1E2437] text-zinc-400 hover:text-white"}`}
          >
            {isDemoMode ? "وضع العرض" : "إيقاف العرض"}
          </button>
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="p-2 hover:bg-[#1E2437] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82.33 1.65 1.65 0 00-.6 1.63H15m5.59 2.41a2 2 0 01-2.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82 1.65 1.65 0 00-1.63.6 1.65 1.65 0 00-.6 1.63 1.65 1.65 0 00-1.82.33 2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-.6-1.63 1.65 1.65 0 00-1.63-.6 1.65 1.65 0 00-1.82-.33 2 2 0 012.83-2.83l.06.06a1.65 1.65 0 00.33 1.82 1.65 1.65 0 00.6 1.63 1.65 1.65 0 001.63.6 1.65 1.65 0 001.82-.33 2 2 0 012.83-2.83l-.06-.06a1.65 1.65 0 00-.33-1.82z" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.447.894L15 14m-6 2h.01M15 14v-.01M15 14h.01M8 6.5l-4.553 2.276A1 1 0 003 8.618v6.764a1 1 0 00.447.894L8 18.5m-6-12l4.553 2.276A1 1 0 008 8.618V4H3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              VideoCut Studio
            </h1>
            <p className="text-zinc-400 text-sm">محرر فيديو احترافي يعمل داخل المتصفح</p>
            <p className="text-zinc-500 text-xs mt-1">Browser-based Video Editor</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleNewProject}
              className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14" />
              </svg>
              مشروع جديد
            </button>

            {recentProjects.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400">استمرار التحرير</span>
                </div>
                <div className="space-y-2">
                  {recentProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleContinueProject(project.id)}
                      className="w-full py-2.5 bg-[#0E131F] hover:bg-[#1E2437] rounded-lg text-xs transition-colors flex items-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <path d="M2 7h20" />
                      </svg>
                      <span className="flex-1 text-right">{project.name}</span>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(project.updatedAt).toLocaleDateString("ar-SA")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-zinc-600">
              جميع العمليات تتم محلياً - لا يتم رفع أي ملفات إلى خوادم
            </p>
            <p className="text-[10px] text-zinc-700 mt-1">
              متطلب: Chrome 94+ | 4GB RAM | WebCodecs support
            </p>
          </div>
        </div>
      </main>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0E131F] border border-[#1E2437] rounded-lg p-4 min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">الإعدادات</span>
              <button onClick={() => setShowSettings(false)} className="text-zinc-400 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs">الوضع الداكن</span>
                <button onClick={() => { setIsDark((d) => !d); saveSettings({ theme: isDark ? "light" : "dark" }); }} className={`w-10 h-5 rounded-full transition-colors ${isDark ? "bg-[#7C3AED]" : "bg-[#1E2437]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">من اليمين لليسار (RTL)</span>
                <button onClick={() => { setIsRTL((r) => !r); saveSettings({ direction: isRTL ? "ltr" : "rtl" }); }} className={`w-10 h-5 rounded-full transition-colors ${isRTL ? "bg-[#7C3AED]" : "bg-[#1E2437]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${isRTL ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
