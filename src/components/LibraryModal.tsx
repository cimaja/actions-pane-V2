import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, X as CloseIcon, Maximize2, Minimize2, Check, Plus, FileText, CheckCircle, Image } from 'lucide-react';

import CustomActionsIcon from './icons/CustomActionsIcon';
import UICollectionsIcon from './icons/UICollectionsIcon';
import { getConnectorLogoUrl } from '../data/connectorLogos';
import { cn } from '../lib/utils';
import { useActions } from '../hooks/useActions';
import { useActionsStore } from '../store/actionsStore';
import { ModuleDetails } from './ModuleDetails';
import type { ModuleWithCategory } from '../types/library';
import { mainNavItems } from '../data/navigation';

// ConnectorLogo component for handling connector logos
interface ConnectorLogoProps {
  name: string;
}

const ConnectorLogo: React.FC<ConnectorLogoProps> = ({ name }) => {
  const [hasError, setHasError] = useState(false);
  
  // Get the connector logo URL (now always returns a valid URL)
  const logoUrl = getConnectorLogoUrl(name);
  
  // Debug logging
  console.log(`LibraryModal ConnectorLogo for '${name}', URL: ${logoUrl}`);
  
  return (
    <div className="flex-shrink-0 w-7 h-7 overflow-hidden rounded-lg flex items-center justify-center bg-white">
      {!hasError ? (
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
          onError={() => {
            console.error(`Image load error for connector: ${name}, URL: ${logoUrl}`);
            setHasError(true);
          }}
        />
      ) : (
        <div className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-xs font-medium">
          {name.substring(0, 2)}
        </div>
      )}
    </div>
  );
};

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: string | null;
  initialTab?: Tab;
}

type Tab = 'core' | 'connectors' | 'custom-actions' | 'ui-collections';
type SortType = 'name' | 'author' | 'category' | 'publisher';
type View = 'list' | 'details';

// Core categories for the core tab
const coreCategories = [
  { id: 'files', label: 'Files' },
  { id: 'interaction', label: 'Interaction' },
  { id: 'system', label: 'System' },
  { id: 'logic', label: 'Logic' },
  { id: 'advanced', label: 'Advanced' }
];

// Define the connector category type
type ConnectorCategory = {
  id: string;
  label: string;
  matches: string[];
  connectors: string[];
};

// Connector functional categories mapped to actual connector names
const connectorCategories: ConnectorCategory[] = [
  { 
    id: 'document-management', 
    label: 'Document Management', 
    matches: ['Document Management', 'File Storage', 'PDF', 'SharePoint', 'OneDrive', 'Document', 'Box', 'Dropbox', 'Adobe', 'Sign'],
    connectors: ['Adobe', 'Adobe Sign', 'Box', 'Dropbox', 'OneDrive for Business', 'SharePoint']
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    matches: ['Communication', 'Email', 'Messaging', 'Teams', 'Chat', 'Outlook', 'LinkedIn', 'Social'],
    connectors: ['Microsoft Teams', 'Office 365 Outlook', 'LinkedIn', 'Slack', 'Twitter']
  },
  { 
    id: 'data-storage', 
    label: 'Data Storage', 
    matches: ['Cloud Storage', 'Database', 'Storage', 'SQL', 'Key Vault', 'Security', 'Azure Blob', 'Azure Key', 'Data'],
    connectors: ['Azure Blob Storage', 'Azure Key Vault', 'SQL Server', 'Azure SQL', 'MySQL', 'Key Vault']
  },
  { 
    id: 'productivity', 
    label: 'Productivity', 
    matches: ['Productivity', 'Office', 'Calendar', 'Tasks', 'Forms', 'Excel', 'Word', 'OneNote', 'Planner', 'To Do', 'Google', 'Sheets', 'SurveyMonkey'],
    connectors: ['Microsoft Forms', 'Microsoft To Do', 'Google Calendar', 'Google Sheets', 'Google Tasks', 'OneNote', 'Office 365 Outlook']
  },
  { 
    id: 'developer-tools', 
    label: 'Developer Tools', 
    matches: ['Developer Tools', 'DevOps', 'Code', 'GitHub', 'Jira', 'CRM', 'ERP', 'Salesforce', 'SAP', 'Azure DevOps'],
    connectors: ['GitHub', 'Azure DevOps', 'Jira', 'Salesforce', 'SAP']
  },
  { 
    id: 'media', 
    label: 'Media', 
    matches: ['Media', 'Maps', 'AI', 'Analytics', 'BI', 'Bing Maps', 'Azure OpenAI', 'Power BI', 'Bitly', 'OpenAI', 'Map', 'Vision'],
    connectors: ['Azure OpenAI', 'Bing Maps', 'Power BI', 'Bitly', 'Azure Maps', 'Azure Computer Vision', 'Computer Vision', 'OpenAI']
  }
];

