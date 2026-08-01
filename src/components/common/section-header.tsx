import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * SectionHeader Component
 * 
 * Purpose: Provides consistent editorial headers across sections.
 * Variants: Align left (default) or center.
 */
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badgeTag?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badgeTag,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4 mb-10",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badgeTag && (
        <Badge variant="outline" className="w-fit rounded-none border-0 px-0 text-[10px] tracking-[0.22em] text-gold">
          {badgeTag}
        </Badge>
      )}
      <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-[-0.05em] text-white leading-[0.95]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base text-white/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
