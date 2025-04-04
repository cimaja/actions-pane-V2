import { IconDefinition, CommonIcons, FluentIcons, createIconDefinition } from './iconLibraries';

/**
 * Central configuration for action categories, colors, and icons
 * This provides a single source of truth for styling actions throughout the application
 */

// Main categories for core actions
export type ActionCategory = 
  | 'Files'
  | 'Interaction'
  | 'System'
  | 'Integration'
  | 'Logic'
  | 'Advanced'
  | 'Custom actions'
  | 'UI Automation';

// Interface for category styles
export interface CategoryStyle {
  /** Background and text color classes for the category */
  colorClasses: string;
  /** Icon definition to use for the category */
  icon: IconDefinition;
  /** Keywords that identify this category */
  keywords: string[];
  /** Description of the category */
  description: string;
}

// Interface for specific module styles
export interface ModuleStyle {
  /** The name of the module as it appears in the UI */
  name: string;
  /** Background and text color classes for the module */
  colorClasses: string;
  /** Icon definition to use for the module */
  icon: IconDefinition;
  /** The category this module belongs to */
  category: ActionCategory;
  /** Description of the module */
  description: string;
}

/**
 * Mapping of category names to their style configurations
 * This is the central place to modify colors and icons for all action categories
 */
export const ACTION_CATEGORY_STYLES: Record<ActionCategory, CategoryStyle> = {
  'Files': {
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: CommonIcons.file,
    keywords: ['file', 'files', 'document'],
    description: 'Actions for working with files and documents'
  },
  'Interaction': {
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: CommonIcons.message,
    keywords: ['interact', 'interaction', 'message', 'notification'],
    description: 'Actions for user interaction and notifications'
  },
  'System': {
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: CommonIcons.computer,
    keywords: ['system', 'process', 'environment'],
    description: 'System-level operations and utilities'
  },
  'Integration': {
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: CommonIcons.web,
    keywords: ['integration', 'connect', 'api', 'service'],
    description: 'Integration with external services and APIs'
  },
  'Logic': {
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: CommonIcons.branch,
    keywords: ['logic', 'condition', 'flow', 'control'],
    description: 'Logic and control flow operations'
  },
  'Advanced': {
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: CommonIcons.settings,
    keywords: ['advanced', 'expert', 'config', 'setting'],
    description: 'Advanced and configuration actions'
  },
  'Custom actions': {
    colorClasses: 'bg-purple-100 text-purple-600',
    icon: CommonIcons.puzzle,
    keywords: ['custom', 'user', 'created'],
    description: 'User-created custom actions'
  },
  'UI Automation': {
    colorClasses: 'bg-blue-100 text-blue-600',
    icon: CommonIcons.grid,
    keywords: ['ui', 'automation', 'collection', 'interface'],
    description: 'UI automation and collection actions'
  }
};

/**
 * Comprehensive mapping of all core modules to their specific styles
 * This is the central place to modify the appearance of individual modules
 */
