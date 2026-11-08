import React from 'react';
import { StudioConfig } from '../types/project';
import { Github, Twitter, Linkedin, Mail, RotateCcw } from 'lucide-react';

interface FooterProps {
  config: StudioConfig;
  onResetDefaults: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onResetDefaults }) => {
  const socials = [
    { key: 'github', href: config.socials.github, Icon: Github },
    { key: 'twitter', href: config.socials.twitter, Icon: Twitter },
    { key: 'linkedin', href: config.socials.linkedin, Icon: Linkedin },
    { key: 'email', href: config.socials.email, Icon: Mail },
  ].filter((s) => s.href);

  return (
    <footer id="about" className="mt-28 scroll-mt-28 px-4 pb-10">
      <div className="max-w-6xl mx-auto glass rounded-[32px] p-8 sm:p-12 shadow-glass dark:shadow-glass-dark text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-zinc-200 dark:from-white dark:to-zinc-300 text-zinc-900 font-semibold text-lg mb-5 shadow-sm">
          V
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
          {config.name}'s Studio
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-[15px] leading-relaxed text-ink-soft dark:text-white/55">
          A living registry of native macOS utilities, web platforms, and intelligent systems —
          designed and engineered with care.
        </p>

        {/* Socials */}
        {socials.length > 0 && (
          <div className="mt-7 flex items-center justify-center gap-2">
            {socials.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                target={key === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                className="grid place-items-center w-11 h-11 rounded-full glass hover:glass-strong text-ink-soft dark:text-white/60 hover:text-ink dark:hover:text-white transition"
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mt-9 pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-mono text-ink-soft/70 dark:text-white/35">
            © {new Date().getFullYear()} {config.name} · Built with React, Tailwind & Vite
          </p>
          <button
            onClick={() => {
              if (confirm('Reset projects back to default sample data? Any browser-added projects will be cleared.')) {
                onResetDefaults();
              }
            }}
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft/70 dark:text-white/35 hover:text-ink-soft dark:hover:text-white/60 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset demo data
          </button>
        </div>
      </div>
    </footer>
  );
};
