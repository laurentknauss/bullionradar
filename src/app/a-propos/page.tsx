import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos de BullionRadar | Comparateur Indépendant Or & Argent",
  description:
    "BullionRadar est le premier comparateur indépendant de pièces d'or et d'argent d'investissement en France. Découvrez notre méthodologie et nos engagements.",
};

export default function AProposPage() {
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
          <Link
            href="/"
            className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
          >
            ← Accueil
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          À Propos de BullionRadar
        </h1>

        {/* Qui sommes-nous */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            Qui sommes-nous ?
          </h2>
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              BullionRadar est un <strong>comparateur indépendant</strong> de
              pièces d&apos;or et d&apos;argent d&apos;investissement, conçu
              pour les investisseurs français.
            </p>
            <p>
              Nous ne vendons aucune pièce. Notre seul objectif est de vous
              fournir une <strong>information objective et à jour</strong> pour
              vous aider à prendre les meilleures décisions
              d&apos;investissement en métaux précieux.
            </p>
            <p>
              Avec plus de <strong>50 pièces bullion analysées</strong> et{" "}
              <strong>1 200+ fiches comparatives</strong>, BullionRadar couvre
              les principales pièces d&apos;investissement internationales
              (Maple Leaf, Krugerrand, Philharmonique, American Eagle,
              Britannia...) ainsi que les pièces françaises classiques (Napoléon
              20F, Hercule, Semeuse, Turin).
            </p>
          </div>
        </section>

        {/* Transparence & Modèle économique */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            Transparence & Modèle économique
          </h2>
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              L&apos;utilisation de BullionRadar est{" "}
              <strong>totalement gratuite</strong> pour les utilisateurs.
            </p>
            <p>
              Pour assurer la pérennité technique du projet, BullionRadar a
              postulé aux programmes d&apos;affiliation de dealers reconnus tels
              que <strong>Godot & Fils</strong> et <strong>Or.fr</strong>.
            </p>
            <p>
              À ce jour, ces demandes sont en cours d&apos;étude. Si elles sont
              validées, BullionRadar pourrait percevoir une commission sur les
              transactions initiées via le site.{" "}
              <strong>
                Ce modèle n&apos;impacte jamais le prix final payé par
                l&apos;investisseur
              </strong>{" "}
              et n&apos;altère en rien l&apos;objectivité de nos algorithmes de
              comparaison de prix.
            </p>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            Notre méthodologie
          </h2>
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Chaque jour, BullionRadar effectue une{" "}
              <strong>veille tarifaire automatisée</strong> auprès de plusieurs
              dealers français de référence. Les prix sont collectés, comparés
              et mis à jour quotidiennement.
            </p>
            <p>
              Pour chaque pièce, nous analysons et comparons les{" "}
              <strong>caractéristiques techniques</strong> : poids, pureté,
              diamètre, épaisseur, pays d&apos;origine, première année de
              frappe, liquidité sur le marché secondaire et prime estimée par
              rapport au cours spot.
            </p>
          </div>
        </section>

        {/* Engagements */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            Nos engagements
          </h2>
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong>Indépendance</strong> — Aucun dealer n&apos;est
                privilégié. Le tri est strictement basé sur le prix.
              </li>
              <li>
                <strong>Transparence</strong> — Les prix proviennent directement
                des sources dealers. Notre modèle économique est exposé en toute
                clarté.
              </li>
              <li>
                <strong>Mise à jour quotidienne</strong> — Les prix reflètent
                l&apos;état réel du marché chaque jour.
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            Contact
          </h2>
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Une question ou une suggestion ? Contactez-nous à{" "}
              <a
                href="mailto:webmaster@bullionradar.fr"
                className="text-amber-400 underline hover:text-amber-300"
              >
                webmaster@bullionradar.fr
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-500">
        <p>
          © 2026 BullionRadar - Comparateur indépendant de pièces d&apos;or et
          d&apos;argent
        </p>
        <p className="mt-2">
          <Link href="/mentions-legales" className="underline hover:text-white">
            Mentions légales
          </Link>
        </p>
      </footer>
    </main>
  );
}
