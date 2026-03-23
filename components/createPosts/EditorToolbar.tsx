// components/editor/EditorToolbar.tsx
"use client";
import { Editor } from "@tiptap/react";
import { useRef } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload: (file: File, type?: "content") => void;
}

export function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file, "content");
    // reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-4 border-b border-outline/20 sticky top-16 z-40 bg-surface">
      {/* --- Text Style --- */}
      <ToolGroup>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <span className="font-bold text-sm">B</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <span className="italic text-sm">I</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <span className="line-through text-sm">S</span>
        </ToolButton>
      </ToolGroup>

      <Divider />

      {/* --- Headings --- */}
      <ToolGroup>
        {([2, 3, 4] as const).map((level) => (
          <ToolButton
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            active={editor.isActive("heading", { level })}
            title={`Heading ${level}`}
          >
            <span className="text-xs font-bold font-headline">H{level}</span>
          </ToolButton>
        ))}
      </ToolGroup>

      <Divider />

      {/* --- Blocks --- */}
      <ToolGroup>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <span className="material-symbols-outlined text-[18px]">
            format_list_bulleted
          </span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <span className="material-symbols-outlined text-[18px]">
            format_list_numbered
          </span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote / Pull Quote"
        >
          <span className="material-symbols-outlined text-[18px]">
            format_quote
          </span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline Code"
        >
          <span className="material-symbols-outlined text-[18px]">code</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <span className="material-symbols-outlined text-[18px]">
            integration_instructions
          </span>
        </ToolButton>
      </ToolGroup>

      <Divider />

      {/* --- Insert --- */}
      <ToolGroup>
        <ToolButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          active={false}
          title="Horizontal Rule"
        >
          <span className="material-symbols-outlined text-[18px]">
            horizontal_rule
          </span>
        </ToolButton>

        {/* Image Upload */}
        <ToolButton
          onClick={() => fileInputRef.current?.click()}
          active={false}
          title="Insert Image"
        >
          <span className="material-symbols-outlined text-[18px]">
            add_photo_alternate
          </span>
        </ToolButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </ToolGroup>

      <Divider />

      {/* --- History --- */}
      <ToolGroup>
        <ToolButton
          onClick={() => editor.chain().focus().undo().run()}
          active={false}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <span className="material-symbols-outlined text-[18px]">undo</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().redo().run()}
          active={false}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <span className="material-symbols-outlined text-[18px]">redo</span>
        </ToolButton>
      </ToolGroup>
    </div>
  );
}

// --- Sub-components ---

function ToolGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <div className="w-px h-5 bg-outline/20 mx-1" />;
}

interface ToolButtonProps {
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolButton({
  onClick,
  active,
  disabled = false,
  title,
  children,
}: ToolButtonProps) {
  return (
    <button
      type="button" // prevents accidental form submission
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded transition-colors duration-150
        ${
          active
            ? "bg-primary text-on-primary"
            : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
        }
        ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
}
