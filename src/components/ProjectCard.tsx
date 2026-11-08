import React from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformLabel } from './PlatformIcon';
import { Github, Globe, ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  viewMode?: 'grid' | 'compact';
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  viewMode = 'grid',
  index = 0,
}) => {
  const statusDot =
    project.status === 'live'
      ? 'bg-emerald-500'
      : project.status === 'beta' || project.status === 'in-progress'
      ? 'bg-amber-500'
      : project.status === 'open-source'
      ? 'bg-sky-500'
      : 'bg-slate-400';

  /* ---------- Compact list row ---------- */
  if (viewMode === 'compact') {
    return (
      <div
        onClick={() => onSelect(project)}
        className="group glass hover:glass-strong rounded-3xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-glass dark:shadow-glass-dark animate-fade-up"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {project.previewImage ? (
            <img src={project.previewImage} alt="" className="w-11 h-11 rounded-2xl object-cover bg-white/50 dark:bg-white/5 shrink-0 ring-1 ring-black/5 dark:ring-white/10" />
          ) : (
            <div className="grid place-items-center w-11 h-11 rounded-2xl bg-white/50 dark:bg-white/5 text-ink dark:text-white shrink-0 ring-1 ring-black/5 dark:ring-white/10">
              <PlatformIcon platform={project.platform} size={20} />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-ink dark:text-white truncate">{project.title}</h3>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot} shrink-0`} />
            </div>
            <p className="text-[13px] text-ink-soft dark:text-white/50 truncate">{project.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <span className="hidden lg:inline px-2.5 py-1 rounded-full text-[11px] font-medium text-ink-soft dark:text-white/55 bg-black/[0.04] dark:bg-white/5">
            {getPlatformLabel(project.platform)}
          </span>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition">
              <Github className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => onSelect(project)}
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-apple-blue hover:brightness-110 transition"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Grid card ---------- */
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col glass hover:glass-strong rounded-4xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-glass dark:shadow-glass-dark animate-fade-up overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* sheen on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--x,50%)_0%,rgba(10,132,255,0.12),transparent_70%)]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {project.previewImage ? (
            <img src={project.previewImage} alt="" className="w-14 h-14 rounded-[18px] object-cover bg-white/60 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 shadow-sm" />
          ) : (
            <div className="grid place-items-center w-14 h-14 rounded-[18px] bg-gradient-to-br from-white/80 to-white/30 dark:from-white/10 dark:to-white/5 text-ink dark:text-white ring-1 ring-black/5 dark:ring-white/10">
              <PlatformIcon platform={project.platform} size={26} />
            </div>
          )}
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-soft dark:text-white/50">
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
              {getPlatformLabel(project.platform)}
            </span>
            <div className="mt-0.5 text-[11px] font-mono text-ink-soft/70 dark:text-white/35">{project.date}</div>
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-ink-soft/40 dark:text-white/30 group-hover:text-apple-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* Title + tagline */}
      <h3 className="text-xl font-semibold tracking-tight text-ink dark:text-white">{project.title}</h3>
      <p className="mt-1 text-[14px] font-medium text-ink-soft dark:text-white/60 line-clamp-2">{project.tagline}</p>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft dark:text-white/45 line-clamp-3">{project.description}</p>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-[12px] text-ink-soft dark:text-white/55">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Spacer pushes footer down */}
      <div className="flex-1 min-h-4" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.slice(0, 4).map((tag, i) => (
          <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium text-ink-soft dark:text-white/55 bg-black/[0.04] dark:bg-white/5">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="px-2 py-1 rounded-full text-[11px] font-medium text-ink-soft/60 dark:text-white/35">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1.5">
          {project.links.url && (
            <a href={project.links.url} target="_blank" rel="noreferrer" title="Website" className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition">
              <Globe className="w-[18px] h-[18px]" />
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" title="GitHub" className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition">
              <Github className="w-[18px] h-[18px]" />
            </a>
          )}
          {project.links.macAppStore && (
            <a href={project.links.macAppStore} target="_blank" rel="noreferrer" title="Download" className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition">
              <Download className="w-[18px] h-[18px]" />
            </a>
          )}
        </div>
        <button
          onClick={() => onSelect(project)}
          className="px-4 py-2 rounded-full text-[13px] font-semibold text-apple-blue hover:bg-apple-blue/10 transition"
        >
          Details
        </button>
      </div>
    </div>
  );
};
