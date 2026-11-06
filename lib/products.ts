// Eight grid cards. Multi-color styles share one card; Nike is one card with
// Product → Color → Size. Pricing / budget are off for this demo pass — cart
// is quantity only through checkout.

export interface ProductColor {
  id: string;
  name: string;
  /** File under /public/images */
  image: string;
}

export interface NikeStyle {
  id: string;
  name: string;
  sizeChartUrl: string;
  sizes: string[];
  colors: ProductColor[];
}

export type DemoProduct =
  | {
      id: string;
      name: string;
      description: string;
      kind: "simple";
      image: string;
    }
  | {
      id: string;
      name: string;
      description: string;
      kind: "colored";
      sizeChartUrl?: string;
      colors: ProductColor[];
    }
  | {
      id: string;
      name: string;
      description: string;
      kind: "nike";
      /** Static logo on the grid; product photos only appear in the Select popup. */
      gridImage: string;
      styles: NikeStyle[];
    };

/** Cart line resolved from a composite key like `owala::blue-oasis` or `nike::hoodie::black::L`. */
export interface CartLine {
  key: string;
  productId: string;
  name: string;
  imageUrl: string;
}

const NIKE_BLURB =
  "Hoodie, crew, or quarter-zip. Dri-FIT fleece with UVA/UVB protection and an embroidered Swoosh.";

const MENS_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const WOMENS_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export const PRODUCTS: DemoProduct[] = [
  {
    id: "miir",
    name: "MiiR Causeway Tech Organizer",
    description:
      "Organizer for cables, earbuds, and power banks. 4.7 in. high, 8.5 in. wide, 3.1 in. deep.",
    kind: "colored",
    sizeChartUrl: "https://www.sanmar.com/p/75186_DeepLake/specSheetMeasurements",
    colors: [
      { id: "blue-lake", name: "Blue Lake", image: "MPP_MIIR.TRAVEL.BAG_BLUE.LAKE.jpg" },
      { id: "pitch-black", name: "Pitch Black", image: "MPP_MIIR.TRAVEL.BAG_PITCH.BLACK.jpg" },
      { id: "truffle", name: "Truffle", image: "MPP_MIIR.TRAVEL.BAG_TRUFFLE.jpg" },
    ],
  },
  {
    id: "moleskine",
    name: "Moleskine Large Notebook and Mini Notebook Charm Gift Set",
    description: "Hard cover ruled large notebook and mini notebook charm in a Moleskine gift box.",
    kind: "simple",
    image: "MPP_MOLESKINE.KIT_0.MAIN.jpg",
  },
  {
    id: "mophie",
    name: "mophie Snap+ Powerstation Stand",
    description: "10,000mAh MagSafe-compatible stand that charges a phone in landscape or portrait.",
    kind: "simple",
    image: "MPP_MOPHIE.SNAP.PS_0.MAIN.jpg",
  },
  {
    id: "neolyt",
    name: "RUPT Neolyt",
    description:
      "Fully custom LED display made from your artwork, with adjustable brightness and a rechargeable base.",
    kind: "simple",
    image: "MPP_NEOLYT_0.MAIN.jpg",
  },
  {
    id: "nike",
    name: "Nike Products",
    description: NIKE_BLURB,
    kind: "nike",
    gridImage: "nike-logo.png",
    styles: [
      {
        id: "hoodie",
        name: "Hoodie",
        sizeChartUrl: "https://www.sanmar.com/p/75273_NavyHthr/specSheetMeasurements",
        sizes: MENS_SIZES,
        colors: [
          { id: "black", name: "Black", image: "MPP_NIKE.HOODIE_M-BLK.jpg" },
          { id: "navy-heather", name: "Navy Heather", image: "MPP_NIKE.HOODIE_M-NAVY.HEATHER.jpg" },
        ],
      },
      {
        id: "crew",
        name: "Crew",
        sizeChartUrl: "https://www.sanmar.com/p/75274_NavyHthr/specSheetMeasurements",
        sizes: MENS_SIZES,
        colors: [
          { id: "black", name: "Black", image: "MPP_NIKE.CREWNECK_M-BLK.jpg" },
          { id: "navy-heather", name: "Navy Heather", image: "MPP_NIKE.CREWNECK_M-NAVY.HEATHER.jpg" },
        ],
      },
      {
        id: "qz-mens",
        name: "Men's Quarter-Zip",
        sizeChartUrl: "https://www.sanmar.com/p/75275_NavyHthr/specSheetMeasurements",
        sizes: MENS_SIZES,
        colors: [
          { id: "black", name: "Black", image: "MPP_NIKE.QZ_M-BLK.jpg" },
          { id: "navy-heather", name: "Navy Heather", image: "MPP_NIKE.QZ_M-NAVY.HEATHER.jpg" },
        ],
      },
      {
        id: "qz-womens",
        name: "Women's Quarter-Zip",
        sizeChartUrl: "https://www.sanmar.com/p/75276_NavyHthr/specSheetMeasurements",
        sizes: WOMENS_SIZES,
        colors: [
          { id: "black", name: "Black", image: "MPP_NIKE.QZ_W-BLK.jpg" },
          { id: "navy-heather", name: "Navy Heather", image: "MPP_NIKE.QZ_W-NAVY.HEATHER.jpg" },
        ],
      },
    ],
  },
  {
    id: "owala",
    name: "24oz Owala FreeSip",
    description: "Insulated bottle with a built-in straw and a wide-mouth opening for cold drinks.",
    kind: "colored",
    colors: [
      { id: "blue-oasis", name: "Blue Oasis", image: "MPP_OWALA.FREESIP.24_BLUE.OASIS.jpg" },
      { id: "blue-steel", name: "Blue Steel", image: "MPP_OWALA.FREESIP.24_BLUE.STEEL.jpg" },
      { id: "calm-waters", name: "Calm Waters", image: "MPP_OWALA.FREESIP.24_CALM.WATERS.jpg" },
      { id: "coastal-mint", name: "Coastal Mint", image: "MPP_OWALA.FREESIP.24_COASTAL.MINT.jpg" },
      { id: "green-house", name: "Green House", image: "MPP_OWALA.FREESIP.24_GREEN.HOUSE.jpg" },
      { id: "joshua-tree", name: "Joshua Tree", image: "MPP_OWALA.FREESIP.24_JOSHUA.TREE.jpg" },
      { id: "nailed-it", name: "Nailed It", image: "MPP_OWALA.FREESIP.24_NAILED.IT.jpg" },
      { id: "out-of-the-blue", name: "Out of the Blue", image: "MPP_OWALA.FREESIP.24_OUT.OF.THE.BLUE.jpg" },
      { id: "read-my-lips", name: "Read My Lips", image: "MPP_OWALA.FREESIP.24_READ.MY.LIPS.jpg" },
      { id: "rock-on", name: "Rock On", image: "MPP_OWALA.FREESIP.24_ROCK.ON.jpg" },
      { id: "shy-marshmallow", name: "Shy Marshmallow", image: "MPP_OWALA.FREESIP.24_SHY.MARSHMALLOW.jpg" },
      { id: "very-very-dark", name: "Very, Very Dark", image: "MPP_OWALA.FREESIP.24_VERY.VERY.DARK.jpg" },
    ],
  },
  {
    id: "rtic",
    name: "RTIC 3-Gallon Halftime Cooler",
    description: "Rotomolded cooler with fast-fill taps. Holds ice for more than 24 hours.",
    kind: "colored",
    colors: [
      { id: "berry-jam", name: "Berry Jam", image: "MPP_RTIC.COOLER_BERRY.JAM.jpg" },
      { id: "dark-grey-cool-grey", name: "Dark Grey / Cool Grey", image: "MPP_RTIC.COOLER_DARK.GREY-COOL.GREY.jpg" },
      { id: "dark-pine", name: "Dark Pine / Black / Cherry", image: "MPP_RTIC.COOLER_DARK.PINE-BLACK-CHERRY.jpg" },
      { id: "light-black", name: "Light Black / Persimmon", image: "MPP_RTIC.COOLER_LIGHT.BLACK-PERSIMMON.jpg" },
      { id: "pale-pink", name: "Pale Pink", image: "MPP_RTIC.COOLER_PALE.PINK.jpg" },
      { id: "patriot", name: "Patriot", image: "MPP_RTIC.COOLER_PATRIOT.jpg" },
      { id: "white-grey", name: "White and Grey", image: "MPP_RTIC.COOLER_WHITE-AND-GREY.jpg" },
    ],
  },
  {
    id: "tumi",
    name: "TUMI Knight Sling Backpack",
    description: "Ballistic nylon sling backpack with a padded pocket for tablets up to 11 inches.",
    kind: "simple",
    image: "MPP_TUMI.BACKPACK_0.MAIN.jpg",
  },
];

