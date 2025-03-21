import { useMemo } from 'react';
import { useActionsStore } from '../store/actionsStore';
import { actionSources } from '../data/actions';
import type { ActionSource, ActionCategory, ActionModule } from '../data/actions';

interface UseActionsOptions {
  installedOnly?: boolean;
  sourceName?: 'PAD Action' | 'Connector';
}

export function useActions(options: UseActionsOptions = {}) {
  const { installedCategories } = useActionsStore();

  return useMemo(() => {
    let sources = [...actionSources];

    if (options.sourceName) {
      sources = sources.filter(source => source.name === options.sourceName);
    }

    // Only filter installed modules for the sidebar, not the library
    if (options.installedOnly) {
      sources = sources.map(source => ({
        ...source,
        categories: source.categories.map(category => ({
          ...category,
          modules: category.modules.filter(module => 
            installedCategories.includes(`${category.name}-${module.name}`)
          )
        })).filter(category => category.modules.length > 0)
      })).filter(source => source.categories.length > 0);
    }

    return sources;
  }, [options.sourceName, options.installedOnly, installedCategories]);
}