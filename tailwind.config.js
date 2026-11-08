/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Apple system palette
        ink: {
          DEFAULT: '#1d1d1f',   // Apple near-black text
          soft: '#6e6e73',      // Apple secondary gray
        },
        canvas: {
          light: '#f5f5f7',     // Apple signature light gray
          dark: '#0a0a0c',      // Near-black dark canvas
        },
        apple: {
          blue: '#0071e3',      // Light-mode system blue
          blued: '#0a84ff',     // Dark-mode system blue
        },
        studio: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b0f19',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'island': '0 8px 30px -4px rgba(0,0,0,0.35), 0 2px 8px -2px rgba(0,0,0,0.25)',
        'glass': '0 1px 0 0 rgba(255,255,255,0.4) inset, 0 12px 40px -12px rgba(15,23,42,0.18)',
        'glass-dark': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 50px -18px rgba(0,0,0,0.7)',
        'soft': '0 10px 40px -12px rgba(15,23,42,0.15)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'island-drop': 'islandDrop 0.7s cubic-bezier(0.34,1.56,0.64,1) both',
        'island-expand': 'islandExpand 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        'blob': 'blob 18s ease-in-out infinite',
        'blob-slow': 'blob 26s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        islandDrop: {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(-120%) scale(0.8)' },
          '60%': { opacity: '1' },
          '100%': { opacity: '1', transform: 'translateX(-50%) translateY(0) scale(1)' },
        },
        islandExpand: {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.12)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.92)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
