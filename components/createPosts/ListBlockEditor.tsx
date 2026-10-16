import { RichTextField } from "./RichTextField";
// components/editor/blocks/ListBlockEditor.tsx

import { BulletListBlock, OrderedListBlock } from "@/types/editorTypes";
import { MdAdd, MdClose } from "react-icons/md";

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
    e: React.KeyboardEvent<HTMLDivElement>,
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
        <div key={index} className="flex items-center gap-2.5">
          <span className="text-[#77736c] shrink-0 w-5 text-sm font-sans text-center select-none">
            {block.type === "orderedList" ? `${index + 1}.` : "·"}
          </span>
          <RichTextField
                value={item}
            onChange={(value) => updateItem(index, value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder="List item..."
            className="flex-1 bg-transparent border-0 border-b border-[#e1dbd1] focus:border-primary focus:ring-0 py-1.5 font-sans text-base text-primary placeholder:text-[#77736c] outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-[#77736c] hover:text-red-700 transition-colors shrink-0"
          >
            <MdClose size={15} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-[#77736c] hover:text-primary transition-colors"
      >
        <MdAdd size={14} />
        Add item
      </button>
    </div>
  );
}
