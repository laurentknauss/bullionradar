import Image from "next/image";
import Link from "next/link";
import { PriceComparator } from "@/components/price-comparator";
import { CoinVsSelector } from "@/components/coin-vs-selector";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      {/* Header noir avec cours */}
      <header className="overflow-x-auto bg-[#1a1a1a] px-8 py-6">
        <div className="flex items-center justify-between gap-8 whitespace-nowrap">
          {/* Cours Or avec périodes */}
          <div className="flex items-center gap-3">
            <Link
              href="/cours-or"
              className="text-lg font-bold text-[#FFD700] hover:text-[#fff]"
            >
              Cours Or
            </Link>
            <Link
              href="/cours-or/1-an"
              className="rounded-lg bg-[#FFD700]/20 px-4 py-2 text-base font-semibold text-[#FFD700] hover:bg-[#FFD700]/30"
            >
              1 an
            </Link>
            <Link
              href="/cours-or/5-ans"
              className="rounded-lg bg-[#FFD700]/20 px-4 py-2 text-base font-semibold text-[#FFD700] hover:bg-[#FFD700]/30"
            >
              5 ans
            </Link>
            <Link
              href="/cours-or/10-ans"
              className="rounded-lg bg-[#FFD700]/20 px-4 py-2 text-base font-semibold text-[#FFD700] hover:bg-[#FFD700]/30"
            >
              10 ans
            </Link>
            <Link
              href="/cours-or/20-ans"
              className="rounded-lg bg-[#FFD700]/20 px-4 py-2 text-base font-semibold text-[#FFD700] hover:bg-[#FFD700]/30"
            >
              20 ans
            </Link>
          </div>
          {/* Cours Argent avec périodes */}
          <div className="flex items-center gap-3">
            <Link
              href="/cours-argent"
              className="text-lg font-bold text-gray-300 hover:text-white"
            >
              Cours Argent
            </Link>
            <Link
              href="/cours-argent/1-an"
              className="rounded-lg bg-gray-300/20 px-4 py-2 text-base font-semibold text-gray-300 hover:bg-gray-300/30"
            >
              1 an
            </Link>
            <Link
              href="/cours-argent/5-ans"
              className="rounded-lg bg-gray-300/20 px-4 py-2 text-base font-semibold text-gray-300 hover:bg-gray-300/30"
            >
              5 ans
            </Link>
            <Link
              href="/cours-argent/10-ans"
              className="rounded-lg bg-gray-300/20 px-4 py-2 text-base font-semibold text-gray-300 hover:bg-gray-300/30"
            >
              10 ans
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-[900px]">
          <Image
            src="/images/header-bullionradar.jpeg"
            alt="BullionRadar - Comparateur de pieces d'or et d'argent"
            width={550}
            height={768}
            className="mx-auto h-auto w-full max-w-[200px]"
            priority
          />
        </div>
        <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
          <p className="mb-4 text-lg font-semibold tracking-wide text-[#1a1a1a]/80">
            L&apos;unique comparatif indépendant de pièces d&apos;
            <span className="text-[#8B6914]">or</span> et d&apos;
            <span className="text-[#5A5A5A]">argent</span> en France
          </p>
          <h1 className="mb-4 text-3xl leading-tight font-black text-[#1a1a1a] md:text-5xl">
            Trouvez la bonne pièce au meilleur prix
          </h1>
          <p className="mx-auto max-w-[620px] text-lg leading-relaxed text-[#3d3520]">
            Comparez les <strong>caracteristiques</strong> de dizaines de pieces
            d&apos;<span className="font-bold text-[#8B6914]">or</span> et
            d&apos;
            <span className="font-bold text-[#5A5A5A]">argent</span>, et trouvez
            le <strong>meilleur prix</strong> chez les dealers francais.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-12 px-6 py-6">
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">50+</div>
          <div className="mt-1 text-xs font-medium tracking-widest text-[#3d3520] uppercase">
            Pieces analysees
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
            Dealers compares
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

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-[#3d3520]">
        <p>
          © 2026 <strong className="text-[#1a1a1a]">BullionRadar</strong> —
          Comparateur independant de pieces d&apos;or et d&apos;argent
        </p>
        <p className="mt-2">
          <Link
            href="/mentions-legales"
            className="underline hover:text-[#1a1a1a]"
          >
            Mentions légales & Politique de confidentialité
          </Link>
        </p>
      </footer>
    </main>
  );
}
