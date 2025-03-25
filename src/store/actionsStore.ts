import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActionsState {
  installedCategories: string[];
  favoriteActions: string[];
  recentActions: string[];
  installCategory: (categoryId: string) => void;
  uninstallCategory: (categoryId: string) => void;
  isInstalled: (categoryId: string) => boolean;
  initializeDefaultCategories: () => void;
  toggleFavorite: (actionId: string) => void;
  isFavorite: (actionId: string) => boolean;
  addToRecent: (actionId: string) => void;
}

const DEFAULT_INSTALLED_CATEGORIES = [
  'Files-Date time',
  'Files-Files',
  'Files-Folders',
  'Interaction-Browser Automation',
  'Interaction-UI Automation',
  'Interaction-Message boxes',
  'Interaction-Mouse and keyboard',
  'System-Clipboard',
  'System-Workstation Control',
  'System-Environment Settings',
  'Logic-Conditionals',
  'Logic-Flow control',
  'Logic-Loops',
  'Logic-Variables',
  // Microsoft 365 connectors
  'Microsoft 365-SharePoint',
  'Microsoft 365-Office 365 Outlook',
  'Microsoft 365-Excel Online (Business)',
  'Microsoft 365-OneDrive for Business',
  'Microsoft 365-Microsoft Teams',
  'Microsoft 365-Word Online (Business)',
  'Microsoft 365-Microsoft Forms',
  // Azure connectors
  'Azure-Azure OpenAI',
  // Microsoft connectors in Third-Party Services category
  'Third-Party Services-Azure DevOps',
  // Third-Party Services connectors
  'Third-Party Services-GitHub',
  // Third-Party Services connectors
  'Third-Party Services-Adobe Sign',
];

export const useActionsStore = create<ActionsState>()(
  persist(
    (set, get) => ({
      installedCategories: [],
      favoriteActions: [],
      recentActions: [],

      installCategory: (categoryId: string) => {
        set((state) => ({
          installedCategories: [...state.installedCategories, categoryId]
        }));
      },

      uninstallCategory: (categoryId: string) => {
        set((state) => ({
          installedCategories: state.installedCategories.filter(id => id !== categoryId)
        }));
      },

      isInstalled: (categoryId: string) => {
        return get().installedCategories.includes(categoryId);
      },

      initializeDefaultCategories: () => {
        set({ installedCategories: DEFAULT_INSTALLED_CATEGORIES });
      },

      toggleFavorite: (actionId: string) => {
        set((state) => ({
          favoriteActions: state.favoriteActions.includes(actionId)
            ? state.favoriteActions.filter(id => id !== actionId)
            : [...state.favoriteActions, actionId]
        }));
      },

      isFavorite: (actionId: string) => {
        return get().favoriteActions.includes(actionId);
      },

      addToRecent: (actionId: string) => {
        set((state) => {
          const filteredRecent = state.recentActions.filter(id => id !== actionId);
          return {
            recentActions: [actionId, ...filteredRecent].slice(0, 5)
          };
        });
      }
    }),
    {
      name: 'actions-storage',
      partialize: (state) => ({ 
        installedCategories: state.installedCategories,
        favoriteActions: state.favoriteActions,
        recentActions: state.recentActions
      })
    }
  )
);