"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  Shield,
  Cpu,
  TrendingUp,
  FileText,
  Calendar,
  Users,
  Compass,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Award,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { INITIAL_STARTUPS, INITIAL_EVENTS, INITIAL_GALLERY, IncubatedStartup } from "@/lib/data";
import ProspectusModal from "@/components/ui/ProspectusModal";
import PitchModal from "@/components/ui/PitchModal";

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [activeStartup, setActiveStartup] = useState<IncubatedStartup | null>(null);
  const [prospectusOpen, setProspectusOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);

  const sectors = ["All", "DeepTech / AI", "CleanTech & EV", "CyberSecurity", "AgriTech", "FinTech / SaaS"];

  const filteredStartups =
    selectedSector === "All"
      ? INITIAL_STARTUPS
      : INITIAL_STARTUPS.filter((s) => s.sector === selectedSector);

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pt-28 sm:pt-36 pb-24 overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* Live Cohort Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono tracking-wide mb-8 backdrop-blur-md shadow-sm shadow-cyan-500/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>COHORT 2026 ACTIVE • SEED GRANTS UP TO ₹5,00,000</span>
        </div>

        {/* Headline with tight typography tracking */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white font-display uppercase leading-[1.05] max-w-5xl">
          Where Student Innovators Become{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-cyan-200">
            Venture Founders
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          The autonomous student venture incubator & launchpad. We turn dorm-room engineering breakthroughs into venture-backed technology companies.
        </p>

        {/* Action Button Cluster */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setPitchOpen(true)}
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            Apply for Incubation
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => setProspectusOpen(true)}
            icon={<FileText className="w-4 h-4 text-cyan-400" />}
          >
            2026 Prospectus
          </Button>
        </div>

        {/* Live Metrics Ticker */}
        <div className="mt-16 sm:mt-24 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/8 backdrop-blur-xl">
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-display">
              ₹4.5 Cr+
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-1">
              Seed Capital Raised
            </span>
          </div>

          <div className="flex flex-col items-center p-3 border-l border-white/5">
            <span className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              48+
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-1">
              Startups Incubated
            </span>
          </div>

          <div className="flex flex-col items-center p-3 border-t md:border-t-0 md:border-l border-white/5">
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-300 font-display">
              140+
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-1">
              Mentors & Angels
            </span>
          </div>

          <div className="flex flex-col items-center p-3 border-t md:border-t-0 md:border-l border-white/5">
            <span className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-display">
              22
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-1">
              Patents Filed
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. ECOSYSTEM BENTO MATRIX */}
      {/* ------------------------------------------------------------- */}
      <section id="incubation" className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Full-Stack Founder Support</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
              The Incubation Engine
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-sm">
            Everything an ambitious student team needs to transition from prototype to market-ready venture.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Seed Capital (Large) */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                NON-DILUTIVE SEED CAPITAL
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2 mb-3">
                Pre-Seed Prototyping Grants
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Direct equity-free financial grants up to ₹5,00,000 per startup. Zero equity taken during early campus incubation, allowing student founders to retain maximum cap table control.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> Milestone-based Tranches
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> Hardware Bill-of-Materials
              </span>
            </div>
          </div>

          {/* Card 2: DeepTech Prototyping Sandbox */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                HARDWARE & AI INFRASTRUCTURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-2 mb-3">
                24/7 Prototyping Lab
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Industrial stereolithography 3D printers, CNC milling benches, GPU compute workstations, and dedicated oscilloscope diagnostic benches.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/8 text-xs text-indigo-300/80 font-mono">
              High-Speed Fiber & Dedicated Benches
            </div>
          </div>

          {/* Card 3: Patent & IP Support */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                INTELLECTUAL PROPERTY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-2 mb-3">
                Zero-Cost Patent Filing
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Complete institutional funding for provisional patent drafting, prior-art searches, and Private Limited company incorporation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/8 text-xs text-emerald-300/80 font-mono">
              22 Patents Filed to Date
            </div>
          </div>

          {/* Card 4: Angel Syndicate (Large) */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                ANGEL INVESTOR NETWORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2 mb-3">
                Bi-Annual Pitch Tank & Syndicate
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Demo Days attended by 40+ active angel syndicates, institutional micro-VCs, and alumnus tech executives. Pitch directly for seed commitments up to ₹50,00,000.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> Standardized SAFE Notes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> $100k AWS / GCP Credits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. INCUBATED STARTUPS SHOWCASE */}
      {/* ------------------------------------------------------------- */}
      <section id="ventures" className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Cohort Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
              Incubated Startups
            </h2>
          </div>

          {/* Sector Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-2xl border border-white/8">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedSector === sec
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              onClick={() => setActiveStartup(startup)}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {startup.sector}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {startup.stage}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                  {startup.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {startup.tagline}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Funding / Grant:</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {startup.funding}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-xs text-gray-400">
                <span>By {startup.founders.join(", ")}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
                  Deep Dive <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. REAL WORKSHOP & CAMPUS PHOTO GALLERY */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Campus Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
              Innovation in Action
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-sm">
            Live impressions from our weekend product sprints, mentoring arenas, and annual conclaves.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_GALLERY.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/8 aspect-[4/3] flex flex-col justify-end p-5 transition-transform duration-300 hover:border-cyan-500/40"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/40 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
                <p className="text-[11px] text-gray-300 line-clamp-1">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. FLAGSHIP EVENTS SUMMARY */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Conclaves & Sprints</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
              Flagship Summits
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <span>View All Schedules</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INITIAL_EVENTS.slice(0, 2).map((evt) => (
            <div
              key={evt.id}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-cyan-500/30 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {evt.category}
                  </span>
                  <span className="text-gray-400">{evt.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-semibold">{evt.prizePool}</span>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 font-medium text-cyan-400 hover:text-white transition-colors"
                >
                  <span>Event Briefing</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. CALL TO ACTION: PITCH SUBMISSION */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-[#0A0C16] to-indigo-950/40 border border-cyan-500/25 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-950/30">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COHORT 2026 NOW SCREENING</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
              Ready to Build Your Venture?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Submit your startup deck or problem hypothesis. Accepted teams receive dedicated workspace, seed grants up to ₹5,00,000, and 1-on-1 angel advisory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setPitchOpen(true)}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Submit Startup Pitch
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setProspectusOpen(true)}
              icon={<FileText className="w-4 h-4 text-cyan-400" />}
            >
              Get Prospectus
            </Button>
          </div>
        </div>
      </section>

      {/* Startup Deep Dive Modal */}
      {activeStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-[#0B0D16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {activeStartup.sector}
                </span>
                <h3 className="text-2xl font-bold font-display mt-2">{activeStartup.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{activeStartup.tagline}</p>
              </div>
              <button
                onClick={() => setActiveStartup(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="text-gray-400 block mb-1">Seed Funding:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {activeStartup.funding}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="text-gray-400 block mb-1">Key Traction:</span>
                <span className="font-mono text-cyan-300 font-semibold text-xs">
                  {activeStartup.highlightMetric}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <h5 className="font-semibold text-white uppercase tracking-wider font-mono text-[11px]">
                Venture Overview
              </h5>
              <p className="leading-relaxed text-gray-400">{activeStartup.description}</p>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <h5 className="font-semibold text-white uppercase tracking-wider font-mono text-[11px]">
                Demonstrated Traction
              </h5>
              <p className="leading-relaxed text-gray-400">{activeStartup.traction}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-400">Founders: {activeStartup.founders.join(", ")}</span>
              <Button size="sm" variant="secondary" onClick={() => setActiveStartup(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <ProspectusModal isOpen={prospectusOpen} onClose={() => setProspectusOpen(false)} />
      <PitchModal isOpen={pitchOpen} onClose={() => setPitchOpen(false)} />
    </div>
  );
}
