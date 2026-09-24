"use client";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import PreviewPlayer from "@/components/preview/PreviewPlayer";
import Timeline from "@/components/timeline/Timeline";

export default function EditorLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0B0F19]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            <PreviewPlayer />
          </div>
          <Timeline />
        </main>
      </div>
    </div>
  );
}
