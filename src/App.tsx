import { useState, useMemo, useEffect } from 'react';
import { Project, StudioConfig } from './types/project';
import { 
  getStoredProjects, 
  addOrUpdateProject, 
  deleteStoredProject, 
  resetProjectsToDefault, 
  getStoredConfig 
} from './utils/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsRibbon } from './components/StatsRibbon';
import { FilterBar, FilterPlatform, SortOption } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { AddProjectModal } from './components/AddProjectModal';
import { ExportCodeModal } from './components/ExportCodeModal';
import { Footer } from './components/Footer';
import { Plus, SearchX } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<StudioConfig>(getStoredConfig());
  const [selectedPlatform, setSelectedPlatform] = useState<FilterPlatform>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'open-source'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Theme
  const [isDark, setIsDark] = useState(true);

  // Load projects on mount
  useEffect(() => {
    setProjects(getStoredProjects());
    setConfig(getStoredConfig());
    
    // Check dark mode
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Add / Edit handler
  const handleSaveProject = (project: Project) => {
    const updated = addOrUpdateProject(project);
    setProjects(updated);
    if (selectedProject?.id === project.id) {
      setSelectedProject(project);
    }
    setEditingProject(null);
  };

  // Delete handler
  const handleDeleteProject = (id: string) => {
    const updated = deleteStoredProject(id);
    setProjects(updated);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  // Reset defaults handler
  const handleResetDefaults = () => {
    const updated = resetProjectsToDefault();
    setProjects(updated);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  // Calculate platform counts for tabs
  const platformCounts = useMemo(() => {
    const counts: Record<FilterPlatform, number> = {
      all: projects.length,
      web: 0,
      ios: 0,
      android: 0,
      macos: 0,
      ai: 0,
      'cross-platform': 0,
    };
    projects.forEach(p => {
      if (counts[p.platform] !== undefined) {
        counts[p.platform]++;
      }
    });
    return counts;
  }, [projects]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Platform Filter
    if (selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform);
    }

    // Status Filter
    if (statusFilter === 'live') {
      result = result.filter(p => p.status === 'live');
    } else if (statusFilter === 'open-source') {
      result = result.filter(p => p.status === 'open-source' || Boolean(p.links.github));
    }

    // Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const inTitle = p.title.toLowerCase().includes(query);
        const inTagline = p.tagline.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        const inPlatform = p.platform.toLowerCase().includes(query);
        const inCategory = p.category.toLowerCase().includes(query);
        const inTags = p.tags.some(t => t.toLowerCase().includes(query));
        return inTitle || inTagline || inDesc || inPlatform || inCategory || inTags;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.date || '').localeCompare(a.date || '');
      }
      if (sortBy === 'newest') {
        return (b.date || '').localeCompare(a.date || '');
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [projects, selectedPlatform, statusFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sticky Top Navigation */}
      <Header
        config={config}
        onOpenAddModal={() => {
          setEditingProject(null);
          setIsAddModalOpen(true);
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Studio Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          config={config}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalProjects={projects.length}
          filteredCount={filteredProjects.length}
        />

        {/* Studio Platform Metrics Ribbon */}
        <StatsRibbon projects={projects} />

        {/* Filter, Sort & View Mode Bar */}
        <FilterBar
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          platformCounts={platformCounts}
        />

        {/* Projects Showcase Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            /* Empty State */
            <div className="my-16 py-12 px-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-center max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center mb-4">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No matching projects found
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {searchQuery
                  ? `No applications matched "${searchQuery}". Try a different keyword or reset filters.`
                  : 'No projects registered for this category yet.'}
              </p>

              <div className="mt-6 flex items-center justify-center space-x-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Application</span>
                </button>
              </div>
            </div>
          ) : (
            /* Projects Grid or List */
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-3'
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer config={config} onResetDefaults={handleResetDefaults} />

      {/* Deep Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={(p) => {
          setSelectedProject(null);
          handleEditClick(p);
        }}
        onDelete={handleDeleteProject}
      />

      {/* Add / Edit Project Form Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        initialProject={editingProject}
      />

      {/* Sync Code with Git / Export Modal */}
      <ExportCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projects={projects}
      />
    </div>
  );
}
