// components/editor/blocks/ListBlockEditor.tsx

import { BulletListBlock, OrderedListBlock } from "@/types/editorTypes";

interface Props {
  block: BulletListBlock | OrderedListBlock;
  onUpdate: (patch: Partial<BulletListBlock | OrderedListBlock>) => void;
}

export function ListBlockEditor({ block, onUpdate }: Props) {
  const updateItem = (index: number, value: string) => {
    const items = [...block.items];
    items[index] = value;
    onUpdate({ items });
  };

  const addItem = () => onUpdate({ items: [...block.items, ""] });

  const removeItem = (index: number) => {
    const items = block.items.filter((_, i) => i !== index);
    onUpdate({ items: items.length ? items : [""] });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
    if (
      e.key === "Backspace" &&
      block.items[index] === "" &&
      block.items.length > 1
    ) {
      e.preventDefault();
      removeItem(index);
    }
  };

  return (
    <div className="space-y-1 py-2">
      {block.items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="text-outline shrink-0 w-5 text-sm font-body">
            {block.type === "orderedList" ? `${index + 1}.` : "•"}
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder="List item..."
            className="flex-1 bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 py-1.5 font-body text-base text-primary placeholder:text-outline/40"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-outline hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="mt-2 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[14px]">add</span>
        Add item
      </button>
    </div>
  );
}
