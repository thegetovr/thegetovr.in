"use client";

import {
  Image as ImageIcon,
  Type,
  Eye,
  EyeOff,
} from "lucide-react";
import { DesignElement } from "@/types/design";

interface LayersPanelProps {
  elements: DesignElement[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: () => void;
  onToggleVisibility: (id: string) => void;
}

export default function LayersPanel({
  elements,
  selectedId,
  onSelect,
  onDelete,
  onToggleVisibility,
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
            <div
              key={element.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(element.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(element.id);
                }
              }}
              className={`flex w-full cursor-pointer items-center gap-3 border-b px-4 py-3 text-left transition ${
                isSelected
                  ? "border-l-4 border-l-blue-500 bg-white/10"
                  : "hover:bg-white/5"
              }`}
            >
              {element.type === "text" ? (
                <Type size={18} />
              ) : (
                <ImageIcon size={18} />
              )}

              <div className="flex flex-1 items-center justify-between">
                <span
                  className={`truncate text-sm font-medium ${
                    !element.visible ? "opacity-50" : ""
                  }`}
                >
                  {label}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(element.id);
                  }}
                  className="rounded p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  {element.visible ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-4 space-y-3">
        <button
          type="button"
          onClick={onDelete}
          disabled={!selectedId}
          className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Delete Selected
        </button>
      </div>
    </aside>
  );
}