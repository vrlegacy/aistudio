import React from 'react';
import { Project } from '../types/project';
import { AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { Globe, Sparkles, Github, Layers } from 'lucide-react';

interface StatsRibbonProps {
  projects: Project[];
}

export const StatsRibbon: React.FC<StatsRibbonProps> = ({ projects }) => {
  const total = projects.length;
  const webCount = projects.filter(p => p.platform === 'web').length;
  const iosCount = projects.filter(p => p.platform === 'ios').length;
  const androidCount = projects.filter(p => p.platform === 'android').length;
  const macCount = projects.filter(p => p.platform === 'macos').length;
  const aiCount = projects.filter(p => p.platform === 'ai').length;
  const githubCount = projects.filter(p => Boolean(p.links.github)).length;

  const statItems = [
    {
      label: "Total Projects",
      value: total,
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      color: "from-indigo-500/10 to-indigo-500/5 text-indigo-400 border-indigo-500/20"
    },
    {
      label: "Web Apps",
      value: webCount,
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      color: "from-sky-500/10 to-sky-500/5 text-sky-400 border-sky-500/20"
    },
    {
      label: "iOS Apps",
      value: iosCount,
      icon: <AppleIcon className="w-4 h-4 text-pink-400" />,
      color: "from-pink-500/10 to-pink-500/5 text-pink-400 border-pink-500/20"
    },
    {
      label: "Android Apps",
      value: androidCount,
      icon: <AndroidIcon className="w-4 h-4 text-emerald-400" />,
      color: "from-emerald-500/10 to-emerald-500/5 text-emerald-400 border-emerald-500/20"
    },
    {
      label: "macOS Apps",
      value: macCount,
      icon: <MacIcon className="w-4 h-4 text-slate-300" />,
      color: "from-slate-500/10 to-slate-500/5 text-slate-300 border-slate-500/20"
    },
    {
      label: "AI Systems",
      value: aiCount,
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      color: "from-purple-500/10 to-purple-500/5 text-purple-400 border-purple-500/20"
    },
    {
      label: "Open Repos",
      value: githubCount,
      icon: <Github className="w-4 h-4 text-amber-400" />,
      color: "from-amber-500/10 to-amber-500/5 text-amber-400 border-amber-500/20"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {statItems.map((stat, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl border bg-gradient-to-br backdrop-blur-sm ${stat.color} transition hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              {stat.icon}
            </div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
