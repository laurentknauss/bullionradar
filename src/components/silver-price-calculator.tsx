"use client";

import { useState } from "react";
import Link from "next/link";

const TROY_OUNCE_GRAMS = 31.1035;

const PURITY_PRESETS = [
  {
    label: "999 (argent pur)",
    value: 0.999,
    desc: "Pièces bullion (Maple Leaf, Philharmonique, Britannia)",
  },
  {
    label: "925 (sterling)",
    value: 0.925,
    desc: "Pièces françaises (Hercule, Semeuse, Turin), argenterie",
  },
  {
    label: "900 (argent 900)",
    value: 0.9,
    desc: "Anciennes pièces françaises (50F Hercule, 100F Panthéon)",
  },
  {
    label: "800",
    value: 0.8,
    desc: "Pièces étrangères anciennes, certaine argenterie",
  },
];

function formatEur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function SilverPriceCalculator() {
  const [spotPerOz, setSpotPerOz] = useState<string>("31.00");
  const [weight, setWeight] = useState<string>("100");
  const [unit, setUnit] = useState<"g" | "kg" | "oz">("g");
  const [purityIndex, setPurityIndex] = useState(0);

  const spot = parseFloat(spotPerOz) || 0;
  const w = parseFloat(weight) || 0;
  const purity = PURITY_PRESETS[purityIndex].value;

  const weightGrams =
    unit === "kg" ? w * 1000 : unit === "oz" ? w * TROY_OUNCE_GRAMS : w;

  const pricePerGramPure = spot / TROY_OUNCE_GRAMS;
  const metalValue = weightGrams * purity * pricePerGramPure;
  const pricePerGram = pricePerGramPure * purity;

  return (
    <div className="space-y-8">
      {/* Entrée cours spot */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Cours spot de l&apos;argent (once troy)
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              min="0"
              value={spotPerOz}
              onChange={(e) => setSpotPerOz(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-4 text-2xl font-bold text-white focus:border-[#BE943C] focus:outline-none"
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-base text-neutral-400">
              EUR / oz
            </span>
          </div>
        </div>
        <p className="mt-3 text-base text-neutral-400">
          Vérifiez le cours actuel sur{" "}
          <Link
            href="/cours-argent"
            className="text-[#BE943C] underline hover:text-amber-300"
          >
            notre page cours de l&apos;argent en direct
          </Link>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-neutral-800 px-4 py-3 text-center">
            <p className="text-sm text-neutral-400">Prix au gramme (pur)</p>
            <p className="text-lg font-bold text-white">
              {formatEur(pricePerGramPure)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-800 px-4 py-3 text-center">
            <p className="text-sm text-neutral-400">Prix au kilo (pur)</p>
            <p className="text-lg font-bold text-white">
              {formatEur(pricePerGramPure * 1000)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-800 px-4 py-3 text-center">
            <p className="text-sm text-neutral-400">Prix gramme 925</p>
            <p className="text-lg font-bold text-white">
              {formatEur(pricePerGramPure * 0.925)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-800 px-4 py-3 text-center">
            <p className="text-sm text-neutral-400">Prix gramme 900</p>
            <p className="text-lg font-bold text-white">
              {formatEur(pricePerGramPure * 0.9)}
            </p>
          </div>
        </div>
      </div>

      {/* Calculateur */}
      <div className="rounded-xl border-2 border-[#BE943C]/60 bg-neutral-900">
        <div className="bg-[#BE943C] px-6 py-3 text-center">
          <span className="text-base font-black text-black">
            CALCULATEUR DE VALEUR
          </span>
        </div>

        <div className="p-6">
          {/* Poids */}
          <div className="mb-8">
            <label className="mb-3 block text-base font-semibold text-neutral-300">
              Poids
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                step="0.01"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-4 text-xl font-bold text-white focus:border-[#BE943C] focus:outline-none"
              />
              <div className="flex overflow-hidden rounded-lg border border-neutral-700">
                {(["g", "kg", "oz"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-5 py-4 text-base font-bold transition-colors ${
                      unit === u
                        ? "bg-[#BE943C] text-black"
                        : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                  >
                    {u === "oz" ? "oz troy" : u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pureté */}
          <div className="mb-8">
            <label className="mb-3 block text-base font-semibold text-neutral-300">
              Titre (pureté)
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {PURITY_PRESETS.map((preset, i) => (
                <button
                  key={preset.label}
                  onClick={() => setPurityIndex(i)}
                  className={`rounded-lg px-5 py-4 text-left transition-colors ${
                    purityIndex === i
                      ? "border-2 border-[#BE943C] bg-[#BE943C]/10"
                      : "border border-neutral-700 bg-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <p
                    className={`text-base font-bold ${purityIndex === i ? "text-[#BE943C]" : "text-white"}`}
                  >
                    {preset.label}
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Résultat */}
          <div className="rounded-xl bg-neutral-800 p-8 text-center">
            <p className="text-base text-neutral-400">Valeur métal estimée</p>
            <p className="mt-2 text-5xl font-black text-[#BE943C]">
              {formatEur(metalValue)}
            </p>
            <p className="mt-3 text-base text-neutral-400">
              {weightGrams.toFixed(1)}g d&apos;argent{" "}
              {PURITY_PRESETS[purityIndex].label} × {formatEur(pricePerGram)}/g
            </p>
          </div>

          {/* Estimation rachat */}
          <div className="mt-6 rounded-lg border border-amber-600/20 bg-amber-900/10 px-5 py-4">
            <p className="text-base leading-relaxed text-neutral-300">
              <strong className="text-amber-400">
                Estimation prix de rachat :
              </strong>{" "}
              un professionnel rachète typiquement entre{" "}
              <strong className="text-white">
                {formatEur(metalValue * 0.8)}
              </strong>{" "}
              et{" "}
              <strong className="text-white">
                {formatEur(metalValue * 0.9)}
              </strong>{" "}
              (80–90% de la valeur métal). Cette décote couvre la marge du
              racheteur et les frais d&apos;affinage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
