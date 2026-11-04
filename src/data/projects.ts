import { Project } from '../types/project';

/**
 * =========================================================================
 * YOUR STUDIO PROJECTS REGISTRY
 * =========================================================================
 * Add your applications here anytime you build something new!
 * 
 * Platforms supported: 'web' | 'ios' | 'android' | 'macos' | 'ai' | 'cross-platform'
 * Status options:     'live' | 'beta' | 'in-progress' | 'open-source' | 'archived'
 * Accent colors:      'indigo' | 'emerald' | 'amber' | 'violet' | 'sky' | 'rose' | 'cyan'
 */

export const initialProjects: Project[] = [
  {
    id: "zenith-mac",
    title: "Zenith MenuBar",
    tagline: "Ultra-lightweight system metrics & developer switcher for macOS",
    description: "A native macOS menu bar companion designed for engineers. Monitors CPU, GPU, memory pressure, and local Docker/port listeners with zero background battery impact. Built with Swift and AppKit.",
    platform: "macos",
    category: "Developer Utility",
    status: "live",
    featured: true,
    date: "2024",
    accentColor: "sky",
    tags: ["Swift", "AppKit", "macOS", "Metal", "SystemKit"],
    links: {
      url: "https://zenith.vishwas.studio",
      github: "https://github.com/vishwas/zenith-macos",
      macAppStore: "https://apps.apple.com/app/zenith-menubar",
      docs: "https://github.com/vishwas/zenith-macos#architecture"
    },
    highlights: [
      "Native Apple Silicon optimized binary (under 3.2MB)",
      "Zero-overhead polling via kernel Mach APIs",
      "One-click localhost port kill & docker container inspector",
      "Dynamic notch and menu bar widget styling"
    ],
    stats: "8.4k+ Downloads • 4.9 ★",
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "chronos-ios",
    title: "Chronos Focus & Habit Tracker",
    tagline: "Minimalist offline-first habit loop app with Interactive Widgets",
    description: "An iOS habit system built around atomic micro-routines and tactile haptic feedback. Utilizes iOS 17/18 Interactive Live Activities and Dynamic Island tracking without intrusive notifications.",
    platform: "ios",
    category: "Productivity & Health",
    status: "live",
    featured: true,
    date: "2024",
    accentColor: "rose",
    tags: ["SwiftUI", "SwiftData", "iOS 18", "WidgetKit", "Haptics"],
    links: {
      url: "https://chronos.vishwas.studio",
      github: "https://github.com/vishwas/chronos-ios",
      appStore: "https://apps.apple.com/app/chronos-habits",
      demo: "https://twitter.com/vishwas/status/chronos-demo"
    },
    highlights: [
      "Offline-first synchronization with zero telemetry",
      "Dynamic Island & Lock Screen Live Activities",
      "Interactive homescreen widgets for quick logging",
      "Sub-16ms smooth SwiftUI animations with custom spring curves"
    ],
    stats: "2.5k Active Testers • App Store",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "omni-agent-web",
    title: "OmniFlow AI Studio",
    tagline: "Autonomous visual LLM pipeline builder and prompt evaluation sandbox",
    description: "A full-stack web application for visual node-based generative AI workflow creation. Connects multi-modal Gemini, Claude, and local Ollama models with automated evaluation benchmarks and real-time streaming output.",
    platform: "web",
    category: "AI & Developer Tool",
    status: "live",
    featured: true,
    date: "2024",
    accentColor: "indigo",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "WebSockets"],
    links: {
      url: "https://omniflow.vishwas.studio",
      github: "https://github.com/vishwas/omniflow-ai-studio",
      demo: "https://youtu.be/omniflow-preview"
    },
    highlights: [
      "Canvas-based node graph with infinite zoom & auto-layout",
      "Token-by-token streaming over HTTP/2 Server-Sent Events",
      "Side-by-side model comparison matrix with latency scoring",
      "Local export to Python scripts & REST API endpoints"
    ],
    stats: "450+ GitHub Stars • Production Ready",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pulsar-android",
    title: "Pulsar Audio Synthesizer",
    tagline: "Low-latency polyphonic synthesizer engine with Material You",
    description: "A modern Android synthesizer app leveraging the Android Oboe C++ audio library for sub-8ms audio buffer latency. Features 4 customizable oscillators, FM modulation, and a custom touch pad keyboard.",
    platform: "android",
    category: "Music & Audio Tech",
    status: "beta",
    featured: false,
    date: "2023",
    accentColor: "emerald",
    tags: ["Kotlin", "Jetpack Compose", "C++ Oboe", "NDK", "Material 3"],
    links: {
      github: "https://github.com/vishwas/pulsar-android",
      playStore: "https://play.google.com/store/apps/details?id=studio.vishwas.pulsar",
      url: "https://pulsar.vishwas.studio"
    },
    highlights: [
      "Real-time audio processing using native C++ via JNI",
      "Dynamic Material You theming adapting to OS wallpaper",
      "Multi-touch polyphonic touch ribbon with pressure control",
      "Preset saving and MIDI controller support via USB-C"
    ],
    stats: "Open Beta on Google Play",
    previewImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "neural-diff-ai",
    title: "NeuralDiff CLI & Action",
    tagline: "AI-powered contextual git diff explainer and code review assistant",
    description: "A terminal CLI tool and GitHub Action that analyzes pull requests using local or cloud LLMs. Produces semantic impact graphs, breaking change alerts, and security checklists before merging.",
    platform: "ai",
    category: "DevOps & CLI",
    status: "open-source",
    featured: false,
    date: "2023",
    accentColor: "amber",
    tags: ["Rust", "Python", "CLI", "GitHub Actions", "Tree-sitter"],
    links: {
      github: "https://github.com/vishwas/neural-diff",
      url: "https://crates.io/crates/neural-diff",
      docs: "https://github.com/vishwas/neural-diff#installation"
    },
    highlights: [
      "Tree-sitter AST parsing for 12+ programming languages",
      "Generates human-readable summaries for massive 1000+ line diffs",
      "Zero telemetry option with local Ollama runtime",
      "Fast Rust binary with sub-100ms startup"
    ],
    stats: "1.2k Stars • Crates.io",
    previewImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "vortex-terminal-mac",
    title: "Vortex Shell Accelerator",
    tagline: "GPU-accelerated terminal assistant with inline command explanations",
    description: "A native macOS terminal wrapper that augments Zsh and Fish with contextual predictive completions, historical command bookmarks, and instant documentation lookup without leaving the prompt.",
    platform: "macos",
    category: "Developer Utility",
    status: "in-progress",
    featured: false,
    date: "2024",
    accentColor: "violet",
    tags: ["Swift", "Metal", "PTY", "Zsh", "macOS Sonoma"],
    links: {
      github: "https://github.com/vishwas/vortex-shell",
      url: "https://vortex.vishwas.studio"
    },
    highlights: [
      "Sub-millisecond frame rendering using Apple Metal",
      "Inline man page parser with interactive flag toggles",
      "Encrypted sync for shell history across Mac workstations"
    ],
    stats: "Private Preview",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  }
];
