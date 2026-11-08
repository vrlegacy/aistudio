import React, { useState, useEffect } from 'react';
import { Project, Platform, ProjectStatus } from '../types/project';
import { AppleIcon, AndroidIcon, MacIcon } from './PlatformIcon';
import { 
  X, Trash2, Check, Globe, Github, Sparkles, 
  Code, Eye, Layers, Copy 
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialProject?: Project | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProject,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'code'>('form');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState<Platform>('web');
  const [category, setCategory] = useState('Productivity');
  const [status, setStatus] = useState<ProjectStatus>('live');
  const [featured, setFeatured] = useState(false);
  const [date, setDate] = useState('2024');
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Tailwind');
  const [stats, setStats] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [license, setLicense] = useState('MIT License');
  const [requirements, setRequirements] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [installCmd, setInstallCmd] = useState('');

  // Links
  const [url, setUrl] = useState('');
  const [github, setGithub] = useState('');
  const [appStore, setAppStore] = useState('');
  const [playStore, setPlayStore] = useState('');
  const [macAppStore, setMacAppStore] = useState('');
  const [docs, setDocs] = useState('');

  // Highlights
  const [highlights, setHighlights] = useState<string[]>([
    'High performance and responsive architecture',
    'Offline-first and secure design'
  ]);
  const [newHighlight, setNewHighlight] = useState('');

  // Populate when editing
  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title);
      setTagline(initialProject.tagline);
      setDescription(initialProject.description);
      setPlatform(initialProject.platform);
      setCategory(initialProject.category);
      setStatus(initialProject.status);
      setFeatured(Boolean(initialProject.featured));
      setDate(initialProject.date);
      setTagsInput(initialProject.tags.join(', '));
      setStats(initialProject.stats || '');
      setPreviewImage(initialProject.previewImage || '');
      setLicense(initialProject.license || 'MIT License');
      setRequirements(initialProject.requirements || '');
      setArchitecture(initialProject.architecture || '');
      setInstallCmd(initialProject.installCmd || '');

      setUrl(initialProject.links.url || '');
      setGithub(initialProject.links.github || '');
      setAppStore(initialProject.links.appStore || '');
      setPlayStore(initialProject.links.playStore || '');
      setMacAppStore(initialProject.links.macAppStore || '');
      setDocs(initialProject.links.docs || '');
      setHighlights(initialProject.highlights || []);
    } else {
      // Default clean state
      setTitle('');
      setTagline('');
      setDescription('');
      setPlatform('web');
      setCategory('Productivity');
      setStatus('live');
      setFeatured(false);
      setDate(new Date().getFullYear().toString());
      setTagsInput('');
      setStats('');
      setPreviewImage('');
      setLicense('MIT License');
      setRequirements('');
      setArchitecture('');
      setInstallCmd('');
      setUrl('');
      setGithub('');
      setAppStore('');
      setPlayStore('');
      setMacAppStore('');
      setDocs('');
      setHighlights([]);
    }
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  // Construct current Project object
  const currentProject: Project = {
    id: initialProject?.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `app-${Date.now()}`,
    title: title || 'Untitled Application',
    tagline: tagline || 'Application tagline & description',
    description: description || 'Detailed explanation of what was built, why, and how it functions.',
    platform,
    category,
    status,
    featured,
    date: date || new Date().getFullYear().toString(),
    tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    links: {
      ...(url.trim() && { url: url.trim() }),
      ...(github.trim() && { github: github.trim() }),
      ...(appStore.trim() && { appStore: appStore.trim() }),
      ...(playStore.trim() && { playStore: playStore.trim() }),
      ...(macAppStore.trim() && { macAppStore: macAppStore.trim() }),
      ...(docs.trim() && { docs: docs.trim() }),
    },
    highlights: highlights.filter(Boolean),
    stats: stats.trim() || undefined,
    previewImage: previewImage.trim() || undefined,
    license: license.trim() || undefined,
    requirements: requirements.trim() || undefined,
    architecture: architecture.trim() || undefined,
    installCmd: installCmd.trim() || undefined,
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a project title');
      return;
    }
    onSave(currentProject);
    onClose();
  };

  const codeSnippet = `  {
    id: "${currentProject.id}",
    title: "${currentProject.title.replace(/"/g, '\\"')}",
    tagline: "${currentProject.tagline.replace(/"/g, '\\"')}",
    description: "${currentProject.description.replace(/"/g, '\\"')}",
    platform: "${currentProject.platform}",
    category: "${currentProject.category.replace(/"/g, '\\"')}",
    status: "${currentProject.status}",
    featured: ${currentProject.featured},
    date: "${currentProject.date}",
    license: ${currentProject.license ? `"${currentProject.license}"` : 'undefined'},
    requirements: ${currentProject.requirements ? `"${currentProject.requirements}"` : 'undefined'},
    architecture: ${currentProject.architecture ? `"${currentProject.architecture}"` : 'undefined'},
    installCmd: ${currentProject.installCmd ? `"${currentProject.installCmd}"` : 'undefined'},
    tags: ${JSON.stringify(currentProject.tags)},
    links: ${JSON.stringify(currentProject.links, null, 6)},
    highlights: ${JSON.stringify(currentProject.highlights, null, 6)},
    stats: ${currentProject.stats ? `"${currentProject.stats}"` : 'undefined'}
  },`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl my-8 rounded-[28px] glass-strong shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-ink dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-apple-blue" />
              {initialProject ? 'Edit application' : 'New application'}
            </h2>
            <p className="mt-1 text-[13px] text-ink-soft dark:text-white/50">
              Add a Web, iOS, Android, macOS, or AI app with links and details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center glass rounded-full p-1 text-xs">
              {([
                { id: 'form', label: 'Form', icon: null },
                { id: 'preview', label: 'Preview', icon: <Eye className="w-3.5 h-3.5" /> },
                { id: 'code', label: 'Code', icon: <Code className="w-3.5 h-3.5" /> },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1 transition ${
                    activeTab === t.id
                      ? 'bg-ink text-white dark:bg-white dark:text-ink shadow-sm'
                      : 'text-ink-soft dark:text-white/55 hover:text-ink dark:hover:text-white'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="grid place-items-center w-9 h-9 rounded-full text-ink-soft dark:text-white/55 hover:bg-black/[0.05] dark:hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'preview' && (
            <div className="max-w-md mx-auto py-6">
              <div className="text-center mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Interactive Live Card Preview
                </span>
              </div>
              <ProjectCard project={currentProject} onSelect={() => {}} />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Paste this snippet directly into <code className="text-indigo-400 font-mono">src/data/projects.ts</code>:
                </p>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                {codeSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'form' && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Row 1: Platform Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Target Platform *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {(
                    [
                      { id: 'web', label: 'Web App', icon: <Globe className="w-4 h-4" /> },
                      { id: 'ios', label: 'iOS App', icon: <AppleIcon className="w-4 h-4" /> },
                      { id: 'android', label: 'Android App', icon: <AndroidIcon className="w-4 h-4" /> },
                      { id: 'macos', label: 'macOS App', icon: <MacIcon className="w-4 h-4" /> },
                      { id: 'ai', label: 'AI / Model', icon: <Sparkles className="w-4 h-4" /> },
                      { id: 'cross-platform', label: 'Multi-Plat', icon: <Layers className="w-4 h-4" /> },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPlatform(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition ${
                        platform === item.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="mb-1">{item.icon}</div>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Title & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Application Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Chronos Habits, Zenith Mac"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Tagline (1-line hook)
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Ultra-lightweight system metrics companion"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Category, Status, Release Date, License, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Utility, Security"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:border-[#0071e3] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:border-[#0071e3] outline-none"
                  >
                    <option value="live">Live / Released</option>
                    <option value="beta">Beta / TestFlight</option>
                    <option value="in-progress">In Development</option>
                    <option value="open-source">Open Source</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Year / Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:border-[#0071e3] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    License
                  </label>
                  <input
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="e.g. MIT License"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:border-[#0071e3] outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-[#0071e3] border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Featured
                    </span>
                  </label>
                </div>
              </div>

              {/* Row 4: URLs & Links (The core of what the user requested!) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Links & Distribution Channels
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <Globe className="w-3.5 h-3.5 text-sky-500" />
                      <span>Live Web App / Product URL</span>
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://yourapp.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-400" />
                      <span>GitHub Repository URL</span>
                    </label>
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/vishwas/repo"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <AppleIcon className="w-3.5 h-3.5 text-pink-500" />
                      <span>iOS App Store / TestFlight URL</span>
                    </label>
                    <input
                      type="url"
                      value={appStore}
                      onChange={(e) => setAppStore(e.target.value)}
                      placeholder="https://apps.apple.com/app/id..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <AndroidIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Google Play Store URL</span>
                    </label>
                    <input
                      type="url"
                      value={playStore}
                      onChange={(e) => setPlayStore(e.target.value)}
                      placeholder="https://play.google.com/store/apps/details?id=..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <MacIcon className="w-3.5 h-3.5 text-slate-300" />
                      <span>macOS App / DMG Download URL</span>
                    </label>
                    <input
                      type="url"
                      value={macAppStore}
                      onChange={(e) => setMacAppStore(e.target.value)}
                      placeholder="https://github.com/.../releases/app.dmg"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Docs / Demo URL</span>
                    </label>
                    <input
                      type="url"
                      value={docs}
                      onChange={(e) => setDocs(e.target.value)}
                      placeholder="https://youtube.com/... or docs link"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Detailed Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Detailed Description (What did you build? How does it work?)
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your design choices, user problems solved, architectures implemented, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                />
              </div>

              {/* Row 5.5: System Requirements & Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    System Requirements
                  </label>
                  <input
                    type="text"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="e.g. macOS 14+ (Apple Silicon), Node.js 18+"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Architecture & Privacy Notes
                  </label>
                  <input
                    type="text"
                    value={architecture}
                    onChange={(e) => setArchitecture(e.target.value)}
                    placeholder="e.g. On-device Vision biometrics, zero telemetry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>
              </div>

              {/* Row 5.7: Terminal Build Command */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Build from Source / Terminal Command
                </label>
                <input
                  type="text"
                  value={installCmd}
                  onChange={(e) => setInstallCmd(e.target.value)}
                  placeholder="e.g. git clone https://... && bash build.command"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-[#0071e3] outline-none"
                />
              </div>

              {/* Row 6: Tech Stack Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. SwiftUI, Combine, Metal, Next.js, FastAPI, Rust"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none font-mono"
                />
              </div>

              {/* Row 7: Key Engineering Highlights (bullet points) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Key Technical Highlights (Bullet Points)
                </label>
                <div className="space-y-2 mb-2">
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-emerald-500">•</span>
                      <span className="flex-1 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                        {h}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="Add bullet (e.g. Zero-telemetry offline sync, Apple Silicon native)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Row 8: Optional Stats and Preview Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Stats / Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={stats}
                    onChange={(e) => setStats(e.target.value)}
                    placeholder="e.g. 5k+ Downloads • 4.9 ★"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Cover / Screenshot Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-[#0071e3] outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-5 border-t border-black/5 dark:border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-ink-soft dark:text-white/60 hover:bg-black/[0.05] dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-apple-blue hover:brightness-110 active:scale-[0.98] shadow-sm transition"
                >
                  {initialProject ? 'Save changes' : 'Add to studio'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
