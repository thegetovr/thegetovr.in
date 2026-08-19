"use client";

import { Shirt, ImagePlus, Type, Download } from "lucide-react";

export type StudioTool = "product" | "images" | "text" | "export";

interface ToolRailProps {
  activeTool: StudioTool;
  onChange: (tool: StudioTool) => void;
}

const tools: {
  id: StudioTool;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "product",
    label: "Product",
    icon: Shirt,
  },
  {
    id: "images",
    label: "Images",
    icon: ImagePlus,
  },
  {
    id: "text",
    label: "Text",
    icon: Type,
  },
  {
    id: "export",
    label: "Export",
    icon: Download,
  },
];

export default function ToolRail({
  activeTool,
  onChange,
}: ToolRailProps) {
  return (
    <aside className="flex w-16 flex-col items-center gap-2 bg-[#111114] py-3 lg:w-18 lg:gap-3 lg:py-5">
      {tools.map((tool) => {
        const Icon = tool.icon;

        const isActive = activeTool === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onChange(tool.id)}
            title={tool.label}
            aria-label={tool.label}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all lg:h-14 lg:w-14 lg:rounded-2xl ${
              isActive
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.4 : 2}
              className="lg:hidden"
            />

            <Icon
              size={24}
              strokeWidth={isActive ? 2.4 : 2}
              className="hidden lg:block"
            />

            <span className="pointer-events-none absolute left-full z-20 ml-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#232329] px-3 py-1.5 text-xs font-medium text-white shadow-xl group-hover:block">
              {tool.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}