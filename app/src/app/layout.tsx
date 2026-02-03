import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "labonnepiece.fr - Comparateur de pieces d'or et d'argent",
  description:
    "Le guide francophone pour choisir la bonne piece d'or ou d'argent d'investissement. Comparatifs, fiscalite, liquidite.",
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
