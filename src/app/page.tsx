import Image from "next/image";
import Link from "next/link";
import { PriceComparator } from "@/components/price-comparator";
import { CoinVsSelector } from "@/components/coin-vs-selector";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      {/* Header noir avec cours */}
      <header className="overflow-x-auto bg-[#1a1a1a] px-4 py-3 md:px-8 md:py-6">
        <div className="flex flex-col items-start gap-2 whitespace-nowrap md:flex-row md:items-center md:justify-between md:gap-8">
          {/* Cours Or avec périodes */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/cours-or"
              className="rounded-lg bg-[#FFD700]/20 px-2 py-1 text-xs font-bold text-[#FFD700] hover:bg-[#FFD700]/30 hover:text-white md:px-4 md:py-2 md:text-base"
            >
              Cours Or aujourd&apos;hui
            </Link>
            <Link
              href="/cours-or/1-an"
              className="rounded-lg bg-[#FFD700]/20 px-2 py-1 text-xs font-semibold text-[#FFD700] hover:bg-[#FFD700]/30 md:px-4 md:py-2 md:text-base"
            >
              1 an
            </Link>
            <Link
              href="/cours-or/5-ans"
              className="rounded-lg bg-[#FFD700]/20 px-2 py-1 text-xs font-semibold text-[#FFD700] hover:bg-[#FFD700]/30 md:px-4 md:py-2 md:text-base"
            >
              5 ans
            </Link>
            <Link
              href="/cours-or/10-ans"
              className="rounded-lg bg-[#FFD700]/20 px-2 py-1 text-xs font-semibold text-[#FFD700] hover:bg-[#FFD700]/30 md:px-4 md:py-2 md:text-base"
            >
              10 ans
            </Link>
            <Link
              href="/cours-or/20-ans"
              className="rounded-lg bg-[#FFD700]/20 px-2 py-1 text-xs font-semibold text-[#FFD700] hover:bg-[#FFD700]/30 md:px-4 md:py-2 md:text-base"
            >
              20 ans
            </Link>
          </div>
          {/* Cours Argent avec périodes */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/cours-argent"
              className="rounded-lg bg-gray-300/20 px-2 py-1 text-xs font-bold text-gray-300 hover:bg-gray-300/30 hover:text-white md:px-4 md:py-2 md:text-base"
            >
              Cours Argent aujourd&apos;hui
            </Link>
            <Link
              href="/cours-argent/1-an"
              className="rounded-lg bg-gray-300/20 px-2 py-1 text-xs font-semibold text-gray-300 hover:bg-gray-300/30 md:px-4 md:py-2 md:text-base"
            >
              1 an
            </Link>
            <Link
              href="/cours-argent/5-ans"
              className="rounded-lg bg-gray-300/20 px-2 py-1 text-xs font-semibold text-gray-300 hover:bg-gray-300/30 md:px-4 md:py-2 md:text-base"
            >
              5 ans
            </Link>
            <Link
              href="/cours-argent/10-ans"
              className="rounded-lg bg-gray-300/20 px-2 py-1 text-xs font-semibold text-gray-300 hover:bg-gray-300/30 md:px-4 md:py-2 md:text-base"
            >
              10 ans
            </Link>
            <Link
              href="/cours-argent/20-ans"
              className="rounded-lg bg-gray-300/20 px-2 py-1 text-xs font-semibold text-gray-300 hover:bg-gray-300/30 md:px-4 md:py-2 md:text-base"
            >
              20 ans
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-[900px]">
          <Image
            src="/images/bonhomme-coffre-fort.jpeg"
            alt="BullionRadar - Comparateur de pièces d'or et d'argent"
            width={1024}
            height={512}
            className="mx-auto h-auto w-full max-w-[500px]"
            priority
          />
        </div>
        <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
          <p className="mb-4 text-lg font-semibold tracking-wide text-black">
            L&apos;unique comparatif indépendant de pièces d&apos;or et
            d&apos;argent en France
          </p>
          <h1 className="mb-4 text-3xl leading-tight font-black text-[#1a1a1a] md:text-5xl">
            Comparez les pièces d&apos;or et d&apos;argent au meilleur prix
          </h1>
          <p className="mx-auto max-w-[620px] text-lg leading-relaxed text-black">
            Comparez les caractéristiques de dizaines de pièces d&apos;or et
            d&apos;argent, et trouvez le meilleur prix chez les dealers
            français.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-12 px-6 py-6">
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">50+</div>
          <div className="mt-1 text-xs font-medium tracking-widest text-[#3d3520] uppercase">
            Pièces analysées
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">1 200+</div>
          <div className="mt-1 text-xs font-medium tracking-widest text-[#3d3520] uppercase">
            Fiches comparatives
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">3</div>
          <div className="mt-1 text-xs font-medium tracking-widest text-[#3d3520] uppercase">
            Dealers comparés
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="my-10 text-center text-2xl tracking-[0.5rem] text-[#A8892A]">
        — ◆ —
      </div>

      {/* Coin VS Selector - Grid for selecting 2 coins to compare */}
      <CoinVsSelector />

      {/* Price Comparator with Glowing Effect */}
      <PriceComparator />

      {/* Guide gratuit CTA */}
      <section className="bg-[#1a1a1a] px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row">
          <img
            src="/docs/cover-guide-stacker.jpg"
            alt="Le Petit Guide du Stacker — BullionRadar"
            className="w-48 rounded-lg shadow-2xl md:w-56"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white md:text-3xl">
              Le Petit Guide du Stacker
            </h2>
            <p className="mt-3 text-neutral-400">
              Tout ce qu&apos;il faut savoir pour investir dans les pièces
              d&apos;or et d&apos;argent en France. Fiscalité, pièces
              incontournables, stratégies, dealers — 40 pages de contenu gratuit
              et actualisé.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 rounded-full bg-[#BE943C] px-6 py-3 font-bold text-black transition-colors hover:bg-amber-400"
              >
                Lire et télécharger gratuitement →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
