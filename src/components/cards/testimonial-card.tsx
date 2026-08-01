import React from "react";
import { Testimonial } from "@/types/writing";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  testimonial: Testimonial & { avatar_url?: string | null };
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const avatarUrl = testimonial.avatarUrl || testimonial.avatar_url;

  return (
    <blockquote
      className={cn(
        "relative border-l border-gold/60 pl-8 md:pl-10 space-y-8",
        className
      )}
    >
      <Quote className="h-6 w-6 text-gold/50" aria-hidden="true" />
      <p className="font-heading text-2xl md:text-3xl leading-[1.15] tracking-[-0.03em] text-white">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-gold text-sm font-medium"
            aria-hidden="true"
          >
            {testimonial.author.charAt(0)}
          </div>
        )}
        <cite className="not-italic">
          <span className="block text-sm text-white">{testimonial.author}</span>
          <span className="block text-xs text-white/50 mt-0.5">
            {testimonial.title}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </span>
        </cite>
      </footer>
    </blockquote>
  );
}
