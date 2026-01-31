"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Compare } from "@/components/ui/compare";
import { getSilverCoins, getGoldCoins } from "@/lib/coins-data";
import type { Coin } from "@/types";

type MetalFilter = "all" | "gold" | "silver";

// Map of coins that have images available (from coins-v2 folder)
const AVAILABLE_IMAGES: Record<
  string,
  { avers: string; revers?: string } | undefined
> = {
  // Gold 1oz
  "krugerrand-1oz-or": {
    avers: "/coins-v2/gold/krugerrand-1oz-or-avers.jpg",
    revers: "/coins-v2/gold/krugerrand-1oz-or-revers.jpg",
  },
  "american-buffalo-1oz-or": {
    avers: "/coins-v2/gold/american-buffalo-1oz-or-avers.png",
  },
  "american-eagle-1oz-or": {
    avers: "/coins-v2/gold/american-eagle-1oz-or-avers.png",
  },
  "britannia-1oz-or": { avers: "/coins-v2/gold/britannia-1oz-or-avers.png" },
  "kangourou-1oz-or": { avers: "/coins-v2/gold/kangourou-1oz-or-avers.png" },
  "maple-leaf-1oz-or": { avers: "/coins-v2/gold/maple-leaf-1oz-or-avers.png" },
  "philharmonique-1oz-or": {
    avers: "/coins-v2/gold/philharmonique-1oz-or-avers.png",
  },
  "panda-30g-or": { avers: "/coins-v2/gold/panda-30g-or-avers.png" },
  // Gold 1/2oz
  "britannia-1-2oz-or": {
    avers: "/coins-v2/gold/britannia-1-2oz-or-avers.png",
  },
  "kangourou-1-2oz-or": {
    avers: "/coins-v2/gold/kangourou-1-2oz-or-avers.png",
  },
  "maple-leaf-1-2oz-or": {
    avers: "/coins-v2/gold/maple-leaf-1-2oz-or-avers.png",
  },
  "philharmonique-1-2oz-or": {
    avers: "/coins-v2/gold/philharmonique-1-2oz-or-avers.png",
  },
  // Gold 1/4oz
  "britannia-1-4oz-or": {
    avers: "/coins-v2/gold/britannia-1-4oz-or-avers.png",
  },
  "kangourou-1-4oz-or": {
    avers: "/coins-v2/gold/kangourou-1-4oz-or-avers.png",
  },
  "maple-leaf-1-4oz-or": {
    avers: "/coins-v2/gold/maple-leaf-1-4oz-or-avers.jpg",
  },
  "philharmonique-1-4oz-or": {
    avers: "/coins-v2/gold/philharmonique-1-4oz-or-avers.png",
  },
  // Gold Panda fractional
  "panda-15g-or": { avers: "/coins-v2/gold/panda-15g-or-avers.png" },
  "panda-8g-or": { avers: "/coins-v2/gold/panda-8g-or-avers.png" },
  // Gold classics
  "napoleon-20f-or": { avers: "/coins-v2/gold/napoleon-20f-or-avers.jpg" },
  "20-francs-suisse-or": {
    avers: "/coins-v2/gold/20-francs-suisse-or-avers.jpg",
  },
  "souverain-or": { avers: "/coins-v2/gold/souverain-or-avers.jpg" },
  // Silver 1oz (PNG fond transparent)
  "britannia-1oz-argent": {
    avers: "/coins-v2/silver/britannia-1oz-argent-avers.png",
    revers: "/coins-v2/silver/britannia-1oz-argent-revers.png",
  },
  "maple-leaf-1oz-argent": {
    avers: "/coins-v2/silver/maple-leaf-1oz-argent-avers.png",
    revers: "/coins-v2/silver/maple-leaf-1oz-argent-revers.png",
  },
  "philharmonique-1oz-argent": {
    avers: "/coins-v2/silver/philharmonique-1oz-argent-avers.png",
    revers: "/coins-v2/silver/philharmonique-1oz-argent-revers.png",
  },
  "kangourou-1oz-argent": {
    avers: "/coins-v2/silver/kangourou-1oz-argent-avers.png",
    revers: "/coins-v2/silver/kangourou-1oz-argent-revers.png",
  },
  "american-eagle-1oz-argent": {
    avers: "/coins-v2/silver/american-eagle-1oz-argent-avers.png",
  },
  "krugerrand-1oz-argent": {
    avers: "/coins-v2/silver/krugerrand-1oz-argent-avers.png",
    revers: "/coins-v2/silver/krugerrand-1oz-argent-revers.png",
  },
};

