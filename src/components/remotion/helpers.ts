import { interpolate, Easing } from "remotion";

// Couleurs alignees sur le theme BullionRadar (globals.css)
export const COLORS = {
  bg: "#1e293b", // slate-800
  bgDark: "#0f172a", // slate-900
  gold: "#d4af37", // --color-gold
  goldBright: "#ffd700", // --color-gold-bright
  silver: "#787878", // --color-silver
  silverLight: "#969696", // --color-silver-light
  white: "#ffffff",
  slate300: "#cbd5e1",
  slate500: "#64748b",
  emerald: "#34d399",
};

export function fadeIn(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

export function slideUp(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

export function slideLeft(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

export function accentColor(metal: "gold" | "silver") {
  return metal === "gold" ? COLORS.gold : COLORS.silverLight;
}
