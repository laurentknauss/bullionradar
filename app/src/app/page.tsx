import Image from "next/image";
import { PriceComparator } from "@/components/price-comparator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      {/* Nav */}
      <nav className="p-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between">
          <span className="text-xl font-bold tracking-normal text-[#1a1a1a]">
            labonnepiece.fr
          </span>
          <div className="flex gap-3">
            <a
              href="#"
              className="rounded border-2 border-[#1a1a1a] bg-transparent px-5 py-2 font-bold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFD700]"
            >
              Connexion
            </a>
            <a
              href="#"
              className="rounded border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-2 font-bold text-[#FFD700] transition-colors hover:bg-[#2a2a2a]"
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
            Comparez des dizaines de pieces d&apos;
            <span className="font-bold text-[#8B6914]">or</span> et d&apos;
            <span className="font-bold text-[#5A5A5A]">argent</span>, et suivez
            la valeur de votre collection dans un tableau de bord personnel.
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
            Comparatifs
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">3</div>
          <div className="mt-1 text-xs font-medium tracking-widest text-[#3d3520] uppercase">
            Pays couverts
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="my-10 text-center text-2xl tracking-[0.5rem] text-[#A8892A]">
        — ◆ —
      </div>

      {/* Features */}
      <section className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2">
        <FeatureCard
          icon="⚖"
          title="Comparatifs VS Or"
          description="Krugerrand vs Maple Leaf ? Napoleon vs Vreneli ? Chaque paire de pieces d'or comparee point par point : prime, purete, liquidite."
        />
        <FeatureCard
          icon="⚖"
          title="Comparatifs VS Argent"
          description="Silver Eagle vs Maple Leaf ? Philharmonique vs Britannia ? Les pieces d'argent aussi passees au crible pour l'investisseur."
          silver
        />
        <FeatureCard
          icon="★"
          title="Scores Investisseur"
          description="Des scores exclusifs : liquidite de revente, robustesse, risque de milk spots, regime fiscal. Pour l'or comme pour l'argent."
        />
        <FeatureCard
          icon="€"
          title="Fiscalite par pays"
          description="France, Belgique, Suisse : chaque piece analysee selon le regime fiscal local. Cours legal, taxe forfaitaire ou plus-value."
        />
      </section>

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

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  silver?: boolean;
}

function FeatureCard({ icon, title, description, silver }: FeatureCardProps) {
  return (
    <div
      className={`rounded-lg border bg-black/[0.08] p-8 transition-all hover:-translate-y-1 hover:bg-black/[0.12] ${
        silver ? "border-[#5A5A5A]/20" : "border-black/15"
      }`}
    >
      <div className="mb-3 text-3xl">{icon}</div>
      <h3
        className={`mb-2 text-xl font-bold ${
          silver ? "text-[#5A5A5A]" : "text-[#1a1a1a]"
        }`}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#3d3520]">{description}</p>
    </div>
  );
}
