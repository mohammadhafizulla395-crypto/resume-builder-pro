"use client";

import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface WithId {
  id: string;
}

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        position: "relative",
      }}
      className="rounded-xl border border-slate-200 bg-white"
    >
      {/* drag handle (top-right grip) */}
      <span
        {...attributes}
        {...listeners}
        role="button"
        aria-label="Drag to reorder"
        tabIndex={0}
        className="absolute right-3 top-3 cursor-grab select-none rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        ⠿
      </span>
      {children}
    </div>
  );
}

export function SortableList<T extends WithId>({
  items,
  onReorder,
  renderItem,
  addLabel,
  onAdd,
  emptyLabel,
  max,
}: {
  items: T[];
  onReorder: (next: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel: string;
  onAdd: () => void;
  emptyLabel: string;
  max: number;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
        {emptyLabel}
        <div className="mt-3">
          <button
            type="button"
            onClick={onAdd}
            disabled={items.length >= max}
            className="rounded-lg bg-[var(--rb-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {addLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item, index) => (
              <SortableRow key={item.id} id={item.id}>
                <div className="p-4 pr-9">{renderItem(item, index)}</div>
              </SortableRow>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        type="button"
        onClick={onAdd}
        disabled={items.length >= max}
        className="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50"
      >
        + {addLabel}
      </button>
    </div>
  );
}
