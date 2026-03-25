import Link from "next/link";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "BullionVault — Achetez de l'Or dès 1g, Stockage Sécurisé | BullionRadar",
  description:
    "Accès direct au marché professionnel de l'or, l'argent et le platine. À partir de 1 gramme seulement. Stockage sécurisé dans 5 pays. 75 000+ clients. Audit quotidien.",
  alternates: {
    canonical: "https://bullionradar.fr/bullionvault",
  },
  openGraph: {
    title: "BullionVault — Investissez dans l'Or dès 1 gramme",
    description:
      "Accès au marché professionnel de l'or physique. Coffres-forts internationaux, assurance incluse, sans frais caché.",
    url: "https://bullionradar.fr/bullionvault",
    images: [
      {
        url: "https://bullionradar.fr/images/og-bullionradar.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function BullionVaultPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
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

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 pb-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Partenaire recommandé par BullionRadar
          </p>
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Vous voulez de l&apos;or, mais pas{" "}
            <span className="text-[#FFD700]">
              les contraintes des pièces physiques ?
            </span>
          </h1>
          <p className="mb-6 text-lg text-[#E8DCC8]">
            Stockage à domicile, frais de livraison, spread à la revente, ticket
            d&apos;entrée élevé…
            <br />
            Il existe une alternative utilisée par plus de 125 000 investisseurs
            dans 175 pays.
          </p>
          <p className="text-base font-semibold text-white">
            Cette alternative, c&apos;est{" "}
            <span className="text-[#FFD700]">BullionVault</span> — accès direct
            au marché professionnel de l&apos;or, dès 1 gramme.
          </p>
        </div>

        {/* The Offer */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-gradient-to-br from-black/50 to-black/30 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Pourquoi BullionVault plutôt que des pièces physiques ?
          </h2>
          <div className="space-y-4 text-[#E8DCC8]">
            <p>
              BullionVault est une plateforme britannique fondée en 2005 qui
              permet d&apos;acheter, vendre et stocker de l&apos;or, de
              l&apos;argent et du platine{" "}
              <strong>dans des coffres professionnels certifiés</strong>, au
              prix du marché, sans intermédiaire.
            </p>
            <p>
              Vous comparez les prix des <strong>pièces bullion</strong> sur
              BullionRadar (Napoléon, Maple Leaf, Krugerrand…). Mais vous
              hésitez car :
            </p>
            <ul className="space-y-2 pl-4">
              <li>
                ✗ Les pièces coûtent cher à l&apos;achat minimal (au moins
                50-150€ par pièce)
              </li>
              <li>
                ✗ La livraison physique entraîne des frais supplémentaires
              </li>
              <li>
                ✗ Vous ne pouvez stocker qu&apos;à domicile ou chez un
                coffre-fort local
              </li>
              <li>✗ La revente prend du temps et coûte cher en spread</li>
            </ul>
            <p className="mt-4 border-t border-amber-600/20 pt-4">
              <strong>BullionVault offre une alternative :</strong>
            </p>
            <ul className="space-y-2 pl-4">
              <li>
                ✓ <strong>À partir de 1 gramme d&apos;or</strong> (moins de 50€)
              </li>
              <li>
                ✓ Achat et vente instantanés, 24H/24 7J/7, sans intermédiaire
              </li>
              <li>
                ✓ Stockage gratuit dans des coffres professionnels certifiés
              </li>
              <li>
                ✓ Propriété physique garantie 100% par audit quotidien
                indépendant
              </li>
              <li>✓ Pas de frais cachés, tout est transparent</li>
            </ul>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Les avantages clés
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Minimum très bas",
                desc: "À partir de 1 gramme d'or (~ 50€). Testez sans engagement.",
              },
              {
                title: "Achat/vente instantané",
                desc: "24H/24 7J/7 sans délai. Pas d'intermédiaire, marché en temps réel.",
              },
              {
                title: "Liquidité garantie",
                desc: "Pas de problème de liquidité. Vous vendez quand vous voulez.",
              },
              {
                title: "Frais transparents",
                desc: "0,5% achat + 0,5% vente. Stockage : 0,01-0,04% par mois (assurance incluse).",
              },
              {
                title: "Stockage sécurisé",
                desc: "Coffres à Zurich, Londres, New York, Singapour, Toronto. Audit quotidien publié.",
              },
              {
                title: "Protection 100%",
                desc: "Audit indépendant quotidien. Votre or ne peut pas être saisi en cas de faillite.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-600/20 bg-[#0f0f0f] p-6"
              >
                <h3 className="mb-2 font-bold text-[#FFD700]">
                  {feature.title}
                </h3>
                <p className="text-base font-medium text-[#E8DCC8]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sécurité & Transparence */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Sécurité et transparence totales
          </h2>
          <div className="space-y-4 text-[#E8DCC8]">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">
                  Audit quotidien indépendant
                </strong>
                <p className="text-base font-medium text-[#E8DCC8]">
                  Chaque jour, des auditeurs externes vérifient les stocks et
                  publient les résultats. Transparence totale.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">
                  Propriété physique garantie
                </strong>
                <p className="text-base font-medium text-[#E8DCC8]">
                  Votre or n&apos;est jamais sur les livres de BullionVault. En
                  cas de faillite, vos avoirs sont protégés.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">Coffres-forts certifiés</strong>
                <p className="text-base font-medium text-[#E8DCC8]">
                  Zurich, Londres, New York, Singapour, Toronto. Tous assurés et
                  accrédités internationalement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">Standard professionnel</strong>
                <p className="text-base font-medium text-[#E8DCC8]">
                  Barres de &quot;bonne livraison&quot; (normes de Londres).
                  Aucune pureté compromise.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">75 000+ utilisateurs</strong>
                <p className="text-base font-medium text-[#E8DCC8]">
                  Depuis 20+ ans. Plus de 37 tonnes d&apos;or stockés. Confiance
                  établie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Métaux disponibles */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Métaux disponibles
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                metal: "Or",
                desc: "Barres 400 oz (12,4 kg). Achat à partir de 1g. Puissance des 0,5% frais.",
              },
              {
                metal: "Argent",
                desc: "Barres 1000 oz (31,1 kg). Minimum : 1g. Même transparence que l'or.",
              },
              {
                metal: "Platine",
                desc: "Barres 1-6 kg. Achat par gramme. Diversification métaux rares.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-600/20 bg-[#0f0f0f] p-4"
              >
                <h3 className="mb-2 font-bold text-[#FFD700]">{item.metal}</h3>
                <p className="text-base font-medium text-[#E8DCC8]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-base font-medium text-[#E8DCC8]">
            <strong>Important :</strong> BullionVault ne propose que des barres
            professionnelles, pas de pièces. C&apos;est le standard du marché
            professionnel (meilleur prix, liquidité maximale).
          </p>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-amber-600/30 bg-[#BE943C] p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Vous êtes prêt à commencer ?
          </h2>
          <p className="mb-6 text-black/80">
            Ouvrez un compte BullionVault en 5 minutes. Testez avec un minimum
            de 1 gramme d&apos;or. Aucun engagement.
          </p>
          <a
            href="https://www.bullionvaultaffiliate.com/actionargent/fr"
            className="inline-block rounded-lg bg-black px-8 py-3 font-bold text-[#FFD700] hover:bg-black/90"
            rel="nofollow"
            target="_blank"
          >
            Créer un compte gratuit →
          </a>
          <p className="mt-4 text-sm text-black/60">
            Lien affilié BullionRadar — Commission sans coût supplémentaire pour
            vous
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
