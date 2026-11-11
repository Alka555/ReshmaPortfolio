"use client";

// import { SectionHeader } from "@/components/common/section-header";
import { ProjectCard } from "@/components/cards/project-card";
import { Project } from "@/types/project";
import { FadeIn } from "@/components/motion/fade-in";
import { siteContent, staticProjects } from "@/config/portfolio-content";
import { InstagramSlider, InstagramSliderItem } from "@/components/common/instagram-slider";

export default function WorkPage() {
  // const featuredHomeProjects = (staticProjects as unknown as Project[])
  //   .filter((project) => project.featured && project.published)
  //   .filter((project) => project.category !== "instagram-reels")
  //   .slice(0, 4);

  const reelProjects = (staticProjects as unknown as Project[])
    .filter((project) => project.featured && project.published)
    .filter((project) => project.category === "instagram-reels");

  // Works content (same source as the home page "Works" slider)
  type ReelGroup = readonly InstagramSliderItem[];
  const [reelGroupA = [], reelGroupB = []] = siteContent.reels as readonly ReelGroup[];

  return (
    <div className="container max-w-7xl px-4 md:px-8 py-32 md:py-40 space-y-16">
      {/* <SectionHeader
        badgeTag="Portfolio Archive"
        title="Selected work"
        subtitle="An editorial collection of films, campaigns, and motion-led stories shaped around mood, rhythm, and meaning."
      /> */}

      {/**
       * Original work archive kept for reference.
       * This block is intentionally commented out and preserved without deletion.
       */}
      {/*
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
      */}

      {reelProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Instagram reels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-8">
            {reelProjects.map((project, idx) => (
              <FadeIn key={project.id} delay={idx * 0.08}>
                <ProjectCard
                  project={project}
                  variant="editorial"
                  aspectRatio="9:16"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* Featured films — commented out, preserved without deletion */}
      {/*
      {featuredHomeProjects.length > 0 && (
        <section className="space-y-10" aria-labelledby="featured-work">
          <FadeIn>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
              <SectionHeader
                badgeTag="Selected films"
                title="Frames with a point of view."
                className="mb-0"
              />
            </div>
          </FadeIn>

          <div className="space-y-20 md:space-y-28">
            {featuredHomeProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.08}>
                <ProjectCard
                  project={project}
                  variant="editorial"
                  index={index}
                  aspectRatio={project.category === "instagram-reels" ? "9:16" : "16:9"}
                  className={index % 2 === 1 ? "md:pl-[8%]" : ""}
                />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
      */}

      {/* Works — same content as shown on the home page */}
      <section aria-labelledby="works-slider">
        <InstagramSlider Ras={reelGroupA} Moolans={reelGroupB} />
      </section>
    </div>
  );
}
