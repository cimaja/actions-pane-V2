import React from 'react';
// Import specific Fluent icons that we need
import {
  // Files & Documents
  DocumentRegular,
  DocumentPdfRegular,
  FolderRegular,
  TableRegular,
  DatabaseRegular,
  
  // UI Elements
  SettingsRegular,
  ChatRegular,
  AlertRegular,
  MailRegular,
  ClipboardRegular,
  KeyboardRegular,
  
  // System
  LaptopRegular,
  ServerRegular,
  
  // Integration
  CloudRegular,
  GlobeRegular,
  
  // Logic
  BranchRegular,
  ArrowSplitRegular,
  CodeRegular,
  ArrowRepeatAllRegular,
  ArrowSwapRegular,
  BracesRegular,
  
  // Advanced
  CalendarRegular,
  ClockRegular,
  LockClosedRegular,
  KeyRegular,
  
  // Custom
  PuzzlePieceRegular,
  GridRegular,
  
  // Fallback
  QuestionCircleRegular
} from '@fluentui/react-icons';

// Create a namespace for Fluent icons
const FluentIcons = {
  // Files & Documents
  Document: DocumentRegular,
  DocumentPdf: DocumentPdfRegular,
  Folder: FolderRegular,
  Table: TableRegular,
  Database: DatabaseRegular,
  
  // UI Elements
  Settings: SettingsRegular,
  Chat: ChatRegular,
  Alert: AlertRegular,
  Mail: MailRegular,
  Clipboard: ClipboardRegular,
  Keyboard: KeyboardRegular,
  
  // System
  Laptop: LaptopRegular,
  Server: ServerRegular,
  
  // Integration
  Cloud: CloudRegular,
  Globe: GlobeRegular,
  
  // Logic
  Branch: BranchRegular,
  Fork: ArrowSplitRegular,
  Code: CodeRegular,
  Repeat: ArrowRepeatAllRegular,
  ArrowRightLeft: ArrowSwapRegular,
  Braces: BracesRegular,
  
  // Advanced
  Calendar: CalendarRegular,
  Clock: ClockRegular,
  Lock: LockClosedRegular,
  Key: KeyRegular,
  
  // Custom
  Puzzle: PuzzlePieceRegular,
  Grid: GridRegular,
  
  // Fallback
  HelpCircle: QuestionCircleRegular
};

// Export the Fluent icons for use in other files
export { FluentIcons };

/**
 * Icon source library identifiers
 */
export type IconLibrary = 'fluent';

/**
 * Interface for icon definition with source library
 */
export interface IconDefinition {
  /** The icon component */
  component: React.ElementType;
  /** The source library of the icon */
  library: IconLibrary;
}

/**
 * Create an icon definition from a direct component reference
 * @param component The React component for the icon
 * @param library The source library
 * @returns Icon definition
 */
export function createIconDefinition(
  component: React.ElementType, 
  library: IconLibrary
): IconDefinition {
  return {
    component,
    library
  };
}



/**
 * Common icon mapping for easy reference
 * This provides a convenient way to reference commonly used icons from either library
 */
