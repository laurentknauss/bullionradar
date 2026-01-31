import { CoinComparison } from "@/components/coin-comparison";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BE943C]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-black text-[#1a1a1a]">
            La Bonne Pièce
          </h1>
          <p className="mt-2 text-lg text-[#3d3520]">
            Comparez les pièces d&apos;or et d&apos;argent d&apos;investissement
          </p>
        </header>

        {/* Comparison */}
        <CoinComparison />
      </div>
    </main>
  );
}
