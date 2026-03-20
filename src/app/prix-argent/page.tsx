import Link from "next/link";
import { Footer } from "@/components/footer";
import { SilverPriceCalculator } from "@/components/silver-price-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Prix de l'argent au gramme et au kilo — Calculateur argent 925/999 | BullionRadar",
  description:
    "Prix de l'argent au gramme, au kilo et à l'once en euros. Calculateur pour argent 925, 900 et 999. Prix du gramme d'argent aujourd'hui, estimation de rachat et valeur de l'argenterie.",
  alternates: {
    canonical: "https://bullionradar.fr/prix-argent",
  },
  openGraph: {
    title: "Prix de l'argent au gramme — Calculateur argent 925 et 999",
    description:
      "Calculez la valeur de votre argent en euros : prix au gramme, au kilo, argenterie 925, pièces 900. Estimation de rachat incluse.",
    url: "https://bullionradar.fr/prix-argent",
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
    q: "Quel est le prix de l'argent au gramme aujourd'hui ?",
    a: "Le prix du gramme d'argent pur (999) se calcule en divisant le cours de l'once troy par 31,1035. Par exemple, si l'once est cotée à 31 €, le gramme d'argent pur vaut environ 1,00 €. Pour l'argent 925 (sterling), multipliez par 0,925.",
  },
  {
    q: "Comment calculer le prix de l'argent au kilo ?",
    a: "Multipliez le prix du gramme par 1 000. Si le gramme d'argent pur vaut 1,00 €, le kilo vaut environ 1 000 €. Pour l'argenterie en argent 925, le kilo de métal vaut environ 925 €, soit 92,5 % de la valeur de l'argent pur.",
  },
  {
    q: "Quelle est la différence entre argent 925 et argent 999 ?",
    a: "L'argent 999 (aussi appelé « argent fin ») est pur à 99,9 %. C'est le standard des pièces bullion modernes (Maple Leaf, Philharmonique, Britannia). L'argent 925 (sterling) contient 92,5 % d'argent et 7,5 % de cuivre — c'est le standard de l'argenterie et de certaines pièces françaises (Semeuse, Turin).",
  },
  {
    q: "Combien vaut l'argenterie au kilo ?",
    a: "L'argenterie est généralement en argent 925. Sa valeur au kilo se calcule ainsi : prix du gramme d'argent pur × 0,925 × 1 000. En pratique, un racheteur professionnel proposera 80 à 90 % de cette valeur métal, pour couvrir l'affinage et sa marge.",
  },
  {
    q: "Quel est le prix de rachat de l'argent ?",
    a: "Le prix de rachat de l'argent physique (pièces, lingots, argenterie) se situe généralement entre 80 % et 90 % de la valeur métal au cours spot. La décote dépend de la forme (pièces bullion vs argenterie), de la quantité, et du professionnel. Les pièces bullion reconnues (Maple Leaf, Eagles) se revendent plus facilement avec une moindre décote.",
  },
  {
    q: "Comment savoir si mon argent est du 925 ou du 999 ?",
    a: "Vérifiez les poinçons : les pièces bullion modernes indiquent généralement « 999 » ou « Fine Silver ». L'argenterie porte le poinçon Minerve (tête de femme casquée) pour l'argent 925 en France, ou le poinçon 800 pour l'argent à 80 %. Les pièces françaises anciennes (Hercule, Semeuse) sont en argent 835 ou 900 selon les époques.",
  },
];

