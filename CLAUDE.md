# labonnepiece.fr - Comparateur de pieces d'or et d'argent

## Projet

Annuaire/comparateur de pieces d'or et d'argent d'investissement (bullion coins).
Nom de domaine : **labonnepiece.fr**
Nom de code : GoldBullionVS

## Fichiers du projet

- `index.html` - Landing page statique (HTML/CSS pur, pas de framework)
- `images/header-labonnepiece.jpeg` - Header avec personnage style Monopoly + logo
- `product-requirement-document.md` - PRD complet (analyse marche + cahier des charges technique)
- `comment-utiliser-browserbase-mcp.md` - **Guide scraping avec Browserbase** (lire avant de scraper des sites proteges)

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

## Session 2026-01-31 : Images pieces + UI comparateur

### Ce qui a ete fait
- **Images telechargees** depuis gold.fr dans `app/public/coins-v2/`
  - Or : 22 images (avers)
  - Argent : 11 images (avers + revers) converties en PNG fond transparent via ImageMagick
- **Composants Aceternity installes** : Focus Cards, Compare, Sparkles
- **Comparateur landing page** (`src/components/coin-comparison.tsx`) :
  - Grille 1 carte/ligne, max-w-xs, fond blanc, centree
  - Focus Cards effect : blur sur hover des autres cartes
  - Clic sur piece -> detail avec Compare (slider avers/revers)
  - Filtres Or/Argent
  - Caracteristiques + highlights affiches
- **Types corriges** : `SpotPrices` ajoute, `face_value` accepte `null`

### TODO prochaine session

1. **Images manquantes** :
   - Pieces or : ajouter les revers (actuellement que Krugerrand a les 2 faces)
   - Pieces argent : American Eagle n'a que l'avers
   - Telecharger images des pieces classiques francaises (Napoleon, Hercule, etc.)

2. **UI/UX comparateur** :
   - Responsive : adapter la grille pour desktop (plusieurs colonnes)
   - Ajouter nom de la piece sous chaque carte
   - Overlay titre au hover (texte blanc) illisible sur fond blanc -> a revoir

3. **Fonctionnalites** :
   - Selection multiple pour comparaison cote a cote (tableau)
   - Afficher prix estime (spot + prime) via metals.dev API
   - Filtre par pays, poids, purete

4. **Dashboard portfolio** (non commite) :
   - Fichiers modifies non commites : dashboard/page.tsx, portfolio-summary.tsx, portfolio-table.tsx, coins-data.ts
   - A revoir et commiter separement

---

## Session 2026-02-02 : Scrapers dealers

### Ce qui a ete fait

- **Scrapers Playwright fonctionnels** pour 2 dealers FR :
  - `scrape-godot.ts` : Godot & Fils (achat-or-et-argent.fr)
  - `scrape-pieces-or.ts` : Pieces-Or.com
  - `scrape-all.ts` : Orchestrateur avec comparaison
  - `types.ts` : Types partages + `parseFrenchPrice()` pour "4 150,50 €" -> cents

- **3 pieces trackees** : Krugerrand 1oz, Napoleon 20F, Souverain

- **Resultats du test** (02/02/2026) :
  | Piece | Godot | Pieces-Or | Spread |
  |-------|-------|-----------|--------|
  | Krugerrand | 4175€ | 4173€ | 0.03% |
  | Napoleon 20F | 779€ | 816€ | 4.79% |
  | Souverain | 983€ | 982€ | 0.07% |

- **Stack technique** : Playwright + TypeScript strict + tsx

### TODO prochaine session

1. **Supabase** : Creer table `dealer_prices` et stocker les resultats
2. **GitHub Actions** : Cron quotidien 11h FR pour lancer `scrape-all.ts`
3. **Next.js** : Pages `/prix/[coin-slug]` avec ISR pour afficher comparaison
4. **Ajouter dealers** : Or.fr, BullionByPost FR, gold.fr

---

## Feature future : Comparateur de prix dealers (style GoldSilver.ai)

### Contexte (analyse 2026-02-02)

Inspiré de **GoldSilver.ai** (Jenny Ljungblad, Suède) et **FindBullionPrices.com** (USA).

