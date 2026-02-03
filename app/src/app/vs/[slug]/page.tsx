import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGoldCoins, getSilverCoins } from "@/lib/coins-data";
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

function findCoinBySlug(coins: Coin[], slug: string): Coin | undefined {
  return coins.find((coin) => slugify(coin.name) === slug);
}

function parseVsSlug(
  slug: string
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

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <nav className="border-b border-neutral-800 p-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-amber-400 hover:text-amber-300"
          >
            labonnepiece.fr
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

          {/* Highlights */}
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
    title: `${coin1.name} vs ${coin2.name} - Comparatif | labonnepiece.fr`,
    description: `Comparez ${coin1.name} et ${coin2.name} : poids, purete, prime, liquidite. Quel est le meilleur choix pour investir ?`,
  };
}
