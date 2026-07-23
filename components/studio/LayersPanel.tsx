"use client";

import { Image as ImageIcon, Type } from "lucide-react";
import { DesignElement } from "@/types/design";

interface LayersPanelProps {
  elements: DesignElement[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function LayersPanel({
  elements,
  selectedId,
  onSelect,
}: LayersPanelProps) {
  return (
    <aside className="w-72 shrink-0 border-l border-white/10 bg-[#151519] text-white flex flex-col">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="text-lg font-semibold">Layers</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {[...elements].reverse().map((element, index) => {
          const isSelected = selectedId === element.id;

          const label =
            element.type === "text"
              ? element.text || `Text ${index + 1}`
              : `Image ${index + 1}`;

          return (
            <button
              key={element.id}
              onClick={() => onSelect(element.id)}
              className={`flex w-full items-center gap-3 border-b px-4 py-3 text-left transition
                ${
                  isSelected
                    ? "bg-white/10 border-l-4 border-l-blue-500"
                    : "hover:bg-white/5"
                }`}
            >
              {element.type === "text" ? (
                <Type size={18} />
              ) : (
                <ImageIcon size={18} />
              )}

              <span className="truncate text-sm font-medium">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
