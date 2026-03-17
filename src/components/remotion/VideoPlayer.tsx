"use client";

import { Player, type RenderPoster } from "@remotion/player";
import { useCallback } from "react";
import { CoinVideo, getCoinVideoDuration } from "./CoinVideo";
import { COIN_IMAGES } from "./coin-images";
import { COINS } from "@/lib/coins-data";

const FPS = 30;

export function VideoPlayer({ slug }: { slug: string }) {
  const coin = COINS.find((c) => c.id === slug);
  const image = COIN_IMAGES[slug];

  const renderPoster: RenderPoster = useCallback(() => {
    if (!coin || !image) return null;
    const accent = coin.metal === "gold" ? "#d4af37" : "#969696";

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <img
          src={`/${image}`}
          alt={coin.name}
          style={{ width: 200, height: 200, objectFit: "contain" }}
        />
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: 16,
              color: "#f5f0e8",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            bullionradar.fr
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: accent,
              lineHeight: 1.2,
            }}
          >
            {coin.name}
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1", marginTop: 8 }}>
            {coin.country} &middot; {coin.metal === "gold" ? "Or" : "Argent"}{" "}
            &middot; {coin.fineness}&permil;
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: accent,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                style={{ marginLeft: 2 }}
              >
                <path d="M15 9L1 17.66V0.34L15 9Z" fill="#0f172a" />
              </svg>
            </div>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Vue d&apos;ensemble
            </span>
          </div>
        </div>
      </div>
    );
  }, [coin, image]);

  if (!coin || !image) return null;

  const durationSeconds = getCoinVideoDuration(coin);

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <Player
        component={CoinVideo}
        inputProps={{ coin, image }}
        durationInFrames={durationSeconds * FPS}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={FPS}
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 12,
          overflow: "hidden",
        }}
        controls
        autoPlay={false}
        renderPoster={renderPoster}
        showPosterWhenUnplayed
        posterFillMode="player-size"
      />
    </div>
  );
}
