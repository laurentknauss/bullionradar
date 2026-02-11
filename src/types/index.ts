export type Metal = "gold" | "silver";

export interface SpotPrices {
  gold_eur_oz: number;
  silver_eur_oz: number;
  updated_at: string;
}
export type DesignType = "fixed" | "annual" | "occasional";
export type Liquidity = 1 | 2 | 3 | 4 | 5;

export interface DesignChange {
  year: number;
  description: string;
}

export interface Coin {
  id: string;
  name: string;
  metal: Metal;
  weight_oz: number;
  weight_g: number;
  purity: number;
  fineness: string; // "999.9", "916.7", "900", etc.
  country: string;
  diameter_mm: number;
  thickness_mm: number;
  first_year: number;
  design_type: DesignType;
  design_changes?: DesignChange[];
  liquidity: Liquidity;
  vat_fr_pct: number;
  estimated_premium_pct: number;
  image_url?: string;
  face_value?: string | null; // "5 CAD", "1 USD", null pour Libertad
  highlights?: string[]; // Particularités uniques de la pièce
}

export interface Portfolio {
  id: string;
  clerk_user_id: string;
  name: string;
  created_at: string;
}

export interface Holding {
  id: string;
  portfolio_id: string;
  coin_id: string;
  quantity: number;
  purchase_price_eur: number | null;
  purchase_date: string | null;
  created_at: string;
}

export interface HoldingWithCoin extends Holding {
  coin: Coin;
}

export interface Sale {
  id: string;
  holding_id: string;
  coin_id: string;
  coin_name: string;
  metal: Metal;
  quantity_sold: number;
  sale_price_eur: number;
  purchase_price_eur: number | null;
  realized_pnl: number | null;
  sold_at: string;
}

export interface PortfolioSummary {
  total_value_eur: number;
  total_cost_eur: number;
  pnl_eur: number;
  pnl_pct: number;
  gold_value_eur: number;
  silver_value_eur: number;
  gold_pct: number;
  silver_pct: number;
  total_coins: number;
}