**2 types de comparateurs différents** :

| Type | labonnepiece.fr (actuel) | Comparateur dealers (à ajouter) |
|------|-------------------------|--------------------------------|
| **Compare** | Pièces entre elles | Prix dealers pour 1 même pièce |
| **Question** | "Krugerrand vs Maple Leaf ?" | "Où acheter le Krugerrand le moins cher ?" |
| **Pages** | `/vs/krugerrand-vs-maple-leaf` | `/prix/krugerrand-1oz` |
| **Volume SEO** | ~1200 pages | ~50 pages (1 par pièce) |

### Modèle GoldSilver.ai

- Agrège les prix de "top dealers" en temps réel
- **Ne nomme PAS les dealers publiquement** (agrégation anonyme)
- Feature "Dealer Premium Analysis" (markup vs spot)
- Historique des prix par produit

### Modèle FindBullionPrices.com (plus transparent)

Affiche clairement les dealers avec tableaux comparatifs :

| Dealer US | Free shipping |
|-----------|---------------|
| Bullion Express | @ $149 |
| Bullion Standard | @ $497 |
| Silver.com | — |
| Golden Eagle Coins | @ $99 |
| Monument Metals | @ $199 |
| Provident Metals | @ $199 |
| Silver Gold Bull | @ $199 |

### Dealers FR à tracker

| Dealer | Scraping | Affiliation | Notes |
|--------|----------|-------------|-------|
| **Or.fr** | À tester | ✅ 0.25% achat + 0.15%/an stockage | Cookie 1 an |
| **Godot & Fils** | ✅ Playwright OK | ✅ % sur marge | 82 agences FR |
| **Pièces-Or.com** | ✅ Playwright OK | À vérifier | Prix unitaires |
| **AuCOFFRE** | À tester | ⚠️ Parrainage uniquement | Pas affiliation site |
| **CPoR Devises** | ✅ Cours officiels | ❌ | Référence marché FR |
| **gold.fr** | ✅ Déjà scrapé images | À vérifier | Prix quotidiens |
| **BullionVault** | À tester | ✅ Referral | — |

### Implémentation technique envisagée

```text
/prix/[coin-slug]
├── Tableau comparatif dealers (prix, premium, stock, livraison)
├── Graphique historique des prix
├── Liens affiliés vers dealers
└── "Meilleur prix" mis en avant
```
**Stack** :
1. **Cron quotidien** : GitHub Actions (Playwright trop lourd pour Vercel Cron)
2. **Stockage** : Supabase (table `dealer_prices`)
3. **Affichage** : Page `/prix/[coin-slug]` avec ISR (revalidate 1h)
4. **Monétisation** : Liens affiliés Or.fr, Godot

### Avantage marché FR

- **Moins de dealers** = plus simple à implémenter
- **Aucun concurrent** = FindBullionPrices n'existe pas en FR
- **Complémentaire** au comparateur de pièces existant

### Références

- GoldSilver.ai : https://goldsilver.ai/bullion/compare-bullion-prices
- FindBullionPrices.com : https://findbullionprices.com
- Veille complète : `/home/laurent/professionnel/blog-argent/goldsilver-ai-veille.md`
- Étude de marché FR : `/home/laurent/professionnel/annuaire-bullion-coin-francais/ETUDE_MARCHE_COMPARATEUR_BULLION_FR.md`

---

## Architecture technique scraping (2026-02-02)

> **Note** : Pour scraper des sites avec protection anti-bot (Cloudflare, etc.), lire `comment-utiliser-browserbase-mcp.md`

### Scope POC : 3 dealers FR (livraison physique uniquement)

| Dealer | Affiliation | Site | Pourquoi |
|--------|-------------|------|----------|
| **Or.fr** | ✅ 0.25% | Moderne (React?) | Programme affiliation documenté |
| **Godot & Fils** | ✅ % marge | Classique | Leader FR, 82 agences |
| **gold.fr** | ❓ À vérifier | Simple | Déjà scrapé images |

**Exclus du POC** :
- AuCOFFRE → stockage en coffre (pas de livraison)
- BullionVault → stockage uniquement
- CPoR Devises → cours de référence, pas de vente directe

