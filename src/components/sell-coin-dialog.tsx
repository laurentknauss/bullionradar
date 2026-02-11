"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HoldingWithCoin } from "@/types";

interface SellCoinDialogProps {
  holding: HoldingWithCoin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSell: (data: {
    holding_id: string;
    quantity_sold: number;
    sale_price_eur: number;
  }) => void;
}

export function SellCoinDialog({
  holding,
  open,
  onOpenChange,
  onSell,
}: SellCoinDialogProps) {
  const [quantity, setQuantity] = useState("1");
  const [salePrice, setSalePrice] = useState("");

  const qty = parseInt(quantity, 10) || 0;
  const price = parseFloat(salePrice) || 0;
  const hasPurchase = holding.purchase_price_eur !== null;
  const pnlPreview =
    hasPurchase && qty > 0 && price > 0
      ? (price - holding.purchase_price_eur!) * qty
      : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (qty < 1 || qty > holding.quantity || price <= 0) return;

    onSell({
      holding_id: holding.id,
      quantity_sold: qty,
      sale_price_eur: price,
    });

    setQuantity("1");
    setSalePrice("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[rgba(0,0,0,0.15)] bg-[#c9a44e] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[#1a1a1a]">
            Vendre &mdash; {holding.coin.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <p className="text-sm text-[#3d3520]">
            Quantite detenue :{" "}
            <span className="font-bold">{holding.quantity}</span>
          </p>

          {/* Quantity to sell */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#1a1a1a]">
              Quantite a vendre
            </Label>
            <Input
              type="number"
              min="1"
              max={holding.quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,0.06)] text-[#1a1a1a]"
            />
          </div>

          {/* Sale price per unit */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#1a1a1a]">
              Prix de vente unitaire (EUR)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="ex: 2200.00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,0.06)] text-[#1a1a1a] placeholder:text-[#3d3520]/60"
            />
          </div>

          {/* P&L preview */}
          {pnlPreview !== null && (
            <div className="rounded-lg border border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.08)] p-3">
              <p className="text-sm text-[#3d3520]">P&amp;L prevu</p>
              <p
                className={`mt-1 text-lg font-black ${
                  pnlPreview >= 0 ? "text-[#2d5016]" : "text-[#8b1a1a]"
                }`}
              >
                {pnlPreview >= 0 ? "+" : ""}
                {pnlPreview.toLocaleString("fr-FR", {
                  maximumFractionDigits: 2,
                })}{" "}
                &euro;
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={qty < 1 || qty > holding.quantity || price <= 0}
            className="w-full rounded-[4px] bg-[#1a1a1a] px-5 py-3 text-sm font-bold tracking-[1px] text-[#FFD700] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
          >
            Confirmer la vente
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
