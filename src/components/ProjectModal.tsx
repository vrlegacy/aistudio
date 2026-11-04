import React, { useEffect, useState } from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformLabel } from './PlatformIcon';
import { 
  X, Github, Globe, CheckCircle2, Share2, 
  Terminal, ArrowUpRight, Download, Cpu, 
  ShieldCheck, HardDrive, Copy, Check, FileText
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onEdit,
  onDelete,
}) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-start space-x-3.5 pr-4">
            {project.previewImage ? (
              <img 
                src={project.previewImage} 
                alt={project.title} 
                className="w-12 h-12 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0" 
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                <PlatformIcon platform={project.platform} size={22} />
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {getPlatformLabel(project.platform)}
                </span>
                {project.license && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                    {project.license}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md text-xs font-mono text-slate-500 dark:text-slate-400">
                  {project.date}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                {project.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Action Links Bar */}
          <div className="flex flex-wrap gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition shadow-xs"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.macAppStore && (
              <a
                href={project.links.macAppStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-sky-500" />
                <span>Download DMG / Releases</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Docs / README</span>
              </a>
            )}
          </div>

          {/* Quick Specifications Table / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.requirements && (
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>System Requirements</span>
                </div>
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {project.requirements}
                </div>
              </div>
            )}

            {project.architecture && (
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Architecture & Privacy</span>
                </div>
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {project.architecture}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Overview
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Key Capabilities / Features */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                <span>Key Capabilities & Engineering Details</span>
              </h3>
              <div className="space-y-2">
                {project.highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Install Command */}
          {project.installCmd && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Build from Source / Terminal Command</span>
                </h3>
                <button
                  onClick={handleCopyCmd}
                  className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
                {project.installCmd}
              </pre>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit(project)}
              className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Edit Details
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => {
                if (confirm(`Remove "${project.title}" from studio?`)) {
                  onDelete(project.id);
                  onClose();
                }
              }}
              className="text-xs font-medium text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
