import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGoldCoins, getSilverCoins } from "@/lib/coins-data";
import { getPricesForCoinById, type DealerPrice } from "@/lib/supabase";
import type { Coin } from "@/types";

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
  "britannia-1-10oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.png",
  "kangourou-1-2oz-or": "/coins-v2/gold/kangourou-1-2oz-or-avers.png",
  "kangourou-1-4oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.png",
  "kangourou-1-10oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.png",
  "maple-leaf-1-2oz-or": "/coins-v2/gold/maple-leaf-1-2oz-or-avers.png",
  "maple-leaf-1-4oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "maple-leaf-1-10oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "maple-leaf-1-20oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.png",
  "philharmonique-1-2oz-or": "/coins-v2/gold/philharmonique-1-2oz-or-avers.png",
  "philharmonique-1-4oz-or": "/coins-v2/gold/philharmonique-1-4oz-or-avers.png",
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
  "libertad-1-20oz-argent": "/coins-v2/silver/libertad-1-20oz-argent-avers.png",
  "libertad-1-10oz-argent": "/coins-v2/silver/libertad-1-10oz-argent-avers.png",
  "libertad-1-4oz-argent": "/coins-v2/silver/libertad-1-4oz-argent-avers.png",
  "libertad-1-2oz-argent": "/coins-v2/silver/libertad-1-2oz-argent-avers.png",
  "libertad-1oz-argent": "/coins-v2/silver/libertad-1oz-argent-avers-v2.png",
  "libertad-2oz-argent": "/coins-v2/silver/libertad-2oz-argent-avers.png",
  "libertad-5oz-argent": "/coins-v2/silver/libertad-5oz-argent-avers.png",
  "libertad-1kg-argent": "/coins-v2/silver/libertad-1kg-argent-avers.png",
  // Pieces francaises argent
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

function findCoinBySlug(coins: Coin[], slug: string): Coin | undefined {
  return coins.find((coin) => slugify(coin.name) === slug);
}

function parseVsSlug(
  slug: string,
): { coin1Slug: string; coin2Slug: string } | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  return { coin1Slug: parts[0]!, coin2Slug: parts[1]! };
}

interface ComparisonRowProps {
  label: string;
  value1: string | number | null | undefined;
  value2: string | number | null | undefined;
  highlight?: "higher" | "lower" | "none";
}

function ComparisonRow({
  label,
  value1,
  value2,
  highlight = "none",
}: ComparisonRowProps) {
  const v1 = value1 ?? "-";
  const v2 = value2 ?? "-";

  const getHighlightClass = (isFirst: boolean) => {
    if (highlight === "none") return "";
    const num1 =
      typeof value1 === "number" ? value1 : parseFloat(String(value1));
    const num2 =
      typeof value2 === "number" ? value2 : parseFloat(String(value2));
    if (isNaN(num1) || isNaN(num2)) return "";

    if (highlight === "higher") {
      if (isFirst && num1 > num2) return "text-green-400 font-bold";
      if (!isFirst && num2 > num1) return "text-green-400 font-bold";
    }
    if (highlight === "lower") {
      if (isFirst && num1 < num2) return "text-green-400 font-bold";
      if (!isFirst && num2 < num1) return "text-green-400 font-bold";
    }
    return "";
  };

  return (
    <div className="grid grid-cols-3 border-b border-neutral-800 py-3">
      <div className={`text-center ${getHighlightClass(true)}`}>{v1}</div>
      <div className="text-center text-sm text-neutral-500">{label}</div>
      <div className={`text-center ${getHighlightClass(false)}`}>{v2}</div>
    </div>
  );
}

function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

interface DealerLinkProps {
  dealer: DealerPrice;
  isBest: boolean;
}

