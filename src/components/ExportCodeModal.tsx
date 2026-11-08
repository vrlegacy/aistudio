import React, { useState } from 'react';
import { Project } from '../types/project';
import { generateProjectsTypeScript } from '../utils/storage';
import { X, Copy, Check, Download, Code } from 'lucide-react';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  isOpen,
  onClose,
  projects,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const code = generateProjectsTypeScript(projects);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl my-8 rounded-[28px] glass-strong shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-start justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-ink dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-apple-blue" />
              Sync with codebase
            </h2>
            <p className="mt-1 text-[13px] text-ink-soft dark:text-white/50">
              Copy or download this file to replace <code className="text-apple-blue font-mono">src/data/projects.ts</code> for version control.
            </p>
          </div>
          <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[12px] font-mono text-ink-soft/70 dark:text-white/40">
              {projects.length} projects · typed TypeScript
            </span>
            <div className="flex items-center gap-2">
              <button onClick={handleDownload} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium text-ink dark:text-white glass hover:glass-strong transition">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-apple-blue hover:brightness-110 transition shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy file'}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto ring-1 ring-white/5 max-h-[55vh]">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
};
