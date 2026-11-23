import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { WorkSeries } from "@/types/work-series";

interface StoryPickerProps {
  series: readonly WorkSeries[];
}

// Only show a count when the series sets `episodes` explicitly (same rule as the /work headings).
function episodeLabel(s: WorkSeries) {
  if (s.episodes) return `${s.episodes} ${s.episodes === 1 ? "Episode" : "Episodes"}`;
  return s.items.length ? "" : "Coming soon";
}

/**
 * Shows one card per story. Clicking a card opens the /work page scrolled to
 * that story's episodes (each story on /work has an anchor matching its id).
 */
export function StoryPicker({ series }: StoryPickerProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {series.map((s) => {
        const cover = s.cover ?? s.items[0]?.thumbnail ?? "/images/placeholder.jpg";

        return (
          <Link
            key={s.id}
            href={`/work#${s.id}`}
            aria-label={`${s.title}${episodeLabel(s) ? ` — ${episodeLabel(s)}` : ""}, view episodes`}
            className="group relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              {episodeLabel(s) && (
                <p className="text-[9px] uppercase tracking-[0.24em] text-gold">{episodeLabel(s)}</p>
              )}
              <h3 className="mt-1 font-heading text-base leading-tight text-white sm:text-lg">{s.title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
