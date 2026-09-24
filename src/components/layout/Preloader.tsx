"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Initializing Telemetry...");

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("ecell_intro_loaded");
    if (hasLoaded) {
      setIsLoading(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next < 30) setStageText("Initializing Telemetry...");
        else if (next < 65) setStageText("Linking IIT Bombay NEC Grid...");
        else if (next < 90) setStageText("Calibrating Incubation Labs...");
        else setStageText("Where Vision Meets Venture...");

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("ecell_intro_loaded", "true");
            onComplete?.();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 32);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsLoading(false);
    sessionStorage.setItem("ecell_intro_loaded", "true");
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F7F3E9] text-[#121316] select-none overflow-hidden"
        >
          {/* Subtle Warm Amber & Crimson Radial Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(130,17,30,0.08)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(212,139,40,0.1)_0%,transparent_50%)] pointer-events-none" />

          {/* Interactive Assembling Logo Centerpiece */}
          <div className="relative flex flex-col items-center max-w-sm px-6 text-center z-10">
            {/* Medallion with Authentic Hands Cradling Graduation Cap */}
            <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-28 h-28 p-2 rounded-full bg-white shadow-[0_10px_35px_rgba(70,50,30,0.15)] border border-[#121316]/10 flex items-center justify-center"
              >
                <Image
                  src="/photos/ecell-logo-trans.png"
                  alt="E-Cell VSBCETC Hands Holding Cap Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Pulsing Concentric Gold Arc */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#D48B28]/50 pointer-events-none"
              />
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#82111E] font-semibold font-mono">
                VSB College of Engineering Technical Campus
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display text-[#121316]">
                ENTREPRENEURSHIP CELL
              </h2>
              <p className="text-xs text-[#58554F] font-body italic">
                Autonomous • Coimbatore • IIT Bombay NEC Track
              </p>
            </motion.div>

            {/* Kinetic Progress Bar */}
            <div className="w-64 mt-8 flex flex-col items-center gap-2">
              <div className="w-full h-1.5 bg-[#EFE8DC] rounded-full overflow-hidden border border-[#121316]/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between w-full text-[10px] text-[#58554F] font-mono">
                <span>{stageText}</span>
                <span className="font-bold text-[#82111E]">{progress}%</span>
              </div>
            </div>

            {/* Skip Option with Glitch Effect */}
            <button
              onClick={handleSkip}
              className="mt-6 text-[11px] font-mono uppercase tracking-wider text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 btn-glitch focus:outline-none"
            >
              <span>Skip Introduction</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