export const CORE_MODULE_STYLES: Record<string, ModuleStyle> = {
  // Files Category
  'Files': {
    name: 'Files',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Document, 'fluent'),
    category: 'Files',
    description: 'Work with files and file content'
  },
  'Folders': {
    name: 'Folders',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Folder, 'fluent'),
    category: 'Files',
    description: 'Create, delete, and manage folders'
  },
  'Text Files': {
    name: 'Text Files',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Document, 'fluent'),
    category: 'Files',
    description: 'Work with text files'
  },
  'Excel': {
    name: 'Excel',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Table, 'fluent'),
    category: 'Files',
    description: 'Work with Excel spreadsheets'
  },
  'PDF': {
    name: 'PDF',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.DocumentPdf, 'fluent'),
    category: 'Files',
    description: 'Work with PDF documents'
  },
  'Zip': {
    name: 'Zip',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Document, 'fluent'),
    category: 'Files',
    description: 'Compress and extract zip archives'
  },
  'Access': {
    name: 'Access',
    colorClasses: 'bg-amber-100 text-amber-600',
    icon: createIconDefinition(FluentIcons.Database, 'fluent'),
    category: 'Files',
    description: 'Work with Microsoft Access databases'
  },
  
  // Interaction Category
  'Message Boxes': {
    name: 'Message Boxes',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Chat, 'fluent'),
    category: 'Interaction',
    description: 'Display message boxes to users'
  },
  'Notifications': {
    name: 'Notifications',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Alert, 'fluent'),
    category: 'Interaction',
    description: 'Display system notifications'
  },
  'Email': {
    name: 'Email',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Mail, 'fluent'),
    category: 'Interaction',
    description: 'Send and receive emails'
  },
  'Clipboard': {
    name: 'Clipboard',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Clipboard, 'fluent'),
    category: 'Interaction',
    description: 'Work with the system clipboard'
  },
  'Keyboard': {
    name: 'Keyboard',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Keyboard, 'fluent'),
    category: 'Interaction',
    description: 'Simulate keyboard input'
  },
  'Mouse': {
    name: 'Mouse',
    colorClasses: 'bg-orange-100 text-orange-600',
    icon: createIconDefinition(FluentIcons.Document, 'fluent'),
    category: 'Interaction',
    description: 'Simulate mouse actions'
  },
  
  // System Category
  'System': {
    name: 'System',
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: createIconDefinition(FluentIcons.Server, 'fluent'),
    category: 'System',
    description: 'Interact with the operating system'
  },
  'CMD Session': {
    name: 'CMD Session',
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: createIconDefinition(FluentIcons.Code, 'fluent'),
    category: 'System',
    description: 'Run command line operations'
  },
  'PowerShell': {
    name: 'PowerShell',
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: createIconDefinition(FluentIcons.Code, 'fluent'),
    category: 'System',
    description: 'Execute PowerShell commands'
  },
  'Services': {
    name: 'Services',
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: createIconDefinition(FluentIcons.Server, 'fluent'),
    category: 'System',
    description: 'Manage system services'
  },
  'Registry': {
    name: 'Registry',
    colorClasses: 'bg-emerald-100 text-emerald-600',
    icon: createIconDefinition(FluentIcons.Server, 'fluent'),
    category: 'System',
    description: 'Work with the Windows registry'
  },
  
  // Integration Category
  'FTP': {
    name: 'FTP',
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: createIconDefinition(FluentIcons.Globe, 'fluent'),
    category: 'Integration',
    description: 'Transfer files via FTP'
  },
  'Azure': {
    name: 'Azure',
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: createIconDefinition(FluentIcons.Cloud, 'fluent'),
    category: 'Integration',
    description: 'Integrate with Microsoft Azure services'
  },
  'Web': {
    name: 'Web',
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: createIconDefinition(FluentIcons.Globe, 'fluent'),
    category: 'Integration',
    description: 'Work with web services and APIs'
  },
  'REST': {
    name: 'REST',
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: createIconDefinition(FluentIcons.Globe, 'fluent'),
    category: 'Integration',
    description: 'Make REST API calls'
  },
  'SOAP': {
    name: 'SOAP',
    colorClasses: 'bg-indigo-100 text-indigo-600',
    icon: createIconDefinition(FluentIcons.Globe, 'fluent'),
    category: 'Integration',
    description: 'Work with SOAP web services'
  },
  
  // Logic Category
  'Loops': {
    name: 'Loops',
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: createIconDefinition(FluentIcons.Repeat, 'fluent'),
    category: 'Logic',
    description: 'Create loops and iterations'
  },
  'Conditions': {
    name: 'Conditions',
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: createIconDefinition(FluentIcons.Fork, 'fluent'),
    category: 'Logic',
    description: 'Create conditional logic'
  },
  'Variables': {
    name: 'Variables',
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: createIconDefinition(FluentIcons.Code, 'fluent'),
    category: 'Logic',
    description: 'Work with variables'
  },
  'Flow Control': {
    name: 'Flow Control',
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: createIconDefinition(FluentIcons.Branch, 'fluent'),
    category: 'Logic',
    description: 'Control the flow of execution'
  },
  'Data Conversion': {
    name: 'Data Conversion',
    colorClasses: 'bg-rose-100 text-rose-600',
    icon: createIconDefinition(FluentIcons.ArrowRightLeft, 'fluent'),
    category: 'Logic',
    description: 'Convert between data types'
  },
  
  // Advanced Category
  'Scripting': {
    name: 'Scripting',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Code, 'fluent'),
    category: 'Advanced',
    description: 'Execute custom scripts'
  },
  'Performance': {
    name: 'Performance',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Code, 'fluent'),
    category: 'Advanced',
    description: 'Monitor and optimize performance'
  },
  'Scheduling': {
    name: 'Scheduling',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Calendar, 'fluent'),
    category: 'Advanced',
    description: 'Schedule tasks and actions'
  },
  'Timers': {
    name: 'Timers',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Clock, 'fluent'),
    category: 'Advanced',
    description: 'Work with timers and delays'
  },
  'Workflow': {
    name: 'Workflow',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Branch, 'fluent'), // Using GitBranch as a substitute for Workflow
    category: 'Advanced',
    description: 'Create and manage workflows'
  },
  'Encryption': {
    name: 'Encryption',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Lock, 'fluent'),
    category: 'Advanced',
    description: 'Encrypt and decrypt data'
  },
  'Hashing': {
    name: 'Hashing',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Key, 'fluent'),
    category: 'Advanced',
    description: 'Generate and verify hashes'
  },
  'Authentication': {
    name: 'Authentication',
    colorClasses: 'bg-gray-100 text-gray-600',
    icon: createIconDefinition(FluentIcons.Key, 'fluent'),
    category: 'Advanced',
    description: 'Manage authentication and authorization'
  },
  
  // UI Automation Category
  'UI Automation': {
    name: 'UI Automation',
    colorClasses: 'bg-blue-100 text-blue-600',
    icon: createIconDefinition(FluentIcons.Grid, 'fluent'),
    category: 'UI Automation',
    description: 'Automate UI interactions'
  },
  
  // Custom Actions Category
  'Custom actions': {
    name: 'Custom actions',
    colorClasses: 'bg-purple-100 text-purple-600',
    icon: createIconDefinition(FluentIcons.Puzzle, 'fluent'),
    category: 'Custom actions',
    description: 'User-created custom actions'
  }
};

