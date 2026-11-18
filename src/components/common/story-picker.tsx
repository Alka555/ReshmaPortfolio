"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WorkSeries } from "@/types/work-series";
import { ReelCard } from "./reel-card";

interface StoryPickerProps {
  series: readonly WorkSeries[];
}

function episodeLabel(s: WorkSeries) {
  const count = s.episodes ?? s.items.length;
  if (!count) return "Coming soon";
  return `${count} ${count === 1 ? "Episode" : "Episodes"}`;
}

/**
 * Shows one card per story. Clicking a card reveals that story's videos below;
 * clicking it again hides them.
 */
export function StoryPicker({ series }: StoryPickerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = series.find((s) => s.id === activeId) ?? null;

  return (
    <div className="mt-10 space-y-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {series.map((s) => {
          const isActive = s.id === activeId;
          const cover = s.cover ?? s.items[0]?.thumbnail ?? "/images/placeholder.jpg";

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : s.id)}
              aria-expanded={isActive}
              aria-controls="story-episodes"
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                isActive
                  ? "border-gold shadow-[0_20px_40px_-15px_rgba(212,175,55,0.35)]"
                  : "border-white/10 hover:-translate-y-1 hover:border-gold/40"
              )}
            >
              <Image
                src={cover}
                alt={s.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[9px] uppercase tracking-[0.24em] text-gold">{episodeLabel(s)}</p>
                <h3 className="mt-1 font-heading text-base leading-tight text-white sm:text-lg">{s.title}</h3>
              </div>
            </button>
          );
        })}
      </div>

      <div id="story-episodes" aria-live="polite">
        {active ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-medium uppercase tracking-widest text-white/40">
                {active.title}
                <span className="text-white/25"> — {episodeLabel(active)}</span>
              </h2>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="text-[10px] uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-gold"
              >
                Close
              </button>
            </div>

            {active.items.length === 0 ? (
              <p className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-white/40">
                Episodes coming soon.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {active.items.map((item) => (
                  <ReelCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-[10px] uppercase tracking-[0.24em] text-white/40">
            Select a story to watch its episodes
          </p>
        )}
      </div>
    </div>
  );
}
