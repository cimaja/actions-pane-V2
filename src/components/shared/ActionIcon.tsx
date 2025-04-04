import React from 'react';
import { cn } from '../../lib/utils';
import { getCategoryColorClasses } from '../../config/actionStyles';
import { IconDefinition, FluentIcons } from '../../config/iconLibraries';

export type ActionIconSize = 'small' | 'medium' | 'large';

export interface ActionIconProps {
  /**
   * The action module object containing name, icon, color, and category information
   */
  module: {
    name: string;
    icon: React.ElementType | IconDefinition;
    color?: string;
    categoryName?: string;
    category?: string;
  };
  
  /**
   * Size variant for the icon
   * - small: 24px (sidebar)
   * - medium: 28px (library grid)
   * - large: 64px (module details)
   */
  size?: ActionIconSize;
  
  /**
   * Optional additional class names
   */
  className?: string;
}

/**
 * Standardized action icon component that follows the LibraryModal pattern
 * Used to display action icons consistently across the application
 * 
 * Colors are applied based on the action category using the centralized configuration
 * in src/config/actionStyles.ts, which defines all category colors and icons.
 */
export const ActionIcon: React.FC<ActionIconProps> = ({
  module,
  size = 'small',
  className
}) => {
  // We only need container size classes and icon size classes
  
  // Determine container size classes
  const containerSizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-7 h-7',
    large: 'w-16 h-16'
  };
  
  // Determine icon size based on container size
  const iconSizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-10 h-10'
  };
  
  // Get the appropriate color class based on the category name
  // Determine the category name from either categoryName or category property
  const categoryName = module.categoryName || module.category || '';
  
  // Use the centralized configuration to get the color class
  let colorClass = getCategoryColorClasses(categoryName);
  
  // Add debug logging to help identify category name issues
  console.log(`ActionIcon: module=${module.name}, categoryName=${categoryName}, color=${colorClass}`);
  
  // Get the icon component to use
  let Icon: React.ElementType = FluentIcons.Puzzle;
  
  // Check if the icon is an IconDefinition (from our icon libraries)
  if (module.icon && typeof module.icon === 'object' && 'component' in module.icon) {
    Icon = module.icon.component as React.ElementType;
    // Add debug logging to help identify icon library issues
    console.log(`ActionIcon: module=${module.name}, icon library=${(module.icon as IconDefinition).library}`);
  } 
  // Or if it's a direct React component (like Lucide icons)
  else if (module.icon && typeof module.icon !== 'string') {
    Icon = module.icon as React.ElementType;
    // Add debug logging for direct React components
    console.log(`ActionIcon: module=${module.name}, using direct React component`);
  }
  
  // Render the icon
  return (
    <div 
      className={cn(
        "flex-shrink-0 rounded-lg flex items-center justify-center transition-colors",
        containerSizeClasses[size],
        colorClass,
        className
      )}
      title={`${module.name}`}
    >
      <Icon className={iconSizeClasses[size]} />
    </div>
  );
};

export default ActionIcon;
