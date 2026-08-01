import React from "react";
import { Award } from "@/types/writing";
import { cn } from "@/lib/utils";

export interface AwardCardProps {
  award: Award & { project_title?: string };
  className?: string;
}

export function AwardCard({ award, className }: AwardCardProps) {
  const projectTitle = award.projectTitle || award.project_title;

  return (
    <div
      className={cn(
        "border-t border-white/10 pt-6 space-y-2 transition-colors duration-300 hover:border-gold/30",
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-heading text-xl md:text-2xl font-medium tracking-[-0.03em] text-white">
          {award.title}
        </h4>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold shrink-0">
          {award.year}
        </span>
      </div>
      <p className="text-sm text-white/50">
        {award.organization}
        {projectTitle ? ` · ${projectTitle}` : ""}
      </p>
      {award.description && (
        <p className="text-sm text-white/40 leading-relaxed max-w-md">{award.description}</p>
      )}
    </div>
  );
}
