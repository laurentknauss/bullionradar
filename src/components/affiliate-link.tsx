"use client";

import { track } from "@vercel/analytics";

interface AffiliateLinkProps {
  href: string;
  name: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  href,
  name,
  className,
  children,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("affiliate_click", { name, href })}
    >
      {children}
    </a>
  );
}
