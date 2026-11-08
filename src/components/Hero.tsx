import React from 'react';
import { ArrowUpRight, Github, ArrowDown } from 'lucide-react';
import { StudioConfig } from '../types/project';

interface HeroProps {
  config: StudioConfig;
  totalProjects: number;
}

export const Hero: React.FC<HeroProps> = ({ config, totalProjects }) => {
  return (
    <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[13px] font-medium text-ink/80 dark:text-white/80 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {config.statusMessage}
        </div>

        {/* Avatar */}
        {config.avatarUrl && (
          <img
            src={config.avatarUrl}
            alt={config.name}
            className="w-20 h-20 rounded-full mx-auto mb-7 ring-1 ring-black/5 dark:ring-white/10 shadow-soft object-cover animate-fade-in"
          />
        )}

        {/* Headline */}
        <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tightest text-gradient animate-fade-up">
          {config.name}'s Studio.
          <br />
          <span className="text-apple-blue">Software, crafted.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-ink-soft dark:text-white/60 animate-fade-up [animation-delay:80ms]">
          {config.bio}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up [animation-delay:160ms]">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold text-white bg-apple-blue hover:brightness-110 active:scale-[0.98] transition shadow-soft"
          >
            Explore the work
            <ArrowDown className="w-4 h-4" />
          </a>
          {config.socials.github && (
            <a
              href={config.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold text-ink dark:text-white glass hover:glass-strong active:scale-[0.98] transition"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </a>
          )}
        </div>

        {/* Tiny meta line */}
        <p className="mt-8 text-[13px] font-mono text-ink-soft/70 dark:text-white/35 animate-fade-in [animation-delay:240ms]">
          {totalProjects} projects · macOS · Web · AI · Open Source
        </p>
      </div>
    </section>
  );
};
