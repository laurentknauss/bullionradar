import { notFound } from "next/navigation";
import Link from "next/link";
import { getGoldCoins, getSilverCoins } from "@/lib/coins-data";
import { getPricesForCoinById, type DealerPrice } from "@/lib/supabase";
import { filterUntrackedGodot } from "@/lib/godot-affiliate";
import { getDealerDisplayName } from "@/lib/utils";
import { AffiliateLink } from "@/components/affiliate-link";
import { Footer } from "@/components/footer";
import { YouTubeLiteEmbed } from "@/components/youtube-lite-embed";
import { formatFineness, formatRelativeTime } from "@/lib/format";
// Vidéos Remotion désactivées sur le site (les vidéos sont pour YouTube uniquement).
// Réactiver : décommenter ces imports + le bloc <CoinVideoSection> plus bas.
// import { hasVideo } from "@/components/remotion/coin-images";
// import { CoinVideoSection } from "@/components/remotion/CoinVideoSection";
import type { Coin } from "@/types";

// Vidéos YouTube par slug URL (slug = slugify(coin.name) — cf findCoinBySlug)
const COIN_YOUTUBE: Record<string, { videoUrl?: string }> = {
  "krugerrand-1-oz-or": { videoUrl: "https://youtu.be/GGiF4LRwLFo" },
  "maple-leaf-1-oz-or": { videoUrl: "https://youtu.be/ADqGVn5AK7I" },
  "philharmonique-1-oz-or": { videoUrl: "https://youtu.be/00v9EPQDuBw" },
  "britannia-1-oz-or": { videoUrl: "https://youtu.be/DRguTIUrrGg" },
  "20-francs-suisse-or-vreneli": { videoUrl: "https://youtu.be/hgHfXQDUMho" },
  "10-francs-napoleon-or": { videoUrl: "https://youtu.be/irMGqTHO3nQ" },
  "10-florins-or-pays-bas": { videoUrl: "https://youtu.be/8UfU3c_SOFc" },
  "20-reichsmarks-or": { videoUrl: "https://youtu.be/H0ZfTX4G454" },
  // American Buffalo 1oz Or, Napoleon 20F, Fiscalite, Voyager : production terminee mais pas encore uploadees YT
};

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
  // Pièces historiques / semi-numismatiques (Godot)
  "10-francs-napoleon-or": "/coins-v2/gold/10-francs-napoleon-or-avers.webp",
  "10-francs-marianne-coq-or":
    "/coins-v2/gold/10-francs-marianne-coq-or-avers.webp",
  "20-francs-marianne-coq-or":
    "/coins-v2/gold/20-francs-marianne-coq-or-avers.webp",
  "union-latine-or": "/coins-v2/gold/union-latine-or-avers.webp",
  "louis-dor-20-francs-or": "/coins-v2/gold/louis-dor-20-francs-or-avers.webp",
  "demi-souverain-or": "/coins-v2/gold/demi-souverain-or-avers.webp",
  "5-dollars-us-or": "/coins-v2/gold/5-dollars-us-or-avers.webp",
  "10-dollars-us-or": "/coins-v2/gold/10-dollars-us-or-avers.webp",
  "20-dollars-us-or": "/coins-v2/gold/20-dollars-us-or-avers.webp",
  "50-pesos-or": "/coins-v2/gold/50-pesos-or-avers.webp",
  "4-ducats-or": "/coins-v2/gold/4-ducats-or-avers.webp",
  "1-ducat-or": "/coins-v2/gold/1-ducat-or-avers.webp",
  "20-reichsmarks-or": "/coins-v2/gold/20-reichsmarks-or-avers.webp",
  "20-francs-tunisie-or": "/coins-v2/gold/20-francs-tunisie-or-avers.webp",
  "10-florins-or": "/coins-v2/gold/10-florins-or-avers.webp",
  // Zodiac Monnaie de Paris + Austerlitz
  "zodiac-taureau-2026-or": "/coins-v2/gold/zodiac-taureau-2026-or-avers.webp",
  "zodiac-gemeaux-2026-or": "/coins-v2/gold/zodiac-gemeaux-2026-or-avers.webp",
  "zodiac-cancer-2026-or": "/coins-v2/gold/zodiac-cancer-2026-or-avers.webp",
  "zodiac-lion-2026-or": "/coins-v2/gold/zodiac-lion-2026-or-avers.webp",
  "zodiac-vierge-2026-or": "/coins-v2/gold/zodiac-vierge-2026-or-avers.webp",
  "zodiac-balance-2026-or": "/coins-v2/gold/zodiac-balance-2026-or-avers.webp",
  "zodiac-sagittaire-2026-or":
    "/coins-v2/gold/zodiac-sagittaire-2026-or-avers.webp",
  // Panda 3g
  "panda-3g-or": "/coins-v2/gold/panda-3g-or-avers.webp",
  // Argent manquantes (Godot)
  "100-francs-argent-1982-2002":
    "/coins-v2/silver/100-francs-argent-1982-2002-avers.webp",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getYouTubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([\w-]+)/,
  );
  return match ? match[1] : null;
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
  coinName: string;
}

