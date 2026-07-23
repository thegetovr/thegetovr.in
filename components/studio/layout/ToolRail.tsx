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
    <aside className="flex w-20 flex-col items-center gap-3 border-r border-white/10 bg-[#111114] py-5">
      {tools.map((tool) => {
        const Icon = tool.icon;

        return (
          <button
            key={tool.id}
            onClick={() => onChange(tool.id)}
            title={tool.label}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${
              activeTool === tool.id
                ? "bg-white text-black shadow-lg"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            <Icon size={24} />
          </button>
        );
      })}
    </aside>
  );
}