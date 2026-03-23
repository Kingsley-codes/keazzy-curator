// components/editor/blocks/ImageBlockEditor.tsx

import { ImageBlock, ImageSlot } from "@/types/editorTypes";
import { MdAddPhotoAlternate, MdClose } from "react-icons/md";

interface Props {
  block: ImageBlock;
  onUpdate: (patch: Partial<ImageBlock>) => void;
}

export function ImageBlockEditor({ block, onUpdate }: Props) {
  const setLayout = (layout: "single" | "side-by-side") => {
    const images =
      layout === "side-by-side" && block.images.length === 1
        ? [...block.images, { file: null, preview: "", alt: "" }]
        : layout === "single"
          ? [block.images[0]]
          : block.images;
    onUpdate({ layout, images });
  };

  const updateImage = (index: number, patch: Partial<ImageSlot>) => {
    const images = block.images.map((img, i) =>
      i === index ? { ...img, ...patch } : img,
    );
    onUpdate({ images });
  };

  const handleFile = (index: number, file: File) => {
    updateImage(index, { file, preview: URL.createObjectURL(file) });
  };

  return (
    <div className="space-y-3 py-1">
      {/* Layout Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-outline/60">
          Layout:
        </span>
        {(["single", "side-by-side"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLayout(l)}
            className={`text-[10px] cursor-pointer font-bold uppercase tracking-widest px-3 py-1 rounded-sm transition-colors ${
              block.layout === l
                ? "bg-primary text-gray-100"
                : "bg-gray-50 text-outline hover:bg-gray-200"
            }`}
          >
            {l === "single" ? "Single" : "Side by Side"}
          </button>
        ))}
      </div>

      {/* Image Slots */}
      <div
        className={`grid gap-3 ${block.layout === "side-by-side" ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {block.images.map((img, index) => (
          <div key={index} className="space-y-2">
            {img.preview ? (
              <div className="relative aspect-video bg-surface-container-low overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.preview}
                  alt={img.alt || "Preview"}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateImage(index, {
                      file: null,
                      preview: "",
                      src: "",
                      publicId: "",
                    })
                  }
                  className="absolute top-2 right-2 bg-primary text-on-primary p-1 rounded-sm hover:opacity-80 transition-opacity"
                >
                  <MdClose size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border border-dashed border-outline/25 cursor-pointer hover:border-primary hover:bg-surface-container-low transition-all rounded-sm group/upload">
                <MdAddPhotoAlternate
                  size={28}
                  className="text-outline/40 group-hover/upload:text-primary transition-colors mb-1.5"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline/50 group-hover/upload:text-primary transition-colors">
                  {block.layout === "side-by-side"
                    ? index === 0
                      ? "Left image"
                      : "Right image"
                    : "Upload image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(index, file);
                    e.target.value = "";
                  }}
                />
              </label>
            )}
            <input
              type="text"
              value={img.alt}
              onChange={(e) => updateImage(index, { alt: e.target.value })}
              placeholder="Alt text for accessibility..."
              className="w-full bg-transparent border-0 border-b border-outline/15 focus:border-primary focus:ring-0 py-1 font-body text-xs text-primary placeholder:text-outline/35 outline-none transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
