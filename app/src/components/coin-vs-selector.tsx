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
  "napoleon-20f-or": "/coins-v2/gold/napoleon-20f-or-avers.png",
  "20-francs-suisse-or": "/coins-v2/gold/20-francs-suisse-or-avers.png",
  "souverain-or": "/coins-v2/gold/souverain-or-avers.png",
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
  "kookaburra-1oz-argent": "/coins-v2/silver/kookaburra-1oz-argent-avers.png",
  "koala-1oz-argent": "/coins-v2/silver/koala-1oz-argent-avers.png",
  "panda-30g-argent": "/coins-v2/silver/panda-30g-argent-avers.png",
  "noah-ark-1oz-argent": "/coins-v2/silver/noah-ark-1oz-argent-avers.png",
  "lunar-1oz-argent": "/coins-v2/silver/lunar-1oz-argent-avers.png",
  "buffalo-1oz-argent": "/coins-v2/silver/buffalo-1oz-argent-avers.png",
  "turtle-1oz-argent": "/coins-v2/silver/turtle-1oz-argent-avers.png",
  // Libertad Or (Mexique)
  "libertad-1oz-or": "/coins-v2/gold/libertad-1oz-or-avers.png",
  "libertad-1-2oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-4oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-10oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  "libertad-1-20oz-or": "/coins-v2/gold/libertad-fractional-or-avers.png",
  // Libertad Argent (Mexique)
  "libertad-1oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-1-2oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-1-4oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-1-10oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-1-20oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-2oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-5oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
  "libertad-1kg-argent": "/coins-v2/silver/libertad-1oz-argent-avers.png",
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
    // Filter by metal and sort alphabetically
    const filtered =
      metalFilter === "all"
        ? allCoins
        : allCoins.filter((coin) => coin.metal === metalFilter);
    return filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
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

      {/* Full screen popup when 2 coins selected */}
      {selectedCoins.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="mx-4 flex flex-col items-center gap-6 rounded-3xl bg-[#1a1a1a] p-8 shadow-2xl sm:p-12">
            <p className="text-lg text-neutral-400">Vous avez sélectionné</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 sm:text-2xl">
                  {selectedCoins[0]?.name}
                </div>
              </div>
              <span className="text-3xl font-black text-neutral-500">VS</span>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 sm:text-2xl">
                  {selectedCoins[1]?.name}
                </div>
              </div>
            </div>
            <button
              onClick={handleCompare}
              className="mt-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-12 py-5 text-xl font-black text-black shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/40"
            >
              COMPARER →
            </button>
            <button
              onClick={() => setSelectedCoins([])}
              className="text-sm text-neutral-500 hover:text-white"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
