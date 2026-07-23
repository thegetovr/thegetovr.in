"use client";

import { useEffect, useState } from "react";
import LayersPanel from "@/components/studio/LayersPanel";
import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import type { Product, DesignElement } from "@/types/design";

export default function StudioPage() {
  const [product, setProduct] = useState<Product>("hoodie");
  const [view, setView] = useState<"front" | "back">("front");
  const [productColor, setProductColor] = useState<
    "black" | "white" | "gray" | "green"
  >("black");
  const [designs, setDesigns] = useState<{
    front: DesignElement[];
    back: DesignElement[];
  }>({
    front: [],
    back: [],
  });
  const [history, setHistory] = useState<{
    front: DesignElement[][];
    back: DesignElement[][];
  }>({
    front: [],
    back: [],
  });

  const [redoHistory, setRedoHistory] = useState<{
    front: DesignElement[][];
    back: DesignElement[][];
  }>({
    front: [],
    back: [],
  });
  const currentHistory = history[view];
  const currentRedoHistory = redoHistory[view];
  const elements = designs[view];

  const setElements: React.Dispatch<React.SetStateAction<DesignElement[]>> = (
    value,
  ) => {
    setHistory((prev) => ({
      ...prev,
      [view]: [...prev[view], structuredClone(designs[view])],
    }));

    setRedoHistory((prev) => ({
      ...prev,
      [view]: [],
    }));

    setDesigns((prev) => ({
      ...prev,
      [view]: typeof value === "function" ? value(prev[view]) : value,
    }));
  };
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const undo = () => {
    if (currentHistory.length === 0) return;

    const previous = currentHistory[currentHistory.length - 1];

    setHistory((prev) => ({
      ...prev,
      [view]: prev[view].slice(0, -1),
    }));

    setRedoHistory((prev) => ({
      ...prev,
      [view]: [...prev[view], structuredClone(designs[view])],
    }));

    setDesigns((prev) => ({
      ...prev,
      [view]: previous,
    }));
  };

  const redo = () => {
    if (currentRedoHistory.length === 0) return;

    const next = currentRedoHistory[currentRedoHistory.length - 1];

    setRedoHistory((prev) => ({
      ...prev,
      [view]: prev[view].slice(0, -1),
    }));

    setHistory((prev) => ({
      ...prev,
      [view]: [...prev[view], structuredClone(designs[view])],
    }));

    setDesigns((prev) => ({
      ...prev,
      [view]: next,
    }));
  };

  const resetCanvas = () => {
    if (elements.length === 0) return;

    setHistory((prev) => ({
      ...prev,
      [view]: [...prev[view], structuredClone(designs[view])],
    }));

    setRedoHistory((prev) => ({
      ...prev,
      [view]: [],
    }));

    setDesigns((prev) => ({
      ...prev,
      [view]: [],
    }));

    setSelectedElementId(null);
  };

  const bringToFront = () => {
    if (!selectedElementId) return;

    setElements((prev) => {
      const selected = prev.find((element) => element.id === selectedElementId);

      if (!selected) return prev;

      return [
        ...prev.filter((element) => element.id !== selectedElementId),
        selected,
      ];
    });
  };

  const sendToBack = () => {
    if (!selectedElementId) return;

    setElements((prev) => {
      const selected = prev.find((element) => element.id === selectedElementId);

      if (!selected) return prev;

      return [
        selected,
        ...prev.filter((element) => element.id !== selectedElementId),
      ];
    });
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }

      if (e.ctrlKey && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }

      if (e.key === "Delete" && selectedElementId) {
        e.preventDefault();

        setElements((prev) =>
          prev.filter((element) => element.id !== selectedElementId),
        );

        setSelectedElementId(null);
      }

      if (e.key === "Escape") {
        setSelectedElementId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo, selectedElementId, setElements]);
  return (
    <main className="min-h-screen bg-[#0b0b0d] pt-24 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[1700px] gap-5 px-5 pb-5">
        {/* Sidebar */}
        <aside className="w-[300px] shrink-0 rounded-3xl border border-white/10 bg-[#151519] p-5">
          <StudioSidebar
            product={product}
            setProduct={setProduct}
            productColor={productColor}
            setProductColor={setProductColor}
            elements={elements}
            setElements={setElements}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
          />
        </aside>

        {/* Studio */}
        <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151519]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Design Studio
              </h1>

              <p className="mt-1 text-gray-400">
                Create your own premium apparel
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5">
                <button
                  onClick={() => setView("front")}
                  className={`px-5 py-2 text-sm font-semibold transition ${
                    view === "front"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Front
                </button>

                <button
                  onClick={() => setView("back")}
                  className={`px-5 py-2 text-sm font-semibold transition ${
                    view === "back"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Back
                </button>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold tracking-wide">
                🧥 {product.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Workspace */}
          {/* Workspace */}
          <div className="flex min-h-0 flex-1 overflow-hidden bg-[#e9e9e9]">
            <div className="flex flex-1 items-center justify-center p-6">
              <DesignCanvas
                product={product}
                productColor={productColor}
                view={view}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
              />
            </div>

            <LayersPanel
              elements={elements}
              selectedId={selectedElementId}
              onSelect={setSelectedElementId}
            />
          </div>

          {/* Toolbar */}
          <div className="flex h-16 items-center justify-center gap-3 border-t border-white/10 bg-[#111114]">
            <button
              onClick={undo}
              disabled={currentHistory.length === 0}
              className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ↶ Undo
            </button>

            <button
              onClick={redo}
              disabled={currentRedoHistory.length === 0}
              className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↷ Redo
            </button>

            <button
              onClick={resetCanvas}
              disabled={elements.length === 0}
              className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>

            <button
              onClick={bringToFront}
              disabled={!selectedElementId}
              className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↑ Front
            </button>

            <button
              onClick={sendToBack}
              disabled={!selectedElementId}
              className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↓ Back
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
