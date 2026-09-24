"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Mail, Sparkles, Award } from "lucide-react";
import { INITIAL_MEMBERS, TeamMember } from "@/lib/data";

export default function TeamPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = ["All", "Leadership", "Technology & AI", "Incubation & Ventures", "Corporate & Media"];

  const filteredMembers =
    selectedCat === "All"
      ? INITIAL_MEMBERS
      : INITIAL_MEMBERS.filter((m) => m.category === selectedCat);

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
          <Users className="w-3.5 h-3.5" />
          <span>AUTONOMOUS STUDENT LEADERSHIP</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display uppercase">
          The Executive Council
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          The student innovators, engineers, and venture operators orchestrating our incubators, angel demo days, and campus startup hackathons.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCat === cat
                  ? "bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20"
                  : "bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Team Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Member Photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                  {member.department}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-cyan-400/90 font-mono mt-0.5">{member.role}</p>

              <p className="text-xs text-gray-400 mt-2.5 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Skills & Socials */}
            <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 2).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <span className="font-bold text-xs">in</span>
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
