import Link from "next/link";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Fiscalité or : taxe sur l'or, vente d'or, TMP et plus-values | BullionRadar",
  description:
    "Guide complet fiscalité or et argent en France : taxe métaux précieux (TMP 11,5%), taxe sur l'or à la revente, plus-values (TPV 36,2%), vente d'or anonyme, certificat et succession.",
  alternates: {
    canonical: "https://bullionradar.fr/fiscalite",
  },
  openGraph: {
    title:
      "Fiscalité des métaux précieux en France : TMP, plus-values et donations",
    description:
      "Taxe forfaitaire 11,5% ou plus-values 36,2% avec exonération après 22 ans ? Comparatif des deux régimes, tableau d'abattement et fiscalité des donations.",
    url: "https://bullionradar.fr/fiscalite",
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
    q: "Quelle est la fiscalité de l'or en France ?",
    a: "La fiscalité de l'or à la revente repose sur deux régimes : la taxe sur les métaux précieux (TMP, 11,5% du prix de vente) ou la taxe sur la plus-value (TPV, 36,2% de la plus-value), avec abattement de 5% par an à partir de la 3ème année.",
  },
  {
    q: "Quelle taxe sur l'or s'applique en cas de vente ?",
    a: "Par défaut, la vente d'or est soumise à la TMP. Vous pouvez opter pour la TPV si vous pouvez prouver votre prix et date d'achat avec une facture.",
  },
  {
    q: "Peut-on faire une vente d'or anonyme ?",
    a: "En France, le paiement en espèces est plafonné et les professionnels appliquent les obligations de conformité. Une vente d'or anonyme est donc fortement encadrée en pratique.",
  },
  {
    q: "Peut-on vendre un lingot d'or sans certificat ?",
    a: "Oui, mais la liquidité peut être réduite selon le professionnel. Sans justificatif d'achat, vous risquez d'être imposé au régime TMP par défaut.",
  },
  {
    q: "Lingot d'or non déclaré dans une succession : que faire ?",
    a: "Il faut régulariser la situation successorale avec un professionnel du droit (notaire/avocat fiscaliste). La fiscalité dépend du cadre de déclaration et de transmission retenu.",
  },
  {
    q: "Quelle fiscalité pour la vente de pièces d'or ?",
    a: "La fiscalité de la vente de pièces d'or suit les mêmes règles : TMP 11,5% sur le prix total ou TPV 36,2% sur la plus-value avec abattement selon la durée de détention.",
  },
];

const TPV_TABLE = [
  { year: 0, abatement: 0 },
  { year: 1, abatement: 0 },
  { year: 2, abatement: 0 },
  { year: 3, abatement: 5 },
  { year: 4, abatement: 10 },
  { year: 5, abatement: 15 },
  { year: 6, abatement: 20 },
  { year: 7, abatement: 25 },
  { year: 8, abatement: 30 },
  { year: 9, abatement: 35 },
  { year: 10, abatement: 40 },
  { year: 11, abatement: 45 },
  { year: 12, abatement: 50 },
  { year: 13, abatement: 55 },
  { year: 14, abatement: 60 },
  { year: 15, abatement: 65 },
  { year: 16, abatement: 70 },
  { year: 17, abatement: 75 },
  { year: 18, abatement: 80 },
  { year: 19, abatement: 85 },
  { year: 20, abatement: 90 },
  { year: 21, abatement: 95 },
  { year: 22, abatement: 100 },
];

const DONATION_TABLE = [
  { beneficiary: "Enfant (par parent)", amount: "100 000" },
  {
    beneficiary: "Personne handicapée (suppl.)",
    amount: "159 325",
    note: "Se cumule avec l'abattement de parenté",
  },
  { beneficiary: "Epoux ou partenaire de PACS", amount: "80 724" },
  { beneficiary: "Petit-enfant", amount: "31 865" },
  { beneficiary: "Frère ou soeur", amount: "15 932" },
  { beneficiary: "Neveu ou nièce", amount: "7 967" },
  { beneficiary: "Arrière-petit-enfant", amount: "5 310" },
  {
    beneficiary: "Concubin / non parenté",
    amount: "0",
    note: "Taxation à 60%",
  },
];