export function getProduct(id: string): DemoProduct | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function imagePath(file: string): string {
  return `/images/${file}`;
}

/** Image shown on the 8-card grid (not the Select popup preview). */
export function gridImageFor(product: DemoProduct): string {
  if (product.kind === "simple") return imagePath(product.image);
  if (product.kind === "colored") return imagePath(product.colors[0].image);
  return imagePath(product.gridImage);
}

/** Cart key for a simple product, or colored product + color. */
export function coloredCartKey(productId: string, colorId?: string): string {
  return colorId ? `${productId}::${colorId}` : productId;
}

export function nikeCartKey(styleId: string, colorId: string, size: string): string {
  return `nike::${styleId}::${colorId}::${size}`;
}

/** Turn a cart key into display/image data, or null if the key is stale. */
export function resolveCartLine(key: string): CartLine | null {
  const parts = key.split("::");
  const productId = parts[0];
  const product = getProduct(productId);
  if (!product) return null;

  if (product.kind === "simple") {
    if (parts.length !== 1) return null;
    return {
      key,
      productId,
      name: product.name,
      imageUrl: imagePath(product.image),
    };
  }

  if (product.kind === "colored") {
    if (parts.length !== 2) return null;
    const color = product.colors.find((entry) => entry.id === parts[1]);
    if (!color) return null;
    return {
      key,
      productId,
      name: `${product.name} — ${color.name}`,
      imageUrl: imagePath(color.image),
    };
  }

  // nike::style::color::size
  if (parts.length !== 4) return null;
  const style = product.styles.find((entry) => entry.id === parts[1]);
  const color = style?.colors.find((entry) => entry.id === parts[2]);
  const size = parts[3];
  if (!style || !color || !style.sizes.includes(size)) return null;
  return {
    key,
    productId,
    name: `${product.name} — ${style.name}, ${color.name}, ${size}`,
    imageUrl: imagePath(color.image),
  };
}
