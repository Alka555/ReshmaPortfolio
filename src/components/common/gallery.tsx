"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScaleHover } from "@/components/motion/scale-hover";
import { ProjectMediaItem } from "@/types/project";
import { cn } from "@/lib/utils";

export interface GalleryProps {
  items: ProjectMediaItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function Gallery({ items, columns = 3, className }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectMediaItem | null>(null);

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className={cn("grid gap-4 md:gap-6", columnClasses[columns], className)}>
        {items.map((item) => (
          <ScaleHover key={item.id} scale={1.02}>
            <div
              onClick={() => setSelectedImage(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedImage(item)}
              aria-label={item.caption || "Expand gallery image"}
              className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate bg-navy cursor-pointer group shadow-soft-sm hover:border-gold/40"
            >
              <Image
                src={item.mediaUrl}
                alt={item.caption || "Behind the scenes gallery image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {item.caption && (
                  <p className="text-xs text-white font-medium line-clamp-1">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          </ScaleHover>
        ))}
      </div>

      {/* Lightbox / Zoom Modal */}
      <Dialog open={Boolean(selectedImage)} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-slate bg-midnight p-2">
          {selectedImage && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedImage.mediaUrl}
                alt={selectedImage.caption || "Enlarged gallery view"}
                fill
                className="object-contain"
              />
              {selectedImage.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-midnight/80 backdrop-blur-md p-3 text-center text-sm text-white">
                  {selectedImage.caption}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