export default function PrixArgentPage() {
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

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur prix argent — BullionRadar",
    description:
      "Calculez la valeur de votre argent en euros : prix au gramme, au kilo, argenterie 925, pièces 900 et 999.",
    url: "https://bullionradar.fr/prix-argent",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <main className="min-h-screen bg-bg-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
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
            Prix de l&apos;argent au gramme et au kilo
          </h1>
          <p className="mt-3 text-lg text-neutral-300">
            Calculez la valeur de votre argent en euros — pièces, lingots et
            argenterie (925, 900, 999).
          </p>
        </div>

        {/* Intro */}
        <div className="mb-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <p className="text-lg leading-relaxed text-neutral-300">
            Le prix du gramme d&apos;argent dépend du{" "}
            <strong className="text-white">cours spot</strong> (coté en euros
            par once troy sur les marchés) et du{" "}
            <strong className="text-white">titre</strong> (pureté) de votre
            argent. Une once troy = 31,1035 grammes. Utilisez le calculateur
            ci-dessous pour estimer la valeur de votre argent au cours
            d&apos;aujourd&apos;hui.
          </p>
        </div>

        {/* Calculator */}
        <SilverPriceCalculator />

        {/* ========================= */}
        {/* SECTION — Argenterie */}
        {/* ========================= */}
        <div className="mt-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              1
            </span>
            <h2 className="text-xl font-bold text-white">
              Prix de l&apos;argenterie au kilo
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            L&apos;argenterie de table (couverts, plateau, bougeoirs) est
            généralement en{" "}
            <strong className="text-white">argent 925 (sterling)</strong> en
            France, identifiable par le{" "}
            <strong className="text-white">poinçon Minerve</strong>. Sa valeur
            au kilo correspond à 92,5% du prix de l&apos;argent pur.
          </p>

          <div className="space-y-3">
            {[
              "Pesez votre argenterie (hors manches de couteaux lestés au ciment).",
              "Vérifiez le poinçon : Minerve (925), Cygne (800) ou autre.",
              "Utilisez le calculateur ci-dessus avec le poids et le titre correspondant.",
              "Appliquez une décote de 10 à 20% pour le rachat professionnel.",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-base text-neutral-300"
              >
                <span className="mt-0.5 shrink-0 text-[#BE943C]">{i + 1}.</span>
                {step}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
            <p className="text-base leading-relaxed text-neutral-300">
              <strong className="text-amber-400">Attention :</strong> les
              couteaux à manches en argent sont souvent lestés (ciment ou résine
              à l&apos;intérieur). Seule la lame et le manche en argent
              comptent. Un couvert classique pèse environ 60–100g tout compris,
              mais la quantité d&apos;argent réelle est moindre.
            </p>
          </div>

          {/* Balance de précision */}
          <div className="mt-6 rounded-xl border border-neutral-700 bg-neutral-800 p-5">
            <h3 className="mb-3 text-lg font-bold text-white">
              Un outil indispensable : la balance de précision de poche
            </h3>
            <p className="text-base leading-relaxed text-neutral-300">
              Pour peser vos pièces et votre argenterie avec exactitude, une
              petite{" "}
              <strong className="text-white">
                balance de précision numérique
              </strong>{" "}
              est un investissement très utile. Des modèles comme la{" "}
              <strong className="text-white">Dipse TP</strong> (marque
              allemande) offrent une précision de{" "}
              <strong className="text-white">0,01 g</strong> pour environ 15 à
              25 €. Elles tiennent dans la paume de la main et fonctionnent sur
              piles.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                {
                  label: "Précision",
                  value: "0,01 g (au centième de gramme)",
                },
                {
                  label: "Capacité",
                  value: "200 g à 2 000 g selon le modèle",
                },
                {
                  label: "Unités",
                  value: "Grammes, onces troy, carats, grains",
                },
                {
                  label: "Prix",
                  value: "15 – 25 € (Amazon, boutiques numismatiques)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-neutral-900 px-4 py-3"
                >
                  <p className="text-sm text-neutral-400">{item.label}</p>
                  <p className="text-base font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              Ces balances de poche sont aussi pratiques pour{" "}
              <strong className="text-white">
                vérifier l&apos;authenticité
              </strong>{" "}
              de vos pièces d&apos;or et d&apos;argent : une pièce dont le poids
              s&apos;écarte de la valeur officielle est suspecte. Par exemple,
              un Napoléon 20 Francs doit peser exactement 6,45 g et une Maple
              Leaf 1 oz argent exactement 31,10 g.
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* SECTION — Pièces françaises */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              2
            </span>
            <h2 className="text-xl font-bold text-white">
              Valeur des pièces françaises en argent
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Les pièces françaises en argent ont une valeur qui dépend de leur
            poids en argent pur multiplié par le cours du jour. Voici les pièces
            les plus courantes :
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Pièce</th>
                  <th className="pb-2 text-center text-[#BE943C]">Poids</th>
                  <th className="pb-2 text-center text-[#BE943C]">Titre</th>
                  <th className="pb-2 text-right text-[#BE943C]">Argent pur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    name: "50 Francs Hercule",
                    weight: "30 g",
                    fineness: "900",
                    pure: "27 g",
                  },
                  {
                    name: "10 Francs Hercule",
                    weight: "25 g",
                    fineness: "900",
                    pure: "22,5 g",
                  },
                  {
                    name: "5 Francs Semeuse",
                    weight: "12 g",
                    fineness: "835",
                    pure: "10 g",
                  },
                  {
                    name: "20 Francs Turin",
                    weight: "20 g",
                    fineness: "680",
                    pure: "13,6 g",
                  },
                  {
                    name: "10 Francs Turin",
                    weight: "10 g",
                    fineness: "680",
                    pure: "6,8 g",
                  },
                  {
                    name: "100 Francs Panthéon",
                    weight: "15 g",
                    fineness: "900",
                    pure: "13,5 g",
                  },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-2 font-medium text-white">{row.name}</td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.weight}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.fineness}
                    </td>
                    <td className="py-2 text-right font-medium text-white">
                      {row.pure}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base text-neutral-400">
            Pour connaître la valeur actuelle d&apos;une pièce, entrez son poids
            en argent pur dans le calculateur ci-dessus.{" "}
            <Link
              href="/"
              className="text-[#BE943C] underline hover:text-amber-300"
            >
              Comparez aussi les prix des dealers
            </Link>{" "}
            pour les pièces françaises en argent.
          </p>
        </div>

        {/* ========================= */}
        {/* SECTION — Rachat */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              3
            </span>
            <h2 className="text-xl font-bold text-white">
              Prix de rachat de l&apos;argent
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Le prix de rachat de l&apos;argent physique par un professionnel est
            toujours inférieur au cours spot. La décote dépend de la forme et de
            la liquidité du produit :
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Produit</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Décote typique
                  </th>
                  <th className="pb-2 text-right text-[#BE943C]">
                    Vous recevez
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    product: "Pièces bullion (Maple Leaf, Eagle)",
                    discount: "5–15%",
                    receive: "85–95%",
                  },
                  {
                    product: "Pièces françaises (Hercule, Semeuse)",
                    discount: "10–20%",
                    receive: "80–90%",
                  },
                  {
                    product: "Lingots (1 oz à 1 kg)",
                    discount: "5–10%",
                    receive: "90–95%",
                  },
                  {
                    product: "Argenterie (925)",
                    discount: "15–25%",
                    receive: "75–85%",
                  },
                ].map((row) => (
                  <tr key={row.product}>
                    <td className="py-2 font-medium text-white">
                      {row.product}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.discount}
                    </td>
                    <td className="py-2 text-right text-neutral-300">
                      {row.receive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base text-neutral-400">
            Les pièces bullion reconnues internationalement se revendent plus
            facilement et avec une moindre décote que l&apos;argenterie ou les
            pièces peu connues.{" "}
            <Link
              href="/fiscalite"
              className="text-[#BE943C] underline hover:text-amber-300"
            >
              Consultez aussi la fiscalité applicable à la revente
            </Link>
            .
          </p>
        </div>

        {/* ========================= */}
        {/* SECTION — Comprendre les unités */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              4
            </span>
            <h2 className="text-xl font-bold text-white">
              Once troy, gramme, kilo : comprendre les unités
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Le cours de l&apos;argent est coté en{" "}
            <strong className="text-white">once troy</strong> sur les marchés
            internationaux. Cette unité, héritée du système de poids de Troyes
            (ville de Champagne, centre du commerce médiéval européen), est
            différente de l&apos;once ordinaire (avoirdupois) utilisée dans la
            vie courante.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Unité</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Equivalence
                  </th>
                  <th className="pb-2 text-right text-[#BE943C]">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    unit: "Once troy (oz t)",
                    equiv: "31,1035 g",
                    usage: "Cotation marchés (LBMA, COMEX)",
                  },
                  {
                    unit: "Once avoirdupois (oz)",
                    equiv: "28,3495 g",
                    usage: "Usage courant anglo-saxon (cuisine, colis)",
                  },
                  {
                    unit: "Gramme (g)",
                    equiv: "1/31,1035 oz t",
                    usage: "Bijouterie, argenterie, petites quantités",
                  },
                  {
                    unit: "Kilogramme (kg)",
                    equiv: "32,1507 oz t",
                    usage: "Lingots, grosses transactions",
                  },
                ].map((row) => (
                  <tr key={row.unit}>
                    <td className="py-2 font-medium text-white">{row.unit}</td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.equiv}
                    </td>
                    <td className="py-2 text-right text-neutral-300">
                      {row.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-amber-600/20 bg-amber-900/10 px-4 py-3">
            <p className="text-base leading-relaxed text-neutral-300">
              <strong className="text-amber-400">Piège courant :</strong> ne
              confondez pas once troy et once avoirdupois. La différence est de
              ~10%. Quand un site affiche « prix de l&apos;argent à l&apos;once
              », il s&apos;agit toujours de l&apos;once troy (31,1 g), pas de
              l&apos;once courante (28,3 g).
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* SECTION — Poinçons */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              5
            </span>
            <h2 className="text-xl font-bold text-white">
              Comment savoir si votre objet est en argent ?
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Avant de calculer la valeur de votre argenterie ou de vos pièces, il
            faut déterminer la{" "}
            <strong className="text-white">pureté de l&apos;argent</strong>.
            Pour cela, cherchez un{" "}
            <strong className="text-white">petit symbole gravé</strong> sur
            l&apos;objet : c&apos;est le{" "}
            <strong className="text-white">poinçon</strong>. C&apos;est une
            marque officielle frappée par l&apos;Etat qui garantit la teneur en
            argent.
          </p>

          <div className="mb-6 rounded-lg border border-amber-600/20 bg-amber-900/10 px-5 py-4">
            <p className="text-base leading-relaxed text-neutral-300">
              <strong className="text-amber-400">
                Où chercher le poinçon ?
              </strong>{" "}
              Sur les couverts, retournez la fourchette ou la cuillère : le
              poinçon est frappé sur le manche, côté dos. Sur les plats et
              plateaux, regardez le dessous ou le bord. Sur les bijoux, cherchez
              sur le fermoir ou l&apos;intérieur de l&apos;anneau. Le poinçon
              est minuscule (1 à 2 mm) — une loupe est souvent nécessaire.
            </p>
          </div>

          <h3 className="mb-4 text-lg font-bold text-white">
            Les 3 poinçons les plus courants en France
          </h3>

          <div className="space-y-5">
            {/* Minerve */}
            <div className="rounded-lg bg-neutral-800 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-[#BE943C] bg-neutral-900">
                  <div className="text-center">
                    <p className="text-2xl leading-none">&#x1F3DB;</p>
                    <p className="mt-0.5 text-[10px] font-bold text-[#BE943C]">
                      925
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Poinçon Minerve — argent 925
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-neutral-300">
                    Une tête de femme casquée (la déesse Minerve) dans un cadre
                    octogonal. C&apos;est le poinçon{" "}
                    <strong className="text-white">le plus courant</strong> en
                    France. Si vous le trouvez sur vos couverts ou plateaux,
                    votre argenterie contient{" "}
                    <strong className="text-white">
                      92,5% d&apos;argent pur
                    </strong>
                    . Utilisez le titre 925 dans le calculateur ci-dessus.
                  </p>
                </div>
              </div>
            </div>

            {/* Cygne */}
            <div className="rounded-lg bg-neutral-800 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-neutral-600 bg-neutral-900">
                  <div className="text-center">
                    <p className="text-2xl leading-none">&#x1F9A2;</p>
                    <p className="mt-0.5 text-[10px] font-bold text-neutral-400">
                      800
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Poinçon au Cygne — argent 800
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-neutral-300">
                    Un cygne dans un rectangle arrondi. Il indique un argent de{" "}
                    <strong className="text-white">
                      qualité inférieure (80% d&apos;argent pur)
                    </strong>
                    . Fréquent sur les petites cuillères, broches, et objets
                    décoratifs bon marché. Utilisez le titre 800 dans le
                    calculateur.
                  </p>
                </div>
              </div>
            </div>

            {/* Poinçon de maître */}
            <div className="rounded-lg bg-neutral-800 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-neutral-600 bg-neutral-900">
                  <div className="text-center">
                    <p className="text-xl font-black leading-none text-neutral-400">
                      &#x25C7;AB
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    Poinçon de maître — pas un gage de pureté
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-neutral-300">
                    Un losange contenant des initiales. Ce poinçon identifie{" "}
                    <strong className="text-white">
                      l&apos;orfèvre qui a fabriqué l&apos;objet
                    </strong>
                    , mais ne garantit pas la pureté. Il est toujours accompagné
                    d&apos;un poinçon Minerve ou Cygne. Seul, il ne suffit pas
                    pour confirmer que l&apos;objet est en argent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-neutral-800 p-5">
            <p className="text-base leading-relaxed text-neutral-300">
              <strong className="text-white">Et les pièces de monnaie ?</strong>{" "}
              Les pièces françaises portent des marques, mais ce ne sont pas des
              poinçons de garantie (Minerve, Cygne). Ce sont des{" "}
              <strong className="text-white">différents numismatiques</strong> :
              la signature du graveur (par exemple « Dupré » sur les Hercule),
              la marque d&apos;atelier (lettre « A » pour Paris) et la corne
              d&apos;abondance (symbole de la Monnaie de Paris). Ces marques
              identifient l&apos;origine de la pièce, mais ne certifient pas le
              titre de la même manière. La teneur en argent est fixée par décret
              de frappe : 900 pour les Hercule, 835 pour les Semeuse, 680 pour
              les Turin.{" "}
              <Link
                href="/"
                className="text-[#BE943C] underline hover:text-amber-300"
              >
                Retrouvez toutes les pièces françaises dans notre comparateur
              </Link>
              .
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* SECTION — Facteurs prix argent */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              6
            </span>
            <h2 className="text-xl font-bold text-white">
              Qu&apos;est-ce qui fait varier le prix de l&apos;argent ?
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Contrairement à l&apos;or, l&apos;argent est à la fois un{" "}
            <strong className="text-white">métal précieux</strong> et un{" "}
            <strong className="text-white">métal industriel</strong>. Plus de
            50% de la demande mondiale d&apos;argent provient de
            l&apos;industrie, ce qui rend son cours plus volatile que celui de
            l&apos;or.
          </p>

          <div className="space-y-4">
            {[
              {
                factor: "Demande industrielle",
                detail:
                  "L'argent est essentiel dans les panneaux solaires photovoltaïques (chaque panneau contient ~20g d'argent), l'électronique (contacts, soudures), et le secteur médical (propriétés antibactériennes). La transition énergétique est un moteur de demande structurel.",
              },
              {
                factor: "Ratio or/argent",
                detail:
                  "Le ratio or/argent (prix de l'or divisé par le prix de l'argent) oscille historiquement entre 40 et 90. Quand il dépasse 80, les investisseurs considèrent l'argent comme « sous-évalué » par rapport à l'or et augmentent leurs achats.",
              },
              {
                factor: "Production minière",
                detail:
                  "70% de l'argent extrait est un sous-produit de l'exploitation de mines de cuivre, zinc et plomb. La production ne peut donc pas augmenter rapidement en réponse à une hausse de la demande, ce qui crée des tensions sur les prix.",
              },
              {
                factor: "Politique monétaire",
                detail:
                  "Comme l'or, l'argent profite des baisses de taux d'intérêt réels et de l'inflation. Quand les banques centrales assouplissent leur politique monétaire, les métaux précieux deviennent plus attractifs face aux obligations.",
              },
              {
                factor: "Demande d'investissement",
                detail:
                  "Les achats de pièces bullion, lingots et ETF argent représentent environ 25% de la demande. En périodes d'incertitude économique, cette demande peut doubler, tirant fortement le prix vers le haut.",
              },
            ].map((item) => (
              <div key={item.factor} className="rounded-lg bg-neutral-800 p-4">
                <p className="font-semibold text-white">{item.factor}</p>
                <p className="mt-1 text-base text-neutral-300">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-base text-neutral-400">
            <Link
              href="/cours-argent"
              className="text-[#BE943C] underline hover:text-amber-300"
            >
              Suivez le cours de l&apos;argent en temps réel
            </Link>{" "}
            pour observer l&apos;impact de ces facteurs au quotidien.
          </p>
        </div>

        {/* ========================= */}
        {/* SECTION — Pièces bullion vs argenterie */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              7
            </span>
            <h2 className="text-xl font-bold text-white">
              Investir dans l&apos;argent : pièces bullion ou argenterie ?
            </h2>
          </div>

          <p className="mb-4 text-base leading-relaxed text-neutral-300">
            Si vous envisagez l&apos;achat d&apos;argent physique, le choix du
            support a un impact direct sur la liquidité, la prime et la
            fiscalité.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Critère</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Pièces bullion
                  </th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Argenterie
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    c: "Titre",
                    bullion: "999 (argent pur)",
                    argenterie: "925 ou 800",
                  },
                  {
                    c: "Prime à l'achat",
                    bullion: "15–30% au-dessus du spot",
                    argenterie: "Variable (parfois sous le spot au poids)",
                  },
                  {
                    c: "Liquidité à la revente",
                    bullion: "Excellente (cotation mondiale)",
                    argenterie: "Faible (nécessite affinage)",
                  },
                  {
                    c: "Décote au rachat",
                    bullion: "5–15%",
                    argenterie: "15–25%",
                  },
                  {
                    c: "Fiscalité",
                    bullion: "TMP 11,5% ou TPV 36,2%",
                    argenterie: "TMP 11,5% ou TPV 36,2%",
                  },
                  {
                    c: "Stockage",
                    bullion: "Compact (tubes, capsules)",
                    argenterie: "Encombrant, risque de rayures",
                  },
                  {
                    c: "Idéal pour",
                    bullion: "Investissement long terme",
                    argenterie: "Valoriser un héritage",
                  },
                ].map((row) => (
                  <tr key={row.c}>
                    <td className="py-2 font-medium text-white">{row.c}</td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.bullion}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.argenterie}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-neutral-800 p-3">
              <p className="text-base leading-relaxed text-neutral-300">
                <strong className="text-[#BE943C]">Pour investir :</strong> les
                pièces bullion (Maple Leaf, Philharmonique, Britannia) sont le
                meilleur véhicule. Reconnues mondialement, cotées au quotidien,
                elles se revendent facilement avec une décote minimale.
              </p>
            </div>
            <div className="rounded-lg bg-neutral-800 p-3">
              <p className="text-base leading-relaxed text-neutral-300">
                <strong className="text-[#BE943C]">
                  Pour vendre de l&apos;argenterie :
                </strong>{" "}
                utilisez le calculateur en haut de page avec le titre 925 pour
                estimer la valeur métal. La valeur sentimentale ou artistique
                n&apos;est pas prise en compte dans le rachat au poids — si
                l&apos;objet a un intérêt esthétique, faites estimer par un
                antiquaire.
              </p>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* Lien fiscalité */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-[#BE943C]/30 bg-neutral-900 p-6">
          <p className="text-base leading-relaxed text-neutral-300">
            Vous envisagez de revendre votre argent ? La fiscalité applicable
            (TMP ou TPV) peut changer considérablement le montant net que vous
            recevrez.
          </p>
          <div className="mt-4">
            <Link
              href="/fiscalite"
              className="inline-flex items-center gap-2 rounded-full border border-[#BE943C] px-6 py-3 text-base font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
            >
              Fiscalité des métaux précieux — Guide complet →
            </Link>
          </div>
        </div>

        {/* ========================= */}
        {/* FAQ */}
        {/* ========================= */}
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-2 text-lg font-bold text-white">
            Questions fréquentes — Prix de l&apos;argent
          </h2>
          <div className="mt-4 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="rounded-lg bg-neutral-800 p-4">
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-300">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="mb-3 text-base text-neutral-400">
            Comparez les prix des pièces d&apos;argent chez les dealers français
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#BE943C] px-6 py-3 text-base font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
            >
              Comparateur de prix →
            </Link>
            <Link
              href="/cours-argent"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-600 px-6 py-3 text-base font-bold text-neutral-300 transition-colors hover:bg-neutral-800"
            >
              Cours de l&apos;argent en direct →
            </Link>
          </div>
        </div>

        {/* Sources */}
        <div className="mt-12 border-t border-neutral-700 pt-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-200">
            Sources
          </p>
          <ul className="space-y-2 text-sm text-amber-100/80">
            <li>
              Cours spot XAG/EUR — Marché interbancaire London Bullion Market
              Association (LBMA)
            </li>
            <li>
              Poinçons français — Direction Générale des Douanes et Droits
              Indirects (Minerve 1er titre 925, Cygne 800)
            </li>
            <li>
              Poids et titres des pièces françaises — Monnaie de Paris (données
              officielles de frappe)
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
