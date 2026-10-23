"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CatalogImage from "@/components/CatalogImage";
import { BUDGET, formatPrice, getProduct } from "@/lib/products";
import { formatCityLine, LOCKED_SHIPPING } from "@/lib/shipping";
import { cartItemCount, cartTotal, createConfirmationCode, setConfirmationCode } from "@/lib/session";
import { useShopper } from "@/lib/use-shopper";

export default function ReviewPage() {
  const router = useRouter();
  const { name, cart, ready } = useShopper();
  const [submitting, setSubmitting] = useState(false);
  const hasItems = cartItemCount(cart) > 0;

  useEffect(() => {
    if (ready && !hasItems) {
      router.replace("/products");
    }
  }, [ready, hasItems, router]);

  if (!ready || !name || !hasItems) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  const spent = cartTotal(cart);
  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const product = getProduct(id);
      if (!product) return null;
      return { product, qty };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const handleSubmit = () => {
    // Demo only. The code stays in this browser tab.
    setSubmitting(true);
    const code = createConfirmationCode();
    setConfirmationCode(code);
    router.push("/confirmation");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Review your order</h1>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-4 py-4">
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-gray-100">
                  <CatalogImage src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {qty} × {formatPrice(product.price)}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">{formatPrice(product.price * qty)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between text-gray-800">
            <span>Total</span>
            <span className="text-xl font-bold text-metro-red">{formatPrice(spent)}</span>
          </div>
          <p className="mt-1 text-right text-sm text-gray-600">
            {formatPrice(BUDGET - spent)} left of {formatPrice(BUDGET)}
          </p>

          <div className="mt-6 rounded-md bg-gray-50 p-4 text-gray-800">
            <p className="mb-1 text-sm font-medium text-gray-500">Ships to</p>
            <p>{LOCKED_SHIPPING.company}</p>
            <p>{LOCKED_SHIPPING.attention}</p>
            <p>{LOCKED_SHIPPING.street}</p>
            <p>{formatCityLine()}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/shipping")}
              className="rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="rounded-md bg-metro-red px-4 py-3 font-medium text-white hover:opacity-90 disabled:opacity-60 sm:ml-auto"
            >
              {submitting ? "Submitting..." : "Submit order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
