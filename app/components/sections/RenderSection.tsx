import { SectionInstance } from "../../types/sections";

type Props = {
  section: SectionInstance;
  isSelected: boolean;
  onSelect: () => void;
};

export default function RenderSection({ section, isSelected, onSelect }: Props) {
  const baseClass =
    "cursor-pointer rounded-lg border bg-white p-4 transition-all shadow-sm hover:shadow-md";

  const selectedClass = isSelected
    ? "border-blue-500 ring-2 ring-blue-300"
    : "border-gray-200";

  return (
    <div className={`${baseClass} ${selectedClass}`} onClick={onSelect}>
      {section.type === "hero" && (
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold">{section.title}</h2>
          <p className="text-gray-600 text-sm">{section.text}</p>
        </div>
      )}

      {section.type === "text" && (
        <div className="space-y-1">
          <h3 className="text-base font-semibold">{section.title}</h3>
          <p className="text-gray-700 text-sm">{section.text}</p>
        </div>
      )}

      {section.type === "image" && (
        <div className="space-y-2">
          {section.imageUrl && (
            <img
              src={section.imageUrl}
              alt={section.title || "Image section"}
              className="w-full rounded-md object-cover max-h-64"
            />
          )}
          <p className="text-gray-700 text-sm">{section.text}</p>
        </div>
      )}

      {section.type === "footer" && (
        <div className="border-t pt-2 text-center text-xs text-gray-500">
          {section.text}
        </div>
      )}
    </div>
  );
}