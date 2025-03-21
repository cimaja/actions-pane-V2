import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, X as CloseIcon, Maximize2, Minimize2, Check } from 'lucide-react';

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
  color: string;
  fallbackIcon: React.ReactNode;
}

const ConnectorLogo: React.FC<ConnectorLogoProps> = ({ name, color, fallbackIcon }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageError(false);
  };
  
  // Get the connector logo URL (now always returns a valid URL)
  const logoUrl = getConnectorLogoUrl(name);
  
  return (
    <div className={cn(
      "flex-shrink-0 w-7 h-7 overflow-hidden rounded-lg flex items-center justify-center transition-colors",
      imageError && color
    )}>
      {!imageError ? (
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <>{fallbackIcon}</>
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
type SortType = 'category' | 'name';
type View = 'list' | 'details';

const categories = [
  { id: 'files', label: 'Files' },
  { id: 'interaction', label: 'Interaction' },
  { id: 'system', label: 'System' },
  { id: 'logic', label: 'Logic' },
  { id: 'advanced', label: 'Advanced' }
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
  const [sortType, setSortType] = useState<SortType>('category');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
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
    let result = [...modules];
    
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
    }

    if (selectedCategories.length > 0) {
      result = result.filter(module =>
        selectedCategories.some(category => 
          module.categoryName.toLowerCase() === category
        )
      );
    }

    if (sortType === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => {
        const categoryCompare = a.categoryName.localeCompare(b.categoryName);
        return categoryCompare !== 0 ? categoryCompare : a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [modules, searchQuery, selectedCategories, sortType]);

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

                <div className="p-3 border-b border-gray-40 bg-[#fafafa]">
                  <div className="flex gap-2">
                    <div ref={sortRef} className="relative">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                          "text-gray-140 hover:text-brand-80"
                        )}
                      >
                        <span>{sortType === 'category' ? 'Category' : 'Name'}</span>
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          showSortDropdown ? "transform rotate-180" : "",
                          "text-gray-110 group-hover:text-brand-80"
                        )} />
                      </button>
                      
                      {showSortDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">
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
                        </div>
                      )}
                    </div>

                    <div ref={filterRef} className="relative">
                      <button
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2",
                          "text-gray-140 hover:text-brand-80",
                          selectedCategories.length > 0 && !showFilterDropdown && "text-brand-80"
                        )}
                      >
                        <span>
                          {selectedCategories.length === 0 
                            ? "All categories" 
                            : `${selectedCategories.length} selected`}
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
                              <h3 className="text-sm font-medium text-gray-190">Categories</h3>
                              {selectedCategories.length > 0 && (
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
                            {categories.map((category) => (
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
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative ml-auto max-w-[400px] flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-110 h-4 w-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modules..."
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

                <div className="flex-1 overflow-y-auto p-3 bg-[#fafafa] flex flex-col">
              {(activeTab === 'core' || activeTab === 'connectors') ? (
                sortType === 'name' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredAndSortedModules.map(module => (
                      <div
                        key={`${module.categoryName}-${module.name}`}
                        onClick={() => handleModuleClick(module)}
                        className="group relative bg-white border border-gray-30 hover:border-brand-80 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
                      >
                        <div className="px-3 py-2 flex items-center gap-3">
                          {activeTab === 'connectors' ? (
                            <ConnectorLogo 
                              name={module.name} 
                              color={module.color} 
                              fallbackIcon={<module.icon className="w-4 h-4" />} 
                            />
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
                                    {module.categoryName}
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
                    {Object.entries(
                      filteredAndSortedModules.reduce((acc, module) => {
                        if (!acc[module.categoryName]) {
                          acc[module.categoryName] = [];
                        }
                        acc[module.categoryName].push(module);
                        return acc;
                      }, {} as Record<string, ModuleWithCategory[]>)
                    ).map(([category, modules]) => (
                      <div key={category}>
                        <h3 className="text-sm font-medium text-gray-190 mb-3">{category}</h3>
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
                                  <ConnectorLogo 
                                    name={module.name} 
                                    color={module.color} 
                                    fallbackIcon={<module.icon className="w-4 h-4" />} 
                                  />
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
              ) : activeTab === 'custom-actions' || activeTab === 'ui-collections' ? (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-3">
                    {activeTab === 'custom-actions' ? (
                      <CustomActionsIcon className="w-6 h-6 text-gray-110" />
                    ) : (
                      <UICollectionsIcon className="w-6 h-6 text-gray-110" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-190 mb-1">Coming soon</h3>
                  <p className="text-sm text-gray-130">This feature is not yet available</p>
                </div>
                </div>
              ) : null}
              
              {(activeTab === 'core' || activeTab === 'connectors') && filteredAndSortedModules.length === 0 && (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-3">
                    <Search className="w-6 h-6 text-gray-110" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-190 mb-1">No modules found</h3>
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
              isInstalled={isInstalled(`${selectedModule.categoryName}-${selectedModule.name}`)}
              onInstallToggle={() => {
                const id = `${selectedModule.categoryName}-${selectedModule.name}`;
                if (isInstalled(id)) {
                  uninstallCategory(id);
                } else {
                  installCategory(id);
                }
              }}
              sourceName={activeTab === 'core' ? 'PAD Action' : 'Connector'}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LibraryModal;