### Outils disponibles en interne

| Outil | Usage | Notes |
|-------|-------|-------|
| **Playwright** | Scraping headless | Recommandé pour sites JS/React |
| **Puppeteer** | Scraping headless | Alternative à Playwright |
| **Browserbase** | Navigateurs cloud | Si anti-bot (Cloudflare, Captcha) |
| **Docker gosom** | Scraping Go/Colly | Déjà utilisé pour annuaire-streetworkout |

### Schéma d'architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        CRON (quotidien)                         │
│                        GitHub Actions                           │
│  (Vercel Cron inadapté : timeout 60s, Playwright trop lourd)    │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SCRAPER (Node.js)                            │
│                                                                 │
│   Option A: Playwright (recommandé)                             │
│   - Headless Chromium                                           │
│   - Gère JS dynamique (React, Vue)                              │
│   - API moderne async/await                                     │
│                                                                 │
│   Option B: Browserbase (si anti-bot)                           │
│   - Navigateurs cloud                                           │
│   - Bypass Cloudflare/Captcha                                   │
│   - Coût par session                                            │
│                                                                 │
│   Option C: Docker gosom (réutiliser existant)                  │
│   - Infra annuaire-streetworkout                                │
│   - Colly/Go si besoin de performance                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Or.fr     │   │   Godot     │   │  gold.fr   │
│   scraper   │   │   scraper   │   │   scraper  │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │
       └────────────┬────┴────────────┬────┘
                    ▼                 │
┌─────────────────────────────────────────────────────────────────┐
│                     SUPABASE (PostgreSQL)                       │
│                                                                 │
│   Table: dealer_prices                                          │
│   ┌──────────┬──────────┬────────┬───────┬───────────────────┐  │
│   │ coin_slug│ dealer   │ price  │ stock │ scraped_at        │  │
│   ├──────────┼──────────┼────────┼───────┼───────────────────┤  │
│   │ kruger-1 │ or.fr    │ 2845€  │ true  │ 2026-02-02 08:00  │  │
│   │ kruger-1 │ godot    │ 2890€  │ true  │ 2026-02-02 08:00  │  │
│   │ kruger-1 │ gold.fr  │ 2860€  │ false │ 2026-02-02 08:00  │  │
│   └──────────┴──────────┴────────┴───────┴───────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              NEXT.JS (labonnepiece.fr)                          │
│                                                                 │
│   /prix/krugerrand-1oz                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Krugerrand 1oz - Comparatif prix                       │   │
│   │                                                         │   │
│   │  🥇 Or.fr         2 845 €   ✅ En stock   [Acheter →]  │   │
│   │  🥈 gold.fr       2 860 €   ❌ Rupture    [Voir →]     │   │
│   │  🥉 Godot & Fils  2 890 €   ✅ En stock   [Acheter →]  │   │
│   │                                                         │   │
│   │  MAJ : il y a 2 heures                                  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ISR: revalidate toutes les heures                             │
└─────────────────────────────────────────────────────────────────┘
```
### Recommandation outil par dealer

| Dealer | Complexité site | Outil recommandé |
|--------|-----------------|------------------|
| **Or.fr** | Site React/moderne | Playwright |
| **Godot & Fils** | Site classique | Playwright ou Puppeteer |
| **gold.fr** | Site simple | Puppeteer suffit |

**Fallback** : Si anti-bot détecté → Browserbase (navigateurs cloud avec fingerprinting réaliste).

### Pseudo-code scraper (Playwright)

```typescript
// scrapers/or-fr.ts
import { chromium } from 'playwright';

interface DealerPrice {
  coin_slug: string;
  dealer: string;
  price: number;
  in_stock: boolean;
  url: string;
}

