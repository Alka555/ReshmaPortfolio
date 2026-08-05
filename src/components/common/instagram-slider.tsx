"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AutoSlider } from "./auto-slider";

export interface InstagramSliderItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  label: string;
}

export interface InstagramSliderProps {
  Ras: readonly InstagramSliderItem[];
  Moolans: readonly InstagramSliderItem[];
}

export function InstagramSlider({ Ras, Moolans }: InstagramSliderProps) {
  if (!Ras?.length && !Moolans?.length) return null;

  return (
    <section className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8" aria-label="Latest Instagram episodes">
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

      {Ras?.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-sm uppercase tracking-widest text-white/40 font-medium">
            Ras
          </h2>
          <AutoSlider items={Ras} baseVelocity={-0.6} />
        </div>
      )}

      {Moolans?.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-6 text-sm uppercase tracking-widest text-white/40 font-medium">
            Moolans Family Mart
          </h2>
          <AutoSlider items={Moolans} baseVelocity={-0.6} />
        </div>
      )}
    </section>
  );
}
