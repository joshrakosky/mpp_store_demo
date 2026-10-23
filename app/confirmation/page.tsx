"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RequestInfoLink from "@/components/RequestInfoLink";
import { clearSession, getConfirmationCode, getShopperName } from "@/lib/session";

export default function ConfirmationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedName = getShopperName();
    const storedCode = getConfirmationCode();
    if (!storedName || !storedCode) {
      router.replace("/");
      return;
    }
    setName(storedName);
    setCode(storedCode);
  }, [router]);

  const handleStartOver = () => {
    clearSession();
    router.push("/");
  };

  if (!name || !code) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-5xl" aria-hidden>
            ✓
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Order confirmed</h1>
          <p className="mb-6 text-gray-600">
            Thank you, {name}, for walking through the Metro holiday demo.
          </p>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <p className="mb-2 text-sm text-gray-600">Demo confirmation</p>
            <p className="text-2xl font-bold text-metro-red">{code}</p>
          </div>

          <p className="mb-6 text-sm text-gray-600">
            This order was not saved. Nothing was sent to a database. The confirmation only lives in this browser tab.
          </p>

          <button
            type="button"
            onClick={handleStartOver}
            className="w-full rounded-md bg-metro-red px-4 py-3 font-medium text-white hover:opacity-90"
          >
            Start over
          </button>
          <RequestInfoLink className="mt-3 block w-full rounded-md bg-metro-red px-4 py-3 text-center font-medium text-white hover:opacity-90" />
        </div>
      </div>
    </div>
  );
}
