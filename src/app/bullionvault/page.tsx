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
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Investissez dans l&apos;Or dès{" "}
            <span className="text-[#FFD700]">1 gramme</span>
          </h1>
          <p className="mb-6 text-lg text-gray-300">
            Accès direct au marché professionnel. Sans pièces physiques. Sans
            livraison à domicile.
            <br />
            Juste de l&apos;or, de l&apos;argent et du platine, 100% sécurisés.
          </p>
          <p className="text-sm text-amber-400">
            L&apos;alternative idéale aux pièces bullion pour ceux qui veulent
            l&apos;exposition sans la complexité
          </p>
        </div>

        {/* The Offer */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-gradient-to-br from-black/50 to-black/30 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Pourquoi BullionVault si vous aimez les pièces bullion ?
          </h2>
          <div className="space-y-4 text-gray-300">
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

        {/* How It Works */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Comment ça marche en 4 étapes
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "S&apos;inscrire",
                desc: "Créez un compte en 5 minutes",
              },
              {
                step: "2",
                title: "Approvisionner",
                desc: "Virement bancaire vers nos comptes en Angleterre",
              },
              {
                step: "3",
                title: "Acheter",
                desc: "Or, argent ou platine, à partir de 1g, au meilleur prix",
              },
              {
                step: "4",
                title: "Stocker",
                desc: "Coffrés profesionnels. Assurance incluse. Audit quotidien.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-600/20 bg-[#0f0f0f] p-6 text-center"
              >
                <div className="mb-3 text-3xl font-black text-[#FFD700]">
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
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
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tarification Détaillée */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Tarification claire
          </h2>

          <div className="mb-8">
            <h3 className="mb-4 font-bold text-white">Frais de transaction</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between border-b border-amber-600/20 pb-3">
                <span>Commission achat</span>
                <span className="font-semibold text-[#FFD700]">0,5%</span>
              </div>
              <div className="flex justify-between border-b border-amber-600/20 pb-3">
                <span>Commission vente</span>
                <span className="font-semibold text-[#FFD700]">0,5%</span>
              </div>
              <div className="flex justify-between">
                <span>Retrait bancaire (SEPA/euros)</span>
                <span className="font-semibold text-[#FFD700]">5€ fixe</span>
              </div>
            </div>
          </div>

          <div className="mb-8 border-t border-amber-600/20 pt-8">
            <h3 className="mb-4 font-bold text-white">
              Frais de stockage (assurance incluse)
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between border-b border-amber-600/20 pb-3">
                <span>Or</span>
                <span className="font-semibold text-[#FFD700]">
                  0,01% par mois (min. 4$/mois)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Argent / Platine</span>
                <span className="font-semibold text-[#FFD700]">
                  0,04% par mois (min. 8$/mois)
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-amber-600/10 p-4 text-sm text-gray-300">
            <strong className="text-amber-400">Exemple concret :</strong> Vous
            achetez 100g d'or à 50€/g = 5 000€. Frais achat : 25€ (0,5%).
            Stockage : 0,05€/mois (0,01% de 5000€). Vous revendez 6 mois plus
            tard : frais vente 25€. <strong>Total coûts : 55€</strong> pour 6
            mois de stockage sécurisé avec assurance.
          </div>
        </section>

        {/* Sécurité & Transparence */}
        <section className="mb-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Sécurité et transparence totales
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">
                  Audit quotidien indépendant
                </strong>
                <p className="text-sm text-gray-400">
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
                <p className="text-sm text-gray-400">
                  Votre or n&apos;est jamais sur les livres de BullionVault. En
                  cas de faillite, vos avoirs sont protégés.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">Coffres-forts certifiés</strong>
                <p className="text-sm text-gray-400">
                  Zurich, Londres, New York, Singapour, Toronto. Tous assurés et
                  accrédités internationalement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">Standard professionnel</strong>
                <p className="text-sm text-gray-400">
                  Barres de &quot;bonne livraison&quot; (normes de Londres).
                  Aucune pureté compromise.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#FFD700]"></span>
              <div>
                <strong className="text-white">75 000+ utilisateurs</strong>
                <p className="text-sm text-gray-400">
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
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Important :</strong> BullionVault ne propose que des barres
            professionnelles, pas de pièces. C&apos;est le standard du marché
            professionnel (meilleur prix, liquidité maximale).
          </p>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-amber-600/30 bg-gradient-to-r from-[#BE943C] to-[#FFD700]/30 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Vous êtes prêt à commencer ?
          </h2>
          <p className="mb-6 text-black/80">
            Ouvrez un compte BullionVault en 5 minutes. Testez avec un minimum
            de 1 gramme d&apos;or. Aucun engagement.
          </p>
          <a
            href="https://www.bullionvault.com/fr"
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

        {/* FAQ Summary */}
        <section className="mt-12 rounded-lg border border-amber-600/30 bg-black/50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">
            Questions fréquentes
          </h2>
          <div className="space-y-4 text-gray-300">
            <details className="group">
              <summary className="cursor-pointer font-bold text-white hover:text-[#FFD700]">
                Puis-je retirer mon or physiquement ?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Oui, mais BullionVault ne recommande pas la livraison car elle
                sortla l&apos;or du circuit professionnel et entraîne des frais
                élevés. L&apos;idée est de stocker sécurisé et liquide dans les
                coffres.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-bold text-white hover:text-[#FFD700]">
                Que se passe-t-il si BullionVault fait faillite ?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Votre or n&apos;est pas affecté. Il n&apos;est jamais sur les
                livres de BullionVault. Les avoirs des clients sont ségrégués
                légalement et assurés. C&apos;est garanti par audit indépendant
                quotidien.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-bold text-white hover:text-[#FFD700]">
                Quelle est la fiscalité ?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Ça dépend de votre pays. BullionVault a des clients dans 175
                pays. En France, l&apos;or physique est soumis à des règles
                spécifiques (TMP 11,5%, TPV 36,2%). Consultez un expert fiscal.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-bold text-white hover:text-[#FFD700]">
                Puis-je acheter et revendre rapidement ?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Oui, totalement. Achat/vente 24H/24 7J/7. Pas de délai. Frais
                fixes à 0,5% chacun. C&apos;est la liquidité professionnelle.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-bold text-white hover:text-[#FFD700]">
                Comment je valide mon compte ?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Envoi d&apos;une pièce d&apos;identité + RIB. Obligatoire pour
                respecter la législation anti-blanchiment. Vous avez 15 jours
                après le premier approvisionnement.
              </p>
            </details>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
