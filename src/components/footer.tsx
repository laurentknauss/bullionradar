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
          <a
            href="https://www.youtube.com/@comparateur-pieces-or-argent"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-red-500"
            aria-label="Chaîne YouTube BullionRadar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-sm">YouTube</span>
          </a>
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
                Fiscalité des métaux précieux or et argent
              </Link>
            </li>
            <li>
              <Link
                href="/vente-or"
                className="text-white hover:text-amber-400"
              >
                Vente d&apos;or : fiscalité et taxe
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
