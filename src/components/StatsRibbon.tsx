import React from 'react';
import { Project } from '../types/project';
import { AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { Globe, Sparkles, Github, Layers } from 'lucide-react';

interface StatsRibbonProps {
  projects: Project[];
}

export const StatsRibbon: React.FC<StatsRibbonProps> = ({ projects }) => {
  const total = projects.length;
  const webCount = projects.filter((p) => p.platform === 'web').length;
  const iosCount = projects.filter((p) => p.platform === 'ios').length;
  const androidCount = projects.filter((p) => p.platform === 'android').length;
  const macCount = projects.filter((p) => p.platform === 'macos').length;
  const aiCount = projects.filter((p) => p.platform === 'ai').length;
  const githubCount = projects.filter((p) => Boolean(p.links.github)).length;

  const statItems = [
    { label: 'Projects', value: total, icon: <Layers className="w-[18px] h-[18px]" />, tint: 'text-indigo-500' },
    { label: 'Web', value: webCount, icon: <Globe className="w-[18px] h-[18px]" />, tint: 'text-sky-500' },
    { label: 'iOS', value: iosCount, icon: <AppleIcon size={18} />, tint: 'text-pink-500' },
    { label: 'Android', value: androidCount, icon: <AndroidIcon size={18} />, tint: 'text-emerald-500' },
    { label: 'macOS', value: macCount, icon: <MacIcon size={18} />, tint: 'text-slate-500 dark:text-slate-300' },
    { label: 'AI / ML', value: aiCount, icon: <Sparkles className="w-[18px] h-[18px]" />, tint: 'text-purple-500' },
    { label: 'Open Repos', value: githubCount, icon: <Github className="w-[18px] h-[18px]" />, tint: 'text-amber-500' },
  ];

  return (
    <div id="stats" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statItems.map((stat, i) => (
          <div
            key={i}
            className="glass rounded-3xl p-4 shadow-glass dark:shadow-glass-dark transition-transform duration-300 hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`${stat.tint} mb-3`}>{stat.icon}</div>
            <div className="text-3xl font-semibold tracking-tight text-ink dark:text-white tabular-nums">
              {stat.value}
            </div>
            <div className="mt-0.5 text-[12px] font-medium text-ink-soft dark:text-white/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
