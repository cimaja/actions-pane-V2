import React from 'react';
import { cn } from '../../lib/utils';
import { getConnectorLogoUrl } from '../../data/connectorLogos';

export type ConnectorLogoSize = 'small' | 'medium' | 'large';

export interface ConnectorLogoProps {
  /**
   * The name of the connector
   */
  name: string;
  
  /**
   * Size variant for the logo
   * - small: 24px (sidebar)
   * - medium: 28px (library grid)
   * - large: 64px (module details)
   */
  size?: ConnectorLogoSize;
  
  /**
   * Optional additional class names
   */
  className?: string;
}

/**
 * Standardized connector logo component that follows the LibraryModal pattern
 * Used to display connector logos consistently across the application
 */
export const ConnectorLogo: React.FC<ConnectorLogoProps> = ({
  name,
  size = 'small',
  className
}) => {
  // Determine size classes based on the size prop
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-7 h-7',
    large: 'w-16 h-16'
  };
  
  // Determine container size classes
  const containerSizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-7 h-7',
    large: 'w-16 h-16'
  };
  
  // Get the connector logo URL
  const logoUrl = getConnectorLogoUrl(name);
  
  return (
    <div 
      className={cn(
        "flex-shrink-0 rounded-lg flex items-center justify-center transition-colors bg-white overflow-hidden",
        containerSizeClasses[size],
        className
      )}
    >
      <img 
        src={logoUrl} 
        alt={`${name} logo`} 
        className={cn(
          "object-contain",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export default ConnectorLogo;
