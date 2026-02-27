# Documentation d'Affiliation Or.fr / Goldbroker

## Format des liens d'affiliation (Post Affiliate Pro)

Or.fr (et sa maison mère Goldbroker) utilisent la solution **Post Affiliate Pro** pour gérer leur programme partenaire.

Le format des liens profonds (deep links) fonctionne par ancrage URL (hash `#`), et se décompose de la manière suivante :

**Format standard :** `https://or.fr/page-produit#ID-X-Y`

### Décryptage des paramètres

1.  **`ID` (Exemple : `2263`) - L'Identifiant Affilié :**
    *   C'est la donnée la plus importante.
    *   C'est votre numéro partenaire unique. Il permet à Or.fr de lier le visiteur (via un cookie d'une durée d'un an généralement) et d'attribuer la commission à votre compte.
2.  **`X` (Exemple : `1`) - L'ID de la Campagne :**
    *   Définit le type de commission ou la campagne promotionnelle en cours.
    *   `1` est généralement la campagne par défaut (ex: 20% de partage de revenus sur les frais de stockage et la marge transactionnelle).
3.  **`Y` (Exemple : `3`) - L'ID du "Creative" (Outil Marketing) :**
    *   Définit le format visuel sur lequel l'utilisateur a cliqué. Cela permet d'avoir des statistiques détaillées dans le dashboard affilié.
    *   `1` : Bouton d'appel à l'action
    *   `2` : Bannière graphique
    *   `3` : Lien texte simple
    *   `4+` : Widgets divers (cours spot, ratio or/argent, etc.)

## Stratégie d'implémentation sur BullionRadar

BullionRadar étant un comparateur de prix, les visiteurs cliquent sur des liens insérés dans des tableaux de prix ou des fiches comparatives.

**Le format retenu est le "Lien Texte" (`Creative ID : 3`) avec la campagne par défaut (`Campaign ID : 1`).**

Par conséquent, chaque lien sortant vers le domaine `or.fr` généré dynamiquement par l'application doit se voir concaténer la chaîne de caractères suivante :
**`#2263-1-3`**

*(Exemple généré : `https://or.fr/achat-or/piece-or-krugerrand-1-once#2263-1-3`)*

## Protocole de Tracking et Vérification

Afin de vérifier que cette structure d'URL est correctement interprétée par Or.fr et que les clics sont bien comptabilisés, il est indispensable de mettre en place un tracking interne (First-Party) sur BullionRadar.

**Objectif :**
Pouvoir confronter nos propres statistiques de clics sortants (Outbound Clicks) avec les statistiques rapportées dans le dashboard d'affiliation Or.fr.

**Méthode :**
Si BullionRadar enregistre 1 000 clics vers Or.fr sur un mois donné, mais que le dashboard Or.fr n'en rapporte aucun, cela signifiera que la structure `#2263-1-3` n'est pas (ou plus) le bon format d'attribution, et qu'il faudra contacter leur support technique pour ajuster le paramétrage.
