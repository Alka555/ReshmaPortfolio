"use client";

import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { CategoryFilter } from "@/components/common/category-filter";
import { WritingCard } from "@/components/cards/writing-card";
import { WRITING_CATEGORIES } from "@/config/constants";
import { getWritingAction } from "@/actions/writing.actions";
import { WritingItem } from "@/types/writing";
import { FadeIn } from "@/components/motion/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { cmsEnabled, staticWriting } from "@/config/portfolio-content";

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [writingItems, setWritingItems] = useState<WritingItem[]>(() => {
    if (!cmsEnabled) {
      return (staticWriting as unknown as WritingItem[]).filter((item) => item.published);
    }
    return [] as WritingItem[];
  });
  const [loading, setLoading] = useState(!cmsEnabled);

  useEffect(() => {
    if (!cmsEnabled) {
      setLoading(false);
      return;
    }

    async function loadData() {
      setLoading(true);
      const res = await getWritingAction({
        category: activeCategory,
        publishedOnly: true,
      });
      setWritingItems((res.data as unknown as WritingItem[]) || []);
      setLoading(false);
    }
    loadData();
  }, [activeCategory]);

  return (
    <div className="container max-w-7xl px-4 md:px-8 py-32 md:py-40 space-y-16">
      <SectionHeader
        badgeTag="Words & Scripts"
        title="Writing"
        subtitle="A collection of essays, journal notes, and story-led writing shaped around tone, atmosphere, and clarity."
      />
      <div className="border-y border-white/15 py-5">
        <CategoryFilter
          categories={WRITING_CATEGORIES}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Writing Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : writingItems.length === 0 ? (
        <div className="py-16 text-center space-y-3 border-y border-white/15 bg-navy/20">
          <p className="font-heading text-lg font-bold text-white">No writing pieces found</p>
          <p className="text-sm text-muted-foreground">
            More stories coming soon. Try selecting another category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {writingItems.map((writing, idx) => (
            <FadeIn key={writing.id} delay={idx * 0.05}>
              <WritingCard writing={writing} variant="full" />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
