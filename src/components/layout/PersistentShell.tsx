"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import AmbientBackground from "./AmbientBackground";
import Preloader from "./Preloader";

export default function PersistentShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Draw-on stroke assembling preloader on initial visit */}
      <Preloader onComplete={() => setIsPreloaderDone(true)} />

      {/* Non-flat reactive ambient canvas background */}
      <AmbientBackground />

      {/* Brand custom cursor with yin-yang orbital swoosh follower */}
      <CustomCursor />

      {/* Persistent Shell Layout */}
      <div className="relative min-h-screen flex flex-col z-10 selection:bg-[#8E1624] selection:text-white">
        <Navbar />

        {/* Animated Page Transition Container */}
        <main className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  );
}
