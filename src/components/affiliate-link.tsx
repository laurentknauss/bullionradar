"use client";

import { track } from "@vercel/analytics/react";
import { getGodotAffiliateUrl } from "@/lib/godot-affiliate";

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
  let finalHref = href;

  if (dealer === "orfr" && href !== "#") {
    const baseUrl = href.split("#")[0];
    finalHref = `${baseUrl}#2263-1-3`;
  } else if (dealer === "godot" && href !== "#") {
    const tracked = getGodotAffiliateUrl(href);
    if (tracked) finalHref = tracked;
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
