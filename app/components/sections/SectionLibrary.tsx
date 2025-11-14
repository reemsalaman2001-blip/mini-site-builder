"use client";

import { SectionType } from "../../types/sections";

type Props = {
  onAdd: (type: SectionType) => void;
};

const SECTION_DEFS: { type: SectionType; label: string; description: string }[] = [
  { type: "hero", label: "Hero", description: "Big title + description" },
  { type: "text", label: "Text", description: "Simple text block" },
  { type: "image", label: "Image", description: "Image with caption" },
  { type: "footer", label: "Footer", description: "Simple footer" },
];

export default function SectionLibrary({ onAdd }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold mb-2 text-sm text-gray-600">Section Library</h2>
      <div className="grid gap-2">
        {SECTION_DEFS.map((s) => (
          <button
            key={s.type}
            onClick={() => onAdd(s.type)}
            className="flex flex-col items-start rounded-md border border-dashed border-gray-300
                       bg-white px-3 py-2 text-left text-sm hover:border-blue-500 hover:bg-blue-50
                       transition-all"
          >
            <span className="font-medium">{s.label}</span>
            <span className="text-xs text-gray-500">{s.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}