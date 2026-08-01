"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function BlurReveal({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: BlurRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(12px)",
        transform: isVisible ? "scale(1)" : "scale(0.98)",
        transition: `opacity ${duration}s cubic-bezier(0.19, 1, 0.22, 1), filter ${duration}s cubic-bezier(0.19, 1, 0.22, 1), transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`,
        transitionDelay: `${delay}s`,
        willChange: "opacity, filter, transform",
      }}
    >
      {children}
    </div>
  );
}
