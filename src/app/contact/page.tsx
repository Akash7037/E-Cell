"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, Clock, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>CONNECT & COLLABORATE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display uppercase">
          Get in Touch with E-Cell
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Whether you are an aspiring student founder seeking seed grants, a venture capital partner looking for cohort deal-flow, or an industry mentor.
        </p>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/8 space-y-4">
            <h3 className="font-bold text-white text-lg font-display">Incubation Office</h3>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>E-Cell Innovation Sandbox, 3rd Floor Technology Block</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:ventures@ecell.org" className="hover:text-cyan-400">
                  ventures@ecell.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sat: 09:00 AM - 07:00 PM</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/20 to-indigo-950/20 border border-cyan-500/20 space-y-3 text-xs text-gray-300">
            <h4 className="font-bold text-white font-display text-sm">Founder Office Hours</h4>
            <p className="text-gray-400 leading-relaxed">
              Every Wednesday afternoon from 03:00 PM to 06:00 PM, student founders can book 20-minute 1-on-1 pitch feedback clinics with our executive convenors.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/8">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">Inquiry Transmitted</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Thank you for reaching out. An E-Cell executive lead will review your message and reply within 24 business hours.
              </p>
              <Button size="sm" variant="secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Arun Prakash"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="arun@domain.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-medium">Subject / Inquiry Type *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Seed Grant Inquiry / Angel Partnership"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-medium">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief details about your inquiry or startup idea..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <Button size="md" variant="primary" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                  Dispatch Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
