"use client";

import { track } from "@vercel/analytics/react";

interface AffiliateLinkProps {
  href: string;
  dealer: string;
  coinName: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  href,
  dealer,
  coinName,
  className,
  children,
}: AffiliateLinkProps) {
  // Construction du lien affilié si c'est Or.fr
  let finalHref = href;
  if (dealer === "orfr" && href !== "#") {
    // Si l'URL contient déjà un hash, on le remplace, sinon on l'ajoute
    const baseUrl = href.split("#")[0];
    finalHref = `${baseUrl}#2263-1-3`;
  }

  const handleClick = () => {
    track("Affiliate Click", {
      dealer,
      coin: coinName,
      url: finalHref,
    });
  };

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
