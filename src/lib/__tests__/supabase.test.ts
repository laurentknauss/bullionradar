import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock @supabase/supabase-js BEFORE importing the module under test
// so that the createClient call at module load doesn't try to reach the network.
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(),
  })),
}));

import { getPriceSlugFromCoinId } from "@/lib/supabase";
import { COINS } from "@/lib/coins-data";

describe("getPriceSlugFromCoinId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the mapped slug for a known coin id", () => {
    expect(getPriceSlugFromCoinId("krugerrand-1oz-or")).toBe("krugerrand-1oz");
    expect(getPriceSlugFromCoinId("maple-leaf-1oz-or")).toBe("maple-leaf-1oz");
    expect(getPriceSlugFromCoinId("napoleon-20f-or")).toBe("napoleon-20f");
  });

  it("returns null for an unknown id", () => {
    expect(getPriceSlugFromCoinId("not-a-real-coin")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(getPriceSlugFromCoinId("")).toBeNull();
  });

  it("returns a non-empty string when a mapping exists", () => {
    const slug = getPriceSlugFromCoinId("philharmonique-1oz-or");
    expect(slug).not.toBeNull();
    expect(typeof slug).toBe("string");
    expect((slug as string).length).toBeGreaterThan(0);
  });
});

describe("COIN_ID_TO_PRICE_SLUG <-> COINS coherence", () => {
  // These ids should all be mapped to a Supabase slug
  // (sampled across gold, silver and French coins)
  const SAMPLE_IDS = [
    "krugerrand-1oz-or",
    "maple-leaf-1oz-or",
    "napoleon-20f-or",
    "souverain-or",
    "20-francs-suisse-or",
    "philharmonique-1oz-argent",
    "britannia-1oz-argent",
    "krugerrand-1oz-argent",
  ];

  it.each(SAMPLE_IDS)("coin id %s exists in the catalogue", (id) => {
    const coin = COINS.find((c) => c.id === id);
    expect(coin, `expected ${id} to exist in COINS`).toBeDefined();
  });

  it.each(SAMPLE_IDS)("coin id %s maps to a Supabase price slug", (id) => {
    const slug = getPriceSlugFromCoinId(id);
    expect(slug, `expected ${id} to have a price slug`).not.toBeNull();
  });
});
