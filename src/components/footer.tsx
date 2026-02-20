import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-6 py-14 text-sm text-neutral-400">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-4">
        {/* Colonne 1 — Marque */}
        <div>
          <p className="text-lg font-bold text-amber-400">BullionRadar</p>
          <p className="mt-2 leading-relaxed">
            Comparateur indépendant de pièces d&apos;or et d&apos;argent en
            France. Données mises à jour quotidiennement.
          </p>
        </div>

        {/* Colonne 2 — Guide */}
        <div>
          <p className="mb-3 font-semibold text-white">
            Le Petit Guide du Stacker
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/guide"
                className="font-semibold text-amber-400 hover:text-amber-300"
              >
                Lire et telecharger le guide gratuit (PDF)
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 — Cours */}
        <div>
          <p className="mb-3 font-semibold text-white">Cours en temps réel</p>
          <ul className="space-y-2">
            <li>
              <Link href="/cours-or" className="hover:text-amber-400">
                Cours de l&apos;or
              </Link>
            </li>
            <li>
              <Link href="/cours-argent" className="hover:text-amber-400">
                Cours de l&apos;argent
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 — Infos */}
        <div>
          <p className="mb-3 font-semibold text-white">Informations</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/solutions-stockage"
                className="font-semibold text-amber-400 hover:text-amber-300"
              >
                Solutions de stockage
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-amber-400">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-amber-400">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl border-t border-neutral-800 pt-6 text-center text-xs text-neutral-600">
        © 2026 BullionRadar — Tous droits réservés
      </div>
    </footer>
  );
}
