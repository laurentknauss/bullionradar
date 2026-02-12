import type { Metadata } from "next";
import Link from "next/link";
import { TradingViewWidget } from "@/components/tradingview-widget";

export const metadata: Metadata = {
  title: "Cours de l'Argent en Direct | Graphique Temps Réel | BullionRadar",
  description:
    "Suivez le cours de l'argent métal en temps réel. Graphique interactif, historique sur 1 an, 5 ans, 10 ans. Prix du gramme et de l'once en euros.",
};

const TIME_PERIODS = [
  { label: "1 An", href: "/cours-argent/1-an" },
  { label: "5 Ans", href: "/cours-argent/5-ans" },
  { label: "10 Ans", href: "/cours-argent/10-ans" },
];

export default function CoursArgentPage() {
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
              href="/cours-or"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cours Or
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-8 pt-16 pb-8">
        <h1 className="mb-4 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          Cours de l&apos;Argent en Direct
        </h1>
        <p className="mb-8 font-semibold tracking-wide text-[#FFFFF0]/80">
          Prix de l&apos;argent métal (XAG/EUR) en temps réel. Dernière mise à
          jour automatique.
        </p>

        {/* Time Period Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-400 px-4 py-2 text-sm font-bold text-black">
            Temps Réel
          </span>
          {TIME_PERIODS.map((period) => (
            <Link
              key={period.href}
              href={period.href}
              className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
            >
              {period.label}
            </Link>
          ))}
        </div>
      </div>

      {/* TradingView Widget - Full width */}
      <div className="px-4 pb-4">
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <TradingViewWidget symbol="XAGEUR" interval="D" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 pb-16">
        {/* SEO Content */}
        <section className="max-w-none space-y-8">
          <h2 className="text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Comment lire le cours de l&apos;argent ?
          </h2>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Le cours de l&apos;argent est exprimé en euros par once troy (31,1
            grammes). L&apos;argent métal est à la fois un métal précieux
            d&apos;investissement et un métal industriel, ce qui influence
            fortement son cours.
          </p>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Pour calculer le prix du gramme d&apos;argent, divisez le cours
            affiché par 31,1. Par exemple, si l&apos;once est à 28€, le gramme
            vaut environ 0,90€.
          </p>

          <h2 className="pt-4 text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Facteurs influençant le cours de l&apos;argent
          </h2>
          <ul className="list-disc space-y-3 pl-6 leading-relaxed tracking-wide text-[#FFFFF0]/70">
            <li>Demande industrielle (électronique, panneaux solaires)</li>
            <li>Ratio or/argent historique (actuellement ~80:1)</li>
            <li>Production minière mondiale</li>
            <li>Demande d&apos;investissement (pièces, lingots, ETF)</li>
            <li>Cours de l&apos;or (corrélation forte)</li>
          </ul>
        </section>
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
