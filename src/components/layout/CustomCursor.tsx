"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMounted(true);

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .flip-card");
      if (interactive) {
        setIsHovered(true);
        const customAction = interactive.getAttribute("data-cursor-text");
        setCursorText(customAction || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let animId: number;
    const loop = () => {
      animId = requestAnimationFrame(loop);
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Central Precision Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-[#82111E] shadow-[0_0_8px_rgba(130,17,30,0.5)]"
        style={{ willChange: "transform" }}
      />

      {/* Kinetic Brand Follower */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex items-center justify-center transition-all duration-200 ease-out ${
          isHovered
            ? "w-16 h-16 -ml-8 -mt-8 bg-[#82111E]/15 border border-[#82111E] shadow-[0_0_15px_rgba(130,17,30,0.25)]"
            : "w-10 h-10 border border-[#D48B28]/70"
        } rounded-full backdrop-blur-[2px]`}
        style={{ willChange: "transform" }}
      >
        {!isHovered && (
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#82111E] opacity-70 animate-spin [animation-duration:5s]" />
        )}

        {isHovered && cursorText && (
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#82111E] font-display">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
