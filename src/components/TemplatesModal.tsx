import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, X as CloseIcon, Maximize2, Minimize2, ArrowLeft, FileText, Database, Globe, Mail, Lock, Bot, Check, LayoutTemplate } from 'lucide-react';
import { cn } from '../lib/utils';
import { templates } from '../data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Template categories for the left navigation
const templateCategories = [
  { id: 'web', label: 'Web Automation', icon: Globe },
  { id: 'data', label: 'Data Processing', icon: Database },
  { id: 'document', label: 'Document Handling', icon: FileText },
  { id: 'communication', label: 'Communication', icon: Mail },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'ai', label: 'AI & Recognition', icon: Bot }
];

// Debug mode support
interface DebugProps {
  isDebugMode?: boolean;
}

// Map templates to categories
const templateCategoryMap: Record<string, string[]> = {
  'web': ['login-session', 'web-scraping'],
  'data': ['database-query', 'csv-excel'],
  'document': ['pdf-extraction'],
  'communication': ['email-parsing'],
  'security': ['exception-handling'],
  'ai': ['image-recognition']
};

// Original dropdown categories
const dropdownCategories = [
  { id: 'lead-management', label: 'Lead management' },
  { id: 'sales-pipeline', label: 'Sales pipeline' },
  { id: 'marketing-campaigns', label: 'Marketing campaigns' },
  { id: 'customer-support', label: 'Customer support' },
  { id: 'data-management', label: 'Data management' },
  { id: 'project-management', label: 'Project management' },
  { id: 'tickets-incidents', label: 'Tickets & incidents' }
];

