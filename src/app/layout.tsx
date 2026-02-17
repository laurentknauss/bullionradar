import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BullionRadar | Unique Comparateur Indépendant Pièces Or & Argent",
  description:
    "BullionRadar scanne les dealers FR quotidiennement et vous donne le meilleur deal du jour. 50+ pièces bullion, 1200+ comparatifs gratuits.",
  metadataBase: new URL("https://bullionradar.fr"),
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
        url: "/images/header-bullionradar.jpeg",
        width: 550,
        height: 768,
        alt: "BullionRadar - Comparateur de pièces d'or et d'argent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BullionRadar | Comparateur Pièces Or & Argent",
    description:
      "Comparez 50+ pièces d'or et d'argent d'investissement. Prix mis à jour quotidiennement.",
    images: ["/images/header-bullionradar.jpeg"],
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
      </head>
      <body
        className={`${inter.variable} font-sans tracking-tight antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
