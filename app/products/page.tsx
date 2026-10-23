"use client";

import { useRouter } from "next/navigation";
import CatalogImage from "@/components/CatalogImage";
import { BUDGET, formatPrice, PRODUCTS } from "@/lib/products";
import { cartItemCount, cartTotal } from "@/lib/session";
import { useShopper } from "@/lib/use-shopper";

export default function ProductsPage() {
  const router = useRouter();
  const { name, cart, ready, updateCart } = useShopper();

  if (!ready || !name) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  const spent = cartTotal(cart);
  const remaining = BUDGET - spent;
  const count = cartItemCount(cart);

  const setQty = (id: string, qty: number) => {
    const next = { ...cart };
    if (qty <= 0) {
      delete next[id];
    } else {
      next[id] = qty;
    }
    updateCart(next);
  };

  return (
    <div className="min-h-screen px-4 py-8 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Choose your gifts</h1>
          <p className="text-white/80">
            Add items until you reach your {formatPrice(BUDGET)} budget.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCTS.map((product) => {
            const qty = cart[product.id] ?? 0;
            const nextTotal = spent - product.price * qty + product.price * (qty + 1);
            const canAdd = nextTotal <= BUDGET;

            return (
              <article key={product.id} className="group flex flex-col overflow-hidden rounded-lg bg-white shadow">
                {/* Same slight zoom the leadership catalog used on card hover. */}
                <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                  <CatalogImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h2 className="mb-2 line-clamp-3 text-sm font-semibold text-gray-900">{product.name}</h2>
                  <p className="mb-3 text-base font-bold text-metro-blue">{formatPrice(product.price)}</p>
                  <div className="mt-auto">
                    {qty === 0 ? (
                      <button
                        type="button"
                        disabled={!canAdd}
                        onClick={() => setQty(product.id, 1)}
                        className="w-full rounded-md bg-metro-red px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        {canAdd ? "Add to cart" : "Over budget"}
                      </button>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="h-9 w-9 rounded-md border border-gray-300 text-lg font-semibold text-gray-800 hover:bg-gray-50"
                          aria-label={`Remove one ${product.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-semibold text-gray-900">{qty}</span>
                        <button
                          type="button"
                          disabled={!canAdd}
                          onClick={() => setQty(product.id, qty + 1)}
                          className="h-9 w-9 rounded-md bg-metro-red text-lg font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                          aria-label={`Add another ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/20 bg-metro-green/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white">
            <p className="text-sm text-white/80">
              {count} {count === 1 ? "item" : "items"} in cart
            </p>
            <p className="text-lg font-semibold">
              {formatPrice(spent)} spent
              <span className="ml-3 text-metro-gold">{formatPrice(remaining)} left</span>
            </p>
          </div>
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
    </div>
  );
}
