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

  // Single function that updates state AND notifies parent —
  // never called inside a setState updater
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
    const next = safeBlocks(blocks.filter((b) => b.id !== id));
    commit(next);
  };

  const updateBlock = (id: string, patch: Partial<Block>) => {
    const next = blocks.map((b) =>
      b.id === id ? ({ ...b, ...patch } as Block) : b,
    );
    commit(next);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    commit(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onUpdate={(patch) => updateBlock(block.id, patch)}
              onRemove={() => removeBlock(block.id)}
              onAddAfter={(type) => addBlock(type, block.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <AddBlockMenu onAdd={(type) => addBlock(type)} />
    </div>
  );
}
