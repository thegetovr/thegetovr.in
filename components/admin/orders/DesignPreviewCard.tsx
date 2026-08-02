import DesignPreviewCanvas from "./DesignPreviewCanvas";

import type {
  DesignElement,
  Product,
  ProductColor,
} from "@/types/design";

type DesignPreviewCardProps = {
  product: Product;
  productColor: ProductColor;
  frontElements: DesignElement[];
  backElements: DesignElement[];
};


export default function DesignPreviewCard({
  product,
  productColor,
  frontElements,
  backElements,
}: DesignPreviewCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Design Preview
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-400">
            Front
          </h3>

          <DesignPreviewCanvas
            product={product}
            productColor={productColor}
            view="front"
            elements={frontElements}
          />
        </div>

        {backElements.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-400">
              Back
            </h3>

            <DesignPreviewCanvas
              product={product}
              productColor={productColor}
              view="back"
              elements={backElements}
            />
          </div>
        )}
      </div>
    </section>
  );
}