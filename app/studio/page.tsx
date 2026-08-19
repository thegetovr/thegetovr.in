"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Shirt } from "lucide-react";
import LayersPanel from "@/components/studio/LayersPanel";
import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import { useCartStore } from "@/stores/cartStore";
import { calculatePrice } from "@/lib/store/pricing";
import { useRouter } from "next/navigation";
import { toCartDesign } from "@/lib/studio/cartDesignMapper";
import type {
  Product,
  ProductSize,
  ProductQuantity,
  ProductColor,
  PrintSide,
  DesignElement,
} from "@/types/design";
import StudioLayout from "@/components/studio/layout/StudioLayout";
import ToolRail, { type StudioTool } from "@/components/studio/layout/ToolRail";

export default function StudioPage() {
  const [product, setProduct] = useState<Product>("hoodie");
  const [view, setView] = useState<"front" | "back">("front");
  const [activeTool, setActiveTool] = useState<StudioTool>("product");
  const [mobileToolPanelOpen, setMobileToolPanelOpen] = useState(false);
  const [productColor, setProductColor] = useState<ProductColor>("black");
  const [productSize, setProductSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState<ProductQuantity>(1);
  const [printSide, setPrintSide] = useState<PrintSide>("front");
  const addItem = useCartStore((state) => state.addItem);
  const [exportDesign, setExportDesign] = useState<(() => void) | null>(null);
  const handleExportReady = useCallback((exportFn: (() => void) | null) => {
    setExportDesign(() => exportFn);
  }, []);
  const [designs, setDesigns] = useState<{
    front: DesignElement[];
    back: DesignElement[];
  }>({ front: [], back: [] });
  const [history, setHistory] = useState<{
    front: DesignElement[][];
    back: DesignElement[][];
  }>({ front: [], back: [] });
  const [redoHistory, setRedoHistory] = useState<{
    front: DesignElement[][];
    back: DesignElement[][];
  }>({ front: [], back: [] });
  const currentHistory = history[view];
  const currentRedoHistory = redoHistory[view];
  const elements = designs[view];
  const router = useRouter();

  const handleAddToCart = () => {
    const { unitPrice, totalPrice } = calculatePrice(
      product,
      printSide,
      quantity,
    );

    addItem({
      id: crypto.randomUUID(),
      kind: "custom",

      product,
      color: productColor,

      size: productSize,
      quantity,
      printSide,

      frontElements: toCartDesign(designs.front),
      backElements: toCartDesign(designs.back),
      unitPrice,
      totalPrice,

      createdAt: new Date().toISOString(),
    });
    router.push("/cart");
  };

  const setElements = useCallback(
    (value: React.SetStateAction<DesignElement[]>) => {
      setDesigns((prev) => {
        const currentElements = prev[view];

        setHistory((historyPrev) => ({
          ...historyPrev,
          [view]: [...historyPrev[view], structuredClone(currentElements)],
        }));

        setRedoHistory((redoPrev) => ({
          ...redoPrev,
          [view]: [],
        }));

        return {
          ...prev,
          [view]: typeof value === "function" ? value(currentElements) : value,
        };
      });
    },
    [view],
  );
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const undo = useCallback(() => {
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
  }, [currentHistory, designs, view]);

  const redo = useCallback(() => {
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
  }, [currentRedoHistory, designs, view]);

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
    <main className="flex h-dvh min-h-0 flex-col overflow-hidden bg-[#0b0b0d] pt-20 text-white md:pt-24">
      <div className="mx-auto flex min-h-0 w-full max-w-[1700px] flex-1 overflow-hidden px-0 sm:px-4 md:px-5 md:pb-5">
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden border-y border-white/10 bg-[#151519] sm:rounded-2xl sm:border md:rounded-3xl">
          <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Design Studio
                </h1>

                <p className="mt-0.5 truncate text-sm text-gray-400 sm:mt-1 sm:text-base">
                  Create your own premium apparel
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={() => setView("front")}
                  className={`px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                    view === "front"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Front
                </button>

                <button
                  type="button"
                  onClick={() => setView("back")}
                  className={`px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                    view === "back"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Back
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-gray-200 sm:px-5 sm:text-sm">
                <Shirt size={16} />
                <span>{product.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <StudioLayout
            toolRail={
              <ToolRail
                activeTool={activeTool}
                onChange={(tool) => {
                  setActiveTool(tool);
                  setMobileToolPanelOpen(true);
                }}
              />
            }
            toolPanel={
              <StudioSidebar
                product={product}
                setProduct={setProduct}
                productColor={productColor}
                productSize={productSize}
                printSide={printSide}
                setPrintSide={setPrintSide}
                setProductSize={setProductSize}
                setProductColor={setProductColor}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
                activeTool={activeTool}
                onExport={() => exportDesign?.()}
              />
            }
            mobileToolPanel={
              <StudioSidebar
                product={product}
                setProduct={setProduct}
                productColor={productColor}
                productSize={productSize}
                printSide={printSide}
                setPrintSide={setPrintSide}
                setProductSize={setProductSize}
                setProductColor={setProductColor}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
                activeTool={activeTool}
                onExport={() => exportDesign?.()}
              />
            }
            mobileToolPanelOpen={mobileToolPanelOpen}
            onCloseMobileToolPanel={() => setMobileToolPanelOpen(false)}
            canvas={
              <DesignCanvas
                product={product}
                productColor={productColor}
                view={view}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
                onExportReady={handleExportReady}
              />
            }
            inspector={
              <LayersPanel
                elements={elements}
                selectedId={selectedElementId}
                onSelect={setSelectedElementId}
                onDelete={() => {
                  if (!selectedElementId) return;

                  setElements((prev) =>
                    prev.filter((e) => e.id !== selectedElementId),
                  );

                  setSelectedElementId(null);
                }}
                onToggleVisibility={(id) => {
                  setElements((prev) =>
                    prev.map((element) =>
                      element.id === id
                        ? {
                            ...element,
                            visible: !element.visible,
                          }
                        : element,
                    ),
                  );
                }}
              />
            }
            toolbar={
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
                {/* Editing controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={undo}
                    disabled={currentHistory.length === 0}
                    className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Undo
                  </button>

                  <button
                    type="button"
                    onClick={redo}
                    disabled={currentRedoHistory.length === 0}
                    className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Redo
                  </button>

                  <button
                    type="button"
                    onClick={resetCanvas}
                    disabled={elements.length === 0}
                    className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Reset
                  </button>

                  <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />

                  <button
                    type="button"
                    onClick={bringToFront}
                    disabled={!selectedElementId}
                    className="hidden rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 lg:inline-flex"
                  >
                    Bring Forward
                  </button>

                  <button
                    type="button"
                    onClick={sendToBack}
                    disabled={!selectedElementId}
                    className="hidden rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 lg:inline-flex"
                  >
                    Send Back
                  </button>
                </div>

                {/* Purchase controls */}
                <div className="flex items-center gap-2 border-t border-white/10 pt-3 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
                  <div className="rounded-xl border border-white/10 bg-white/4 px-4 py-2">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Total
                    </span>

                    <span className="text-base font-bold text-white">
                      ₹{calculatePrice(product, printSide, quantity).totalPrice}
                    </span>
                  </div>

                  <div className="flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-white/4">
                    <button
                      type="button"
                      onClick={() =>
                        quantity > 1 &&
                        setQuantity((quantity - 1) as ProductQuantity)
                      }
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-full w-10 items-center justify-center text-lg font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="flex min-w-10 justify-center border-x border-white/10 text-sm font-semibold text-white">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        quantity < 5 &&
                        setQuantity((quantity + 1) as ProductQuantity)
                      }
                      disabled={quantity >= 5}
                      aria-label="Increase quantity"
                      className="flex h-full w-10 items-center justify-center text-lg font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="h-11 rounded-xl bg-white px-5 text-sm font-bold text-black transition hover:bg-gray-200 sm:px-7"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            }
          />
        </section>
      </div>
    </main>
  );
}
