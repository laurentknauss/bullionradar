import Image from "next/image";
import { PriceComparator } from "@/components/price-comparator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      {/* Nav */}
      <nav className="p-4">
        <div className="max-w-[1000px] mx-auto flex justify-between items-center">
          <span className="text-xl font-extrabold text-[#1a1a1a]">
            labonnepiece.fr
          </span>
          <div className="flex gap-3">
            <a
              href="#"
              className="px-5 py-2 bg-transparent text-[#1a1a1a] font-bold border-2 border-[#1a1a1a] rounded hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors"
            >
              Connexion
            </a>
            <a
              href="#"
              className="px-5 py-2 bg-[#1a1a1a] text-[#FFD700] font-bold border-2 border-[#1a1a1a] rounded hover:bg-[#2a2a2a] transition-colors"
            >
              Creer un compte
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full">
        <div className="max-w-[900px] mx-auto">
          <Image
            src="/images/header-labonnepiece.jpeg"
            alt="labonnepiece.fr - Comparateur de pieces d'or et d'argent"
            width={1390}
            height={780}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="text-center px-6 py-10 max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-4 leading-tight">
            Le comparateur qui vous aide a trouver la bonne piece d&apos;
            <span className="text-[#8B6914]">or</span> et d&apos;
            <span className="text-[#5A5A5A]">argent</span>
          </h1>
          <p className="text-lg text-[#3d3520] max-w-[620px] mx-auto leading-relaxed">
            Comparez des dizaines de pieces d&apos;
            <span className="text-[#8B6914] font-bold">or</span> et d&apos;
            <span className="text-[#5A5A5A] font-bold">argent</span>, et suivez
            la valeur de votre collection dans un tableau de bord personnel.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="flex justify-center gap-12 flex-wrap px-6 py-6 max-w-[800px] mx-auto">
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">50+</div>
          <div className="text-xs text-[#3d3520] mt-1 uppercase tracking-widest font-medium">
            Pieces analysees
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">1 200+</div>
          <div className="text-xs text-[#3d3520] mt-1 uppercase tracking-widest font-medium">
            Comparatifs
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-[#1a1a1a]">3</div>
          <div className="text-xs text-[#3d3520] mt-1 uppercase tracking-widest font-medium">
            Pays couverts
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="text-center my-10 text-2xl text-[#A8892A] tracking-[0.5rem]">
        — ◆ —
      </div>

      {/* Features */}
      <section className="max-w-[1000px] mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <footer className="border-t border-black/10 text-center py-8 px-6 text-[#3d3520] text-sm">
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
      className={`bg-black/[0.08] border rounded-lg p-8 transition-all hover:bg-black/[0.12] hover:-translate-y-1 ${
        silver ? "border-[#5A5A5A]/20" : "border-black/15"
      }`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3
        className={`text-xl font-bold mb-2 ${
          silver ? "text-[#5A5A5A]" : "text-[#1a1a1a]"
        }`}
      >
        {title}
      </h3>
      <p className="text-[#3d3520] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
