import { notFound } from "next/navigation";
import Link from "next/link";
import { getGoldCoins, getSilverCoins } from "@/lib/coins-data";
import { getPricesForCoinById, type DealerPrice } from "@/lib/supabase";
import { getDealerDisplayName } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { formatFineness, formatRelativeTime } from "@/lib/format";
import type { Coin } from "@/types";

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
  "britannia-1-10oz-or": "/coins-v2/gold/britannia-1-4oz-or-avers.webp",
  "kangourou-1-2oz-or": "/coins-v2/gold/kangourou-1-2oz-or-avers.webp",
  "kangourou-1-4oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.webp",
  "kangourou-1-10oz-or": "/coins-v2/gold/kangourou-1-4oz-or-avers.webp",
  "maple-leaf-1-2oz-or": "/coins-v2/gold/maple-leaf-1-2oz-or-avers.webp",
  "maple-leaf-1-4oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "maple-leaf-1-10oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "maple-leaf-1-20oz-or": "/coins-v2/gold/maple-leaf-1-4oz-or-avers.webp",
  "philharmonique-1-2oz-or":
    "/coins-v2/gold/philharmonique-1-2oz-or-avers.webp",
  "philharmonique-1-4oz-or":
    "/coins-v2/gold/philharmonique-1-4oz-or-avers.webp",
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

