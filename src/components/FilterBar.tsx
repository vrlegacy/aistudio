import React from 'react';
import { Platform } from '../types/project';
import { AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { Globe, Sparkles, LayoutGrid, List } from 'lucide-react';

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
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'ios', label: 'iOS', icon: <AppleIcon size={14} /> },
    { id: 'android', label: 'Android', icon: <AndroidIcon size={14} /> },
    { id: 'macos', label: 'macOS', icon: <MacIcon size={14} /> },
    { id: 'ai', label: 'AI', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Platform segmented control */}
        <div className="glass rounded-full p-1 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-glass dark:shadow-glass-dark">
          {tabs.map((tab) => {
            const isActive = selectedPlatform === tab.id;
            const count = platformCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectPlatform(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-ink text-white dark:bg-white dark:text-ink shadow-sm'
                    : 'text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono tabular-nums ${
                    isActive ? 'opacity-60' : 'opacity-50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5 flex-wrap lg:flex-nowrap">
          {/* Status segmented control */}
          <div className="glass rounded-full p-1 flex items-center shadow-glass dark:shadow-glass-dark">
            {(['all', 'live', 'open-source'] as const).map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium capitalize transition ${
                  statusFilter === status
                    ? 'bg-ink text-white dark:bg-white dark:text-ink shadow-sm'
                    : 'text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white'
                }`}
              >
                {status === 'open-source' ? 'Open Source' : status}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="glass rounded-full px-4 py-2 text-[13px] font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/40 cursor-pointer appearance-none shadow-glass dark:shadow-glass-dark pr-8
                       bg-[length:14px] bg-[right_0.75rem_center] bg-no-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%238e8e93' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 5 7 9 11 5'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="alphabetical">A–Z</option>
          </select>

          {/* View toggle */}
          <div className="hidden sm:flex glass rounded-full p-1 items-center shadow-glass dark:shadow-glass-dark">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid"
              className={`grid place-items-center w-8 h-8 rounded-full transition ${
                viewMode === 'grid'
                  ? 'bg-ink text-white dark:bg-white dark:text-ink'
                  : 'text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('compact')}
              title="List"
              className={`grid place-items-center w-8 h-8 rounded-full transition ${
                viewMode === 'compact'
                  ? 'bg-ink text-white dark:bg-white dark:text-ink'
                  : 'text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
