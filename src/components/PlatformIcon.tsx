import React from 'react';
import { Platform } from '../types/project';
import { Globe, Sparkles, Layers } from 'lucide-react';

interface PlatformIconProps {
  platform: Platform;
  className?: string;
  size?: number;
}

export const AppleIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.93-.91.04-2.02.61-2.67 1.38-.58.67-1.1 1.76-.96 2.82 1.02.08 2.06-.5 2.69-1.27z"/>
  </svg>
);

export const AndroidIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.68 2.24 12.87 2 12 2c-.87 0-1.68.24-2.64.63L7.88.65c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.73 3.65 5.5 5.2 5.5 7h13c0-1.8-1.23-3.35-2.97-4.34zM9 5.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm6 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
  </svg>
);

export const MacIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = "w-4 h-4", size = 16 }) => {
  switch (platform) {
    case 'ios':
      return <AppleIcon className={className} size={size} />;
    case 'macos':
      return <MacIcon className={className} size={size} />;
    case 'android':
      return <AndroidIcon className={className} size={size} />;
    case 'web':
      return <Globe className={className} size={size} />;
    case 'ai':
      return <Sparkles className={className} size={size} />;
    case 'cross-platform':
      return <Layers className={className} size={size} />;
    default:
      return <Globe className={className} size={size} />;
  }
};

export function getPlatformLabel(platform: Platform): string {
  switch (platform) {
    case 'ios':
      return 'iOS App';
    case 'macos':
      return 'macOS App';
    case 'android':
      return 'Android App';
    case 'web':
      return 'Web Application';
    case 'ai':
      return 'AI / Machine Learning';
    case 'cross-platform':
      return 'Cross-Platform';
    default:
      return 'Application';
  }
}

export function getPlatformBadgeStyle(platform: Platform): { bg: string; text: string; border: string; glow: string } {
  switch (platform) {
    case 'ios':
      return {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]'
      };
    case 'macos':
      return {
        bg: 'bg-slate-500/10 dark:bg-slate-400/20',
        text: 'text-slate-700 dark:text-slate-300',
        border: 'border-slate-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(148,163,184,0.2)]'
      };
    case 'android':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
      };
    case 'web':
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-500/20',
        text: 'text-sky-600 dark:text-sky-400',
        border: 'border-sky-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.25)]'
      };
    case 'ai':
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]'
      };
    case 'cross-platform':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
        glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]'
      };
    default:
      return {
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        glow: ''
      };
  }
}
