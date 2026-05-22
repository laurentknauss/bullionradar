import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatFineness, formatRelativeTime } from "@/lib/format";

describe("formatFineness", () => {
  it("appends the permille sign for a regular value", () => {
    expect(formatFineness("999.9")).toBe("999.9‰");
    expect(formatFineness("916.7")).toBe("916.7‰");
    expect(formatFineness("900")).toBe("900‰");
  });

  it("returns a dash for null", () => {
    expect(formatFineness(null)).toBe("-");
  });

  it("returns a dash for undefined", () => {
    expect(formatFineness(undefined)).toBe("-");
  });

  it("returns a dash for an empty string", () => {
    expect(formatFineness("")).toBe("-");
  });
});

describe("formatRelativeTime", () => {
  const FIXED_NOW = new Date("2026-05-22T12:00:00.000Z").getTime();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'à l'instant' for diffs under 2 minutes", () => {
    const oneMinuteAgo = new Date(FIXED_NOW - 60 * 1000).toISOString();
    expect(formatRelativeTime(oneMinuteAgo)).toBe("à l'instant");
  });

  it("returns minutes for diffs under an hour", () => {
    const fortyTwoMinAgo = new Date(FIXED_NOW - 42 * 60 * 1000).toISOString();
    expect(formatRelativeTime(fortyTwoMinAgo)).toBe("il y a 42 min");
  });

  it("returns hours for diffs under a day", () => {
    const fiveHoursAgo = new Date(FIXED_NOW - 5 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(fiveHoursAgo)).toBe("il y a 5h");
  });

  it("returns days for diffs of 24h or more", () => {
    const threeDaysAgo = new Date(
      FIXED_NOW - 3 * 24 * 60 * 60 * 1000,
    ).toISOString();
    expect(formatRelativeTime(threeDaysAgo)).toBe("il y a 3j");
  });

  it("handles exactly 60 minutes as 1 hour", () => {
    const sixtyMinAgo = new Date(FIXED_NOW - 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(sixtyMinAgo)).toBe("il y a 1h");
  });

  it("handles exactly 24 hours as 1 day", () => {
    const oneDayAgo = new Date(FIXED_NOW - 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(oneDayAgo)).toBe("il y a 1j");
  });
});
