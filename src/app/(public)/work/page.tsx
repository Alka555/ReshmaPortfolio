"use client";

import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { CategoryFilter } from "@/components/common/category-filter";
import { Search } from "@/components/common/search";
import { ProjectCard } from "@/components/cards/project-card";
import { WORK_CATEGORIES } from "@/config/constants";
import { getProjectsAction } from "@/actions/projects.actions";
import { Project } from "@/types/project";
import { FadeIn } from "@/components/motion/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { cmsEnabled, staticProjects } from "@/config/portfolio-content";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>(() => {
    if (!cmsEnabled) {
      return (staticProjects as unknown as Project[]).filter((project) => project.published);
    }
    return [] as Project[];
  });
  const [loading, setLoading] = useState(!cmsEnabled);

  useEffect(() => {
    if (!cmsEnabled) {
      setLoading(false);
      return;
    }

    async function loadData() {
      setLoading(true);
      const res = await getProjectsAction({
        category: activeCategory,
        publishedOnly: true,
      });
      setProjects((res.data as unknown as Project[]) || []);
      setLoading(false);
    }
    loadData();
  }, [activeCategory]);

  const filteredProjects = projects.filter((p) => {
    const title = p.title?.toLowerCase() ?? "";
    const client = p.client?.toLowerCase() ?? "";
    const description = p.description?.toLowerCase() ?? "";
    const query = searchQuery.toLowerCase();

    return title.includes(query) || client.includes(query) || description.includes(query);
  });

  return (
    <div className="container max-w-7xl px-6 md:px-12 py-32 md:py-40 space-y-16">
      <SectionHeader
        badgeTag="Portfolio Archive"
        title="Selected work"
        subtitle="An editorial collection of films, campaigns, and motion-led stories shaped around mood, rhythm, and meaning."
      />

      <div className="flex flex-col gap-6 border-y border-white/15 py-5 md:flex-row md:items-center md:justify-between">
        <CategoryFilter
          categories={WORK_CATEGORIES}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by title or client..."
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center space-y-3 border-y border-white/15 bg-navy/20">
          <p className="font-heading text-lg font-bold text-white">No projects found</p>
          <p className="text-sm text-muted-foreground">
            More stories coming soon. Try adjusting your category filter or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 md:gap-y-14">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.05} className={idx % 2 ? "md:ml-[8%]" : ""}>
              <ProjectCard
                project={project}
                variant="editorial"
                aspectRatio={project.category === "instagram-reels" ? "9:16" : "16:9"}
              />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