/**
 * Get the style configuration for a specific module
 * @param moduleName The module name to look up
 * @returns The style configuration for the module
 */
export function getModuleStyle(moduleName: string): ModuleStyle | null {
  // Try direct match first
  const directMatch = CORE_MODULE_STYLES[moduleName];
  if (directMatch) {
    return directMatch;
  }
  
  // Try to find a partial match
  const moduleKeys = Object.keys(CORE_MODULE_STYLES);
  for (const key of moduleKeys) {
    if (moduleName.includes(key) || key.includes(moduleName)) {
      return CORE_MODULE_STYLES[key];
    }
  }
  
  return null;
}

/**
 * Get the style configuration for a category
 * @param categoryName The category name to look up
 * @returns The style configuration for the category
 */
export function getCategoryStyle(categoryName: string): CategoryStyle {
  // Try direct match first
  const directMatch = ACTION_CATEGORY_STYLES[categoryName as ActionCategory];
  if (directMatch) {
    return directMatch;
  }
  
  // If no direct match, try to match by keywords
  const lowerCaseName = categoryName.toLowerCase();
  
  for (const [_, style] of Object.entries(ACTION_CATEGORY_STYLES)) {
    // Check if any keyword is included in the category name
    if (style.keywords.some(keyword => lowerCaseName.includes(keyword))) {
      return style;
    }
  }
  
  // Default to Advanced if no match is found
  return ACTION_CATEGORY_STYLES['Advanced'];
}

/**
 * Get color classes for a module or category
 * @param name The module or category name
 * @returns The color classes for the module or category
 */
export function getColorClasses(name: string): string {
  // First try to get module-specific style
  const moduleStyle = getModuleStyle(name);
  if (moduleStyle) {
    return moduleStyle.colorClasses;
  }
  
  // Fall back to category style
  return getCategoryStyle(name).colorClasses;
}

/**
 * Get color classes for a category
 * @param categoryName The category name
 * @returns The color classes for the category
 */
export function getCategoryColorClasses(categoryName: string): string {
  return getCategoryStyle(categoryName).colorClasses;
}

/**
 * Get icon for a module or category
 * @param name The module or category name
 * @returns The icon definition for the module or category
 */
export function getIcon(name: string): IconDefinition {
  // First try to get module-specific icon
  const moduleStyle = getModuleStyle(name);
  if (moduleStyle) {
    return moduleStyle.icon;
  }
  
  // Fall back to category icon
  return getCategoryStyle(name).icon;
}

/**
 * Get icon for a category
 * @param categoryName The category name
 * @returns The icon definition for the category
 */
export function getCategoryIcon(categoryName: string): IconDefinition {
  return getCategoryStyle(categoryName).icon;
}

/**
 * Determine if a module is a custom action
 * @param module The module object
 * @returns True if the module is a custom action
 */
export function isCustomAction(module: any): boolean {
  const categoryName = module.categoryName || module.category || '';
  return (
    categoryName === 'Custom actions' || 
    categoryName === 'Custom' || 
    module.name === 'Format JSON'
  );
}
