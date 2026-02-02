"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

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

// Static data - will be replaced by API/Supabase later
const PRICE_DATA: CoinPrice[] = [
  {
    slug: "krugerrand-1oz",
    name: "Krugerrand 1 oz",
    icon: "🥇",
    dealers: [
      {
        dealer: "Godot & Fils",
        price: 4175,
        url: "https://www.achat-or-et-argent.fr/or/krugerrand/12",
      },
      {
        dealer: "Pieces-Or.com",
        price: 4173,
        url: "https://www.pieces-or.com/achat-or-argent/5-Krugerrand.html",
      },
    ],
  },
  {
    slug: "napoleon-20f",
    name: "Napoleon 20 Francs",
    icon: "🏛️",
    dealers: [
      {
        dealer: "Godot & Fils",
        price: 779,
        url: "https://www.achat-or-et-argent.fr/or/20-francs-napoleon/6",
      },
      {
        dealer: "Pieces-Or.com",
        price: 816,
        url: "https://www.pieces-or.com/achat-or-argent/1-Napoleon-20-Francs.html",
      },
    ],
  },
  {
    slug: "souverain",
    name: "Souverain",
    icon: "👑",
    dealers: [
      {
        dealer: "Godot & Fils",
        price: 983,
        url: "https://www.achat-or-et-argent.fr/or/souverain/14",
      },
      {
        dealer: "Pieces-Or.com",
        price: 982,
        url: "https://www.pieces-or.com/achat-or-argent/3-Souverain.html",
      },
    ],
  },
];

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
  const spread = getSpread(coin.dealers);

  return (
    <li className="min-h-[16rem] list-none">
      <div className="relative h-full rounded-2xl border border-neutral-800 p-2 md:rounded-3xl md:p-3 bg-neutral-950">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6 bg-gradient-to-br from-neutral-900 to-neutral-950">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{coin.icon}</span>
              <h3 className="font-semibold text-xl text-white">{coin.name}</h3>
            </div>
            <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
              Ecart {spread}%
            </span>
          </div>

          {/* Dealers */}
          <div className="flex-1 space-y-3">
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
                    className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.02] ${
                      isBest
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30"
                        : "bg-neutral-800/50 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          isBest
                            ? "bg-amber-500 text-black"
                            : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={
                          isBest
                            ? "text-amber-100 font-medium"
                            : "text-neutral-300"
                        }
                      >
                        {dealer.dealer}
                      </span>
                    </div>
                    <span
                      className={`font-bold text-lg ${
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
  return (
    <section className="w-full bg-neutral-950 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Comparateur de prix{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
              Or
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto tracking-tight">
            Prix d&apos;achat chez les principaux dealers francais — Mis a jour
            quotidiennement
          </p>
        </div>

        {/* Cards Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICE_DATA.map((coin) => (
            <CoinCard key={coin.slug} coin={coin} />
          ))}
        </ul>

        {/* Footer */}
        <p className="text-center text-neutral-500 text-sm mt-8">
          <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2" />
          Meilleur prix — Derniere mise a jour : 2 fevrier 2026
        </p>
      </div>
    </section>
  );
}
