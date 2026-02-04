import Image from "next/image";
import { PriceComparator } from "@/components/price-comparator";
import { CoinVsSelector } from "@/components/coin-vs-selector";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      {/* Nav */}
      <nav className="p-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-2">
          <span className="text-lg font-bold tracking-normal text-[#1a1a1a] sm:text-xl">
            labonnepiece.fr
          </span>
          <div className="flex gap-2 sm:gap-3">
            <a
              href="#"
              className="rounded border-2 border-[#1a1a1a] bg-transparent px-3 py-1.5 text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFD700] sm:px-5 sm:py-2 sm:text-base"
            >
              Connexion
            </a>
            <a
              href="#"
              className="rounded border-2 border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1.5 text-sm font-bold text-[#FFD700] transition-colors hover:bg-[#2a2a2a] sm:px-5 sm:py-2 sm:text-base"
            >
              Creer un compte
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-[900px]">
          <Image
            src="/images/header-labonnepiece.jpeg"
            alt="labonnepiece.fr - Comparateur de pieces d'or et d'argent"
            width={1390}
            height={780}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
          <h1 className="mb-4 text-3xl leading-tight font-black text-[#1a1a1a] md:text-5xl">
            Le comparateur qui vous aide a trouver la bonne piece d&apos;
            <span className="text-[#8B6914]">or</span> et d&apos;
            <span className="text-[#5A5A5A]">argent</span>
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
            Fiches VS
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
          © 2026 <strong className="text-[#1a1a1a]">labonnepiece.fr</strong> —
          Guide independant d&apos;investissement en pieces d&apos;or et
          d&apos;argent
        </p>
      </footer>
    </main>
  );
}
