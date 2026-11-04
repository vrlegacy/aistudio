import React from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformBadgeStyle, getPlatformLabel, AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { Github, Globe, ArrowUpRight, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  viewMode?: 'grid' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  viewMode = 'grid',
}) => {
  const badgeStyle = getPlatformBadgeStyle(project.platform);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'live':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'beta':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'in-progress':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'open-source':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/30';
    }
  };

  // Compact List View
  if (viewMode === 'compact') {
    return (
      <div 
        onClick={() => onSelect(project)}
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
      >
        <div className="flex items-start sm:items-center space-x-3.5 mb-3 md:mb-0">
          <div className={`p-2.5 rounded-xl border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text} shrink-0`}>
            <PlatformIcon platform={project.platform} size={18} />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base group-hover:text-indigo-500 transition-colors">
                {project.title}
              </h3>
              {project.featured && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>Featured</span>
                </span>
              )}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Right side tags & quick links */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden lg:flex items-center space-x-1.5 flex-wrap">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                title="Live App / Website"
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub Repo"
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noreferrer"
                title="Apple App Store"
                className="p-1.5 rounded-lg text-slate-500 hover:text-pink-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <AppleIcon className="w-4 h-4" />
              </a>
            )}
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noreferrer"
                title="Google Play Store"
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <AndroidIcon className="w-4 h-4" />
              </a>
            )}
            {project.links.macAppStore && (
              <a
                href={project.links.macAppStore}
                target="_blank"
                rel="noreferrer"
                title="Mac App Store / DMG"
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <MacIcon className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => onSelect(project)}
              className="ml-1 p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid View Card
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer p-6"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Platform Tag Badge */}
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
            >
              <PlatformIcon platform={project.platform} size={14} />
              <span>{getPlatformLabel(project.platform)}</span>
            </span>

            {project.featured && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>

        <p className="mt-1 text-xs font-medium text-indigo-600/90 dark:text-indigo-400/90">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Highlights Snippet */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5">
            {project.highlights.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Area: Tags & Quick Action Links */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/70">
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Direct Action Links */}
        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            {/* Live Web Link */}
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live App</span>
              </a>
            )}

            {/* GitHub Repo */}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            )}

            {/* iOS App Store */}
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noreferrer"
                title="Apple App Store"
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 transition"
              >
                <AppleIcon className="w-3.5 h-3.5" />
                <span>Store</span>
              </a>
            )}

            {/* Google Play */}
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noreferrer"
                title="Google Play Store"
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 transition"
              >
                <AndroidIcon className="w-3.5 h-3.5" />
                <span>Play</span>
              </a>
            )}

            {/* macOS Store / DMG */}
            {project.links.macAppStore && (
              <a
                href={project.links.macAppStore}
                target="_blank"
                rel="noreferrer"
                title="macOS Store / DMG"
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 transition"
              >
                <MacIcon className="w-3.5 h-3.5" />
                <span>Mac</span>
              </a>
            )}
          </div>

          {/* Stats if available */}
          {project.stats && (
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              {project.stats.split('•')[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
