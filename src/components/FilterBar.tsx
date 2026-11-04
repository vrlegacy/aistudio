import React from 'react';
import { Platform } from '../types/project';
import { AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { Globe, Sparkles, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

export type FilterPlatform = 'all' | Platform;
export type SortOption = 'newest' | 'featured' | 'alphabetical';

interface FilterBarProps {
  selectedPlatform: FilterPlatform;
  onSelectPlatform: (platform: FilterPlatform) => void;
  statusFilter: 'all' | 'live' | 'open-source';
  onStatusFilterChange: (status: 'all' | 'live' | 'open-source') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'compact';
  onViewModeChange: (mode: 'grid' | 'compact') => void;
  platformCounts: Record<FilterPlatform, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  onSelectPlatform,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  platformCounts,
}) => {
  const tabs: { id: FilterPlatform; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'ios', label: 'iOS', icon: <AppleIcon className="w-3.5 h-3.5" /> },
    { id: 'android', label: 'Android', icon: <AndroidIcon className="w-3.5 h-3.5" /> },
    { id: 'macos', label: 'macOS', icon: <MacIcon className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'AI / ML', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Platform Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = selectedPlatform === tab.id;
            const count = platformCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectPlatform(tab.id)}
                className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-tight whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-slate-750 text-white dark:bg-slate-200 dark:text-slate-900'
                      : 'bg-slate-200/80 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters, Sorting & View Toggle */}
        <div className="flex items-center justify-between md:justify-end space-x-2.5">
          {/* Status filter pill */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/70 p-1 rounded-xl text-xs border border-slate-200 dark:border-slate-700/60">
            {(['all', 'live', 'open-source'] as const).map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition ${
                  statusFilter === status
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {status === 'open-source' ? 'Open Source' : status}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="relative inline-flex items-center">
            <SlidersHorizontal className="absolute left-2.5 pointer-events-none w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="pl-8 pr-7 py-1.5 text-xs font-medium rounded-xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* View Mode (Grid vs Compact) */}
          <div className="hidden sm:flex items-center bg-slate-100/90 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-500 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('compact')}
              title="Compact List View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'compact'
                  ? 'bg-white dark:bg-slate-900 text-indigo-500 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

