"use client";

import type { HoldingWithCoin } from "@/types";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface PortfolioSummaryProps {
  holdings: HoldingWithCoin[];
  realizedPnl: number;
}

export function PortfolioSummary({
  holdings,
  realizedPnl,
}: PortfolioSummaryProps) {
  let totalCost = 0;
  let goldCost = 0;
  let silverCost = 0;
  let totalCoins = 0;

  for (const h of holdings) {
    const lineCost =
      h.purchase_price_eur !== null ? h.purchase_price_eur * h.quantity : 0;

    totalCost += lineCost;
    totalCoins += h.quantity;

    if (h.coin.metal === "gold") {
      goldCost += lineCost;
    } else {
      silverCost += lineCost;
    }
  }

  const goldPct = totalCost > 0 ? (goldCost / totalCost) * 100 : 0;
  const silverPct = totalCost > 0 ? (silverCost / totalCost) * 100 : 0;

  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

  return (
    <BentoGrid>
      {/* Total investi — hero card */}
      <BentoGridItem className="flex flex-col justify-center">
        <p className="text-sm text-[#3d3520]">Total investi</p>
        <p className="mt-2 text-4xl font-black text-[#1a1a1a]">
          {fmt(totalCost)} &euro;
        </p>
        <p className="mt-2 text-sm text-[#3d3520]">
          {totalCoins} piece{totalCoins > 1 ? "s" : ""}
        </p>
      </BentoGridItem>

      {/* Repartition */}
      <BentoGridItem>
        <p className="text-sm text-[#3d3520]">Repartition</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded border border-[#8B6914] bg-[rgba(139,105,20,0.15)] px-2 py-0.5 text-xs font-bold text-[#8B6914]">
            Or {fmt(goldPct)}%
          </span>
          <span className="rounded border border-[#5A5A5A] bg-[rgba(90,90,90,0.15)] px-2 py-0.5 text-xs font-bold text-[#5A5A5A]">
            Ag {fmt(silverPct)}%
          </span>
        </div>
        {totalCost > 0 && (
          <div className="mt-2 flex h-2 overflow-hidden rounded-sm">
            <div className="bg-[#D4AF37]" style={{ width: `${goldPct}%` }} />
            <div className="bg-[#787878]" style={{ width: `${silverPct}%` }} />
          </div>
        )}
      </BentoGridItem>

      {/* P&L realise */}
      <BentoGridItem>
        <p className="text-sm text-[#3d3520]">P&amp;L realise</p>
        {realizedPnl !== 0 ? (
          <p
            className={`mt-1 text-2xl font-black ${realizedPnl >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"}`}
          >
            {realizedPnl >= 0 ? "+" : ""}
            {fmt(realizedPnl)} &euro;
          </p>
        ) : (
          <p className="mt-2 text-sm text-[#3d3520]">Aucune vente</p>
        )}
      </BentoGridItem>
    </BentoGrid>
  );
}
