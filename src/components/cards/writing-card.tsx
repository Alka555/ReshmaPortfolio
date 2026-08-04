import React from "react";
import Image from "next/image";
import { WritingItem } from "@/types/writing";
import { Badge } from "@/components/ui/badge";
import { ScaleHover } from "@/components/motion/scale-hover";
import { ExternalLink, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WritingCardProps {
  writing: WritingItem;
  variant?: "compact" | "full";
  className?: string;
}

export function WritingCard({
  writing,
  variant = "full",
  className,
}: WritingCardProps) {
  const categoryValue = writing.category ?? writing.categorySlug ?? writing.category_slug ?? "writing";
  const categoryLabel = String(categoryValue).replace(/-/g, " ");
  const isExternal = Boolean(writing.externalUrl || writing.external_url);
  const targetUrl = writing.externalUrl || writing.external_url || `/writing/${writing.id}`;

  return (
    <ScaleHover scale={1.02} className={cn("group h-full", className)}>
      <a
        href={targetUrl}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="flex flex-col justify-between h-full rounded-xl border border-slate bg-navy/40 p-4 shadow-soft-md transition-all duration-300 hover:border-gold/50 hover:shadow-soft-lg focus:outline-none focus:ring-1 focus:ring-gold sm:p-6"
      >
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <Badge variant="outline">{categoryLabel}</Badge>
            {isExternal ? (
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors duration-200" />
            ) : (
              <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors duration-200" />
            )}
          </div>

          {/* Optional Thumbnail */}
          {variant === "full" && writing.thumbnail && (
            <div className="relative w-full h-44 rounded-lg overflow-hidden bg-midnight">
              <Image
                src={writing.thumbnail}
                alt={writing.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Title & Summary */}
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-bold text-white transition-colors duration-200 group-hover:text-gold sm:text-xl">
              {writing.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {writing.summary}
            </p>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 text-xs font-semibold text-gold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
          <span>{isExternal ? "Read Publication" : "Read Piece"}</span>
        </div>
      </a>
    </ScaleHover>
  );
}
