import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface DraggableItemProps {
  id: string;
  item: string;
  isFavorite: boolean;
  onToggleFavorite: (item: string) => void;
  onClick: () => void;
}

export function DraggableItem({ id, item, isFavorite, onToggleFavorite, onClick }: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'w-full pl-2 pr-2 py-1.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 group rounded-md',
        isDragging && 'bg-gray-50 shadow-sm'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-all cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </button>
      
      <button
        onClick={onClick}
        className="flex-1 text-left text-gray-700"
      >
        {item}
      </button>

      <Star
        className={cn(
          "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
          isFavorite ? "text-amber-400 fill-amber-400 opacity-100" : "text-gray-400"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
      />
    </div>
  );
}