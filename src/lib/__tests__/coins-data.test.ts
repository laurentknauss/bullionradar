import { describe, it, expect } from "vitest";
import {
  COINS,
  getCoinById,
  getGoldCoins,
  getSilverCoins,
} from "@/lib/coins-data";

describe("COINS catalogue invariants", () => {
  it("contains at least 50 coins (full catalogue)", () => {
    expect(COINS.length).toBeGreaterThanOrEqual(50);
  });

  it("has no duplicate ids", () => {
    const ids = COINS.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every coin has a non-empty id and name", () => {
    for (const coin of COINS) {
      expect(coin.id, `coin without id: ${JSON.stringify(coin)}`).toBeTruthy();
      expect(coin.id).toMatch(/^[a-z0-9-]+$/);
      expect(coin.name.trim()).not.toBe("");
    }
  });

  it("every coin has a valid metal (gold or silver)", () => {
    for (const coin of COINS) {
      expect(["gold", "silver"]).toContain(coin.metal);
    }
  });

  it("every coin has a positive weight in grams", () => {
    for (const coin of COINS) {
      expect(coin.weight_g, `coin ${coin.id}`).toBeGreaterThan(0);
      expect(coin.weight_oz, `coin ${coin.id}`).toBeGreaterThan(0);
    }
  });

  it("every coin has a purity strictly between 0 and 1", () => {
    for (const coin of COINS) {
      expect(coin.purity, `coin ${coin.id}`).toBeGreaterThan(0);
      expect(coin.purity, `coin ${coin.id}`).toBeLessThanOrEqual(1);
    }
  });

  it("every coin has a non-empty fineness string", () => {
    for (const coin of COINS) {
      expect(typeof coin.fineness).toBe("string");
      expect(coin.fineness.trim()).not.toBe("");
    }
  });

  it("every coin has a non-empty country", () => {
    for (const coin of COINS) {
      expect(coin.country.trim(), `coin ${coin.id}`).not.toBe("");
    }
  });

  it("every coin has a sensible first_year (between 1500 and 2100)", () => {
    for (const coin of COINS) {
      expect(coin.first_year).toBeGreaterThanOrEqual(1500);
      expect(coin.first_year).toBeLessThanOrEqual(2100);
    }
  });

  it("every coin has a liquidity score between 1 and 5", () => {
    for (const coin of COINS) {
      expect(coin.liquidity).toBeGreaterThanOrEqual(1);
      expect(coin.liquidity).toBeLessThanOrEqual(5);
    }
  });

  it("every coin has an estimated_premium_pct between 0 and 200", () => {
    for (const coin of COINS) {
      expect(
        coin.estimated_premium_pct,
        `coin ${coin.id}`,
      ).toBeGreaterThanOrEqual(0);
      expect(coin.estimated_premium_pct, `coin ${coin.id}`).toBeLessThanOrEqual(
        200,
      );
    }
  });

  it("every coin has positive diameter and thickness", () => {
    for (const coin of COINS) {
      expect(coin.diameter_mm, `coin ${coin.id}`).toBeGreaterThan(0);
      expect(coin.thickness_mm, `coin ${coin.id}`).toBeGreaterThan(0);
    }
  });

  it("VAT for gold investment coins is 0% (EU rule)", () => {
    // Gold coins qualifying as 'investment gold' are VAT-exempt in France
    for (const coin of COINS) {
      if (coin.metal === "gold") {
        expect(coin.vat_fr_pct, `gold coin ${coin.id}`).toBe(0);
      }
    }
  });

  it("design_changes (if present) are non-empty arrays of {year, description}", () => {
    for (const coin of COINS) {
      if (coin.design_changes !== undefined) {
        expect(Array.isArray(coin.design_changes)).toBe(true);
        expect(coin.design_changes.length).toBeGreaterThan(0);
        for (const change of coin.design_changes) {
          expect(typeof change.year).toBe("number");
          expect(change.description.trim()).not.toBe("");
        }
      }
    }
  });

  it("highlights (if present) are non-empty arrays of strings", () => {
    for (const coin of COINS) {
      if (coin.highlights !== undefined) {
        expect(Array.isArray(coin.highlights)).toBe(true);
        expect(coin.highlights.length).toBeGreaterThan(0);
        for (const h of coin.highlights) {
          expect(typeof h).toBe("string");
          expect(h.trim()).not.toBe("");
        }
      }
    }
  });
});

describe("getCoinById", () => {
  it("returns the coin for a known id", () => {
    const coin = getCoinById("krugerrand-1oz-or");
    expect(coin).toBeDefined();
    expect(coin?.id).toBe("krugerrand-1oz-or");
    expect(coin?.metal).toBe("gold");
  });

  it("returns the coin for another known id (silver)", () => {
    const coin = getCoinById("maple-leaf-1oz-argent");
    expect(coin).toBeDefined();
    expect(coin?.metal).toBe("silver");
  });

  it("returns undefined for an unknown id", () => {
    expect(getCoinById("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getCoinById("")).toBeUndefined();
  });
});

describe("getGoldCoins", () => {
  it("returns only gold coins", () => {
    const golds = getGoldCoins();
    expect(golds.length).toBeGreaterThan(0);
    for (const coin of golds) {
      expect(coin.metal).toBe("gold");
    }
  });

  it("returns the same total count as COINS filtered by metal", () => {
    const golds = getGoldCoins();
    const manualCount = COINS.filter((c) => c.metal === "gold").length;
    expect(golds.length).toBe(manualCount);
  });
});

describe("getSilverCoins", () => {
  it("returns only silver coins", () => {
    const silvers = getSilverCoins();
    expect(silvers.length).toBeGreaterThan(0);
    for (const coin of silvers) {
      expect(coin.metal).toBe("silver");
    }
  });

  it("returns the same total count as COINS filtered by metal", () => {
    const silvers = getSilverCoins();
    const manualCount = COINS.filter((c) => c.metal === "silver").length;
    expect(silvers.length).toBe(manualCount);
  });
});

describe("Gold + silver partition covers the whole catalogue", () => {
  it("gold + silver counts equal total", () => {
    expect(getGoldCoins().length + getSilverCoins().length).toBe(COINS.length);
  });
});
