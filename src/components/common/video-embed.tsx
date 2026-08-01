"use client";

import React, { useState } from "react";
import { getYouTubeEmbedUrl, cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";

export interface VideoEmbedProps {
  videoUrl: string;
  title?: string;
  thumbnailUrl?: string;
  aspectRatio?: "16:9" | "9:16" | "4:3";
  variant?: "default" | "cinematic";
  className?: string;
}

export function VideoEmbed({
  videoUrl,
  title = "Video Embed",
  thumbnailUrl,
  aspectRatio = "16:9",
  variant = "default",
  className,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const isCinematic = variant === "cinematic";

  const aspectClasses = {
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16] max-w-sm mx-auto",
    "4:3": "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-midnight",
        aspectClasses[aspectRatio],
        !isCinematic && "rounded-lg border border-white/10",
        className
      )}
    >
      {!isPlaying && thumbnailUrl ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="relative w-full h-full cursor-pointer group flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[800ms] ease-cinematic group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-midnight/30 group-hover:bg-midnight/15 transition-colors duration-500" />
          <span className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/70 bg-midnight/40 backdrop-blur-sm text-gold flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <Play className="h-7 w-7 md:h-8 md:w-8 fill-current translate-x-0.5" />
          </span>
        </button>
      ) : (
        <iframe
          src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
