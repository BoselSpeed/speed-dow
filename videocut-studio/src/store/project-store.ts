import { create } from "zustand";
import { get as idbGet, set as idbSet, del, keys } from "idb-keyval";
import type { Project } from "@/types";

interface ProjectStoreState {
  projects: Project[];
  currentProjectId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface ProjectStoreActions {
  loadProjects: () => Promise<void>;
  setCurrentProject: (id: string | null) => void;
  getCurrentProject: () => Project | null;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  exportProjectJSON: (project: Project) => Promise<void>;
  importProjectJSON: (file: File) => Promise<Project>;
  refreshProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStoreState & ProjectStoreActions>(
  (set, get) => ({
    projects: [],
    currentProjectId: null,
    isLoading: false,
    error: null,

    loadProjects: async () => {
      set({ isLoading: true, error: null });
      try {
        const allKeys = await keys();
        const projects: Project[] = [];

        for (const key of allKeys) {
          if (typeof key === "string" && key.startsWith("project-")) {
            const project = await idbGet(key);
            if (project) {
              projects.push(project as Project);
            }
          }
        }

        projects.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        set({ projects, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    setCurrentProject: (id) => {
      set({ currentProjectId: id });
    },

    getCurrentProject: () => {
      const { projects, currentProjectId } = get();
      return projects.find((p) => p.id === currentProjectId) || null;
    },

    saveProject: async (project) => {
      set({ isLoading: true, error: null });
      try {
        const projectToSave = {
          ...project,
          updatedAt: new Date(),
        };

        await idbSet(`project-${project.id}`, projectToSave);

        const { projects } = get();
        const existingIndex = projects.findIndex((p) => p.id === project.id);

        let updatedProjects: Project[];
        if (existingIndex >= 0) {
          updatedProjects = [...projects];
          updatedProjects[existingIndex] = projectToSave;
        } else {
          updatedProjects = [projectToSave, ...projects];
        }

        updatedProjects.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        set({
          projects: updatedProjects,
          currentProjectId: project.id,
          isLoading: false,
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    deleteProject: async (id) => {
      set({ isLoading: true, error: null });
      try {
        await del(`project-${id}`);

        const { projects, currentProjectId } = get();
        const updatedProjects = projects.filter((p) => p.id !== id);

        set({
          projects: updatedProjects,
          currentProjectId:
            currentProjectId === id ? null : currentProjectId,
          isLoading: false,
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    exportProjectJSON: async (project) => {
      try {
        const json = JSON.stringify(project, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${project.name.replace(/[^a-z0-9]/gi, "_")}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
      } catch (error) {
        set({ error: (error as Error).message });
      }
    },

    importProjectJSON: async (file) => {
      set({ isLoading: true, error: null });
      try {
        const text = await file.text();
        const project = JSON.parse(text) as Project;

        if (!project.id || !project.name) {
          throw new Error("Invalid project file: missing id or name");
        }

        const projectToSave = {
          ...project,
          id: crypto.randomUUID(),
          name: `${project.name} (Imported)`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await idbSet(`project-${projectToSave.id}`, projectToSave);

        const { projects } = get();
        const updatedProjects = [
          projectToSave,
          ...projects,
        ];

        updatedProjects.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        set({
          projects: updatedProjects,
          currentProjectId: projectToSave.id,
          isLoading: false,
        });

        return projectToSave;
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    refreshProjects: async () => {
      await get().loadProjects();
    },
  })
);