export function TemplatesModal({ isOpen, onClose, isDebugMode = false }: TemplatesModalProps & DebugProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Popular' | 'A-Z'>('Popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSidebarCategories, setSelectedSidebarCategories] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('templates');
  const modalRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleSidebarCategory = (categoryId: string) => {
    // In LibraryModal, clicking a category replaces the selection rather than toggling
    setSelectedSidebarCategories([categoryId]);
    setActiveTab('templates'); // Ensure we're in the templates tab
  };

  // clearSidebarFilters function removed as it's no longer used

  const getFilteredTemplates = () => {
    let filtered = [...templates];

    // Apply sidebar category filter
    if (selectedSidebarCategories.length > 0) {
      filtered = filtered.filter(template => 
        selectedSidebarCategories.some(categoryId => 
          templateCategoryMap[categoryId]?.includes(template.id)
        )
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply dropdown category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => {
        // Filter based on the title/description containing the category
        return template.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
               template.description.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Popular':
        // Keep the original order for now
        break;
    }

    return filtered;
  };

  if (!isOpen && !isDebugMode) return null;

  return (
    <div className={cn(
      isDebugMode ? "" : "fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    )}>
      <div 
        ref={modalRef}
        className={cn(
          "bg-white rounded-lg shadow-2xl w-full flex flex-col overflow-hidden transition-all duration-300",
          isDebugMode ? "h-[640px] max-w-5xl" : isExpanded ? "h-screen max-w-7xl" : "h-[640px] max-w-5xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 h-14 border-b border-gray-40 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-190">Templates</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-gray-20 transition-colors"
              title={isExpanded ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isExpanded ? 
                <Minimize2 className="w-4 h-4 text-gray-140" /> : 
                <Maximize2 className="w-4 h-4 text-gray-140" />
              }
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-20 transition-colors"
            >
              <CloseIcon className="w-4 h-4 text-gray-140" />
            </button>
          </div>
        </div>

        {currentView === 'list' ? (
          <>
            <div className="flex flex-1 overflow-hidden">
              {/* Left Navigation Sidebar */}
              <div className="w-56 border-r border-gray-40 bg-gray-10 flex flex-col overflow-y-auto">
                <nav className="py-2">
                  <button
                    onClick={() => {
                      setActiveTab('templates');
                      setSelectedSidebarCategories([]);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors",
                      activeTab === 'templates' && selectedSidebarCategories.length === 0
                        ? "bg-brand-10 text-brand-80"
                        : "text-gray-130 hover:text-gray-150 hover:bg-gray-20"
                    )}
                  >
                    <LayoutTemplate className={cn(
                      "w-4 h-4",
                      activeTab === 'templates' && selectedSidebarCategories.length === 0 ? "text-brand-80" : "text-gray-110"
                    )} />
                    <span>All templates</span>
                  </button>
                  
                  {/* Categories header removed */}
                  
                  {templateCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => toggleSidebarCategory(category.id)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors",
                        selectedSidebarCategories.includes(category.id)
                          ? "bg-brand-10 text-brand-80"
                          : "text-gray-130 hover:text-gray-150 hover:bg-gray-20"
                      )}
                    >
                      <category.icon className={cn(
                        "w-4 h-4",
                        selectedSidebarCategories.includes(category.id) 
                          ? "text-brand-80" 
                          : "text-gray-110"
                      )} />
                      <span>{category.label}</span>
                    </button>
                  ))}
                  
                  {/* Clear filters button removed */}
                </nav>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search and filter controls - matching LibraryModal layout */}
                <div className="p-3 border-b border-gray-40 bg-white" data-component-name="TemplatesModal">
                  <div className="flex gap-2" data-component-name="TemplatesModal">
                    {/* Sort dropdown on the left */}
                    <div ref={sortRef} className="relative">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                          "text-gray-140 hover:text-brand-80"
                        )}
                        data-component-name="TemplatesModal"
                      >
                        <span>{sortBy}</span>
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          showSortDropdown ? "transform rotate-180" : "",
                          "text-gray-110 group-hover:text-brand-80"
                        )} />
                      </button>
                      
                      {showSortDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">
                          {(['Popular', 'A-Z'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSortBy(type);
                                setShowSortDropdown(false);
                              }}
                              className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                            >
                              {sortBy === type && (
                                <Check className="w-4 h-4 text-brand-80 mr-1" />
                              )}
                              Sort by {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category filter on the left */}
                    <div ref={categoryRef} className="relative">
                      <button
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                          "text-gray-140 hover:text-brand-80",
                          selectedCategory !== 'All' && !showCategoryDropdown && "text-brand-80"
                        )}
                        data-component-name="TemplatesModal"
                      >
                        <span>{selectedCategory}</span>
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          showCategoryDropdown ? "transform rotate-180" : "",
                          "text-gray-110 group-hover:text-brand-80"
                        )} />
                      </button>
                      
                      {showCategoryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">
                          <button
                            onClick={() => {
                              setSelectedCategory('All');
                              setShowCategoryDropdown(false);
                            }}
                            className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                          >
                            {selectedCategory === 'All' && (
                              <Check className="w-4 h-4 text-brand-80 mr-1" />
                            )}
                            All Categories
                          </button>
                          {dropdownCategories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.label);
                                setShowCategoryDropdown(false);
                              }}
                              className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                            >
                              {selectedCategory === category.label && (
                                <Check className="w-4 h-4 text-brand-80 mr-1" />
                              )}
                              {category.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Search bar on the right */}
                    <div className="relative ml-auto max-w-[400px] flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-110 h-4 w-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search templates"
                        className={cn(
                          "w-full pl-9 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-80 focus:border-transparent bg-white/90",
                          searchQuery ? "pr-8" : "pr-3"
                        )}
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-110 hover:text-gray-140 transition-colors focus:outline-none"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Template Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredTemplates().map((template, index) => (
                    <div 
                      key={index}
                      className="border border-gray-30 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setCurrentView('details');
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3" data-component-name="TemplatesModal">
                        {template.usedActions.slice(0, 3).map((action: { icon: React.ElementType; color: string }, actionIndex: number) => (
                          <div
                            key={actionIndex}
                            className="p-1.5 rounded-lg bg-gray-20"
                          >
                            <action.icon className={cn("w-4 h-4", action.color)} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start justify-between mb-1" data-component-name="TemplatesModal">
                        <div>
                          <h3 className="font-medium text-gray-190">{template.title}</h3>
                          {/* Template ID removed */}
                        </div>
                        {/* Template badge removed */}
                      </div>
                      <p className="text-xs text-gray-130 flex-grow mb-3" data-component-name="TemplatesModal">{template.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-110">{template.author}</span>
                        </div>
                        {/* "Use template" button removed */}
                      </div>
                    </div>
                  ))}
                  </div>
                  
                  {getFilteredTemplates().length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-130">No templates found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border-b border-gray-40 flex items-center">
              <button 
                onClick={() => setCurrentView('list')}
                className="mr-3 p-1 rounded-full hover:bg-gray-20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-130" />
              </button>
              <h3 className="text-lg font-medium text-gray-190">
                {selectedTemplate?.title}
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4" data-component-name="TemplatesModal">
                    {selectedTemplate?.usedActions.map((action: { icon: React.ElementType; color: string }, index: number) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-gray-20 flex items-center gap-2"
                      >
                        <action.icon className={cn("w-5 h-5", action.color)} />
                        <span className="text-sm text-gray-150">Action {index + 1}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-190 mb-1">{selectedTemplate?.title}</h2>
                      {/* Template ID removed */}
                    </div>
                    {/* Template badge removed */}
                  </div>
                  
                  <p className="text-sm text-gray-130 mb-6" data-component-name="TemplatesModal">{selectedTemplate?.description}</p>
                  
                  <div className="border-t border-b border-gray-40 py-4 my-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">
                        {selectedTemplate?.author.substring(0, 2)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-190">{selectedTemplate?.author}</p>
                        <p className="text-xs text-gray-110">Template creator</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors">
                      Use this template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}