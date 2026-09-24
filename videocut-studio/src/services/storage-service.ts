import { get, set, del, keys, createStore } from "idb-keyval";
import type { Project } from "@/types";

const STORE_NAME = "videocut-studio-db";

export class StorageService {
  private static instance: StorageService;
  private initialized = false;

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async initDB(): Promise<void> {
    if (this.initialized) return;

    try {
      await keys();
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
      throw error;
    }
  }

  async saveProject(project: Project): Promise<void> {
    try {
      const projectToSave = {
        ...project,
        updatedAt: new Date().toISOString(),
      };

      await set(`project-${project.id}`, projectToSave);
    } catch (error) {
      console.error("Failed to save project:", error);
      throw error;
    }
  }

  async loadProject(id: string): Promise<Project | null> {
    try {
      const project = await get<Project>(`project-${id}`);
      return project || null;
    } catch (error) {
      console.error("Failed to load project:", error);
      return null;
    }
  }

  async listProjects(): Promise<Project[]> {
    try {
      const allKeys = await keys();
      const projects: Project[] = [];

      for (const key of allKeys) {
        if (typeof key === "string" && key.startsWith("project-")) {
          const project = await get<Project>(key);
          if (project) {
            projects.push(project);
          }
        }
      }

      projects.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      return projects;
    } catch (error) {
      console.error("Failed to list projects:", error);
      return [];
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await del(`project-${id}`);
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  }

  async exportProjectJSON(project: Project): Promise<void> {
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
      console.error("Failed to export project:", error);
      throw error;
    }
  }

  async importProjectJSON(file: File): Promise<Project> {
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

      await set(`project-${projectToSave.id}`, projectToSave);

      return projectToSave;
    } catch (error) {
      console.error("Failed to import project:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const allKeys = await keys();
      const projectKeys = allKeys.filter(
        (key) => typeof key === "string" && key.startsWith("project-")
      );

      for (const key of projectKeys) {
        await del(key as string);
      }
    } catch (error) {
      console.error("Failed to clear all projects:", error);
      throw error;
    }
  }

  async getProjectCount(): Promise<number> {
    try {
      const allKeys = await keys();
      return allKeys.filter(
        (key) => typeof key === "string" && key.startsWith("project-")
      ).length;
    } catch (error) {
      console.error("Failed to get project count:", error);
      return 0;
    }
  }

  async hasProject(id: string): Promise<boolean> {
    try {
      const project = await get<Project>(`project-${id}`);
      return project !== undefined;
    } catch (error) {
      return false;
    }
  }
}

export const storageService = StorageService.getInstance();
