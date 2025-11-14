"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { SectionInstance } from "../../types/sections";
import RenderSection from "../sections/RenderSection";

type Props = {
  sections: SectionInstance[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (sections: SectionInstance[]) => void;
};

export default function Canvas({ sections, selectedId, onSelect, onReorder }: Props) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(sections);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    onReorder(reordered);
  };

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-gray-50 p-3">
      <h2 className="mb-2 text-sm font-semibold text-gray-600">Page Preview</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="canvas">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-3"
            >
              {sections.length === 0 && (
                <div className="rounded-md border border-dashed border-gray-300 bg-white p-6 text-center text-xs text-gray-400">
                  No sections yet. Add sections from the library on the left.
                </div>
              )}

              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      className={snapshot.isDragging ? "opacity-80" : ""}
                    >
                      <RenderSection
                        section={section}
                        isSelected={selectedId === section.id}
                        onSelect={() => onSelect(section.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}