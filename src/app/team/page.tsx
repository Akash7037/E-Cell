"use client";

import React, { useState } from "react";
import Image from "next/image";
import { initialMembers, TeamMember } from "@/lib/data";
import {
  Users,
  Sparkles,
  ExternalLink,
  X,
  Mail,
  ArrowRight,
  Award,
  BookOpen,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Leadership",
  "Technology & AI",
  "Incubation & Ventures",
  "Operations & Logistics",
  "Design & Media",
  "Faculty",
] as const;

export default function TeamPage() {
  const [members] = useState<TeamMember[]>(initialMembers);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const filteredMembers =
    activeCategory === "All"
      ? members
      : members.filter((m) => m.category === activeCategory);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative pt-28 pb-24 overflow-hidden text-[#121316]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#121316]/10 text-xs font-mono uppercase tracking-widest text-[#82111E] mb-4 shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>The 20 Catalysts & Builders</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#121316] uppercase">
          E-Cell Team Roster <br />
          <span className="bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28] bg-clip-text text-transparent">
            & Leadership
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#58554F] mt-4 font-light leading-relaxed">
          The 20 student leaders, technical architects, and faculty mentors powering the startup culture at VSB College of Engineering Technical Campus Coimbatore.
        </p>
      </section>

      {/* 2. Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn-glitch px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#82111E] text-white shadow-sm font-semibold"
                  : "bg-white text-[#58554F] hover:text-[#121316] border border-[#121316]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. 20 Member Cards Grid with 3D Flip Mechanics & Click Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const isFlipped = Boolean(flippedCards[member.id]);

            return (
              <div
                key={member.id}
                className={`flip-card ${isFlipped ? "flipped" : ""}`}
                onClick={() => setSelectedMember(member)}
                data-cursor-text="Dossier"
              >
                <div className="flip-card-inner">
                  {/* FRONT FACE */}
                  <div className="flip-card-front flex flex-col justify-between p-4 shadow-sm">
                    {/* Top Image area */}
                    <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-center filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Category Badge on photo */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider bg-white/90 text-[#121316] backdrop-blur-md shadow-xs">
                        {member.category}
                      </div>

                      {/* Year tag if present */}
                      {member.year && (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-black/60 text-white backdrop-blur-md">
                          {member.year}
                        </div>
                      )}

                      {/* Name & Role overlay on image bottom */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <div className="text-[10px] font-mono text-[#F5D061] uppercase font-bold">
                          {member.role}
                        </div>
                        <h3 className="text-base font-bold font-display truncate">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Metadata & Action bar */}
                    <div className="pt-3 flex items-center justify-between border-t border-[#121316]/5 text-xs">
                      <span className="text-[11px] font-body text-[#58554F] truncate max-w-[170px]">
                        {member.department}
                      </span>
                      <button
                        onClick={(e) => toggleFlip(member.id, e)}
                        className="btn-glitch text-[10px] font-mono uppercase text-[#82111E] font-bold hover:underline"
                        title="Flip card for bio"
                      >
                        Flip ↻
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Uiverse style with rotating border effect) */}
                  <div className="flip-card-back">
                    <div className="flip-card-back-content">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div>
                            <h4 className="text-sm font-bold font-display text-white">
                              {member.name}
                            </h4>
                            <span className="text-[10px] font-mono text-[#D48B28]">
                              {member.role}
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleFlip(member.id, e)}
                            className="p-1 text-neutral-400 hover:text-white"
                            title="Flip back"
                          >
                            ↻
                          </button>
                        </div>

                        {/* Bio summary */}
                        <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>

                        {/* Skills */}
                        <div className="space-y-1">
                          <div className="text-[9px] uppercase font-mono tracking-wider text-[#D48B28]">
                            Key Competencies
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {member.skills?.map((sk, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-neutral-200"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Key Impact */}
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-[9px] uppercase font-mono tracking-wider text-[#ff4d6d] flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Core Contribution</span>
                          </div>
                          <p className="text-[10px] text-neutral-300 italic line-clamp-2 mt-0.5">
                            {member.contribution}
                          </p>
                        </div>
                      </div>

                      {/* Back Footer with Socials & Dossier Trigger */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {member.socials.linkedin && (
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded bg-white/10 hover:bg-[#82111E] text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="LinkedIn"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </a>
                          )}
                          {member.socials.email && (
                            <a
                              href={`mailto:${member.socials.email}`}
                              className="p-1 rounded bg-white/10 hover:bg-[#82111E] text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Email"
                            >
                              <Mail className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-[#D48B28] flex items-center gap-1">
                          <span>Open Dossier</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MEMBER DOSSIER MODAL (ON CLICK DETAIL) */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FAF6F0] rounded-3xl border border-[#121316]/15 p-6 sm:p-10 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-[#82111E] hover:text-white text-[#121316] transition-colors border border-[#121316]/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header profile row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-[#121316]/10 pb-6 text-center sm:text-left">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-black shrink-0 border-2 border-[#82111E] shadow-md">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#82111E] text-white font-bold">
                    {selectedMember.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <div className="text-sm font-mono text-[#82111E] font-bold">
                    {selectedMember.role} • {selectedMember.department}
                  </div>
                  {selectedMember.year && (
                    <div className="text-xs text-[#58554F] font-mono">
                      Academic Year: {selectedMember.year}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio & Full Details */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#82111E] font-bold">
                    Executive Profile
                  </h4>
                  <p className="text-sm text-[#58554F] leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="space-y-1 p-4 rounded-2xl bg-white border border-[#121316]/10 shadow-xs">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#D48B28] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Incubation Contribution</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#121316] leading-relaxed italic">
                    &ldquo;{selectedMember.contribution}&rdquo;
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="space-y-1.5">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#58554F]">
                    Domain Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills?.map((sk, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-[#121316]/10 text-[#121316] font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct contact action */}
                <div className="pt-4 border-t border-[#121316]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#58554F] font-mono">
                    Official Liaison: E-Cell VSBCETC
                  </div>

                  {selectedMember.socials.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="btn-glitch inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#82111E] hover:bg-[#9E1B28] text-white text-xs font-mono uppercase font-bold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Direct Inquiries</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
