import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generatePageMetadata, websiteJsonLd, personJsonLd } from "@/lib/seo";
import {
  siteContent,
  featuredProjects,
  featuredWriting,
  staticAwards,
  staticTestimonials,
} from "@/config/portfolio-content";
import { Hero } from "@/components/common/hero";
import { SectionHeader } from "@/components/common/section-header";
import { ProjectCard } from "@/components/cards/project-card";
import { VideoEmbed } from "@/components/common/video-embed";
import { CTABanner } from "@/components/common/cta-banner";
import { AwardCard } from "@/components/cards/award-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { FadeIn } from "@/components/motion/fade-in";
import { InstagramSlider } from "../../components/common/instagram-slider";

export const metadata: Metadata = generatePageMetadata({
  title: "Reshma Muraleedharan Tp — Content Creator, Writer & Freelancer",
  description: "Cinematic films and considered stories by Reshma Muraleedharan Tp.",
  path: "/",
});

export default function HomePage() {
  const projects = featuredProjects;
  const writing = featuredWriting;
  const awards = staticAwards;
  const testimonials = staticTestimonials;

  return (
    <>
      {[websiteJsonLd(), personJsonLd()].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Hero
        title={siteContent.heroTitle}
        subtitle={siteContent.heroSubtitle}
        tagline={siteContent.tagline}
        backgroundImage={siteContent.heroBackgroundImage}
        portraitImage={siteContent.portraitImage}
        heroHighlightTitle={siteContent.introTitle}
        heroDescription={siteContent.introDescription}
        heroQuote="Quiet confidence tells the story better than noise."
        heroSkills={siteContent.skills}
      />

      <div className="space-y-24 pb-28 md:space-y-36 md:pb-36">
        <section className="container px-6 md:px-12 max-w-7xl" aria-labelledby="reels-slider">
          <InstagramSlider items={siteContent.reels} />
        </section>

        <section className="border-y border-white/10 bg-white/[0.02] py-16 md:py-24">
          <div className="container max-w-7xl px-6 md:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <FadeIn>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Creative philosophy</p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-white md:text-4xl">
                  Every story deserves a moment of stillness.
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                  I work at the threshold between image and feeling. The result is emotional storytelling with clarity, texture, and a sense of inevitability.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Films */}
        <section className="container px-6 md:px-12 max-w-7xl" aria-labelledby="featured-work">
          <FadeIn>
            <div className="flex items-end justify-between gap-8 mb-16 md:mb-20">
              <SectionHeader
                badgeTag="Selected films"
                title="Frames with a point of view."
                className="mb-0"
              />
              <Link
                href="/work"
                className="hidden md:inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors duration-300 shrink-0 pb-2"
              >
                View archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {projects.length > 0 ? (
            <div className="space-y-20 md:space-y-28">
              {projects.slice(0, 4).map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.08}>
                  <ProjectCard
                    project={project}
                    variant="editorial"
                    index={index}
                    aspectRatio={
                      project.category_slug === "instagram-reels" ? "9:16" : "16:9"
                    }
                    className={index % 2 === 1 ? "md:pl-[8%]" : ""}
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="py-12 border-y border-white/10 text-white/50">
              Selected films will appear here shortly.
            </p>
          )}

          <div className="mt-12 md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gold"
            >
              View archive
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Showreel — full bleed */}
        <section id="showreel" aria-labelledby="showreel-heading">
          <div className="container px-6 md:px-12 max-w-7xl mb-10">
            <FadeIn>
              <SectionHeader
                badgeTag="In motion"
                title="A moving archive."
                subtitle="A short study in pace, texture and narrative instinct."
                className="mb-0"
              />
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <div className="w-full">
              <VideoEmbed
                videoUrl={siteContent.showreelUrl}
                title="Reshma Muraleedharan Tp showreel"
                thumbnailUrl={siteContent.showreelThumbnail}
                variant="cinematic"
              />
            </div>
          </FadeIn>
        </section>

        {/* Writing */}
        <section className="container px-6 md:px-12 max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <FadeIn className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                badgeTag="Words"
                title="Writing between the frames."
                className="mb-6"
              />
              <Link
                href="/writing"
                className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors duration-300"
              >
                Read the journal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </FadeIn>

            <div className="lg:col-span-7 lg:col-start-6 divide-y divide-white/10">
              {writing.slice(0, 3).map((item, index) => (
                <FadeIn key={item.id} delay={index * 0.08}>
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-10 first:pt-0 last:pb-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                      {item.category_slug.replace(/-/g, " ")}
                    </p>
                    <h3 className="mt-4 font-heading text-3xl md:text-4xl tracking-[-0.04em] text-white group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm md:text-base leading-relaxed text-white/50">
                      {item.summary}
                    </p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Testimonials */}
        <section className="container px-6 md:px-12 max-w-7xl">
          <div className="grid gap-20 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
            <FadeIn>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-10">
                  Recognition
                </p>
                <div className="space-y-2">
                  {awards.slice(0, 4).map((award) => (
                    <AwardCard key={award.id} award={award} />
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-[2rem] border border-white/10 bg-midnight/40 p-8 md:p-10">
                {testimonials[0] && <TestimonialCard testimonial={testimonials[0]} />}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container px-6 md:px-12 max-w-7xl">
          <FadeIn>
            <CTABanner
              heading="Let's make something that feels true."
              description="For collaborations, commissioned films and story-led work."
              buttonLabel="Start a conversation"
            />
          </FadeIn>
        </section>
      </div>
    </>
  );
}
