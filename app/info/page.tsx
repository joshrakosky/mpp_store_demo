"use client";

import { useRouter } from "next/navigation";
import { useShopper } from "@/lib/use-shopper";

/** Brief pitch after name login, before the gift grid. */
export default function InfoPage() {
  const router = useRouter();
  const { name, ready } = useShopper();

  if (!ready || !name) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg md:p-10">
        {/* Keep the welcome on one line; size down so it fits the card width. */}
        <h1 className="mb-4 whitespace-nowrap text-lg font-bold text-gray-900 sm:text-xl">
          Welcome to the MPP Mock Holiday Store!
        </h1>

        <p className="mb-3 text-gray-700">
          This is a quick example on how your holiday order collection process can be created within
          our proprietary MPP ANIQUE platform.
        </p>
        <p className="mb-6 font-medium text-metro-blue">
          Infinite creativity, infinite reporting, infinite possibilities.
        </p>

        <p className="mb-3 text-gray-700">
          Give your team very broad (or very tight) restrictions on things like (but not limited
          to):
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-700">
          <li>Item Pricing (can be shown or not shown)</li>
          <li>Item Selection (individual products, kits, etc.)</li>
          <li>Shipping Options (one/multiple/individual locations)</li>
          <li>
            Backend Accounting Metrics (example: applying cost centers to the people who order)
          </li>
          <li>& Much More!</li>
        </ul>

        <p className="mb-8 text-gray-700">
          Please feel free to poke around, submit a mock order, and let your Metro Printed Products:
          Proforma rep know how we can build YOUR free order-collection module today!
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="rounded-md bg-metro-red px-4 py-3 font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-metro-red focus:ring-offset-2 sm:px-8"
          >
            Continue to gifts
          </button>
        </div>
      </div>
    </div>
  );
}
