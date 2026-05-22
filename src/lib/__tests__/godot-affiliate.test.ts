import { describe, it, expect } from "vitest";
import {
  getGodotAffiliateUrl,
  isGodotAffiliateTracked,
  filterUntrackedGodot,
  GODOT_HOMEPAGE_FALLBACK,
} from "@/lib/godot-affiliate";

const GODOT_AFFILIATE_PREFIX =
  "https://www.achat-or-et-argent.fr/entry-6555511,";

describe("getGodotAffiliateUrl", () => {
  it("returns the tracked affiliate URL for a known OR product", () => {
    // or/12 → Krugerrand 1oz (mapped in GODOT_ENTRY_SUFFIX_BY_PRODUCT)
    const url = "https://www.godot-fils.com/categorie/or/krugerrand-1-oz/12/";
    const result = getGodotAffiliateUrl(url);
    expect(result).toBe(`${GODOT_AFFILIATE_PREFIX}41461579,119753i`);
  });

  it("returns the tracked URL for a known ARGENT product", () => {
    // argent/14 → 100 Francs argent
    const url =
      "https://www.godot-fils.com/categorie/argent/100-francs-argent/14/";
    const result = getGodotAffiliateUrl(url);
    expect(result).toBe(`${GODOT_AFFILIATE_PREFIX}46545287,320629i`);
  });

  it("handles URLs without trailing slash", () => {
    const url = "https://www.godot-fils.com/categorie/or/krugerrand-1-oz/12";
    expect(getGodotAffiliateUrl(url)).toBe(
      `${GODOT_AFFILIATE_PREFIX}41461579,119753i`,
    );
  });

  it("returns null for empty input", () => {
    expect(getGodotAffiliateUrl("")).toBeNull();
  });

  it("returns null for a literal hash placeholder", () => {
    expect(getGodotAffiliateUrl("#")).toBeNull();
  });

  it("returns null for a URL that does not match the product pattern", () => {
    expect(
      getGodotAffiliateUrl("https://www.godot-fils.com/some-other-page"),
    ).toBeNull();
  });

  it("returns null for an or/argent product not in the mapping", () => {
    const unknown = "https://www.godot-fils.com/categorie/or/inconnu/99999999/";
    expect(getGodotAffiliateUrl(unknown)).toBeNull();
  });

  it("returns null for an unrelated metal segment", () => {
    const url = "https://www.godot-fils.com/categorie/platine/something/12/";
    expect(getGodotAffiliateUrl(url)).toBeNull();
  });
});

describe("isGodotAffiliateTracked", () => {
  it("returns true when a tracked URL exists", () => {
    expect(
      isGodotAffiliateTracked(
        "https://www.godot-fils.com/categorie/or/krugerrand-1-oz/12/",
      ),
    ).toBe(true);
  });

  it("returns false when no tracking exists", () => {
    expect(isGodotAffiliateTracked("")).toBe(false);
    expect(isGodotAffiliateTracked("#")).toBe(false);
    expect(
      isGodotAffiliateTracked(
        "https://www.godot-fils.com/categorie/or/x/999999/",
      ),
    ).toBe(false);
  });
});

describe("filterUntrackedGodot", () => {
  const trackedGodotUrl =
    "https://www.godot-fils.com/categorie/or/krugerrand-1-oz/12/";

  it("keeps non-godot dealers untouched", () => {
    const prices = [
      { dealer: "orfr", product_url: "https://or.fr/whatever" },
      { dealer: "pieces-or", product_url: "https://pieces-or.com/xyz" },
    ];
    expect(filterUntrackedGodot(prices)).toEqual(prices);
  });

  it("keeps godot rows that have a tracked URL", () => {
    const prices = [{ dealer: "godot", product_url: trackedGodotUrl }];
    expect(filterUntrackedGodot(prices)).toEqual(prices);
  });

  it("drops godot rows that are not tracked", () => {
    const prices = [
      {
        dealer: "godot",
        product_url:
          "https://www.godot-fils.com/categorie/or/inconnu/99999999/",
      },
      { dealer: "godot", product_url: trackedGodotUrl },
    ];
    const filtered = filterUntrackedGodot(prices);
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.product_url).toBe(trackedGodotUrl);
  });

  it("drops godot rows with null/undefined product_url", () => {
    const prices = [
      { dealer: "godot", product_url: null },
      { dealer: "godot" },
    ];
    expect(filterUntrackedGodot(prices)).toEqual([]);
  });

  it("returns an empty array for empty input", () => {
    expect(filterUntrackedGodot([])).toEqual([]);
  });
});

describe("GODOT_HOMEPAGE_FALLBACK", () => {
  it("starts with the expected affiliate base", () => {
    expect(GODOT_HOMEPAGE_FALLBACK.startsWith(GODOT_AFFILIATE_PREFIX)).toBe(
      true,
    );
  });
});
