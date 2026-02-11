"use client";

import { useState } from "react";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { PortfolioTable } from "@/components/portfolio-table";
import { AddCoinDialog } from "@/components/add-coin-dialog";
import { SalesHistory } from "@/components/sales-history";
import { PrivacyBanner } from "@/components/privacy-banner";
import { getCoinById } from "@/lib/coins-data";
import type { HoldingWithCoin, Sale } from "@/types";

export default function DashboardPage() {
  const [holdings, setHoldings] = useState<HoldingWithCoin[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  function handleAddCoin(data: {
    coin_id: string;
    quantity: number;
    purchase_price_eur: number | null;
  }) {
    const coin = getCoinById(data.coin_id);
    if (!coin) return;

    const newHolding: HoldingWithCoin = {
      id: crypto.randomUUID(),
      portfolio_id: "local",
      coin_id: data.coin_id,
      quantity: data.quantity,
      purchase_price_eur: data.purchase_price_eur,
      purchase_date: null,
      created_at: new Date().toISOString(),
      coin,
    };

    setHoldings((prev) => [...prev, newHolding]);
  }

  function handleRemove(holdingId: string) {
    setHoldings((prev) => prev.filter((h) => h.id !== holdingId));
  }

  function handleSell(data: {
    holding_id: string;
    quantity_sold: number;
    sale_price_eur: number;
  }) {
    const holding = holdings.find((h) => h.id === data.holding_id);
    if (!holding) return;

    const purchasePrice = holding.purchase_price_eur;
    const realizedPnl =
      purchasePrice !== null
        ? (data.sale_price_eur - purchasePrice) * data.quantity_sold
        : null;

    const sale: Sale = {
      id: crypto.randomUUID(),
      holding_id: data.holding_id,
      coin_id: holding.coin_id,
      coin_name: holding.coin.name,
      metal: holding.coin.metal,
      quantity_sold: data.quantity_sold,
      sale_price_eur: data.sale_price_eur,
      purchase_price_eur: purchasePrice,
      realized_pnl: realizedPnl,
      sold_at: new Date().toISOString(),
    };

    setSales((prev) => [sale, ...prev]);

    setHoldings((prev) =>
      prev
        .map((h) => {
          if (h.id !== data.holding_id) return h;
          return { ...h, quantity: h.quantity - data.quantity_sold };
        })
        .filter((h) => h.quantity > 0),
    );
  }

  const totalRealizedPnl = sales.reduce(
    (sum, s) => sum + (s.realized_pnl ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
      <PrivacyBanner />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1a1a1a]">Mon Portefeuille</h1>
        <AddCoinDialog onAdd={handleAddCoin} />
      </div>

      <PortfolioSummary holdings={holdings} realizedPnl={totalRealizedPnl} />

      <PortfolioTable
        holdings={holdings}
        onRemove={handleRemove}
        onSell={handleSell}
      />

      <SalesHistory sales={sales} />
    </div>
  );
}