export async function scrapeOrFr(): Promise<DealerPrice[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Liste des pièces à scraper
  const coins = [
    { slug: 'krugerrand-1oz', url: 'https://www.or.fr/achat/krugerrand-1-once' },
    { slug: 'maple-leaf-1oz', url: 'https://www.or.fr/achat/maple-leaf-or-1-once' },
    { slug: 'napoleon-20f', url: 'https://www.or.fr/achat/napoleon-20-francs' },
  ];

  const results: DealerPrice[] = [];

  for (const coin of coins) {
    await page.goto(coin.url);

    // Sélecteurs CSS (à adapter après inspection DevTools)
    const price = await page.$eval('.product-price', el =>
      parseFloat(el.textContent?.replace(/[^0-9,]/g, '').replace(',', '.') || '0')
    );

    const inStock = await page.$eval('.stock-status', el =>
      el.textContent?.includes('En stock') || false
    );

    results.push({
      coin_slug: coin.slug,
      dealer: 'or.fr',
      price,
      in_stock: inStock,
      url: coin.url,
    });
  }

  await browser.close();
  return results;
}
```

### Étapes POC

1. [ ] Inspecter manuellement les 3 sites (DevTools → identifier sélecteurs CSS)
2. [ ] Créer scraper Playwright pour Or.fr (pièce test : Krugerrand 1oz)
3. [ ] Valider que le prix extrait = prix affiché sur le site
4. [ ] Répéter pour Godot et gold.fr
5. [ ] Créer table Supabase `dealer_prices`
6. [ ] Créer page `/prix/krugerrand-1oz` avec données mockées
7. [ ] Connecter scraper → Supabase → page Next.js
8. [ ] Configurer cron quotidien

### Risques identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| **Site change HTML** | Scraper cassé | Monitoring + alertes si prix null |
| **Anti-bot (Cloudflare)** | Blocage IP | Browserbase ou proxies |
| **Dealer mécontent** | Mise en demeure | Contacter pour partenariat affilié |
| **Prix incorrects** | Perte crédibilité | Vérification manuelle hebdo |

---

## Session 2026-02-02 : Inspection dealers FR

### Étape 1 : Résultat inspection des 3 dealers initiaux

| Dealer | Site réel | Faisabilité | Problème |
|--------|-----------|-------------|----------|
| **Or.fr** | Redirige → GoldBroker.com | ❌ NON | 404, stockage international uniquement |
| **Godot & Fils** | achat-or-et-argent.fr | ✅ OUI | Site classique, structure claire |
| **gold.fr** | gold.fr | ⚠️ PARTIEL | Cours affichés, pas de prix d'achat direct |

### Godot & Fils (achat-or-et-argent.fr) ✅ VALIDÉ

**URL testée** : `https://www.achat-or-et-argent.fr/or/krugerrand/12`

**Données scrapables** :
- Cours boursable : `4 240.00 €` (heading h3 "Cours et cotation")
- Valeur intrinsèque : `3 963.93 €`
- Prime : `3.60 %`
- Prix d'achat (tableau dégressif) :
  - 1-4 pièces : `4 140.00 €`
  - 5-9 pièces : `4 135.50 €`
  - 10-19 pièces : `4 131.50 €`
  - etc.
- Prix de rachat : `3 785.00 €`
- Affiliation : ✅ Lien `/p33/affiliation`

**Sélecteurs CSS identifiés** :
```css
/* Cours dans le heading h3 */
h3 contenant "Cours et cotation" → extraire le prix

/* Tableau prix achat */
table avec header "VOUS ACHETEZ" → tbody tr td (cellules prix)

/* Tableau prix vente */
table avec header "VOUS VENDEZ" → tbody tr td
```

### Or.fr ❌ EXCLUS

- Redirige vers **GoldBroker.com** (service international)
- Page `/achat/krugerrand-1-once` retourne 404
- Modèle : stockage en coffre Suisse, pas de livraison physique FR
- **Décision** : Retirer du scope POC

### gold.fr ⚠️ À RECONSIDÉRER

**Problème majeur** : Pas un e-commerce classique
- Affiche les **cours boursables** (cotation CPoR), pas les prix de vente
- Achat via **formulaire de demande** ou en agence physique
- Pas de panier, pas de stock visible en ligne
- Prix final négocié par téléphone

**Ce qui EST scrapable** :
- Cours du Krugerrand : `4 240.00 €`
- Variation : `-5.65%`

**Ce qui N'EST PAS scrapable** :
- Prix d'achat final (variable selon négociation)
- Stock disponible

