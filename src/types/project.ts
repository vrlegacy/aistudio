export type Platform = 'web' | 'ios' | 'android' | 'macos' | 'ai' | 'cross-platform';

export type ProjectStatus = 'live' | 'beta' | 'in-progress' | 'open-source' | 'archived';

export interface ProjectLinks {
  url?: string;            // Web app / live URL
  github?: string;         // GitHub repository URL
  appStore?: string;       // iOS App Store link
  playStore?: string;      // Android Play Store link
  macAppStore?: string;    // Mac App Store link or Direct DMG
  demo?: string;           // Demo video or tweet/loom
  docs?: string;           // Case study or docs link
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  platform: Platform;
  category: string;
  status: ProjectStatus;
  featured?: boolean;
  date: string;
  tags: string[];
  links: ProjectLinks;
  highlights?: string[];
  stats?: string;          // e.g. "4.9 ★ (1.2k reviews)", "15k+ Monthly Users"
  previewImage?: string;   // Image URL or mock
  accentColor?: string;    // e.g. "indigo", "emerald", "amber", "violet", "sky", "rose"
  requirements?: string;   // e.g. "macOS 14+ (Apple Silicon)", "macOS 12+"
  architecture?: string;   // e.g. "On-device Apple Vision Framework, zero cloud telemetry"
  installCmd?: string;     // e.g. "git clone https://... && bash build.command"
  license?: string;        // e.g. "MIT"
}

export interface StudioConfig {
  name: string;
  title: string;
  bio: string;
  tagline: string;
  statusMessage: string;
  statusAvailable: boolean;
  avatarUrl?: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

