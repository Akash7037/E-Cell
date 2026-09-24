"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
} from "lucide-react";

const CHAPTERS = [
  {
    id: "01",
    tag: "Genesis & Heritage",
    title: "The Autonomous Spark at VSBCETC",
    subtitle: "Coimbatore • Western Tamil Nadu Engineering Nucleus",
    description:
      "Rooted within the autonomous campus of VSB College of Engineering Technical Campus, the Entrepreneurship Cell was founded with a singular conviction: engineering students must not merely seek employment — they must build the engines of future enterprise.",
    highlights: [
      "Autonomous curriculum integrating student venture credits",
      "NAAC A+ & NBA accredited institutional backing",
      "Multidisciplinary innovation labs spanning AI, IoT, Robotics & Clean Energy",
    ],
    image: "/photos/stage_team_full.webp",
    quote: "True engineering reaches its zenith when scientific logic solves practical human challenges through scalable ventures.",
  },
  {
    id: "02",
    tag: "National Catalyst",
    title: "The IIT Bombay NEC Partnership",
    subtitle: "Pan-India Collegiate Entrepreneurship Coliseum",
    description:
      "To measure our student founders against the nation's sharpest entrepreneurial minds, VSBCETC E-Cell forged an active operational track with the National Entrepreneurship Challenge organized by E-Cell IIT Bombay.",
    highlights: [
      "Rigorous 3-phase national evaluation roadmap",
      "Direct mentorship from IIT Bombay alumni founders and VC partners",
      "Consistently ranked among the top emerging regional campus cells in India",
    ],
    image: "/photos/stage_team_core.webp",
    quote: "Connecting campus labs in Coimbatore directly to the national investor radar.",
  },
  {
    id: "03",
    tag: "Execution Engine",
    title: "The Incubation Lifecycle",
    subtitle: "Napkin Sketch to Validated Prototype & Seed Round",
    description:
      "Ideas without an execution ecosystem wither. We established an in-house venture pipeline providing dedicated physical workspaces, compute infrastructure, legal IP patent support, and zero-equity seed prototyping grants.",
    highlights: [
      "Rapid prototyping hardware benches & cloud development credits",
      "Institutional patent filing desk with legal advisory support",
      "Pitch clinics stress-tested by Tamil Nadu angel investors",
    ],
    image: "/photos/workshop_1.webp",
    quote: "We remove friction between student intuition and commercial market delivery.",
  },
  {
    id: "04",
    tag: "The Horizon",
    title: "Vision 2030: 100+ Campus Enterprises",
    subtitle: "Ideas Today, Impact Tomorrow",
    description:
      "Our roadmap targets 100 active student-founded tech companies by 2030, anchored in sustainable manufacturing, deep-tech AI agents, healthcare diagnostics, and agricultural automation.",
    highlights: [
      "INR 50 Lakh dedicated collegiate venture pool by 2028",
      "Regional industry-academia innovation transfer corridor",
      "Fostering next-generation startup leaders from tier-2 ecosystems",
    ],
    image: "/photos/workshop_3.webp",
    quote: "Empowering the bold creators who dare to design the industrial future.",
  },
];

const MILESTONES = [
  { year: "2022", title: "Inception", desc: "E-Cell VSBCETC inaugurated under the Centre for Innovation." },
  { year: "2023", title: "First Sprint", desc: "First 24-hour campus Ideathon engaging 250+ engineering innovators." },
  { year: "2024", title: "National Track", desc: "Formal alliance with National Entrepreneurship Challenge, E-Cell IIT Bombay." },
  { year: "2025", title: "Venture Grants", desc: "INR 10,00,000 disbursed across 12 student hardware and SaaS prototypes." },
  { year: "2026", title: "Autonomous IP", desc: "Launch of INNOVATEX 2026 & autonomous academic credits for startup founders." },
];

