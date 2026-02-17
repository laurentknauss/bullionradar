"use client";

import { useEffect, useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  getLatestPrices,
  type DealerPrice as SupabaseDealerPrice,
} from "@/lib/supabase";
import { getDealerDisplayName } from "@/lib/utils";

interface DealerPrice {
  dealer: string;
  price: number;
  url: string;
}

interface CoinPrice {
  slug: string;
  name: string;
  icon: string;
  dealers: DealerPrice[];
}

// Icons par slug de piece
const COIN_ICONS: Record<string, string> = {
  // Or
  "krugerrand-1oz": "🥇",
  "napoleon-20f": "🏛️",
  souverain: "👑",
  "maple-leaf-1oz": "🍁",
  "philharmonique-1oz": "🎻",
  "20-francs-suisse": "🇨🇭",
  // Argent
  "maple-leaf-1oz-argent": "🍁",
  "philharmonique-1oz-argent": "🎻",
  "britannia-1oz-argent": "🇬🇧",
  "krugerrand-1oz-argent": "🦌",
  "kangourou-1oz-argent": "🦘",
  "silver-eagle-1oz": "🦅",
  // Pieces francaises argent
  "50-francs-hercule-argent": "🏛️",
  "10-francs-hercule-argent": "🏛️",
  "5-francs-semeuse-argent": "🌾",
  "20-francs-turin-argent": "🇫🇷",
  "10-francs-turin-argent": "🇫🇷",
  "5-francs-hercule-ecu-argent": "🏛️",
};

// Transforme les donnees Supabase en format CoinPrice[]
function transformPrices(supabasePrices: SupabaseDealerPrice[]): CoinPrice[] {
  const bySlug = new Map<string, CoinPrice>();

  for (const row of supabasePrices) {
    if (!bySlug.has(row.coin_slug)) {
      bySlug.set(row.coin_slug, {
        slug: row.coin_slug,
        name: row.coin_name,
        icon: COIN_ICONS[row.coin_slug] ?? "💰",
        dealers: [],
      });
    }

    const coin = bySlug.get(row.coin_slug)!;
    coin.dealers.push({
      dealer: row.dealer,
      price: row.price_cents / 100, // cents -> euros
      url: row.product_url ?? "#",
    });
  }

  return Array.from(bySlug.values());
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function getSpread(dealers: DealerPrice[]): string {
  const prices = dealers.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const spread = ((max - min) / min) * 100;
  return spread.toFixed(2);
}

function getBestPrice(dealers: DealerPrice[]): number {
  return Math.min(...dealers.map((d) => d.price));
}

interface CoinCardProps {
  coin: CoinPrice;
}

function CoinCard({ coin }: CoinCardProps) {
  const bestPrice = getBestPrice(coin.dealers);

  return (
    <li className="min-h-[18rem] list-none">
      <div className="relative h-full rounded-2xl border border-neutral-800 bg-neutral-950 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{coin.icon}</span>
            <h3 className="text-base leading-tight font-semibold text-white">
              {coin.name}
            </h3>
          </div>

          {/* Dealers */}
          <div className="flex-1 space-y-2">
            {coin.dealers
              .sort((a, b) => a.price - b.price)
              .map((dealer, index) => {
                const isBest = dealer.price === bestPrice;
                return (
                  <a
                    key={dealer.dealer}
                    href={dealer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:scale-[1.02] ${
                      isBest
                        ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-yellow-500/10"
                        : "bg-neutral-800/50 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isBest
                            ? "bg-amber-500 text-black"
                            : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`truncate text-sm ${
                          isBest
                            ? "font-medium text-amber-100"
                            : "text-neutral-300"
                        }`}
                      >
                        {getDealerDisplayName(dealer.dealer)}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 text-sm font-bold ${
                        isBest ? "text-amber-400" : "text-neutral-200"
                      }`}
                    >
                      {formatPrice(dealer.price)}
                    </span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </li>
  );
}

export function PriceComparator() {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const supabasePrices = await getLatestPrices();

        if (supabasePrices.length === 0) {
          setError("Aucun prix disponible");
          return;
        }

        // Trouver la date la plus recente
        const mostRecent = supabasePrices.reduce((latest, p) => {
          const date = new Date(p.scraped_at);
          return date > new Date(latest) ? p.scraped_at : latest;
        }, supabasePrices[0].scraped_at);

        setLastUpdate(
          new Date(mostRecent).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );

        setPrices(transformPrices(supabasePrices));
      } catch (err) {
        setError("Erreur lors du chargement des prix");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return (
    <section className="w-full bg-neutral-950 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Comparateur de pièces{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Or et Argent
            </span>
          </h2>
          <p className="mx-auto max-w-xl tracking-tight text-neutral-400">
            Prix d&apos;achat chez les principaux dealers français — Mis à jour
            quotidiennement
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
            <span className="ml-3 text-neutral-400">
              Chargement des prix...
            </span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && prices.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {prices.map((coin) => (
              <CoinCard key={coin.slug} coin={coin} />
            ))}
          </ul>
        )}

        {/* Footer */}
        {lastUpdate && (
          <div className="mt-8 text-center">
            <p className="text-sm text-white">
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-500" />
              Meilleur prix — Dernière mise à jour : {lastUpdate}
            </p>
            <p className="mt-2 text-xs text-neutral-300">
              Prix pouvant varier de quelques euros selon l&apos;heure de la
              journée
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
