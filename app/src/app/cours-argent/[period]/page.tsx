import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TradingViewWidget } from "@/components/tradingview-widget";

const PERIODS: Record<
  string,
  { label: string; range: string; months: number; seoTitle: string }
> = {
  "1-an": {
    label: "1 An",
    range: "12M",
    months: 12,
    seoTitle: "Cours de l'Argent sur 1 An",
  },
  "5-ans": {
    label: "5 Ans",
    range: "60M",
    months: 60,
    seoTitle: "Cours de l'Argent sur 5 Ans",
  },
  "10-ans": {
    label: "10 Ans",
    range: "ALL",
    months: 120,
    seoTitle: "Cours de l'Argent sur 10 Ans",
  },
};

const ALL_PERIODS = [
  { label: "Temps Réel", href: "/cours-argent" },
  { label: "1 An", href: "/cours-argent/1-an" },
  { label: "5 Ans", href: "/cours-argent/5-ans" },
  { label: "10 Ans", href: "/cours-argent/10-ans" },
];

interface PageProps {
  params: Promise<{ period: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { period } = await params;
  const periodData = PERIODS[period];

  if (!periodData) {
    return { title: "Page non trouvée" };
  }

  return {
    title: `${periodData.seoTitle} | Graphique Historique | BullionRadar`,
    description: `Évolution du cours de l'argent métal sur ${periodData.label.toLowerCase()}. Graphique interactif et analyse des tendances. Prix en euros par once.`,
  };
}

export function generateStaticParams() {
  return Object.keys(PERIODS).map((period) => ({ period }));
}

export default async function CoursArgentPeriodPage({ params }: PageProps) {
  const { period } = await params;
  const periodData = PERIODS[period];

  if (!periodData) {
    notFound();
  }

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
          <div className="flex gap-4">
            <Link
              href="/cours-or"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cours Or
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-8 py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          {periodData.seoTitle}
        </h1>
        <p className="mb-8 font-semibold tracking-wide text-[#FFFFF0]/80">
          Évolution du prix de l&apos;argent (XAG/EUR) sur les{" "}
          {periodData.months} derniers mois.
        </p>

        {/* Time Period Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ALL_PERIODS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`rounded-full px-4 py-2 text-sm ${
                p.href === `/cours-argent/${period}`
                  ? "bg-gray-400 font-bold text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        {/* TradingView Widget */}
        <div className="mb-12 overflow-hidden rounded-xl border border-neutral-800">
          <TradingViewWidget
            symbol="XAGEUR"
            interval="W"
            range={periodData.range}
          />
        </div>

        {/* SEO Content */}
        <section className="max-w-none space-y-8">
          <h2 className="text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Analyse du cours de l&apos;argent sur{" "}
            {periodData.label.toLowerCase()}
          </h2>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Ce graphique montre l&apos;évolution du prix de l&apos;argent en
            euros sur les {periodData.months} derniers mois. L&apos;argent est
            un métal précieux avec une forte composante industrielle, ce qui le
            rend plus volatile que l&apos;or.
          </p>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Le ratio or/argent historique oscille entre 40:1 et 100:1. Un ratio
            élevé peut indiquer que l&apos;argent est sous-évalué par rapport à
            l&apos;or.
          </p>

          <h2 className="pt-4 text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Pourquoi investir dans l&apos;argent physique ?
          </h2>
          <ul className="list-disc space-y-3 pl-6 leading-relaxed tracking-wide text-[#FFFFF0]/70">
            <li>Prix d&apos;entrée plus accessible que l&apos;or</li>
            <li>Potentiel de hausse plus important (effet de levier)</li>
            <li>Demande industrielle croissante (transition énergétique)</li>
            <li>Diversification de portefeuille métaux précieux</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-400/10 p-6 text-center">
          <p className="mb-4 text-lg font-semibold text-gray-200">
            Prêt à investir dans l&apos;argent physique ?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gray-400 px-6 py-3 font-bold text-black hover:bg-gray-300"
          >
            Comparer les prix des pièces d&apos;argent
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-500">
        <p>© 2026 BullionRadar - Données fournies par TradingView</p>
        <p className="mt-2">
          <Link href="/mentions-legales" className="underline hover:text-white">
            Mentions légales
          </Link>
        </p>
      </footer>
    </main>
  );
}
