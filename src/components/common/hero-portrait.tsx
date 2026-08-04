import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, FileText, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroPortraitProps {
  imageSrc?: string;
  alt?: string;
  name?: string;
  tagline?: string;
  intro?: string;
  socialLinks?: {
    instagram?: string;
    // youtube?: string;
    facebook?: string;
    linkedin?: string;
  };
  resumeHref?: string;
  className?: string;
}

export function HeroPortrait({
  imageSrc,
  alt = "Portrait of Reshma Muraleedharan Tp",
  name = "Reshma Muraleedharan Tp",
  tagline = "Content Creator · Writer · Freelancer",
  intro,
  socialLinks,
  resumeHref,
  className,
}: HeroPortraitProps) {
  const hasSocial = Boolean(socialLinks?.instagram || socialLinks?.facebook || socialLinks?.linkedin);

  return (
    <div className={cn("rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_90px_-35px_rgba(3,10,24,0.9)] backdrop-blur-xl sm:rounded-[2rem] sm:p-3", className)}>
      <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-midnight/70">
        {imageSrc ? (
          <div className="relative aspect-[4/5] min-h-[320px] w-full sm:aspect-[3/4] sm:min-h-[420px]">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.1)_0%,rgba(7,17,31,0.55)_100%)]" />
          </div>
        ) : (
          <div className="flex aspect-[4/5] min-h-[320px] flex-col items-start justify-end bg-[radial-gradient(circle_at_top_left,rgba(126,200,255,0.2),transparent_45%),linear-gradient(135deg,#091425_0%,#11243f_100%)] p-6 text-left sm:aspect-[3/4] sm:min-h-[420px] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Portrait pending</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight text-white">A defined portrait will anchor this story.</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Replace this placeholder with a refined portrait and the profile panel will immediately feel premium and personal.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Profile</p>
          <h3 className="font-heading text-2xl text-white">{name}</h3>
          <p className="text-sm uppercase tracking-[0.24em] text-white/50">{tagline}</p>
        </div>

        {intro ? <p className="text-sm leading-relaxed text-white/65">{intro}</p> : null}

        <div className="flex flex-wrap gap-3">
          {resumeHref ? (
            <Button asChild variant="primary" size="sm" className="gap-2">
              <Link href={resumeHref} target="_blank" rel="noreferrer">
                <FileText className="h-4 w-4" />
                <span>View resume</span>
              </Link>
            </Button>
          ) : null}
          {hasSocial ? (
            <div className="flex items-center gap-2">
              {socialLinks?.instagram ? (
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-gold hover:text-gold">
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
              {socialLinks?.facebook ? (
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-gold hover:text-gold">
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
              {socialLinks?.linkedin ? (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-gold hover:text-gold">
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
