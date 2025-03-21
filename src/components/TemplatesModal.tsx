import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, X as CloseIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { templates } from '../data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'lead-management', label: 'Lead management' },
  { id: 'sales-pipeline', label: 'Sales pipeline' },
  { id: 'marketing-campaigns', label: 'Marketing campaigns' },
  { id: 'customer-support', label: 'Customer support' },
  { id: 'data-management', label: 'Data management' },
  { id: 'project-management', label: 'Project management' },
  { id: 'tickets-incidents', label: 'Tickets & incidents' }
];

export function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Popular' | 'A-Z'>('Popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

  const getFilteredTemplates = () => {
    let filtered = [...templates];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-40 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-190">Templates</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-20 transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-130" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-40 bg-[#fafafa] space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-110 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates"
                className={cn(
                  "w-full pl-9 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent bg-white/90",
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
          
          <div className="flex items-center gap-2">
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2",
                  "text-gray-140 hover:text-gray-190",
                  showSortDropdown ? "bg-gray-20" : "hover:bg-gray-20/50"
                )}
              >
                <span>{sortBy}</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-110 transition-transform duration-200",
                  showSortDropdown && "transform rotate-180"
                )} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-md shadow-sm border border-gray-30 py-1 z-50">
                  {(['Popular', 'A-Z'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSortBy(type);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-20 flex items-center",
                        sortBy === type ? "text-[#0078d4]" : "text-gray-140"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2",
                  "text-gray-140 hover:text-gray-190",
                  showCategoryDropdown ? "bg-gray-20" : "hover:bg-gray-20/50"
                )}
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-110 transition-transform duration-200",
                  showCategoryDropdown && "transform rotate-180"
                )} />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-sm border border-gray-30 py-1 z-50">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setShowCategoryDropdown(false);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-20 flex items-center",
                      selectedCategory === 'All' ? "text-[#0078d4]" : "text-gray-140"
                    )}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.label);
                        setShowCategoryDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-20 flex items-center",
                        selectedCategory === category.label ? "text-[#0078d4]" : "text-gray-140"
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#fafafa]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredTemplates().map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg border border-gray-30/80 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {template.usedActions.slice(0, 3).map((action, index) => (
                      <div
                        key={index}
                        className="p-1.5 rounded-lg bg-gray-20"
                      >
                        <action.icon className={cn("w-4 h-4", action.color)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-190">
                      {template.title}
                    </h3>
                    <p className="text-xs leading-normal text-gray-130 mt-1">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-110">
                      {template.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredTemplates().length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-30 mb-3">
                <Search className="w-6 h-6 text-gray-110" />
              </div>
              <h3 className="text-sm font-medium text-gray-190 mb-1">No templates found</h3>
              <p className="text-sm text-gray-130">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}