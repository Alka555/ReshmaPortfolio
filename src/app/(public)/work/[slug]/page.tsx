import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlugAction, getProjectsAction } from "@/actions/projects.actions";
import { generatePageMetadata, projectJsonLd } from "@/lib/seo";
import { VideoEmbed } from "@/components/common/video-embed";
import { Gallery } from "@/components/common/gallery";
import { ProjectCard } from "@/components/cards/project-card";
import { SectionHeader } from "@/components/common/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { ArrowLeft, Calendar, User, Film } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: project } = await getProjectBySlugAction(slug);

  if (!project) return { title: "Project Not Found" };

  return generatePageMetadata({
    title: `${project.title} — ${project.client}`,
    description: project.description,
    image: project.thumbnail,
    path: `/work/${project.slug}`,
    keywords: [project.client, project.category_slug, "ad film", "commercial", "Reshma Muraleedharan Tp"],
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const { data: project } = await getProjectBySlugAction(slug);

  if (!project) notFound();

  const { data: relatedProjects = [] } = await getProjectsAction({
    category: project.category_slug,
    publishedOnly: true,
  });

  const filteredRelated = relatedProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <article className="container max-w-6xl space-y-16 py-24 md:py-32">
        {/* Back Navigation */}
        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-white w-fit">
          <Link href="/work">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Work</span>
          </Link>
        </Button>

        {/* Project Hero Header */}
        <header className="space-y-6">
          <BlurReveal >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">{project.category_slug.replace("-", " ")}</Badge>
              {project.featured && <Badge variant="outline">Featured Showcase</Badge>}
            </div>
            <h1 className="pt-3 font-heading text-4xl leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </BlurReveal>

          <div className="flex flex-wrap items-center gap-6 border-y border-white/10 py-5 text-sm text-white/55">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gold shrink-0" />
              <span>Client: <strong className="text-white font-medium">{project.client}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gold shrink-0" />
              <span>Year: <strong className="text-white font-medium">{project.year}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="h-4 w-4 text-gold shrink-0" />
              <span>Category: <strong className="text-white font-medium capitalize">{project.category_slug.replace("-", " ")}</strong></span>
            </div>
          </div>
        </header>

        {/* Primary Video Embed */}
        {project.video_url && (
          <FadeIn>
            <VideoEmbed
              videoUrl={project.video_url}
              title={`${project.title} — ${project.client}`}
              thumbnailUrl={project.thumbnail}
              aspectRatio={project.category_slug === "instagram-reels" ? "9:16" : "16:9"}
            />
          </FadeIn>
        )}

        {/* 4-Part Project Narrative */}
        <FadeIn delay={0.1}>
          <section
            aria-label="Project narrative and execution details"
            className="space-y-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_25px_80px_-35px_rgba(7,22,44,0.95)] md:p-10"
          >
            <h2 className="border-b border-white/10 pb-5 font-heading text-2xl text-white">
              Story behind the film
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.challenge && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">01 — The Challenge</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                </div>
              )}
              {project.idea && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">02 — Creative Concept</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.idea}</p>
                </div>
              )}
              {project.execution && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">03 — Production & Execution</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.execution}</p>
                </div>
              )}
              {project.outcome && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">04 — Outcome & Impact</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.outcome}</p>
                </div>
              )}
            </div>

            {!project.challenge && (
              <p className="text-base text-muted-foreground leading-relaxed">{project.description}</p>
            )}
          </section>
        </FadeIn>

        {/* Behind-The-Scenes Gallery */}
        {project.project_media && project.project_media.length > 0 && (
          <FadeIn delay={0.15}>
            <section aria-label="Behind the scenes photography gallery" className="space-y-6">
              <SectionHeader
                badgeTag="Production Stills"
                title="Behind The Scenes"
                subtitle="Photography and candid moments captured during the shoot — where stories begin before the edit."
              />
              <Gallery items={project.project_media} columns={3} />
            </section>
          </FadeIn>
        )}

        {/* Related Projects */}
        {filteredRelated.length > 0 && (
          <section aria-label="Related portfolio projects" className="space-y-8 border-t border-white/10 pt-12">
            <SectionHeader
              badgeTag="Continue Exploring"
              title="Related Work"
              subtitle="More films and creative productions in this category."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelated.map((rel, idx) => (
                <FadeIn key={rel.id} delay={idx * 0.1}>
                  <ProjectCard project={rel} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
