import React, { useEffect, useRef, useState } from 'react';
import { Search, X, Plus, Github, Sun, Moon, Code, Command } from 'lucide-react';
import { StudioConfig } from '../types/project';

interface DynamicIslandProps {
  config: StudioConfig;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
  totalProjects: number;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type Mode = 'idle' | 'search';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Stats', href: '#stats' },
  { label: 'About', href: '#about' },
];

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  config,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalProjects,
  onOpenAddModal,
  onOpenExportModal,
  isDark,
  onToggleTheme,
}) => {
  const [mode, setMode] = useState<Mode>('idle');
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus input when entering search mode
  useEffect(() => {
    if (mode === 'search') {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [mode]);

  // Keyboard: ⌘K / "/" opens search, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMode('search');
      } else if (e.key === '/' && mode === 'idle' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setMode('search');
      } else if (e.key === 'Escape' && mode === 'search') {
        setMode('idle');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  // Click outside collapses search
  useEffect(() => {
    if (mode !== 'search') return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMode('idle');
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mode]);

  const expanded = mode === 'search';

  return (
    <div className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-3 pointer-events-none">
      <div
        ref={wrapRef}
        className={[
          'island pointer-events-auto text-white animate-island-drop',
          'shadow-island overflow-hidden',
          'transition-[width,border-radius,padding] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          expanded
            ? 'w-[min(92vw,640px)] rounded-[30px] px-3 py-3'
            : scrolled
            ? 'w-[min(94vw,760px)] rounded-full px-2.5 py-2'
            : 'w-[min(94vw,840px)] rounded-full px-3 py-2.5',
        ].join(' ')}
      >
        {/* ---- Top row (always visible) ---- */}
        <div className="flex items-center gap-2">
          {/* Brand */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 shrink-0 pl-1.5 pr-1"
            aria-label="Back to top"
          >
            <span className="relative grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-white to-zinc-300 text-zinc-900 font-semibold text-sm shadow-inner">
              V
              <span className="absolute inset-0 rounded-full ring-1 ring-white/20" />
            </span>
            <span
              className={[
                'font-semibold tracking-tight whitespace-nowrap transition-all duration-300',
                scrolled ? 'text-sm opacity-90' : 'text-sm',
                expanded ? 'hidden sm:inline' : 'inline',
              ].join(' ')}
            >
              {config.name}
              <span className="text-white/45 font-normal"> Studio</span>
            </span>
          </a>

          {/* Center nav — hidden in search mode */}
          {!expanded && (
            <nav className="hidden md:flex items-center gap-0.5 mx-auto">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          )}

          {/* Search field morphs in */}
          {expanded && (
            <div className="flex-1 flex items-center gap-2 pl-1 animate-island-expand">
              <Search className="w-4 h-4 text-white/60 shrink-0" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search apps, platforms, or tech…"
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <span className="hidden sm:inline text-[11px] font-mono text-white/40 whitespace-nowrap">
                {filteredCount}/{totalProjects}
              </span>
              <button
                onClick={() => {
                  if (searchQuery) onSearchChange('');
                  else setMode('idle');
                }}
                className="grid place-items-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Right action cluster — hidden in search mode */}
          {!expanded && (
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setMode('search')}
                className="group flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Search"
              >
                <Search className="w-[17px] h-[17px]" />
                <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] font-medium text-white/50 bg-white/10 rounded-md px-1.5 py-0.5">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>

              <button
                onClick={onOpenExportModal}
                title="Export registry code"
                className="hidden sm:grid place-items-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Export code"
              >
                <Code className="w-[17px] h-[17px]" />
              </button>

              {config.socials.github && (
                <a
                  href={config.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="hidden sm:grid place-items-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <Github className="w-[17px] h-[17px]" />
                </a>
              )}

              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="grid place-items-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                {isDark ? <Sun className="w-[17px] h-[17px] text-amber-300" /> : <Moon className="w-[17px] h-[17px]" />}
              </button>

              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 pl-2.5 pr-3.5 py-2 rounded-full text-[13px] font-semibold text-zinc-900 bg-white hover:bg-zinc-200 transition shadow-sm"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                <span className="hidden xs:inline">Add</span>
              </button>
            </div>
          )}
        </div>

        {/* ---- Expanded search hint row ---- */}
        {expanded && (
          <div className="mt-3 flex items-center justify-between px-1 animate-island-expand">
            <div className="flex items-center gap-1.5 flex-wrap">
              {['macOS', 'Web', 'AI', 'Swift', 'Open Source'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => onSearchChange(chip)}
                  className="px-2.5 py-1 rounded-full text-[12px] text-white/70 bg-white/8 hover:bg-white/15 hover:text-white transition border border-white/10"
                >
                  {chip}
                </button>
              ))}
            </div>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-white/40">
              <kbd className="bg-white/10 rounded px-1.5 py-0.5">esc</kbd> to close
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
