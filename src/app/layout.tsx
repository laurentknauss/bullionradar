import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "@fontsource/inter/latin.css";

export const metadata: Metadata = {
  title: "BullionRadar — Comparateur Pièces Or & Argent en France",
  description:
    "Comparez 58 pièces d'or et d'argent chez les principaux dealers français. Prix mis à jour chaque jour. 100% indépendant et gratuit.",
  metadataBase: new URL("https://bullionradar.fr"),
  alternates: {
    canonical: "https://bullionradar.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bullionradar.fr",
    siteName: "BullionRadar",
    title: "BullionRadar | Comparateur Indépendant Pièces Or & Argent",
    description:
      "Comparez 50+ pièces d'or et d'argent d'investissement. Prix mis à jour quotidiennement chez 3 dealers français.",
    images: [
      {
        url: "/images/og-bullionradar.jpg",
        width: 1200,
        height: 630,
        alt: "BullionRadar - Comparateur de pièces d'or et d'argent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BullionRadar | Comparateur Pièces Or & Argent",
    description:
      "Comparez 50+ pièces d'or et d'argent d'investissement. Prix mis à jour quotidiennement.",
    images: ["/images/og-bullionradar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bullionradar.fr/#website",
        url: "https://bullionradar.fr",
        name: "BullionRadar",
        description:
          "Comparateur indépendant de pièces d'or et d'argent d'investissement en France",
        inLanguage: "fr",
        publisher: { "@id": "https://bullionradar.fr/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://bullionradar.fr/#organization",
        name: "BullionRadar",
        url: "https://bullionradar.fr",
        logo: {
          "@type": "ImageObject",
          url: "https://bullionradar.fr/images/header-bullionradar.jpeg",
        },
        email: "webmaster@bullionradar.fr",
      },
    ],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="gb-site-verification"
          content="dd215eab2c6e54af896c0da31e2957a1fd983aad"
        />
      </head>
      <body className="font-sans tracking-tight antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
