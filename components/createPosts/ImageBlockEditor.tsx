// components/editor/blocks/ImageBlockEditor.tsx

import { ImageBlock, ImageSlot } from "@/types/editorTypes";

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
    <div className="space-y-3">
      {/* Layout Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
          Layout:
        </span>
        {(["single", "side-by-side"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLayout(l)}
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 transition-colors ${
              block.layout === l
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-outline hover:text-primary"
            }`}
          >
            {l === "single" ? "Single" : "Side by Side"}
          </button>
        ))}
      </div>

      {/* Image Slots */}
      <div
        className={`grid gap-4 ${
          block.layout === "side-by-side" ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {block.images.map((img, index) => (
          <div key={index} className="space-y-2">
            {img.preview ? (
              <div className="relative aspect-video bg-surface-container-low overflow-hidden">
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
                  className="absolute top-2 right-2 bg-primary text-on-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border border-dashed border-outline/30 cursor-pointer hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">
                  add_photo_alternate
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
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
              placeholder="Image description (alt text)..."
              className="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 py-1.5 font-body text-xs text-primary placeholder:text-outline/40"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
