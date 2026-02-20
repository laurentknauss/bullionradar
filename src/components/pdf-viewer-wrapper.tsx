"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(
  () => import("@/components/pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center text-neutral-400">
        Chargement du lecteur PDF...
      </div>
    ),
  },
);

interface PdfViewerWrapperProps {
  file: string;
}

export function PdfViewerWrapper({ file }: PdfViewerWrapperProps) {
  return <PdfViewer file={file} />;
}
