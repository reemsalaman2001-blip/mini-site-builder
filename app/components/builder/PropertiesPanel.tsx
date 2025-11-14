"use client";

import type { ChangeEvent } from "react";
import { SectionInstance } from "../../types/sections";

type Props = {
  section: SectionInstance | undefined;
  onChange: (updated: SectionInstance) => void;
  onDelete: () => void;
};

export default function PropertiesPanel({ section, onChange, onDelete }: Props) {
  if (!section) {
    return (
      <div className="rounded-lg border bg-white p-3 text-xs text-gray-500">
        Select a section to edit its properties.
      </div>
    );
  }

  const handleField = (field: keyof SectionInstance, value: string) => {
    onChange({ ...section, [field]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        handleField("imageUrl", result);
      }
    };
    reader.readAsDataURL(file);

    // عشان تقدرين تختارين نفس الملف مرة ثانية لو تبين
    e.target.value = "";
  };

  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Section Properties</h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
          {section.type}
        </span>
      </div>

      {/* العنوان لكل الأنواع ما عدا footer فقط لو حبيتي */}
      {(section.type === "hero" ||
        section.type === "text" ||
        section.type === "image") && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Title
          </label>
          <input
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={section.title ?? ""}
            onChange={(e) => handleField("title", e.target.value)}
          />
        </div>
      )}

      {/* النص */}
      {(section.type === "hero" ||
        section.type === "text" ||
        section.type === "image") && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Text
          </label>
          <textarea
            className="w-full min-h-[70px] rounded border border-gray-300 px-2 py-1 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={section.text ?? ""}
            onChange={(e) => handleField("text", e.target.value)}
          />
        </div>
      )}

      {/* رفع صورة + رابط للصورة فقط في نوع image */}
      {section.type === "image" && (
        <div className="space-y-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Upload image from your device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-xs text-gray-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Image URL (optional)
            </label>
            <input
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
              value={section.imageUrl ?? ""}
              onChange={(e) => handleField("imageUrl", e.target.value)}
              placeholder="Paste an image URL or use file upload above"
            />
          </div>
        </div>
      )}

      {/* الفوتر: نص بس */}
      {section.type === "footer" && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Footer text
          </label>
          <textarea
            className="w-full min-h-[60px] rounded border border-gray-300 px-2 py-1 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={section.text ?? ""}
            onChange={(e) => handleField("text", e.target.value)}
          />
        </div>
      )}

      <button
        onClick={onDelete}
        className="mt-2 w-full rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
      >
        Delete section
      </button>
    </div>
  );
}