function DealerLink({ dealer, isBest, coinName }: DealerLinkProps) {
  return (
    <AffiliateLink
      href={dealer.product_url ?? "#"}
      dealer={dealer.dealer}
      coinName={coinName}
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
    </AffiliateLink>
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
            coinName={coinName}
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
        <div className="mt-1 text-xs text-neutral-300">
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
        <AffiliateLink
          href={best.product_url ?? "#"}
          dealer={best.dealer}
          coinName={coinName}
          className="shrink-0 rounded-full bg-black px-5 py-2 text-sm font-bold text-[#BE943C] transition-colors hover:bg-neutral-800"
        >
          Acheter maintenant →
        </AffiliateLink>
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
      <div className="text-neutral-400">{label}</div>
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
  const prices = filterUntrackedGodot(await getPricesForCoinById(coin.id));
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

  // 6 FAQs universelles pour chaque pièce — texte aussi rendu visiblement plus bas
  function buildFaqs(c: Coin): { question: string; answer: string }[] {
    const metalLabel = c.metal === "gold" ? "or" : "argent";
    const purityPct = (c.purity * 100).toFixed(2).replace(/\.?0+$/, "");
    const vatExempt = (c.vat_fr_pct ?? 0) === 0;
    return [
      {
        question: `Quelle est la pureté de la pièce ${c.name} ?`,
        answer: `${c.name} a une pureté de ${formatFineness(c.fineness)} (${purityPct}% de ${metalLabel} pur). ${c.metal === "gold" && c.purity < 0.999 ? `Elle contient un alliage métallique pour la rendre plus résistante.` : `C'est une pureté de référence pour les pièces bullion d'investissement.`}`,
      },
      {
        question: `Combien pèse la pièce ${c.name} ?`,
        answer:
          `${c.name} pèse ${c.weight_g} grammes, soit ${c.weight_oz} once troy${c.weight_oz === 1 ? "" : "s"}. ${c.purity < 0.999 ? `Le poids total inclut l'alliage ; le poids en ${metalLabel} pur est de ${(c.weight_g * c.purity).toFixed(2)} grammes.` : ""}`.trim(),
      },
      {
        question: `${c.name} est-elle exonérée de TVA en France ?`,
        answer: vatExempt
          ? `Oui, ${c.name} est exonérée de TVA en France au titre de l'${metalLabel} d'investissement (article 298 sexdecies du Code général des impôts). Aucune TVA n'est appliquée à l'achat.`
          : `${c.name} est soumise à une TVA de ${c.vat_fr_pct}% en France, car elle ne répond pas aux critères stricts de l'${metalLabel} d'investissement.`,
      },
      {
        question: `Quelle fiscalité s'applique à la revente de ${c.name} ?`,
        answer: `À la revente en France, deux régimes au choix : la Taxe Forfaitaire sur les Métaux Précieux (TMP) à 11,5% du prix de vente, ou le régime des plus-values (TPV) à 36,2% sur la plus-value avec un abattement de 5% par an de détention dès la 3e année (exonération totale après 22 ans). Conservez vos factures d'achat pour pouvoir choisir le régime le plus avantageux.`,
      },
      {
        question: `Quelle est la prime moyenne de ${c.name} ?`,
        answer: c.estimated_premium_pct
          ? `La prime estimée de ${c.name} est d'environ ${c.estimated_premium_pct}% au-dessus du cours spot du ${metalLabel}. Cette prime varie selon la disponibilité, la conjoncture et le dealer choisi. ${c.estimated_premium_pct <= 8 ? "C'est l'une des primes les plus basses du marché pour ce format." : ""}`.trim()
          : `La prime de ${c.name} dépend de la disponibilité et du dealer. Comparez les prix sur cette page pour identifier l'offre la plus avantageuse.`,
      },
      {
        question: `Où acheter ${c.name} au meilleur prix en France ?`,
        answer: `BullionRadar compare en temps réel les prix de ${c.name} chez les 3 principaux dealers français : Or.fr, Godot & Fils et Pièces-Or. Le meilleur prix actuel est mis en évidence en haut de cette page. Tous ces dealers livrent en France et acceptent les paiements sécurisés.`,
      },
    ];
  }

  const faqs = buildFaqs(coin);

  const youtubeVideoUrl = COIN_YOUTUBE[slug]?.videoUrl;
  const youtubeVideoId = youtubeVideoUrl
    ? getYouTubeVideoId(youtubeVideoUrl)
    : null;

  const videoObjectJsonLd =
    youtubeVideoUrl && youtubeVideoId
      ? {
          "@type": "VideoObject",
          name: `${coin.name} — Caractéristiques, Histoire & Investissement`,
          description: `Analyse complète de la pièce ${coin.name} : spécifications techniques, histoire, design, marché et fiscalité française. Comparez les prix chez les dealers français sur BullionRadar.`,
          thumbnailUrl: `https://bullionradar.fr/images/youtube-thumbnails/${slug}.jpg`,
          uploadDate: "2026-05-22",
          contentUrl: youtubeVideoUrl,
          embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`,
          publisher: {
            "@type": "Organization",
            name: "BullionRadar",
            url: "https://bullionradar.fr",
            logo: {
              "@type": "ImageObject",
              url: "https://bullionradar.fr/images/header-bullionradar.jpeg",
            },
          },
        }
      : null;

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
      ...(videoObjectJsonLd ? [videoObjectJsonLd] : []),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-dark pb-20 text-white">
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
          <p className="mt-1 text-neutral-400">{coin.country}</p>
          <div className="mx-auto max-w-xs">
            <BestPriceBadge prices={prices} scrapedAt={latestScrapedAt} />
          </div>
        </div>

        {/* Vidéo YouTube intégrée (lite embed — thumbnail propre, iframe au clic) */}
        {youtubeVideoId && (
          <section className="mt-8 mb-8 overflow-hidden rounded-xl border border-amber-500/40 bg-[#BE943C]/15 p-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              <YouTubeLiteEmbed
                videoId={youtubeVideoId}
                thumbnailUrl={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                title={`Vidéo ${coin.name} — BullionRadar`}
              />
            </div>
          </section>
        )}

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
              <p className="text-sm text-neutral-400">
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

        {/* FAQ — visible + couvert par schema FAQPage JSON-LD */}
        <section className="mt-16" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mb-8 text-2xl font-bold text-[#BE943C]">
            Questions fréquentes sur {coin.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 open:bg-neutral-900/70"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-white transition-colors group-hover:text-[#BE943C]">
                  <span className="mr-2 text-[#BE943C]">+</span>
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
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

  const isSilver = coin.metal === "silver";
  const description = isSilver
    ? `${coin.name} : valeur, cours et prix chez les dealers français. Poids ${coin.weight_g}g, pureté ${coin.fineness}, comparatif des primes pour l'achat d'argent.`
    : `${coin.name} : fiche complète, poids ${coin.weight_g}g, pureté ${coin.fineness}, prix dealers et comparatif des primes.`;

  return {
    title: isSilver
      ? `${coin.name} — Valeur pièce argent & prix | BullionRadar`
      : `${coin.name} — Fiche complète & prix | BullionRadar`,
    description,
    alternates: {
      canonical: `https://bullionradar.fr/coin/${slugify(coin.name)}`,
    },
    openGraph: {
      title: isSilver
        ? `${coin.name} — Cours pièce argent & valeur`
        : `${coin.name} — Fiche complète | BullionRadar`,
      description,
      url: `https://bullionradar.fr/coin/${slugify(coin.name)}`,
      images: [
        {
          url: COIN_YOUTUBE[slug]
            ? `https://bullionradar.fr/images/youtube-thumbnails/${slug}.jpg`
            : "https://bullionradar.fr/images/og-bullionradar.jpg",
          width: 1280,
          height: 720,
        },
      ],
    },
  };
}
