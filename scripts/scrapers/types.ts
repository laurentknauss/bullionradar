/**
 * Shared types for dealer price scrapers
 */

export interface DealerPrice {
  coin_slug: string;
  coin_name: string;
  dealer: string;
  price_cents: number;
  price_display: string;
  currency: "EUR" | "USD" | "CHF";
  in_stock: boolean;
  product_url: string;
  scraped_at: string;
}

export interface CoinConfig {
  slug: string;
  name: string;
  url: string;
}

export interface CoinMapping {
  slug: string;
  name: string;
  /** Exact name as displayed on the dealer's website */
  piecesOrName: string;
}

/**
 * Parse a French price string like "4 150,50 €" or "4 150.50 €" to cents (415050)
 * Handles:
 * - Non-breaking spaces (\u00A0)
 * - Period as thousands separator OR decimal separator
 * - Comma as decimal separator
 * - Duplicated text (extracts first valid price pattern)
 */
export function parseFrenchPrice(priceText: string): number {
  // Extract first valid price pattern (handles duplicated text from DOM)
  // Matches: "4 150.50" or "4 150,50" or "4150.50" or "770.00"
  const priceMatch = priceText.match(/(\d[\d\s]*[.,]\d{2})/);
  if (!priceMatch?.[1]) {
    throw new Error(`Invalid price format: "${priceText}"`);
  }

  const extracted = priceMatch[1];

  // Clean and normalize
  const cleaned = extracted
    .replace(/\s/g, "") // remove spaces
    .replace(/\u00A0/g, ""); // remove non-breaking spaces

  // Determine decimal separator (last . or , before 2 digits at end)
  // "4150.50" -> 4150.50, "4150,50" -> 4150.50
  const normalized = cleaned.replace(",", ".");

  const value = parseFloat(normalized);
  if (Number.isNaN(value)) {
    throw new Error(`Invalid price: "${priceText}" -> "${normalized}"`);
  }

  return Math.round(value * 100);
}

/**
 * Sleep utility for rate limiting
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
