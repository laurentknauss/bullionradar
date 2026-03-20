import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales & Politique de Confidentialité | BullionRadar",
  description:
    "Mentions légales, politique de confidentialité et informations RGPD du site BullionRadar.fr - Comparateur de pièces d'or et d'argent.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-bg-dark text-white">
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
          Mentions Légales & Politique de Confidentialité
        </h1>

        {/* Note de Transparence sur l'Affiliation */}
        <section className="mb-12 rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="mb-4 text-xl font-semibold text-amber-400">
            Note sur la transparence et l&apos;indépendance
          </h2>
          <div className="space-y-4 leading-relaxed text-[#FFFFF0]/90">
            <p>
              BullionRadar est un projet indépendant dont l&apos;objectif est de
              fournir une information gratuite et objective aux investisseurs en
              métaux précieux.
            </p>
            <p>
              À ce jour, le site ne génère aucun revenu publicitaire ou
              commercial. Dans une optique de pérennisation du service
              (couverture des frais d&apos;hébergement et maintenance
              technique),{" "}
              <strong>
                BullionRadar a officiellement déposé des candidatures auprès de
                programmes d&apos;affiliation reconnus
              </strong>
              , notamment ceux des enseignes <strong>Godot & Fils</strong> et{" "}
              <strong>Or.fr</strong>.
            </p>
            <p>
              Si ces partenariats sont validés, nous pourrons percevoir une
              commission sur les achats effectués via certains liens sortants,
              sans aucun surcoût pour l&apos;utilisateur. Cette éventuelle
              rémunération future n&apos;influencera en rien l&apos;impartialité
              de nos comparatifs de prix, qui sont basés sur des données
              mathématiques factuelles collectées quotidiennement.
            </p>
          </div>
        </section>

        {/* Mentions Légales */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            1. Mentions Légales
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <h3 className="text-lg font-semibold text-[#FFFFF0]">
              Éditeur du site
            </h3>
            <p>
              Le site <strong>BullionRadar.fr</strong> est édité par une
              personne physique agissant à titre non professionnel. Conformément
              à l&apos;article 6-III-2 de la Loi n° 2004-575 du 21 juin 2004
              pour la confiance dans l&apos;économie numérique (LCEN),
              l&apos;éditeur a choisi de conserver son anonymat vis-à-vis du
              public.
            </p>
            <p>
              Les coordonnées complètes de l&apos;éditeur ont été transmises de
              manière exacte à l&apos;hébergeur du site. Pour toute question,
              vous pouvez nous joindre par email à :{" "}
              <a
                href="mailto:webmaster@bullionradar.fr"
                className="text-amber-400 underline"
              >
                webmaster@bullionradar.fr
              </a>
              .
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Hébergeur du site
            </h3>
            <p>
              Le site est hébergé par la société{" "}
              <strong className="text-[#FFFFF0]">Vercel Inc.</strong>, dont le
              siège social est situé :
              <br />
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723, États-Unis
              <br />
              Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-400"
              >
                vercel.com
              </a>
            </p>
          </div>
        </section>

        {/* RGPD */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            2. Politique de Confidentialité (RGPD)
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              BullionRadar respecte votre vie privée. Nous nous engageons à ce
              que le traitement de vos données soit conforme au Règlement
              Général sur la Protection des Données (RGPD).
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Données collectées
            </h3>
            <p>
              Actuellement, BullionRadar ne collecte aucune donnée nominative
              (nom, email, etc.) sans votre accord. Les seules données traitées
              sont :
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Données de navigation anonymisées</strong> : Pour
                mesurer l&apos;audience (Vercel Analytics).
              </li>
              <li>
                <strong>Cookies techniques</strong> : Indispensables au
                fonctionnement du site.
              </li>
            </ul>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Vos droits
            </h3>
            <p>
              Vous disposez des droits d&apos;accès, de rectification et de
              suppression. Étant donné l&apos;absence de comptes utilisateurs,
              ces droits s&apos;exercent principalement via la gestion de vos
              cookies.
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            3. Politique relative aux Cookies
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal.
            </p>
            <h3 className="pt-2 text-lg font-semibold text-[#FFFFF0]">
              Cookies d&apos;analyse
            </h3>
            <p>
              Vercel Analytics nous permet de suivre l&apos;audience du site de
              manière anonyme.
            </p>
            <h3 className="pt-2 text-lg font-semibold text-[#FFFFF0]">
              Note sur l&apos;affiliation (Partenariats en attente)
            </h3>
            <p>
              Dans le cadre des candidatures d&apos;affiliation déposées (Godot
              & Fils, Or.fr), des cookies de suivi tiers pourraient être déposés
              si vous cliquez sur un lien partenaire une fois ces collaborations
              actives. Ces cookies servent uniquement à l&apos;attribution de la
              mise en relation. Vous pouvez les refuser via les réglages de
              votre navigateur.
            </p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            4. Propriété Intellectuelle
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Les textes et la structure du comparateur sont la propriété de
              l&apos;éditeur. Les visuels des pièces sont utilisés à des fins
              d&apos;illustration pédagogique et appartiennent à leurs
              propriétaires respectifs.
            </p>
          </div>
        </section>

        {/* Avertissement Risque */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            5. Avertissement sur les risques
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              L&apos;achat de métaux précieux comporte des risques. Les cours
              sont sujets à des fluctuations importantes. Les informations sur
              BullionRadar ne constituent pas un conseil en investissement.
            </p>
          </div>
        </section>

        {/* Mise à jour */}
        <section className="space-y-6">
          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p className="text-sm text-neutral-400 italic">
              Dernière mise à jour : 27 février 2026
            </p>
          </div>
        </section>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-400">
        <p>
          © 2026 BullionRadar - Comparateur indépendant de pièces d&apos;or et
          d&apos;argent
        </p>
      </footer>
    </main>
  );
}
