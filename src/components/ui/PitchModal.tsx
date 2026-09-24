"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, CheckCircle, Rocket } from "lucide-react";
import Button from "@/components/ui/Button";
import confetti from "canvas-confetti";

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PitchModal({ isOpen, onClose }: PitchModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    founderName: "",
    email: "",
    department: "",
    startupName: "",
    sector: "DeepTech / AI",
    stage: "Prototype MVP",
    pitch: "",
    link: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#6366F1", "#10B981"],
        });
      } catch (err) {}
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[92vh] bg-[#0A0C14] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white font-display">
                PITCH YOUR STARTUP
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Cohort 2026 Seed Grant & Incubation Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                Pitch Dossier Received!
              </h4>
              <p className="text-sm text-gray-400 max-w-md">
                Our Incubation Review Council and Student Convenors will evaluate your submission. Qualified teams will be scheduled for a 15-minute pitch review within 72 hours.
              </p>
              <div className="pt-4">
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Founder Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    placeholder="e.g. Arun Prakash"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Campus / Founder Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="founder@student.edu"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Startup / Venture Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.startupName}
                    onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                    placeholder="e.g. NeuroSense Labs"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Sector *</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#11131F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="DeepTech / AI">DeepTech / AI</option>
                    <option value="CleanTech & EV">CleanTech & EV</option>
                    <option value="CyberSecurity">CyberSecurity</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="FinTech / SaaS">FinTech / SaaS</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Current Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full bg-[#11131F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Ideation / Concept">Ideation / Concept</option>
                    <option value="Prototype MVP">Working Prototype / MVP</option>
                    <option value="Beta Live">Beta with Users</option>
                    <option value="Revenue Generating">Early Revenue / Pilot</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Pitch Deck / Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-medium">One-Line Elevator Pitch *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.pitch}
                  onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                  placeholder="Explain what problem you solve, your unfair technical advantage, and why your team can win."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="w-full justify-center"
                  disabled={loading}
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  {loading ? "Transmitting Dossier..." : "Submit Pitch Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
