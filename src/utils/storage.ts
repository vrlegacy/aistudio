import { Project, StudioConfig } from '../types/project';
import { initialProjects } from '../data/projects';
import { initialStudioConfig } from '../data/studioConfig';

const PROJECTS_STORAGE_KEY = 'vishwas_studio_projects_v1';
const CONFIG_STORAGE_KEY = 'vishwas_studio_config_v1';

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      return initialProjects;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse projects from localStorage:', e);
  }
  return initialProjects;
}

export function saveStoredProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to localStorage:', e);
  }
}

export function addOrUpdateProject(project: Project): Project[] {
  const current = getStoredProjects();
  const index = current.findIndex(p => p.id === project.id);
  let updated: Project[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    updated = [project, ...current];
  }
  saveStoredProjects(updated);
  return updated;
}

export function deleteStoredProject(id: string): Project[] {
  const current = getStoredProjects();
  const updated = current.filter(p => p.id !== id);
  saveStoredProjects(updated);
  return updated;
}

export function resetProjectsToDefault(): Project[] {
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  return initialProjects;
}

export function getStoredConfig(): StudioConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      return { ...initialStudioConfig, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to parse config from localStorage:', e);
  }
  return initialStudioConfig;
}

export function saveStoredConfig(config: StudioConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to localStorage:', e);
  }
}

/**
 * Generates ready-to-paste TypeScript snippet for src/data/projects.ts
 */
export function generateProjectsTypeScript(projects: Project[]): string {
  return `import { Project } from '../types/project';\n\nexport const initialProjects: Project[] = ${JSON.stringify(projects, null, 2)};\n`;
}
