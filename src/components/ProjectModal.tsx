import React, { useEffect } from 'react';
import { Project } from '../types/project';
import { PlatformIcon, getPlatformBadgeStyle, getPlatformLabel, AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { 
  X, ExternalLink, Github, Globe, 
  CheckCircle2, Share2, Edit3, Trash2, Cpu, ArrowUpRight 
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
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const badgeStyle = getPlatformBadgeStyle(project.platform);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl my-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner image or top atmospheric banner */}
        <div className="relative h-44 sm:h-52 w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
          {project.previewImage && (
            <img 
              src={project.previewImage} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-35 mix-blend-overlay"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges floating over banner */}
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold border backdrop-blur-md ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}>
              <PlatformIcon platform={project.platform} size={15} />
              <span>{getPlatformLabel(project.platform)}</span>
            </span>

            <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium bg-black/40 text-slate-200 border border-white/10 backdrop-blur-md capitalize">
              {project.category}
            </span>

            <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium bg-black/40 text-slate-200 border border-white/10 backdrop-blur-md">
              {project.date}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Tagline */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {project.title}
              </h2>

              {project.stats && (
                <div className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  {project.stats}
                </div>
              )}
            </div>

            <p className="mt-1 text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400">
              {project.tagline}
            </p>
          </div>

          {/* Action Links Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
            {project.links.url && (
              <a
                href={project.links.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
              >
                <Globe className="w-4 h-4" />
                <span>Open Live App</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-black hover:bg-slate-800 border border-slate-700 transition"
              >
                <AppleIcon className="w-4 h-4" />
                <span>Apple App Store</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition"
              >
                <AndroidIcon className="w-4 h-4" />
                <span>Google Play Store</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.macAppStore && (
              <a
                href={project.links.macAppStore}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition"
              >
                <MacIcon className="w-4 h-4" />
                <span>Download macOS DMG</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            )}
          </div>

          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              About This Project
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Key Architecture Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                <span>Key Technical Highlights & Decisions</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer toolbar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(project)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Remove "${project.title}" from studio?`)) {
                    onDelete(project.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Project'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
