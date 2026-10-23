// Locked demo ship-to. Shown on shipping and review, never edited.
// Swap these lines when the real holiday address is ready.

export const LOCKED_SHIPPING = {
  company: "Metro Printed Products",
  attention: "Attn: Holiday Demo",
  street: "100 Demo Street",
  city: "Indianapolis",
  state: "IN",
  zip: "46204",
} as const;

export function formatCityLine(): string {
  return `${LOCKED_SHIPPING.city}, ${LOCKED_SHIPPING.state} ${LOCKED_SHIPPING.zip}`;
}
