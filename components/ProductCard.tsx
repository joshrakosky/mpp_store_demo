"use client";

import CatalogImage from "@/components/CatalogImage";
import { type DemoProduct, gridImageFor } from "@/lib/products";

interface ProductCardProps {
  product: DemoProduct;
  onSelect: (product: DemoProduct) => void;
}

/** Clean grid card. Click anywhere (or Select) to open the options popup. */
export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(product);
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow outline-none ring-metro-red focus-visible:ring-2"
    >
      <div className="aspect-square overflow-hidden bg-white p-4">
        <CatalogImage
          src={gridImageFor(product)}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h2 className="mb-1 line-clamp-3 text-sm font-semibold text-gray-900">{product.name}</h2>
        <p className="mb-3 line-clamp-3 flex-1 text-xs text-gray-600">{product.description}</p>
        <button
          type="button"
          // Card already selects; stopPropagation keeps the button a clear control.
          onClick={(event) => {
            event.stopPropagation();
            onSelect(product);
          }}
          className="mt-auto w-full rounded-md bg-metro-red px-3 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Select
        </button>
      </div>
    </article>
  );
}
