# 🥈 BullionRadar

> Comparateur indépendant de pièces d'or et d'argent d'investissement chez les dealers français. Prix mis à jour quotidiennement.

🔗 **Production** : [bullionradar.com](https://bullionradar.com)

---

## 🎯 Le problème

Acheter de l'or ou de l'argent d'investissement en France implique de comparer manuellement les prix de plusieurs dealers, sur des dizaines de pièces, avec des primes qui varient au jour le jour. Aucun comparateur indépendant n'existait.

**BullionRadar** scrape automatiquement les prix de **3 dealers français** sur **58 pièces** (Napoléon, Vreneli, Krugerrand, Maple Leaf, Eagle, etc.), calcule la prime par rapport au spot, et présente le meilleur deal du jour.

## ✨ Features

- 📊 **Cours or & argent** en temps réel (EUR/oz, EUR/kg) avec graphiques historiques
- 💰 **Comparateur de pièces** — 58 produits × 3 dealers, mis à jour quotidiennement
- 🪙 **Fiches détaillées** par pièce (caractéristiques, fiscalité, primes historiques)
- 👤 **Tracker personnel** — collection privée avec auth Clerk
- 📰 **Guides éditoriaux** (fiscalité, stockage, nettoyage, etc.)
- 🎬 **Vidéos générées programmatiquement** via Remotion
- 📈 **SEO-first** : sitemap dynamique, Schema.org, ISR, og:images dédiées

## 🛠️ Stack technique

| Couche        | Tech                                           |
| ------------- | ---------------------------------------------- |
| **Framework** | Next.js 16 (App Router, ISR, RSC)              |
| **Language**  | TypeScript strict                              |
| **Styling**   | Tailwind CSS + Radix UI primitives             |
| **Auth**      | Clerk                                          |
| **DB**        | Supabase (PostgreSQL + RLS)                    |
| **Scraping**  | Playwright + TypeScript scripts                |
| **Vidéos**    | Remotion (rendu serveur programmable)          |
| **Emails**    | React Email                                    |
| **Anim**      | Framer Motion + tsParticles                    |
| **PDF**       | react-pdf                                      |
| **CI/CD**     | GitHub Actions + Vercel + Snyk gate + SAST     |
| **Hooks**     | Husky (pre-commit lint + pre-push build/audit) |
| **Analytics** | Vercel Analytics + Speed Insights              |

## 🏗️ Architecture

```text
bullion-radar/
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts, sitemap)
│   │   ├── coin/[slug]/      # Fiches pièces dynamiques
│   │   ├── vs/[slug]/        # Comparaisons pièce A vs pièce B
│   │   ├── cours-or/[period]/   # Graphiques cours or
│   │   ├── cours-argent/[period]/
│   │   └── mes-pieces/       # Tracker perso (Clerk-protected)
│   ├── components/           # UI réutilisables (shadcn-style)
│   ├── lib/                  # Helpers métier (Supabase, calculs primes)
│   ├── remotion/             # Compositions vidéos
│   └── proxy.ts              # Next.js 16 proxy (ex-middleware)
├── scripts/scrapers/         # Scrapers TS (Playwright)
│   ├── scrape-orfr.ts
│   ├── scrape-godot.ts
│   ├── scrape-fr-silver.ts
│   └── scrape-all.ts         # Orchestrateur
├── supabase/                 # Migrations + RLS policies
└── .github/workflows/        # CI + cron scrapers quotidiens
```

## 🚀 Setup local

### Prérequis

- Node.js 20+
- pnpm 9+
- Compte Supabase (projet vide)
- Compte Clerk (clé pub/secret)

### Installation

```bash
pnpm install
cp .env.example .env.local   # Renseigner les variables ci-dessous
pnpm dev
```

### Variables d'environnement

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Prix spot (optionnel — fallback sur données scrapées)
METALS_DEV_API_KEY=
```

### Scripts disponibles

```bash
pnpm dev       # Dev server (http://localhost:3000)
pnpm build     # Build production
pnpm start     # Serveur prod
pnpm lint      # ESLint
pnpm format    # Prettier
```

## 🔄 Pipeline de scraping

Chaque jour à 06:00 UTC, un workflow GitHub Actions :

1. Lance Playwright contre 3 sites de dealers
2. Parse les listings (catégorie, poids, métal, prix)
3. Calcule la prime vs spot (via API Metals.dev)
4. Upsert dans Supabase
5. Déclenche une revalidation ISR Next.js

→ Voir `.github/workflows/scrape-prices.yml`

## 🛡️ Sécurité

- ✅ **Snyk gate** bloquant dans la CI (`--severity-threshold=high`)
- ✅ **SAST scan** local en pre-push (`scripts/security-scan.sh`)
- ✅ **Détection de secrets** en pre-push
- ✅ **Auto-deploy Vercel désactivé** (`vercel.json` → `git.deploymentEnabled: false`) — tout passe par la pipeline CI
- ✅ **RLS Supabase** sur toutes les tables utilisateurs
- ✅ **Service role key** uniquement côté serveur (jamais exposée au client)

## 📂 Branches

- `main` → production (déployée sur [bullionradar.com](https://bullionradar.com))
- `dev` → intégration
- `youtube-videos`, `bullion-pieces-personal-tracker` → features en cours

## 📝 Licence

Code propriétaire — **tous droits réservés**.

Le code est rendu public à des fins de démonstration technique. Toute réutilisation, redistribution ou exploitation commerciale est interdite sans autorisation écrite.

## 👤 Contact

**Laurent Knauss** — [laurentknauss@protonmail.com](mailto:laurentknauss@protonmail.com)
