import { get, set, del, keys } from "idb-keyval";
import type { Project } from "@/types";

const PROJECTS_KEY = "videocut-projects";
const SETTINGS_KEY = "videocut-settings";

export type EditorSettings = {
  language: "ar" | "en";
  direction: "rtl" | "ltr";
  theme: "dark" | "light";
  recentProjectIds: string[];
};

const DEFAULT_SETTINGS: EditorSettings = {
  language: "ar",
  direction: "rtl",
  theme: "dark",
  recentProjectIds: [],
};

export async function getAllProjects(): Promise<Project[]> {
  const data = (await get(PROJECTS_KEY)) as Project[] | undefined;
  return data || [];
}

export async function saveProject(project: Project): Promise<void> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  await set(PROJECTS_KEY, projects);
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getAllProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await set(PROJECTS_KEY, filtered);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.id === id);
}

export async function getSettings(): Promise<EditorSettings> {
  const data = (await get(SETTINGS_KEY)) as EditorSettings | undefined;
  return data || { ...DEFAULT_SETTINGS };
}

export async function saveSettings(settings: Partial<EditorSettings>): Promise<void> {
  const current = await getSettings();
  await set(SETTINGS_KEY, { ...current, ...settings });
}

export async function clearAllData(): Promise<void> {
  await del(PROJECTS_KEY);
  await del(SETTINGS_KEY);
}

export async function getRecentProjects(limit = 10): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}
