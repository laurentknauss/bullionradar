import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les prix dealers
export interface DealerPrice {
  id: string;
  coin_slug: string;
  coin_name: string;
  dealer: string;
  price_cents: number;
  currency: string;
  in_stock: boolean;
  product_url: string | null;
  scraped_at: string;
  created_at: string;
}

// Récupérer les derniers prix pour toutes les pièces
// Note: le scraper Or.fr tourne toutes les 30 min (~1056 rows/jour),
// il faut un limit suffisant pour inclure aussi Godot et Pieces-Or (1x/jour)
export async function getLatestPrices(): Promise<DealerPrice[]> {
  const { data, error } = await supabase
    .from("dealer_prices")
    .select("*")
    .order("scraped_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("Error fetching prices:", error);
    return [];
  }

  // Garder seulement le dernier prix par coin/dealer
  const latestByKey = new Map<string, DealerPrice>();
  for (const row of data ?? []) {
    const key = `${row.coin_slug}-${row.dealer}`;
    if (!latestByKey.has(key)) {
      latestByKey.set(key, row);
    }
  }

  return Array.from(latestByKey.values());
}

// Récupérer les prix pour une pièce spécifique
export async function getPricesForCoin(
  coinSlug: string,
): Promise<DealerPrice[]> {
  const { data, error } = await supabase
    .from("dealer_prices")
    .select("*")
    .eq("coin_slug", coinSlug)
    .order("scraped_at", { ascending: false });

  if (error) {
    console.error("Error fetching prices for coin:", error);
    return [];
  }

  // Garder seulement le dernier prix par dealer
  const latestByDealer = new Map<string, DealerPrice>();
  for (const row of data ?? []) {
    if (!latestByDealer.has(row.dealer)) {
      latestByDealer.set(row.dealer, row);
    }
  }

  return Array.from(latestByDealer.values());
}

