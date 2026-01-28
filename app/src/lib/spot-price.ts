import type { SpotPrices } from "@/types";

const METALS_DEV_API_KEY = process.env.METALS_DEV_API_KEY ?? "";
const METALS_DEV_BASE_URL = "https://api.metals.dev/v1";

interface MetalsDevResponse {
  metals: {
    gold: number;
    silver: number;
  };
}

export async function fetchSpotPrices(): Promise<SpotPrices> {
  if (!METALS_DEV_API_KEY) {
    // Fallback prix indicatifs si pas de cle API
    return {
      gold_eur_oz: 2700,
      silver_eur_oz: 30,
      updated_at: new Date().toISOString(),
    };
  }

  const res = await fetch(
    `${METALS_DEV_BASE_URL}/latest?api_key=${METALS_DEV_API_KEY}&currency=EUR&unit=toz`,
    { next: { revalidate: 300 } }, // cache 5 min
  );

  if (!res.ok) {
    throw new Error(`metals.dev API error: ${res.status}`);
  }

  const data: MetalsDevResponse = await res.json();

  return {
    gold_eur_oz: data.metals.gold,
    silver_eur_oz: data.metals.silver,
    updated_at: new Date().toISOString(),
  };
}

export function estimateCoinValue(
  spotPricePerOz: number,
  weightOz: number,
  purity: number,
  premiumPct: number,
): number {
  const metalValue = spotPricePerOz * weightOz * purity;
  return metalValue * (1 + premiumPct / 100);
}
