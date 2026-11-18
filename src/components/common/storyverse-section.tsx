import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

/** Storyverse feature card — shared by the home page and the /work page. */
export function StoryverseSection() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] shadow-soft-md sm:rounded-[2rem]">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[25%_75%]">
          {/* Mobile: fixed aspect ratio so the logo has a height (fill images collapse without one) */}
          <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-full sm:min-h-[320px] md:min-h-[420px]">
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
                A universe for the stories, feelings, and characters that live within me.
              </h2>
            </div>

            <p className="text-base leading-relaxed text-white/65 md:text-lg">
As a writer, I felt a deep desire to create a space for my thoughts, emotions, stories, and characters that quietly take shape within me. That desire eventually led me to create Storyverse — an Instagram space where I could give those ideas a life of their own.

Every piece I share through Storyverse is close to my heart. It could be a story, prose, poetry, a review, or simply an idea that I felt compelled to put into words. It may resonate with some readers and not with others, and that is perfectly alright. I wanted Storyverse to remain open to every kind of story that I might want to tell.

That is also why I chose the name Storyverse — a universe of stories without boundaries.

Blue has always been my favourite colour, and it naturally found its way into the Storyverse logo. It felt like the right colour for a space that holds so many different shades of thought, feeling, and imagination.
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
  );
}
