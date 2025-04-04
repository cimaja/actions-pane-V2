# Sidebar Items

The sidebar is organized into several main sections:

---

## Navigation Tabs

- **Core tab**: Shows PAD (Power Automate Desktop) actions organized by categories  
- **Connectors tab**: Shows connector actions organized by publisher (Microsoft and Third-party)  
- **Favorites view**: Shows user's favorited actions  

---

## Core Actions Structure

- Organized by categories:
  - **Files**: `bg-amber-100 text-amber-600`
  - **Interaction**: `bg-orange-100 text-orange-600`
  - **System**: `bg-emerald-100 text-emerald-600`
  - **Logic**: `bg-rose-100 text-rose-600`
  - **Advanced**: `bg-gray-100 text-gray-600`
- **Custom actions** appear under the Core tab with **purple** color: `bg-purple-100 text-purple-600`
- Categories and modules are displayed **alphabetically**

---

## Connectors Structure

- Organized by **publisher** (Microsoft, Third-party)
- Uses connector-specific **logos** from `public/images/connectors`
- Each connector has its own icon/logo, no specific color scheme

---

## Recent Actions

- Shows **recently used actions** at the top of the sidebar
- Tracked via the `useActionsStore` hook

---

# Search Results

The search functionality works differently from the regular sidebar view:

## Search Modes

- **Local search**: Searches through installed actions only  
- **Library search**: Searches through all available actions (installed and not installed)

## Search Result Types

- **Module results**: When a module name matches the search query  
- **Submodule results**: When a submodule name matches the search query  
- **Action results**: When an action name matches the search query

## Search Result Structure

- Results include the **item name**, **category**, and **source**
- Icons and colors are preserved from their original modules
- For connectors, uses the `ConnectorLogo` component to display logos

## Special Search Handling

- **UI search**: Special handling for `"ui"` query to prioritize UI Automation
- When a module is found, **all its actions are included** for better discoverability

---

# Library Modal

The library modal provides a comprehensive view of all available actions (both installed and not installed):

## Library Tabs

- **Core tab**: Shows all PAD actions  
- **Connectors tab**: Shows all connector actions  
- **Custom Actions tab**: Custom actions with purple background and puzzle icon  
- **UI Collections tab**: UI collections with blue background  

## Filtering and Sorting

- Core actions can be filtered by categories (Files, Interaction, System, Logic, Advanced)  
- Connectors can be filtered by functional categories (e.g. Document Management, Communication)  
- Sorting options: by **name**, **author/publisher**, or **category**

## View Modes

- **List view**: Shows all modules in a grid  
- **Details view**: Shows detailed information about a selected module

## Installation Management

- Library allows **installing/uninstalling** actions and connectors  
- Default connectors (Azure DevOps, Adobe Sign, GitHub, SAP) can be **reset** via the **ladybug notification panel**

---

# Key Differences

## Content Scope

- **Sidebar**: Shows only installed actions and connectors  
- **Search**: Can search across installed items (local) or all available items (library)  
- **Library**: Shows all available actions and connectors (installed and not)

## Organization

- **Sidebar**: Hierarchical structure with expandable categories and modules  
- **Search**: Flat list of results organized by relevance  
- **Library**: Grid layout with filtering and detailed views

## Functionality

- **Sidebar**: Quick access to installed actions, favorites, and recent items  
- **Search**: Finding specific actions across the entire collection  
- **Library**: Browsing, exploring, and managing actions

## Visual Styling

- Consistent **color coding** across components (amber for Files, purple for Custom actions, etc.)  
- **Connector logos** are displayed from the `public/images/connectors` directory  
- Icons are implemented using the `module.icon` property