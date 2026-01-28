# labonnepiece.fr - Comparateur de pieces d'or et d'argent

## Projet

Annuaire/comparateur de pieces d'or et d'argent d'investissement (bullion coins).
Nom de domaine : **labonnepiece.fr**
Nom de code : GoldBullionVS

## Fichiers du projet

- `index.html` - Landing page statique (HTML/CSS pur, pas de framework)
- `images/header-labonnepiece.jpeg` - Header avec personnage style Monopoly + logo
- `product-requirement-document.md` - PRD complet (analyse marche + cahier des charges technique)

## Charte graphique

### Couleurs Or
| Nom | Code | Usage |
|-----|------|-------|
| Or Metallique | `#D4AF37` | Couleur principale or |
| Or Standard Web | `#FFD700` | Titres, accents vifs |
| Or Vieilli / GoldenRod | `#DAA520` | Pieces anciennes, accents |
| Or Flat Design | `#F1C40F` | Boutons, icones modernes |

### Couleurs Argent
| Nom | Code | Usage |
|-----|------|-------|
| Argent fonce | `#5A5A5A` | Texte argent sur fond or |
| Argent | `#787878` | Texte secondaire argent |
| Argent clair | `#969696` | Accents argent legers |

### Couleurs UI
| Nom | Code | Usage |
|-----|------|-------|
| Fond page | `#BE943C` | Meme couleur que le fond du header image |
| Texte principal | `#1a1a1a` | Noir |
| Texte secondaire | `#3d3520` | Brun fonce |
| Texte or accent | `#8B6914` | Mot "or" dans le texte |

### Ambiance visuelle
- Style "Monopoly / 19e siecle" mais moderne et serieux
- Police titres : Playfair Display (serif, 700/900)
- Police corps : Inter (sans-serif)
- Separateurs ornementaux : `— ◆ —`
- Boutons : fond noir, texte or, angles droits
- Pas de coins arrondis excessifs, pas d'ombres flashy

## Stack technique prevue (MVP)

- **Framework** : Next.js 15 (App Router, SSG/ISR)
- **Langage** : TypeScript strict
- **Styling** : Tailwind CSS + Shadcn/UI
- **Graphiques** : Recharts
- **Contenu** : MDX
- **Hebergement** : Vercel
- **i18n** : next-intl (FR, BE, CH)

## Dashboard portefeuille (phase ulterieure)

Les utilisateurs connectes pourront :
- Declarer leurs pieces (ex: 3x Maple Leaf, 5x Napoleon 20F)
- Voir la valeur estimee de leur portefeuille
- Suivre l'evolution dans le temps

### API cours des metaux
- **Spot metal** : metals.dev (deja utilise dans un autre projet Next.js)
- **Prix par piece** : pas d'API publique disponible pour les prix individuels de pieces bullion

### Options pour le prix des pieces
1. **Spot + prime estimee (recommande pour V1)** : metals.dev pour le spot + colonne `estimated_premium_pct` par piece dans la base. Prix indicatif.
2. **Scraping quotidien (V2)** : CPoR Devises ou gold.fr publient les cotations par piece sans API. Un cron quotidien pourrait scraper ces prix.
3. **API B2B (hors budget)** : nFusion Solutions alimente les gros dealers, tarif non public.

### Primes typiques par piece (a affiner)
| Piece | Prime sur spot |
|-------|---------------|
| Krugerrand 1oz | 2-3% |
| Maple Leaf 1oz | 1.5-2.5% |
| Napoleon 20F | 5-8% |
| Silver Eagle 1oz | 15-20% |
| Britannia Argent 1oz | 10-15% |

## Conventions

- Pas de date ni temps de lecture dans les articles
- Git : pas de Co-Authored-By dans les commits

## Session 2026-01-28 : Bento Grid dashboard

### Ce qui a ete fait
- Installe le composant Aceternity Bento Grid via `npx shadcn@latest add @aceternity/bento-grid`
- Cree `src/components/ui/bento-grid.tsx` : composant BentoGrid + BentoGridItem customise au theme or/argent du projet (pas le style Aceternity par defaut blanc/neutral)
- Refactore `src/components/portfolio-summary.tsx` : remplacement de la grille plate `grid-cols-5` par un Bento Grid asymetrique :
  - Carte hero "Valeur estimee" en `row-span-2` avec texte `text-4xl`
  - P&L latent + P&L realise en haut a droite
  - Repartition + Cours spot en bas a droite
  - Layout : `grid-cols-3` desktop, `grid-cols-2` tablette, 1 colonne mobile
- Supprime `@tabler/icons-react` (installe automatiquement par le CLI Aceternity mais inutilise)
- Build `pnpm build` : zero erreur

### Pas encore commit
- Les changements sont dans le working tree, non commites
