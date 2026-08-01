"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScaleHover } from "@/components/motion/scale-hover";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    title: string;
    client: string;
    year: number;
    description: string;
    thumbnail: string;
    category?: string;
    category_slug?: string;
    video_url?: string;
    videoUrl?: string;
  };
  aspectRatio?: "16:9" | "9:16" | "4:3";
  variant?: "default" | "editorial";
  index?: number;
  className?: string;
}

export function ProjectCard({
  project,
  aspectRatio = "16:9",
  variant = "default",
  index = 0,
  className,
}: ProjectCardProps) {
  const category = project.category || project.category_slug || "work";
  const videoUrl = project.videoUrl || project.video_url;
  const aspectClasses = {
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16]",
    "4:3": "aspect-[4/3]",
  };

  const isEditorial = variant === "editorial";

  return (
    <ScaleHover scale={1.008} className={cn("group h-full", className)}>
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className={cn(
          "flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-midnight",
          isEditorial ? "gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-4 shadow-[0_20px_70px_-35px_rgba(7,22,44,0.95)] transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.045] md:p-6" : "border-t border-white/10 pt-6 hover:border-gold/40 transition-colors duration-500"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden bg-navy",
            aspectClasses[aspectRatio],
            isEditorial && index % 2 === 1 && "md:ml-auto md:w-[92%]"
          )}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover transition-transform duration-[800ms] ease-cinematic group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

          {videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-14 h-14 rounded-full border border-gold/60 bg-midnight/50 backdrop-blur-sm text-gold flex items-center justify-center">
                <Play className="h-5 w-5 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.2em] text-white/80">
            {category.replace(/-/g, " ")}
          </span>
        </div>

        <div className={cn("space-y-3", isEditorial && "md:max-w-md")}>
          <div className="flex items-baseline justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-[-0.04em] text-white group-hover:text-gold transition-colors duration-300 flex items-start justify-between gap-4">
            <span>{project.title}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-gold translate-y-1" />
          </h3>
          <p className="text-sm leading-relaxed text-white/55 line-clamp-2 max-w-lg">
            {project.description}
          </p>
        </div>
      </Link>
    </ScaleHover>
  );
}