// Mapping entre les IDs coins-data.ts et les slugs Supabase dealer_prices
// coins-data.ts utilise "krugerrand-1oz-or", Supabase utilise "krugerrand-1oz"
const COIN_ID_TO_PRICE_SLUG: Record<string, string> = {
  // Or 1oz
  "krugerrand-1oz-or": "krugerrand-1oz",
  "maple-leaf-1oz-or": "maple-leaf-1oz",
  "philharmonique-1oz-or": "philharmonique-1oz",
  "britannia-1oz-or": "britannia-1oz-or",
  "kangourou-1oz-or": "kangourou-1oz-or",
  "american-eagle-1oz-or": "american-eagle-1oz-or",
  "american-buffalo-1oz-or": "american-buffalo-1oz-or",
  // Or 1/2oz
  "britannia-1-2oz-or": "britannia-1-2oz-or",
  "krugerrand-1-2oz-or": "krugerrand-1-2oz-or",
  "kangourou-1-2oz-or": "kangourou-1-2oz-or",
  "maple-leaf-1-2oz-or": "maple-leaf-1-2oz-or",
  "philharmonique-1-2oz-or": "philharmonique-1-2oz-or",
  "american-eagle-1-2oz-or": "american-eagle-1-2oz-or",
  // Or 1/4oz
  "britannia-1-4oz-or": "britannia-1-4oz-or",
  "krugerrand-1-4oz-or": "krugerrand-1-4oz-or",
  "kangourou-1-4oz-or": "kangourou-1-4oz-or",
  "maple-leaf-1-4oz-or": "maple-leaf-1-4oz-or",
  "philharmonique-1-4oz-or": "philharmonique-1-4oz-or",
  "american-eagle-1-4oz-or": "american-eagle-1-4oz-or",
  // Or 1/10oz
  "britannia-1-10oz-or": "britannia-1-10oz-or",
  "krugerrand-1-10oz-or": "krugerrand-1-10oz-or",
  "kangourou-1-10oz-or": "kangourou-1-10oz-or",
  "maple-leaf-1-10oz-or": "maple-leaf-1-10oz-or",
  "philharmonique-1-10oz-or": "philharmonique-1-10oz-or",
  "american-eagle-1-10oz-or": "american-eagle-1-10oz-or",
  // Or 1/20oz
  "maple-leaf-1-20oz-or": "maple-leaf-1-20oz-or",
  // Pièces françaises/suisses
  "napoleon-20f-or": "napoleon-20f",
  "souverain-or": "souverain",
  "20-francs-suisse-or": "20-francs-suisse",
  // Argent 1oz
  "maple-leaf-1oz-argent": "maple-leaf-1oz-argent",
  "philharmonique-1oz-argent": "philharmonique-1oz-argent",
  "britannia-1oz-argent": "britannia-1oz-argent",
  "krugerrand-1oz-argent": "krugerrand-1oz-argent",
  "kangourou-1oz-argent": "kangourou-1oz-argent",
  "american-eagle-1oz-argent": "silver-eagle-1oz",
  // Pieces francaises argent
  "50-francs-hercule-argent": "50-francs-hercule-argent",
  "10-francs-hercule-argent": "10-francs-hercule-argent",
  "5-francs-semeuse-argent": "5-francs-semeuse-argent",
  "20-francs-turin-argent": "20-francs-turin-argent",
  "10-francs-turin-argent": "10-francs-turin-argent",
  "5-francs-hercule-ecu-argent": "5-francs-hercule-ecu-argent",
  // Or historiques / semi-numismatiques (Godot)
  "10-francs-napoleon-or": "10-francs-napoleon-or",
  "10-francs-marianne-coq-or": "10-francs-marianne-coq-or",
  "20-francs-marianne-coq-or": "20-francs-marianne-coq-or",
  "union-latine-or": "union-latine-or",
  "louis-dor-20-francs-or": "louis-dor-20-francs-or",
  "demi-souverain-or": "demi-souverain-or",
  "5-dollars-us-or": "5-dollars-us-or",
  "10-dollars-us-or": "10-dollars-us-or",
  "20-dollars-us-or": "20-dollars-us-or",
  "50-pesos-or": "50-pesos-or",
  "4-ducats-or": "4-ducats-or",
  "1-ducat-or": "1-ducat-or",
  "20-reichsmarks-or": "20-reichsmarks-or",
  "20-francs-tunisie-or": "20-francs-tunisie-or",
  "10-florins-or": "10-florins-or",
  // Panda fractions (Godot)
  "panda-3g-or": "panda-3g-or",
  // Zodiac Monnaie de Paris + Austerlitz (Godot)
  "zodiac-taureau-2026-or": "zodiac-taureau-2026-or",
  "zodiac-gemeaux-2026-or": "zodiac-gemeaux-2026-or",
  "zodiac-cancer-2026-or": "zodiac-cancer-2026-or",
  "zodiac-lion-2026-or": "zodiac-lion-2026-or",
  "zodiac-vierge-2026-or": "zodiac-vierge-2026-or",
  "zodiac-balance-2026-or": "zodiac-balance-2026-or",
  "zodiac-sagittaire-2026-or": "zodiac-sagittaire-2026-or",
  // Argent manquantes (Godot)
  "buffalo-1oz-argent": "buffalo-1oz-argent",
  "100-francs-argent-1982-2002": "100-francs-argent-1982-2002",
  "panda-30g-argent": "panda-30g-argent",
  "libertad-1oz-argent": "libertad-1oz-argent",
};

// Récupérer le slug Supabase à partir de l'ID coins-data
export function getPriceSlugFromCoinId(coinId: string): string | null {
  return COIN_ID_TO_PRICE_SLUG[coinId] ?? null;
}

// Récupérer les prix pour une pièce via son ID coins-data.ts
export async function getPricesForCoinById(
  coinId: string,
): Promise<DealerPrice[]> {
  const priceSlug = getPriceSlugFromCoinId(coinId);
  if (!priceSlug) {
    return [];
  }
  return getPricesForCoin(priceSlug);
}
