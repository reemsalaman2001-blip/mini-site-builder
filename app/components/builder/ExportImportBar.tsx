"use client";

import { useRef } from "react";
import { SectionInstance } from "../../types/sections";

type Props = {
  sections: SectionInstance[];
  onImport: (sections: SectionInstance[]) => void;
};

export default function ExportImportBar({ sections, onImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(sections, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "mini-site.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        if (Array.isArray(json)) {
          onImport(json as SectionInstance[]);
        } else {
          alert("Invalid JSON format. Expected an array.");
        }
      } catch {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    // reset value to allow importing same file again
    e.target.value = "";
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2 text-xs">
      <button
        type="button"
        onClick={handleExport}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5
                   font-medium text-gray-700 shadow-sm hover:border-blue-500
                   hover:text-blue-700 hover:bg-blue-50 transition-all"
      >
        Export JSON
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5
                   font-medium text-gray-700 shadow-sm hover:border-green-500
                   hover:text-green-700 hover:bg-green-50 transition-all"
      >
        Import JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}