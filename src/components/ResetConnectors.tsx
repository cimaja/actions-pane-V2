import React from 'react';
import { useActionsStore } from '../store/actionsStore';

/**
 * A simple component that provides a button to reset the installed connectors
 * to the default set, including the newly added ones.
 */
export const ResetConnectors: React.FC = () => {
  const initializeDefaultCategories = useActionsStore(state => state.initializeDefaultCategories);

  const handleReset = () => {
    initializeDefaultCategories();
    alert('Connectors have been reset to defaults and favorites have been cleared. Please refresh the page to see the changes.');
  };

  return (
    <button
      onClick={handleReset}
      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
    >
      Reset Connectors to Default
    </button>
  );
};

export default ResetConnectors;
