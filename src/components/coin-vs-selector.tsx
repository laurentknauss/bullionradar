"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSilverCoins, getGoldCoins } from "@/lib/coins-data";
import type { Coin } from "@/types";

type MetalFilter = "all" | "gold" | "silver";
type SelectionMode = "single" | "compare";
type VatFilter = "all" | "0" | "20";

// Images disponibles (WebP)
const COIN_IMAGES: Record<string, string> = {
  "krugerrand-1oz-or": "/coins-v2/gold/krugerrand-1oz-or-avers.webp",
  "american-buffalo-1oz-or":
    "/coins-v2/gold/american-buffalo-1oz-or-avers.webp",
  "american-eagle-1oz-or": "/coins-v2/gold/american-eagle-1oz-or-avers.webp",
  "britannia-1oz-or": "/coins-v2/gold/britannia-1oz-or-avers.webp",
  "kangourou-1oz-or": "/coins-v2/gold/kangourou-1oz-or-avers.webp",
  "maple-leaf-1oz-or": "/coins-v2/gold/maple-leaf-1oz-or-avers.webp",
  "philharmonique-1oz-or": "/coins-v2/gold/philharmonique-1oz-or-avers.webp",
  "panda-30g-or": "/coins-v2/gold/panda-30g-or-avers.webp",
  "panda-15g-or": "/coins-v2/gold/panda-15g-or-avers.webp",
  "panda-8g-or": "/coins-v2/gold/panda-8g-or-avers.webp",
  "napoleon-20f-or": "/coins-v2/gold/napoleon-20f-or-avers.webp",
  "20-francs-suisse-or": "/coins-v2/gold/20-francs-suisse-or-avers.webp",
  "souverain-or": "/coins-v2/gold/souverain-or-avers.webp",
  // Fractions
  "britannia-1-2oz-or": "/coins-v2/gold/britannia-1-2oz-or-avers.webp",
  "britannia-1-4oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.webp",
  "kangourou-1-2oz-or": "/coins-v2/gold/kangourou-1-2oz-or-avers.webp",
  "kangourou-1-4oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.webp",
  "maple-leaf-1-2oz-or": "/coins-v2/gold/maple-leaf-1-2oz-or-avers.webp",
  "maple-leaf-1-4oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "philharmonique-1-2oz-or":
    "/coins-v2/gold/philharmonique-1-2oz-or-avers.webp",
  "philharmonique-1-4oz-or":
    "/coins-v2/gold/philharmonique-1-4oz-or-avers.webp",
  // 1/10oz et 1/20oz (même design que 1/4oz)
  "britannia-1-10oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.webp",
  "kangourou-1-10oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.webp",
  "maple-leaf-1-10oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "maple-leaf-1-20oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "philharmonique-1-10oz-or":
    "/coins-v2/gold/philharmonique-1-4oz-or-avers.webp",
  "britannia-1oz-argent": "/coins-v2/silver/britannia-1oz-argent-avers.webp",
  "maple-leaf-1oz-argent": "/coins-v2/silver/maple-leaf-1oz-argent-avers.webp",
  "philharmonique-1oz-argent":
    "/coins-v2/silver/philharmonique-1oz-argent-avers.webp",
  "kangourou-1oz-argent": "/coins-v2/silver/kangourou-1oz-argent-avers.webp",
  "american-eagle-1oz-argent":
    "/coins-v2/silver/american-eagle-1oz-argent-avers.webp",
  "krugerrand-1oz-argent": "/coins-v2/silver/krugerrand-1oz-argent-avers.webp",
  "kookaburra-1oz-argent": "/coins-v2/silver/kookaburra-1oz-argent-avers.webp",
  "koala-1oz-argent": "/coins-v2/silver/koala-1oz-argent-avers.webp",
  "panda-30g-argent": "/coins-v2/silver/panda-30g-argent-avers.webp",
  "noah-ark-1oz-argent": "/coins-v2/silver/noah-ark-1oz-argent-avers.webp",
  "lunar-1oz-argent": "/coins-v2/silver/lunar-1oz-argent-avers.webp",
  "buffalo-1oz-argent": "/coins-v2/silver/buffalo-1oz-argent-avers.webp",
  "turtle-1oz-argent": "/coins-v2/silver/turtle-1oz-argent-avers.webp",
  // Libertad Or (Mexique)
  "libertad-1oz-or": "/coins-v2/gold/libertad-1oz-or-avers.webp",
  "libertad-1-2oz-or": "/coins-v2/gold/libertad-fractional-or-avers.webp",
  "libertad-1-4oz-or": "/coins-v2/gold/libertad-fractional-or-avers.webp",
  "libertad-1-10oz-or": "/coins-v2/gold/libertad-fractional-or-avers.webp",
  "libertad-1-20oz-or": "/coins-v2/gold/libertad-fractional-or-avers.webp",
  // Libertad Argent (Mexique)
  "libertad-1-20oz-argent":
    "/coins-v2/silver/libertad-1-20oz-argent-avers.webp",
  "libertad-1-10oz-argent":
    "/coins-v2/silver/libertad-1-10oz-argent-avers.webp",
  "libertad-1-4oz-argent": "/coins-v2/silver/libertad-1-4oz-argent-avers.webp",
  "libertad-1-2oz-argent": "/coins-v2/silver/libertad-1-2oz-argent-avers.webp",
  "libertad-1oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers-v2.webp",
  "libertad-2oz-argent": "/coins-v2/silver/libertad-2oz-argent-avers.webp",
  "libertad-5oz-argent": "/coins-v2/silver/libertad-5oz-argent-avers.webp",
  "libertad-1kg-argent": "/coins-v2/silver/libertad-1kg-argent-avers.webp",
  // Pièces françaises argent
  "50-francs-hercule-argent":
    "/coins-v2/silver/50-francs-hercule-argent-avers.webp",
  "10-francs-hercule-argent":
    "/coins-v2/silver/10-francs-hercule-argent-avers.webp",
  "5-francs-semeuse-argent":
    "/coins-v2/silver/5-francs-semeuse-argent-avers.webp",
  "5-francs-hercule-ecu-argent":
    "/coins-v2/silver/5-francs-hercule-ecu-argent-avers.webp",
  "20-francs-turin-argent":
    "/coins-v2/silver/20-francs-turin-argent-avers.webp",
  "10-francs-turin-argent":
    "/coins-v2/silver/10-francs-turin-argent-avers.webp",
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
  const [metalFilter, setMetalFilter] = useState<MetalFilter>("all");
  const [vatFilter, setVatFilter] = useState<VatFilter>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [mode, setMode] = useState<SelectionMode>("compare");
  const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);

  const allCoins = useMemo(() => [...getGoldCoins(), ...getSilverCoins()], []);

  const countries = useMemo(() => {
    const set = new Set(allCoins.map((c) => c.country));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b, "fr"))];
  }, [allCoins]);

  const filteredCoins = useMemo(() => {
    const filtered = allCoins.filter((coin) => {
      if (metalFilter !== "all" && coin.metal !== metalFilter) return false;
      if (vatFilter !== "all" && String(coin.vat_fr_pct) !== vatFilter)
        return false;
      if (countryFilter !== "all" && coin.country !== countryFilter)
        return false;
      return true;
    });
    return filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [allCoins, metalFilter, vatFilter, countryFilter]);

  const handleCoinClick = (coin: Coin) => {
    if (mode === "single") {
      router.push(`/coin/${slugify(coin.name)}`);
      return;
    }
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
    <section className="w-full bg-[#1a1a1a] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Portail des Pièces
          </h2>
          <p className="mx-auto max-w-xl text-neutral-400">
            Choisissez une option : consulter la fiche complète d&apos;une pièce
            ou comparer deux pièces.
          </p>
          <div className="mx-auto mt-6 grid w-full max-w-5xl gap-4 sm:grid-cols-2">
            <button
              onClick={() => {
                setMode("single");
                setSelectedCoins([]);
              }}
              className={cn(
                "w-full rounded-full px-8 py-4 text-base font-semibold transition-colors",
                mode === "single"
                  ? "bg-amber-500 text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
              )}
            >
              Voir la fiche d&apos;une pièce
            </button>
            <button
              onClick={() => {
                setMode("compare");
                setSelectedCoins([]);
              }}
              className={cn(
                "w-full rounded-full px-8 py-4 text-base font-semibold transition-colors",
                mode === "compare"
                  ? "bg-amber-500 text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
              )}
            >
              Comparer 2 pièces
            </button>
          </div>
          <p className="mx-auto mt-10 max-w-xl text-base font-medium text-neutral-400">
            {mode === "single"
              ? "Choisissez 1 pièce pour ouvrir sa fiche complète."
              : "Sélectionnez 2 pièces pour lancer le comparatif détaillé."}
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
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700",
              )}
            >
              {metal === "gold" ? "Or" : metal === "silver" ? "Argent" : "Tous"}
            </button>
          ))}
        </div>

        {/* Filtres secondaires : TVA, Pays, Budget */}
        <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
          {/* TVA */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">TVA</span>
            {(["all", "0", "20"] as VatFilter[]).map((v) => (
              <button
                key={v}
                onClick={() => setVatFilter(v)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                  vatFilter === v
                    ? "bg-neutral-200 text-black"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700",
                )}
              >
                {v === "all" ? "Toutes" : `${v}%`}
              </button>
            ))}
          </div>

          {/* Pays */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Pays</span>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300 focus:outline-none"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Tous" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected coins indicator */}
        {mode === "compare" && selectedCoins.length > 0 && (
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
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {filteredCoins.map((coin) => {
            const selected = isSelected(coin);
            const index = selectionIndex(coin);
            const imageSrc = COIN_IMAGES[coin.id];

            return (
              <button
                key={coin.id}
                onClick={() => handleCoinClick(coin)}
                className={cn(
                  "group relative flex flex-col items-center rounded-xl border-2 bg-neutral-900 p-3 transition-colors",
                  selected
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-neutral-800 hover:border-neutral-600",
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
                    <img
                      src={imageSrc}
                      alt={coin.name}
                      className="absolute inset-0 h-full w-full object-contain"
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
                    selected ? "text-amber-400" : "text-neutral-300",
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
                      : "text-neutral-500",
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
      {mode === "compare" && selectedCoins.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="mx-4 flex flex-col items-center gap-6 rounded-xl border border-neutral-700 bg-[#1a1a1a] p-8 sm:p-12">
            <p className="text-sm text-neutral-400">Vous avez sélectionné</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400">
                  {selectedCoins[0]?.name}
                </div>
              </div>
              <span className="text-2xl font-bold text-neutral-500">VS</span>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400">
                  {selectedCoins[1]?.name}
                </div>
              </div>
            </div>
            <button
              onClick={handleCompare}
              className="rounded-full bg-amber-500 px-10 py-4 text-lg font-bold text-black transition-colors hover:bg-amber-400"
            >
              Comparer →
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