export default function FiscalitePage() {
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
      {/* Header */}
      <header className="mb-10 border-b border-amber-600/30 bg-[#BE943C]">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
          <Link href="/" className="shrink-0">
            <img
              src="/images/header-bullionradar.jpeg"
              alt="BullionRadar"
              className="h-24 w-auto rounded-lg md:h-32"
            />
          </Link>
          <div className="flex flex-1 items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black text-black hover:text-neutral-800 md:text-3xl"
            >
              BullionRadar
            </Link>
            <Link
              href="/"
              className="rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/20"
            >
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black md:text-4xl">
            Fiscalité des métaux précieux en France
          </h1>
          <p className="mt-3 text-neutral-300">
            Tout ce qu&apos;il faut savoir avant de revendre vos pièces
            d&apos;or ou d&apos;argent.
          </p>
        </div>

        {/* Image */}
        <div className="mb-12 overflow-hidden rounded-xl">
          <img
            src="/images/fiscalite-metaux-precieux.png"
            alt="Balance symbolisant la fiscalité des métaux précieux — pièces d'or et documents fiscaux"
            className="w-full"
          />
        </div>

        {/* Intro */}
        <div className="mb-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <p className="leading-relaxed text-neutral-300">
            L&apos;or et l&apos;argent d&apos;investissement sont{" "}
            <strong className="text-white">
              exonérés de TVA à l&apos;achat
            </strong>{" "}
            en France. En revanche, lors de la{" "}
            <strong className="text-white">revente</strong>, le vendeur est
            soumis à l&apos;un des deux régimes fiscaux suivants : la{" "}
            <strong className="text-[#BE943C]">
              Taxe sur les Métaux Précieux (TMP)
            </strong>{" "}
            ou la{" "}
            <strong className="text-[#BE943C]">
              Taxe sur les Plus-Values (TPV)
            </strong>
            . Le choix entre les deux dépend de votre situation — et peut vous
            faire économiser des milliers d&apos;euros.
          </p>
        </div>

        {/* ========================= */}
        {/* SECTION 1 — TMP */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              1
            </span>
            <h2 className="text-xl font-bold text-white">
              TMP — Taxe sur les Métaux Précieux (11,5%)
            </h2>
          </div>

          <p className="mb-4 text-neutral-300">
            C&apos;est le régime par défaut. Un prélèvement forfaitaire de{" "}
            <strong className="text-white">11,5%</strong> est appliqué sur le{" "}
            <strong className="text-white">montant total de la vente</strong> —
            qu&apos;il y ait plus-value ou non.
          </p>

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            {[
              {
                label: "Taux global",
                value: "11,5% (11% taxe + 0,5% CRDS)",
              },
              {
                label: "Base de calcul",
                value: "Prix de vente total",
              },
              {
                label: "Déclaration",
                value: "Formulaire N°2091",
              },
              {
                label: "Collecte",
                value: "Par l'acheteur professionnel",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-neutral-800 px-3 py-2"
              >
                <p className="text-xs font-semibold text-[#BE943C]">
                  {item.label}
                </p>
                <p className="text-sm text-neutral-300">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
            <p className="text-sm text-neutral-300">
              <strong className="text-amber-400">Exemple :</strong> Vous
              revendez un Napoléon 20 Francs pour 450 €. La TMP s&apos;élève à
              450 × 11,5% = <strong className="text-white">51,75 €</strong>.
              Vous recevez 398,25 €, que vous ayez acheté le Napoléon 300 € ou
              500 €.
            </p>
          </div>

          <p className="mt-4 text-sm text-neutral-400">
            <strong className="text-neutral-300">Référence :</strong> Art. 150
            VI du Code Général des Impôts
          </p>
        </div>

        {/* ========================= */}
        {/* SECTION 2 — TPV */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border-2 border-[#BE943C]/60 bg-neutral-900">
          <div className="bg-[#BE943C] px-6 py-2 text-center">
            <span className="text-sm font-black text-black">
              LE REGIME LE PLUS AVANTAGEUX SUR LE LONG TERME
            </span>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
                2
              </span>
              <h2 className="text-xl font-bold text-white">
                TPV — Taxe sur les Plus-Values (36,2%)
              </h2>
            </div>

            <p className="mb-4 text-neutral-300">
              Ce régime optionnel taxe uniquement la{" "}
              <strong className="text-white">plus-value réalisée</strong> à
              hauteur de <strong className="text-white">36,2%</strong> (19%
              d&apos;impôt sur le revenu + 17,2% de prélèvements sociaux). Son
              avantage majeur : un{" "}
              <strong className="text-[#BE943C]">
                abattement de 5% par an
              </strong>{" "}
              à partir de la 3ème année, menant à une{" "}
              <strong className="text-[#BE943C]">
                exonération totale après 22 ans
              </strong>
              .
            </p>

            <div className="mb-4 grid gap-3 md:grid-cols-2">
              {[
                {
                  label: "Taux global",
                  value: "36,2% (19% IR + 17,2% PS)",
                },
                {
                  label: "Base de calcul",
                  value: "Plus-value uniquement",
                },
                {
                  label: "Déclaration",
                  value: "Formulaire N°2091-SD (spontanée)",
                },
                {
                  label: "Condition",
                  value: "Justifier prix et date d'achat (facture)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-neutral-800 px-3 py-2"
                >
                  <p className="text-xs font-semibold text-[#BE943C]">
                    {item.label}
                  </p>
                  <p className="text-sm text-neutral-300">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 space-y-2">
              {[
                "Aucun impôt en cas de moins-value (quelle que soit la durée de détention)",
                "Abattement de 5% par an dès la 3ème année de détention",
                "Exonération totale au bout de 22 ans de détention",
                "Le vendeur déclare spontanément dans le mois suivant la cession",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2 text-sm text-neutral-300"
                >
                  <span className="mt-0.5 shrink-0 text-green-400">✓</span>
                  {point}
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
              <p className="text-sm text-neutral-300">
                <strong className="text-amber-400">Exemple :</strong> Vous avez
                acheté un Krugerrand 1 oz à 1 500 € il y a 10 ans. Vous le
                revendez 2 800 €. Plus-value = 1 300 €. Après 10 ans,
                l&apos;abattement est de 40%. TPV effective = 1 300 × 60% ×
                36,2% = <strong className="text-white">282,36 €</strong>. Avec
                la TMP, vous auriez payé 2 800 × 11,5% = 322 €.
              </p>
            </div>

            <p className="mt-4 text-sm text-neutral-400">
              <strong className="text-neutral-300">Référence :</strong> Art. 150
              VL, 150 VM et 150 VC du Code Général des Impôts
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* TABLEAU ABATTEMENT TPV */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-white">
            Tableau d&apos;abattement TPV par durée de détention
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Année</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Abattement
                  </th>
                  <th className="pb-2 text-right text-[#BE943C]">
                    TPV effective
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {TPV_TABLE.map((row) => {
                  const effective = (36.2 * (100 - row.abatement)) / 100;
                  const isExempt = row.abatement === 100;
                  const isHighlight =
                    row.year === 3 || row.year === 10 || row.year === 22;
                  return (
                    <tr
                      key={row.year}
                      className={
                        isExempt
                          ? "bg-green-900/20"
                          : isHighlight
                            ? "bg-[#BE943C]/10"
                            : ""
                      }
                    >
                      <td
                        className={`py-1.5 font-medium ${isExempt ? "text-green-400" : "text-white"}`}
                      >
                        {row.year} an{row.year > 1 ? "s" : ""}
                      </td>
                      <td className="py-1.5 text-center text-neutral-300">
                        {row.abatement}%
                      </td>
                      <td
                        className={`py-1.5 text-right font-medium ${isExempt ? "text-green-400" : "text-neutral-300"}`}
                      >
                        {isExempt
                          ? "0% — Exonération totale"
                          : `${effective.toFixed(2).replace(".", ",")}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Art. 150 VL du CGI — Décote de 5% par an à partir de la 3ème année
          </p>
        </div>

        {/* ========================= */}
        {/* COMPARATIF TMP vs TPV */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-white">
            TMP ou TPV : quel régime choisir ?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Critère</th>
                  <th className="pb-2 text-center text-[#BE943C]">TMP</th>
                  <th className="pb-2 text-center text-[#BE943C]">TPV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    c: "Taux",
                    tmp: "11,5% du prix total",
                    tpv: "36,2% de la plus-value",
                  },
                  {
                    c: "Facture d'achat requise",
                    tmp: "Non",
                    tpv: "Oui (obligatoire)",
                  },
                  {
                    c: "Abattement durée",
                    tmp: "Aucun",
                    tpv: "5%/an dès 3 ans",
                  },
                  {
                    c: "Exonération totale",
                    tmp: "Jamais",
                    tpv: "Après 22 ans",
                  },
                  {
                    c: "En cas de moins-value",
                    tmp: "Taxe quand même due",
                    tpv: "Aucun impôt",
                  },
                  {
                    c: "Déclaration",
                    tmp: "Par le professionnel",
                    tpv: "Par le vendeur (spontanée)",
                  },
                ].map((row) => (
                  <tr key={row.c}>
                    <td className="py-2 font-medium text-white">{row.c}</td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.tmp}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.tpv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-neutral-800 p-3">
              <p className="text-sm text-neutral-300">
                <strong className="text-[#BE943C]">
                  Choisissez la TMP si :
                </strong>{" "}
                vous n&apos;avez pas de facture d&apos;achat, ou si vous
                revendez rapidement (moins de 3 ans) avec une forte plus-value.
              </p>
            </div>
            <div className="rounded-lg bg-neutral-800 p-3">
              <p className="text-sm text-neutral-300">
                <strong className="text-[#BE943C]">
                  Choisissez la TPV si :
                </strong>{" "}
                vous avez la facture d&apos;achat et détenez vos pièces depuis
                plus de 3 ans. Plus la durée est longue, plus l&apos;avantage
                est important.
              </p>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* SECTION 3 — DONATIONS */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              3
            </span>
            <h2 className="text-xl font-bold text-white">
              Fiscalité sur la donation de métaux précieux
            </h2>
          </div>

          <p className="mb-4 text-neutral-300">
            Les pièces d&apos;or et d&apos;argent sont{" "}
            <strong className="text-white">
              soumises aux droits de donation
            </strong>
            . Des abattements existent selon le lien de parenté entre le
            donateur et le bénéficiaire. Ces abattements sont{" "}
            <strong className="text-[#BE943C]">
              renouvelables tous les 15 ans
            </strong>{" "}
            et <strong className="text-[#BE943C]">cumulables</strong> entre eux.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">
                    Bénéficiaire
                  </th>
                  <th className="pb-2 text-right text-[#BE943C]">Abattement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {DONATION_TABLE.map((row) => (
                  <tr
                    key={row.beneficiary}
                    className={row.amount === "0" ? "bg-red-900/10" : ""}
                  >
                    <td className="py-2 text-white">
                      <span className="font-medium">{row.beneficiary}</span>
                      {row.note && (
                        <span className="ml-2 text-xs text-neutral-400">
                          ({row.note})
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-2 text-right font-medium ${row.amount === "0" ? "text-red-400" : "text-white"}`}
                    >
                      {row.amount === "0" ? "Aucun" : `${row.amount} €`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
            <p className="text-sm text-neutral-300">
              <strong className="text-amber-400">Exemple :</strong> Un couple
              peut transmettre jusqu&apos;à{" "}
              <strong className="text-white">200 000 € par enfant</strong> (100
              000 € par parent) en pièces d&apos;or tous les 15 ans, sans aucun
              droit de donation.
            </p>
          </div>

          <p className="mt-4 text-sm text-neutral-400">
            <strong className="text-neutral-300">Attention :</strong> les
            concubins et les personnes sans lien de parenté ne bénéficient
            d&apos;aucun abattement — la donation est taxée à 60% dès le premier
            euro.
          </p>

          <p className="mt-2 text-sm text-neutral-400">
            <strong className="text-neutral-300">Référence :</strong> Art. 790
            B, 790 C, 790 D, 790 E et 790 F du Code Général des Impôts
          </p>
        </div>

        {/* ========================= */}
        {/* CONSEIL PRATIQUE */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">
            Le conseil BullionRadar
          </h2>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>
              <strong className="text-[#BE943C]">1.</strong>{" "}
              <strong className="text-white">
                Conservez toujours vos factures d&apos;achat.
              </strong>{" "}
              Sans elles, vous serez contraint d&apos;opter pour la TMP — même
              si la TPV serait bien plus avantageuse.
            </p>
            <p>
              <strong className="text-[#BE943C]">2.</strong>{" "}
              <strong className="text-white">
                Privilégiez une détention longue.
              </strong>{" "}
              Après 22 ans, vos pièces sont totalement exonérées sous le régime
              TPV. C&apos;est l&apos;un des rares placements à offrir cette
              possibilité en France.
            </p>
            <p>
              <strong className="text-[#BE943C]">3.</strong>{" "}
              <strong className="text-white">
                Pensez à la donation planifiée.
              </strong>{" "}
              Les abattements renouvelables tous les 15 ans permettent de
              transmettre un patrimoine en or significatif sans fiscalité, à
              condition d&apos;anticiper.
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-2 text-lg font-bold text-white">
            FAQ fiscalité or, taxe or et vente d&apos;or
          </h2>
          <p className="mb-4 text-sm text-neutral-300">
            Réponses rapides aux recherches les plus fréquentes sur la fiscalité
            de l&apos;or physique en France.
          </p>
          <p className="mb-4 text-xs text-neutral-400">
            Requêtes couvertes : vente or, vendre de l&apos;or, fiscalité vente
            or, taxe vente or, achat et vente d&apos;or, vente or anonyme
            fiscalité, réglementation vente d&apos;or, vente de pièces d&apos;or
            fiscalité.
          </p>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="rounded-lg bg-neutral-800 p-4">
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-300">
            Pour aller plus loin, consulte aussi le{" "}
            <Link href="/guide" className="text-[#BE943C] underline">
              guide d&apos;investissement
            </Link>{" "}
            et le{" "}
            <Link href="/" className="text-[#BE943C] underline">
              comparateur de pièces
            </Link>
            .
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-3 text-sm text-neutral-400">
            Comparez les prix avant d&apos;acheter vos pièces
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#BE943C] px-6 py-3 text-sm font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
          >
            Voir le comparateur de prix →
          </Link>
        </div>

        {/* Sources */}
        <div className="mt-12 border-t border-neutral-800 pt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Sources
          </p>
          <ul className="space-y-1 text-xs text-neutral-600">
            <li>
              Code Général des Impôts — Art. 150 VI (TMP), Art. 150 VL et 150 VC
              (TPV), Art. 790 B à 790 F (donations)
            </li>
            <li>
              BOFiP — BOI-RPPM-PVBMC-20-10 (taxe forfaitaire) et
              BOI-RPPM-PVBMC-20-20 (option plus-values)
            </li>
            <li>Service-public.gouv.fr — Droits de donation (F14205)</li>
            <li>Notaires de France — Comment est imposée une donation</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
