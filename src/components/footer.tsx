import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-6 py-14 text-sm text-neutral-400">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        {/* Colonne 1 — Marque */}
        <div>
          <p className="text-lg font-bold text-amber-400">BullionRadar</p>
          <p className="mt-2 leading-relaxed">
            Comparateur indépendant de pièces d&apos;or et d&apos;argent en
            France. Données mises à jour quotidiennement.
          </p>
        </div>

        {/* Colonne 2 — Cours */}
        <div>
          <p className="mb-3 text-lg font-bold text-amber-400">
            Cours en temps réel
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/cours-or"
                className="text-white hover:text-amber-400"
              >
                Cours de l&apos;or
              </Link>
            </li>
            <li>
              <Link
                href="/cours-argent"
                className="text-white hover:text-amber-400"
              >
                Cours de l&apos;argent
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 — Infos */}
        <div>
          <p className="mb-3 text-lg font-bold text-amber-400">Informations</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/fiscalite"
                className="text-white hover:text-amber-400"
              >
                Fiscalité
              </Link>
            </li>
            <li>
              <Link
                href="/solutions-stockage"
                className="text-white hover:text-amber-400"
              >
                Solutions de stockage
              </Link>
            </li>
            <li>
              <Link
                href="/a-propos"
                className="text-white hover:text-amber-400"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                href="/mentions-legales"
                className="text-white hover:text-amber-400"
              >
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