function findCoinBySlug(coins: Coin[], slug: string): Coin | undefined {
  return coins.find((coin) => slugify(coin.name) === slug);
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
        {getDealerDisplayName(dealer.dealer)}
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

interface BestPriceBadgeProps {
  prices: DealerPrice[];
  scrapedAt?: string;
}

function BestPriceBadge({ prices, scrapedAt }: BestPriceBadgeProps) {
  if (prices.length === 0) return null;
  const best = [...prices].sort((a, b) => a.price_cents - b.price_cents)[0];
  return (
    <div className="mt-3 rounded-lg border border-amber-500/40 bg-[#BE943C]/15 px-3 py-2 text-center">
      <div className="text-xs font-medium text-amber-300">
        Meilleur prix aujourd&apos;hui
      </div>
      <div className="text-xl font-bold text-amber-400">
        {formatPrice(best.price_cents)}
      </div>
      <div className="text-xs text-neutral-200">
        chez {getDealerDisplayName(best.dealer)}
      </div>
      {scrapedAt && (
        <div className="mt-1 text-xs text-neutral-400">
          {formatRelativeTime(scrapedAt)}
        </div>
      )}
    </div>
  );
}

interface StickyBuyCTAProps {
  prices: DealerPrice[];
  coinName: string;
}

function StickyBuyCTA({ prices, coinName }: StickyBuyCTAProps) {
  if (prices.length === 0) return null;
  const best = [...prices].sort((a, b) => a.price_cents - b.price_cents)[0];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-700/30 bg-[#BE943C]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-black/60">
            {coinName}
          </div>
          <div className="font-bold text-black">
            {formatPrice(best.price_cents)}{" "}
            <span className="text-xs font-normal text-black/70">
              chez {getDealerDisplayName(best.dealer)}
            </span>
          </div>
        </div>
        <a
          href={best.product_url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-black px-5 py-2 text-sm font-bold text-[#BE943C] transition-colors hover:bg-neutral-800"
        >
          Acheter maintenant →
        </a>
      </div>
    </div>
  );
}

interface SpecRowProps {
  label: string;
  value: string | number | null | undefined;
}

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="grid grid-cols-2 border-b border-neutral-800 py-3 text-sm">
      <div className="text-neutral-500">{label}</div>
      <div className="text-right text-white">{value ?? "-"}</div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoinPage({ params }: PageProps) {
  const { slug } = await params;

  const allCoins = [...getGoldCoins(), ...getSilverCoins()];
  const coin = findCoinBySlug(allCoins, slug);

  if (!coin) {
    notFound();
  }

  const image = COIN_IMAGES[coin.id];
  const prices = await getPricesForCoinById(coin.id);
  const hasPrices = prices.length > 0;
  const latestScrapedAt = hasPrices
    ? [...prices].sort(
        (a, b) =>
          new Date(b.scraped_at).getTime() - new Date(a.scraped_at).getTime(),
      )[0]?.scraped_at
    : undefined;

  function buildProductJsonLd(
    current: Coin,
    currentPrices: DealerPrice[],
    imageUrl?: string,
  ) {
    const sorted = [...currentPrices].sort(
      (a, b) => a.price_cents - b.price_cents,
    );
    const product: Record<string, unknown> = {
      "@type": "Product",
      name: current.name,
      description: `Pièce d'investissement en ${current.metal === "gold" ? "or" : "argent"} ${formatFineness(current.fineness)}, ${current.weight_oz} oz, ${current.country}`,
      category: `Pièces ${current.metal === "gold" ? "d'or" : "d'argent"} d'investissement`,
      material: current.metal === "gold" ? "Or" : "Argent",
      weight: {
        "@type": "QuantitativeValue",
        value: current.weight_g,
        unitCode: "GRM",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Pureté",
          value: formatFineness(current.fineness),
        },
        { "@type": "PropertyValue", name: "Pays", value: current.country },
        {
          "@type": "PropertyValue",
          name: "Première année",
          value: String(current.first_year),
        },
        {
          "@type": "PropertyValue",
          name: "Liquidité",
          value: `${current.liquidity}/5`,
        },
        ...(current.mintage
          ? [
              {
                "@type": "PropertyValue",
                name: "Tirage",
                value: current.mintage,
              },
            ]
          : []),
      ],
    };
    if (imageUrl) {
      product.image = `https://bullionradar.fr${imageUrl}`;
    }
    if (sorted.length > 0) {
      product.offers = {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: (sorted[0].price_cents / 100).toFixed(2),
        highPrice: (sorted[sorted.length - 1].price_cents / 100).toFixed(2),
        offerCount: sorted.length,
        offers: sorted.map((p) => ({
          "@type": "Offer",
          seller: {
            "@type": "Organization",
            name: getDealerDisplayName(p.dealer),
          },
          price: (p.price_cents / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        })),
      };
    }
    return product;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://bullionradar.fr",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: coin.name,
            item: `https://bullionradar.fr/coin/${slugify(coin.name)}`,
          },
        ],
      },
      buildProductJsonLd(coin, prices, image),
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] pb-20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10 border-b border-amber-600/30 bg-[#BE943C]">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
          <Link href="/" className="shrink-0">
            <img
              src="/images/header-bullionradar.jpeg"
              alt="BullionRadar"
              className="h-24 w-auto rounded-lg md:h-32"
            />
          </Link>
          <div className="flex flex-1 items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black text-black hover:text-neutral-800 md:text-3xl"
            >
              BullionRadar
            </Link>
            <Link
              href="/"
              className="rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/20"
            >
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Coin hero — image + nom + prix */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto h-48 w-48 md:h-56 md:w-56">
            {image ? (
              <img
                src={image}
                alt={coin.name}
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-5xl">
                {coin.metal === "gold" ? "🥇" : "🥈"}
              </div>
            )}
          </div>
          <h1 className="mt-6 text-3xl font-black text-white md:text-4xl">
            {coin.name}
          </h1>
          <p className="mt-1 text-neutral-500">{coin.country}</p>
          <div className="mx-auto max-w-xs">
            <BestPriceBadge prices={prices} scrapedAt={latestScrapedAt} />
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-white">
            Caractéristiques
          </h2>
          <SpecRow
            label="Métal"
            value={coin.metal === "gold" ? "Or" : "Argent"}
          />
          <SpecRow label="Poids (oz)" value={coin.weight_oz} />
          <SpecRow label="Poids (g)" value={coin.weight_g?.toFixed(2)} />
          <SpecRow label="Pureté" value={formatFineness(coin.fineness)} />
          <SpecRow label="Diamètre (mm)" value={coin.diameter_mm} />
          <SpecRow label="Épaisseur (mm)" value={coin.thickness_mm} />
          <SpecRow label="Pays" value={coin.country} />
          <SpecRow label="Première année" value={coin.first_year} />
          {coin.mintage && <SpecRow label="Tirage" value={coin.mintage} />}
          <SpecRow label="Valeur faciale" value={coin.face_value} />
          <SpecRow label="Liquidité (1-5)" value={coin.liquidity} />
          <SpecRow
            label="Prime estimée (%)"
            value={coin.estimated_premium_pct}
          />
          <SpecRow label="TVA France (%)" value={coin.vat_fr_pct} />
        </div>

        {/* Points forts */}
        {coin.highlights?.length ? (
          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="mb-4 text-center text-lg font-bold text-white">
              Points forts
            </h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              {coin.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Meilleurs prix dealers */}
        {hasPrices && (
          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="mb-6 text-center text-lg font-bold text-white">
              Meilleurs prix dealers
            </h2>
            <div className="mx-auto max-w-sm">
              <CoinPricesSection coinName={coin.name} prices={prices} />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-500">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[#BE943C]" />
                Dernière mise à jour :{" "}
                {new Date(latestScrapedAt ?? "").toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-2 text-xs text-neutral-600">
                Prix indicatifs pouvant varier de quelques euros par rapport aux
                sites comparés
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#BE943C] px-6 py-3 font-bold text-black transition-all hover:bg-amber-400"
          >
            Créer un comparatif →
          </Link>
        </div>
      </div>
      <Footer />
      <StickyBuyCTA prices={prices} coinName={coin.name} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const allCoins = [...getGoldCoins(), ...getSilverCoins()];
  const coin = findCoinBySlug(allCoins, slug);

  if (!coin) {
    return { title: "Pièce non trouvée" };
  }

  return {
    title: `${coin.name} - Fiche complète | BullionRadar`,
    description: `Découvrez la fiche complète de la ${coin.name} : poids, pureté, liquidité, prime et caractéristiques clés.`,
    alternates: {
      canonical: `https://bullionradar.fr/coin/${slugify(coin.name)}`,
    },
    openGraph: {
      title: `${coin.name} - Fiche complète | BullionRadar`,
      description: `Découvrez la fiche complète de la ${coin.name} : poids, pureté, liquidité, prime et caractéristiques clés.`,
      url: `https://bullionradar.fr/coin/${slugify(coin.name)}`,
      images: [
        {
          url: "https://bullionradar.fr/images/og-bullionradar.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
