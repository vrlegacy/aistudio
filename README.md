# Vishwas Personal Studio 🚀

A modern personal studio & software registry to showcase everything you build across **Web Applications**, native **iOS Apps**, **Android Apps**, and **macOS Utilities**.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

![Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- 🌐 **Multi-Platform Native Support**:
  - 🌐 **Web Applications** (SaaS, full-stack tools, web apps)
  - 📱 **iOS Apps** (SwiftUI, iOS 17/18, App Store / TestFlight links)
  - 🤖 **Android Apps** (Jetpack Compose, Kotlin, Google Play links)
  - 💻 **macOS Apps** (AppKit/Swift, direct DMG download, menu bar apps)
  - ⚡ **AI & Machine Learning** (LLM pipelines, CLI tools, models)
- 🔗 **Deep Link Hub**: Direct buttons for live website URLs, GitHub repositories, App Store, Google Play Store, and Mac download links.
- 🎨 **Digital Atelier Aesthetics**: Minimalist dark mode by default, glassmorphism, accent glowing badges, and responsive design.
- 🔍 **Real-Time Search & Filters**: Filter instantly by platform (`All`, `Web`, `iOS`, `Android`, `macOS`, `AI`), status (`Live`, `Open Source`), or keyword.
- 📊 **Metrics Ribbon**: Automatically calculates and showcases counts of shipped apps across each platform.
- 🛠️ **Two Ways to Update New Projects**:
  1. **Visual UI ("+ Add Project" button)**: Fill out the in-app form, see a live card preview, and save instantly to browser storage.
  2. **Code File (`src/data/projects.ts`)**: Add a new TypeScript object to the `initialProjects` list to check it into Git.
- 🔄 **Code Sync Assistant**: Built-in "Sync Code" modal lets you copy or export the updated TypeScript snippet with 1 click.

---

## 🚀 Quick Start

### 1. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 📝 How to Add a New Application

### Option A: Using the Studio UI (Fastest)
1. Click the **"+ Add Project"** button in the top right header.
2. Select the platform (**Web**, **iOS**, **Android**, **macOS**, or **AI**).
3. Fill in:
   - **Title & Tagline**
   - **Live URL** (e.g. `https://myapp.com`)
   - **GitHub Repo** (e.g. `https://github.com/vishwas/myapp`)
   - **Store Link** (App Store, Google Play, or macOS DMG)
   - **Description & Key Highlights**
   - **Tech Stack Tags** (e.g. `SwiftUI, Metal` or `Next.js, Tailwind`)
4. Switch to the **Card Preview** tab to see your card live.
5. Click **Publish to Studio**! It will appear immediately in your studio.
6. Optional: Click the **"Sync Code"** button in the header if you want to copy the TypeScript code to commit into Git.

---

### Option B: In Code (`src/data/projects.ts`)
Open `src/data/projects.ts` and add your project to `initialProjects`:

```ts
{
  id: "my-new-app",
  title: "My New Application",
  tagline: "Short 1-line catchy summary",
  description: "Detailed description of what you built and how it works...",
  platform: "ios", // 'web' | 'ios' | 'android' | 'macos' | 'ai' | 'cross-platform'
  category: "Productivity",
  status: "live", // 'live' | 'beta' | 'in-progress' | 'open-source' | 'archived'
  featured: true,
  date: "2024",
  tags: ["SwiftUI", "SwiftData", "iOS 18"],
  links: {
    url: "https://myapp.com",
    github: "https://github.com/vishwas/my-app",
    appStore: "https://apps.apple.com/app/...",
  },
  highlights: [
    "Sub-16ms smooth SwiftUI animations",
    "Offline-first synchronization"
  ],
  stats: "1.2k Downloads • 4.9 ★"
}
```

---

## ⚙️ Customizing Your Profile & Bio

Open `src/data/studioConfig.ts` to adjust:
- Your name, title, and bio
- Live status message (`"Building & shipping new software"`)
- Social media links (GitHub, Twitter / X, LinkedIn, Email)

---

## 🚢 Deployment

Deploy to any static hosting provider in seconds:

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages
Set the build output directory to `dist/` in GitHub Actions or your host configuration.

