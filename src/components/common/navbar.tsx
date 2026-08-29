"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-midnight/75 py-3 backdrop-blur-2xl" : "bg-transparent py-5 md:py-7",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-3 sm:px-4">

        <nav aria-label="Main Navigation" className="hidden items-center gap-7 md:flex">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative inline-flex items-center px-1 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-200",
                  isActive ? "text-gold" : "text-white/70 hover:text-gold"
                )}
              >
                <span>{link.name}</span>
                <span
                  className={cn(
                    "absolute bottom-1 left-0 h-0.5 rounded-full bg-gold transition-all duration-200",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="font-heading text-base font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:text-gold sm:text-lg">
          {/* {siteConfig.name} */}
          Reshma Muraleedharan Tp
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-full border border-white/10 bg-white/[0.05] p-2 text-white transition-colors hover:text-gold focus:outline-none md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-midnight/95 px-4 py-8 backdrop-blur-2xl sm:px-6 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-[11px] font-medium uppercase tracking-[0.24em] transition-colors",
                    isActive ? "text-gold" : "text-white/80 hover:text-gold"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
