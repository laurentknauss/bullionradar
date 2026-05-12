const GODOT_AFFILIATE_BASE = "https://www.achat-or-et-argent.fr/entry-6555511,";

const GODOT_HOMEPAGE_FALLBACK = `${GODOT_AFFILIATE_BASE}37389977,3863p`;

const GODOT_ENTRY_SUFFIX_BY_PRODUCT: Record<string, string> = {
  // OR — Philharmonique
  "or/3205": "45123703,113962363i",
  "or/3206": "44938279,114062801i",
  "or/3208": "44799211,114101431i",
  "or/3207": "44729677,114078253i",
  // OR — Panda fractions
  "or/3288": "44528801,117554953i",
  "or/3291": "44412911,117701747i",
  "or/3290": "44358829,117694021i",
  "or/3289": "44219761,117624487i",
  // OR — Kangourou/Nugget
  "or/1698": "44127049,55932377i",
  "or/3297": "44011159,117933527i",
  "or/3299": "43856639,118026239i",
  "or/3296": "43733023,117887171i",
  // OR — Maple Leaf
  "or/3195": "43648037,113568337i",
  "or/3194": "43547599,113529707i",
  "or/3193": "43462613,113521981i",
  "or/3192": "43315819,113506529i",
  // OR — Krugerrand
  "or/667": "43161299,19210699i",
  "or/668": "43107217,19264781i",
  "or/1055": "42952697,32561227i",
  "or/12": "41461579,119753i",
  // OR — Britannia
  "or/3293": "42504589,117794459i",
  "or/3295": "42411877,117856267i",
  "or/3294": "42295987,117809911i",
  "or/3220": "42141467,114611347i",
  // OR — American Eagle
  "or/3216": "42064207,114456827i",
  "or/3217": "41956043,114472279i",
  "or/3218": "41901961,114503183i",
  "or/3215": "41716537,114387293i",
  // OR — American Buffalo
  "or/3219": "41608373,114588169i",
  // OR — Historiques / semi-numismatiques
  "or/49": "41283881,861449i",
  "or/11": "41167991,112027i",
  "or/35": "41067553,536957i",
  "or/33": "40974841,506053i",
  "or/839": "40905307,24920213i",
  "or/34": "40681253,529231i",
  "or/44": "40565363,737833i",
  "or/15": "40472651,166109i",
  "or/6": "40395391,42493i",
  "or/17": "40287227,204739i",
  "or/19": "40140433,235643i",
  "or/32": "39955009,490601i",
  "or/18860": "39908653,813381691i",
  "or/18": "39800489,227917i",
  "or/13": "39684599,142931i",
  "or/4767": "39630517,177933643i",
  "or/20": "47426051,258821i",
  // ARGENT — pièces françaises (les seules tracées chez Godot)
  "argent/28": "47279257,397889i",
  "argent/23": "47140189,305177i",
  "argent/22": "46908409,281999i",
  "argent/27": "46777067,390163i",
  "argent/14": "46545287,320629i",
  "argent/26": "46499831,374711i",
  "argent/25": "46305781,343807i",
};

export function getGodotAffiliateUrl(productUrl: string): string | null {
  if (!productUrl || productUrl === "#") return null;

  const match = productUrl.match(/\/(or|argent)\/[^/]+\/(\d+)\/?$/);
  if (!match) return null;

  const key = `${match[1]}/${match[2]}`;
  const suffix = GODOT_ENTRY_SUFFIX_BY_PRODUCT[key];
  if (!suffix) return null;

  return `${GODOT_AFFILIATE_BASE}${suffix}`;
}

export function isGodotAffiliateTracked(productUrl: string): boolean {
  return getGodotAffiliateUrl(productUrl) !== null;
}

export function filterUntrackedGodot<
  T extends { dealer: string; product_url?: string | null },
>(prices: T[]): T[] {
  return prices.filter(
    (p) => p.dealer !== "godot" || isGodotAffiliateTracked(p.product_url ?? ""),
  );
}

export { GODOT_HOMEPAGE_FALLBACK };
