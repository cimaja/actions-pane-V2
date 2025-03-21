import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface FilterOption {
  id: string;
  label: string;
  description: string;
}

interface FilterDropdownProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const filterOptions: FilterOption[] = [
  {
    id: 'dlp',
    label: 'Hide DLP actions',
    description: 'Exclude actions restricted by Data Loss Prevention policies'
  },
  {
    id: 'premium',
    label: 'Hide Premium actions',
    description: 'Exclude actions available with a premium subscription'
  }
];

export function FilterDropdown({ selectedFilters, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center p-1.5 rounded-md transition-all duration-200 relative",
          "border",
          isOpen 
            ? "border-[#0078d4] bg-[#0078d4]/5 text-[#0078d4]" 
            : "border-gray-40 text-gray-140 hover:border-gray-30 hover:bg-gray-20",
          selectedFilters.length > 0 && !isOpen && "text-[#0078d4] border-[#0078d4] bg-[#0078d4]/5"
        )}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
          <path d="M7.5 13H12.5C12.7761 13 13 13.2239 13 13.5C13 13.7455 12.8231 13.9496 12.5899 13.9919L12.5 14H7.5C7.22386 14 7 13.7761 7 13.5C7 13.2545 7.17688 13.0504 7.41012 13.0081L7.5 13H12.5H7.5ZM5.5 9H14.5C14.7761 9 15 9.22386 15 9.5C15 9.74546 14.8231 9.94961 14.5899 9.99194L14.5 10H5.5C5.22386 10 5 9.77614 5 9.5C5 9.25454 5.17688 9.05039 5.41012 9.00806L5.5 9H14.5H5.5ZM3.5 5H16.5C16.7761 5 17 5.22386 17 5.5C17 5.74546 16.8231 5.94961 16.5899 5.99194L16.5 6H3.5C3.22386 6 3 5.77614 3 5.5C3 5.25454 3.17688 5.05039 3.41012 5.00806L3.5 5H16.5H3.5Z" fill="currentColor"/>
        </svg>
        {selectedFilters.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#0078d4] w-2 h-2 rounded-full"></div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-30 py-1 z-50">          
          <div className="py-1">
            {filterOptions.map((option) => (
              <div key={option.id} className="relative group" role="menuitem">
                <button
                  onClick={() => toggleFilter(option.id)}
                  className="w-full px-3 py-1.5 flex items-center hover:bg-gray-20 transition-colors"
                  title={option.description}
                >
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                    selectedFilters.includes(option.id)
                      ? "bg-[#0078d4] border-[#0078d4]"
                      : "border-gray-300 group-hover:border-[#0078d4]"
                  )}>
                    <Check className={cn(
                      "w-2.5 h-2.5 transition-opacity",
                      selectedFilters.includes(option.id) ? "text-white opacity-100" : "opacity-0"
                    )} />
                  </div>
                  <div className="ml-2 text-left">
                    <div className="text-sm font-medium text-gray-190">{option.label}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}