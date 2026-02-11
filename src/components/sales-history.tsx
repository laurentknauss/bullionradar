"use client";

import type { Sale } from "@/types";

interface SalesHistoryProps {
  sales: Sale[];
}

export function SalesHistory({ sales }: SalesHistoryProps) {
  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

  if (sales.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-black text-[#1a1a1a]">
        Historique des ventes
      </h2>
      <div className="overflow-x-auto rounded-lg border border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.12)]">
              <th className="px-4 py-3 text-left text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Piece
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Metal
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Qte
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Prix vente
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Prix achat
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                P&amp;L realise
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold tracking-[2px] text-[#1a1a1a] uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr
                key={s.id}
                className={`border-b border-[rgba(0,0,0,0.08)] transition-colors hover:bg-[rgba(0,0,0,0.06)] ${
                  i % 2 === 1 ? "bg-[rgba(0,0,0,0.03)]" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-[#1a1a1a]">
                  {s.coin_name}
                </td>
                <td className="px-4 py-3 text-center">
                  {s.metal === "gold" ? (
                    <span className="inline-block rounded border border-[#8B6914] bg-[rgba(139,105,20,0.15)] px-2 py-0.5 text-xs font-bold text-[#8B6914]">
                      Or
                    </span>
                  ) : (
                    <span className="inline-block rounded border border-[#5A5A5A] bg-[rgba(90,90,90,0.15)] px-2 py-0.5 text-xs font-bold text-[#5A5A5A]">
                      Ag
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {s.quantity_sold}
                </td>
                <td className="px-4 py-3 text-right text-[#3d3520]">
                  {fmt(s.sale_price_eur)} &euro;
                </td>
                <td className="px-4 py-3 text-right text-[#3d3520]">
                  {s.purchase_price_eur !== null
                    ? `${fmt(s.purchase_price_eur)} \u20AC`
                    : "\u2014"}
                </td>
                <td className="px-4 py-3 text-right">
                  {s.realized_pnl !== null ? (
                    <span
                      className={`text-sm font-bold ${
                        s.realized_pnl >= 0
                          ? "text-[#2d5016]"
                          : "text-[#8b1a1a]"
                      }`}
                    >
                      {s.realized_pnl >= 0 ? "+" : ""}
                      {fmt(s.realized_pnl)} &euro;
                    </span>
                  ) : (
                    <span className="text-[#3d3520]">&mdash;</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs text-[#3d3520]">
                  {new Date(s.sold_at).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
