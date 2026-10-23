// Eight holiday gifts, shown as two rows of four. Photos are borrowed from
// the leadership store. Prices stay under $50 so a shopper can add several
// items before the $100 budget stops them.

export interface DemoProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const BUDGET = 100;

export const PRODUCTS: DemoProduct[] = [
  {
    id: "blanket",
    name: "Ruched Faux Recycled Polyester Blanket",
    price: 14,
    imageUrl: "/images/RA-AP-103073_Ivory.jpg",
  },
  {
    id: "cooler",
    name: "TravisMathew Chill'n 12-Can Cooler",
    price: 16,
    imageUrl: "/images/RA-AP-TMB600_Black.jpg",
  },
  {
    id: "womens-hoodie",
    name: "Adidas Women's Game & Go Fleece Hoodie",
    price: 24,
    imageUrl: "/images/RA-AP-AT209_MediumGreyHeather.jpg",
  },
  {
    id: "mens-hoodie",
    name: "Adidas Men's Game & Go Fleece Hoodie",
    price: 26,
    imageUrl: "/images/RA-AP-AT208_MediumGreyHeather.jpg",
  },
  {
    id: "duffel",
    name: "TravisMathew Lateral Duffel",
    price: 28,
    imageUrl: "/images/RA-AP-TMB200_Black.jpg",
  },
  {
    id: "vest",
    name: "Adidas Men's Puffer Full-Zip Vest",
    price: 36,
    imageUrl: "/images/RA-AP-A572_Black.jpg",
  },
  {
    id: "sweater",
    name: "Brooks Brothers Cotton Stretch V-Neck Sweater",
    price: 42,
    imageUrl: "/images/RA-AP-BB18400_DeepBlack.jpg",
  },
  {
    id: "backpack",
    name: "Oakley 28L Street Pocket Backpack",
    price: 48,
    imageUrl: "/images/RA-AP-921422ODM_Blackout.jpg",
  },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function getProduct(id: string): DemoProduct | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
