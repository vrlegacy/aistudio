import React from 'react';

/**
 * Soft Apple-style aurora / vibrancy background.
 * Fixed, non-interactive, blurred color fields that give the glass
 * materials something luminous to refract.
 */
export const Aurora: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Base canvas tint */}
    <div className="absolute inset-0 bg-canvas-light dark:bg-canvas-dark transition-colors duration-500" />

    {/* Blobs */}
    <div className="absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-50 dark:opacity-40 animate-blob
                    bg-[radial-gradient(circle_at_center,#6ea8fe_0%,transparent_60%)]" />
    <div className="absolute top-10 right-[-10rem] w-[38rem] h-[38rem] rounded-full blur-3xl opacity-45 dark:opacity-35 animate-blob-slow
                    bg-[radial-gradient(circle_at_center,#c77dff_0%,transparent_60%)]" />
    <div className="absolute bottom-[-14rem] left-1/3 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 dark:opacity-30 animate-blob
                    bg-[radial-gradient(circle_at_center,#5eead4_0%,transparent_60%)]" />

    {/* Fine grain overlay for texture */}
    <div
      className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  </div>
);
