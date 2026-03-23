// components/editor/PostEditor.tsx
"use client";
import { useState, useCallback } from "react";
import { PostContent } from "@/types/content";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { createBlock, blocksToJSON, safeBlocks } from "./blockHelpers";
import { SortableBlock } from "./SortableBlock";
import { AddBlockMenu } from "./AddBlockMenu";
import { Block, BlockType } from "@/types/editorTypes";

interface PostEditorProps {
  onChange: (json: PostContent) => void;
}

export function PostEditor({ onChange }: PostEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([createBlock("paragraph")]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const commit = useCallback(
    (next: Block[]) => {
      setBlocks(next);
      onChange(blocksToJSON(next));
    },
    [onChange],
  );

  const addBlock = (type: BlockType, afterId?: string) => {
    const newBlock = createBlock(type);
    const index = afterId
      ? blocks.findIndex((b) => b.id === afterId)
      : blocks.length - 1;
    const next = [...blocks];
    next.splice(index + 1, 0, newBlock);
    commit(next);
  };

  const removeBlock = (id: string) => {
    commit(safeBlocks(blocks.filter((b) => b.id !== id)));
  };

  const updateBlock = (id: string, patch: Partial<Block>) => {
    commit(
      blocks.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    commit(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <div className="border border-outline/20 rounded-sm overflow-hidden bg-surface">
      {/* ── Toolbar: add-block buttons at the top ── */}
      <AddBlockMenu onAdd={(type) => addBlock(type)} />

      {/* ── Block list ── */}
      <div className="px-4 py-4 min-h-80">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 divide-y divide-outline/10">
              {blocks.map((block) => (
                <div key={block.id} className="pt-2 first:pt-0">
                  <SortableBlock
                    block={block}
                    onUpdate={(patch) => updateBlock(block.id, patch)}
                    onRemove={() => removeBlock(block.id)}
                    onAddAfter={(type) => addBlock(type, block.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ── Footer: block count ── */}
      <div className="px-4 py-2 border-t border-outline/10 bg-surface-container-low flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-outline/50">
          {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
        </span>
        <span className="text-[10px] text-outline/40 uppercase tracking-widest">
          Drag blocks to reorder
        </span>
      </div>
    </div>
  );
}
