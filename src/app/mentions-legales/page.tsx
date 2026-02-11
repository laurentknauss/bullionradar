import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales & Politique de Confidentialité | BullionRadar",
  description:
    "Mentions légales, politique de confidentialité et informations RGPD du site BullionRadar.fr - Comparateur de pièces d'or et d'argent.",
};

export default function MentionsLegalesPage() {
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
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-wide text-[#FFFFF0] md:text-4xl">
          Mentions Légales & Politique de Confidentialité
        </h1>

        {/* Mentions Légales */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            1. Mentions Légales
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <h3 className="text-lg font-semibold text-[#FFFFF0]">
              Éditeur du site
            </h3>
            <p>Email : webmaster@bullionradar.fr</p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Hébergeur
            </h3>
            <p>
              <strong className="text-[#FFFFF0]">Vercel Inc.</strong>
              <br />
              Site web : vercel.com
            </p>
          </div>
        </section>

        {/* RGPD */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            2. Protection des Données Personnelles (RGPD)
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD - Règlement UE 2016/679) et à la loi Informatique et
              Libertés du 6 janvier 1978 modifiée, vous disposez de droits sur
              vos données personnelles.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Responsable du traitement
            </h3>
            <p>
              Le responsable du traitement des données collectées sur ce site
              est joignable à l&apos;adresse webmaster@bullionradar.fr.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Données collectées
            </h3>
            <p>BullionRadar collecte uniquement les données suivantes :</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Données de navigation</strong> : adresse IP, type de
                navigateur, pages visitées (à des fins d&apos;analyse
                statistique anonymisée)
              </li>
              <li>
                <strong>Cookies techniques</strong> : nécessaires au
                fonctionnement du site
              </li>
            </ul>
            <p className="pt-2">
              Aucune donnée personnelle nominative n&apos;est collectée sans
              votre consentement explicite.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Finalités du traitement
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Améliorer l&apos;expérience utilisateur</li>
              <li>Établir des statistiques de fréquentation anonymes</li>
              <li>Assurer le bon fonctionnement technique du site</li>
            </ul>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Durée de conservation
            </h3>
            <p>
              Les données de navigation sont conservées pendant une durée
              maximale de 13 mois, conformément aux recommandations de la CNIL.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Vos droits
            </h3>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos
              données :
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Droit d&apos;accès</strong> : obtenir confirmation du
                traitement de vos données et en recevoir une copie
              </li>
              <li>
                <strong>Droit de rectification</strong> : corriger des données
                inexactes ou incomplètes
              </li>
              <li>
                <strong>Droit à l&apos;effacement</strong> : demander la
                suppression de vos données
              </li>
              <li>
                <strong>Droit à la limitation</strong> : restreindre le
                traitement de vos données
              </li>
              <li>
                <strong>Droit à la portabilité</strong> : recevoir vos données
                dans un format structuré
              </li>
              <li>
                <strong>Droit d&apos;opposition</strong> : vous opposer au
                traitement de vos données
              </li>
            </ul>
            <p className="pt-4">
              Pour exercer ces droits, contactez-nous à :{" "}
              <a
                href="mailto:contact@bullionradar.fr"
                className="text-amber-400 underline hover:text-amber-300"
              >
                contact@bullionradar.fr
              </a>
            </p>
            <p className="pt-2">
              Vous pouvez également introduire une réclamation auprès de la CNIL
              :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline hover:text-amber-300"
              >
                www.cnil.fr
              </a>
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            3. Politique de Cookies
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal
              (ordinateur, tablette, smartphone) lors de la visite d&apos;un
              site internet.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Cookies utilisés sur BullionRadar
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Cookies strictement nécessaires</strong> :
                indispensables au fonctionnement du site, ils ne peuvent pas
                être désactivés
              </li>
              <li>
                <strong>Cookies analytiques</strong> : permettent de mesurer
                l&apos;audience du site de manière anonymisée (Vercel Analytics)
              </li>
            </ul>

            <h3 className="pt-4 text-lg font-semibold text-[#FFFFF0]">
              Gestion des cookies
            </h3>
            <p>
              Vous pouvez à tout moment gérer vos préférences de cookies via les
              paramètres de votre navigateur. Voici comment procéder :
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Chrome : Paramètres → Confidentialité et sécurité → Cookies
              </li>
              <li>Firefox : Options → Vie privée et sécurité → Cookies</li>
              <li>Safari : Préférences → Confidentialité → Cookies</li>
              <li>Edge : Paramètres → Confidentialité → Cookies</li>
            </ul>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            4. Propriété Intellectuelle
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes,
              logo, icônes, etc.) est protégé par le droit d&apos;auteur et le
              droit des marques.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication,
              transmission ou dénaturation, totale ou partielle du site ou de
              son contenu, par quelque procédé que ce soit, sans
              l&apos;autorisation préalable écrite de l&apos;éditeur, est
              interdite et constituerait une contrefaçon sanctionnée par les
              articles L.335-2 et suivants du Code de la propriété
              intellectuelle.
            </p>
            <p>
              Les images des pièces de monnaie présentées sur ce site sont
              utilisées à titre illustratif et appartiennent à leurs
              propriétaires respectifs.
            </p>
          </div>
        </section>

        {/* Limitation de responsabilité */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            5. Limitation de Responsabilité
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              BullionRadar est un comparateur indépendant. Les informations
              présentées (prix, caractéristiques des pièces, disponibilité) sont
              fournies à titre indicatif et peuvent évoluer.
            </p>
            <p>
              <strong className="text-[#FFFFF0]">
                BullionRadar ne vend pas de pièces d&apos;or ou d&apos;argent.
              </strong>{" "}
              Les liens vers les sites marchands sont fournis à titre
              informatif. Nous déclinons toute responsabilité quant aux
              transactions effectuées sur les sites tiers.
            </p>
            <p>
              Nous nous efforçons d&apos;assurer l&apos;exactitude des
              informations, mais ne pouvons garantir l&apos;absence
              d&apos;erreurs ou d&apos;omissions. L&apos;investissement dans les
              métaux précieux comporte des risques. Nous recommandons de
              consulter un conseiller financier avant tout investissement.
            </p>
          </div>
        </section>

        {/* Liens externes */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            6. Liens Externes
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Ce site peut contenir des liens hypertextes vers d&apos;autres
              sites internet. BullionRadar n&apos;exerce aucun contrôle sur ces
              sites et décline toute responsabilité quant à leur contenu.
            </p>
            <p>
              Certains liens peuvent être des liens d&apos;affiliation. Cela
              signifie que nous pouvons percevoir une commission si vous
              effectuez un achat via ces liens, sans coût supplémentaire pour
              vous.
            </p>
          </div>
        </section>

        {/* Mise à jour */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#FFD700]">
            7. Mise à Jour
          </h2>

          <div className="space-y-4 leading-relaxed tracking-wide text-[#FFFFF0]/80">
            <p>
              Les présentes mentions légales et politique de confidentialité
              peuvent être modifiées à tout moment. Nous vous invitons à les
              consulter régulièrement.
            </p>
            <p className="pt-2 text-sm text-neutral-500">
              Dernière mise à jour : Février 2026
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
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-500">
        <p>
          © 2026 BullionRadar - Comparateur indépendant de pièces d&apos;or et
          d&apos;argent
        </p>
      </footer>
    </main>
  );
}
