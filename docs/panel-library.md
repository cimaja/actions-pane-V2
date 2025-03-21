# Panel and Library Documentation

## Overview

The application consists of two main components: a side panel for quick access to actions and a library modal for managing action modules. The system is built with React and uses Tailwind CSS for styling.

## Side Panel

### Features

- **Quick Access**: Provides fast access to installed actions
- **Search**: Global search across all actions
- **Category Navigation**: Switch between different action categories
  - Core
  - Connectors
  - Favorites

### Structure

- **Categories**: Actions are organized by main categories (Logic, Interaction, System)
- **Modules**: Each category contains multiple modules
- **Submodules**: Modules can have submodules for better organization
- **Actions**: Individual actions that can be used in workflows

### Interaction

- Click on modules to expand/collapse
- Drag actions to the workflow canvas
- Filter actions using the search bar
- Toggle favorites for quick access

## Library Modal

### Features

- **Full Module Management**: Install/uninstall action modules
- **Advanced Search**: Search across all available modules
- **Sorting Options**: Sort by category or name
- **Detailed Views**: Comprehensive information about each module

### Tabs

1. **Core**
   - Logic actions
   - Interaction controls
   - System operations

2. **Connectors**
   - Integration with external services
   - API connections
   - Third-party tools

3. **Custom Actions**
   - User-defined actions
   - Custom workflows

4. **UI Element Collections**
   - Reusable UI components
   - Interface elements

### Module Details

Each module displays:
- Icon and name
- Category
- Installation status
- Action count
- Description (if available)
- List of available actions
- Submodule groupings

### Installation Management

- One-click installation/uninstallation
- Visual indicators for installed modules
- Batch operations support
- Installation status persistence

## Data Structure

### Action Sources
```typescript
interface ActionSource {
  name: string;
  icon: LucideIcon;
  color: string;
  categories: ActionCategory[];
}
```

### Categories
```typescript
interface ActionCategory {
  name: string;
  modules: ActionModule[];
  icon: LucideIcon;
  color: string;
  description?: string;
}
```

### Modules
```typescript
interface ActionModule {
  name: string;
  icon: LucideIcon;
  color: string;
  submodules: ActionSubmodule[];
}
```

### Submodules
```typescript
interface ActionSubmodule {
  name: string;
  actions: string[];
}
```

## State Management

- Uses Zustand for state management
- Persists installation status
- Manages favorites and custom configurations
- Handles search and filter states

## Styling

- Consistent color scheme using Tailwind CSS
- Responsive design
- Smooth transitions and animations
- Accessible UI elements

## Best Practices

1. **Installation**
   - Install only needed modules
   - Review dependencies before installation
   - Test after installing new modules

2. **Organization**
   - Keep related actions together
   - Use meaningful names
   - Document custom actions

3. **Performance**
   - Minimize installed modules
   - Use search efficiently
   - Leverage favorites for frequent actions