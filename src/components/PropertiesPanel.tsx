import React from 'react';
import { Node } from 'reactflow';
import { useWorkflowStore } from '../store/workflow';
import { cn } from '../lib/utils';

interface PropertiesPanelProps {
  selectedNode: Node | null;
}

const colorPalette = [
  {
    name: 'Background',
    value: '#fafafa',
    description: 'Main background color used throughout the application'
  },
  {
    name: 'Card Background',
    value: 'rgb(255 255 255 / 0.4)',
    description: 'Background color for action groups (bg-white/40)'
  },
  {
    name: 'Header Background',
    value: 'rgb(255 255 255 / 0.6)',
    description: 'Background color for group headers (bg-white/60)'
  },
  {
    name: 'Hover State',
    value: 'rgb(255 255 255 / 0.7)',
    description: 'Background color for hover states on action items (bg-white/70)'
  },
  {
    name: 'Border Color',
    value: 'rgb(243 244 246 / 0.8)',
    description: 'Border color for cards and sections (border-gray-100/80)'
  },
  {
    name: 'Search Background',
    value: 'rgb(255 255 255 / 0.9)',
    description: 'Background color for the search input (bg-white/90)'
  },
  {
    name: 'Filter Button',
    value: 'rgb(255 255 255 / 0.8)',
    description: 'Background color for filter buttons (bg-white/80)'
  }
];

const PropertiesPanel = ({ selectedNode }: PropertiesPanelProps) => {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Color Palette</h3>
        <div className="space-y-4">
          {colorPalette.map((color) => (
            <div 
              key={color.name}
              className="bg-white/40 rounded-lg border border-gray-100/60 overflow-hidden"
            >
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{color.name}</span>
                  <code className="text-xs bg-white/60 px-2 py-1 rounded">{color.value}</code>
                </div>
                <div className="h-8 rounded-md border border-gray-200" style={{ background: color.value }} />
                <p className="text-xs text-gray-600">{color.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;