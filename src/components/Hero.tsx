import React from 'react';
import { Search, X, Sparkles, Terminal } from 'lucide-react';
import { StudioConfig } from '../types/project';

interface HeroProps {
  config: StudioConfig;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProjects: number;
  filteredCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  searchQuery,
  onSearchChange,
  totalProjects,
  filteredCount,
}) => {
  return (
    <div className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[280px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-20 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Studio Tag */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 mb-4 text-xs font-mono text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold uppercase tracking-wider">{config.tagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Crafting software across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500">
              Web, Mobile & Desktop
            </span>
          </h1>

          {/* Bio / Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {config.bio}
          </p>

          {/* Quick interactive search input */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by app name, tech (Swift, React, Kotlin, AI), or platform..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Count indicator */}
            <div className="flex items-center justify-between sm:justify-start px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-slate-600 dark:text-slate-300 shrink-0">
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                <span>
                  Showing <strong className="text-indigo-600 dark:text-indigo-400">{filteredCount}</strong> of {totalProjects} apps
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

