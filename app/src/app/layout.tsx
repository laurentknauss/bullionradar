import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
        className={`${karla.variable} font-sans antialiased tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
