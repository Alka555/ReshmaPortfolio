import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-white/10 bg-midnight/70 py-16 md:py-24",
        className
      )}
    >
      <div className="container px-4 md:px-8 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8 items-end">
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="font-heading text-2xl md:text-3xl font-medium tracking-[-0.04em] text-white hover:text-gold transition-colors duration-300"
            >
              {siteConfig.name}
            </Link>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              Content Creator · Writer · Freelancer
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="md:col-span-4 flex flex-wrap gap-x-8 gap-y-3"
          >
            {siteConfig.navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.18em] text-white/50 hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="md:col-span-3 flex items-center md:justify-end gap-6">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-gold transition-colors duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-white/35">
          <p>© {currentYear} {siteConfig.owner}</p>
          <p>Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
}
