"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import type { InstagramSliderItem } from "@/types/work-series";
import { ReelCard } from "./reel-card";

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
    const currentX = x.get();
    
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
          <ReelCard
            key={`${item.id}-${index}`}
            item={item}
            className="min-w-[260px] max-w-[280px]"
          />
        ))}
      </motion.div>
    </div>
  );
}
