import { useEffect, useCallback, useRef } from "react";
import { useEditorStore } from "@/store/editor-store";

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts() {
  const {
    currentProject,
    isPlaying,
    activeTool,
    undo,
    redo,
    canUndo,
    canRedo,
    setPlaying,
    setPlayhead,
    removeClip,
    duplicateClip,
    splitClip,
    selectAllClips,
    clearSelection,
    setZoom,
    setActiveTool,
    saveSnapshot,
    selectClip,
  } = useEditorStore();

  const shortcutsRef = useRef<KeyboardShortcut[]>([]);

  const getShortcuts = useCallback((): KeyboardShortcut[] => {
    if (!currentProject) return [];

    const shortcuts: KeyboardShortcut[] = [
      {
        key: " ",
        action: () => {
          if (isPlaying) {
            setPlaying(false);
          } else {
            setPlaying(true);
          }
        },
        description: "Play / Pause",
        preventDefault: true,
      },
      {
        key: "z",
        ctrl: true,
        action: undo,
        description: "Undo",
        preventDefault: true,
      },
      {
        key: "z",
        ctrl: true,
        shift: true,
        action: redo,
        description: "Redo",
        preventDefault: true,
      },
      {
        key: "s",
        ctrl: true,
        action: () => {
          saveSnapshot("manual-save");
        },
        description: "Save project",
        preventDefault: true,
      },
      {
        key: "Delete",
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => removeClip(id));
        },
        description: "Delete selected clips",
        preventDefault: true,
      },
      {
        key: "Backspace",
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => removeClip(id));
        },
        description: "Delete selected clips",
        preventDefault: true,
      },
      {
        key: "c",
        ctrl: true,
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          navigator.clipboard.writeText(JSON.stringify(selectedClipIds));
        },
        description: "Copy selected clips",
        preventDefault: true,
      },
      {
        key: "v",
        ctrl: true,
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => duplicateClip(id));
        },
        description: "Paste / Duplicate selected clips",
        preventDefault: true,
      },
      {
        key: "x",
        ctrl: true,
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => removeClip(id));
        },
        description: "Cut selected clips",
        preventDefault: true,
      },
      {
        key: "a",
        ctrl: true,
        action: selectAllClips,
        description: "Select all clips",
        preventDefault: true,
      },
      {
        key: "d",
        ctrl: true,
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => duplicateClip(id));
        },
        description: "Duplicate selected clips",
        preventDefault: true,
      },
      {
        key: "=",
        ctrl: true,
        action: () => {
          const { zoom } = useEditorStore.getState();
          setZoom(zoom * 1.2);
        },
        description: "Zoom in",
        preventDefault: true,
      },
      {
        key: "+",
        ctrl: true,
        action: () => {
          const { zoom } = useEditorStore.getState();
          setZoom(zoom * 1.2);
        },
        description: "Zoom in",
        preventDefault: true,
      },
      {
        key: "-",
        ctrl: true,
        action: () => {
          const { zoom } = useEditorStore.getState();
          setZoom(zoom / 1.2);
        },
        description: "Zoom out",
        preventDefault: true,
      },
      {
        key: "b",
        action: () => setActiveTool("blade"),
        description: "Blade / Split tool",
        preventDefault: true,
      },
      {
        key: "v",
        action: () => setActiveTool("select"),
        description: "Select tool",
        preventDefault: false,
      },
      {
        key: "h",
        action: () => setActiveTool("hand"),
        description: "Hand tool",
        preventDefault: false,
      },
      {
        key: "t",
        action: () => setActiveTool("text"),
        description: "Text tool",
        preventDefault: false,
      },
      {
        key: "m",
        action: () => setActiveTool("marker"),
        description: "Add marker",
        preventDefault: true,
      },
      {
        key: "Home",
        action: () => setPlayhead(0),
        description: "Go to start",
        preventDefault: true,
      },
      {
        key: "End",
        action: () => {
          if (currentProject) {
            setPlayhead(currentProject.duration);
          }
        },
        description: "Go to end",
        preventDefault: true,
      },
      {
        key: "ArrowLeft",
        action: () => {
          const { playheadPosition } = useEditorStore.getState();
          setPlayhead(Math.max(0, playheadPosition - 1));
        },
        description: "Move playhead left",
        preventDefault: false,
      },
      {
        key: "ArrowRight",
        action: () => {
          const { playheadPosition } = useEditorStore.getState();
          if (currentProject) {
            setPlayhead(Math.min(currentProject.duration, playheadPosition + 1));
          }
        },
        description: "Move playhead right",
        preventDefault: false,
      },
      {
        key: "Escape",
        action: clearSelection,
        description: "Clear selection",
        preventDefault: true,
      },
      {
        key: "s",
        shift: true,
        action: () => {
          const { selectedClipIds } = useEditorStore.getState();
          selectedClipIds.forEach((id) => {
            const state = useEditorStore.getState();
            for (const track of state.currentProject?.tracks || []) {
              const clip = track.clips.find((c) => c.id === id);
              if (clip) {
                splitClip(id, clip.start + clip.duration / 2);
                break;
              }
            }
          });
        },
        description: "Split clip at playhead",
        preventDefault: true,
      },
    ];

    return shortcuts;
  }, [
    currentProject,
    isPlaying,
    activeTool,
    undo,
    redo,
    setPlaying,
    setPlayhead,
    removeClip,
    duplicateClip,
    splitClip,
    selectAllClips,
    clearSelection,
    setZoom,
    setActiveTool,
    saveSnapshot,
  ]);

  useEffect(() => {
    const shortcuts = getShortcuts();
    shortcutsRef.current = shortcuts;

    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcuts = shortcutsRef.current;

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (
          shortcut.key.toLowerCase() === event.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch
        ) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [getShortcuts]);

  return {
    shortcuts: shortcutsRef.current,
    getShortcuts,
  };
}

export default useKeyboardShortcuts;
