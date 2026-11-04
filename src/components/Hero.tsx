import React from 'react';
import { Search, X, ArrowUpRight, Github } from 'lucide-react';
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
    <div className="pt-8 pb-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>{config.statusMessage}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {config.name}'s Studio & Apps
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {config.bio}
            </p>

            {config.socials.github && (
              <div className="mt-3 flex items-center space-x-3 text-xs text-slate-500">
                <a 
                  href={config.socials.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="font-mono">github.com/vrlegacy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Quick interactive search input */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search apps, specs, or tech..."
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
              <span>{filteredCount} of {totalProjects} projects</span>
              <span>macOS • Web • AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
