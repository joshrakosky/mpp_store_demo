"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const addFromModal = (cartKey: string, qty: number) => {
    const next = { ...cart };
    next[cartKey] = (next[cartKey] ?? 0) + qty;
    updateCart(next);
    setActiveProduct(null);
  };

  return (
    <div className="min-h-screen px-4 py-8 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Choose your gifts</h1>
          <p className="text-white/80">Select products to build your demo order.</p>
        </div>

        {/* Eight family cards. Color / size / qty open in the Select popup. */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/20 bg-metro-green/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-white">
            {count} {count === 1 ? "item" : "items"} in cart
          </p>
          <button
            type="button"
            disabled={count === 0}
            onClick={() => router.push("/shipping")}
            className="rounded-md bg-metro-red px-6 py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-white/30"
          >
            Continue
          </button>
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
