import { Composition } from "remotion";
import {
  CoinVideo,
  getCoinVideoDuration,
} from "../components/remotion/CoinVideo";
import { COIN_IMAGES } from "../components/remotion/coin-images";
import { COINS } from "../lib/coins-data";

const FPS = 30;

// Pieces prioritaires pour l'export YouTube
const PRIORITY_COINS = [
  "maple-leaf-1oz-or",
  "krugerrand-1oz-or",
  "philharmonique-1oz-or",
  "britannia-1oz-or",
  "napoleon-20f-or",
  "maple-leaf-1oz-argent",
  "philharmonique-1oz-argent",
  "britannia-1oz-argent",
  "kangourou-1oz-argent",
  "american-eagle-1oz-argent",
];

function slugToCompositionId(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {PRIORITY_COINS.map((coinId) => {
        const coin = COINS.find((c) => c.id === coinId);
        const image = COIN_IMAGES[coinId];
        if (!coin || !image) return null;

        const duration = getCoinVideoDuration(coin);

        return (
          <Composition
            key={coinId}
            id={slugToCompositionId(coinId)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            component={CoinVideo as any}
            defaultProps={{ coin, image }}
            durationInFrames={duration * FPS}
            fps={FPS}
            width={1920}
            height={1080}
          />
        );
      })}
    </>
  );
};
