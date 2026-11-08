import { useState, useMemo, useEffect } from 'react';
import { Project, StudioConfig } from './types/project';
import { 
  getStoredProjects, 
  addOrUpdateProject, 
  deleteStoredProject, 
  resetProjectsToDefault, 
  getStoredConfig 
} from './utils/storage';
import { DynamicIsland } from './components/DynamicIsland';
import { Aurora } from './components/Aurora';
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
    <div id="top" className="relative min-h-screen text-ink dark:text-white flex flex-col font-sans">
      <Aurora />

      {/* Floating Dynamic Island navigation */}
      <DynamicIsland
        config={config}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredCount={filteredProjects.length}
        totalProjects={projects.length}
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
        <Hero config={config} totalProjects={projects.length} />

        {/* Studio Platform Metrics Ribbon */}
        <StatsRibbon projects={projects} />

        {/* Work section */}
        <section id="work" className="scroll-mt-28 mt-16 sm:mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink dark:text-white">
                Selected Work
              </h2>
              <p className="mt-1.5 text-[15px] text-ink-soft dark:text-white/50">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                {searchQuery && <> · matching “{searchQuery}”</>}
              </p>
            </div>
          </div>

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {filteredProjects.length === 0 ? (
              /* Empty State */
              <div className="my-10 py-16 px-6 rounded-[32px] glass text-center max-w-xl mx-auto shadow-glass dark:shadow-glass-dark animate-fade-up">
                <div className="w-14 h-14 rounded-2xl bg-apple-blue/10 text-apple-blue mx-auto flex items-center justify-center mb-5">
                  <SearchX className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-ink dark:text-white">
                  No matching projects
                </h3>
                <p className="mt-2 text-[15px] text-ink-soft dark:text-white/50">
                  {searchQuery
                    ? `Nothing matched “${searchQuery}”. Try a different keyword or clear the filters.`
                    : 'No projects registered for this category yet.'}
                </p>
                <div className="mt-7 flex items-center justify-center gap-3">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-5 py-2.5 rounded-full text-[13px] font-semibold glass hover:glass-strong text-ink dark:text-white transition"
                    >
                      Clear search
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white bg-apple-blue hover:brightness-110 transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add a project
                  </button>
                </div>
              </div>
            ) : (
              /* Projects Grid or List */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'space-y-3'
                }
              >
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={(p) => setSelectedProject(p)}
                    viewMode={viewMode}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
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
