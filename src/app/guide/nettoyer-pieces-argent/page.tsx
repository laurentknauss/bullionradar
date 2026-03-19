import Link from "next/link";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment nettoyer une pièce en argent : guide complet | BullionRadar",
  description:
    "Guide complet pour nettoyer vos pièces en argent sans les abîmer. Méthodes douces (bicarbonate, savon, aluminium), erreurs à éviter et conseils de conservation.",
  alternates: {
    canonical: "https://bullionradar.fr/guide/nettoyer-pieces-argent",
  },
  openGraph: {
    title: "Comment nettoyer une pièce en argent sans l'abîmer",
    description:
      "Méthodes douces, erreurs fatales à éviter et conseils de conservation pour vos pièces d'argent d'investissement.",
    url: "https://bullionradar.fr/guide/nettoyer-pieces-argent",
    images: [
      {
        url: "https://bullionradar.fr/images/og-bullionradar.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Peut-on nettoyer une pièce en argent avec du vinaigre ?",
    a: "Le vinaigre blanc dilué peut être utilisé pour un trempage rapide (quelques secondes), mais il est acide et peut attaquer la surface de l'argent s'il est laissé trop longtemps. Préférez la méthode au bicarbonate de soude, plus douce et plus efficace.",
  },
  {
    q: "Comment enlever l'oxydation noire sur une pièce en argent ?",
    a: "L'oxydation noire (sulfure d'argent) se retire efficacement avec la méthode électrolytique au papier aluminium et bicarbonate. Placez la pièce sur une feuille d'aluminium dans de l'eau chaude avec du bicarbonate : la réaction chimique dissout le sulfure sans retirer de matière.",
  },
  {
    q: "Faut-il nettoyer ses pièces d'argent d'investissement ?",
    a: "Pour les pièces bullion (Maple Leaf, Philharmonique, etc.), un nettoyage léger est acceptable car leur valeur dépend du poids en métal, pas de l'état numismatique. En revanche, ne nettoyez jamais une pièce numismatique rare : cela détruit la patine et peut diviser sa valeur par deux ou plus.",
  },
  {
    q: "Comment conserver ses pièces en argent pour éviter l'oxydation ?",
    a: "Stockez vos pièces dans des capsules individuelles hermétiques ou des tubes spéciaux pour pièces bullion. Évitez les environnements humides et les contacts avec du caoutchouc ou du soufre. Des sachets anti-ternissement (silica gel) dans votre coffre limitent l'humidité.",
  },
  {
    q: "Le dentifrice est-il efficace pour nettoyer l'argent ?",
    a: "Le dentifrice est abrasif et laisse des micro-rayures visibles sur les pièces en argent. C'est l'une des erreurs les plus courantes. Utilisez plutôt du savon de Marseille ou la méthode au bicarbonate, qui sont non-abrasifs.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Préparer le bain",
    text: "Tapissez le fond d'un récipient avec une feuille de papier aluminium, face brillante vers le haut. Versez de l'eau chaude (pas bouillante, environ 70 °C) jusqu'à recouvrir la pièce.",
  },
  {
    name: "Ajouter le bicarbonate",
    text: "Ajoutez une cuillère à soupe de bicarbonate de soude alimentaire par demi-litre d'eau. Mélangez doucement jusqu'à dissolution complète.",
  },
  {
    name: "Placer la pièce",
    text: "Déposez la pièce d'argent directement sur la feuille d'aluminium, en veillant à ce qu'il y ait un contact entre la pièce et l'aluminium. C'est ce contact qui permet la réaction électrolytique.",
  },
  {
    name: "Laisser agir",
    text: "Attendez 2 à 5 minutes. Vous verrez l'oxydation (sulfure d'argent noir) se transférer de la pièce vers l'aluminium. Une légère odeur d'œuf (soufre) est normale.",
  },
  {
    name: "Rincer et sécher",
    text: "Retirez la pièce avec des gants en coton (jamais à mains nues). Rincez-la sous l'eau claire tiède, puis séchez-la en tapotant délicatement avec un chiffon microfibre propre. Ne frottez pas.",
  },
];

export default function NettoyagePiecesArgentPage() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment nettoyer une pièce en argent avec du bicarbonate",
    description:
      "Méthode électrolytique douce pour retirer l'oxydation des pièces d'argent sans les abîmer, en utilisant du papier aluminium et du bicarbonate de soude.",
    totalTime: "PT10M",
    supply: [
      { "@type": "HowToSupply", name: "Papier aluminium" },
      { "@type": "HowToSupply", name: "Bicarbonate de soude alimentaire" },
      { "@type": "HowToSupply", name: "Eau chaude (environ 70 °C)" },
      { "@type": "HowToSupply", name: "Chiffon microfibre" },
      { "@type": "HowToSupply", name: "Gants en coton" },
    ],
    tool: [{ "@type": "HowToTool", name: "Récipient (bol ou plat en verre)" }],
    step: HOWTO_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
            Comment nettoyer une pièce en argent
          </h1>
          <p className="mt-3 text-neutral-300">
            Méthodes douces, erreurs à éviter et conseils de conservation pour
            vos pièces d&apos;argent.
          </p>
        </div>

        {/* Intro */}
        <div className="mb-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <p className="leading-relaxed text-neutral-300">
            Vos pièces en argent ternissent, noircissent ou présentent des
            taches ? C&apos;est normal : l&apos;argent réagit au soufre présent
            dans l&apos;air pour former du{" "}
            <strong className="text-white">sulfure d&apos;argent</strong> (Ag
            <sub>2</sub>S), une couche noire en surface. Bonne nouvelle : cette
            oxydation est{" "}
            <strong className="text-white">purement superficielle</strong> et
            peut être retirée sans abîmer vos pièces — à condition
            d&apos;utiliser les bonnes méthodes.
          </p>
        </div>

        {/* Avertissement bullion vs numismatique */}
        <div className="mb-10 rounded-xl border-2 border-red-500/40 bg-red-900/10 p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-lg font-black text-white">
              !
            </span>
            <h2 className="text-xl font-bold text-red-400">
              Avant de commencer : bullion ou numismatique ?
            </h2>
          </div>
          <p className="text-neutral-300">
            Ce guide concerne les{" "}
            <strong className="text-white">pièces d&apos;argent bullion</strong>{" "}
            (Maple Leaf, Philharmonique, Britannia, Eagles, Hercule, Semeuse…)
            dont la valeur dépend du{" "}
            <strong className="text-white">poids en métal</strong>. Pour ces
            pièces, un nettoyage doux est sans risque.
          </p>
          <p className="mt-3 text-neutral-300">
            <strong className="text-red-400">
              Ne nettoyez jamais une pièce numismatique rare.
            </strong>{" "}
            La patine naturelle fait partie de sa valeur. Un nettoyage, même
            léger, peut{" "}
            <strong className="text-white">
              diviser son prix par deux ou plus
            </strong>
            . En cas de doute, consultez un numismate avant toute intervention.
          </p>
        </div>

        {/* ========================= */}
        {/* METHODE 1 — Bicarbonate + Aluminium */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border-2 border-[#BE943C]/60 bg-neutral-900">
          <div className="bg-[#BE943C] px-6 py-2 text-center">
            <span className="text-sm font-black text-black">
              METHODE RECOMMANDEE
            </span>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
                1
              </span>
              <h2 className="text-xl font-bold text-white">
                Bain électrolytique au bicarbonate et aluminium
              </h2>
            </div>

            <p className="mb-4 text-neutral-300">
              C&apos;est la méthode la plus efficace et la plus sûre. La
              réaction chimique entre l&apos;aluminium et le sulfure
              d&apos;argent{" "}
              <strong className="text-white">
                transfère l&apos;oxydation sans retirer de matière
              </strong>
              . Votre pièce retrouve son éclat sans perdre un milligramme de
              métal précieux.
            </p>

            <div className="mb-4 grid gap-3 md:grid-cols-2">
              {[
                { label: "Durée", value: "5–10 minutes" },
                { label: "Difficulté", value: "Facile" },
                { label: "Coût", value: "< 1 € (bicarbonate + alu)" },
                { label: "Risque pour la pièce", value: "Quasi nul" },
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

            <h3 className="mb-3 text-lg font-bold text-white">
              Matériel nécessaire
            </h3>
            <ul className="mb-6 space-y-1 text-sm text-neutral-300">
              {[
                "Un récipient (bol en verre ou plat)",
                "Du papier aluminium alimentaire",
                "Du bicarbonate de soude alimentaire",
                "De l'eau chaude (environ 70 °C, pas bouillante)",
                "Un chiffon microfibre propre",
                "Des gants en coton (pour manipuler la pièce)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[#BE943C]">-</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mb-3 text-lg font-bold text-white">
              Etapes pas à pas
            </h3>
            <div className="space-y-4">
              {HOWTO_STEPS.map((step, i) => (
                <div key={step.name} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BE943C]/20 text-sm font-bold text-[#BE943C]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.name}</p>
                    <p className="mt-1 text-sm text-neutral-300">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
              <p className="text-sm text-neutral-300">
                <strong className="text-amber-400">Pourquoi ça marche :</strong>{" "}
                la réaction d&apos;oxydo-réduction transfère le soufre (S) du
                sulfure d&apos;argent (Ag<sub>2</sub>S) vers l&apos;aluminium
                (Al). L&apos;argent métallique est restauré sur la pièce, et
                l&apos;aluminium se sulfure à sa place. Aucune perte de métal.
              </p>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* METHODE 2 — Savon de Marseille */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              2
            </span>
            <h2 className="text-xl font-bold text-white">
              Nettoyage doux au savon de Marseille
            </h2>
          </div>

          <p className="mb-4 text-neutral-300">
            Pour un nettoyage d&apos;entretien léger (traces de doigts,
            poussière), le savon de Marseille suffit. Il ne retire pas
            l&apos;oxydation noire mais nettoie la surface sans risque.
          </p>

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            {[
              { label: "Durée", value: "5 minutes" },
              { label: "Efficacité", value: "Légère (traces, poussière)" },
              { label: "Risque pour la pièce", value: "Aucun" },
              { label: "Idéal pour", value: "Entretien régulier" },
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

          <div className="space-y-3">
            {[
              "Faites mousser du savon de Marseille (vrai savon, pas de gel douche) dans de l'eau tiède.",
              "Plongez la pièce et laissez tremper 2–3 minutes.",
              "Frottez très légèrement avec les doigts (gantés en coton) si nécessaire.",
              "Rincez à l'eau claire tiède et séchez en tapotant avec un chiffon microfibre.",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-neutral-300"
              >
                <span className="mt-0.5 shrink-0 text-[#BE943C]">{i + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* METHODE 3 — Eau distillée (trempage long) */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              3
            </span>
            <h2 className="text-xl font-bold text-white">
              Trempage à l&apos;eau distillée
            </h2>
          </div>

          <p className="mb-4 text-neutral-300">
            La méthode la plus douce possible. L&apos;eau distillée (sans
            minéraux ni chlore) dissout lentement les dépôts de surface sans
            aucune réaction chimique agressive. Idéal pour les pièces en argent
            925 (sterling).
          </p>

          <div className="space-y-3">
            {[
              "Placez la pièce dans un récipient en verre rempli d'eau distillée (disponible en pharmacie ou supermarché).",
              "Laissez tremper 24 à 48 heures.",
              "Changez l'eau si elle se trouble.",
              "Séchez en tapotant délicatement avec un chiffon microfibre.",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-neutral-300"
              >
                <span className="mt-0.5 shrink-0 text-[#BE943C]">{i + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* ERREURS A EVITER */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border-2 border-red-500/40 bg-neutral-900 p-6">
          <h2 className="mb-4 text-xl font-bold text-red-400">
            Erreurs à ne jamais commettre
          </h2>

          <div className="space-y-4">
            {[
              {
                error: "Frotter avec du dentifrice",
                why: "Abrasif : laisse des micro-rayures visibles sur l'argent. La pièce paraît propre mais est définitivement endommagée en surface.",
              },
              {
                error: "Utiliser de l'eau de Javel",
                why: "L'hypochlorite de sodium attaque l'argent et provoque des taches blanches irréversibles (chlorure d'argent).",
              },
              {
                error: "Frotter avec une brosse ou un tampon abrasif",
                why: "Les frottements créent des rayures circulaires typiques d'un nettoyage amateur. Sur une pièce bullion, cela n'affecte pas la valeur métal, mais détruit l'aspect.",
              },
              {
                error: 'Utiliser un produit type "Silver Dip" chimique',
                why: "Ces bains acides dissolvent une fine couche d'argent à chaque utilisation. Efficace mais destructif : la pièce perd du poids et les détails s'estompent avec le temps.",
              },
              {
                error: "Manipuler la pièce à mains nues après nettoyage",
                why: "Le sébum et l'acidité de la peau relancent l'oxydation en quelques jours. Utilisez toujours des gants en coton.",
              },
            ].map((item) => (
              <div key={item.error} className="rounded-lg bg-neutral-800 p-4">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-red-400">✕</span>
                  <div>
                    <p className="font-semibold text-white">{item.error}</p>
                    <p className="mt-1 text-sm text-neutral-300">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* CONSERVATION */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              4
            </span>
            <h2 className="text-xl font-bold text-white">
              Conserver ses pièces en argent : prévenir plutôt que guérir
            </h2>
          </div>

          <p className="mb-4 text-neutral-300">
            Le meilleur nettoyage est celui qu&apos;on n&apos;a pas à faire.
            Quelques précautions simples empêchent l&apos;oxydation de se
            former.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Capsules individuelles",
                desc: "Chaque pièce dans sa capsule hermétique en plastique dur (type Leuchtturm ou Lindner). Protège des chocs, de l'air et de l'humidité.",
              },
              {
                title: "Tubes empilables",
                desc: "Pour les pièces bullion achetées en quantité (Maple Leaf, Philharmonique). Les tubes officiels des Monnaies (Royal Canadian Mint, Austrian Mint) sont conçus pour un stockage longue durée.",
              },
              {
                title: "Sachets anti-humidité",
                desc: "Placez des sachets de silica gel dans votre coffre ou tiroir de rangement. L'humidité est le premier facteur d'oxydation.",
              },
              {
                title: "Eviter le contact avec le caoutchouc",
                desc: "Le caoutchouc dégage du soufre, qui accélère le ternissement de l'argent. Pas d'élastiques autour des tubes, pas de tapis en caoutchouc dans le coffre.",
              },
              {
                title: "Ne jamais toucher à mains nues",
                desc: "Manipulez vos pièces avec des gants en coton blanc. Les empreintes digitales provoquent une oxydation localisée très visible avec le temps.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-neutral-800 p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-neutral-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* ARGENT 925 vs 999 */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">
            Nettoyage argent 925 vs argent 999 : quelle différence ?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Critère</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Argent 925 (sterling)
                  </th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Argent 999 (pur)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    c: "Composition",
                    s925: "92,5% argent + 7,5% cuivre",
                    s999: "99,9% argent pur",
                  },
                  {
                    c: "Pièces concernées",
                    s925: "Hercule, Semeuse, Turin",
                    s999: "Maple Leaf, Philharmonique, Britannia",
                  },
                  {
                    c: "Vitesse d'oxydation",
                    s925: "Plus rapide (le cuivre s'oxyde aussi)",
                    s999: "Plus lente",
                  },
                  {
                    c: "Méthode recommandée",
                    s925: "Bicarbonate + aluminium",
                    s999: "Bicarbonate + aluminium ou eau distillée",
                  },
                  {
                    c: "Fragilité",
                    s925: "Plus dur, moins sensible aux rayures",
                    s999: "Plus mou, attention aux frottements",
                  },
                ].map((row) => (
                  <tr key={row.c}>
                    <td className="py-2 font-medium text-white">{row.c}</td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.s925}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.s999}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================= */}
        {/* FAQ */}
        {/* ========================= */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-2 text-lg font-bold text-white">
            Questions fréquentes — Nettoyage pièces argent
          </h2>
          <div className="mt-4 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="rounded-lg bg-neutral-800 p-4">
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-3 text-sm text-neutral-400">
            Comparez les prix des pièces d&apos;argent chez les dealers français
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
              Chimie des réactions d&apos;oxydo-réduction argent/aluminium —
              Sulfure d&apos;argent (Ag<sub>2</sub>S) et réduction
              électrolytique
            </li>
            <li>
              Conservation des métaux précieux — Recommandations des Monnaies
              nationales (Royal Canadian Mint, Perth Mint)
            </li>
            <li>
              Numismatique — Principes de conservation et effets du nettoyage
              sur la valeur des pièces de collection
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
