import { Metadata } from "next";
import { generatePageMetadata, personJsonLd } from "@/lib/seo";
import Image from "next/image";
import { CTABanner } from "@/components/common/cta-banner";
import { SectionHeader } from "@/components/common/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { Film, Feather, Sparkles, Lightbulb, ArrowUpRight } from "lucide-react";
import React from "react";

export const metadata: Metadata = generatePageMetadata({
  title: "About Reshma Muraleedharan Tp — Content Creator & Freelancer",
  description:
    "Learn about Reshma Muraleedharan Tp — a Content Creator, creative writer, and commercial director crafting cinematic visual narratives for brands and storytelling-driven audiences.",
  path: "/about",
  keywords: ["about Reshma Muraleedharan Tp", "Content Creator biography", "commercial director", "screenwriter portfolio"],
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <div className="container py-24 space-y-24 max-w-5xl">
        <section aria-label="About Reshma Muraleedharan Tp" className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <BlurReveal>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate shadow-soft-lg bg-navy">
                <Image
                  src="/images/selfPotrait.jpeg"
                  alt="Portrait photograph of Reshma Muraleedharan Tp — Content Creator and writer"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
              </div>
            </BlurReveal>
          </div>

          <div className="md:col-span-7 space-y-6">
            <BlurReveal delay={0.2}>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">About</span>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                Capturing stories through film &amp; written prose.
              </h1>
              <div className="space-y-4 pt-2 text-base text-muted-foreground leading-relaxed">
                <p>
                 I'm Reshma Muraleedharan TP, a writer and advertisement content creator from Kerala who believes every story should leave an emotional imprint. Whether it's a 30-second brand film, a short-form reel, or a screenplay, I'm drawn to stories that feel honest, cinematic, and human.
                </p>
                <p>
                  Born in Malappuram and now based in Ernakulam, I studied Journalism and Mass Communication before beginning my career in entertainment journalism. From writing movie news and reviews, I moved into film promotions and later into advertising, where I discovered my passion for crafting visual narratives for brands.
                </p>
                <p>
                  Over the years, I've worked across multiple creative teams as a Content Writer and Creative Head, developing campaigns, directing creative concepts, writing scripts, leading productions, and collaborating closely with clients. Each role strengthened my understanding of storytelling—not just as words on a page, but as experiences that connect people with ideas.
                </p>
                <p>
                  Today, I work independently as a Content Creator and Writer, focusing on brand films, product videos, and short-form stories that resonate with audiences. My approach is calm, cinematic, and precise—shaping each project around rhythm, atmosphere, and emotional clarity.
                </p>
              </div>
            </BlurReveal>
          </div>
        </section>

        <section aria-labelledby="storyverse-heading" className="rounded-2xl border border-slate bg-navy/40 p-8 md:p-12 shadow-soft-md space-y-6">
          <SectionHeader
            badgeTag="Personal Project"
            title="Storyverse"
            subtitle="A space for thoughts, emotions, and stories that grow from within."
          />

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Storyverse is an Instagram space created by Reshma Muraleedharan Tp to hold the thoughts, emotions, and stories that live inside her. Every post—whether it is a story, prose, poetry, or a review—comes from a deeply personal place.
            </p>
            <p>
              The name Storyverse was chosen intentionally because it does not belong to one single genre. It is a home for many moods, many voices, and many kinds of storytelling.
            </p>
            <p>
              Blue is also a meaningful part of its identity, and it shaped the visual language of the Storyverse logo from the beginning.
            </p>
          </div>

          <a
            href="https://www.instagram.com/storyverse_._?igsh=NGxvaDVhY255Yjkz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:text-gold/80"
          >
            Visit Storyverse
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        <section aria-label="Creative philosophy" className="rounded-2xl border border-slate bg-navy/40 p-8 md:p-12 shadow-soft-md space-y-8">
          <SectionHeader
            badgeTag="Creative Ethos"
            title="Philosophy"
            subtitle="The guiding principles shaping every frame and every sentence."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <FadeIn delay={0.1} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Film className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Cinematic Restraint</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confidence is expressed through composition and silence — allowing light, space, and movement to carry the narrative weight.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Feather className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Story Before Technology</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Equipment and technique exist to serve the emotional core of a story — never the reverse. The script leads every decision.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Emotional Truth</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Authenticity is the cornerstone of compelling storytelling — it's what makes characters relatable and narratives resonate.
              </p>
            </FadeIn>
          </div>
        {/* </section> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <FadeIn delay={0.1} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Film className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Cinematic Restraint</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confidence is expressed through composition and silence — allowing light, space, and movement to carry the narrative weight.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Feather className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Story Before Technology</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Equipment and technique exist to serve the emotional core of a story — never the reverse. The script leads every decision.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="space-y-3">
              <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit border border-gold/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">Authentic Human Moments</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Genuine emotion, natural light, and considered pacing create the kind of resonance that stays with audiences long after the screen fades.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. Storytelling Journey */}
        <section aria-labelledby="journey-heading" className="space-y-10">
          <SectionHeader
            badgeTag="Career Arc"
            title="Storytelling Journey"
            subtitle="Key milestones in filmmaking, script development, and commercial directing."
          />

          <ol className="relative border-l border-slate/60 pl-8 ml-2 space-y-10 list-none">
            <li className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3.5 w-3.5 rounded-full bg-gold shadow-gold-glow border-2 border-midnight" aria-hidden="true" />
              <time className="text-xs font-semibold text-gold tracking-wider uppercase" dateTime="2024">2024 — Present</time>
              <h3 className="font-heading text-lg font-bold text-white mt-1">Independent Commercial Directing</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
                Directing ad films, Instagram reels, and product videos for startups, fashion labels, and creative agencies. Building a body of work defined by aesthetic clarity and narrative precision.
              </p>
            </li>

            <li className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate border border-gold/50 border-2" aria-hidden="true" />
              <time className="text-xs font-semibold text-muted-foreground tracking-wider uppercase" dateTime="2021">2021 — 2023</time>
              <h3 className="font-heading text-lg font-bold text-white mt-1">Narrative Script Development & Short Films</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
                Developed and directed original short film scripts exploring human connection, memory, and identity — selected for regional and national independent film festivals.
              </p>
            </li>
          </ol>
        </section>

        {/* 4. CTA Banner */}
        <section aria-label="Contact call-to-action">
          <CTABanner
            heading="Let's build something extraordinary."
            description="Open to select commercial directing, brand film commissions, and creative writing collaborations."
            buttonLabel="Start a Conversation"
          />
        </section>
      </div>
    </>
  );
}
