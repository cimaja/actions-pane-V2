# ActionsPane2

ActionsPane2 is a React-based workflow automation UI that allows users to create, visualize, and manage automation workflows through a drag-and-drop interface. The application provides a visual canvas where users can add actions, connect them together, and configure their properties.

## Project Overview

This project is built with React, TypeScript, and Vite, utilizing a modern frontend stack with the following key features:

- **Drag-and-drop workflow editor** using ReactFlow
- **Fluent UI** components for a consistent design language
- **State management** with Zustand
- **Styling** with Tailwind CSS
- **TypeScript** for type safety

## Key Components

### Core Structure

- **App.tsx**: Main application component that sets up the workflow canvas and sidebar
- **main.tsx**: Entry point that renders the app with FluentProvider for theming

### State Management

The application uses Zustand for state management with the following stores:

- **workflow.ts**: Manages the workflow nodes and edges (connections between nodes)
- **actionsStore.ts**: Manages installed action categories, favorites, and recent actions
- **appStore.ts**: Handles application-level state

### UI Components

- **Sidebar.tsx**: Main navigation sidebar that displays available actions, favorites, and recent items
- **PropertiesPanel.tsx**: Panel for configuring selected node properties
- **LibraryModal.tsx**: Modal for browsing and installing action categories
- **TemplatesModal.tsx**: Modal for selecting workflow templates
- **Nodes**: 
  - **ActionNode.tsx**: Component for action nodes in the workflow
  - **TriggerNode.tsx**: Component for trigger nodes that start workflows

### Data

- **actions.ts**: Defines available actions, their categories, and metadata
- **apps.ts**: Defines external app connectors
- **templates.ts**: Defines workflow templates
- **navigation.ts**: Defines navigation structure

## Workflow Functionality

The application allows users to:

1. Drag actions from the sidebar onto the canvas
2. Connect actions together to create workflows
3. Configure action properties through the properties panel
4. Save favorite actions for quick access
5. Browse and install additional action categories
6. Use templates to quickly create common workflows

## Dependencies

Major dependencies include:

- **React 18**: Core UI library
- **ReactFlow**: For creating the interactive workflow diagram
- **@fluentui/react-components**: Microsoft's Fluent UI component library
- **@dnd-kit**: For drag and drop functionality
- **Zustand**: For state management
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety
- **Vite**: For fast development and building

## Development

To start the development server:

```bash
npm run dev
```

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
ActionsPane2/
├── .bolt/                # Bolt configuration
├── docs/                 # Documentation
├── src/
│   ├── components/       # UI components
│   │   ├── nodes/        # Workflow node components
│   ├── data/             # Data definitions
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── store/            # State management
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
```

## Next Steps for Development

Potential areas for continued development:

1. Implement workflow execution functionality
2. Add validation for workflow connections
3. Create a backend service for storing and executing workflows
4. Add more action types and connectors
5. Implement undo/redo functionality
6. Add export/import capabilities for workflows
7. Enhance the properties panel with more configuration options
8. Add user authentication and workflow sharing
