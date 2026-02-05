"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COINS } from "@/lib/coins-data";
import type { Coin } from "@/types";

interface AddCoinDialogProps {
  onAdd: (data: {
    coin_id: string;
    quantity: number;
    purchase_price_eur: number | null;
  }) => void;
}

export function AddCoinDialog({ onAdd }: AddCoinDialogProps) {
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [metalFilter, setMetalFilter] = useState<"all" | "gold" | "silver">(
    "all"
  );

  const filteredCoins =
    metalFilter === "all"
      ? COINS
      : COINS.filter((c) => c.metal === metalFilter);

  const selectedCoin = COINS.find((c) => c.id === coinId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!coinId || !quantity) return;

    onAdd({
      coin_id: coinId,
      quantity: parseInt(quantity, 10),
      purchase_price_eur: purchasePrice ? parseFloat(purchasePrice) : null,
    });

    setCoinId("");
    setQuantity("1");
    setPurchasePrice("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-block rounded-[4px] border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-2 text-sm font-bold tracking-[0.5px] text-[#FFD700] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          + Ajouter une piece
        </button>
      </DialogTrigger>
      <DialogContent className="border-[rgba(0,0,0,0.15)] bg-[#c9a44e] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[#1a1a1a]">
            Ajouter une piece
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          {/* Metal filter */}
          <div className="flex gap-2">
            {(
              [
                { key: "all", label: "Toutes" },
                { key: "gold", label: "Or" },
                { key: "silver", label: "Argent" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMetalFilter(key)}
                className={`rounded-[4px] border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
                  metalFilter === key
                    ? key === "silver"
                      ? "border-[#5A5A5A] bg-[#5A5A5A] text-white"
                      : key === "gold"
                        ? "border-[#8B6914] bg-[#8B6914] text-[#FFD700]"
                        : "border-[#1a1a1a] bg-[#1a1a1a] text-[#FFD700]"
                    : key === "silver"
                      ? "border-[#787878] bg-transparent text-[#5A5A5A]"
                      : key === "gold"
                        ? "border-[#D4AF37] bg-transparent text-[#8B6914]"
                        : "border-[rgba(0,0,0,0.2)] bg-transparent text-[#3d3520]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Coin select */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#1a1a1a]">Piece</Label>
            <Select value={coinId} onValueChange={setCoinId}>
              <SelectTrigger className="border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,0.06)] text-[#1a1a1a]">
                <SelectValue placeholder="Choisir une piece..." />
              </SelectTrigger>
              <SelectContent className="max-h-64 border-[rgba(0,0,0,0.15)] bg-[#c9a44e]">
                {filteredCoins.map((coin: Coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.name} ({coin.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCoin && (
              <p className="text-xs text-[#3d3520]">
                {selectedCoin.weight_oz} oz &middot;{" "}
                {(selectedCoin.purity * 100).toFixed(1)}% pur &middot; Prime ~
                {selectedCoin.estimated_premium_pct}%
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#1a1a1a]">Quantite</Label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,0.06)] text-[#1a1a1a]"
            />
          </div>

          {/* Purchase price */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#1a1a1a]">
              Prix d&apos;achat unitaire (EUR){" "}
              <span className="font-normal text-[#3d3520]">optionnel</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="ex: 2100.00"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,0.06)] text-[#1a1a1a] placeholder:text-[#3d3520]/60"
            />
          </div>

          <button
            type="submit"
            disabled={!coinId || !quantity}
            className="w-full rounded-[4px] bg-[#1a1a1a] px-5 py-3 text-sm font-bold tracking-[1px] text-[#FFD700] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
          >
            Ajouter au portefeuille
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
