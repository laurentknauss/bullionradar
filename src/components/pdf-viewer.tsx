"use client";

import { useState, useCallback } from "react";
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
      {/* Download button */}
      <div className="mb-6 text-center">
        <a
          href={file}
          download
          className="inline-flex items-center gap-2 rounded-full bg-[#BE943C] px-6 py-3 font-bold text-black transition-colors hover:bg-amber-400"
        >
          Telecharger le PDF
        </a>
      </div>

      {/* PDF viewer */}
      <div className="overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800">
        {/* Navigation bar */}
        <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-4 py-3">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-600 disabled:opacity-30 disabled:hover:bg-neutral-700"
          >
            Precedent
          </button>
          <span className="text-sm text-neutral-300">
            Page {pageNumber} / {numPages || "..."}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-600 disabled:opacity-30 disabled:hover:bg-neutral-700"
          >
            Suivant
          </button>
        </div>

        {/* PDF content */}
        <div className="flex justify-center bg-neutral-600 p-4">
          {loading && (
            <div className="flex h-[600px] items-center justify-center">
              <div className="text-neutral-300">Chargement du PDF...</div>
            </div>
          )}
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            className="flex justify-center"
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

        {/* Bottom navigation */}
        <div className="flex items-center justify-center gap-2 border-t border-neutral-700 bg-neutral-900 px-4 py-3">
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setPageNumber(page)}
              className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
                page === pageNumber
                  ? "bg-[#BE943C] text-black"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {title && (
        <p className="mt-4 text-center text-sm text-neutral-500">{title}</p>
      )}
    </div>
  );
}
