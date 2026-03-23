// components/editor/SortableBlock.tsx
"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddBlockMenu } from "./AddBlockMenu";
import { Block, BlockType } from "@/types/editorTypes";
import { BlockRenderer } from "./BlockRenderer";
import { MdDragIndicator, MdDeleteOutline } from "react-icons/md";

interface Props {
  block: Block;
  onUpdate: (patch: Partial<Block>) => void;
  onRemove: () => void;
  onAddAfter: (type: BlockType) => void;
}

export function SortableBlock({
  block,
  onUpdate,
  onRemove,
  onAddAfter,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group pb-3 relative">
      <div className="flex items-start gap-1">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="mt-2.5 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-outline/50 hover:text-primary shrink-0"
          title="Drag to reorder"
        >
          <MdDragIndicator size={18} />
        </button>

        {/* Block Content */}
        <div className="flex-1 min-w-0 py-1">
          <BlockRenderer block={block} onUpdate={onUpdate} />
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="mt-2.5 p-1 cursor-pointer opacity-0 group-hover:opacity-100 rounded-full active:bg-primary active:text-white hover:bg-gray-200 transition-opacity text-outline/50 hover:text-error shrink-0"
          title="Remove block"
        >
          <MdDeleteOutline size={18} />
        </button>
      </div>

      {/* Add Block After — compact menu on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity pl-7 mt-0.5">
        <AddBlockMenu onAdd={onAddAfter} compact />
      </div>
    </div>
  );
}
