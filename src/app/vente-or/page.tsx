import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title:
    "Vente d'or : fiscalité, taxe vente or et revente lingot | BullionRadar",
  description:
    "Guide pratique vente or en France : taxe sur la vente d'or, fiscalité vente or, vente de pièces et lingots, revente sans certificat et points de vigilance.",
  alternates: {
    canonical: "https://bullionradar.fr/vente-or",
  },
  openGraph: {
    title: "Vente d'or en France : fiscalité, taxe et démarches",
    description:
      "Tout savoir pour vendre de l'or: taxe vente or, fiscalité vente de pièces d'or, lingots avec ou sans certificat, conformité et documents utiles.",
    url: "https://bullionradar.fr/vente-or",
    images: [
      {
        url: "https://bullionradar.fr/images/fiscalite-metaux-precieux.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Quelle fiscalité pour la vente d'or en France ?",
    a: "La vente d'or est soumise soit à la TMP (11,5% du prix de vente), soit au régime des plus-values (TPV 36,2% sur la plus-value) si vous disposez de justificatifs d'achat.",
  },
  {
    q: "Quelle taxe sur la vente d'or s'applique le plus souvent ?",
    a: "Sans facture d'achat, c'est généralement la taxe sur les métaux précieux (TMP) qui s'applique.",
  },
  {
    q: "Peut-on vendre un lingot d'or sans certificat ?",
    a: "Oui, mais la revente peut être moins fluide selon le professionnel. Des justificatifs d'origine et d'achat restent fortement recommandés.",
  },
  {
    q: "Achat et vente d'or : quels points de vigilance ?",
    a: "Conservez toutes les factures, vérifiez la traçabilité des pièces/lingots et anticipez le régime fiscal de sortie avant l'achat.",
  },
];

export default function VenteOrPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-bg-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b border-neutral-800 p-4">
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
              className="text-sm text-neutral-300 hover:text-white"
            >
              Accueil
            </Link>
            <Link
              href="/fiscalite"
              className="text-sm text-neutral-300 hover:text-white"
            >
              Fiscalité
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-black md:text-4xl">
          Vente d&apos;or : fiscalité, taxe et revente de lingots ou pièces
        </h1>
        <p className="mt-4 text-neutral-300">
          Cette page répond aux recherches comme{" "}
          <strong className="text-white">vente or</strong>,{" "}
          <strong className="text-white">vendre de l&apos;or</strong>,{" "}
          <strong className="text-white">taxe vente or</strong> et{" "}
          <strong className="text-white">fiscalité vente or</strong>, avec une
          approche pratique pour vendre dans de bonnes conditions.
        </p>

        <section className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-bold">
            1) Quelle taxe s&apos;applique à la vente d&apos;or ?
          </h2>
          <p className="mt-3 text-neutral-300">
            En France, la vente d&apos;or peut relever de deux régimes: TMP
            (11,5% du montant de cession) ou TPV (36,2% sur la plus-value). Le
            choix dépend surtout de la présence de justificatifs d&apos;achat.
          </p>
          <p className="mt-3 text-neutral-300">
            Pour une simulation complète, consulte la page{" "}
            <Link href="/fiscalite" className="text-[#BE943C] underline">
              fiscalité des métaux précieux
            </Link>
            .
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-bold">
            2) Vendre un lingot d&apos;or sans certificat: ce qu&apos;il faut
            savoir
          </h2>
          <p className="mt-3 text-neutral-300">
            La revente d&apos;un lingot d&apos;or sans certificat est possible,
            mais certains acheteurs appliquent des contrôles renforcés ou une
            décote. Conserver facture, preuve d&apos;origine et historique de
            détention reste la meilleure protection.
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-bold">
            3) Achat et vente d&apos;or: méthode simple avant de revendre
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
            <li>Archiver les factures d&apos;achat (date, prix, vendeur).</li>
            <li>Comparer plusieurs offres de rachat le même jour.</li>
            <li>Vérifier à l&apos;avance le régime fiscal applicable.</li>
            <li>
              Documenter clairement toute opération de succession/donation.
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-3 text-xl font-bold">
            FAQ vente or, taxe sur vente or et fiscalité
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <article key={item.q} className="rounded-lg bg-neutral-800 p-4">
                <h3 className="font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#BE943C] px-6 py-3 text-sm font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
          >
            Voir le comparateur de prix →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
