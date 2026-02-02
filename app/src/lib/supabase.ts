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
export async function getLatestPrices(): Promise<DealerPrice[]> {
  const { data, error } = await supabase
    .from("dealer_prices")
    .select("*")
    .order("scraped_at", { ascending: false });

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
  coinSlug: string
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
