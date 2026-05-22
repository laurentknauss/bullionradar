import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AffiliateLink } from "@/components/affiliate-link";

// Mock Vercel Analytics track function
const trackMock = vi.fn();
vi.mock("@vercel/analytics/react", () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

describe("<AffiliateLink />", () => {
  beforeEach(() => {
    trackMock.mockClear();
  });

  it("renders an anchor with children, target=_blank and rel='noopener noreferrer'", () => {
    render(
      <AffiliateLink
        href="https://example.com"
        dealer="pieces-or"
        coinName="Krugerrand 1oz Or"
        className="custom-class"
      >
        Voir le prix
      </AffiliateLink>,
    );

    const link = screen.getByRole("link", { name: /voir le prix/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("custom-class");
  });

  it("passes through the URL untouched for non-orfr / non-godot dealers", () => {
    render(
      <AffiliateLink
        href="https://pieces-or.com/produit/krugerrand"
        dealer="pieces-or"
        coinName="Krugerrand 1oz Or"
      >
        Lien
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://pieces-or.com/produit/krugerrand",
    );
  });

  it("appends the #2263-1-3 affiliate anchor for orfr dealer", () => {
    render(
      <AffiliateLink
        href="https://or.fr/produit/krugerrand"
        dealer="orfr"
        coinName="Krugerrand 1oz Or"
      >
        Lien orfr
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://or.fr/produit/krugerrand#2263-1-3",
    );
  });

  it("strips any existing hash before appending the orfr affiliate anchor", () => {
    render(
      <AffiliateLink
        href="https://or.fr/produit/krugerrand#old-anchor"
        dealer="orfr"
        coinName="Krugerrand 1oz Or"
      >
        Lien orfr
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://or.fr/produit/krugerrand#2263-1-3",
    );
  });

  it("transforms godot URL via getGodotAffiliateUrl when a mapping exists", () => {
    render(
      <AffiliateLink
        href="https://www.godot-fils.com/categorie/or/krugerrand-1-oz/12/"
        dealer="godot"
        coinName="Krugerrand 1oz Or"
      >
        Lien godot
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(
      "https://www.achat-or-et-argent.fr/entry-6555511,41461579,119753i",
    );
  });

  it("keeps original godot href when no tracking mapping exists", () => {
    const unknownGodot =
      "https://www.godot-fils.com/categorie/or/inconnu/99999999/";
    render(
      <AffiliateLink href={unknownGodot} dealer="godot" coinName="Untracked">
        Lien godot inconnu
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", unknownGodot);
  });

  it("does not transform a href that is '#' even for orfr/godot", () => {
    render(
      <AffiliateLink href="#" dealer="orfr" coinName="X">
        Lien placeholder
      </AffiliateLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("triggers Vercel Analytics tracking on click with dealer, coin and url", async () => {
    const user = userEvent.setup();
    render(
      <AffiliateLink
        href="https://or.fr/produit/maple"
        dealer="orfr"
        coinName="Maple Leaf 1oz Or"
      >
        Acheter
      </AffiliateLink>,
    );

    const link = screen.getByRole("link", { name: /acheter/i });
    await user.click(link);

    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith("Affiliate Click", {
      dealer: "orfr",
      coin: "Maple Leaf 1oz Or",
      url: "https://or.fr/produit/maple#2263-1-3",
    });
  });
});
