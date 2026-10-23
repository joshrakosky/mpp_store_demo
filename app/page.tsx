"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MetroLogo from "@/components/MetroLogo";
import RequestInfoLink from "@/components/RequestInfoLink";
import { setShopperName } from "@/lib/session";

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name");
      return;
    }
    setShopperName(trimmed);
    router.push("/products");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <RequestInfoLink className="absolute right-4 top-4 z-20 rounded-md bg-metro-red px-4 py-2 text-sm font-medium text-white hover:opacity-90" />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <MetroLogo className="h-20 w-auto" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Holiday Store Demo</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="shopper-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              autoComplete="name"
              aria-label="Name"
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-metro-red"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-metro-red px-4 py-3 font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-metro-red focus:ring-offset-2"
          >
            Start Shopping
          </button>
        </form>
      </div>
    </div>
  );
}