**Décision** : Peut servir comme source de cours CPoR, mais pas comme dealer comparable

### Risques scraping identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| **Rate limiting** | IP bloquée temporairement | Délai 2-5s entre requêtes |
| **Cloudflare / anti-bot** | Blocage complet | Browserbase (navigateurs cloud) |
| **Changement structure HTML** | Scraper cassé | Alertes si prix null, monitoring |
| **Détection headless** | Blocage | User-agent réaliste, viewport standard |
| **Cookies consent popup** | Bloque le DOM | Accepter cookies automatiquement |
| **Site change d'URL** | Liens cassés | Vérification hebdo des URLs |

### Prochaine étape : Trouver un 2e dealer

Dealers FR à investiguer :
- [x] BullionByPost FR → ✅ VALIDÉ
- [ ] Cookson-CLAL
- [ ] LoretLArgent.info (comparateur existant → concurrent ou source ?)
- [ ] Autres dealers FR avec prix en ligne

### BullionByPost FR (bullionbypost.fr) ✅ VALIDÉ

**URL testée** : `https://www.bullionbypost.fr/pieces-or/1-once-piece-or-krugerrand/`

**Modèle** : E-commerce complet (UK-based, livraison FR assurée)

**Données scrapables** :
- Cours de l'or : `3 965,70 €` (tableau header)
- Prix Krugerrand 1oz "Notre Choix" : `à partir de €4 214`
- Prix par millésime (1981, 1982, etc.) : `€4 344` - `€4 347`
- Statut stock : "En Stock" / "En Attente De Stock"
- Panier en ligne : ✅ Oui

**Sélecteurs CSS identifiés** :
```css
/* Cours de l'or dans header */
table[aria-label="Prix des Métaux"] → cell avec prix

/* Grille produits */
generic contenant "à partir de €X XXX"

/* Statut stock */
generic contenant "En Stock" ou "En Attente De Stock"
```

