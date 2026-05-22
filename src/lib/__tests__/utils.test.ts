import { describe, it, expect } from "vitest";
import { cn, getDealerDisplayName } from "@/lib/utils";

describe("cn (className merger)", () => {
  it("merges multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("handles conditional classnames via objects", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("dedupes Tailwind conflicts (twMerge behaviour)", () => {
    // tailwind-merge should keep only the last conflicting class
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("returns an empty string when called with no args", () => {
    expect(cn()).toBe("");
  });

  it("supports arrays of class values", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });
});

describe("getDealerDisplayName", () => {
  it("returns the friendly name for known dealers", () => {
    expect(getDealerDisplayName("godot")).toBe("Godot & Fils");
    expect(getDealerDisplayName("orfr")).toBe("Or.fr");
    expect(getDealerDisplayName("pieces-or")).toBe("Pieces-Or.com");
  });

  it("falls back to the raw dealer id when unknown", () => {
    expect(getDealerDisplayName("unknown-dealer")).toBe("unknown-dealer");
  });

  it("falls back gracefully for an empty string", () => {
    expect(getDealerDisplayName("")).toBe("");
  });

  it("is case sensitive (does not map capitalised dealers)", () => {
    // Documents current behaviour — keys are lowercase only
    expect(getDealerDisplayName("Godot")).toBe("Godot");
  });
});
