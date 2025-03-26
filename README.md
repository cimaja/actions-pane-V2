## Project Overview

Alternative design prototype for the Power Automate Desktop actions pane. Test it -> https://cimaja.github.io/actions-pane-V2/

- **Drag-and-drop workflow editor** using ReactFlow
- **Fluent UI** components for a consistent design language
- **State management** with Zustand
- **Styling** with Tailwind CSS
- **TypeScript** for type safety

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
