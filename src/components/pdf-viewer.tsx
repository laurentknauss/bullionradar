"use client";

import { useState, useCallback } from "react";
import { track } from "@vercel/analytics";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: string;
  title?: string;
}

export function PdfViewer({ file, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
    },
    [],
  );

  return (
    <div className="mx-auto max-w-3xl px-4">
      {/* Download buttons */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={file}
          download
          onClick={() => track("pdf_download", { file })}
          className="inline-flex items-center gap-2 rounded-full bg-[#BE943C] px-6 py-3 font-bold text-black transition-colors hover:bg-amber-400"
        >
          Telecharger le PDF
        </a>
        <a
          href={file.replace(".pdf", ".epub")}
          download
          onClick={() =>
            track("epub_download", { file: file.replace(".pdf", ".epub") })
          }
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#BE943C] px-6 py-3 font-bold text-[#BE943C] transition-colors hover:bg-[#BE943C] hover:text-black"
        >
          Telecharger le EPUB
        </a>
      </div>

      {/* PDF viewer */}
      <div className="overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800">
        {/* Page indicator */}
        <div className="flex items-center justify-center border-b border-neutral-700 bg-neutral-900 px-4 py-2">
          <span className="text-sm text-neutral-300">
            Page {pageNumber} / {numPages || "..."}
          </span>
        </div>

        {/* PDF content with arrow overlays */}
        <div className="relative flex justify-center bg-neutral-600 p-4">
          {loading && (
            <div className="flex h-[600px] items-center justify-center">
              <div className="text-neutral-300">Chargement du PDF...</div>
            </div>
          )}

          {/* Left arrow */}
          {pageNumber > 1 && (
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/70 hover:text-white"
              aria-label="Page precedente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Right arrow */}
          {pageNumber < numPages && (
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/70 hover:text-white"
              aria-label="Page suivante"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            className="flex justify-center"
            onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl"
              width={700}
            />
          </Document>
        </div>
      </div>

      {title && (
        <p className="mt-4 text-center text-sm text-neutral-500">{title}</p>
      )}
    </div>
  );
}