export default function AboutPage() {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <div className="relative pt-28 pb-24 overflow-hidden text-[#121316]">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#121316]/10 text-xs font-mono uppercase tracking-widest text-[#82111E] mb-4 shadow-xs"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Our Origin, Mission & Trajectory</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#121316] uppercase"
        >
          The Story of <br />
          <span className="bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28] bg-clip-text text-transparent">
            E-Cell VSBCETC
          </span>
        </motion.h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#58554F] mt-4 font-light leading-relaxed">
          How an engineering campus in Coimbatore built a kinetic launchpad connecting undergraduate inventors to national venture capital and patent recognition.
        </p>
      </section>

      {/* 2. PINNED NARRATIVE CHAPTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Selector & Timeline Nav */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#82111E] block mb-3 font-bold">
                Narrative Chapters
              </span>

              <div className="space-y-2">
                {CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setActiveChapter(idx)}
                    className={`btn-glitch w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group ${
                      activeChapter === idx
                        ? "bg-[#82111E] text-white shadow-sm font-semibold"
                        : "text-[#58554F] hover:text-[#121316] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-70">
                        {chap.id}
                      </span>
                      <span className="font-display text-xs truncate">
                        {chap.tag}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeChapter === idx ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Institutional Credential */}
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#121316]/10 text-xs text-[#58554F] space-y-2">
              <div className="flex items-center gap-2 text-[#121316] font-semibold">
                <Building2 className="w-4 h-4 text-[#82111E]" />
                <span>VSBCETC Campus Hub</span>
              </div>
              <p className="leading-relaxed">
                Autonomous status empowers curriculum agility, enabling real academic credits for student startup development.
              </p>
            </div>
          </div>

          {/* Chapter Display Screen */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-6 sm:p-10 bg-white border border-[#121316]/10 shadow-[0_15px_45px_rgba(70,55,35,0.06)] relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-[#121316]/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-display text-[#82111E]">
                      {CHAPTERS[activeChapter].id}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#58554F] font-mono">
                      / 04 • {CHAPTERS[activeChapter].tag}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#82111E]/10 text-[#82111E] font-bold">
                    Active Chapter
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#121316] uppercase">
                    {CHAPTERS[activeChapter].title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-[#82111E] font-bold">
                    {CHAPTERS[activeChapter].subtitle}
                  </p>
                </div>

                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#121316]/10 my-4 shadow-sm">
                  <Image
                    src={CHAPTERS[activeChapter].image}
                    alt={CHAPTERS[activeChapter].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-xs italic text-white font-light">
                    &ldquo;{CHAPTERS[activeChapter].quote}&rdquo;
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#58554F] leading-relaxed font-light">
                  {CHAPTERS[activeChapter].description}
                </p>

                {/* Chapter Highlights */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono text-[#82111E] uppercase tracking-widest font-semibold">
                    Core Operational Tenets
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {CHAPTERS[activeChapter].highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#121316]/5 text-xs text-[#121316]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#82111E] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CHRONOLOGICAL MILESTONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-[#82111E] uppercase tracking-[0.25em] font-semibold">
            Evolutionary Arc
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#121316] uppercase">
            Milestones of Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#121316]/10 shadow-xs hover:border-[#82111E]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-3xl font-black font-display text-[#82111E]">
                  {m.year}
                </span>
                <h3 className="text-sm font-bold font-display text-[#121316]">
                  {m.title}
                </h3>
              </div>
              <p className="text-xs text-[#58554F] font-body leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FACULTY ADVISORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#FAF6F0] border border-[#121316]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="md:col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#121316]/10 shadow-sm">
            <Image
              src="/photos/members/member_lead1.webp"
              alt="Faculty Dean Dr. Mohanavel"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white border border-[#121316]/10 text-[#82111E] font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Faculty Leadership & Guidance</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase">
              &ldquo;Engineering Education is Incomplete Without Enterprise Creation.&rdquo;
            </h3>

            <p className="text-sm text-[#58554F] leading-relaxed font-light">
              At VSB College of Engineering Technical Campus, our faculty mentors work shoulder-to-shoulder with student founders. We facilitate lab certifications, industry liaison, and intellectual property registrations, ensuring our student ventures are grounded in both scientific rigor and market reality.
            </p>

            <div className="pt-2">
              <div className="font-display font-bold text-[#121316] text-base">Dr. K. Mohanavel</div>
              <div className="text-xs text-[#82111E] font-mono font-medium">Dean of Innovation & Patron, E-Cell VSBCETC</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
