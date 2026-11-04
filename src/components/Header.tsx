import React from 'react';
import { Github, Twitter, Linkedin, Mail, Plus, Code, Sun, Moon, Sparkles } from 'lucide-react';
import { StudioConfig } from '../types/project';

interface HeaderProps {
  config: StudioConfig;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenAddModal,
  onOpenExportModal,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-[#090d16]/75 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Studio Branding */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-white dark:bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {config.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">Studio</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden md:block">
              Web • iOS • Android • macOS
            </p>
          </div>
        </div>

        {/* Center: Live Status Indicator (Medium screens+) */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">{config.statusMessage}</span>
        </div>

        {/* Right: Actions & Socials */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Social Links */}
          <div className="hidden sm:flex items-center space-x-1 pr-1 border-r border-slate-200 dark:border-slate-800">
            {config.socials.github && (
              <a
                href={config.socials.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {config.socials.twitter && (
              <a
                href={config.socials.twitter}
                target="_blank"
                rel="noreferrer"
                title="Twitter / X"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {config.socials.linkedin && (
              <a
                href={config.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {config.socials.email && (
              <a
                href={config.socials.email}
                title="Email"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Export Code Modal Trigger */}
          <button
            onClick={onOpenExportModal}
            title="Export TypeScript registry code for Git"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 transition"
          >
            <Code className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Sync Code</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Add New Project Button */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 shadow-md shadow-indigo-600/30 border border-indigo-400/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>
    </header>
  );
};
