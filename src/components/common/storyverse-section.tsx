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
          {/* Mobile: small centred logo with a fixed aspect ratio (fill images collapse without a height) */}
          <div className="relative mx-auto mt-6 aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-xl sm:mx-0 sm:mt-0 sm:max-w-none sm:rounded-none sm:aspect-auto sm:h-full sm:min-h-[320px] md:min-h-[420px]">
            <Image
              src="/images/Storyverse.jpeg"
              alt="Storyverse cover image"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 100vw, 45vw"
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
As a writer, I felt a deep desire to create a space for my thoughts, emotions, and the stories and characters that originate from within me. It was this decision that led me to create the Instagram account called &apos;Storyverse&apos;. Every single post I share through &apos;Storyverse&apos; is close to my heart. It could be a story, prose, poetry, or a review. It may or may not align with reader preferences. That is exactly why I insisted me to choosing the name &apos;Storyverse&apos;. Because I wanted a name that didn&apos;t lean toward any one specific genre. 

Along with this, I would also like to mention another thing. Blue is my favorite color, and that is exactly why I chose blue for the &apos;Storyverse&apos; logo.
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
