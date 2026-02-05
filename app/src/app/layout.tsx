import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BullionRadar | Unique Comparateur Indépendant Pièces Or & Argent",
  description:
    "BullionRadar scanne les dealers FR quotidiennement et vous donne le meilleur deal du jour. 50+ pièces bullion, 1900+ comparatifs gratuits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} font-sans tracking-tight antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