export function CoinComparison() {
  const [metalFilter, setMetalFilter] = useState<MetalFilter>("silver");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allCoins = useMemo(() => [...getGoldCoins(), ...getSilverCoins()], []);

  const coinsWithImages = useMemo(() => {
    const filtered =
      metalFilter === "all"
        ? allCoins
        : metalFilter === "gold"
          ? getGoldCoins()
          : getSilverCoins();
    return filtered.filter((coin) => AVAILABLE_IMAGES[coin.id]);
  }, [metalFilter, allCoins]);

  function getCoinImages(coin: Coin) {
    return AVAILABLE_IMAGES[coin.id];
  }

  return (
    <div className="space-y-8">
      {/* Filter buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setMetalFilter("silver");
            setSelectedCoin(null);
          }}
          className={cn(
            "rounded-none px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all",
            metalFilter === "silver"
              ? "bg-[#5A5A5A] text-white shadow-lg"
              : "bg-[rgba(90,90,90,0.15)] text-[#5A5A5A] hover:bg-[rgba(90,90,90,0.25)]",
          )}
        >
          Argent
        </button>
        <button
          onClick={() => {
            setMetalFilter("gold");
            setSelectedCoin(null);
          }}
          className={cn(
            "rounded-none px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all",
            metalFilter === "gold"
              ? "bg-[#8B6914] text-white shadow-lg"
              : "bg-[rgba(139,105,20,0.15)] text-[#8B6914] hover:bg-[rgba(139,105,20,0.25)]",
          )}
        >
          Or
        </button>
      </div>

      {/* Focus Cards Grid */}
      <div className="mx-auto grid max-w-xs grid-cols-1 gap-4">
        {coinsWithImages.map((coin, index) => {
          const images = getCoinImages(coin);
          if (!images) return null;

          return (
            <div
              key={coin.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedCoin(coin)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-xl bg-white transition-all duration-300 ease-out",
                hoveredIndex !== null && hoveredIndex !== index
                  ? "scale-[0.97] opacity-60 blur-[2px]"
                  : "scale-100 opacity-100",
                selectedCoin?.id === coin.id &&
                  "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#BE943C]",
              )}
            >
              {/* Coin image */}
              <div className="relative aspect-square w-full overflow-hidden p-4">
                <img
                  src={images.avers}
                  alt={coin.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  draggable={false}
                />
              </div>
              {/* Overlay with title */}
              <div
                className={cn(
                  "absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 transition-opacity duration-300",
                  hoveredIndex === index ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="w-full">
                  <p className="text-center text-sm font-medium text-white">
                    {coin.name}
                  </p>
                  <p className="mt-1 text-center text-xs text-white/70">
                    {coin.country} • {coin.fineness}
                  </p>
                </div>
              </div>
              {/* Premium badge */}
              <div className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-[#D4AF37]">
                +{coin.estimated_premium_pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected coin Compare view */}
      {selectedCoin && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a]">
              {selectedCoin.name}
            </h2>
            <button
              onClick={() => setSelectedCoin(null)}
              className="rounded-none bg-black/10 px-4 py-2 text-sm font-medium text-[#1a1a1a] hover:bg-black/20"
            >
              Fermer
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Compare component for avers/revers */}
            <div className="flex justify-center">
              {getCoinImages(selectedCoin)?.revers ? (
                <Compare
                  firstImage={getCoinImages(selectedCoin)?.avers || ""}
                  secondImage={getCoinImages(selectedCoin)?.revers || ""}
                  className="h-[400px] w-[400px] rounded-2xl border border-[rgba(0,0,0,0.1)] shadow-xl"
                  slideMode="hover"
                  showHandlebar={true}
                />
              ) : (
                <div className="flex h-[400px] w-[400px] items-center justify-center rounded-2xl border border-[rgba(0,0,0,0.1)] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-xl">
                  <img
                    src={getCoinImages(selectedCoin)?.avers}
                    alt={selectedCoin.name}
                    className="h-[320px] w-[320px] object-contain"
                  />
                </div>
              )}
            </div>

            {/* Coin details */}
            <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1a1a1a]">
                Caractéristiques
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Pays</dt>
                  <dd className="font-medium text-[#1a1a1a]">
                    {selectedCoin.country}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Poids</dt>
                  <dd className="font-medium text-[#1a1a1a]">
                    {selectedCoin.weight_oz} oz ({selectedCoin.weight_g}g)
                  </dd>
                </div>
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Pureté</dt>
                  <dd className="font-mono font-medium text-[#1a1a1a]">
                    {selectedCoin.fineness}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Diamètre</dt>
                  <dd className="font-medium text-[#1a1a1a]">
                    {selectedCoin.diameter_mm} mm
                  </dd>
                </div>
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Première année</dt>
                  <dd className="font-medium text-[#1a1a1a]">
                    {selectedCoin.first_year}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-dashed border-[rgba(0,0,0,0.1)] pb-2">
                  <dt className="text-[#3d3520]">Liquidité</dt>
                  <dd className="font-medium text-[#1a1a1a]">
                    {"★".repeat(selectedCoin.liquidity)}
                    {"☆".repeat(5 - selectedCoin.liquidity)}
                  </dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="font-medium text-[#3d3520]">Prime estimée</dt>
                  <dd className="text-lg font-bold text-[#8B6914]">
                    +{selectedCoin.estimated_premium_pct}%
                  </dd>
                </div>
              </dl>

              {/* Highlights */}
              {selectedCoin.highlights &&
                selectedCoin.highlights.length > 0 && (
                  <div className="mt-6 border-t border-[rgba(0,0,0,0.1)] pt-4">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#3d3520]">
                      Points forts
                    </h4>
                    <ul className="space-y-2">
                      {selectedCoin.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#1a1a1a]"
                        >
                          <span className="mt-1 text-[#D4AF37]">◆</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Instruction text when no coin selected */}
      {!selectedCoin && (
        <p className="text-center text-sm text-[#3d3520]">
          <span className="opacity-70">— ◆ —</span>
          <br />
          Survolez et cliquez sur une pièce pour voir ses détails
        </p>
      )}
    </div>
  );
}
