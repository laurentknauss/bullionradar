import type { Metadata } from "next";
import Link from "next/link";
import { TradingViewWidget } from "@/components/tradingview-widget";

export const metadata: Metadata = {
  title: "Cours de l'Or en Direct | Graphique Temps Réel | BullionRadar",
  description:
    "Suivez le cours de l'or en temps réel. Graphique interactif, historique sur 1 an, 5 ans, 10 ans, 20 ans. Prix du gramme et de l'once en euros.",
};

const TIME_PERIODS = [
  { label: "1 An", href: "/cours-or/1-an" },
  { label: "5 Ans", href: "/cours-or/5-ans" },
  { label: "10 Ans", href: "/cours-or/10-ans" },
  { label: "20 Ans", href: "/cours-or/20-ans" },
];

export default function CoursOrPage() {
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
              href="/cours-argent"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cours Argent
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-8 py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          Cours de l&apos;Or en Direct
        </h1>
        <p className="mb-8 font-semibold tracking-wide text-[#FFFFF0]/80">
          Prix de l&apos;or (XAU/EUR) en temps réel. Dernière mise à jour
          automatique.
        </p>

        {/* Time Period Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-black">
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

        {/* TradingView Widget */}
        <div className="mb-12 overflow-hidden rounded-xl border border-neutral-800">
          <TradingViewWidget symbol="XAUEUR" interval="D" />
        </div>

        {/* SEO Content */}
        <section className="max-w-none space-y-8">
          <h2 className="text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Comment lire le cours de l&apos;or ?
          </h2>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Le cours de l&apos;or est exprimé en euros par once troy (31,1
            grammes). Le graphique ci-dessus montre l&apos;évolution du prix
            spot de l&apos;or, c&apos;est-à-dire le prix de référence sur les
            marchés internationaux.
          </p>
          <p className="leading-relaxed tracking-wide text-[#FFFFF0]/70">
            Pour calculer le prix du gramme d&apos;or, divisez le cours affiché
            par 31,1. Par exemple, si l&apos;once est à 2 800€, le gramme vaut
            environ 90€.
          </p>

          <h2 className="pt-4 text-xl font-semibold tracking-wide text-[#FFFFF0]">
            Facteurs influençant le cours de l&apos;or
          </h2>
          <ul className="list-disc space-y-3 pl-6 leading-relaxed tracking-wide text-[#FFFFF0]/70">
            <li>Politique monétaire des banques centrales (Fed, BCE)</li>
            <li>Inflation et taux d&apos;intérêt réels</li>
            <li>Tensions géopolitiques et incertitudes économiques</li>
            <li>Demande des bijoutiers et industriels</li>
            <li>Achats des banques centrales (Chine, Russie, Inde)</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-500">
        <p>© 2026 BullionRadar - Données fournies par TradingView</p>
      </footer>
    </main>
  );
}
