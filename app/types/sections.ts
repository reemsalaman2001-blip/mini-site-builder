export type SectionType = "hero" | "text" | "image" | "footer";

export interface SectionInstance {
  id: string;
  type: SectionType;
  title?: string;
  text?: string;
  imageUrl?: string;
}

export function createDefaultSection(type: SectionType): SectionInstance {
  switch (type) {
    case "hero":
      return {
        id: crypto.randomUUID(),
        type,
        title: "Hero Title",
        text: "Short hero description for your mini website.",
      };
    case "text":
      return {
        id: crypto.randomUUID(),
        type,
        title: "Text Block",
        text: "This is a simple text section.",
      };
    case "image":
      return {
        id: crypto.randomUUID(),
        type,
        title: "Image Section",
        imageUrl: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
        text: "Nice image with caption.",
      };
    case "footer":
    default:
      return {
        id: crypto.randomUUID(),
        type: "footer",
        text: "© 2025 Mini Website. All rights reserved.",
      };
  }
}