import React from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformLabel } from './PlatformIcon';
import { Github, Globe, ArrowUpRight, CheckCircle2, Download, HardDrive } from 'lucide-react';

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
  // Compact List View
  if (viewMode === 'compact') {
    return (
      <div 
        onClick={() => onSelect(project)}
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 transition duration-150 cursor-pointer"
      >
        <div className="flex items-start sm:items-center space-x-3.5 mb-2 md:mb-0">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
            <PlatformIcon platform={project.platform} size={18} />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {getPlatformLabel(project.platform)}
              </span>
              {project.license && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-500 border border-slate-300 dark:border-slate-700">
                  {project.license}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden lg:flex items-center space-x-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                title="Website"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
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
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => onSelect(project)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 ml-1 transition"
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-650 border border-slate-200 dark:border-slate-800 p-5 transition duration-150 cursor-pointer shadow-xs hover:shadow-md"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2.5">
            {project.previewImage ? (
              <img 
                src={project.previewImage} 
                alt="" 
                className="w-7 h-7 rounded-lg object-contain bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700" 
              />
            ) : (
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <PlatformIcon platform={project.platform} size={15} />
              </div>
            )}
            <div>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {getPlatformLabel(project.platform)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {project.license && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 border border-slate-200 dark:border-slate-800">
                {project.license}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">
              {project.date}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-transform" />
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2">
          {project.tagline}
        </p>

        {/* Short Description */}
        <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Requirements indicator if available */}
        {project.requirements && (
          <div className="mt-3 flex items-center space-x-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
            <HardDrive className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{project.requirements}</span>
          </div>
        )}

        {/* 2 Key feature bullets */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {project.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start space-x-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Area: Tags & Direct Labeled Action Links */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1 py-0.5 rounded text-[10px] font-mono text-slate-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Direct Action Links Bar with Clear Text Labels */}
        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Globe className="w-3 h-3 text-sky-500" />
                <span>Website</span>
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}

            {project.links.macAppStore && (
              <a
                href={project.links.macAppStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Download className="w-3 h-3 text-emerald-500" />
                <span>DMG</span>
              </a>
            )}
          </div>

          <button
            onClick={() => onSelect(project)}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};
