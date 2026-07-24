"use client";

import { useEffect, useState } from "react";
import LayersPanel from "@/components/studio/LayersPanel";
import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import { useCartStore } from "@/stores/cartStore";
import { calculatePrice } from "@/lib/store/pricing";
import { useRouter } from "next/navigation";
import type {
  Product,
  ProductSize,
  ProductQuantity,
  ProductColor,
  PrintSide,
  DesignElement,
} from "@/types/design";
import StudioLayout from "@/components/studio/layout/StudioLayout";
import ToolRail, {
  type StudioTool,
} from "@/components/studio/layout/ToolRail";

export default function StudioPage() {
  const [product, setProduct] = useState<Product>("hoodie");
  const [view, setView] = useState<"front" | "back">("front");
  const [activeTool, setActiveTool] = useState<StudioTool>("product");
  const [productColor, setProductColor] = useState<ProductColor>("black");
  const [productSize, setProductSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState<ProductQuantity>(1);
  const [printSide, setPrintSide] = useState<PrintSide>("front");
  const addItem = useCartStore((state) => state.addItem);
  const [designs, setDesigns] = useState<{ front: DesignElement[]; back: DesignElement[]; }>({ front: [], back: [], });
  const [history, setHistory] = useState<{ front: DesignElement[][]; back: DesignElement[][]; }>({ front: [], back: [], });
  const [redoHistory, setRedoHistory] = useState<{ front: DesignElement[][]; back: DesignElement[][]; }>({ front: [], back: [], });
  const currentHistory = history[view];
  const currentRedoHistory = redoHistory[view];
  const elements = designs[view];
  const router = useRouter();

  const handleAddToCart = () => {
    const { unitPrice, totalPrice } = calculatePrice(
      product,
      printSide,
      quantity
    );

    addItem({
      id: crypto.randomUUID(),

      product,
      color: productColor,
      size: productSize,
      quantity,
      printSide,

      frontElements: designs.front,
      backElements: designs.back,

      unitPrice,
      totalPrice,

      createdAt: new Date().toISOString(),
    });
    router.push("/cart");
  };

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
    <main className="flex h-screen flex-col bg-[#0b0b0d] pt-24 text-white">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1700px] gap-5 overflow-hidden px-5 pb-5">

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
                  className={`px-5 py-2 text-sm font-semibold transition ${view === "front"
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10"
                    }`}
                >
                  Front
                </button>

                <button
                  onClick={() => setView("back")}
                  className={`px-5 py-2 text-sm font-semibold transition ${view === "back"
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

          <StudioLayout
            toolRail={
              <ToolRail
                activeTool={activeTool}
                onChange={setActiveTool}
              />
            }
            toolPanel={
              <StudioSidebar
                product={product}
                setProduct={setProduct}
                productColor={productColor}
                productSize={productSize}
                quantity={quantity}
                setQuantity={setQuantity}
                printSide={printSide}
                setPrintSide={setPrintSide}
                setProductSize={setProductSize}
                setProductColor={setProductColor}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
                activeTool={activeTool}
                onAddToCart={handleAddToCart}
              />
            }
            canvas={
              <DesignCanvas
                product={product}
                productColor={productColor}
                view={view}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}

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
                    prev.filter((e) => e.id !== selectedElementId)
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
                        : element
                    )
                  );
                }}
              />
            }
            toolbar={
              <div className="flex h-16 items-center justify-center gap-3">
                <button
                  onClick={undo}
                  disabled={currentHistory.length === 0}
                  className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
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
            }
          />
        </section>
      </div>
    </main>
  );
}
