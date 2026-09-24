"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { initialEvents, EventItem } from "@/lib/data";
import {
  Calendar,
  Clock,
  MapPin,
  Flame,
  Download,
  X,
  Trophy,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function EventsPage() {
  const [events] = useState<EventItem[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const [regForm, setRegForm] = useState({
    teamName: "",
    leadName: "",
    email: "",
    department: "",
    track: "DeepTech AI",
    pitchSummary: "",
  });
  const [regSuccess, setRegSuccess] = useState(false);

  const spotlightEvent = events.find((e) => e.isSpotlight) || events[0];
  const pastEvents = events.filter((e) => !e.isSpotlight);

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.teamName || !regForm.email || !regForm.leadName) return;

    setRegSuccess(true);
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#82111E", "#9E1B28", "#D48B28", "#121316"],
    });

    setTimeout(() => {
      setRegisterModalOpen(false);
      setRegSuccess(false);
      setRegForm({
        teamName: "",
        leadName: "",
        email: "",
        department: "",
        track: "DeepTech AI",
        pitchSummary: "",
      });
    }, 2400);
  };

  return (
    <div className="relative pt-28 pb-24 overflow-hidden text-[#121316]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#121316]/10 text-xs font-mono uppercase tracking-widest text-[#82111E] mb-4 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-[#D48B28]" />
          <span>Hackathons, Sprints & Summits</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#121316] uppercase">
          E-Cell Events & <br />
          <span className="bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28] bg-clip-text text-transparent">
            Venture Arenas
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#58554F] mt-4 font-light leading-relaxed">
          Where student prototypes face venture reality. Explore upcoming national challenges, download competition briefs, and inspect our past breakthrough bootcamps.
        </p>
      </section>

      {/* 2. CURRENT EVENT SPOTLIGHT (INNOVATEX 2026) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-white border border-[#121316]/10 shadow-[0_15px_45px_rgba(70,55,35,0.08)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#82111E] text-white">
                  Current Flagship Event
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono bg-[#FAF6F0] border border-[#121316]/10 text-[#82111E] font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-[#D48B28]" />
                  <span>{spotlightEvent.prizePool}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#121316] uppercase">
                  {spotlightEvent.title}
                </h2>
                <p className="text-sm sm:text-base font-mono text-[#82111E] font-bold">
                  {spotlightEvent.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#58554F] leading-relaxed font-light">
                {spotlightEvent.fullDetails}
              </p>

              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#58554F]">
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
                  <span>Innovation Centre & Auditorium, VSBCETC Coimbatore</span>
                </div>
              </div>

              {/* Countdown Grid */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono text-[#8A857C] uppercase tracking-widest font-semibold">
                  Time Remaining for Pitch Deck Submissions
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

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="btn-glitch px-8 py-3.5 rounded-full bg-[#82111E] hover:bg-[#9E1B28] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md"
                  data-cursor-text="Pitch"
                >
                  Register Team & Prototype
                </button>

                <a
                  href="/api/brochure"
                  download="VSBCETC_ECELL_INNOVATEX_2026.pdf"
                  className="btn-glitch inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF6F0] hover:bg-white border border-[#121316]/15 text-[#121316] font-bold text-xs uppercase tracking-wider transition-all duration-200"
                  data-cursor-text="PDF"
                >
                  <Download className="w-4 h-4 text-[#D48B28]" />
                  <span>Download Official Brochure (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#121316]/10 shadow-lg">
                <Image
                  src={spotlightEvent.image}
                  alt={spotlightEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#F5D061] font-semibold">
                  National Entrepreneurship Challenge • Campus Coliseum
                </div>
              </div>

              {/* Agenda Peek */}
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#121316]/10 space-y-2">
                <div className="text-xs uppercase font-mono tracking-wider text-[#82111E] font-bold">
                  Featured Sprints
                </div>
                <div className="space-y-1.5 text-xs text-[#58554F]">
                  {spotlightEvent.agenda.map((ag, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-[#121316]/5 last:border-0">
                      <span className="font-mono text-[#82111E] font-semibold">{ag.time}</span>
                      <span className="font-medium text-[#121316] truncate ml-3">{ag.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAST EVENTS ARCHIVE LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-[#82111E] uppercase tracking-[0.25em] font-semibold">
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#121316] uppercase mt-1">
              Events Archive & Sprints
            </h2>
          </div>
          <div className="text-xs font-mono text-[#58554F]">
            Click any entry to view detailed schedule
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="group rounded-3xl overflow-hidden bg-white border border-[#121316]/10 hover:border-[#82111E]/40 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              data-cursor-text="View"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/90 text-[#121316] font-bold shadow-xs">
                  {evt.category}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#82111E] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#121316] group-hover:text-[#82111E] transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#58554F] line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#121316]/5 flex items-center justify-between text-xs font-mono text-[#82111E] font-semibold">
                  <span>Explore Schedule</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL FOR EVENT DETAILS */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FAF6F0] rounded-3xl border border-[#121316]/15 p-6 sm:p-10 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-[#82111E] hover:text-white transition-colors border border-[#121316]/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#82111E] text-white font-bold">
                  {selectedEvent.category} • {selectedEvent.status}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs font-mono text-[#82111E] font-semibold">
                  {selectedEvent.subtitle} • {selectedEvent.date}
                </p>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#121316]/10 shadow-sm">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm text-[#58554F] leading-relaxed font-light">
                {selectedEvent.fullDetails || selectedEvent.description}
              </p>

              {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                <div className="space-y-2.5 p-4 rounded-2xl bg-white border border-[#121316]/10">
                  <div className="text-xs uppercase font-mono tracking-wider text-[#82111E] font-bold">
                    Execution Schedule
                  </div>
                  <div className="space-y-2 text-xs">
                    {selectedEvent.agenda.map((ag, i) => (
                      <div key={i} className="flex items-center justify-between text-[#58554F]">
                        <span className="font-mono text-[#82111E] font-semibold">{ag.time}</span>
                        <span className="font-medium text-[#121316]">{ag.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. REGISTRATION MODAL */}
      {registerModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setRegisterModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FAF6F0] rounded-3xl border border-[#82111E]/30 p-6 sm:p-10 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-[#82111E] hover:text-white transition-colors border border-[#121316]/10"
              aria-label="Close registration"
            >
              <X className="w-5 h-5" />
            </button>

            {regSuccess ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-display uppercase">
                  Registration Confirmed
                </h3>
                <p className="text-sm text-[#58554F]">
                  Your prototype has been registered for INNOVATEX 2026. Confirmation details and screening rubric sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#82111E] font-bold">
                    National Entrepreneurship Challenge Track
                  </span>
                  <h3 className="text-2xl font-bold font-display uppercase mt-1">
                    Register Prototype
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                      Team / Startup Venture Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AeroGrid Labs"
                      value={regForm.teamName}
                      onChange={(e) => setRegForm({ ...regForm, teamName: e.target.value })}
                      className="brand-input-field"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                        Lead Founder Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Founder name"
                        value={regForm.leadName}
                        onChange={(e) => setRegForm({ ...regForm, leadName: e.target.value })}
                        className="brand-input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="founder@student.vsbcetc.edu.in"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="brand-input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                        Department / Year
                      </label>
                      <input
                        type="text"
                        placeholder="CSE / 3rd Year"
                        value={regForm.department}
                        onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                        className="brand-input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                        Domain Track
                      </label>
                      <select
                        value={regForm.track}
                        onChange={(e) => setRegForm({ ...regForm, track: e.target.value })}
                        className="brand-input-field bg-[#FAF6F0]"
                      >
                        <option value="DeepTech AI">DeepTech AI & Data</option>
                        <option value="IoT & Hardware">IoT, Hardware & Robotics</option>
                        <option value="CleanTech & Agri">CleanTech, EV & AgriTech</option>
                        <option value="FinTech & SaaS">FinTech & Enterprise SaaS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                      One-line Problem & Solution Pitch
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe what your prototype solves and who the primary user is..."
                      value={regForm.pitchSummary}
                      onChange={(e) => setRegForm({ ...regForm, pitchSummary: e.target.value })}
                      className="brand-input-field resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-glitch w-full py-3.5 rounded-full bg-gradient-to-r from-[#82111E] to-[#9E1B28] hover:from-[#9E1B28] hover:to-[#B82132] text-white font-bold text-xs uppercase tracking-wider shadow-sm mt-3"
                >
                  Submit Prototype Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
