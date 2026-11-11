"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InstagramSliderItem, WorkSeries } from "@/types/work-series";
import { AutoSlider } from "./auto-slider";
import { ReelCard } from "./reel-card";

export type { InstagramSliderItem, WorkSeries };

export interface InstagramSliderProps {
  series: readonly WorkSeries[];
  /** "slider" = auto-scrolling rows (home), "grid" = still grid (work page). */
  variant?: "slider" | "grid";
  /** Show the "Works" heading and the top divider line. */
  showHeader?: boolean;
  /** Limit episodes shown per series (e.g. a preview on the home page). */
  maxItemsPerSeries?: number;
}

function SeriesHeading({ series }: { series: WorkSeries }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      {series.cover && (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
          <Image src={series.cover} alt={`${series.title} cover`} fill sizes="96px" className="object-cover" />
        </div>
      )}
      <h2 className="text-sm uppercase tracking-widest text-white/40 font-medium">
        {series.title}
        {series.episodes ? (
          <span className="text-white/25">
            {" "}
            — {series.episodes} {series.episodes === 1 ? "Episode" : "Episodes"}
          </span>
        ) : null}
      </h2>
    </div>
  );
}

export function InstagramSlider({
  series,
  variant = "slider",
  showHeader = true,
  maxItemsPerSeries,
}: InstagramSliderProps) {
  if (!series?.length) return null;

  return (
    <section
      className={cn(showHeader && "mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8")}
      aria-label="Instagram series"
    >
      {showHeader && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Works</p>
            <h3 className="mt-2 font-heading text-xl text-white sm:text-2xl md:text-3xl">Short-form stories, one by one.</h3>
          </div>
          <Link href="https://www.instagram.com/reshma_muraleedharan_tp?igsh=dHFuZHZqaWUwOThj/" target="_blank" rel="noreferrer" className="hidden items-center text-[10px] uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-gold md:inline-flex">
            Follow along
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}

      {series.map((s, index) => {
        const items = maxItemsPerSeries ? s.items.slice(0, maxItemsPerSeries) : s.items;

        return (
          <div key={s.id} className={cn(index === 0 ? (showHeader ? "mt-12" : "") : "mt-10")}>
            <SeriesHeading series={s} />

            {items.length === 0 ? (
              <p className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-white/40">
                Episodes coming soon.
              </p>
            ) : variant === "grid" ? (
              <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <ReelCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <AutoSlider items={items} baseVelocity={-0.6} />
            )}
          </div>
        );
      })}
    </section>
  );
}
