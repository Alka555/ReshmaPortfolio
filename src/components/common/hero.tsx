import React from "react";
import { Button } from "@/components/ui/button";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeroPortrait } from "@/components/common/hero-portrait";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  backgroundImage?: string;
  videoBgUrl?: string;
  onWatchReel?: () => void;
  onExploreWork?: () => void;
  className?: string;
  portraitImage?: string;
  portraitAlt?: string;
  heroHighlightTitle?: string;
  heroDescription?: string;
  heroQuote?: string;
  heroSkills?: ReadonlyArray<{ title: string; description: string }>;
}

export function Hero({
  title = "Bringing brands to life through visual storytelling..",
  subtitle = "Creating ad films, product videos, and social content that help brands engage audiences and make a lasting impact.",
  tagline = "Content Creator • Writer • Freelancer",
  backgroundImage,
  videoBgUrl,
  onWatchReel,
  onExploreWork,
  className,
  // portraitImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
  portraitImage = "/images/selfPotrait.jpeg",
  portraitAlt = "Portrait of Reshma Muraleedharan Tp",
  heroHighlightTitle = "I build cinematic worlds that feel intimate, clear, and quietly unforgettable.",
  heroDescription = "I craft stories that connect brands with people through emotion, clarity, and cinematic storytelling.",
  heroQuote = "Quiet confidence tells the story better than noise.",
  heroSkills,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[92svh] overflow-hidden bg-midnight pt-24 pb-12 sm:min-h-[100svh] sm:pt-28 sm:pb-16 md:pb-24",
        className
      )}
    >
      {/* Cinematic background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-95 animate-slow-zoom"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.95)_0%,rgba(7,17,31,0.72)_45%,rgba(7,17,31,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,200,255,0.24),transparent_46%)]" />
        </div>
      )}

      {videoBgUrl && (
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
            <source src={videoBgUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight" />
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(212,175,55,.08),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-3 sm:px-4 md:px-8">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="max-w-3xl lg:order-2">
            <BlurReveal>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                {tagline}
              </p>
              <h1 className="font-heading text-[clamp(2.35rem,6vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
                {title}
              </h1>
            </BlurReveal>

            <BlurReveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-8 sm:text-base md:text-lg">
                {subtitle}
              </p>
            </BlurReveal>

            <BlurReveal delay={0.35}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <Button asChild variant="primary" size="lg" className="group w-full justify-center gap-2 rounded-full px-6 shadow-[0_18px_45px_-18px_rgba(126,200,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:justify-start">
                  <Link href="#showreel" onClick={onWatchReel}>
                    <Play className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:scale-110" />
                    <span>Watch reel</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="group w-full justify-center gap-2 rounded-full px-6 transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:justify-start">
                  <Link href="/work" onClick={onExploreWork}>
                    <span>Explore work</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              {/* <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/60 sm:gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Selective commissions</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Remote + on-location</span>
              </div> */}
            </BlurReveal>
          </div>

          {(portraitImage || heroDescription || heroQuote || heroSkills?.length) ? (
            <BlurReveal delay={0.18} className="w-full lg:order-1 lg:max-w-sm">
              <HeroPortrait
                imageSrc={portraitImage}
                alt={portraitAlt}
                name="Reshma Muraleedharan Tp"
                tagline="Content Creator • Writer • Freelancer"
                intro={heroDescription}
                resumeHref="/resume"
                socialLinks={{ instagram: "https://www.instagram.com/reshma_muraleedharan_tp?igsh=dHFuZHZqaWUwOThj", facebook: "https://www.facebook.com/share/18WZ2LPGG5/", linkedin: "https://www.linkedin.com/in/reshma-muraleedharan-tp-021639288?utm_source=share_via&utm_content=profile&utm_medium=member_android" }}
              />
            </BlurReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
