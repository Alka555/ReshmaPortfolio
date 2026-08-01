"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: string;
  label: string;
}

export interface CategoryFilterProps {
  categories: readonly CategoryOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeId,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter categories"
      className={cn(
        "flex items-center space-x-5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={cn(
              "py-2 text-[10px] font-semibold tracking-[.18em] uppercase whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gold border-b",
              isActive
                ? "text-gold border-gold"
                : "text-muted-foreground border-transparent hover:border-gold/50 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
