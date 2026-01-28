import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="px-4 py-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-playfair)] text-[1.3rem] font-black text-[#1a1a1a]"
          >
            labonnepiece.fr
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-block rounded-[4px] border-2 border-[#1a1a1a] bg-transparent px-5 py-2 font-[family-name:var(--font-playfair)] text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFD700]"
            >
              Portefeuille
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero header image */}
      <div className="mx-auto max-w-[900px]">
        <Image
          src="/images/header-labonnepiece.jpeg"
          alt="labonnepiece.fr - Comparateur de pieces d'or et d'argent d'investissement"
          width={1390}
          height={780}
          className="block w-full"
          priority
        />
      </div>

      {/* Ornamental separator */}
      <div className="my-6 text-center text-2xl tracking-[0.5rem] text-[#A8892A]">
        &mdash;&thinsp;&#9670;&thinsp;&mdash;
      </div>

      {/* Content */}
      <main className="mx-auto max-w-[1000px] px-4 pb-12">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,0,0,0.12)] py-6 text-center text-sm text-[#3d3520]">
        <p>
          &copy; 2026{" "}
          <strong className="font-bold text-[#1a1a1a]">labonnepiece.fr</strong>{" "}
          &mdash; Guide independant d&apos;investissement en pieces d&apos;or et
          d&apos;argent
        </p>
      </footer>
    </div>
  );
}
