"use client";

import { useState } from "react";

interface YouTubeLiteEmbedProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

export function YouTubeLiteEmbed({
  videoId,
  thumbnailUrl,
  title,
}: YouTubeLiteEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden"
      aria-label={`Lire la vidéo : ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <div className="flex h-20 w-28 items-center justify-center rounded-2xl bg-red-600 shadow-2xl transition-transform group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="ml-2 h-10 w-10"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