const LibraryModal = ({ isOpen, onClose, initialCategory, initialTab = 'core' }: LibraryModalProps) => {
  console.log('LibraryModal opening with initialTab:', initialTab, 'initialCategory:', initialCategory);
  
  // Initialize the active tab with the initialTab prop
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  
  // Update activeTab when initialTab changes
  useEffect(() => {
    if (isOpen && initialTab) {
      console.log('Setting activeTab to initialTab:', initialTab);
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  
  // Listen for the library-select-module custom event
  useEffect(() => {
    const handleSelectModule = (event: CustomEvent) => {
      const module = event.detail;
      if (module) {
        // Set the selected module
        setSelectedModule({
          ...module,
          category: module.category || (activeTab === 'core' ? 'Core' : 'Connectors')
        });
        // Switch to details view
        setCurrentView('details');
      }
    };

    // Add event listener
    window.addEventListener('library-select-module', handleSelectModule as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('library-select-module', handleSelectModule as EventListener);
    };
  }, [activeTab]);
  
  // Debug effect to log when active tab changes
  useEffect(() => {
    console.log('%c LibraryModal Debug', 'background: #0000ff; color: white; font-weight: bold');
    console.log('Active tab changed to:', activeTab);
    console.log('Source name will be:', activeTab === 'core' ? 'PAD Action' : 'Connector');
    console.log('Is activeTab === "core"?', activeTab === 'core');
    console.log('Type of activeTab:', typeof activeTab);
  }, [activeTab]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortType, setSortType] = useState<SortType>('name');
  
  // Update sort type when active tab changes
  useEffect(() => {
    if (activeTab === 'core') {
      setSortType('category');
    } else if (activeTab === 'connectors') {
      setSortType('name');
    } else if (activeTab === 'custom-actions') {
      setSortType('name');
    }
  }, [activeTab]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedConnectorCategories, setSelectedConnectorCategories] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedModule, setSelectedModule] = useState<ModuleWithCategory | null>(null);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const sources = useActions({ sourceName: activeTab === 'core' ? 'PAD Action' : 'Connector' });
  const { installCategory, uninstallCategory, isInstalled } = useActionsStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedConnectorCategories([]);
  };

  const toggleConnectorCategory = (categoryId: string) => {
    setSelectedConnectorCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const modules = useMemo(() => {
    if (activeTab !== 'core' && activeTab !== 'connectors') return [];

    const modulesWithCategories: ModuleWithCategory[] = sources
      .flatMap(source => source.categories.map(category => 
        category.modules.map(module => ({
          ...module,
          categoryName: category.name
        }))
      ))
      .flat();

    return modulesWithCategories;
  }, [sources, activeTab]);

  const filteredAndSortedModules = useMemo(() => {
    // Make sure we have modules to work with
    if (!modules || modules.length === 0) {
      console.log('No modules available to filter');
      return [];
    }
    
    let result = [...modules];
    console.log('Initial modules count:', result.length);
    
    // Filter by search query first
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(module => 
        module.name.toLowerCase().includes(query) ||
        module.categoryName.toLowerCase().includes(query) ||
        module.submodules.some(sub => 
          sub.name.toLowerCase().includes(query) ||
          sub.actions.some(action => action.toLowerCase().includes(query))
        )
      );
      console.log('After search query filtering:', result.length);
    }

    // Enhanced debugging for connector filtering
    console.log('%c CONNECTOR FILTERING DEBUG', 'background: #ff0000; color: white; font-weight: bold');
    console.log('Active tab:', activeTab);
    console.log('Selected connector categories:', selectedConnectorCategories);
    
    // Apply category filtering
    if (activeTab === 'connectors' && selectedConnectorCategories.length > 0) {
      console.log('%c CONNECTOR FILTERING - DETAILED DEBUG', 'background: #ff0000; color: white; font-weight: bold');
      console.log('Filtering connectors by categories:', selectedConnectorCategories);
      console.log('Modules before filtering:', result.length);
      
      // Create a new filtered array
      const filteredResult: ModuleWithCategory[] = [];
      
      // Process each module
      for (const module of result) {
        const moduleName = module.name;
        let shouldInclude = false;
        
        // Check against each selected category
        for (const categoryId of selectedConnectorCategories) {
          const category = connectorCategories.find(c => c.id === categoryId);
          if (!category) continue;
          
          // Case 1: Direct match with connector names list
          const directMatch = category.connectors.some(connectorName => 
            moduleName === connectorName || 
            moduleName.includes(connectorName) || 
            connectorName.includes(moduleName)
          );
          
          // Case 2: Pattern matching with keywords
          const patternMatch = category.matches.some(pattern => 
            moduleName.toLowerCase().includes(pattern.toLowerCase())
          );
          
          // Special case for Media category
          const isMediaCategory = categoryId === 'media';
          const mediaSpecificMatch = isMediaCategory && (
            moduleName.includes('OpenAI') || 
            moduleName.includes('Map') || 
            moduleName.includes('Vision') ||
            moduleName.includes('Analytics') ||
            moduleName.includes('Media') ||
            moduleName.includes('AI') ||
            moduleName.includes('Bitly') ||
            moduleName.toLowerCase().includes('computer vision') ||
            moduleName === 'Power BI'
          );
          
          // If any match criteria is met
          if (directMatch || patternMatch || mediaSpecificMatch) {
            shouldInclude = true;
            console.log(`✅ ${moduleName} matches category: ${category.label}`);
            break; // No need to check other categories
          }
        }
        
        if (shouldInclude) {
          filteredResult.push(module);
          console.log(`✅ INCLUDE: ${moduleName}`);
        } else {
          console.log(`❌ EXCLUDE: ${moduleName}`);
        }
      }
      
      // Replace the result with our filtered list
      console.log(`Category filtering: ${result.length} -> ${filteredResult.length} connectors`);
      result = filteredResult;
      
      console.log('Modules after filtering:', result.length);
    } else if (activeTab === 'core' && selectedCategories.length > 0) {
      // Filter core actions by selected categories
      result = result.filter(module => 
        selectedCategories.some(category => 
          module.categoryName.toLowerCase() === category
        )
      );
    }

    if (sortType === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'author' || sortType === 'publisher') {
      result.sort((a, b) => {
        const authorA = a.publisher || '';
        const authorB = b.publisher || '';
        const authorCompare = authorA.localeCompare(authorB);
        return authorCompare !== 0 ? authorCompare : a.name.localeCompare(b.name);
      });
    } else if (sortType === 'category') {
      result.sort((a, b) => {
        const categoryCompare = a.categoryName.localeCompare(b.categoryName);
        return categoryCompare !== 0 ? categoryCompare : a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [modules, searchQuery, selectedCategories, selectedConnectorCategories, activeTab, sortType]);

  const handleModuleClick = (module: ModuleWithCategory) => {
    setSelectedModule(module);
    setCurrentView('details');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedModule(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className={cn(
          "bg-white rounded-lg shadow-2xl w-full flex flex-col overflow-hidden transition-all duration-300",
          isExpanded ? "h-screen max-w-7xl" : "h-[640px] max-w-5xl"
        )}
      >
        {currentView === 'list' ? (
          <>
            <div className="px-4 h-14 border-b border-gray-40 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-190">Library</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-gray-20 transition-colors"
                  title={isExpanded ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4 text-gray-140" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-140" />
                  )}
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-20 transition-colors"
                >
                  <CloseIcon className="w-4 h-4 text-gray-140" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left Navigation Sidebar */}
              <div className="w-56 border-r border-gray-40 bg-gray-10 flex flex-col overflow-y-auto">
                <nav className="py-2">
                  {mainNavItems.filter(item => item.id !== 'favorites').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as Tab)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors",
                        activeTab === item.id
                          ? "bg-brand-10 text-brand-80"
                          : "text-gray-130 hover:text-gray-150 hover:bg-gray-20"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4",
                        activeTab === item.id ? "text-brand-80" : "text-gray-110"
                      )} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveTab('custom-actions')}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors",
                      activeTab === 'custom-actions'
                        ? "bg-brand-10 text-brand-80"
                        : "text-gray-130 hover:text-gray-150 hover:bg-gray-20"
                    )}
                  >
                    <CustomActionsIcon className={cn(
                      "w-4 h-4",
                      activeTab === 'custom-actions' ? "text-brand-80" : "text-gray-110"
                    )} />
                    <span>Custom actions</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('ui-collections')}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors",
                      activeTab === 'ui-collections'
                        ? "bg-brand-10 text-brand-80"
                        : "text-gray-130 hover:text-gray-150 hover:bg-gray-20"
                    )}
                  >
                    <UICollectionsIcon className={cn(
                      "w-4 h-4",
                      activeTab === 'ui-collections' ? "text-brand-80" : "text-gray-110"
                    )} />
                    <span>UI collections</span>
                  </button>
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">

                <div className="p-3 border-b border-gray-40 bg-white" data-component-name="LibraryModal">
                  <div className="flex gap-2" data-component-name="LibraryModal">
                    <div ref={sortRef} className="relative">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                          "text-gray-140 hover:text-brand-80"
                        )}
                        data-component-name="LibraryModal"
                      >
                        <span data-component-name="LibraryModal">
                          {sortType === 'name' && 'Name'}
                          {sortType === 'author' && 'Author'}
                          {sortType === 'publisher' && 'Publisher'}
                          {sortType === 'category' && 'Category'}
                        </span>
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          showSortDropdown ? "transform rotate-180" : "",
                          "text-gray-110 group-hover:text-brand-80"
                        )} />
                      </button>
                      
                      {showSortDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">
                          {/* Sort options based on active tab */}
                          {activeTab === 'core' ? (
                            <>
                              <button
                                onClick={() => {
                                  setSortType('category');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Category
                              </button>
                              <button
                                onClick={() => {
                                  setSortType('name');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Name
                              </button>
                            </>
                          ) : activeTab === 'connectors' ? (
                            <>
                              <button
                                onClick={() => {
                                  setSortType('name');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Name
                              </button>
                              <button
                                onClick={() => {
                                  setSortType('publisher');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Publisher
                              </button>
                            </>
                          ) : activeTab === 'custom-actions' ? (
                            <>
                              <button
                                onClick={() => {
                                  setSortType('name');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Name
                              </button>
                              <button
                                onClick={() => {
                                  setSortType('author');
                                  setShowSortDropdown(false);
                                }}
                                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2 text-gray-140 hover:text-gray-190 hover:bg-gray-20 w-full"
                              >
                                Sort by Author
                              </button>
                            </>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {/* Categories filter for core and connectors tabs */}
                    {(activeTab === 'core' || activeTab === 'connectors') && (
                      <div ref={filterRef} className="relative">
                        <button
                          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                          className={cn(
                            "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                            "text-gray-140 hover:text-brand-80",
                            selectedCategories.length > 0 && !showFilterDropdown && "text-brand-80"
                          )}
                          data-component-name="LibraryModal"
                        >
                          <span>
                            {activeTab === 'core' ? (
                              selectedCategories.length === 0 
                                ? "All categories" 
                                : `${selectedCategories.length} selected`
                            ) : (
                              selectedConnectorCategories.length === 0
                                ? "All categories" 
                                : `${selectedConnectorCategories.length} selected`
                            )}
                          </span>
                          <ChevronDown className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            showFilterDropdown ? "transform rotate-180" : "",
                            "text-gray-110 group-hover:text-brand-80"
                          )} />
                        </button>
                        
                        {showFilterDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">
                            <div className="px-3 py-2 border-b border-gray-30">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-190">Categories</h3>
                                {((activeTab === 'core' && selectedCategories.length > 0) || 
                                  (activeTab === 'connectors' && selectedConnectorCategories.length > 0)) && (
                                  <button
                                    onClick={clearFilters}
                                    className="text-xs text-brand-80 hover:underline"
                                  >
                                    Clear all
                                  </button>
                                )}
                              </div>
                            </div>
                             <div className="py-1">
                              {activeTab === 'core' ? (
                                // Core action categories
                                coreCategories.map((category) => (
                                  <button
                                    key={category.id}
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full px-3 py-2 flex items-center hover:bg-gray-20"
                                  >
                                    <div className={cn(
                                      "w-4 h-4 rounded border flex items-center justify-center mr-2",
                                      selectedCategories.includes(category.id)
                                        ? "bg-brand-80 border-brand-80"
                                        : "border-gray-70"
                                    )}>
                                      <Check className={cn(
                                        "w-3 h-3 text-white",
                                        selectedCategories.includes(category.id) ? "opacity-100" : "opacity-0"
                                      )} />
                                    </div>
                                    <span className="text-sm text-gray-150">{category.label}</span>
                                  </button>
                                ))
                              ) : (
                                // Connector categories
                                <>
                                  {connectorCategories.map((category) => (
                                    <button
                                      key={category.id}
                                      onClick={() => toggleConnectorCategory(category.id)}
                                      className="w-full px-3 py-2 flex items-center hover:bg-gray-20"
                                    >
                                      <div className={cn(
                                        "w-4 h-4 rounded border flex items-center justify-center mr-2",
                                        selectedConnectorCategories.includes(category.id)
                                          ? "bg-brand-80 border-brand-80"
                                          : "border-gray-70"
                                      )}>
                                        <Check className={cn(
                                          "w-3 h-3 text-white",
                                          selectedConnectorCategories.includes(category.id) ? "opacity-100" : "opacity-0"
                                        )} />
                                      </div>
                                      <span className="text-sm text-gray-150">{category.label}</span>
                                    </button>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="relative ml-auto max-w-[400px] flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-110 h-4 w-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${activeTab === 'core' ? 'core' : (activeTab === 'connectors' ? 'connectors' : (activeTab === 'custom-actions' ? 'custom actions' : 'UI collections'))}...`}
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

                <div className="flex-1 overflow-y-auto p-3 bg-white flex flex-col" data-component-name="LibraryModal">
              {activeTab === 'core' || activeTab === 'connectors' ? (
                sortType === 'name' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredAndSortedModules?.map(module => (
                      <div
                        key={`${module.categoryName}-${module.name}`}
                        onClick={() => handleModuleClick(module)}
                        className="group relative bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                      >
                        <div className="px-3 py-2 flex items-center gap-3">
                          {activeTab === 'connectors' ? (
                            <ConnectorLogo name={module.name} />
                          ) : (
                            <div className={cn(
                              "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                              module.color
                            )}>
                              <module.icon className="w-4 h-4" />
                            </div>
                          )}
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-medium text-gray-190 truncate">
                                  {module.name}
                                </p>
                                {sortType === 'name' && (
                                  <p className="text-[11px] text-gray-130 truncate mt-0.5">
                                    {activeTab === 'connectors' ? (module.publisher || module.categoryName) : module.categoryName}
                                  </p>
                                )}
                              </div>
                              {isInstalled(`${module.categoryName}-${module.name}`) && (
                                <div 
                                  className="relative w-5 h-5 flex items-center justify-center rounded-full bg-green-50"
                                  title="Installed"
                                >
                                  <Check className="w-3.5 h-3.5 text-green-600" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredAndSortedModules && Object.entries(
                      filteredAndSortedModules.reduce((acc, module) => {
                        let categoryKey;
                        
                        if (activeTab === 'connectors') {
                          // For connectors, use Microsoft or Third-party Services as category
                          categoryKey = module.publisher === 'Microsoft' ? 'Microsoft' : 'Third-party Services';
                        } else {
                          // For core actions, use the original category name
                          categoryKey = module.categoryName;
                        }
                        
                        if (!acc[categoryKey]) {
                          acc[categoryKey] = [];
                        }
                        acc[categoryKey].push(module);
                        return acc;
                      }, {} as Record<string, ModuleWithCategory[]>)
                    ).map(([category, modules]) => (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-190 mb-3">{category}</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {modules.map(module => (
                            <div
                              key={`${module.categoryName}-${module.name}`}
                              onClick={() => handleModuleClick(module)}
                              className="group relative bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                            >
                              <div className="px-3 py-2 flex items-center gap-3">
                                {/* Always use ConnectorLogo for connectors */}
                                {activeTab === 'connectors' ? (
                                  <ConnectorLogo name={module.name} />
                                ) : (
                                  <div className={cn(
                                    "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                                    module.color
                                  )}>
                                    <module.icon className="w-4 h-4" />
                                  </div>
                                )}
                                
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[13px] font-medium text-gray-190 truncate">
                                        {module.name}
                                      </p>
                                      {activeTab === 'connectors' && (
                                        <p className="text-[11px] text-gray-130 truncate mt-0.5">
                                          {module.publisher || module.categoryName}
                                        </p>
                                      )}
                                    </div>
                                    {isInstalled(`${module.categoryName}-${module.name}`) && (
                                      <div 
                                        className="relative w-5 h-5 flex items-center justify-center rounded-full bg-green-50"
                                        title="Installed"
                                      >
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'custom-actions' ? (
                <div className="flex-1 overflow-y-auto">
                  <div className="mb-4">
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Sample Custom Action 1 */}
                      <div 
                        className="bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                        onClick={() => {
                          setSelectedModule({
                            name: 'Format JSON',
                            categoryName: 'Data Processing',
                            color: 'bg-purple-100',
            icon: Plus,
                            submodules: [],
                            description: 'Format JSON data with proper indentation and structure. This custom action helps you clean up and validate JSON data for better readability and debugging.',
                            publisher: 'Alex Johnson',
                            lastUpdated: 'Mar 24, 2025',
                            documentationUrl: '#',
                            size: '132 MB'
                          });
                          setCurrentView('details');
                        }}
                      >
                        <div className="px-3 py-2.5 flex items-center gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-purple-100">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                              <path d="M13 2.00423C14.5977 2.00423 15.9037 3.25315 15.994 4.82327L15.999 4.999L18.25 5C19.1172 5 19.837 5.63072 19.9758 6.45858L19.9942 6.60663L20 6.75018L19.9991 10.5012L18.0015 10.5013C17.2579 10.5013 16.6353 11.0445 16.5215 11.7403L16.5062 11.8725L16.5015 12.0013C16.5015 12.7449 17.0446 13.3675 17.7405 13.4813L17.8727 13.4965L18.0014 13.5013L19.9991 13.5012L20 17.2526C20 18.1708 19.2929 18.9238 18.3934 18.9968L18.2499 19.0026L15.999 19.002L15.9949 19.1747C15.9106 20.6305 14.7881 21.8078 13.3567 21.9774L13.1763 21.9933L13 21.9984C11.4023 21.9984 10.0963 20.7495 10.0051 19.1779L10 19.002L7.75 19.0026C6.88283 19.0026 6.16298 18.3719 6.02417 17.5443L6.0058 17.3963L6 17.2528L5.999 15.001L5.836 14.9962C4.38017 14.9119 3.20285 13.7894 3.03326 12.3581L3.01736 12.1776L3.01227 12.0013C3.01227 10.4036 4.26119 9.09765 5.83593 9.0064L5.999 9.001L6 6.75C6 5.88283 6.63072 5.16298 7.45831 5.02418L7.60631 5.0058L7.74981 5L9.999 4.999L10.0051 4.82796C10.0894 3.37214 11.2119 2.19482 12.6432 2.02523L12.8237 2.00933L13 2.00423ZM13 3.50423C12.2203 3.50423 11.5795 4.09912 11.5069 4.86039L11.5 5.00497L11.4985 6.49904L7.75 6.5C7.63165 6.5 7.53251 6.58223 7.5066 6.69279L7.5 6.75018L7.49909 10.5012L6.01227 10.5013C5.18384 10.5013 4.51227 11.1729 4.51227 12.0013C4.51227 12.781 5.10716 13.4218 5.86775 13.4944L6.01219 13.5013L7.49909 13.5012L7.5 17.2526C7.5 17.371 7.58223 17.4701 7.69261 17.496L7.7499 17.5026L11.4985 17.5021L11.5 18.9984C11.5 19.8268 12.1716 20.4984 13 20.4984C13.7797 20.4984 14.4204 19.9035 14.4931 19.1434L14.5 18.9991L14.4985 17.5021L18.25 17.5026C18.3683 17.5026 18.4675 17.4204 18.4934 17.3101L18.5 17.2528L18.499 15L17.9762 15.0009L17.7968 14.9944C16.2855 14.8922 15.0927 13.6769 15.0068 12.1532L15.0019 11.976L15.0084 11.7967C15.1105 10.2854 16.3258 9.09259 17.827 9.00631L18.0014 9.00131L18.499 9.001L18.5 6.75C18.5 6.65532 18.4178 6.55618 18.3072 6.53027L18.25 6.52368L14.4985 6.52318L14.5 5.00423C14.5 4.17581 13.8284 3.50423 13 3.50423Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-gray-190 truncate">Format JSON</p>
                            <p className="text-[11px] text-gray-130 truncate mt-0.5" data-component-name="LibraryModal">John Smith</p>
                          </div>
                          {/* Add installed indicator for Format JSON */}
                          {isInstalled('Custom actions-Format JSON') && (
                            <div 
                              className="relative w-5 h-5 flex items-center justify-center rounded-full bg-green-50"
                              title="Installed"
                            >
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Sample Custom Action 2 */}
                      <div 
                        className="bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                        onClick={() => {
                          setSelectedModule({
                            name: 'Generate Report',
                            categoryName: 'Document Generation',
                            color: 'bg-purple-100',
            icon: FileText,
                            submodules: [],
                            description: 'Generate professional reports from your data. This custom action helps you create PDF, Excel, or Word documents with customizable templates and formatting options.',
                            publisher: 'Maria Rodriguez',
                            lastUpdated: 'Mar 22, 2025',
                            documentationUrl: '#',
                            size: '245 MB'
                          });
                          setCurrentView('details');
                        }}
                      >
                        <div className="px-3 py-2.5 flex items-center gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-purple-100">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                              <path d="M13 2.00423C14.5977 2.00423 15.9037 3.25315 15.994 4.82327L15.999 4.999L18.25 5C19.1172 5 19.837 5.63072 19.9758 6.45858L19.9942 6.60663L20 6.75018L19.9991 10.5012L18.0015 10.5013C17.2579 10.5013 16.6353 11.0445 16.5215 11.7403L16.5062 11.8725L16.5015 12.0013C16.5015 12.7449 17.0446 13.3675 17.7405 13.4813L17.8727 13.4965L18.0014 13.5013L19.9991 13.5012L20 17.2526C20 18.1708 19.2929 18.9238 18.3934 18.9968L18.2499 19.0026L15.999 19.002L15.9949 19.1747C15.9106 20.6305 14.7881 21.8078 13.3567 21.9774L13.1763 21.9933L13 21.9984C11.4023 21.9984 10.0963 20.7495 10.0051 19.1779L10 19.002L7.75 19.0026C6.88283 19.0026 6.16298 18.3719 6.02417 17.5443L6.0058 17.3963L6 17.2528L5.999 15.001L5.836 14.9962C4.38017 14.9119 3.20285 13.7894 3.03326 12.3581L3.01736 12.1776L3.01227 12.0013C3.01227 10.4036 4.26119 9.09765 5.83593 9.0064L5.999 9.001L6 6.75C6 5.88283 6.63072 5.16298 7.45831 5.02418L7.60631 5.0058L7.74981 5L9.999 4.999L10.0051 4.82796C10.0894 3.37214 11.2119 2.19482 12.6432 2.02523L12.8237 2.00933L13 2.00423ZM13 3.50423C12.2203 3.50423 11.5795 4.09912 11.5069 4.86039L11.5 5.00497L11.4985 6.49904L7.75 6.5C7.63165 6.5 7.53251 6.58223 7.5066 6.69279L7.5 6.75018L7.49909 10.5012L6.01227 10.5013C5.18384 10.5013 4.51227 11.1729 4.51227 12.0013C4.51227 12.781 5.10716 13.4218 5.86775 13.4944L6.01219 13.5013L7.49909 13.5012L7.5 17.2526C7.5 17.371 7.58223 17.4701 7.69261 17.496L7.7499 17.5026L11.4985 17.5021L11.5 18.9984C11.5 19.8268 12.1716 20.4984 13 20.4984C13.7797 20.4984 14.4204 19.9035 14.4931 19.1434L14.5 18.9991L14.4985 17.5021L18.25 17.5026C18.3683 17.5026 18.4675 17.4204 18.4934 17.3101L18.5 17.2528L18.499 15L17.9762 15.0009L17.7968 14.9944C16.2855 14.8922 15.0927 13.6769 15.0068 12.1532L15.0019 11.976L15.0084 11.7967C15.1105 10.2854 16.3258 9.09259 17.827 9.00631L18.0014 9.00131L18.499 9.001L18.5 6.75C18.5 6.65532 18.4178 6.55618 18.3072 6.53027L18.25 6.52368L14.4985 6.52318L14.5 5.00423C14.5 4.17581 13.8284 3.50423 13 3.50423Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-gray-190 truncate">Generate Report</p>
                            <p className="text-[11px] text-gray-130 truncate mt-0.5" data-component-name="LibraryModal">Maria Rodriguez</p>
                          </div>
                          {/* Add installed indicator for Generate Report */}
                          {isInstalled('Custom actions-Generate Report') && (
                            <div 
                              className="relative w-5 h-5 flex items-center justify-center rounded-full bg-green-50"
                              title="Installed"
                            >
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Sample Custom Action 3 */}
                      <div 
                        className="bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                        onClick={() => {
                          setSelectedModule({
                            name: 'Validate Form Data',
                            categoryName: 'Input Validation',
                            color: 'bg-purple-100',
            icon: CheckCircle,
                            submodules: [],
                            description: 'Validate user input data against predefined rules and formats. This custom action helps ensure data integrity and prevent errors by checking input against validation rules.',
                            publisher: 'David Chen',
                            lastUpdated: 'Mar 20, 2025',
                            documentationUrl: '#',
                            size: '98 MB'
                          });
                          setCurrentView('details');
                        }}
                      >
                        <div className="px-3 py-2.5 flex items-center gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-purple-100">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                              <path d="M13 2.00423C14.5977 2.00423 15.9037 3.25315 15.994 4.82327L15.999 4.999L18.25 5C19.1172 5 19.837 5.63072 19.9758 6.45858L19.9942 6.60663L20 6.75018L19.9991 10.5012L18.0015 10.5013C17.2579 10.5013 16.6353 11.0445 16.5215 11.7403L16.5062 11.8725L16.5015 12.0013C16.5015 12.7449 17.0446 13.3675 17.7405 13.4813L17.8727 13.4965L18.0014 13.5013L19.9991 13.5012L20 17.2526C20 18.1708 19.2929 18.9238 18.3934 18.9968L18.2499 19.0026L15.999 19.002L15.9949 19.1747C15.9106 20.6305 14.7881 21.8078 13.3567 21.9774L13.1763 21.9933L13 21.9984C11.4023 21.9984 10.0963 20.7495 10.0051 19.1779L10 19.002L7.75 19.0026C6.88283 19.0026 6.16298 18.3719 6.02417 17.5443L6.0058 17.3963L6 17.2528L5.999 15.001L5.836 14.9962C4.38017 14.9119 3.20285 13.7894 3.03326 12.3581L3.01736 12.1776L3.01227 12.0013C3.01227 10.4036 4.26119 9.09765 5.83593 9.0064L5.999 9.001L6 6.75C6 5.88283 6.63072 5.16298 7.45831 5.02418L7.60631 5.0058L7.74981 5L9.999 4.999L10.0051 4.82796C10.0894 3.37214 11.2119 2.19482 12.6432 2.02523L12.8237 2.00933L13 2.00423ZM13 3.50423C12.2203 3.50423 11.5795 4.09912 11.5069 4.86039L11.5 5.00497L11.4985 6.49904L7.75 6.5C7.63165 6.5 7.53251 6.58223 7.5066 6.69279L7.5 6.75018L7.49909 10.5012L6.01227 10.5013C5.18384 10.5013 4.51227 11.1729 4.51227 12.0013C4.51227 12.781 5.10716 13.4218 5.86775 13.4944L6.01219 13.5013L7.49909 13.5012L7.5 17.2526C7.5 17.371 7.58223 17.4701 7.69261 17.496L7.7499 17.5026L11.4985 17.5021L11.5 18.9984C11.5 19.8268 12.1716 20.4984 13 20.4984C13.7797 20.4984 14.4204 19.9035 14.4931 19.1434L14.5 18.9991L14.4985 17.5021L18.25 17.5026C18.3683 17.5026 18.4675 17.4204 18.4934 17.3101L18.5 17.2528L18.499 15L17.9762 15.0009L17.7968 14.9944C16.2855 14.8922 15.0927 13.6769 15.0068 12.1532L15.0019 11.976L15.0084 11.7967C15.1105 10.2854 16.3258 9.09259 17.827 9.00631L18.0014 9.00131L18.499 9.001L18.5 6.75C18.5 6.65532 18.4178 6.55618 18.3072 6.53027L18.25 6.52368L14.4985 6.52318L14.5 5.00423C14.5 4.17581 13.8284 3.50423 13 3.50423Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-gray-190 truncate">Validate Form Data</p>
                            <p className="text-[11px] text-gray-130 truncate mt-0.5" data-component-name="LibraryModal">David Chen</p>
                          </div>
                          {/* Add installed indicator for Validate Form Data */}
                          {isInstalled('Custom actions-Validate Form Data') && (
                            <div 
                              className="relative w-5 h-5 flex items-center justify-center rounded-full bg-green-50"
                              title="Installed"
                            >
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Sample Custom Action 4 */}
                      <div 
                        className="bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                        onClick={() => {
                          setSelectedModule({
                            name: 'Image Processing',
                            categoryName: 'Media Handling',
                            color: 'bg-purple-100',
            icon: Image,
                            submodules: [],
                            description: 'Process and manipulate images with various filters and transformations. This custom action helps you resize, crop, filter, and optimize images for different use cases.',
                            publisher: 'Sarah Williams',
                            lastUpdated: 'Mar 18, 2025',
                            documentationUrl: '#',
                            size: '320 MB'
                          });
                          setCurrentView('details');
                        }}
                      >
                        <div className="px-3 py-2.5 flex items-center gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-purple-100">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                              <path d="M13 2.00423C14.5977 2.00423 15.9037 3.25315 15.994 4.82327L15.999 4.999L18.25 5C19.1172 5 19.837 5.63072 19.9758 6.45858L19.9942 6.60663L20 6.75018L19.9991 10.5012L18.0015 10.5013C17.2579 10.5013 16.6353 11.0445 16.5215 11.7403L16.5062 11.8725L16.5015 12.0013C16.5015 12.7449 17.0446 13.3675 17.7405 13.4813L17.8727 13.4965L18.0014 13.5013L19.9991 13.5012L20 17.2526C20 18.1708 19.2929 18.9238 18.3934 18.9968L18.2499 19.0026L15.999 19.002L15.9949 19.1747C15.9106 20.6305 14.7881 21.8078 13.3567 21.9774L13.1763 21.9933L13 21.9984C11.4023 21.9984 10.0963 20.7495 10.0051 19.1779L10 19.002L7.75 19.0026C6.88283 19.0026 6.16298 18.3719 6.02417 17.5443L6.0058 17.3963L6 17.2528L5.999 15.001L5.836 14.9962C4.38017 14.9119 3.20285 13.7894 3.03326 12.3581L3.01736 12.1776L3.01227 12.0013C3.01227 10.4036 4.26119 9.09765 5.83593 9.0064L5.999 9.001L6 6.75C6 5.88283 6.63072 5.16298 7.45831 5.02418L7.60631 5.0058L7.74981 5L9.999 4.999L10.0051 4.82796C10.0894 3.37214 11.2119 2.19482 12.6432 2.02523L12.8237 2.00933L13 2.00423ZM13 3.50423C12.2203 3.50423 11.5795 4.09912 11.5069 4.86039L11.5 5.00497L11.4985 6.49904L7.75 6.5C7.63165 6.5 7.53251 6.58223 7.5066 6.69279L7.5 6.75018L7.49909 10.5012L6.01227 10.5013C5.18384 10.5013 4.51227 11.1729 4.51227 12.0013C4.51227 12.781 5.10716 13.4218 5.86775 13.4944L6.01219 13.5013L7.49909 13.5012L7.5 17.2526C7.5 17.371 7.58223 17.4701 7.69261 17.496L7.7499 17.5026L11.4985 17.5021L11.5 18.9984C11.5 19.8268 12.1716 20.4984 13 20.4984C13.7797 20.4984 14.4204 19.9035 14.4931 19.1434L14.5 18.9991L14.4985 17.5021L18.25 17.5026C18.3683 17.5026 18.4675 17.4204 18.4934 17.3101L18.5 17.2528L18.499 15L17.9762 15.0009L17.7968 14.9944C16.2855 14.8922 15.0927 13.6769 15.0068 12.1532L15.0019 11.976L15.0084 11.7967C15.1105 10.2854 16.3258 9.09259 17.827 9.00631L18.0014 9.00131L18.499 9.001L18.5 6.75C18.5 6.65532 18.4178 6.55618 18.3072 6.53027L18.25 6.52368L14.4985 6.52318L14.5 5.00423C14.5 4.17581 13.8284 3.50423 13 3.50423Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-gray-190 truncate">Image Processing</p>
                            <p className="text-[11px] text-gray-130 truncate mt-0.5" data-component-name="LibraryModal">Sarah Williams</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    

                  </div>
                </div>
              ) : activeTab === 'ui-collections' ? (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-3">
                    <UICollectionsIcon className="w-6 h-6 text-gray-110" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-190 mb-1">No UI element collections</h3>
                  <p className="text-sm text-gray-130">There are no UI element collections in this environment</p>
                </div>
                </div>
              ) : null}
              
              {(activeTab === 'core' || activeTab === 'connectors') && filteredAndSortedModules.length === 0 && (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-3">
                    <Search className="w-6 h-6 text-gray-110" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-190 mb-1">No modules found</h3>
                  <p className="text-sm text-gray-130">Try adjusting your search or filters</p>
                </div>
                </div>
              )}
            </div>
              </div>
            </div>
          </>
        ) : (
          selectedModule && (
            <ModuleDetails
              module={selectedModule}
              onBack={handleBack}
              isInstalled={isInstalled(activeTab === 'custom-actions' ? `Custom actions-${selectedModule.name}` : `${selectedModule.categoryName}-${selectedModule.name}`)}
              onInstallToggle={() => {
                // For custom actions and UI element collections, use the appropriate category
                let categoryPrefix;
                if (activeTab === 'custom-actions') {
                  categoryPrefix = 'Custom actions';
                } else if (activeTab === 'ui-collections') {
                  categoryPrefix = 'UI Element Collections';
                } else {
                  categoryPrefix = selectedModule.categoryName;
                }
                const id = `${categoryPrefix}-${selectedModule.name}`;
                
                console.log(`Installing/uninstalling: ${id}, activeTab: ${activeTab}`);
                
                if (isInstalled(id)) {
                  uninstallCategory(id);
                } else {
                  installCategory(id);
                }
              }}
              sourceName={activeTab === 'core' ? 'PAD Action' : activeTab === 'custom-actions' ? 'Custom Action' : activeTab === 'ui-collections' ? 'PAD Action' : 'Connector'}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LibraryModal;