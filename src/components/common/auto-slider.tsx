"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { InstagramSliderItem } from "./instagram-slider";

interface AutoSliderProps {
  items: readonly InstagramSliderItem[];
  baseVelocity?: number;
}

export function AutoSlider({ items, baseVelocity = -0.5 }: AutoSliderProps) {
  // Duplicate array 3 times to ensure smooth infinite scrolling even during fast drag
  const duplicatedItems = [...items, ...items, ...items];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useAnimationFrame((t, delta) => {
    if (isHovered || !containerRef.current) return;
    
    // Slower on desktop, slightly faster on mobile
    const velocity = isMobile ? baseVelocity * 1.5 : baseVelocity;
    
    // Normalize delta for 60fps frame time (~16.6ms)
    const moveBy = velocity * (delta / 16);
    
    let currentX = x.get();
    currentX += moveBy;
    
    const containerWidth = containerRef.current.scrollWidth;
    const oneSetWidth = containerWidth / 3;
    
    // Wrap around to keep scrolling infinitely
    if (currentX <= -oneSetWidth * 2) {
      currentX += oneSetWidth;
    } else if (currentX >= 0) {
      currentX -= oneSetWidth;
    }
    
    x.set(currentX);
  });

  const handleDragEnd = () => {
    setIsHovered(false);
    if (!containerRef.current) return;
    
    const oneSetWidth = containerRef.current.scrollWidth / 3;
    let currentX = x.get();
    
    // Correct boundary wrapping gracefully if dragging beyond limits
    if (currentX <= -oneSetWidth * 2) {
      x.set(currentX + oneSetWidth);
    } else if (currentX > 0) {
      x.set(currentX - oneSetWidth);
    }
  };

  return (
    <div 
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        ref={containerRef}
        className="flex w-max cursor-grab active:cursor-grabbing gap-4 pb-8 pt-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }} // Allow loose constraints for seamless visual wrap
        dragElastic={0} // No bounce on edges
        onDragStart={() => setIsHovered(true)}
        onDragEnd={handleDragEnd}
      >
        {duplicatedItems.map((item, index) => (
          <article 
            key={`${item.id}-${index}`} 
            className="group min-w-[260px] max-w-[280px] rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-3 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] hover:border-blue-500/20"
          >
            <Link href={item.href} target="_blank" rel="noreferrer" className="block focus:outline-none">
              <div className="relative h-[320px] min-h-[320px] overflow-hidden rounded-[1.15rem] sm:h-[360px] sm:min-h-[360px]">
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  fill 
                  sizes="280px" 
                  className="object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-md transition-all duration-500 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 group-hover:text-white">
                  {item.label}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </motion.div>
    </div>
  );
}
