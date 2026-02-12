import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEALER_DISPLAY_NAMES: Record<string, string> = {
  godot: "Godot & Fils",
  orfr: "Or.fr",
  "pieces-or": "Pieces-Or.com",
};

export function getDealerDisplayName(dealer: string): string {
  return DEALER_DISPLAY_NAMES[dealer] ?? dealer;
}
