import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ChevronRight, Star, Clock, BookOpen, Package2, LayoutTemplate, MoveUpRight } from 'lucide-react';
import { FavoritesIcon } from './icons/FavoritesIcon';
import { CoreIcon } from './icons/CoreIcon';
import { ConnectorsIcon } from './icons/ConnectorsIcon';
import { cn } from '../lib/utils';
import { useActions } from '../hooks/useActions';
import { FilterDropdown } from './FilterDropdown';
import { mainNavItems } from '../data/navigation';
import { TemplatesModal } from './TemplatesModal';
import LibraryModal from './LibraryModal';
import { useActionsStore } from '../store/actionsStore';
import { getConnectorLogoUrl } from '../data/connectorLogos';

// Connector icon component for reuse throughout the sidebar
const ConnectorIcon = ({ name, color, icon: Icon }: { name: string, color: string, icon: any }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={cn(
      "flex-shrink-0 rounded-md flex items-center justify-center",
      !imageError ? "bg-white" : color
    )} style={{ width: '24px', height: '24px' }}>
      {!imageError ? (
        <img 
          src={getConnectorLogoUrl(name)} 
          alt={`${name} logo`} 
          className="w-6 h-6 object-contain rounded-md"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="p-1 rounded-md flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

// ConnectorLogo component for handling connector logos in search results
interface ConnectorLogoProps {
  name: string;
  color?: string;
  fallbackIcon?: React.ReactNode;
}

const ConnectorLogo: React.FC<ConnectorLogoProps> = ({ 
  name, 
  color = "bg-white", 
  fallbackIcon = <ConnectorsIcon className="w-4 h-4 text-gray-110" />
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageError(false);
  };
  
  // Get the connector logo URL
  const logoUrl = getConnectorLogoUrl(name);
  
  return (
    <div className={cn(
      "flex-shrink-0 rounded-md flex items-center justify-center transition-colors",
      imageError ? color : "bg-white"
    )} style={{ width: '24px', height: '24px' }}>
      {!imageError ? (
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="w-6 h-6 object-contain rounded-md"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <div className="p-1 rounded-md flex items-center justify-center">
          {fallbackIcon}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('core');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<any | null>(null);
  const [expandedSubgroups, setExpandedSubgroups] = useState<{ [key: string]: boolean }>({});
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState<string | null>(null);
  const [selectedLibraryTab, setSelectedLibraryTab] = useState<'core' | 'connectors'>('core');
  
  // Search state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchActiveTab, setSearchActiveTab] = useState<'local' | 'library'>('local');
  const [librarySearchResults, setLibrarySearchResults] = useState<any[]>([]);

  const { toggleFavorite, isFavorite, favoriteActions, recentActions, addToRecent, isInstalled: storeIsInstalled } = useActionsStore();
  
  // Function to check if an action is installed
  const isInstalled = (action: any) => {
    if (action.source !== 'Connector') return true;
    return storeIsInstalled(`${action.category}-${action.module}`);
  };

  // Get all installed actions for the sidebar search
  const coreSections = useActions({ 
    sourceName: 'PAD Action',
    installedOnly: true
  });
  
  const connectorSections = useActions({ 
    sourceName: 'Connector',
    installedOnly: true
  });
  
  // Use the appropriate sections for the current tab view (not for search)
  const activeTabSections = useActions({ 
    sourceName: activeNav === 'core' ? 'PAD Action' : 'Connector',
    installedOnly: true
  });

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };
  
  // Activate search tabs when user starts typing and reset when query is cleared
  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
      // Reset to local tab when search is cleared
      setSearchActiveTab('local');
    }
  }, [searchQuery]);

  // Dedicated function to handle opening the library modal with the correct tab
  const openLibraryModal = (category: string | null = null, forceTab: 'core' | 'connectors' | null = null) => {
    // Set the category if provided
    if (category) {
      setSelectedLibraryCategory(category);
    }
    
    // If a tab is explicitly specified, use it
    // Otherwise, use the current activeNav value
    const tabToOpen = forceTab || (activeNav === 'connectors' ? 'connectors' : 'core');
    console.log('Opening library modal with tab:', tabToOpen, 'activeNav is:', activeNav);
    
    // Set the tab and open the modal
    setSelectedLibraryTab(tabToOpen);
    setIsLibraryModalOpen(true);
    
    // Debug: Log the current state after setting
    console.log('After setting - selectedLibraryTab:', tabToOpen);
  };

  const toggleSubgroup = (subgroupName: string) => {
    setExpandedSubgroups(prev => ({
      ...prev,
      [subgroupName]: !prev[subgroupName]
    }));
  };

  const handleActionClick = (actionId: string) => {
    addToRecent(actionId);
    // Additional action click handling logic here
  };

  const handleToggleFavorite = (e: React.MouseEvent, actionId: string) => {
    e.stopPropagation();
    toggleFavorite(actionId);
  };

  const renderActionItem = (item: string) => {
    // Action item rendering logic
    
    return (
      <button
        key={item}
        onClick={() => handleActionClick(item)}
        className="w-full pr-2 py-1.5 text-sm text-left hover:bg-gray-20 transition-colors flex items-center gap-2 group rounded-md pl-6"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          {/* Connector icons removed for consistency with Core PAD actions */}
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center">
              <span className="text-gray-150 truncate">{item}</span>
            </div>
          </div>
        </div>
        <Star 
          className={cn(
            "w-4 h-4 ml-auto cursor-pointer transition-all",
            isFavorite(item) 
              ? "text-amber-400 fill-amber-400" 
              : "text-gray-110 opacity-0 group-hover:opacity-100"
          )}
          onClick={(e) => handleToggleFavorite(e, item)}
        />
      </button>
    );
  };

  const renderRecentActions = () => {
    if (recentActions.length === 0) return null;

    return (
      <div className="relative mb-6">
        <div className="sticky top-0 z-10 bg-[#fafafa]">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-110" />
              <span className="text-sm font-semibold text-gray-190">Recent</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden p-2">
          <div className="space-y-1">
            {recentActions.map(renderActionItem)}
          </div>
        </div>
      </div>
    );
  };

  const renderFavoritesView = () => {
    if (favoriteActions.length === 0) {
      return (
        <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
          {renderRecentActions()}
          <div className="relative">
            <div className="sticky top-0 z-10 bg-[#fafafa]">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-110" />
                  <span className="text-sm font-semibold text-gray-190">Favorites</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-40 overflow-hidden">
              <div className="flex flex-col items-center justify-center py-6 px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-2">
                  <FavoritesIcon className="w-6 h-6 text-gray-110" />
                </div>
                <p className="text-sm text-gray-130 text-center">No favorite actions</p>
                <p className="text-xs text-gray-110 text-center mt-1">Click the star icon on any action to add it to favorites</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
        {renderRecentActions()}
        <div className="relative">
          <div className="sticky top-0 z-10 bg-[#fafafa]">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gray-110" />
                <span className="text-sm font-semibold text-gray-190">Favorites</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden p-2">
            <div className="space-y-1">
              {favoriteActions.map(renderActionItem)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter local results based on search query
  const filteredLocalResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    const results: Array<{
      type: 'module' | 'action' | 'submodule';
      name: string;
      category: string;
      source: string;
      icon: any;
      color: string;
      item: any;
      module?: string;
      submodule?: string;
    }> = [];
    
    // Special case for UI search - if query is 'ui', prioritize UI Automation
    const isUiSearch = query === 'ui';
    
    // Combine both core and connector sections for holistic search
    const allSections = [...coreSections, ...connectorSections];
    
    allSections.forEach(source => {
      source.categories.forEach(category => {
        category.modules.forEach(module => {
          // Check if module name matches
          if (module.name.toLowerCase().includes(query) || 
              // Special handling for UI Automation when searching for 'ui'
              (isUiSearch && module.name === 'UI Automation')) {
            results.push({
              type: 'module',
              name: module.name,
              category: category.name,
              source: source.name,
              icon: module.icon,
              color: module.color,
              item: module
            });
            
            // If module is found, include all its actions for better discoverability
            module.submodules?.forEach(submodule => {
              // If the submodule has a name, add it as a result too
              if (submodule.name && submodule.name.length > 0) {
                results.push({
                  type: 'submodule',
                  name: submodule.name,
                  module: module.name,
                  category: category.name,
                  source: source.name,
                  icon: module.icon,
                  color: module.color,
                  item: submodule,
                  submodule: submodule.name
                });
              }
              
              // Add all actions from this module
              submodule.actions.forEach((action: string) => {
                results.push({
                  type: 'action',
                  name: action,
                  module: module.name,
                  category: category.name,
                  source: source.name,
                  icon: module.icon,
                  color: module.color,
                  item: action,
                  submodule: submodule.name
                });
              });
            });
          } else {
            // Check if submodule name matches
            module.submodules?.forEach(submodule => {
              let submoduleMatches = false;
              
              // If submodule has a name and it matches the query
              if (submodule.name && submodule.name.toLowerCase().includes(query)) {
                submoduleMatches = true;
                results.push({
                  type: 'submodule',
                  name: submodule.name,
                  module: module.name,
                  category: category.name,
                  source: source.name,
                  icon: module.icon,
                  color: module.color,
                  item: submodule,
                  submodule: submodule.name
                });
                
                // Include all actions from matching submodule
                submodule.actions.forEach((action: string) => {
                  results.push({
                    type: 'action',
                    name: action,
                    module: module.name,
                    category: category.name,
                    source: source.name,
                    icon: module.icon,
                    color: module.color,
                    item: action,
                    submodule: submodule.name
                  });
                });
              }
              
              // If submodule didn't match, check individual actions
              if (!submoduleMatches) {
                submodule.actions.forEach((action: string) => {
                  if (action.toLowerCase().includes(query)) {
                    results.push({
                      type: 'action',
                      name: action,
                      module: module.name,
                      category: category.name,
                      source: source.name,
                      icon: module.icon,
                      color: module.color,
                      item: action,
                      submodule: submodule.name
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
    
    // Since we only want to show actions, we'll just return the action results
    // sorted alphabetically by name
    const actionResults = results.filter(r => r.type === 'action');
    
    // Sort actions alphabetically
    actionResults.sort((a, b) => a.name.localeCompare(b.name));
    
    return actionResults;
  }, [coreSections, connectorSections, searchQuery]);
  
  // Define library search result type
  type LibrarySearchResult = {
    name: string;
    description: string;
    category: 'Core' | 'Connectors';
    icon?: any;
    color?: string;
    premium?: boolean;
    module?: any; // Reference to the original module for additional data
  };

  // Get all actions from the library
  const coreSources = useActions({ sourceName: 'PAD Action' });
  const connectorSources = useActions({ sourceName: 'Connector' });
  
  // Get library search results based on actual data
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const results: LibrarySearchResult[] = [];
      
      // Process Core actions
      coreSources.forEach(source => {
        source.categories.forEach(category => {
          category.modules.forEach(module => {
            // Check if module name or description matches the query
            if (
              module.name.toLowerCase().includes(query) ||
              (module.description && module.description.toLowerCase().includes(query))
            ) {
              results.push({
                name: module.name,
                description: module.description || `${module.name} actions`,
                category: 'Core',
                icon: module.icon,
                color: module.color,
                module: module
              });
            }
            
            // Check submodules and actions
            module.submodules.forEach(submodule => {
              // Check if any action matches the query
              const matchingActions = submodule.actions.filter(action =>
                action.toLowerCase().includes(query)
              );
              
              if (matchingActions.length > 0 && !results.some(r => r.name === module.name && r.category === 'Core')) {
                results.push({
                  name: module.name,
                  description: module.description || `${module.name} actions`,
                  category: 'Core',
                  icon: module.icon,
                  color: module.color,
                  module: module
                });
              }
            });
          });
        });
      });
      
      // Process Connector actions
      connectorSources.forEach(source => {
        source.categories.forEach(category => {
          category.modules.forEach(module => {
            // Check if module name or description matches the query
            if (
              module.name.toLowerCase().includes(query) ||
              (module.description && module.description.toLowerCase().includes(query))
            ) {
              results.push({
                name: module.name,
                description: module.description || `${module.name} connector`,
                category: 'Connectors',
                color: module.color,
                premium: module.name.includes('Premium'),
                module: module
              });
            }
            
            // Check submodules and actions
            module.submodules.forEach(submodule => {
              // Check if any action matches the query
              const matchingActions = submodule.actions.filter(action =>
                action.toLowerCase().includes(query)
              );
              
              if (matchingActions.length > 0 && !results.some(r => r.name === module.name && r.category === 'Connectors')) {
                results.push({
                  name: module.name,
                  description: module.description || `${module.name} connector`,
                  category: 'Connectors',
                  color: module.color,
                  premium: module.name.includes('Premium'),
                  module: module
                });
              }
            });
          });
        });
      });
      
      // Sort results alphabetically by name within each category
      results.sort((a, b) => {
        // First sort by category
        if (a.category !== b.category) {
          const categoryOrder = ['Core', 'Connectors'];
          return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
        // Then sort by name
        return a.name.localeCompare(b.name);
      });
      
      setLibrarySearchResults(results);
    } else {
      // If no search query, clear results
      setLibrarySearchResults([]);
    }
  }, [searchQuery, searchActiveTab, coreSources, connectorSources]);
  
  // Render search results view
  const renderSearchResults = () => {
    if (searchActiveTab === 'local') {
      if (filteredLocalResults.length === 0) {
        return (
          <div className="flex-1 flex items-center justify-center bg-[#fafafa] px-3 min-h-[400px]">
            <div className="text-center">
              <div className="mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30">
                  <Search className="w-6 h-6 text-gray-110" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-190 mb-1">No results found</h3>
              <p className="text-sm text-gray-130 mb-4">Try a different search term or check the Library tab</p>
              <button
                onClick={() => setSearchActiveTab('library')}
                className="text-sm text-[#0078d4] hover:underline focus:outline-none"
              >
                Search in Library
              </button>
            </div>
          </div>
        );
      }
      
      // Group results by category
      const groupedResults: {[key: string]: any[]} = {};
      filteredLocalResults.forEach(result => {
        if (!groupedResults[result.category]) {
          groupedResults[result.category] = [];
        }
        groupedResults[result.category].push(result);
      });
      
      // Define category icons for local search
      const categoryIcons: {[key: string]: JSX.Element} = {
        'Core': <CoreIcon className="w-4 h-4 text-gray-110" />,
        'Connectors': <ConnectorsIcon className="w-4 h-4 text-gray-110" />
      };
      
      return (
        <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
          {Object.entries(groupedResults).map(([category, results]) => (
            <div key={category} className="relative mb-6">
              <div className="sticky top-0 z-10 bg-[#fafafa]">
                <div className="flex items-center gap-2 py-2">
                  {categoryIcons[category] || <Package2 className="w-4 h-4 text-gray-110" />}
                  <span className="text-sm font-semibold text-gray-190">{category}</span>
                  <span className="ml-1 text-gray-110 text-xs">
                    {results.filter(result => result.type === 'action').length} results
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden p-2">
                <div className="space-y-1">
                  {results.filter(result => result.type === 'action').map((result) => (
                    <div
                      key={`${result.module}-${result.name}`}
                      className="w-full px-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md group cursor-pointer"
                      onClick={() => addToRecent(result.item)}
                    >
                      {result.source === 'Connector' ? (
                        <div className="relative">
                          <div className="absolute -top-2 -right-2 flex items-center gap-1">
                            {result.item.premium && (
                              <div className="bg-blue-50 rounded-full p-0.5" title="Premium Required">
                                <img 
                                  src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9993%202C12.1599%202%2012.3092%202.07697%2012.4025%202.20433L12.439%202.26192L14.6147%206.28079L14.6399%206.34272L14.648%206.36927L14.6614%206.43739L14.6653%206.5C14.6653%206.54603%2014.6591%206.59059%2014.6474%206.63292L14.6158%206.71693L14.5908%206.76267C14.5761%206.78643%2014.5593%206.80907%2014.5405%206.83047L14.5803%206.77887L14.564%206.80167L8.39747%2013.8054C8.34407%2013.8763%208.27523%2013.9278%208.19927%2013.96L8.13383%2013.982L8.08233%2013.9936L7.99953%2014.0002L7.93267%2013.9958L7.85407%2013.9788C7.81393%2013.9673%207.77487%2013.9503%207.73833%2013.9281L7.73223%2013.9231C7.70083%2013.9043%207.67147%2013.8812%207.64483%2013.8543L1.45206%206.82347L1.43457%206.80167L1.40786%206.76267C1.37087%206.70293%201.34614%206.63487%201.33713%206.56191L1.33334%206.5L1.3352%206.45609L1.34404%206.39693C1.3482%206.37698%201.35343%206.35781%201.35977%206.33913L1.37499%206.30014L1.39366%206.26192L3.56629%202.26192C3.63609%202.12071%203.77486%202.02609%203.93131%202.0046L3.99931%202H11.9993ZM9.99797%207H5.99867L7.99927%2012.1247L9.99797%207ZM4.92601%207H2.93934L6.50667%2011.0493L4.92601%207ZM13.058%207H11.072%20L9.49334%2011.0467L13.058%207ZM5.98067%203H4.29664L2.67134%206H5.02067L5.98067%203ZM8.96727%203H7.03061L6.07001%206H9.92601L8.96727%203ZM11.7013%203H10.0173L10.9773%206H13.3253L11.7013%203Z'%20fill='%23212121'%20/%3e%3c/svg%3e" 
                                  alt="Premium" 
                                  className="w-3.5 h-3.5 opacity-40"
                                />
                              </div>
                            )}
                            {!isInstalled(result.item) && (
                              <div className="rounded-full p-0.5 bg-gray-100">
                                <img 
                                  src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%203C6.34315%203%205%204.34315%205%206C5%206.27614%204.77614%206.5%204.5%206.5H4.25C3.00736%206.5%202%207.50736%202%208.75C2%209.99264%203.00736%2011%204.25%2011H11.75C12.9926%2011%2014%209.99264%2014%208.75C14%207.50736%2012.9926%206.5%2011.75%206.5H11.5C11.2239%206.5%2011%206.27614%2011%206C11%204.34315%209.65685%203%208%203ZM4.03004%205.50733C4.27283%203.53062%205.95767%202%208%202C10.0423%202%2011.7272%203.53063%2011.97%205.50733C13.6623%205.62043%2015%207.029%2015%208.75C15%2010.5449%2013.5449%2012%2011.75%2012H4.25C2.45507%2012%201%2010.5449%201%208.75C1%207.029%202.33769%205.62043%204.03004%205.50733Z'%20fill='%23212121'%20/%3e%3c/svg%3e" 
                                  alt="Cloud" 
                                  className="w-3.5 h-3.5 opacity-40" 
                                  title="Not installed"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 items-center">
                                <div className="flex-shrink-0 rounded-md flex items-center justify-center bg-white" style={{ width: '24px', height: '24px' }}>
                              <img 
                                src={getConnectorLogoUrl(result.module)} 
                                alt={`${result.module} logo`} 
                                className="w-6 h-6 object-contain rounded-md"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {result.name}
                                </h3>
                              </div>
                              <p className="text-xs leading-tight text-gray-500 mt-0 truncate text-left">
                                {result.module}
                                {result.module && result.description && ' › '}
                                {result.description}
                              </p>
                            </div>
                            <button className="text-gray-110 hover:text-gray-140 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity self-center">
                              <MoveUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <div className={cn("p-1 rounded-md flex-shrink-0 flex items-center justify-center", result.color)} style={{ width: '24px', height: '24px' }}>
                            <result.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {result.name}
                              </h3>
                              {result.premium && (
                                <div className="bg-blue-50 rounded-full p-0.5" title="Premium Required">
                                  <img 
                                    src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9993%202C12.1599%202%2012.3092%202.07697%2012.4025%202.20433L12.439%202.26192L14.6147%206.28079L14.6399%206.34272L14.648%206.36927L14.6614%206.43739L14.6653%206.5C14.6653%206.54603%2014.6591%206.59059%2014.6474%206.63292L14.6158%206.71693L14.5908%206.76267C14.5761%206.78643%2014.5593%206.80907%2014.5405%206.83047L14.5803%206.77887L14.564%206.80167L8.39747%2013.8054C8.34407%2013.8763%208.27523%2013.9278%208.19927%2013.96L8.13383%2013.982L8.08233%2013.9936L7.99953%2014.0002L7.93267%2013.9958L7.85407%2013.9788C7.81393%2013.9673%207.77487%2013.9503%207.73833%2013.9281L7.73223%2013.9231C7.70083%2013.9043%207.67147%2013.8812%207.64483%2013.8543L1.45206%206.82347L1.43457%206.80167L1.40786%206.76267C1.37087%206.70293%201.34614%206.63487%201.33713%206.56191L1.33334%206.5L1.3352%206.45609L1.34404%206.39693C1.3482%206.37698%201.35343%206.35781%201.35977%206.33913L1.37499%206.30014L1.39366%206.26192L3.56629%202.26192C3.63609%202.12071%203.77486%202.02609%203.93131%202.0046L3.99931%202H11.9993ZM9.99797%207H5.99867L7.99927%2012.1247L9.99797%207ZM4.92601%207H2.93934L6.50667%2011.0493L4.92601%207ZM13.058%207H11.072%20L9.49334%2011.0467L13.058%207ZM5.98067%203H4.29664L2.67134%206H5.02067L5.98067%203ZM8.96727%203H7.03061L6.07001%206H9.92601L8.96727%203ZM11.7013%203H10.0173L10.9773%206H13.3253L11.7013%203Z'%20fill='%23212121'%20/%3e%3c/svg%3e" 
                                    alt="Premium" 
                                    className="w-3.5 h-3.5 opacity-40"
                                  />
                                </div>
                              )}
                            </div>
                            <p className="text-xs leading-tight text-gray-500 mt-0 truncate text-left">
                              {result.module}
                              {result.module && result.description && ' › '}
                              {result.description}
                            </p>
                          </div>

                          {isFavorite(result.item) ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(result.item);
                              }}
                              className="text-amber-500 hover:text-amber-600 focus:outline-none self-center"
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(result.item);
                              }}
                              className="text-gray-110 hover:text-gray-140 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity self-center"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Library search results
      if (librarySearchResults.length === 0) {
        return (
          <div className="flex-1 flex items-center justify-center bg-[#fafafa] px-3 min-h-[400px]">
            <div className="text-center">
              <div className="mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30">
                  <BookOpen className="w-6 h-6 text-gray-110" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-190 mb-1">No library results</h3>
              <p className="text-sm text-gray-130 mb-4">Try a different search term or browse the Library</p>
              <button
                onClick={() => openLibraryModal()}
                className="text-sm text-[#0078d4] hover:underline"
              >
                Browse library
              </button>
            </div>
          </div>
        );
      }
      
      // Group results by category
      const groupedResults: { [key: string]: LibrarySearchResult[] } = {};
      
      librarySearchResults.forEach(result => {
        if (!groupedResults[result.category]) {
          groupedResults[result.category] = [];
        }
        groupedResults[result.category].push(result);
      });
      
      // Define category icons
      const categoryIcons = {
        'Core': <CoreIcon className="w-4 h-4 text-gray-110" />,
        'Connectors': <ConnectorsIcon className="w-4 h-4 text-gray-110" />
      };
      
      // Category order
      const categoryOrder = ['Core', 'Connectors'];
      
      return (
        <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
          {categoryOrder.map(category => {
            const results = groupedResults[category];
            if (!results || results.length === 0) return null;
            
            return (
              <div key={category} className="relative mb-6">
                <div className="sticky top-0 z-10 bg-[#fafafa]">
                  <div className="flex items-center gap-2 py-2">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    <span className="text-sm font-semibold text-gray-190">{category}</span>
                    <span className="ml-1 text-gray-110 text-xs">
                      {results.length} results
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden p-2">
                  <div className="space-y-1">
                    {results.map((result) => {
                      // Determine which tab to open in the library modal
                      const tabToOpen = 
                        result.category === 'Core' ? 'core' :
                        result.category === 'Connectors' ? 'connectors' : 'core';
                      
                      return (
                        <div
                          key={result.name}
                          className="w-full px-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md group cursor-pointer"
                          onClick={() => {
                            // Open library modal with the appropriate tab
                            openLibraryModal(null, tabToOpen);
                          }}
                        >
                          <div className="flex gap-2 items-center">
                            {result.category === 'Connectors' ? (
                              <ConnectorLogo 
                                name={result.name} 
                                color="bg-white" 
                                fallbackIcon={<ConnectorsIcon className="w-3 h-3 text-gray-110" />}
                              />
                            ) : (
                                      <div className="p-1 rounded-md flex-shrink-0 flex items-center justify-center bg-[#f0f6ff] text-[#0078d4]" style={{ width: '24px', height: '24px' }}>
                                {result.icon ? (
                                  <result.icon className="w-4 h-4" />
                                ) : (
                                  <CoreIcon className="w-4 h-4" />
                                )}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {result.name}
                                </h3>
                                {result.premium && (
                                  <div className="bg-blue-50 rounded-full p-0.5" title="Premium Required">
                                    <img 
                                      src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9993%202C12.1599%202%2012.3092%202.07697%2012.4025%202.20433L12.439%202.26192L14.6147%206.28079L14.6399%206.34272L14.648%206.36927L14.6614%206.43739L14.6653%206.5C14.6653%206.54603%2014.6591%206.59059%2014.6474%206.63292L14.6158%206.71693L14.5908%206.76267C14.5761%206.78643%2014.5593%206.80907%2014.5405%206.83047L14.5803%206.77887L14.564%206.80167L8.39747%2013.8054C8.34407%2013.8763%208.27523%2013.9278%208.19927%2013.96L8.13383%2013.982L8.08233%2013.9936L7.99953%2014.0002L7.93267%2013.9958L7.85407%2013.9788C7.81393%2013.9673%207.77487%2013.9503%207.73833%2013.9281L7.73223%2013.9231C7.70083%2013.9043%207.67147%2013.8812%207.64483%2013.8543L1.45206%206.82347L1.43457%206.80167L1.40786%206.76267C1.37087%206.70293%201.34614%206.63487%201.33713%206.56191L1.33334%206.5L1.3352%206.45609L1.34404%206.39693C1.3482%206.37698%201.35343%206.35781%201.35977%206.33913L1.37499%206.30014L1.39366%206.26192L3.56629%202.26192C3.63609%202.12071%203.77486%202.02609%203.93131%202.0046L3.99931%202H11.9993ZM9.99797%207H5.99867L7.99927%2012.1247L9.99797%207ZM4.92601%207H2.93934L6.50667%2011.0493L4.92601%207ZM13.058%207H11.072%20L9.49334%2011.0467L13.058%207ZM5.98067%203H4.29664L2.67134%206H5.02067L5.98067%203ZM8.96727%203H7.03061L6.07001%206H9.92601L8.96727%203ZM11.7013%203H10.0173L10.9773%206H13.3253L11.7013%203Z'%20fill='%23212121'%20/%3e%3c/svg%3e" 
                                      alt="Premium" 
                                      className="w-3.5 h-3.5 opacity-40"
                                    />
                                  </div>
                                )}
                              </div>
                              <p className="text-xs leading-tight text-gray-500 mt-0 truncate text-left">
                                {result.module}
                                {result.module && result.description && ' › '}
                                {result.description}
                              </p>
                            </div>
                            <button className="text-gray-110 hover:text-gray-140 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity self-center">
                              <MoveUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
  
  const renderMainView = () => {
    // If search is active, show search results
    if (isSearchActive && searchQuery) {
      return renderSearchResults();
    }
    
    if (activeSection) return renderSecondLevel();
    if (activeNav === 'favorites') return renderFavoritesView();

    const groups = activeTabSections.flatMap((source) => source.categories);

    if (groups.length === 0 && activeNav !== 'favorites') {
      return (
        <div className="flex-1 flex items-center justify-center bg-[#fafafa] px-3">
          <div className="text-center">
            <div className="mb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30">
                {activeNav === 'core' ? (
                  <CoreIcon className="w-6 h-6 text-gray-110" />
                ) : (
                  <ConnectorsIcon className="w-6 h-6 text-gray-110" />
                )}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-190 mb-1">{activeNav === 'core' ? 'No core actions installed' : `No ${activeNav === 'apps' ? 'connectors' : activeNav} installed`}</h3>
            <p className="text-sm text-gray-130 mb-4">Install {activeNav === 'apps' ? 'connectors' : 'actions'} from the library to get started</p>
            <button
              onClick={() => openLibraryModal()}
              className="text-sm text-[#0078d4] hover:underline"
            >
              Browse library
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
        {groups.map((group: any, groupIndex: number) => (
          <div key={group.name} className={cn("relative mb-6", groupIndex > 0 && "mt-6")}>
            <div data-category={group.name} className="sticky top-0 z-10 bg-[#fafafa]">
              <div className="flex items-center justify-between py-2 pr-4">
                <span className="text-sm font-semibold text-gray-190 text-left">{group.name}</span>
                <button
                  onClick={() => {
                    // Hardcoded approach: Check the group name to determine which tab to select
                    // This is the most reliable approach since we know the group names
                    
                    // Core action groups (known group names for core actions)
                    const coreGroups = ['Files', 'Interaction', 'System', 'Logic', 'Advanced'];
                    
                    // If the group name is in the list of core groups, select the core tab
                    // Otherwise, select the connectors tab
                    const tabToSelect: 'core' | 'connectors' = 
                      coreGroups.includes(group.name) ? 'core' : 'connectors';
                    
                    console.log('See All clicked for group:', group.name, 'Setting tab to:', tabToSelect);
                    
                    // First set the tab, then the category, then open the modal
                    setSelectedLibraryTab(tabToSelect);
                    setSelectedLibraryCategory(group.name.toLowerCase());
                    setIsLibraryModalOpen(true);
                  }}
                  className="text-xs text-[#0078d4] hover:underline"
                >
                  See all
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden p-2">
              <div>
                {group.modules.map((module: any) => (
                  <div key={module.name}>
                    <button
                      className="w-full flex items-center gap-2 pl-2 pr-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md"
                      title={`Expand ${module.name}`}
                      onClick={() => setActiveSection(module)}
                    >
                      {activeNav === 'connectors' ? (
                        <ConnectorIcon 
                          name={module.name} 
                          color={module.color} 
                          icon={module.icon} 
                        />
                      ) : (
                        <div className={cn("p-1 rounded-md flex items-center justify-center", module.color)} style={{ width: '24px', height: '24px' }}>
                          <module.icon className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-sm text-gray-150 flex-1 text-left">{module.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-130 ml-auto" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSecondLevel = () => {
    if (!activeSection) return null;

    // Check if there's only one submodule with a name
    const hasOnlySingleSubgroup = activeSection.submodules?.length === 1 && activeSection.submodules[0].name;

    return (
      <div className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
        <div className="relative mb-6">
          <div className="sticky top-0 z-10 bg-[#fafafa]">
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={() => setActiveSection(null)}
                className="p-1 rounded-full hover:bg-gray-20 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-130 transform rotate-180" />
              </button>
              <span className="text-sm font-semibold text-gray-190 text-left">{activeSection.name}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden p-2">
            <div>
              {activeSection.submodules?.length === 0 ? (
                <div className="space-y-1">
                  {activeSection.actions?.map(renderActionItem)}
                </div>
              ) : hasOnlySingleSubgroup ? (
                // If there's only one subgroup, show its actions directly
                <div className="space-y-1">
                  {activeSection.submodules[0].actions.map(renderActionItem)}
                </div>
              ) : (
                // If there are multiple subgroups, keep the current behavior
                activeSection.submodules.map((submodule: any) => (
                  <div key={submodule.name}>
                    {submodule.name ? (
                      <>
                        <button
                          onClick={() => toggleSubgroup(submodule.name)}
                          className="w-full flex items-center gap-2 pl-2 pr-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md"
                          title={`${expandedSubgroups[submodule.name] ? 'Collapse' : 'Expand'} ${submodule.name}`}
                        >
                          <ChevronRight 
                            className={cn(
                              "w-4 h-4 text-gray-130 transition-transform",
                              expandedSubgroups[submodule.name] && "transform rotate-90"
                            )} 
                          />
                          <span className="text-sm text-gray-150 flex-1 text-left">{submodule.name}</span>
                          <div className="ml-auto">
                            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gray-30 text-gray-110 text-xs">
                              {submodule.actions.length}
                            </span>
                          </div>
                        </button>
                        {expandedSubgroups[submodule.name] && (
                          <div className="ml-4">
                            {submodule.actions.map(renderActionItem)}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-1">
                        {submodule.actions.map(renderActionItem)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#fafafa]">
      <div className="flex-shrink-0 px-3 py-2.5 border-b border-gray-40">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-110 h-3.5 w-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all actions"
            className={cn(
              "w-full pl-8 pr-2.5 py-1.5 border border-gray-40 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4] bg-white h-8",
              searchQuery ? "pr-8" : "pr-3"
            )}
            autoComplete="off"
            aria-label="Search actions"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-110 hover:text-gray-140 transition-colors focus:outline-none"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        
        {/* No separate search tabs needed as we'll use the main navigation */}

        <div className="flex items-center gap-1.5 mt-3">
          {!searchQuery ? (
            /* Show original navigation when not searching */
            <>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setActiveSection(null);
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-2.5 h-7 rounded-full text-xs font-medium transition-all duration-200",
                      "border",
                      isActive 
                        ? "border-[#0078d4] bg-[#0078d4]/5 text-[#0078d4]" 
                        : "border-gray-40 text-gray-140 hover:border-gray-30 hover:bg-gray-20"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="ml-auto">
                <FilterDropdown
                  selectedFilters={selectedFilters}
                  onFilterChange={setSelectedFilters}
                />
              </div>
            </>
          ) : (
            /* Show Local and Library tabs when searching */
            <>
              <button
                onClick={() => setSearchActiveTab('local')}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-2.5 h-7 rounded-full text-xs font-medium transition-all duration-200",
                  "border",
                  searchActiveTab === 'local' 
                    ? "border-[#0078d4] bg-[#0078d4]/5 text-[#0078d4]" 
                    : "border-gray-40 text-gray-140 hover:border-gray-30 hover:bg-gray-20"
                )}
                aria-label="Show local search results"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Local</span>
                {filteredLocalResults.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gray-30 text-gray-110 text-xs">
                    {filteredLocalResults.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSearchActiveTab('library')}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-2.5 h-7 rounded-full text-xs font-medium transition-all duration-200",
                  "border",
                  searchActiveTab === 'library' 
                    ? "border-[#0078d4] bg-[#0078d4]/5 text-[#0078d4]" 
                    : "border-gray-40 text-gray-140 hover:border-gray-30 hover:bg-gray-20"
                )}
                aria-label="Show library search results"
              >
                <Package2 className="w-3.5 h-3.5" />
                <span>Library</span>
                {librarySearchResults.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gray-30 text-gray-110 text-xs">
                    {librarySearchResults.length}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {renderMainView()}

      <div className="border-t border-gray-40 bg-[#fafafa] p-3">
        <div className="overflow-hidden">
          <button
            onClick={() => setIsTemplatesModalOpen(true)}
            className="w-full flex items-center gap-2 pl-2 pr-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md"
          >
            <LayoutTemplate className="w-4 h-4 text-gray-140" />
            <span className="text-sm text-gray-150 flex-1 text-left">Templates</span>
            <ChevronRight className="w-4 h-4 text-gray-130 ml-auto" />
          </button>
          <button
            onClick={() => {
              setSelectedLibraryCategory(null);
              setIsLibraryModalOpen(true);
            }}
            className="w-full flex items-center gap-2 pl-2 pr-2 py-1.5 hover:bg-gray-20 transition-colors rounded-md"
          >
            <Package2 className="w-4 h-4 text-gray-140" />
            <span className="text-sm text-gray-150 flex-1 text-left">Library</span>
            <ChevronRight className="w-4 h-4 text-gray-130 ml-auto" />
          </button>
        </div>
      </div>

      <TemplatesModal 
        isOpen={isTemplatesModalOpen} 
        onClose={() => setIsTemplatesModalOpen(false)} 
      />
      
      <LibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => {
          setIsLibraryModalOpen(false);
          setSelectedLibraryCategory(null);
        }}
        initialCategory={selectedLibraryCategory}
        initialTab={selectedLibraryTab}
      />
    </div>
  );
};

export default Sidebar;