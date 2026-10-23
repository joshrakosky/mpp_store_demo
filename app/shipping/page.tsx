"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatCityLine, LOCKED_SHIPPING } from "@/lib/shipping";
import { cartItemCount } from "@/lib/session";
import { useShopper } from "@/lib/use-shopper";

const fieldClass =
  "w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800";

export default function ShippingPage() {
  const router = useRouter();
  const { name, cart, ready } = useShopper();
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

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Shipping</h1>
          <p className="mb-6 text-gray-600">
            This holiday order ships to a locked address. It is shown here so you can see it, and it cannot be changed.
          </p>

          <div className="space-y-4">
            <Field label="Company" value={LOCKED_SHIPPING.company} />
            <Field label="Attention" value={LOCKED_SHIPPING.attention} />
            <Field label="Street" value={LOCKED_SHIPPING.street} />
            <Field label="City, state, ZIP" value={formatCityLine()} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to products
            </button>
            <button
              type="button"
              onClick={() => router.push("/review")}
              className="rounded-md bg-metro-red px-4 py-3 font-medium text-white hover:opacity-90 sm:ml-auto"
            >
              Review order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input className={fieldClass} value={value} disabled readOnly />
    </label>
  );
}
