// Demo walkthrough state. Stays in the browser. Nothing is sent to a server.

import { getProduct } from "@/lib/products";

const NAME_KEY = "shopperName";
const CART_KEY = "cart";
const CODE_KEY = "confirmationCode";

export type Cart = Record<string, number>;

export function getShopperName(): string | null {
  const name = sessionStorage.getItem(NAME_KEY);
  return name && name.trim() ? name : null;
}

export function setShopperName(name: string): void {
  sessionStorage.setItem(NAME_KEY, name.trim());
}

export function getCart(): Cart {
  const raw = sessionStorage.getItem(CART_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const cart: Cart = {};
    for (const [id, qty] of Object.entries(parsed)) {
      const count = Number(qty);
      if (getProduct(id) && Number.isInteger(count) && count > 0) {
        cart[id] = count;
      }
    }
    return cart;
  } catch {
    return {};
  }
}

export function setCart(cart: Cart): void {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getConfirmationCode(): string | null {
  return sessionStorage.getItem(CODE_KEY);
}

export function setConfirmationCode(code: string): void {
  sessionStorage.setItem(CODE_KEY, code);
}

/** Short demo receipt code. Not stored anywhere outside this tab. */
export function createConfirmationCode(): string {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `MPP-${number}`;
}

export function clearSession(): void {
  sessionStorage.removeItem(NAME_KEY);
  sessionStorage.removeItem(CART_KEY);
  sessionStorage.removeItem(CODE_KEY);
}

export function cartItemCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function cartTotal(cart: Cart): number {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = getProduct(id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
}
