import React from 'react';
import { StudioConfig } from '../types/project';
import { Github, Twitter, Linkedin, Mail, Sparkles, Terminal, RotateCcw } from 'lucide-react';

interface FooterProps {
  config: StudioConfig;
  onResetDefaults: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onResetDefaults }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="font-bold text-base text-slate-900 dark:text-white">
                {config.name} Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Living registry of all applications, open-source repositories, and digital crafts across Web, iOS, Android, and macOS.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              {config.socials.github && (
                <a
                  href={config.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {config.socials.twitter && (
                <a
                  href={config.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {config.socials.linkedin && (
                <a
                  href={config.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {config.socials.email && (
                <a
                  href={config.socials.email}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: How to update */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-900 dark:text-white">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span>How to add new apps anytime</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Use the top <strong>"+ Add Project"</strong> button to add any Web, iOS, Android, or Mac app. You can also edit <code className="text-indigo-400 font-mono">src/data/projects.ts</code> directly in your code editor.
            </p>
          </div>

          {/* Col 3: Quick Reset / Maintenance */}
          <div className="flex flex-col items-start md:items-end justify-between space-y-3">
            <button
              onClick={() => {
                if (confirm('Reset projects back to default sample data? Any browser-added projects will be cleared.')) {
                  onResetDefaults();
                }
              }}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to default demo projects</span>
            </button>

            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              © {new Date().getFullYear()} {config.name}. Built with React, Tailwind & Vite.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
