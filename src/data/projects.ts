import { Project } from '../types/project';

/**
 * =========================================================================
 * VISHWAS (vrlegacy) STUDIO PROJECTS REGISTRY
 * =========================================================================
 * Living showcase of native macOS, iOS, Web, and AI applications.
 */

export const initialProjects: Project[] = [
  {
    id: "notchpeek",
    title: "NotchPeek",
    tagline: "Touch the camera notch with your cursor to open Mission Control",
    description: "A tiny, elegant macOS menu bar app. Push your cursor up into the camera notch at the top of your MacBook screen and Mission Control opens instantly. On screens without a notch, a strip at the top center works the exact same way. Designed with zero background battery impact for Apple Silicon and Intel Macs.",
    platform: "macos",
    category: "macOS System Utility",
    status: "live",
    featured: true,
    date: "2026",
    license: "MIT License",
    requirements: "macOS 12 Monterey or later (Apple Silicon M1–M5 & Intel)",
    architecture: "Lightweight background event listener, zero battery drain, native Mission Control triggering",
    installCmd: "git clone https://github.com/vrlegacy/notchpeek.git && cd notchpeek && bash build.command",
    tags: ["Swift", "macOS 12+", "AppKit", "Mission Control", "Menu Bar", "Apple Silicon", "Intel"],
    links: {
      url: "https://vrlegacy.github.io/notchpeek/",
      github: "https://github.com/vrlegacy/notchpeek",
      macAppStore: "https://github.com/vrlegacy/notchpeek/releases/latest/download/NotchPeek-1.0.dmg",
      docs: "https://github.com/vrlegacy/notchpeek#readme"
    },
    highlights: [
      "Instant Mission Control trigger simply by moving cursor into camera notch",
      "Configurable trigger delay (Instant, Short, Medium, Long) to prevent accidental firing",
      "Completely background-friendly with optional menu bar icon & launch at login",
      "Universal binary supporting macOS 12 Monterey or later (Apple Silicon M1-M5 & Intel)"
    ],
    stats: "Free & Open Source • macOS 12+",
    previewImage: "https://vrlegacy.github.io/notchpeek/icon.png"
  },
  {
    id: "faccy",
    title: "Faccy",
    tagline: "Lock any Mac app behind your face, Touch ID, or a password",
    description: "A local-first macOS security and privacy accessory app for Apple Silicon Macs. Processes your built-in camera feed with Apple's Vision framework to verify your face before opening chosen applications, with Touch ID and 60,000-round iterated SHA-256 salted password fallbacks. Never stores photos—only on-device feature prints.",
    platform: "macos",
    category: "Privacy & Biometric Security",
    status: "live",
    featured: true,
    date: "2026",
    license: "MIT License",
    requirements: "macOS 14 Sonoma or later (Apple Silicon Mac: M1, M2, M3, M4, M5)",
    architecture: "On-device Apple Vision Framework face feature prints, LocalAuthentication biometric Touch ID, zero photo persistence",
    installCmd: "git clone https://github.com/vrlegacy/Faccy.git && cd Faccy && bash build.command",
    tags: ["Swift", "macOS 14+", "Apple Vision Framework", "Touch ID", "LocalAuthentication", "Security", "Apple Silicon"],
    links: {
      url: "https://vrlegacy.github.io/Faccy/",
      github: "https://github.com/vrlegacy/Faccy",
      macAppStore: "https://github.com/vrlegacy/Faccy/releases",
      docs: "https://github.com/vrlegacy/Faccy#readme"
    },
    highlights: [
      "Vision framework on-device face biometric verification with zero photo storage",
      "Dynamic Island-style compact verification pill sized to the camera notch",
      "Simultaneous Face Auth and Touch ID authentication (whichever matches first unlocks)",
      "System-wide watchdog intercepting launches from Dock, Spotlight, and Finder",
      "Auto-locks on screen lock, display sleep, or customizable idle timer"
    ],
    stats: "v0.2.0 • macOS 14+ Sonoma/Sequoia",
    previewImage: "https://vrlegacy.github.io/Faccy/logo.png"
  },
  {
    id: "civix-platform",
    title: "Civix Civic Engagement Platform",
    tagline: "Digital civic engagement and community petition platform",
    description: "A full-stack web platform enabling citizen petitions, digital civic engagement, and verified community initiatives with transparent tracking and participatory democracy workflows.",
    platform: "web",
    category: "Web Application & Civic Tech",
    status: "open-source",
    featured: false,
    date: "2024",
    license: "MIT License",
    requirements: "Node.js 18+, modern web browser",
    architecture: "TypeScript React frontend with modular RESTful Express API backend",
    installCmd: "git clone https://github.com/vrlegacy/Civix-Digital-Civic-Engagement-Petition-Platform.git && cd civix && npm install",
    tags: ["TypeScript", "React", "Node.js", "Express", "REST API", "Tailwind CSS"],
    links: {
      github: "https://github.com/vrlegacy/Civix-Digital-Civic-Engagement-Petition-Platform"
    },
    highlights: [
      "Interactive digital petition creation with signature verification",
      "Community dashboard and civic milestone tracking",
      "Secure REST backend architecture with role-based access"
    ],
    stats: "Open Source • Infosys Springboard",
    previewImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "diabetic-retinopathy-ml",
    title: "Diabetic Retinopathy Detection System",
    tagline: "Deep learning computer vision model for diabetic retinal analysis",
    description: "A machine learning system engineered to detect diabetes and retinal abnormalities from fundus imagery. Uses convolutional neural networks for automated feature extraction, grading severity, and assisting early diagnostic intervention.",
    platform: "ai",
    category: "Healthcare & Computer Vision",
    status: "open-source",
    featured: false,
    date: "2024",
    license: "Open Source",
    requirements: "Python 3.9+, PyTorch, OpenCV (CPU/CUDA/Apple Metal)",
    architecture: "CNN image classification pipeline with CLAHE contrast enhancement",
    installCmd: "git clone https://github.com/vrlegacy/Diabetic-retinopathy-detection-using-machine-learning-concept.git && pip install -r requirements.txt",
    tags: ["Python", "PyTorch", "OpenCV", "CNN", "Computer Vision", "Machine Learning"],
    links: {
      github: "https://github.com/vrlegacy/Diabetic-retinopathy-detection-using-machine-learning-concept"
    },
    highlights: [
      "Automated classification of retinal fundus images across severity stages",
      "Preprocessing pipeline with contrast-limited adaptive histogram equalization (CLAHE)",
      "High-accuracy convolutional neural network architecture"
    ],
    stats: "Research & Diagnostic ML",
    previewImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
  }
];
