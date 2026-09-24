"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Award, CheckCircle, ArrowUpRight, Sparkles, Filter } from "lucide-react";
import Button from "@/components/ui/Button";
import { INITIAL_EVENTS, EventItem } from "@/lib/data";

export default function EventsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const categories = ["All", "Summit", "Hackathon", "Pitch Tank", "Bootcamp"];

  const filteredEvents =
    selectedCat === "All"
      ? INITIAL_EVENTS
      : INITIAL_EVENTS.filter((e) => e.category === selectedCat);

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>CONCLAVES & PRODUCT SPRINTS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display uppercase">
          E-Cell Flagship Events
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          From high-velocity 24-hour hackathons to closed-door angel pitch tanks, our calendar is engineered to challenge, fund, and accelerate student technopreneurs.
        </p>

        {/* Filter Pills */}
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

      {/* Events List */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-8 items-start justify-between group overflow-hidden"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    {evt.category}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {evt.date}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {evt.time}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {evt.venue}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300/80 font-mono mt-1">{evt.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                  {evt.description}
                </p>

                {/* Agenda Pills */}
                {evt.agenda && evt.agenda.length > 0 && (
                  <div className="pt-3 border-t border-white/8 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                      Program Highlights:
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-300">
                      {evt.agenda.map((ag, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/30 border border-white/5">
                          <span className="font-mono text-cyan-400 text-[10px] shrink-0">{ag.time}</span>
                          <span className="truncate">{ag.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Column */}
              <div className="w-full md:w-64 shrink-0 flex flex-col gap-4 p-5 rounded-2xl bg-black/40 border border-white/10 self-stretch justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">
                    Grant / Prize Pool
                  </span>
                  <span className="text-lg font-bold text-emerald-400 font-display">
                    {evt.prizePool || "Incubation Entry"}
                  </span>
                </div>

                <div className="space-y-2">
                  {registeredEvent === evt.id ? (
                    <div className="py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>Registration Confirmed</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      className="w-full justify-center"
                      onClick={() => setRegisteredEvent(evt.id)}
                      icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    >
                      Register Now
                    </Button>
                  )}
                  <span className="text-[10px] text-gray-500 text-center block">
                    Free for registered student delegates
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