**Avantages** :
- Vrai e-commerce avec prix transparents
- Stock visible en temps réel
- Livraison assurée France (jusqu'à 60 000€)
- Membre LBMA (London Bullion Market Association)

**Inconvénients** :
- Site UK (support en anglais si problème)
- Prix légèrement plus élevés que Godot

---

### Scope POC révisé : 3 dealers FR

| Dealer | Site | Affiliation | Faisabilité |
|--------|------|-------------|-------------|
| **Godot & Fils** | achat-or-et-argent.fr | ✅ 0.5-2% | ✅ Scraper OK |
| **Pièces-Or.com** | pieces-or.com | ❌ (à contacter) | ✅ Scraper OK |
| **Or.fr** | or.fr (→ GoldBroker) | ✅ 0.2-0.4% + récurrent | ✅ Scraper OK |

**Pièces-Or.com** :
- SARL française depuis 2010
- Partenaire BRINK'S (livraison sécurisée)
- Pas d'affiliation publique, mais utile pour crédibilité comparateur

**Or.fr / GoldBroker** (ajouté 2026-02-04) :
- Portail français de GoldBroker.com (siège Londres)
- Affiliation "Lifetime Revenue Share" : 0.2-0.4% achat + 0.1-0.2%/an stockage
- Livraison physique disponible (`?serviceType=3`)
- Prix en EUR, site en français
- Deep linking : ajouter `#VOTRE_ID` à toute URL
- ⚠️ Pas de Krugerrand ni Souverain individuels (tubes de 10 uniquement)

### Choix outil scraping : Playwright

**Comparatif effectué 2026-02-02 :**

| Outil | Verdict | Raison |
|-------|---------|--------|
| **Playwright** | ✅ CHOISI | Gratuit, auto-wait natif, TypeScript, API moderne |
| Puppeteer | ❌ | Même équipe mais version antérieure, moins de features |
| Browserbase | ❌ | Payant, overkill (pas de Cloudflare détecté) |
| Docker gosom | ❌ | Go ≠ TypeScript, Colly mal adapté sites JS |

**Avantages Playwright pour ce POC :**
- Auto-wait élimine 80% des bugs timing
- TypeScript natif (cohérent stack Next.js)
- Debug facile (screenshots, traces, mode headed)
- Maintenu par Microsoft

**Exclus** :
- gold.fr → Pas de prix d'achat direct (formulaire/agence)
- AuCOFFRE → Stockage en coffre uniquement
- BullionByPost FR → Remplacé par Or.fr (meilleur programme affiliation)

### Design base de données : INSERT (pas UPSERT)

**Choix** : Chaque scrape ajoute de nouvelles lignes (INSERT), pas de mise à jour (UPSERT).

**Pourquoi** :
1. **Historique des prix** = valeur business (graphiques, tendances, alertes)
2. **Modèle concurrents** : GoldSilver.ai et FindBullionPrices stockent l'historique
3. **Volume négligeable** : 250 lignes/jour max = 91k/an, PostgreSQL gère des millions
4. **Réversible** : on peut toujours nettoyer, mais on ne peut pas recréer l'historique perdu

**Maintenance** : Nettoyer les données > 90 jours si besoin :
```sql
DELETE FROM dealer_prices WHERE scraped_at < NOW() - INTERVAL '90 days';
```

**Le composant `PriceComparator`** affiche les derniers prix via `ORDER BY scraped_at DESC`.

**Note** : Le composant ne se rafraîchit pas automatiquement. L'utilisateur doit **recharger la page** pour voir les nouveaux prix après le scraping quotidien (11h).

### Pièces candidates pour extension (à vérifier manuellement)

| Pièce | Godot | Pieces-Or | À vérifier |
|-------|-------|-----------|------------|
| Napoléon 10 Francs | ? | ✅ | URLs |
| Demi Souverain | ? | ✅ | URLs |
| 20 Francs Suisse (Vreneli) | ? | ✅ | URLs |
| 50 Pesos Mexicain | ✅ | ✅ | URLs |
| Maple Leaf 1oz | ? | ✅ | URLs |
| Philharmonique Vienne | ? | ✅ | URLs |
| 20 Dollars US Liberty | ✅ | ? | URLs |
| American Eagle | ? | ✅ | URLs |

---

## Alternatives Supabase (si limite projets gratuits atteinte)

Supabase free tier = 2 projets max. Alternatives pour projets futurs :

| Service | Free tier | Type | Notes |
|---------|-----------|------|-------|
| **Turso** | 500 DBs, 9GB total | SQLite edge | Ultra rapide, libSQL (fork SQLite) |
| **Neon** | Illimité projets, 0.5GB/projet | PostgreSQL | Serverless, branching Git-like |
| **Railway** | 5$/mois crédit | PostgreSQL | Simple, bon DX |
| **PlanetScale** | 1 DB gratuite | MySQL | Branching, mais pas PostgreSQL |
| **CockroachDB** | 10GB gratuit | PostgreSQL-compat | Distribué, enterprise |

### Turso (recommandé pour projets légers)

- **Technologie** : libSQL (fork SQLite par l'équipe originale)
- **Avantage** : Base edge = latence ultra faible, réplication mondiale
- **Gratuit** : 500 databases, 9GB stockage, 1 milliard row reads/mois
- **ORM** : Compatible Drizzle, Prisma (adapter)
- **Cas d'usage** : Apps légères, edge functions, projets perso

```bash
# Installation CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Créer une DB
turso db create mon-projet
turso db show mon-projet --url
```

### Neon (recommandé si besoin PostgreSQL)

- **Technologie** : PostgreSQL serverless
- **Avantage** : Compatible 1:1 avec Supabase (même SQL)
- **Gratuit** : Projets illimités, 0.5GB/projet, scale à zéro
- **Migration** : `pg_dump` / `pg_restore` direct depuis Supabase

### Turso vs Supabase (comparatif)

| Critère | Supabase | Turso |
|---------|----------|-------|
| Free tier | 2 projets | **500 databases** |
| Stockage | 500MB | 9GB |
| Type | PostgreSQL | SQLite edge |
| Latence | Bonne | **Ultra faible** (edge) |
| Auth intégrée | ✅ Oui | ❌ Non |
| Realtime | ✅ Oui | ❌ Non |

**Quand choisir Turso** : projets légers, API simples, pas besoin d'auth/realtime intégrés.

**Quand rester sur Supabase** : besoin d'auth, realtime, dashboard admin, PostgreSQL full.

---

## Session 2026-02-04 : Ajout Or.fr au comparateur

### Ce qui a été fait

1. **Inspection Or.fr via Browserbase** :
   - or.fr redirige vers goldbroker.com mais propose un site FR avec EUR
   - Livraison physique disponible (`?serviceType=3`)
   - 23 pièces d'or disponibles en livraison

2. **Scraper Or.fr créé** : `scripts/scrapers/scrape-orfr.ts`
   - 6 pièces trackées : Maple Leaf, Philharmonique, Kangourou, American Eagle, 20F Marianne Coq, 20F Vreneli
   - Prix en EUR, option livraison

3. **scrape-all.ts mis à jour** : intègre maintenant 3 dealers

### Prix Or.fr (2026-02-04, livraison)

| Pièce | Prix EUR |
|-------|----------|
| Kangourou 1oz | 4 430 € |
| Philharmonique 1oz | 4 447 € |
| Maple Leaf 1oz | 4 475 € |
| American Eagle 1oz | 4 561 € |
| 20F Marianne Coq | 860 € |
| 20F Vreneli | 849 € |

### Limitations Or.fr

- ❌ Pas de Krugerrand 1oz individuel (tubes de 10 uniquement)
- ❌ Pas de Souverain
- ❌ Pas de Napoléon 20F classique (mais 20F Marianne Coq similaire)

### Tableau comparatif dealers

| Critère | Godot | Pièces-Or | Or.fr |
|---------|-------|-----------|-------|
| **Affiliation** | ✅ 0.5-2% | ❌ Non | ✅ 0.2-0.4% + récurrent |
| **Krugerrand 1oz** | ✅ | ✅ | ❌ |
| **Napoleon 20F** | ✅ | ✅ | ⚠️ 20F Marianne |
| **Souverain** | ✅ | ✅ | ❌ |
| **Maple Leaf 1oz** | ✅ | ✅ | ✅ |
| **Devise** | EUR | EUR | EUR |
| **Cookie affil** | 1 an | - | 1 an |

### Prochaines étapes

- [x] Tester les 3 scrapers ensemble : `npx tsx scripts/scrapers/scrape-all.ts`
- [x] Créer table Supabase `dealer_prices`
- [x] Intégrer prix dealers dans pages VS
- [x] Ajouter pièces argent aux scrapers

---

## Session 2026-02-04 : Pièces argent ajoutées aux scrapers

### Ce qui a été fait

1. **Recherche dealers via Browserbase** : Identification des pièces argent disponibles chez chaque dealer

2. **6 pièces argent ajoutées au scraper Godot** :
   - Maple Leaf 1oz Argent (115,40€)
   - Philharmonique 1oz Argent (115,40€)
   - Britannia 1oz Argent (115,40€)
   - Krugerrand 1oz Argent (115,40€)
   - Kangourou 1oz Argent (115,40€)
   - Silver Eagle 1oz (118,40€)

3. **3 pièces argent ajoutées au scraper Pieces-Or** :
   - Maple Leaf 1oz Argent (92,31€)
   - Philharmonique 1oz Argent (92,31€)
   - Silver Eagle 1oz (92,31€)

4. **Mapping supabase.ts mis à jour** pour afficher prix argent dans pages VS

5. **GitHub Actions testé** : 25 prix insérés (12 Godot + 9 Pieces-Or + 4 Or.fr)

### Tableau couverture pièces argent

| Pièce Argent 1oz | Godot | Pieces-Or | Or.fr |
|------------------|:-----:|:---------:|:-----:|
| Maple Leaf | ✅ | ✅ | ❌ |
| Philharmonique | ✅ | ✅ | ❌ |
| Silver Eagle | ✅ | ✅ | ❌ |
| Britannia | ✅ | ❌ | ❌ |
| Krugerrand | ✅ | ❌ | ❌ |
| Kangourou | ✅ | ❌ | ❌ |

### Observation prix

Pieces-Or ~20% moins cher que Godot sur les pièces argent (92€ vs 115€)
