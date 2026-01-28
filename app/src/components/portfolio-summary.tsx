"use client";

import type { HoldingWithCoin, SpotPrices } from "@/types";
import { estimateCoinValue } from "@/lib/spot-price";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface PortfolioSummaryProps {
  holdings: HoldingWithCoin[];
  spotPrices: SpotPrices;
  realizedPnl: number;
}

export function PortfolioSummary({
  holdings,
  spotPrices,
  realizedPnl,
}: PortfolioSummaryProps) {
  let totalValue = 0;
  let totalCost = 0;
  let goldValue = 0;
  let silverValue = 0;
  let totalCoins = 0;

  for (const h of holdings) {
    const spotPrice =
      h.coin.metal === "gold"
        ? spotPrices.gold_eur_oz
        : spotPrices.silver_eur_oz;
    const unitValue = estimateCoinValue(
      spotPrice,
      h.coin.weight_oz,
      h.coin.purity,
      h.coin.estimated_premium_pct,
    );
    const lineValue = unitValue * h.quantity;

    totalValue += lineValue;
    totalCoins += h.quantity;

    if (h.coin.metal === "gold") {
      goldValue += lineValue;
    } else {
      silverValue += lineValue;
    }

    if (h.purchase_price_eur !== null) {
      totalCost += h.purchase_price_eur * h.quantity;
    }
  }

  const pnl = totalCost > 0 ? totalValue - totalCost : 0;
  const pnlPct = totalCost > 0 ? (pnl / totalCost) * 100 : 0;
  const goldPct = totalValue > 0 ? (goldValue / totalValue) * 100 : 0;
  const silverPct = totalValue > 0 ? (silverValue / totalValue) * 100 : 0;

  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

  return (
    <BentoGrid>
      {/* Valeur estimee — hero card, row-span-2 */}
      <BentoGridItem className="flex flex-col justify-center lg:row-span-2">
        <p className="text-sm text-[#3d3520]">Valeur estimee</p>
        <p className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-black text-[#1a1a1a]">
          {fmt(totalValue)} &euro;
        </p>
        <p className="mt-2 text-sm text-[#3d3520]">
          {totalCoins} piece{totalCoins > 1 ? "s" : ""}
        </p>
      </BentoGridItem>

      {/* P&L latent */}
      <BentoGridItem>
        <p className="text-sm text-[#3d3520]">P&amp;L latent</p>
        {totalCost > 0 ? (
          <>
            <p
              className={`mt-1 font-[family-name:var(--font-playfair)] text-2xl font-black ${pnl >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"}`}
            >
              {pnl >= 0 ? "+" : ""}
              {fmt(pnl)} &euro;
            </p>
            <p
              className={`mt-1 text-xs font-medium ${pnl >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"}`}
            >
              {pnl >= 0 ? "+" : ""}
              {fmt(pnlPct)}%
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-[#3d3520]">
            Ajoutez vos prix d&apos;achat
          </p>
        )}
      </BentoGridItem>

      {/* P&L realise */}
      <BentoGridItem>
        <p className="text-sm text-[#3d3520]">P&amp;L realise</p>
        {realizedPnl !== 0 ? (
          <p
            className={`mt-1 font-[family-name:var(--font-playfair)] text-2xl font-black ${realizedPnl >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"}`}
          >
            {realizedPnl >= 0 ? "+" : ""}
            {fmt(realizedPnl)} &euro;
          </p>
        ) : (
          <p className="mt-2 text-sm text-[#3d3520]">Aucune vente</p>
        )}
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
        {totalValue > 0 && (
          <div className="mt-2 flex h-2 overflow-hidden rounded-sm">
            <div className="bg-[#D4AF37]" style={{ width: `${goldPct}%` }} />
            <div className="bg-[#787878]" style={{ width: `${silverPct}%` }} />
          </div>
        )}
      </BentoGridItem>

      {/* Cours spot */}
      <BentoGridItem>
        <p className="text-sm text-[#3d3520]">Cours spot</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <span className="font-bold text-[#8B6914]">Or</span>{" "}
            {fmt(spotPrices.gold_eur_oz)} &euro;/oz
          </p>
          <p className="text-sm">
            <span className="font-bold text-[#5A5A5A]">Ag</span>{" "}
            {fmt(spotPrices.silver_eur_oz)} &euro;/oz
          </p>
        </div>
      </BentoGridItem>
    </BentoGrid>
  );
}