export const CommonIcons = {
  // Advanced
  code: createIconDefinition(FluentIcons.Code, 'fluent'),
  calendar: createIconDefinition(FluentIcons.Calendar, 'fluent'),
  clock: createIconDefinition(FluentIcons.Clock, 'fluent'),
  lock: createIconDefinition(FluentIcons.Lock, 'fluent'),
  key: createIconDefinition(FluentIcons.Key, 'fluent'),

  // Files and Documents
  file: createIconDefinition(FluentIcons.Document, 'fluent'),
  fileText: createIconDefinition(FluentIcons.Document, 'fluent'),
  filePdf: createIconDefinition(FluentIcons.DocumentPdf, 'fluent'),
  folder: createIconDefinition(FluentIcons.Folder, 'fluent'),
  document: createIconDefinition(FluentIcons.Document, 'fluent'),
  documentPdf: createIconDefinition(FluentIcons.DocumentPdf, 'fluent'),
  excel: createIconDefinition(FluentIcons.Table, 'fluent'),
  pdf: createIconDefinition(FluentIcons.DocumentPdf, 'fluent'),
  spreadsheet: createIconDefinition(FluentIcons.Table, 'fluent'),
  database: createIconDefinition(FluentIcons.Database, 'fluent'),
  
  // UI Elements
  settings: createIconDefinition(FluentIcons.Settings, 'fluent'),
  message: createIconDefinition(FluentIcons.Chat, 'fluent'),
  messageSquare: createIconDefinition(FluentIcons.Chat, 'fluent'),
  messageSquareCode: createIconDefinition(FluentIcons.Chat, 'fluent'),
  notification: createIconDefinition(FluentIcons.Alert, 'fluent'),
  mail: createIconDefinition(FluentIcons.Mail, 'fluent'),
  mailbox: createIconDefinition(FluentIcons.Mail, 'fluent'),
  clipboard: createIconDefinition(FluentIcons.Clipboard, 'fluent'),
  keyboard: createIconDefinition(FluentIcons.Keyboard, 'fluent'),
  eye: createIconDefinition(FluentIcons.Alert, 'fluent'),
  users: createIconDefinition(FluentIcons.Puzzle, 'fluent'),
  share: createIconDefinition(FluentIcons.Globe, 'fluent'),
  form: createIconDefinition(FluentIcons.Clipboard, 'fluent'),
  linkedin: createIconDefinition(FluentIcons.Globe, 'fluent'),
  
  // System
  computer: createIconDefinition(FluentIcons.Laptop, 'fluent'),
  deviceDesktop: createIconDefinition(FluentIcons.Laptop, 'fluent'),
  monitor: createIconDefinition(FluentIcons.Laptop, 'fluent'),
  monitorSmartphone: createIconDefinition(FluentIcons.Laptop, 'fluent'),
  server: createIconDefinition(FluentIcons.Server, 'fluent'),
  terminal: createIconDefinition(FluentIcons.Code, 'fluent'),
  
  // Integration
  cloud: createIconDefinition(FluentIcons.Cloud, 'fluent'),
  globe: createIconDefinition(FluentIcons.Globe, 'fluent'),
  web: createIconDefinition(FluentIcons.Globe, 'fluent'),
  network: createIconDefinition(FluentIcons.Globe, 'fluent'),
  link: createIconDefinition(FluentIcons.Globe, 'fluent'),
  
  // Logic
  branch: createIconDefinition(FluentIcons.Branch, 'fluent'),
  fork: createIconDefinition(FluentIcons.Fork, 'fluent'),
  loop: createIconDefinition(FluentIcons.Repeat, 'fluent'),
  repeat: createIconDefinition(FluentIcons.Repeat, 'fluent'),
  convert: createIconDefinition(FluentIcons.ArrowRightLeft, 'fluent'),
  braces: createIconDefinition(FluentIcons.Braces, 'fluent'),
  variable: createIconDefinition(FluentIcons.Braces, 'fluent'),
  wrench: createIconDefinition(FluentIcons.Settings, 'fluent'),
  command: createIconDefinition(FluentIcons.Code, 'fluent'),
  xml: createIconDefinition(FluentIcons.Code, 'fluent'),
  ftp: createIconDefinition(FluentIcons.Server, 'fluent'),
  git: createIconDefinition(FluentIcons.Branch, 'fluent'),
  chart: createIconDefinition(FluentIcons.Grid, 'fluent'),
  
  // Custom
  puzzle: createIconDefinition(FluentIcons.Puzzle, 'fluent'),
  grid: createIconDefinition(FluentIcons.Grid, 'fluent'),
  brain: createIconDefinition(FluentIcons.Puzzle, 'fluent'),
  brainCircuit: createIconDefinition(FluentIcons.Puzzle, 'fluent'),
  hardDrive: createIconDefinition(FluentIcons.Server, 'fluent'),
  teams: createIconDefinition(FluentIcons.Chat, 'fluent'),
  word: createIconDefinition(FluentIcons.Document, 'fluent'),
  formInput: createIconDefinition(FluentIcons.Clipboard, 'fluent'),
  checkSquare: createIconDefinition(FluentIcons.Clipboard, 'fluent'),
  barChart: createIconDefinition(FluentIcons.Grid, 'fluent'),
  linkIcon: createIconDefinition(FluentIcons.Globe, 'fluent'),
  linkedinIcon: createIconDefinition(FluentIcons.Globe, 'fluent'),
  
  // Fallback
  fallback: createIconDefinition(FluentIcons.HelpCircle, 'fluent')
};
