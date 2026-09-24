"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Compass, Shield, Users, Landmark, BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-6xl mx-auto px-4 sm:px-8 space-y-20">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>OUR MISSION & HERITAGE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display uppercase">
          Empowering The Next Generation of Founders
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          E-Cell is an autonomous student-led innovation catalyst committed to bridging the chasm between academic engineering excellence and commercial venture success.
        </p>
      </section>

      {/* Institutional Heritage Section (The Sole VSB Reference) */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Landmark className="w-4 h-4" />
            <span>Institutional Foundation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
            Proudly Anchored at VSB Engineering College
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Established under the progressive patronage of the <strong>VSB Educational Trust</strong> and <strong>VSB Engineering College</strong>, E-Cell was instituted to create a frictionless launchpad where campus engineering researchers, developers, and designers can transform academic intellectual property into commercially viable tech ventures.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Backed by the institution’s state-of-the-art laboratory infrastructure, specialized computing centers, and visionary academic leadership, our student founders receive dedicated co-working sandbox spaces, zero-cost legal patent advisory, and active institutional seed allocations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/8 text-xs font-mono text-gray-300">
            <div>
              <span className="text-cyan-400 block text-lg font-bold">2018</span>
              <span>Cell Formally Established</span>
            </div>
            <div>
              <span className="text-cyan-400 block text-lg font-bold">22</span>
              <span>Campus Patents Supported</span>
            </div>
            <div>
              <span className="text-cyan-400 block text-lg font-bold">₹4.5 Cr+</span>
              <span>Cumulative Seed Raised</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight">
            Our Operating Philosophy
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Built on four core pillars that guide every workshop, sprint, and incubation cohort we host.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base font-display">Dorm-to-Market</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              We scout talent early in their academic journey, helping technical students turn semester capstones into commercial products.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base font-display">Founder-First Terms</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Zero equity dilution during campus incubation. We prioritize long-term founder autonomy over short-term institutional stakes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base font-display">DeepTech Rigour</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              We focus heavily on defensible technical moats: edge AI, autonomous robotics, cybersecurity firmware, and renewable energy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base font-display">Active Angel Syndicate</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Over 140 industry mentors and venture partners actively participate in term-sheet negotiations and cohort evaluations.
            </p>
          </div>
        </div>
      </section>

      {/* Real Campus Photos Feature */}
      <section className="grid sm:grid-cols-2 gap-6 items-center">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
          <Image
            src="/photos/stage_team_core.webp"
            alt="E-Cell Executive Council"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Autonomous Student Governance
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Led by Students, Guided by Pioneers
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            The day-to-day operations, hackathon architecture, incubation cohorts, and investor demo days are run entirely by student leads across engineering disciplines, backed by an advisory council of faculty convenors and venture capitalists.
          </p>
          <div className="pt-2">
            <Link href="/team">
              <Button size="md" variant="secondary" icon={<ArrowUpRight className="w-4 h-4" />}>
                Meet the Executive Committee
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
