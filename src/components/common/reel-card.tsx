import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { InstagramSliderItem } from "@/types/work-series";

interface ReelCardProps {
  item: InstagramSliderItem;
  className?: string;
}

export function ReelCard({ item, className }: ReelCardProps) {
  return (
    <article
      className={cn(
        "group rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-3 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] hover:border-blue-500/20",
        className
      )}
    >
      <Link href={item.href} target="_blank" rel="noreferrer" className="block focus:outline-none">
        <div className="relative h-[320px] min-h-[320px] overflow-hidden rounded-[1.15rem] sm:h-[360px] sm:min-h-[360px]">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-md transition-all duration-500 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 group-hover:text-white">
            {item.label}
          </span>
        </div>
      </Link>
    </article>
  );
}
