"use client";

import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { COLORS, fadeIn, slideLeft, accentColor } from "./helpers";
import type { Coin } from "@/types";

// ─── Scene 1 : Intro / Hero (6s) ───
function IntroScene({ coin, image }: { coin: Coin; image: string }) {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, 0, 20);
  const scale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const accent = accentColor(coin.metal);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.bg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        <div
          style={{
            fontSize: 24,
            color: COLORS.slate500,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          bullionradar.fr
        </div>
        <Img
          src={staticFile(image)}
          style={{
            width: 280,
            height: 280,
            objectFit: "contain",
            margin: "0 auto 32px",
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: accent,
            lineHeight: 1.1,
          }}
        >
          {coin.name}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 24,
          }}
        >
          <div
            style={{
              background: accent,
              color: COLORS.bgDark,
              padding: "8px 24px",
              borderRadius: 8,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {coin.country}
          </div>
          <div
            style={{
              background: COLORS.slate500,
              color: COLORS.white,
              padding: "8px 24px",
              borderRadius: 8,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {coin.metal === "gold" ? "Or" : "Argent"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 2 : Caracteristiques (18s) ───
function SpecsScene({ coin }: { coin: Coin }) {
  const frame = useCurrentFrame();
  const accent = accentColor(coin.metal);

  const specs: { label: string; value: string | number }[] = [
    { label: "Metal", value: coin.metal === "gold" ? "Or" : "Argent" },
    { label: "Poids (oz)", value: coin.weight_oz },
    { label: "Poids (g)", value: coin.weight_g.toFixed(2) },
    { label: "Purete", value: `${coin.fineness}\u2030` },
    { label: "Diametre (mm)", value: coin.diameter_mm },
    { label: "Epaisseur (mm)", value: coin.thickness_mm },
    { label: "Pays", value: coin.country },
    { label: "Premiere annee", value: coin.first_year },
  ];
  if (coin.mintage) specs.push({ label: "Tirage", value: coin.mintage });
  if (coin.face_value)
    specs.push({ label: "Valeur faciale", value: coin.face_value });
  specs.push({ label: "Liquidite (1-5)", value: coin.liquidity });
  specs.push({ label: "Prime estimee (%)", value: coin.estimated_premium_pct });
  specs.push({ label: "TVA France (%)", value: coin.vat_fr_pct });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: accent,
          marginBottom: 40,
          opacity: fadeIn(frame, 0, 15),
        }}
      >
        Caracteristiques
      </div>
      <div style={{ width: 800 }}>
        {specs.map((s, i) => {
          const delay = i * 4 + 8;
          const op = fadeIn(frame, delay, 12);
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 24px",
                opacity: op,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontSize: 26,
              }}
            >
              <span style={{ color: COLORS.slate500 }}>{s.label}</span>
              <span style={{ color: COLORS.white, fontWeight: 700 }}>
                {s.value}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 3 : Points forts (15s) ───
function HighlightsScene({ coin }: { coin: Coin }) {
  const frame = useCurrentFrame();
  const accent = accentColor(coin.metal);
  const highlights = coin.highlights ?? [];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: accent,
          marginBottom: 50,
          opacity: fadeIn(frame, 0, 15),
        }}
      >
        Points forts
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: 1200,
        }}
      >
        {highlights.map((h, i) => {
          const delay = i * 10 + 10;
          const op = fadeIn(frame, delay, 15);
          const tx = slideLeft(frame, delay, 15);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: op,
                transform: `translateX(${tx}px)`,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: accent,
                  flexShrink: 0,
                }}
              />
              <div
                style={{ fontSize: 28, color: COLORS.white, fontWeight: 600 }}
              >
                {h}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 4 : Fiche recapitulative (12s) ───
function SummaryScene({ coin, image }: { coin: Coin; image: string }) {
  const frame = useCurrentFrame();
  const accent = accentColor(coin.metal);
  const op = fadeIn(frame, 0, 20);

  const keySpecs = [
    {
      label: "Poids",
      value: `${coin.weight_g.toFixed(2)}g (${coin.weight_oz} oz)`,
    },
    { label: "Purete", value: `${coin.fineness}\u2030` },
    { label: "Diametre", value: `${coin.diameter_mm} mm` },
    { label: "Premiere annee", value: String(coin.first_year) },
    { label: "Prime estimee", value: `${coin.estimated_premium_pct}%` },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: op,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          maxWidth: 1400,
        }}
      >
        <Img
          src={staticFile(image)}
          style={{
            width: 300,
            height: 300,
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: accent,
              marginBottom: 8,
            }}
          >
            {coin.name}
          </div>
          <div
            style={{
              fontSize: 24,
              color: COLORS.slate500,
              marginBottom: 32,
            }}
          >
            {coin.country}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {keySpecs.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 26,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: 10,
                  width: 600,
                }}
              >
                <span style={{ color: COLORS.slate500 }}>{s.label}</span>
                <span style={{ color: COLORS.white, fontWeight: 700 }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    i < coin.liquidity ? accent : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
            <span
              style={{
                fontSize: 22,
                color: COLORS.slate300,
                marginLeft: 12,
                alignSelf: "center",
              }}
            >
              Liquidite {coin.liquidity}/5
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 5 : Outro CTA (6s) ───
function OutroScene({ coin }: { coin: Coin }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeIn(frame, 0, 20);
  const accent = accentColor(coin.metal);
  const pulse = interpolate(frame, [0, fps], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.bg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 34,
            color: COLORS.slate300,
            marginBottom: 20,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Comparez gratuitement les prix des pieces chez les meilleurs dealers
          francais
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: accent,
            transform: `scale(${pulse})`,
          }}
        >
          bullionradar.fr
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Composition principale ───
export interface CoinVideoProps {
  coin: Coin;
  image: string;
}

export const CoinVideo: React.FC<CoinVideoProps> = ({ coin, image }) => {
  const { fps } = useVideoConfig();
  const hasHighlights = (coin.highlights?.length ?? 0) > 0;

  const scenes: { duration: number; Component: React.FC }[] = [
    { duration: 6, Component: () => <IntroScene coin={coin} image={image} /> },
    { duration: 18, Component: () => <SpecsScene coin={coin} /> },
  ];

  if (hasHighlights) {
    scenes.push({
      duration: 15,
      Component: () => <HighlightsScene coin={coin} />,
    });
  }

  scenes.push(
    {
      duration: 12,
      Component: () => <SummaryScene coin={coin} image={image} />,
    },
    { duration: 6, Component: () => <OutroScene coin={coin} /> },
  );

  let fromFrame = 0;

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark }}>
      <Audio src={staticFile("audio/bg-piano.mp3")} volume={0.15} loop />
      {scenes.map(({ duration, Component }, i) => {
        const start = fromFrame;
        const durationFrames = duration * fps;
        fromFrame += durationFrames;
        return (
          <Sequence key={i} from={start} durationInFrames={durationFrames}>
            <Component />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// Calculer la duree totale en fonction de la presence de highlights
export function getCoinVideoDuration(coin: Coin): number {
  const base = 6 + 18 + 12 + 6; // intro + specs + summary + outro
  const highlights = (coin.highlights?.length ?? 0) > 0 ? 15 : 0;
  return base + highlights;
}
