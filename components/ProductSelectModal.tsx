"use client";

import { useEffect, useId, useState } from "react";
import CatalogImage from "@/components/CatalogImage";
import {
  coloredCartKey,
  type DemoProduct,
  imagePath,
  nikeCartKey,
} from "@/lib/products";

interface ProductSelectModalProps {
  product: DemoProduct;
  onClose: () => void;
  /** Adds qty for the chosen cart key (variant). */
  onAdd: (cartKey: string, qty: number) => void;
}

const selectClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900";

const QTY_MAX = 20;

export default function ProductSelectModal({ product, onClose, onAdd }: ProductSelectModalProps) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-lg font-bold text-gray-900">
            {product.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {product.kind === "simple" && (
          <SimpleForm product={product} onClose={onClose} onAdd={onAdd} />
        )}
        {product.kind === "colored" && (
          <ColoredForm product={product} onClose={onClose} onAdd={onAdd} />
        )}
        {product.kind === "nike" && <NikeForm product={product} onClose={onClose} onAdd={onAdd} />}
      </div>
    </div>
  );
}

function QtyField({ qty, setQty }: { qty: number; setQty: (qty: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500">Quantity</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="h-10 w-10 rounded-md border border-gray-300 text-lg font-semibold text-gray-800 hover:bg-gray-50"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-8 text-center text-base font-semibold text-gray-900">{qty}</span>
        <button
          type="button"
          disabled={qty >= QTY_MAX}
          onClick={() => setQty(qty + 1)}
          className="h-10 w-10 rounded-md border border-gray-300 text-lg font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </label>
  );
}

function ModalActions({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="rounded-md bg-metro-red px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Add to cart
      </button>
    </div>
  );
}

function Preview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-4 aspect-square overflow-hidden rounded-md bg-white">
      <CatalogImage src={src} alt={alt} className="h-full w-full object-contain" />
    </div>
  );
}

function SimpleForm({
  product,
  onClose,
  onAdd,
}: {
  product: Extract<DemoProduct, { kind: "simple" }>;
  onClose: () => void;
  onAdd: (cartKey: string, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <>
      <Preview src={imagePath(product.image)} alt={product.name} />
      <QtyField qty={qty} setQty={setQty} />
      <ModalActions onClose={onClose} onConfirm={() => onAdd(coloredCartKey(product.id), qty)} />
    </>
  );
}

function ColoredForm({
  product,
  onClose,
  onAdd,
}: {
  product: Extract<DemoProduct, { kind: "colored" }>;
  onClose: () => void;
  onAdd: (cartKey: string, qty: number) => void;
}) {
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [qty, setQty] = useState(1);
  const color = product.colors.find((entry) => entry.id === colorId) ?? product.colors[0];

  return (
    <>
      <Preview src={imagePath(color.image)} alt={`${product.name}, ${color.name}`} />
      <label className="mb-3 block">
        <span className="mb-1 block text-xs font-medium text-gray-500">Color</span>
        <select className={selectClass} value={color.id} onChange={(e) => setColorId(e.target.value)}>
          {product.colors.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>
      {product.sizeChartUrl && (
        <a
          href={product.sizeChartUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 inline-block text-xs font-medium text-metro-red underline"
        >
          Size chart
        </a>
      )}
      <QtyField qty={qty} setQty={setQty} />
      <ModalActions
        onClose={onClose}
        onConfirm={() => onAdd(coloredCartKey(product.id, color.id), qty)}
      />
    </>
  );
}

function NikeForm({
  product,
  onClose,
  onAdd,
}: {
  product: Extract<DemoProduct, { kind: "nike" }>;
  onClose: () => void;
  onAdd: (cartKey: string, qty: number) => void;
}) {
  const [styleId, setStyleId] = useState(product.styles[0].id);
  const style = product.styles.find((entry) => entry.id === styleId) ?? product.styles[0];
  const [colorId, setColorId] = useState(style.colors[0].id);
  const color = style.colors.find((entry) => entry.id === colorId) ?? style.colors[0];
  const [size, setSize] = useState(style.sizes.includes("M") ? "M" : style.sizes[0]);
  const [qty, setQty] = useState(1);

  const onStyleChange = (nextStyleId: string) => {
    const next = product.styles.find((entry) => entry.id === nextStyleId) ?? product.styles[0];
    setStyleId(next.id);
    setColorId(next.colors[0].id);
    setSize(next.sizes.includes("M") ? "M" : next.sizes[0]);
  };

  return (
    <>
      {/* Thumbnail follows Product + Color. Grid card keeps the Nike logo. */}
      <Preview src={imagePath(color.image)} alt={`${style.name}, ${color.name}`} />
      <label className="mb-3 block">
        <span className="mb-1 block text-xs font-medium text-gray-500">Product</span>
        <select className={selectClass} value={style.id} onChange={(e) => onStyleChange(e.target.value)}>
          {product.styles.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mb-3 block">
        <span className="mb-1 block text-xs font-medium text-gray-500">Color</span>
        <select className={selectClass} value={color.id} onChange={(e) => setColorId(e.target.value)}>
          {style.colors.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mb-3 block">
        <span className="mb-1 block text-xs font-medium text-gray-500">Size</span>
        <select className={selectClass} value={size} onChange={(e) => setSize(e.target.value)}>
          {style.sizes.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </label>
      <a
        href={style.sizeChartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 inline-block text-xs font-medium text-metro-red underline"
      >
        Size chart
      </a>
      <QtyField qty={qty} setQty={setQty} />
      <ModalActions
        onClose={onClose}
        onConfirm={() => onAdd(nikeCartKey(style.id, color.id, size), qty)}
      />
    </>
  );
}
