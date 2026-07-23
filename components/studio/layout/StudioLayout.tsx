"use client";

import { ReactNode } from "react";

interface StudioLayoutProps {
  toolRail: ReactNode;
  toolPanel: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  toolbar: ReactNode;
}

export default function StudioLayout({
  toolRail,
  toolPanel,
  canvas,
  inspector,
  toolbar,
}: StudioLayoutProps) {
  return (
    <section className="flex flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#151519]">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {toolRail}

          <aside className="w-[320px] shrink-0 border-r border-white/10 bg-[#151519]">
            {toolPanel}
          </aside>

          <main className="flex min-w-0 flex-1 items-center justify-center bg-[#e9e9e9] p-6">
            {canvas}
          </main>

          <aside className="w-[300px] shrink-0 border-l border-white/10 bg-[#151519]">
            {inspector}
          </aside>
        </div>

        <footer className="border-t border-white/10 bg-[#111114]">
          {toolbar}
        </footer>
      </div>
    </section>
  );
}