"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      <h2 className="mt-4 text-white/60">
        Ras entertainment
      </h2>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {Ras?.map((item :any) => (
          <article key={item.id} className="group min-w-[260px] max-w-[280px] rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_20px_60px_-35px_rgba(7,22,44,0.9)]">
            <Link href={item.href} target="_blank" rel="noreferrer" className="block">
              <div className="relative h-[320px] min-h-[320px] overflow-hidden rounded-[1.15rem] sm:h-[360px] sm:min-h-[360px]">
                <Image src={item.thumbnail} alt={item.title} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-midnight/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80">
                  {item.label}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="font-heading text-lg text-white">{item.title}</h4>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {/* ----------------------------------------------------------- */}

      <h2 className="mt-4 text-white/60">
        Moolans Famili Mart
      </h2>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {Moolans?.map((item :any) => (
          <article key={item.id} className="group min-w-[260px] max-w-[280px] rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_20px_60px_-35px_rgba(7,22,44,0.9)]">
            <Link href={item.href} target="_blank" rel="noreferrer" className="block">
              <div className="relative h-[320px] min-h-[320px] overflow-hidden rounded-[1.15rem] sm:h-[360px] sm:min-h-[360px]">
                <Image src={item.thumbnail} alt={item.title} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-midnight/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80">
                  {item.label}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="font-heading text-lg text-white">{item.title}</h4>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
