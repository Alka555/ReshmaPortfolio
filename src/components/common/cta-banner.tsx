import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * CTABanner Component
 * 
 * Purpose: Global call-to-action banner for client acquisition.
 */
export interface CTABannerProps {
  heading?: string;
  eyebrow?: string;
  description?: string;
  buttonLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function CTABanner({
  eyebrow = "Get in touch",
  heading = "Let's create something worth watching.",
  description = "Available for select ad film productions, commercial product videos, and creative writing commissions.",
  buttonLabel = "Let's Collaborate",
  onAction,
  className,
}: CTABannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 shadow-[0_20px_80px_-35px_rgba(7,22,44,0.95)] sm:px-8 md:px-10 md:py-16",
        className
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </p>
          <h3 className="font-heading text-3xl leading-[0.95] tracking-[-0.05em] text-white md:text-5xl">
            {heading}
          </h3>
          <p className="text-base text-white/60 leading-relaxed">
            {description}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          asChild
          className="group gap-2 shrink-0 rounded-full px-6"
        >
          <Link href="/contact" onClick={onAction}><span>{buttonLabel}</span><ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></Link>
        </Button>
      </div>
    </div>
  );
}