function DealerLink({ dealer, isBest }: DealerLinkProps) {
  return (
    <a
      href={dealer.product_url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:scale-[1.02] ${
        isBest
          ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-yellow-500/10"
          : "bg-neutral-800/50 hover:bg-neutral-800"
      }`}
    >
      <span
        className={isBest ? "font-medium text-amber-100" : "text-neutral-300"}
      >
        {dealer.dealer}
      </span>
      <span
        className={`font-bold ${isBest ? "text-amber-400" : "text-neutral-200"}`}
      >
        {formatPrice(dealer.price_cents)}
      </span>
    </a>
  );
}

interface CoinPricesSectionProps {
  coinName: string;
  prices: DealerPrice[];
}

function CoinPricesSection({ coinName, prices }: CoinPricesSectionProps) {
  if (prices.length === 0) return null;

  const sortedPrices = [...prices].sort(
    (a, b) => a.price_cents - b.price_cents,
  );
  const bestPrice = sortedPrices[0]?.price_cents;

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
      <h4 className="mb-3 text-center text-sm font-semibold text-amber-400">
        Où acheter {coinName.replace(/ Or$| Argent$/, "")} ?
      </h4>
      <div className="space-y-2">
        {sortedPrices.map((dealer) => (
          <DealerLink
            key={dealer.dealer}
            dealer={dealer}
            isBest={dealer.price_cents === bestPrice}
          />
        ))}
      </div>
    </div>
  );
}

function ConclusionSection({ coin1, coin2 }: { coin1: Coin; coin2: Coin }) {
  const conclusions: string[] = [];
  const sameSeries = coin1.name.split(" ")[0] === coin2.name.split(" ")[0];

  // Comparaison de poids
  if (coin1.weight_oz !== coin2.weight_oz) {
    const heavier = coin1.weight_oz > coin2.weight_oz ? coin1 : coin2;
    const lighter = coin1.weight_oz > coin2.weight_oz ? coin2 : coin1;

    if (sameSeries) {
      conclusions.push(
        `La ${heavier.name} (${heavier.weight_oz} oz) contient ${(heavier.weight_oz / lighter.weight_oz).toFixed(1)}x plus de métal que la ${lighter.name} (${lighter.weight_oz} oz).`,
      );
      conclusions.push(
        `Les fractions plus petites comme la ${lighter.name} ont généralement une prime plus élevée par gramme, mais offrent un ticket d'entrée plus accessible.`,
      );
    } else {
      conclusions.push(
        `En termes de poids, la ${heavier.name} (${heavier.weight_oz} oz) contient plus de métal que la ${coin1.weight_oz > coin2.weight_oz ? coin2.name : coin1.name} (${lighter.weight_oz} oz).`,
      );
    }
  }

  // Comparaison de prime
  if (
    coin1.estimated_premium_pct !== undefined &&
    coin2.estimated_premium_pct !== undefined &&
    coin1.estimated_premium_pct !== coin2.estimated_premium_pct
  ) {
    const lowerPremium =
      coin1.estimated_premium_pct < coin2.estimated_premium_pct ? coin1 : coin2;
    const higherPremium =
      coin1.estimated_premium_pct < coin2.estimated_premium_pct ? coin2 : coin1;
    conclusions.push(
      `La ${lowerPremium.name} a une prime estimée plus basse (${lowerPremium.estimated_premium_pct}%) contre ${higherPremium.estimated_premium_pct}% pour la ${higherPremium.name}, ce qui la rend plus intéressante pour l'investissement pur.`,
    );
  }

  // Comparaison de liquidité
  if (
    coin1.liquidity !== undefined &&
    coin2.liquidity !== undefined &&
    coin1.liquidity !== coin2.liquidity
  ) {
    const moreLiquid = coin1.liquidity > coin2.liquidity ? coin1 : coin2;
    const lessLiquid = coin1.liquidity > coin2.liquidity ? coin2 : coin1;
    conclusions.push(
      `La ${moreLiquid.name} est plus liquide (${moreLiquid.liquidity}/5) que la ${lessLiquid.name} (${lessLiquid.liquidity}/5), ce qui facilite la revente.`,
    );
  }

  // Comparaison pureté
  if (coin1.fineness !== coin2.fineness) {
    const purer =
      parseFloat(coin1.fineness) > parseFloat(coin2.fineness) ? coin1 : coin2;
    conclusions.push(
      `La ${purer.name} a une pureté supérieure (${purer.fineness}).`,
    );
  }

  // Comparaison métal différent
  if (coin1.metal !== coin2.metal) {
    const goldCoin = coin1.metal === "gold" ? coin1 : coin2;
    const silverCoin = coin1.metal === "gold" ? coin2 : coin1;
    conclusions.push(
      `La ${goldCoin.name} (or) est une valeur refuge traditionnelle, tandis que la ${silverCoin.name} (argent) offre un ticket d'entrée plus accessible avec un potentiel de hausse plus volatile.`,
    );
  }

  // Recommandation finale
  if (sameSeries && coin1.weight_oz !== coin2.weight_oz) {
    const larger = coin1.weight_oz > coin2.weight_oz ? coin1 : coin2;
    const smaller = coin1.weight_oz > coin2.weight_oz ? coin2 : coin1;
    conclusions.push(
      `📌 Pour l'investissement : privilégiez la ${larger.name} (prime plus faible par gramme). Pour offrir ou débuter : la ${smaller.name} est un bon choix.`,
    );
  } else if (!sameSeries) {
    if (coin1.liquidity !== coin2.liquidity) {
      const recommended =
        (coin1.liquidity ?? 0) > (coin2.liquidity ?? 0) ? coin1 : coin2;
      conclusions.push(
        `📌 Pour un investissement classique, la ${recommended.name} est recommandée pour sa meilleure liquidité.`,
      );
    }
  }

  if (conclusions.length === 0) {
    conclusions.push(
      "Ces deux pièces ont des caractéristiques très similaires. Le choix dépendra principalement du prix et de vos préférences personnelles.",
    );
  }

  return (
    <>
      {conclusions.map((c, i) => (
        <p key={i}>{c}</p>
      ))}
    </>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VsPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);

  if (!parsed) {
    notFound();
  }

  const allCoins = [...getGoldCoins(), ...getSilverCoins()];
  const coin1 = findCoinBySlug(allCoins, parsed.coin1Slug);
  const coin2 = findCoinBySlug(allCoins, parsed.coin2Slug);

  if (!coin1 || !coin2) {
    notFound();
  }

  const image1 = COIN_IMAGES[coin1.id];
  const image2 = COIN_IMAGES[coin2.id];

  // Fetch prices for both coins (in parallel)
  const [prices1, prices2] = await Promise.all([
    getPricesForCoinById(coin1.id),
    getPricesForCoinById(coin2.id),
  ]);

  const hasPrices = prices1.length > 0 || prices2.length > 0;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <nav className="border-b border-neutral-800 p-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-amber-400 hover:text-amber-300"
          >
            BullionRadar
          </Link>
          <Link
            href="/"
            className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
          >
            ← Retour
          </Link>
        </div>
      </nav>

      {/* Title */}
      <div className="mx-auto max-w-5xl px-4 py-8 text-center">
        <h1 className="text-3xl font-black md:text-4xl">
          <span className="text-amber-400">{coin1.name}</span>
          <span className="mx-4 text-neutral-500">vs</span>
          <span className="text-amber-400">{coin2.name}</span>
        </h1>
        <p className="mt-2 text-neutral-500">
          Comparatif detaille des caracteristiques
        </p>
      </div>

      {/* Coin images */}
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-8 px-4 py-8">
        <div className="text-center">
          <div className="relative mx-auto h-32 w-32 md:h-40 md:w-40">
            {image1 ? (
              <Image
                src={image1}
                alt={coin1.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-5xl">
                {coin1.metal === "gold" ? "🥇" : "🥈"}
              </div>
            )}
          </div>
          <p className="mt-3 font-semibold text-amber-400">{coin1.name}</p>
          <p className="text-sm text-neutral-500">{coin1.country}</p>
        </div>

        <div className="text-4xl text-neutral-600">⚔️</div>

        <div className="text-center">
          <div className="relative mx-auto h-32 w-32 md:h-40 md:w-40">
            {image2 ? (
              <Image
                src={image2}
                alt={coin2.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-5xl">
                {coin2.metal === "gold" ? "🥇" : "🥈"}
              </div>
            )}
          </div>
          <p className="mt-3 font-semibold text-amber-400">{coin2.name}</p>
          <p className="text-sm text-neutral-500">{coin2.country}</p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-6 text-center text-xl font-bold text-white">
            Caracteristiques
          </h2>

          <ComparisonRow
            label="Metal"
            value1={coin1.metal === "gold" ? "Or" : "Argent"}
            value2={coin2.metal === "gold" ? "Or" : "Argent"}
          />
          <ComparisonRow
            label="Poids (oz)"
            value1={coin1.weight_oz}
            value2={coin2.weight_oz}
          />
          <ComparisonRow
            label="Poids (g)"
            value1={coin1.weight_g?.toFixed(2)}
            value2={coin2.weight_g?.toFixed(2)}
          />
          <ComparisonRow
            label="Purete"
            value1={coin1.fineness}
            value2={coin2.fineness}
            highlight="higher"
          />
          <ComparisonRow
            label="Diametre (mm)"
            value1={coin1.diameter_mm}
            value2={coin2.diameter_mm}
          />
          <ComparisonRow
            label="Epaisseur (mm)"
            value1={coin1.thickness_mm}
            value2={coin2.thickness_mm}
          />
          <ComparisonRow
            label="Pays"
            value1={coin1.country}
            value2={coin2.country}
          />
          <ComparisonRow
            label="Premiere annee"
            value1={coin1.first_year}
            value2={coin2.first_year}
          />
          <ComparisonRow
            label="Valeur faciale"
            value1={coin1.face_value}
            value2={coin2.face_value}
          />
          <ComparisonRow
            label="Liquidite (1-5)"
            value1={coin1.liquidity}
            value2={coin2.liquidity}
            highlight="higher"
          />
          <ComparisonRow
            label="Prime estimee (%)"
            value1={coin1.estimated_premium_pct}
            value2={coin2.estimated_premium_pct}
            highlight="lower"
          />
          <ComparisonRow
            label="TVA France (%)"
            value1={coin1.vat_fr_pct}
            value2={coin2.vat_fr_pct}
            highlight="lower"
          />

          {/* Conclusion dynamique */}
          <div className="mt-8 border-t border-neutral-700 pt-8">
            <h3 className="mb-4 text-center text-lg font-bold text-white">
              🎯 Conclusion
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
              <ConclusionSection coin1={coin1} coin2={coin2} />
            </div>
          </div>

          {/* Highlights - seulement si pièces différentes */}
          {coin1.name.split(" ")[0] !== coin2.name.split(" ")[0] && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-amber-400">
                  Points forts {coin1.name.split(" ")[0]}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {coin1.highlights?.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-amber-400">
                  Points forts {coin2.name.split(" ")[0]}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {coin2.highlights?.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Prices section - only shown if at least one coin has prices */}
          {hasPrices && (
            <div className="mt-8 border-t border-neutral-700 pt-8">
              <h3 className="mb-6 text-center text-lg font-bold text-white">
                💰 Meilleurs prix dealers
              </h3>
              <div
                className={`grid gap-6 ${
                  prices1.length > 0 && prices2.length > 0
                    ? "md:grid-cols-2"
                    : "mx-auto max-w-sm"
                }`}
              >
                <CoinPricesSection coinName={coin1.name} prices={prices1} />
                <CoinPricesSection coinName={coin2.name} prices={prices2} />
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-neutral-500">
                  <span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-500" />
                  Meilleur prix — Derniere mise a jour :{" "}
                  {new Date(
                    [...prices1, ...prices2].sort(
                      (a, b) =>
                        new Date(b.scraped_at).getTime() -
                        new Date(a.scraped_at).getTime(),
                    )[0]?.scraped_at ?? "",
                  ).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-2 text-xs text-neutral-600">
                  Prix indicatifs pouvant varier de quelques euros par rapport
                  aux sites compares
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-bold text-black transition-all hover:bg-amber-400"
          >
            ← Comparer d&apos;autres pieces
          </Link>
        </div>
      </div>
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);

  if (!parsed) {
    return { title: "Comparatif non trouve" };
  }

  const allCoins = [...getGoldCoins(), ...getSilverCoins()];
  const coin1 = findCoinBySlug(allCoins, parsed.coin1Slug);
  const coin2 = findCoinBySlug(allCoins, parsed.coin2Slug);

  if (!coin1 || !coin2) {
    return { title: "Comparatif non trouve" };
  }

  return {
    title: `${coin1.name} vs ${coin2.name} - Comparatif | BullionRadar`,
    description: `Comparez ${coin1.name} et ${coin2.name} : poids, purete, prime, liquidite. Quel est le meilleur choix pour investir ?`,
  };
}
