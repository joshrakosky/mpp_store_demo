"use client";

import CatalogImage from "@/components/CatalogImage";
import { resolveCartLine } from "@/lib/products";
import type { Cart } from "@/lib/session";

interface CartMenuProps {
  cart: Cart;
  count: number;
  onSetQty: (cartKey: string, qty: number) => void;
  onContinue: () => void;
}

/** Cart icon with red qty badge. Hover (or focus) opens the editable cart panel. */
export default function CartMenu({ cart, count, onSetQty, onContinue }: CartMenuProps) {
  const lines = Object.entries(cart)
    .map(([key, qty]) => {
      const line = resolveCartLine(key);
      if (!line) return null;
      return { line, qty };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={count > 0 ? `Cart, ${count} items` : "Cart, empty"}
        className="relative flex h-10 w-10 items-center justify-center rounded-md bg-metro-red text-white hover:opacity-90"
      >
        <CartIcon />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-metro-red ring-2 ring-metro-red">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Keep the panel in the same hover group so the pointer can move into it. */}
      <div className="invisible absolute right-0 top-full z-30 w-[min(100vw-2rem,22rem)] pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">
              {count === 0 ? "Your cart is empty" : `${count} ${count === 1 ? "item" : "items"}`}
            </p>
          </div>

          {lines.length > 0 && (
            <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
              {lines.map(({ line, qty }) => (
                <li key={line.key} className="flex gap-3 px-4 py-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-gray-50">
                    <CatalogImage
                      src={line.imageUrl}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium text-gray-900">{line.name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSetQty(line.key, qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                        aria-label={`Remove one ${line.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold text-gray-900">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSetQty(line.key, qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                        aria-label={`Add another ${line.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => onSetQty(line.key, 0)}
                        className="ml-auto text-xs font-medium text-metro-red hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-gray-100 p-3">
            <button
              type="button"
              disabled={count === 0}
              onClick={onContinue}
              className="w-full rounded-md bg-metro-red px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M3 5h2l1.5 10h11L20 8H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}
