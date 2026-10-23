"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, getShopperName, setCart, type Cart } from "@/lib/session";

// Shared gate for every page after the name form.
export function useShopper() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [cart, setCartState] = useState<Cart>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getShopperName();
    if (!stored) {
      router.replace("/");
      return;
    }
    setName(stored);
    setCartState(getCart());
    setReady(true);
  }, [router]);

  const updateCart = (next: Cart) => {
    setCart(next);
    setCartState(next);
  };

  return { name, cart, ready, updateCart };
}
