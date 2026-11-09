"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartMenu from "@/components/CartMenu";
import ProductCard from "@/components/ProductCard";
import ProductSelectModal from "@/components/ProductSelectModal";
import { type DemoProduct, PRODUCTS } from "@/lib/products";
import { cartItemCount } from "@/lib/session";
import { useShopper } from "@/lib/use-shopper";

export default function ProductsPage() {
  const router = useRouter();
  const { name, cart, ready, updateCart } = useShopper();
  const [activeProduct, setActiveProduct] = useState<DemoProduct | null>(null);

  if (!ready || !name) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  const count = cartItemCount(cart);

  const setQty = (cartKey: string, qty: number) => {
    const next = { ...cart };
    if (qty <= 0) {
      delete next[cartKey];
    } else {
      next[cartKey] = qty;
    }
    updateCart(next);
  };

  const addFromModal = (cartKey: string, qty: number) => {
    const next = { ...cart };
    next[cartKey] = (next[cartKey] ?? 0) + qty;
    updateCart(next);
    setActiveProduct(null);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Choose your gifts</h1>
          <p className="text-white/80">Select products to build your demo order.</p>
        </div>

        {/* Aligns with the first and last cards in the 4-column grid. */}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/info")}
            aria-label="Back to info"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-metro-red text-white hover:opacity-90"
          >
            <BackIcon />
          </button>

          <CartMenu
            cart={cart}
            count={count}
            onSetQty={setQty}
            onContinue={() => router.push("/shipping")}
          />
        </div>

        {/* Eight family cards. Color / size / qty open in the Select popup. */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
          ))}
        </div>
      </div>

      {activeProduct && (
        <ProductSelectModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAdd={addFromModal}
        />
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
