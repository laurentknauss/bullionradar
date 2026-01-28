"use client";

import { useState } from "react";
import type { HoldingWithCoin, SpotPrices } from "@/types";
import { estimateCoinValue } from "@/lib/spot-price";
import { SellCoinDialog } from "@/components/sell-coin-dialog";

interface PortfolioTableProps {
  holdings: HoldingWithCoin[];
  spotPrices: SpotPrices;
  onRemove: (holdingId: string) => void;
  onSell: (data: {
    holding_id: string;
    quantity_sold: number;
    sale_price_eur: number;
  }) => void;
}

export function PortfolioTable({
  holdings,
  spotPrices,
  onRemove,
  onSell,
}: PortfolioTableProps) {
  const [sellHolding, setSellHolding] = useState<HoldingWithCoin | null>(null);
  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

  if (holdings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[rgba(0,0,0,0.2)] py-16 text-center">
        <p className="text-[#3d3520]">Aucune piece dans le portefeuille.</p>
        <p className="mt-1 text-sm text-[#3d3520]">
          Cliquez sur &laquo; Ajouter une piece &raquo; pour commencer.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.12)]">
              <th className="px-4 py-3 text-left font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Piece
              </th>
              <th className="px-4 py-3 text-center font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Metal
              </th>
              <th className="px-4 py-3 text-center font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Pays
              </th>
              <th className="px-4 py-3 text-right font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Qte
              </th>
              <th className="px-4 py-3 text-right font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Prix unit. est.
              </th>
              <th className="px-4 py-3 text-right font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Valeur totale
              </th>
              <th className="px-4 py-3 text-right font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                Prix achat
              </th>
              <th className="px-4 py-3 text-right font-[family-name:var(--font-playfair)] text-xs font-bold uppercase tracking-[2px] text-[#1a1a1a]">
                P&amp;L
              </th>
              <th className="w-24 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => {
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
              const totalValue = unitValue * h.quantity;
              const hasCost = h.purchase_price_eur !== null;
              const totalCost = hasCost
                ? h.purchase_price_eur! * h.quantity
                : null;
              const pnl = totalCost !== null ? totalValue - totalCost : null;

              return (
                <tr
                  key={h.id}
                  className={`border-b border-[rgba(0,0,0,0.08)] transition-colors hover:bg-[rgba(0,0,0,0.06)] ${
                    i % 2 === 1 ? "bg-[rgba(0,0,0,0.03)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[#1a1a1a]">
                    {h.coin.name}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {h.coin.metal === "gold" ? (
                      <span className="inline-block rounded border border-[#8B6914] bg-[rgba(139,105,20,0.15)] px-2 py-0.5 text-xs font-bold text-[#8B6914]">
                        Or
                      </span>
                    ) : (
                      <span className="inline-block rounded border border-[#5A5A5A] bg-[rgba(90,90,90,0.15)] px-2 py-0.5 text-xs font-bold text-[#5A5A5A]">
                        Ag
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-[#3d3520]">
                    {h.coin.country}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {h.quantity}
                  </td>
                  <td className="px-4 py-3 text-right text-[#3d3520]">
                    {fmt(unitValue)} &euro;
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-[#1a1a1a]">
                    {fmt(totalValue)} &euro;
                  </td>
                  <td className="px-4 py-3 text-right text-[#3d3520]">
                    {hasCost ? `${fmt(totalCost!)} \u20AC` : "\u2014"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {pnl !== null ? (
                      <span
                        className={`text-sm font-bold ${pnl >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"}`}
                      >
                        {pnl >= 0 ? "+" : ""}
                        {fmt(pnl)} &euro;
                      </span>
                    ) : (
                      <span className="text-[#3d3520]">&mdash;</span>
                    )}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSellHolding(h)}
                        className="rounded px-2 py-1 text-xs font-bold text-[#3d3520] transition-colors hover:bg-[rgba(0,0,0,0.1)]"
                      >
                        Vendre
                      </button>
                      <button
                        onClick={() => onRemove(h.id)}
                        className="rounded px-2 py-1 text-[#3d3520] transition-colors hover:bg-[rgba(139,26,26,0.15)] hover:text-[#8b1a1a]"
                      >
                        &times;
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sellHolding && (
        <SellCoinDialog
          holding={sellHolding}
          open={!!sellHolding}
          onOpenChange={(open) => {
            if (!open) setSellHolding(null);
          }}
          onSell={onSell}
        />
      )}
    </>
  );
}
