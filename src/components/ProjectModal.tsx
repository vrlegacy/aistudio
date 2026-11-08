import React, { useEffect, useState } from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformLabel } from './PlatformIcon';
import {
  X, Github, Globe, CheckCircle2, Share2,
  Terminal, ArrowUpRight, Download, Cpu,
  ShieldCheck, HardDrive, Copy, Check, FileText,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onEdit, onDelete }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(project.links.url || project.links.github || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCmd = () => {
    if (project.installCmd) {
      navigator.clipboard.writeText(project.installCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-4 sm:my-8 rounded-[28px] glass-strong shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* grabber */}
        <div className="pt-3 flex justify-center sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-black/15 dark:bg-white/20" />
        </div>

        {/* Header */}
        <div className="px-6 py-5 flex items-start justify-between gap-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-start gap-4 min-w-0">
            {project.previewImage ? (
              <img src={project.previewImage} alt={project.title} className="w-16 h-16 rounded-[20px] object-cover bg-white/60 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 shrink-0 shadow-sm" />
            ) : (
              <div className="grid place-items-center w-16 h-16 rounded-[20px] bg-gradient-to-br from-white/80 to-white/30 dark:from-white/10 dark:to-white/5 text-ink dark:text-white ring-1 ring-black/5 dark:ring-white/10 shrink-0">
                <PlatformIcon platform={project.platform} size={28} />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">{project.title}</h2>
              <p className="mt-1 text-[15px] text-ink-soft dark:text-white/60">{project.tagline}</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-black/[0.05] dark:bg-white/10 text-ink-soft dark:text-white/60">
                  {getPlatformLabel(project.platform)}
                </span>
                {project.license && (
                  <span className="px-2.5 py-0.5 rounded-full text-[12px] font-mono text-ink-soft dark:text-white/50 border border-black/10 dark:border-white/15">
                    {project.license}
                  </span>
                )}
                <span className="text-[12px] font-mono text-ink-soft/70 dark:text-white/35">{project.date}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-7">
          {/* Primary actions */}
          <div className="flex flex-wrap gap-2.5">
            {project.links.url && (
              <a href={project.links.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white bg-apple-blue hover:brightness-110 transition shadow-sm">
                <Globe className="w-4 h-4" /> Visit Website <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-ink dark:text-white glass hover:glass-strong transition">
                <Github className="w-4 h-4" /> Repository <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.links.macAppStore && (
              <a href={project.links.macAppStore} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-ink dark:text-white glass hover:glass-strong transition">
                <Download className="w-4 h-4 text-emerald-500" /> Download <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.links.docs && (
              <a href={project.links.docs} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-ink-soft dark:text-white/60 hover:bg-black/[0.05] dark:hover:bg-white/10 transition">
                <FileText className="w-4 h-4" /> Docs
              </a>
            )}
          </div>

          {/* Spec grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.requirements && (
              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-ink-soft dark:text-white/50 uppercase tracking-wider mb-1.5">
                  <HardDrive className="w-3.5 h-3.5" /> Requirements
                </div>
                <div className="text-[13px] font-medium text-ink dark:text-white/90">{project.requirements}</div>
              </div>
            )}
            {project.architecture && (
              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-ink-soft dark:text-white/50 uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Architecture & Privacy
                </div>
                <div className="text-[13px] font-medium text-ink dark:text-white/90">{project.architecture}</div>
              </div>
            )}
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/40 mb-2">Overview</h3>
            <p className="text-[15px] leading-relaxed text-ink dark:text-white/80 whitespace-pre-line">{project.description}</p>
          </div>

          {/* Capabilities */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/40 mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Key Capabilities
              </h3>
              <div className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-ink dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Install command */}
          {project.installCmd && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/40 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Build from Source
                </h3>
                <button onClick={handleCopyCmd} className="inline-flex items-center gap-1 text-[12px] text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white">
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCmd ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-zinc-900 dark:bg-black/60 text-zinc-200 text-[12px] font-mono overflow-x-auto ring-1 ring-white/5">{project.installCmd}</pre>
            </div>
          )}

          {/* Tech */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/40 mb-2.5">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-[12px] font-mono text-ink dark:text-white/80 bg-black/[0.04] dark:bg-white/8 border border-black/5 dark:border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <button onClick={() => onEdit(project)} className="text-[13px] font-medium text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white">
              Edit
            </button>
            <span className="text-black/15 dark:text-white/20">·</span>
            <button
              onClick={() => {
                if (confirm(`Remove "${project.title}" from studio?`)) {
                  onDelete(project.id);
                  onClose();
                }
              }}
              className="text-[13px] font-medium text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
          <button onClick={handleShare} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium text-ink dark:text-white glass hover:glass-strong transition">
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
};
