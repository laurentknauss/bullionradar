import Link from "next/link";
import { Footer } from "@/components/footer";
import { PdfViewerWrapper } from "@/components/pdf-viewer-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Petit Guide du Stacker | BullionRadar",
  description:
    "Téléchargez gratuitement le guide complet pour investir dans les pièces d'or et d'argent en France. Fiscalité, dealers, pièces incontournables.",
  alternates: {
    canonical: "https://bullionradar.fr/guide",
  },
  openGraph: {
    title: "Le Petit Guide du Stacker | BullionRadar",
    description:
      "Téléchargez gratuitement le guide complet pour investir dans les pièces d'or et d'argent en France.",
    url: "https://bullionradar.fr/guide",
    images: [
      {
        url: "https://bullionradar.fr/images/og-bullionradar.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="mb-10 border-b border-amber-600/30 bg-[#BE943C]">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
          <Link href="/" className="shrink-0">
            <img
              src="/images/header-bullionradar.jpeg"
              alt="BullionRadar"
              className="h-24 w-auto rounded-lg md:h-32"
            />
          </Link>
          <div className="flex flex-1 items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black text-black hover:text-neutral-800 md:text-3xl"
            >
              BullionRadar
            </Link>
            <Link
              href="/"
              className="rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/20"
            >
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Title */}
      <div className="mx-auto max-w-3xl px-4 pb-8 text-center">
        <h1 className="text-3xl font-black md:text-4xl">
          Le Petit Guide du Stacker
        </h1>
        <p className="mt-3 text-neutral-300">
          Tout ce qu&apos;il faut savoir pour investir dans les pièces d&apos;or
          et d&apos;argent en France.
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="pb-16">
        <PdfViewerWrapper file="/docs/petit-guide-du-stacker.pdf" />
      </div>

      <Footer />
    </main>
  );
}
