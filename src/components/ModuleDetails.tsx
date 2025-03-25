
import { ArrowLeft, ChevronRight, Check, Building2, Tag, Clock, HardDrive, User } from 'lucide-react';
import { cn } from '../lib/utils';
import type { ModuleWithCategory } from '../types/library';
import { getConnectorLogoUrl } from '../data/connectorLogos';
import CustomActionsIcon from './icons/CustomActionsIcon';

interface ModuleDetailsProps {
  module: ModuleWithCategory;
  onBack: () => void;
  isInstalled: boolean;
  onInstallToggle: () => void;
  sourceName?: string;
}

export function ModuleDetails({ module, onBack, isInstalled, onInstallToggle, sourceName }: ModuleDetailsProps) {
  // Determine if this is a Core pad action by checking either the sourceName or the module's category
  // This provides a fallback in case sourceName is not properly passed
  const isCorePadAction = sourceName === 'PAD Action' || module.categoryName === 'Files' || module.categoryName === 'Interaction' || module.categoryName === 'System';
  
  // Determine if this is a custom action - check various ways it might be identified
  // Based on memory: Custom actions should have a consistent purple background (bg-purple-100 text-purple-600)
  const isCustomAction = 
    sourceName === 'Custom' || 
    module.categoryName === 'Custom' || 
    module.categoryName === 'Custom actions' || 
    module.name.includes('Custom') ||
    module.color === 'bg-purple-100 text-purple-600' ||
    module.name === 'Format JSON'; // Force this specific module to be treated as custom action
  
  // Force custom action debugging
  console.log('ModuleDetails - isCustomAction:', isCustomAction);
  
  // Force debug logs to ensure we can see the values
  console.log('%c ModuleDetails Debug', 'background: #ff0000; color: white; font-weight: bold');
  console.log('ModuleDetails - sourceName:', sourceName);
  console.log('ModuleDetails - isCorePadAction:', isCorePadAction);
  console.log('ModuleDetails - module category:', module.categoryName);
  return (
    <div className="h-full flex flex-col bg-[#fafafa]">
      <div className="px-4 h-14 border-b border-gray-40 flex items-center gap-3 bg-white">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-gray-20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-140" />
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-140">
          <span>{module.categoryName}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-190">{module.name}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* For custom actions, completely remove the white background and bottom border */}
        <div className={cn(
          isCustomAction || module.name === "Format JSON" || module.categoryName === "Custom" ? "" : "border-b border-gray-40 bg-white"
        )}>
          <div className="max-w-3xl mx-auto px-6 py-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center p-0 overflow-hidden",
                  module.color || "bg-purple-100 text-purple-600" // Ensure purple color for custom actions
                )}>
                  {/* ALWAYS use puzzle icon for custom actions - check multiple properties that could indicate a custom action */}
                  {(isCustomAction || module.name === "Format JSON" || module.categoryName === "Custom") ? (
                    <CustomActionsIcon className="w-10 h-10" />
                  ) : sourceName === 'Connector' ? (
                    <div className="w-full h-full overflow-hidden flex items-center justify-center rounded-xl">
                      <img 
                        src={getConnectorLogoUrl(module.name)} 
                        alt={`${module.name} logo`} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to the icon if the image fails to load
                          e.currentTarget.style.display = 'none';
                          const fallbackIcon = document.getElementById(`fallback-icon-${module.name}`);
                          if (fallbackIcon) fallbackIcon.style.display = 'block';
                        }}
                      />
                      <div id={`fallback-icon-${module.name}`} style={{display: 'none'}}>
                        <module.icon className="w-10 h-10" />
                      </div>
                    </div>
                  ) : (
                    <module.icon className="w-10 h-10" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-2xl font-semibold text-gray-190">{module.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      {isInstalled ? (
                        <div className="flex items-center gap-1.5 bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>Installed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          <span>Not installed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onInstallToggle}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium",
                  isInstalled
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-brand-80 text-white hover:bg-brand-70"
                )}
              >
                {isInstalled ? 'Uninstall' : 'Install'}
              </button>
            </div>

            {/* Details Section - Only show for non-Core pad actions or when there's content */}
            {/* For custom actions, we always show the info box regardless of PAD status */}
            {(isCustomAction || (!isCorePadAction && (module.publisher || module.category || module.lastUpdated || module.description))) ? (
              <div className="mt-6">
                <div className={cn(
                  "border border-gray-30 rounded-lg p-6",
                  isCustomAction || module.name === "Format JSON" || module.categoryName === "Custom" ? "" : "bg-white"
                )}>
                  {/* Details Grid */}
                  {(module.publisher || module.category || module.lastUpdated) && (
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-sm">
                      {/* Publisher/Author field - use User icon for custom actions */}
                      {module.publisher && (
                        <div className="flex items-start gap-2">
                          {isCustomAction ? (
                            <User className="w-4 h-4 text-gray-140 mt-0.5" />
                          ) : (
                            <Building2 className="w-4 h-4 text-gray-140 mt-0.5" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-140 mb-1">{isCustomAction ? 'Author' : 'Publisher'}</h3>
                            <p className="text-gray-190">{module.publisher}</p>
                          </div>
                        </div>
                      )}
                      
                      {module.category && (
                        <div className="flex items-start gap-2">
                          <Tag className="w-4 h-4 text-gray-140 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-140 mb-1">Categories</h3>
                            <p className="text-gray-190">{module.category}</p>
                          </div>
                        </div>
                      )}
                      
                      {module.lastUpdated && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-gray-140 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-140 mb-1">Last update</h3>
                            <p className="text-gray-190">{module.lastUpdated}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Always show Size in MB for custom actions */}
                      {isCustomAction && (
                        <div className="flex items-start gap-2">
                          <HardDrive className="w-4 h-4 text-gray-140 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-140 mb-1">Size</h3>
                            <p className="text-gray-190">{module.size || '0.1 MB'}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Force Size in MB to always display for Format JSON as it's a custom action */}
                      {module.name === "Format JSON" && !isCustomAction && (
                        <div className="flex items-start gap-2">
                          <HardDrive className="w-4 h-4 text-gray-140 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-140 mb-1">Size</h3>
                            <p className="text-gray-190">0.1 MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Description and Documentation Link */}
                  {module.description && (
                    <div className={`${(module.publisher || module.category || module.lastUpdated) ? 'mt-6 pt-6 border-t border-gray-30' : ''}`}>
                      <div className="text-sm text-gray-140">
                        <span>{module.description}</span>
                        {module.documentationUrl && (
                          <>
                            <span className="mx-1">·</span>
                            <a 
                              href={module.documentationUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-brand-80 hover:text-brand-70 hover:underline"
                            >
                              View documentation
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* For PAD core actions, show description directly without the details container */
              module.description && (
                <div className="mt-6">
                  <div className="text-sm text-gray-140">
                    <span>{module.description}</span>
                    {module.documentationUrl && (
                      <>
                        <span className="mx-1">·</span>
                        <a 
                          href={module.documentationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-brand-80 hover:text-brand-70 hover:underline"
                        >
                          View documentation
                        </a>
                      </>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="space-y-6">
            {module.submodules.map((submodule) => (
              <div 
                key={submodule.name}
                className="bg-white rounded-xl border border-gray-30 overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-20 border-b border-gray-40 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-190">
                      {submodule.name}
                    </h3>
                    <p className="text-xs text-gray-130 mt-0.5">
                      {submodule.actions.length} actions
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-30">
                  {submodule.actions.map((action) => (
                    <div
                      key={action}
                      className="px-4 py-3 hover:bg-gray-20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-190">
                            {action}
                          </p>
                          <p className="text-xs text-gray-130 mt-0.5">
                            Execute {action.toLowerCase()} action
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}