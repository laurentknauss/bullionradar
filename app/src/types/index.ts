export type Metal = "gold" | "silver";

export interface Coin {
  id: string;
  name: string;
  metal: Metal;
  weight_oz: number;
  purity: number;
  country: string;
  estimated_premium_pct: number;
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

export interface SpotPrices {
  gold_eur_oz: number;
  silver_eur_oz: number;
  updated_at: string;
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
