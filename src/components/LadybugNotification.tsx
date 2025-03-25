import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import { ResetConnectors } from './ResetConnectors';
import { cn } from '../lib/utils';
import LibraryModal from './LibraryModal';
import { TemplatesModal } from './TemplatesModal';

export const LadybugNotification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDebugLibraryOpen, setIsDebugLibraryOpen] = useState(false);
  const [isDebugTemplatesOpen, setIsDebugTemplatesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'core' | 'connectors' | 'custom-actions' | 'ui-collections'>('connectors');

  const togglePane = () => {
    setIsOpen(!isOpen);
  };

  const toggleDebugLibrary = () => {
    setIsDebugLibraryOpen(!isDebugLibraryOpen);
  };

  const toggleDebugTemplates = () => {
    setIsDebugTemplatesOpen(!isDebugTemplatesOpen);
  };

  return (
    <>
      {/* Floating Ladybug Icon */}
      <div 
        className="fixed right-4 bottom-20 z-50 cursor-pointer"
        onClick={togglePane}
      >
        <div className="bg-red-500 hover:bg-red-600 transition-colors rounded-full p-3 shadow-lg">
          <Bug className="h-6 w-6 text-white" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-3 h-3"></span>
          )}
        </div>
      </div>

      {/* Notification Pane */}
      <div 
        className={cn(
          "fixed right-0 top-0 bottom-0 z-40 w-80 bg-white shadow-xl transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Bug className="h-5 w-5 mr-2 text-red-500" />
              Dev Tools
            </h2>
            <button 
              onClick={togglePane}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Reset local storage</h3>
            <p className="text-sm text-gray-600 mb-2">Reset installed actions, favorites and recents</p>
            <ResetConnectors />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Debug Library View</h3>
            <p className="text-sm text-gray-600 mb-2">Open the library in debug mode</p>
            <button
              onClick={toggleDebugLibrary}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              {isDebugLibraryOpen ? 'Close Debug View' : 'Open Debug Library View'}
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Debug Templates View</h3>
            <p className="text-sm text-gray-600 mb-2">Open the templates modal in debug mode</p>
            <button
              onClick={toggleDebugTemplates}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              {isDebugTemplatesOpen ? 'Close Templates View' : 'Open Debug Templates View'}
            </button>
          </div>

          <div className="mb-4" data-component-name="LadybugNotification">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">What's New</h3>
            <p className="text-sm text-gray-600 mb-2">Latest updates and improvements</p>
            <div data-component-name="LadybugNotification">
              {/* Version 2.4.0 - Current */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-100 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">Version 2.4.0</p>
                  <p className="text-xs text-gray-500">March 25, 2025</p>
                </div>
                <div className="mb-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">UI Improvements</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4">Cleaner template cards with improved spacing and layout</p>
                </div>
                <div className="mb-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">White Background</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4">Updated modal backgrounds for better contrast and readability</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">Simplified Templates</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4">Removed redundant elements for a more focused experience</p>
                </div>
              </div>
              
              {/* Version 2.3.2 */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-100 mb-3" data-component-name="LadybugNotification">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">Version 2.3.2</p>
                  <p className="text-xs text-gray-500">March 18, 2025</p>
                </div>
                <div className="mb-3" data-component-name="LadybugNotification">
                  <div className="flex items-center" data-component-name="LadybugNotification">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" data-component-name="LadybugNotification"></div>
                    <p className="text-sm font-medium text-gray-800" data-component-name="LadybugNotification">Search Behavior</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4" data-component-name="LadybugNotification">Improved search with real-time filtering and better keyword matching</p>
                </div>
                <div data-component-name="LadybugNotification">
                  <div className="flex items-center" data-component-name="LadybugNotification">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" data-component-name="LadybugNotification"></div>
                    <p className="text-sm font-medium text-gray-800" data-component-name="LadybugNotification">Library Behavior</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4" data-component-name="LadybugNotification">Improved library layout and one-click connector installation process</p>
                </div>
              </div>
              
              {/* Version 2.3.0 */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-100 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">Version 2.3.0</p>
                  <p className="text-xs text-gray-500">March 4, 2025</p>
                </div>
                <div className="mb-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">New Feature</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4">Added support for custom action categories</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">UI Enhancements</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4">Improved action icons and visual hierarchy</p>
                </div>
              </div>
              
              {/* Version 2.2.5 */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-100" data-component-name="LadybugNotification">
                <div className="flex items-center justify-between mb-2" data-component-name="LadybugNotification">
                  <p className="text-sm font-semibold text-gray-800">Version 2.2.5</p>
                  <p className="text-xs text-gray-500" data-component-name="LadybugNotification">February 25, 2025</p>
                </div>
                <div className="mb-3">
                  <div className="flex items-center" data-component-name="LadybugNotification">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800">Left Pane Layout</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4" data-component-name="LadybugNotification">Improved navigation sidebar with better category organization</p>
                </div>
                <div>
                  <div className="flex items-center" data-component-name="LadybugNotification">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-sm font-medium text-gray-800" data-component-name="LadybugNotification">Filter Controls</p>
                  </div>
                  <p className="text-xs text-gray-600 ml-4" data-component-name="LadybugNotification">Enhanced filtering options in the left navigation panel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when pane is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={togglePane}
        />
      )}

      {/* Debug Library View */}
      {isDebugLibraryOpen && (
        <>
          {/* Fixed header with close button */}
          <div className="fixed top-0 left-0 right-0 z-[70] bg-white border-b shadow-md p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Debug Library View</h2>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('core')}
                  className={`px-3 py-1 rounded ${activeTab === 'core' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  Core
                </button>
                <button
                  onClick={() => setActiveTab('connectors')}
                  className={`px-3 py-1 rounded ${activeTab === 'connectors' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  Connectors
                </button>
              </div>
              <button
                onClick={toggleDebugLibrary}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium"
              >
                Close Debug View
              </button>
            </div>
          </div>
          
          {/* Main content with padding for the fixed header */}
          <div className="fixed inset-0 z-[60] bg-white overflow-auto pt-[72px]">
            <div className="p-4">
              {/* Render the LibraryModal content directly */}
              <LibraryModal 
                isOpen={true} 
                onClose={() => {}} 
                initialCategory={null}
                initialTab={activeTab}
              />
            </div>
          </div>
        </>
      )}

      {/* Debug Templates View */}
      {isDebugTemplatesOpen && (
        <>
          {/* Fixed header with close button */}
          <div className="fixed top-0 left-0 right-0 z-[70] bg-white border-b shadow-md p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Debug Templates View</h2>
            <div className="flex gap-4">
              <button
                onClick={toggleDebugTemplates}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium"
              >
                Close Templates View
              </button>
            </div>
          </div>
          
          {/* Main content with padding for the fixed header */}
          <div className="fixed inset-0 z-[60] bg-white overflow-auto pt-[72px]">
            <div className="p-4">
              {/* Render the TemplatesModal content directly */}
              <TemplatesModal 
                isOpen={true} 
                onClose={() => {}} 
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LadybugNotification;
