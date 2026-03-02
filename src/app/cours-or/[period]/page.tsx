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
    seoTitle: "Cours de l'Or sur 1 An",
  },
  "5-ans": {
    label: "5 Ans",
    range: "60M",
    months: 60,
    seoTitle: "Cours de l'Or sur 5 Ans",
  },
  "10-ans": {
    label: "10 Ans",
    range: "ALL",
    months: 120,
    seoTitle: "Cours de l'Or sur 10 Ans",
  },
  "20-ans": {
    label: "20 Ans",
    range: "ALL",
    months: 240,
    seoTitle: "Cours de l'Or sur 20 Ans",
  },
};

const ALL_PERIODS = [
  { label: "Temps Réel", href: "/cours-or" },
  { label: "1 An", href: "/cours-or/1-an" },
  { label: "5 Ans", href: "/cours-or/5-ans" },
  { label: "10 Ans", href: "/cours-or/10-ans" },
  { label: "20 Ans", href: "/cours-or/20-ans" },
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
    description: `Évolution du cours de l'or sur ${periodData.label.toLowerCase()}. Graphique interactif et analyse des tendances. Prix en euros par once.`,
  };
}

export function generateStaticParams() {
  return Object.keys(PERIODS).map((period) => ({ period }));
}

export default async function CoursOrPeriodPage({ params }: PageProps) {
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
              href="/"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Accueil
            </Link>
            <Link
              href="/cours-argent"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cours Argent
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-8 pt-16 pb-8">
        <h1 className="mb-4 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          {periodData.seoTitle}
        </h1>
        <p className="mb-8 font-semibold tracking-wide text-[#FFFFF0]/80">
          Évolution du prix de l&apos;or (XAU/EUR) sur les {periodData.months}{" "}
          derniers mois.
        </p>

        {/* Time Period Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ALL_PERIODS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`rounded-full px-4 py-2 text-sm ${
                p.href === `/cours-or/${period}`
                  ? "bg-amber-500 font-bold text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {/* TradingView Widget - Full width */}
      <div className="px-4 pb-4">
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <TradingViewWidget
            symbol="OANDA:XAUEUR"
            interval="W"
            range={periodData.range}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 pb-16">
        {/* SEO Content */}
        <section className="max-w-none space-y-8">
          <h2 className="text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Analyse du cours de l&apos;or sur {periodData.label.toLowerCase()}
          </h2>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Ce graphique montre l&apos;évolution du prix de l&apos;or en euros
            sur les {periodData.months} derniers mois. L&apos;or est
            traditionnellement considéré comme une valeur refuge en période
            d&apos;incertitude économique.
          </p>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Sur cette période, observez les tendances haussières et baissières,
            ainsi que les niveaux de support et de résistance qui peuvent guider
            vos décisions d&apos;investissement en pièces d&apos;or bullion.
          </p>

          <h2 className="pt-4 text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Pourquoi suivre le cours de l&apos;or ?
          </h2>
          <ul className="list-disc space-y-3 pl-6 leading-relaxed tracking-wide text-[#FFFFF0]/70">
            <li>
              Identifier les meilleurs moments pour acheter des pièces d&apos;or
            </li>
            <li>Comprendre les cycles long terme du marché de l&apos;or</li>
            <li>Comparer les performances de l&apos;or vs autres actifs</li>
            <li>
              Anticiper les tendances futures basées sur l&apos;historique
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 p-6 text-center">
          <p className="mb-4 text-lg font-semibold text-amber-100">
            Prêt à investir dans l&apos;or physique ?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400"
          >
            Comparer les prix des pièces d&apos;or
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
