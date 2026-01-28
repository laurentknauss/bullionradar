"use client";

import { useState } from "react";

export function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.08)] p-4">
      <div className="space-y-1">
        <p className="text-sm font-bold text-[#1a1a1a]">
          Vos donnees restent privees
        </p>
        <p className="max-w-2xl text-xs leading-relaxed text-[#3d3520]">
          Nous ne stockons que votre email. Votre portefeuille est declaratif :
          nous ne savons pas combien de pieces vous possedez reellement. Aucune
          adresse, aucun tracking, aucune revente de donnees.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded px-2 py-1 text-[#3d3520] transition-colors hover:bg-[rgba(0,0,0,0.1)] hover:text-[#1a1a1a]"
      >
        &times;
      </button>
    </div>
  );
}
