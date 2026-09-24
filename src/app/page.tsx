"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Logo3DScene from "@/components/3d/Logo3DScene";
import { initialEvents } from "@/lib/data";
import {
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Flame,
  Download,
  Users,
  Award,
} from "lucide-react";

export default function HomePage() {
  const currentEvent = initialEvents[0]; // INNOVATEX 2026

  const [timeLeft, setTimeLeft] = useState({
    days: 24,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-18T09:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-24 pb-20 overflow-hidden text-[#121316]">
      {/* 1. HERO SECTION WITH AUTHENTIC PHOTO BACKGROUND & 3D MEDALLION */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Cinematic Atmospheric Photo Backdrop (Tinted with Warm Beige) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/photos/stage_team_full.webp"
            alt="VSBCETC Innovation Ecosystem Background"
            fill
            className="object-cover opacity-15 filter grayscale contrast-125 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F3E9] via-[#F7F3E9]/80 to-[#F7F3E9]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Institutional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#121316]/10 text-[#58554F] text-xs font-mono uppercase tracking-widest mb-6 shadow-xs backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#82111E] animate-ping" />
            <span className="font-semibold text-[#121316]">VSB College of Engineering Technical Campus</span>
            <span className="text-[#8A857C] hidden sm:inline">• Autonomous Coimbatore</span>
          </motion.div>

          {/* Interactive 3D Emblem (Hands Holding Cap in the Air) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-2"
          >
            <Logo3DScene variant="hero" />

            {/* Orbiting micro tags */}
            <div className="hidden sm:block absolute -top-1 -left-10 px-3.5 py-1 text-[11px] font-mono bg-white/90 border border-[#82111E]/20 rounded-full text-[#82111E] font-bold shadow-md">
              IIT Bombay NEC
            </div>
            <div className="hidden sm:block absolute -bottom-1 -right-10 px-3.5 py-1 text-[11px] font-mono bg-white/90 border border-[#D48B28]/30 rounded-full text-[#D48B28] font-bold shadow-md">
              Autonomous Incubation
            </div>
          </motion.div>

          {/* Slogan & Editorial Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 mt-3"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#121316] uppercase leading-[0.95]">
              Where Vision <br />
              <span className="bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28] bg-clip-text text-transparent">
                Meets Venture
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#58554F] font-light leading-relaxed">
              The premier student venture launchpad at VSBCETC Coimbatore. We convert collegiate research breakthroughs into scalable, venture-backed enterprises.
            </p>
          </motion.div>

          {/* Action Buttons with Glitch Effect on Press */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <Link
              href="/events"
              className="btn-glitch group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#82111E] to-[#9E1B28] hover:from-[#9E1B28] hover:to-[#B82132] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 flex items-center gap-2"
              data-cursor-text="Event"
            >
              <span>Explore INNOVATEX 2026</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/team"
              className="btn-glitch px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#121316]/15 text-[#121316] font-bold text-xs uppercase tracking-widest shadow-xs transition-all duration-200"
              data-cursor-text="Team"
            >
              Meet The 20 Leads
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. KINETIC MARQUEE BANNER */}
      <section className="relative my-8 py-3.5 bg-[#82111E] text-white border-y border-[#82111E] overflow-hidden select-none shadow-sm">
        <div className="flex whitespace-nowrap animate-[marquee_24s_linear_infinite]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 mx-4 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] font-semibold">
              <span className="text-[#F7F3E9]">IDEAS TODAY, IMPACT TOMORROW</span>
              <span>•</span>
              <span className="text-[#F5D061]">VSBCETC COIMBATORE</span>
              <span>•</span>
              <span>WHERE VISION MEETS VENTURE</span>
              <span>•</span>
              <span className="text-[#F5D061]">NATIONAL ENTREPRENEURSHIP CHALLENGE IIT BOMBAY</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURRENT EVENT TEASER (INNOVATEX 2026) WITH ATMOSPHERIC LAB BACKDROP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-white border border-[#121316]/10 shadow-[0_15px_45px_rgba(70,55,35,0.08)] overflow-hidden">
          {/* Background Workshop Photo Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <Image
              src="/photos/workshop_1.webp"
              alt="Lab Session Texture"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#82111E] text-white">
                  Spotlight Event
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono bg-[#FAF6F0] border border-[#121316]/10 text-[#82111E] font-semibold">
                  <Flame className="w-3.5 h-3.5 text-[#D48B28]" />
                  Prize Pool: {currentEvent.prizePool}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-[#121316] uppercase">
                  {currentEvent.title}
                </h2>
                <p className="text-sm sm:text-base font-mono text-[#82111E] font-bold">
                  {currentEvent.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#58554F] leading-relaxed">
                {currentEvent.description}
              </p>

              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#58554F] font-mono">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6F0] border border-[#121316]/5">
                  <Calendar className="w-4 h-4 text-[#82111E]" />
                  <span>October 18, 2026</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6F0] border border-[#121316]/5">
                  <Clock className="w-4 h-4 text-[#D48B28]" />
                  <span>09:00 AM - 06:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6F0] border border-[#121316]/5 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">Auditorium & Innovation Hub, VSBCETC</span>
                </div>
              </div>

              {/* Live Countdown Grid */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono text-[#8A857C] uppercase tracking-widest font-semibold">
                  Registration Window Closes In
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                  {[
                    { label: "Days", val: timeLeft.days },
                    { label: "Hours", val: timeLeft.hours },
                    { label: "Minutes", val: timeLeft.minutes },
                    { label: "Seconds", val: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F7F3E9] border border-[#121316]/10"
                    >
                      <span className="text-xl sm:text-2xl font-black font-display text-[#121316]">
                        {String(item.val).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#58554F] font-mono font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/events"
                  className="btn-glitch px-7 py-3 rounded-full bg-[#82111E] hover:bg-[#9E1B28] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  data-cursor-text="Pitch"
                >
                  Register Prototype
                </Link>

                <a
                  href="/api/brochure"
                  download="VSBCETC_ECELL_INNOVATEX_2026.pdf"
                  className="btn-glitch inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FAF6F0] hover:bg-white border border-[#121316]/15 text-[#121316] font-bold text-xs uppercase tracking-wider transition-colors"
                  data-cursor-text="PDF"
                >
                  <Download className="w-3.5 h-3.5 text-[#D48B28]" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            {/* Right Photo Background Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#121316]/10 shadow-lg group">
                <Image
                  src="/photos/stage_team_core.webp"
                  alt="VSB College of Engineering Technical Campus E-Cell Leaders in Cream Polos"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[#121316]/10 text-xs text-[#121316]">
                  <div className="font-bold">E-Cell Student Leadership Council</div>
                  <div className="text-[11px] text-[#82111E] font-mono">VSBCETC Autonomous Coimbatore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE & IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { metric: "50+", label: "Ventures Incubated", desc: "Hardware & Software Student Startups" },
            { metric: "INR 15L+", label: "Grants & Seed Funding", desc: "Non-dilutive capital unlocked" },
            { metric: "Top 10", label: "IIT Bombay NEC Track", desc: "Pan-India college entrepreneur ranking" },
            { metric: "500+", label: "Active Innovators", desc: "Cross-engineering student network" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#121316]/10 shadow-xs hover:border-[#82111E]/40 transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#82111E]">
                {stat.metric}
              </div>
              <div className="text-sm font-bold text-[#121316] mt-2 font-display">{stat.label}</div>
              <div className="text-xs text-[#58554F] mt-1 font-body leading-relaxed">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOUR CORE INCUBATION PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono text-[#82111E] uppercase tracking-[0.25em] font-semibold">
            Incubation Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#121316] uppercase">
            From Dorm Room Napkin <br />
            To Series Seed
          </h2>
          <p className="text-sm sm:text-base text-[#58554F] leading-relaxed">
            Our structured 4-phase acceleration roadmap empowers student innovators to validate, protect intellectual property, build deployable MVPs, and pitch to institutional capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              num: "01",
              title: "Problem Discovery & Validation",
              desc: "Deep customer interviews, business model stress-testing, and market-size estimation with proven lean frameworks.",
            },
            {
              icon: Cpu,
              num: "02",
              title: "Rapid Prototyping Lab",
              desc: "Access to state-of-the-art AI compute rigs, IoT bench hardware, and autonomous software development sandboxes.",
            },
            {
              icon: ShieldCheck,
              num: "03",
              title: "Patent & IP Desk",
              desc: "Full institutional backing for provisional patent filing, trademark protection, and research transfer protocols.",
            },
            {
              icon: TrendingUp,
              num: "04",
              title: "Venture Capital Syndication",
              desc: "Direct pitch coliseum access to Tamil Nadu startup funds, angel investors, and pan-India venture networks.",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-white border border-[#121316]/10 hover:border-[#82111E]/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#82111E]/10 border border-[#82111E]/20 flex items-center justify-center text-[#82111E] group-hover:scale-110 transition-transform">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#8A857C] font-bold group-hover:text-[#82111E] transition-colors">
                    {pillar.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-[#121316] group-hover:text-[#82111E] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#58554F] leading-relaxed font-body">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#121316]/5 flex items-center gap-1.5 text-[11px] font-mono text-[#82111E] font-semibold">
                <span>Phase {pillar.num} Roadmap</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION PORTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#FAF6F0] border border-[#121316]/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase">
              Ready to turn your prototype into an enterprise?
            </h3>
            <p className="text-xs sm:text-sm text-[#58554F] font-light">
              Connect with faculty mentors, access lab grants, and collaborate with student co-founders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/team"
              className="btn-glitch px-7 py-3 rounded-full bg-white hover:bg-[#F7F3E9] border border-[#121316]/15 text-[#121316] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Meet The Team
            </Link>
            <Link
              href="/contact"
              className="btn-glitch px-7 py-3 rounded-full bg-[#82111E] hover:bg-[#9E1B28] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Apply For Incubation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
