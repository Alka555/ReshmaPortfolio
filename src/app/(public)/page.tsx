import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircleMore, MapPin } from "lucide-react";
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
import { InstagramSlider, InstagramSliderItem } from "../../components/common/instagram-slider";
import { Button } from "@/components/ui/button";

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
  type ReelGroup = readonly InstagramSliderItem[];
  const reelItems = (siteContent.reels as readonly ReelGroup[]).flat() as readonly InstagramSliderItem[];
  const reelGroupA = reelItems.slice(0, 4);
  const reelGroupB = reelItems.slice(4);
  const services = [
    {
      title: "Brand films",
      description:
        "Cinematic short-form stories tailored for launches, campaigns, and product narratives that feel polished and memorable.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Content strategy",
      description:
        "Thoughtful concepts, messaging systems, and narrative direction that give your ideas shape before they ever reach the screen.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Copy & scripting",
      description:
        "Emotionally grounded words for films, reels, interviews, and digital content that sound clear, human, and intentional.",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Social storytelling",
      description:
        "A calm, considered approach to building a meaningful online presence through stories, visuals, and consistent voice.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const approachSteps = [
    {
      title: "Listen",
      description:
        "I start by understanding your audience, your goals, and the feeling you want your work to carry.",
    },
    {
      title: "Define",
      description:
        "Together we shape the core message, visual direction, and narrative structure so the work feels focused from the start.",
    },
    {
      title: "Build",
      description:
        "I develop the concept, script, and visual language with care, attention, and a clear sense of rhythm.",
    },
    {
      title: "Improve",
      description:
        "We refine the details until the story lands with clarity, emotion, and the right impact.",
    },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

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
        portraitImage={siteContent.portraitImage || "/images/selfPotrait.jpeg"}
        heroHighlightTitle={siteContent.introTitle}
        heroDescription={siteContent.introDescription}
        heroQuote="Quiet confidence tells the story better than noise."
        heroSkills={siteContent.skills}
      />

      <div className="space-y-16 pb-20 sm:space-y-24 sm:pb-28 md:space-y-36 md:pb-36">
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl" aria-labelledby="reels-slider">
          <InstagramSlider Ras={reelGroupA} Moolans={reelGroupB} />
        </section>

        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl" aria-labelledby="storyverse-section">
          <FadeIn>
            <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] shadow-soft-md sm:rounded-[2rem]">
              <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[240px] sm:min-h-[320px] md:min-h-[420px]">
                  <Image
                    src="/images/Storyverse.jpeg"
                    alt="Storyverse cover image"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-6 p-5 sm:p-8 md:p-10 lg:p-12">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Storyverse</p>
                    <h2 className="font-heading text-3xl leading-tight text-white md:text-4xl">
                      A living space for thoughts, feelings, and the stories that stay with you.
                    </h2>
                  </div>

                  <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                    Storyverse is a personal corner for prose, poetry, reflections, and reviews—built around emotion, blue tones, and the feeling of being deeply understood.
                  </p>

                  <a
                    href="https://www.instagram.com/storyverse_._?igsh=NGxvaDVhY255Yjkz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-white"
                  >
                    Visit Storyverse
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02] py-12 sm:py-16 md:py-24">
          <div className="container max-w-7xl px-4 sm:px-6 md:px-12">
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
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl" aria-labelledby="featured-work">
          <FadeIn>
            <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between md:mb-20">
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
          <div className="container px-4 sm:px-6 md:px-12 max-w-7xl mb-8 sm:mb-10">
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
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl">
          <div className="grid gap-10 sm:gap-16 lg:grid-cols-12 lg:gap-8">
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
                    className="group block py-8 first:pt-0 last:pb-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold sm:py-10"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                      {item.category_slug.replace(/-/g, " ")}
                    </p>
                    <h3 className="mt-4 font-heading text-2xl tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-gold sm:text-3xl md:text-4xl">
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

        {/* Services & Approach */}
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl space-y-8">
          <FadeIn>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-[0_20px_60px_-25px_rgba(5,15,30,0.45)]">
              <div className="max-w-3xl">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">What I Can Do</p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-white md:text-4xl">
                  Services shaped around clarity, feeling, and momentum.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/65">
                  Every project is built to feel intentional, cinematic, and true to the story behind it.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.025]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-gold">0{index + 1}</p>
                        <h3 className="mt-2 font-heading text-xl text-white">{service.title}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-white/70">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-midnight/30 p-8 md:p-10 shadow-[0_20px_60px_-25px_rgba(5,15,30,0.4)]">
              <div className="max-w-3xl">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">My approach</p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-white md:text-4xl">
                  A process that keeps the story clear, human, and alive.
                </h2>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {approachSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-sm font-semibold text-gold">
                        {index + 1}
                      </div>
                      <h3 className="font-heading text-xl text-white">{step.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Awards & Testimonials */}
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
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
        {/* <section className="container px-6 md:px-12 max-w-7xl">
          <FadeIn>
            <CTABanner
              eyebrow="Ready to start"
              heading="Let's make something that feels true."
              description="For collaborations, commissioned films and story-led work."
              buttonLabel="Start a conversation"
            />
          </FadeIn>
        </section> */}
        <section className="container px-4 sm:px-6 md:px-12 max-w-7xl">
                <FadeIn>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-25px_rgba(5,15,30,0.45)] sm:rounded-[2rem] sm:p-8 md:p-10">
                    <div className="flex flex-col gap-6 sm:items-start md:flex-row md:items-end md:justify-between">
                      <div className="max-w-2xl">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Ready to start</p>
                        <h2 className="mt-3 font-heading text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
                          Let&apos;s begin a project that feels honest and lasting.
                        </h2>
                      </div>
                    
                      <Button
          variant="primary"
          size="lg"
          asChild
          className="group gap-2 shrink-0 rounded-full px-6"
        >
          <Link href="/contact">Start a conversation with me <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></Link>
        </Button>
                    </div>
      
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <a
                        href="https://www.google.com/maps/search/kochi"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/30 p-4 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]"
                      >
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">Visit me in Kochi</h3>
                          <p className="mt-1 text-sm text-white/60">Available for meetings and collaborations in Kochi.</p>
                        </div>
                      </a>
      
                      <a
                        href="/contact"
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/30 p-4 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]"
                      >
                        <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-gold" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">Book an appointment</h3>
                          <p className="mt-1 text-sm text-white/60">Choose a time for a conversation about your idea.</p>
                        </div>
                      </a>
      
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/30 p-4 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]"
                      >
                        <MessageCircleMore className="mt-1 h-5 w-5 shrink-0 text-gold" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">Chat on WhatsApp</h3>
                          <p className="mt-1 text-sm text-white/60">Start a quick conversation anytime on WhatsApp.</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </FadeIn>
      </section>
      </div>
    </>
  );
}
