"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSilverCoins, getGoldCoins } from "@/lib/coins-data";
import type { Coin } from "@/types";

type MetalFilter = "all" | "gold" | "silver";

// Images disponibles
const COIN_IMAGES: Record<string, string> = {
  "krugerrand-1oz-or": "/coins-v2/gold/krugerrand-1oz-or-avers.png",
  "american-buffalo-1oz-or": "/coins-v2/gold/american-buffalo-1oz-or-avers.png",
  "american-eagle-1oz-or": "/coins-v2/gold/american-eagle-1oz-or-avers.png",
  "britannia-1oz-or": "/coins-v2/gold/britannia-1oz-or-avers.png",
  "kangourou-1oz-or": "/coins-v2/gold/kangourou-1oz-or-avers.png",
  "maple-leaf-1oz-or": "/coins-v2/gold/maple-leaf-1oz-or-avers.png",
  "philharmonique-1oz-or": "/coins-v2/gold/philharmonique-1oz-or-avers.png",
  "panda-30g-or": "/coins-v2/gold/panda-30g-or-avers.png",
  "panda-15g-or": "/coins-v2/gold/panda-15g-or-avers.png",
  "panda-8g-or": "/coins-v2/gold/panda-8g-or-avers.png",
  "napoleon-20f-or": "/coins-v2/gold/napoleon-20f-or-avers.jpg",
  "20-francs-suisse-or": "/coins-v2/gold/20-francs-suisse-or-avers.jpg",
  "souverain-or": "/coins-v2/gold/souverain-or-avers.jpg",
  // Fractions déjà présentes
  "britannia-1-2oz-or": "/coins-v2/gold/britannia-1-2oz-or-avers.png",
  "britannia-1-4oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.png",
  "kangourou-1-2oz-or": "/coins-v2/gold/kangourou-1-2oz-or-avers.png",
  "kangourou-1-4oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.png",
  "maple-leaf-1-2oz-or": "/coins-v2/gold/maple-leaf-1-2oz-or-avers.png",
  "maple-leaf-1-4oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "philharmonique-1-2oz-or": "/coins-v2/gold/philharmonique-1-2oz-or-avers.png",
  "philharmonique-1-4oz-or": "/coins-v2/gold/philharmonique-1-4oz-or-avers.png",
  // 1/10oz et 1/20oz (meme design que 1/4oz)
  "britannia-1-10oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.png",
  "kangourou-1-10oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.png",
  "maple-leaf-1-10oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "maple-leaf-1-20oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "philharmonique-1-10oz-or":
    "/coins-v2/gold/philharmonique-1-4oz-or-avers.png",
  "britannia-1oz-argent": "/coins-v2/silver/britannia-1oz-argent-avers.png",
  "maple-leaf-1oz-argent": "/coins-v2/silver/maple-leaf-1oz-argent-avers.png",
  "philharmonique-1oz-argent":
    "/coins-v2/silver/philharmonique-1oz-argent-avers.png",
  "kangourou-1oz-argent": "/coins-v2/silver/kangourou-1oz-argent-avers.png",
  "american-eagle-1oz-argent":
    "/coins-v2/silver/american-eagle-1oz-argent-avers.png",
  "krugerrand-1oz-argent": "/coins-v2/silver/krugerrand-1oz-argent-avers.png",
  // Libertad Or (Mexique)
  "libertad-1oz-or": "/coins-v2/gold/libertad-1oz-or-avers.png",
  "libertad-1-2oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-4oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-10oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-20oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function CoinVsSelector() {
  const router = useRouter();
  const [metalFilter, setMetalFilter] = useState<MetalFilter>("gold");
  const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);

  const allCoins = useMemo(() => [...getGoldCoins(), ...getSilverCoins()], []);

  const filteredCoins = useMemo(() => {
    // Show all coins (with or without images)
    if (metalFilter === "all") return allCoins;
    return allCoins.filter((coin) => coin.metal === metalFilter);
  }, [allCoins, metalFilter]);

  const handleCoinClick = (coin: Coin) => {
    setSelectedCoins((prev) => {
      // If already selected, remove it
      if (prev.some((c) => c.id === coin.id)) {
        return prev.filter((c) => c.id !== coin.id);
      }
      // If 2 already selected, replace the first one
      if (prev.length >= 2) {
        return [prev[1]!, coin];
      }
      // Add to selection
      return [...prev, coin];
    });
  };

  const handleCompare = () => {
    if (selectedCoins.length !== 2) return;
    const [coin1, coin2] = selectedCoins;
    const slug = `${slugify(coin1!.name)}-vs-${slugify(coin2!.name)}`;
    router.push(`/vs/${slug}`);
  };

  const isSelected = (coin: Coin) =>
    selectedCoins.some((c) => c.id === coin.id);
  const selectionIndex = (coin: Coin) =>
    selectedCoins.findIndex((c) => c.id === coin.id) + 1;

  return (
    <section className="w-full bg-[#1a1a1a] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Comparez deux{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              pieces
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-neutral-400">
            Selectionnez 2 pieces pour comparer leurs caracteristiques
          </p>
        </div>

        {/* Metal filter */}
        <div className="mb-8 flex justify-center gap-2">
          {(["gold", "silver", "all"] as const).map((metal) => (
            <button
              key={metal}
              onClick={() => setMetalFilter(metal)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                metalFilter === metal
                  ? metal === "gold"
                    ? "bg-amber-500 text-black"
                    : metal === "silver"
                      ? "bg-neutral-400 text-black"
                      : "bg-white text-black"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              )}
            >
              {metal === "gold" ? "Or" : metal === "silver" ? "Argent" : "Tous"}
            </button>
          ))}
        </div>

        {/* Selected coins indicator */}
        {selectedCoins.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            {selectedCoins.map((coin, idx) => (
              <div
                key={coin.id}
                className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-amber-400"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium">{coin.name}</span>
                <button
                  onClick={() => handleCoinClick(coin)}
                  className="ml-1 text-amber-400/60 hover:text-amber-400"
                >
                  ✕
                </button>
              </div>
            ))}
            {selectedCoins.length === 1 && (
              <span className="text-sm text-neutral-500">
                Selectionnez une 2e piece
              </span>
            )}
          </div>
        )}

        {/* Coins grid */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {filteredCoins.map((coin) => {
            const selected = isSelected(coin);
            const index = selectionIndex(coin);
            const imageSrc = COIN_IMAGES[coin.id];

            return (
              <button
                key={coin.id}
                onClick={() => handleCoinClick(coin)}
                className={cn(
                  "group relative flex flex-col items-center rounded-xl border-2 bg-neutral-900 p-3 transition-all hover:scale-105",
                  selected
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-neutral-800 hover:border-neutral-600"
                )}
              >
                {/* Selection badge */}
                {selected && (
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black shadow-lg">
                    {index}
                  </div>
                )}

                {/* Coin image */}
                <div className="relative mb-2 h-16 w-16 sm:h-20 sm:w-20">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={coin.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-2xl">
                      {coin.metal === "gold" ? "🥇" : "🥈"}
                    </div>
                  )}
                </div>

                {/* Coin name */}
                <span
                  className={cn(
                    "text-center text-xs leading-tight font-medium",
                    selected ? "text-amber-400" : "text-neutral-300"
                  )}
                >
                  {coin.name.replace(" Or", "").replace(" Argent", "")}
                </span>

                {/* Metal indicator */}
                <span
                  className={cn(
                    "mt-1 text-[10px]",
                    coin.metal === "gold"
                      ? "text-amber-500/60"
                      : "text-neutral-500"
                  )}
                >
                  {coin.metal === "gold" ? "Or" : "Argent"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating compare button popup */}
      {selectedCoins.length === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-50 -translate-x-1/2 duration-300">
          <button
            onClick={handleCompare}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-sm font-bold text-black shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/40"
          >
            <span>Comparer</span>
            <span className="max-w-[140px] truncate font-semibold">
              {selectedCoins[0]?.name}
            </span>
            <span className="text-black/60">vs</span>
            <span className="max-w-[140px] truncate font-semibold">
              {selectedCoins[1]?.name}
            </span>
            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
