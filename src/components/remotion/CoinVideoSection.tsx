"use client";

import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
  () => import("@/components/remotion/VideoPlayer").then((m) => m.VideoPlayer),
  { ssr: false },
);

export function CoinVideoSection({
  slug,
  coinName,
}: {
  slug: string;
  coinName: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-center text-lg font-bold text-white">
        Vue d&apos;ensemble de {coinName}
      </h2>
      <VideoPlayer slug={slug} />
    </div>
  );
}
