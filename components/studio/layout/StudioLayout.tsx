"use client";

import { ReactNode } from "react";

interface StudioLayoutProps {
  toolRail: ReactNode;
  toolPanel: ReactNode;
  mobileToolPanel?: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  toolbar: ReactNode;
  mobileToolPanelOpen?: boolean;
  onCloseMobileToolPanel?: () => void;
}

export default function StudioLayout({
  toolRail,
  toolPanel,
  mobileToolPanel,
  canvas,
  inspector,
  toolbar,
  mobileToolPanelOpen = false,
  onCloseMobileToolPanel,
}: StudioLayoutProps) {
  return (
    <section className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#151519] md:rounded-3xl">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          <aside className="flex w-16 shrink-0 border-r border-white/10 bg-[#111114] sm:w-[72px]">
            {toolRail}
          </aside>

          <aside className="hidden w-70 shrink-0 border-r border-white/10 bg-[#151519] lg:block xl:w-80">
            {toolPanel}
          </aside>

          <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-[#e9e9e9] p-2 sm:p-4 lg:p-6">
            {canvas}
          </main>

          <aside className="hidden w-70 shrink-0 border-l border-white/10 bg-[#151519] xl:block">
            {inspector}
          </aside>

          {mobileToolPanelOpen && (
            <div className="absolute inset-0 z-40 flex items-end bg-black/50 lg:hidden">
              <div className="flex max-h-[88%] w-full flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-[#151519] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="text-sm font-semibold text-white">
                    Studio Controls
                  </span>

                  <button
                    type="button"
                    onClick={onCloseMobileToolPanel}
                    className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="max-h-[calc(88%-57px)] overflow-y-auto">
                  {mobileToolPanel}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-white/10 bg-[#111114]">
          {toolbar}
        </footer>
      </div>
    </section>
  );
}