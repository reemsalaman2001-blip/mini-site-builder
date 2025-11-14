"use client";

import { useCallback, useMemo, useState } from "react";
import {
  SectionInstance,
  SectionType,
  createDefaultSection,
} from "../../types/sections";
import SectionLibrary from "../sections/SectionLibrary";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";
import ExportImportBar from "./ExportImportBar";

export default function BuilderClient() {
  const [sections, setSections] = useState<SectionInstance[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // إضافة سكشن جديد من المكتبة
  const handleAddSection = useCallback((type: SectionType) => {
    const newSection = createDefaultSection(type);
    setSections((prev) => [...prev, newSection]);
    setSelectedId(newSection.id);
  }, []);

  // اختيار سكشن من المعاينة
  const handleSelectSection = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // تحديث سكشن من لوحة الخصائص
  const handleUpdateSection = useCallback(
    (updated: SectionInstance) => {
      setSections((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
    },
    []
  );

  // إعادة ترتيب السكشنات من الـ Canvas (Drag & Drop)
  const handleReorder = useCallback((next: SectionInstance[]) => {
    setSections(next);
  }, []);

  // حذف السكشن الحالي
  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    setSections((prev) => prev.filter((s) => s.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  // عند الاستيراد من JSON
  const handleImport = useCallback((imported: SectionInstance[]) => {
    setSections(imported);
    setSelectedId(imported.length ? imported[0].id : null);
  }, []);

  // السكشن الحالي المختار
  const selectedSection = useMemo(
    () => sections.find((s) => s.id === selectedId) ?? null,
    [sections, selectedId]
  );

  return (
    <div className="min-h-screen bg-slate-900/90 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-2xl bg-white/95 shadow-xl border border-slate-200 p-4 md:p-6">
        {/* العنوان العلوي */}
        <header className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-slate-900">
              🧱 Mini Website Builder
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Add sections, reorder them, edit content, and export/import as JSON.
            </p>
          </div>
          <div className="mt-2 md:mt-0 text-[11px] md:text-xs text-slate-400">
            Built with Next.js · TypeScript · Drag &amp; Drop
          </div>
        </header>

        {/* الشبكة الرئيسية: مكتبة – معاينة – خصائص */}
        <div className="mt-4 grid gap-4
                        lg:grid-cols-[260px,minmax(0,1fr),260px]
                        md:grid-cols-[240px,minmax(0,1fr)]
                        grid-cols-1">
          {/* العمود الأيسر: مكتبة السكشنات + Export/Import */}
          <aside className="space-y-3">
            <SectionLibrary onAdd={handleAddSection} />
            <ExportImportBar sections={sections} onImport={handleImport} />
          </aside>

          {/* المعاينة في الوسط */}
          <main>
            <Canvas
              sections={sections}
              selectedId={selectedId}
              onSelect={handleSelectSection}
              onReorder={handleReorder}
            />
          </main>

          {/* العمود الأيمن: خصائص السكشن */}
          <aside className="hidden md:block">
            <div className="h-full rounded-lg border border-gray-200 bg-gray-50 p-3">
              <PropertiesPanel
                section={selectedSection}
                onChange={handleUpdateSection}
                onDelete={handleDeleteSelected}
              />
            </div>
          </aside>
        </div>

        {/* على الشاشات الصغيرة نعرض الخصائص تحت المعاينة */}
        <div className="mt-4 md:hidden">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
{selectedSection && (
  <PropertiesPanel
      section={selectedSection}
      onChange={handleUpdateSection}
      onDelete={handleDeleteSelected}
  />
)}
      
          </div>
        </div>
      </div>
    </div>
  );
}