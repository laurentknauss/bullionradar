import Link from "next/link";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions de stockage pour pièces d'or et d'argent | BullionRadar",
  description:
    "Comment conserver votre stack en sécurité : garde chez un dealer, coffre-fort à domicile, ou le Dirty Man Safe — le coffre enterré plébiscité par les stackers.",
  alternates: {
    canonical: "https://bullionradar.fr/solutions-stockage",
  },
  openGraph: {
    title: "Solutions de stockage pour pièces d'or et d'argent | BullionRadar",
    description:
      "Comment conserver votre stack en sécurité : garde chez un dealer, coffre-fort à domicile, ou le Dirty Man Safe.",
    url: "https://bullionradar.fr/solutions-stockage",
    images: [
      {
        url: "https://bullionradar.fr/images/og-bullionradar.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SolutionsStockagePage() {
  return (
    <main className="min-h-screen bg-bg-dark text-white">
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
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black md:text-4xl">
            Conserver son stack en sécurité
          </h1>
          <p className="mt-3 text-neutral-300">
            Vous avez acheté vos pièces. Maintenant, où les mettre ?
          </p>
        </div>

        {/* Option 1 — Dealer */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              1
            </span>
            <h2 className="text-xl font-bold text-white">
              Garde chez un dealer professionnel
            </h2>
          </div>
          <p className="mb-4 text-neutral-300">
            Certains dealers proposent un service de garde (
            <em>vault storage</em>) où vos métaux sont stockés dans leurs
            chambres fortes sécurisées, généralement auprès de partenaires
            spécialisés (Brink&apos;s, Loomis...).
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-green-400">
                ✓ Avantages
              </p>
              <ul className="space-y-1 text-sm text-neutral-300">
                <li>Sécurité maximale, assurance incluse</li>
                <li>Pas de risque de vol à domicile</li>
                <li>Revente facilitée (le dealer a déjà les pièces)</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-red-400">
                ✗ Inconvénients
              </p>
              <ul className="space-y-1 text-sm text-neutral-300">
                <li>Frais annuels (0,5 – 1% de la valeur)</li>
                <li>Vos pièces ne sont pas chez vous</li>
                <li>Risque de contrepartie (faillite)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            <strong className="text-neutral-300">Pour qui ?</strong> Stacks
            importants (&gt; 10 000 €) ou absence de solution sécurisée à
            domicile.
          </p>
        </div>

        {/* Option 2 — Coffre domicile */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
              2
            </span>
            <h2 className="text-xl font-bold text-white">
              Coffre-fort à domicile
            </h2>
          </div>
          <p className="mb-4 text-neutral-300">
            Un coffre-fort mural ou sur socle, ancré dans la maçonnerie. La
            solution la plus utilisée par les stackers particuliers.
          </p>
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            {[
              {
                label: "Classe de résistance",
                value: "Minimum classe B, idéalement classe 1+",
              },
              {
                label: "Résistance au feu",
                value: "Recommandée pour documents et pièces",
              },
              {
                label: "Ancrage",
                value: "Toujours fixer dans le mur ou dalle béton",
              },
              {
                label: "Discrétion",
                value: "Dissimuler derrière un tableau ou dans une armoire",
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
          <p className="text-sm text-neutral-400">
            <strong className="text-neutral-300">Pour qui ?</strong> La majorité
            des stackers avec un stack entre 1 000 € et 50 000 €.
          </p>
        </div>

        {/* Option 3 — Dirty Man Safe */}
        <div className="mb-8 overflow-hidden rounded-xl border-2 border-[#BE943C]/60 bg-neutral-900">
          {/* Badge coup de coeur */}
          <div className="bg-[#BE943C] px-6 py-2 text-center">
            <span className="text-sm font-black text-black">
              ★ COUP DE CŒUR DES STACKERS
            </span>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BE943C] text-lg font-black text-black">
                3
              </span>
              <h2 className="text-xl font-bold text-white">
                Dirty Man Safe — enterrer son trésor
              </h2>
            </div>

            <div className="mb-6 flex flex-col items-start gap-6 md:flex-row">
              <img
                src="/images/bonhomme-coffre-fort.jpeg"
                alt="Dirty Man Safe — stockage enterré pièces or argent"
                className="w-full max-w-[200px] rounded-lg md:w-40"
              />
              <div>
                <p className="mb-3 text-neutral-300">
                  Le <strong className="text-white">Dirty Man Safe</strong> est
                  la solution que les stackers américains les plus avisés
                  utilisent depuis des années. Le principe : un tube étanche en
                  PVC renforcé de qualité militaire, conçu pour être{" "}
                  <strong className="text-[#BE943C]">
                    enterré dans le sol de votre jardin
                  </strong>
                  . Ni détectable au détecteur de métaux, ni visible — vos
                  pièces disparaissent littéralement du radar.
                </p>
                <p className="mb-3 text-neutral-300">
                  Là où un coffre-fort classique dit{" "}
                  <em>&quot;il y a quelque chose de précieux ici&quot;</em>, le
                  Dirty Man Safe dit{" "}
                  <em>&quot;il n&apos;y a rien à voler&quot;</em>. Aucun
                  cambrioleur ne peut forcer ce qu&apos;il ne trouve pas.
                  C&apos;est la raison pour laquelle cette solution est devenue{" "}
                  <strong className="text-white">la référence absolue</strong>{" "}
                  dans la communauté des stackers.
                </p>
                <p className="text-neutral-300">
                  Étanche, résistant à la corrosion, aux variations de
                  température et aux incendies (protégé par la terre) — vos
                  pièces restent en parfait état pendant des décennies. Un achat
                  unique, zéro frais récurrent, zéro contrepartie.
                </p>
              </div>
            </div>

            {/* Modèles */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-white">
                Les modèles disponibles
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    name: "Medium",
                    capacity: "~100 pièces 1oz",
                    dim: "3 × 5 pouces",
                  },
                  {
                    name: "Large",
                    capacity: "~170 pièces 1oz",
                    dim: "3.5 × 7 pouces",
                  },
                  {
                    name: "Extra Large",
                    capacity: "~300 pièces 1oz",
                    dim: "4 × 10 pouces",
                  },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="rounded-lg border border-[#BE943C]/30 bg-neutral-800 p-3 text-center"
                  >
                    <p className="font-bold text-[#BE943C]">{m.name}</p>
                    <p className="text-sm text-white">{m.capacity}</p>
                    <p className="text-xs text-neutral-400">{m.dim}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Avantages */}
            <div className="mb-6 grid gap-2 md:grid-cols-2">
              {[
                "Discrétion absolue : introuvable sans savoir où chercher",
                "Aucun frais récurrent : achat unique",
                "Étanchéité totale : protège de l'humidité et corrosion",
                "Pas de risque de contrepartie : vos pièces chez vous",
                "Résistance au feu : sous terre, survivront à un incendie",
                "Livraison discrète : emballage neutre, expédition internationale",
              ].map((adv) => (
                <div
                  key={adv}
                  className="flex items-start gap-2 text-sm text-neutral-300"
                >
                  <span className="mt-0.5 shrink-0 text-green-400">✓</span>
                  {adv}
                </div>
              ))}
            </div>

            {/* Promo code + CTA */}
            <div className="rounded-lg border border-[#BE943C]/40 bg-[#BE943C]/10 p-5 text-center">
              <div className="mb-4">
                <p className="mb-1 text-sm font-semibold text-[#BE943C]">
                  Offre exclusive lecteurs BullionRadar
                </p>
                <div className="inline-flex items-center gap-3 rounded-lg border-2 border-dashed border-[#BE943C] bg-black/30 px-5 py-3">
                  <span className="text-sm text-neutral-300">Code promo :</span>
                  <span className="rounded bg-[#BE943C] px-3 py-1 font-mono text-lg font-black text-black">
                    bullion10
                  </span>
                  <span className="text-sm font-bold text-green-400">-10%</span>
                </div>
              </div>
              <a
                href="https://dirtymansafe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#BE943C] px-8 py-3 font-black text-black transition-colors hover:bg-amber-400"
              >
                Commander le Dirty Man Safe →
              </a>
              <p className="mt-3 text-xs text-neutral-400">
                Entrez le code{" "}
                <strong className="text-neutral-300">bullion10</strong> au
                moment du paiement pour bénéficier de 10% de réduction sur votre
                commande.
              </p>
            </div>
          </div>
        </div>

        {/* Comparatif */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-white">
            Comparatif des solutions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="pb-2 text-left text-[#BE943C]">Solution</th>
                  <th className="pb-2 text-center text-[#BE943C]">Sécurité</th>
                  <th className="pb-2 text-center text-[#BE943C]">Coût</th>
                  <th className="pb-2 text-center text-[#BE943C]">
                    Discrétion
                  </th>
                  <th className="pb-2 text-center text-[#BE943C]">Accès</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {[
                  {
                    s: "Garde dealer",
                    sec: "5/5",
                    cost: "Frais annuels",
                    disc: "3/5",
                    acc: "Différé",
                  },
                  {
                    s: "Coffre domicile",
                    sec: "4/5",
                    cost: "Achat unique",
                    disc: "3/5",
                    acc: "Immédiat",
                  },
                  {
                    s: "Dirty Man Safe",
                    sec: "5/5",
                    cost: "Achat unique",
                    disc: "5/5",
                    acc: "Quelques min.",
                    highlight: true,
                  },
                  {
                    s: "Coffre bancaire",
                    sec: "3/5",
                    cost: "Frais annuels",
                    disc: "2/5",
                    acc: "Heures ouverture",
                  },
                ].map((row) => (
                  <tr
                    key={row.s}
                    className={
                      row.highlight ? "bg-[#BE943C]/10" : "bg-transparent"
                    }
                  >
                    <td
                      className={`py-2 font-medium ${row.highlight ? "text-[#BE943C]" : "text-white"}`}
                    >
                      {row.highlight ? "★ " : ""}
                      {row.s}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.sec}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.cost}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.disc}
                    </td>
                    <td className="py-2 text-center text-neutral-300">
                      {row.acc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA guide */}
        <div className="mt-8 text-center">
          <p className="mb-3 text-sm text-neutral-400">
            Ces conseils sont tirés du guide gratuit BullionRadar
          </p>
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 rounded-full border border-[#BE943C] px-6 py-3 text-sm font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
          >
            Télécharger Le Petit Guide du Stacker (PDF gratuit) →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
