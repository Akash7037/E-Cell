"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateField = (name: string, value: string) => {
    let err = "";
    if (name === "name") {
      if (!value.trim()) err = "Full name is required";
      else if (value.trim().length < 3) err = "Name must be at least 3 characters";
    }
    if (name === "email") {
      if (!value.trim()) err = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        err = "Enter a valid email address (e.g. founder@domain.com)";
      }
    }
    if (name === "message") {
      if (!value.trim()) err = "Message or venture description is required";
      else if (value.trim().length < 15) {
        err = `Needs at least 15 characters (currently ${value.trim().length})`;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "Innovation Block, VSB College of Engineering Technical Campus, Coimbatore - 642 109, Tamil Nadu, India"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateField("name", form.name);
    validateField("email", form.email);
    validateField("message", form.message);

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim() ||
      errors.name ||
      errors.email ||
      errors.message
    ) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#82111E", "#9E1B28", "#D48B28", "#121316"],
        });
      } else {
        const data = await res.json();
        setErrors((prev) => ({ ...prev, form: data.error || "Submission failed." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, form: "Network error. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative pt-28 pb-24 overflow-hidden text-[#121316]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#121316]/10 text-xs font-mono uppercase tracking-widest text-[#82111E] mb-4 shadow-xs">
          <Mail className="w-3.5 h-3.5" />
          <span>Connect • Pitch • Accelerate</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#121316] uppercase">
          Initiate Dialogue <br />
          <span className="bg-gradient-to-r from-[#82111E] via-[#9E1B28] to-[#D48B28] bg-clip-text text-transparent">
            With E-Cell VSBCETC
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#58554F] mt-4 font-light leading-relaxed">
          Whether you are an aspiring student founder seeking seed incubation, an industry mentor, or a corporate partner — our team responds within 24 hours.
        </p>
      </section>

      {/* 2. Main Content Grid (No Boxed Form Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#82111E] uppercase tracking-[0.25em] font-semibold">
                Direct Coordinates
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase">
                Campus Innovation Hub
              </h2>
              <p className="text-sm text-[#58554F] font-light leading-relaxed">
                Located on the autonomous campus in Coimbatore, our incubation floor hosts maker benches, meeting rooms, and conference pitch pods.
              </p>
            </div>

            <div className="space-y-3">
              {/* Location */}
              <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#82111E] uppercase font-bold">
                    <MapPin className="w-4 h-4 text-[#82111E]" />
                    <span>Campus Location</span>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="btn-glitch text-[11px] font-mono text-[#58554F] hover:text-[#82111E] flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#58554F] font-light leading-relaxed">
                  Innovation Block, VSB College of Engineering Technical Campus, Coimbatore - 642 109, Tamil Nadu, India.
                </p>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-1 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono text-[#82111E] uppercase font-bold">
                  <Mail className="w-4 h-4 text-[#D48B28]" />
                  <span>Official Inquiries</span>
                </div>
                <a
                  href="mailto:ecell@vsbcetc.edu.in"
                  className="text-xs sm:text-sm text-[#121316] hover:text-[#82111E] transition-colors font-mono font-medium"
                >
                  ecell@vsbcetc.edu.in
                </a>
              </div>

              {/* Phone & Office Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#82111E] uppercase font-bold">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Desk Line</span>
                  </div>
                  <div className="text-xs text-[#58554F] font-mono">
                    +91 422 236 3700
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#82111E] uppercase font-bold">
                    <Clock className="w-4 h-4 text-[#D48B28]" />
                    <span>Incubation Hours</span>
                  </div>
                  <div className="text-xs text-[#58554F] font-mono">
                    Mon - Sat: 9 AM - 6 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Credential highlight */}
            <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#121316]/10 space-y-2">
              <div className="text-xs font-mono text-[#82111E] uppercase tracking-wider font-bold">
                Autonomous Innovation Ecosystem
              </div>
              <p className="text-xs text-[#58554F] font-light leading-relaxed">
                VSB College of Engineering Technical Campus provides rapid intellectual property (IP) facilitation, faculty co-mentorship, and seed fund nominations for verified student innovators.
              </p>
            </div>
          </div>

          {/* Right Column: Seamless Inline-Validated Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 rounded-3xl bg-white border border-emerald-600/30 text-center space-y-4 shadow-sm">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase">
                  Transmission Received
                </h3>
                <p className="text-sm text-[#58554F] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#121316] font-semibold">{form.name}</span>. Your message has been logged into our incubation queue. The E-Cell coordinator will follow up at <span className="text-[#82111E] font-mono font-bold">{form.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-glitch mt-4 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#82111E] text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-[#121316]/10 pb-4">
                  <span className="text-xs font-mono text-[#82111E] uppercase tracking-widest font-semibold">
                    Submit Proposal
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display uppercase mt-1">
                    Send Direct Message
                  </h2>
                </div>

                {errors.form && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-700 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-mono tracking-wider text-[#58554F] font-semibold">
                      Full Name *
                    </label>
                    {errors.name && (
                      <span className="text-[11px] font-mono text-[#82111E] font-bold">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Vigneshwar Kumar"
                    className="brand-input-field"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-mono tracking-wider text-[#58554F] font-semibold">
                      Email Address *
                    </label>
                    {errors.email && (
                      <span className="text-[11px] font-mono text-[#82111E] font-bold">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="founder@student.vsbcetc.edu.in"
                    className="brand-input-field"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono tracking-wider text-[#58554F] font-semibold">
                    Subject / Objective
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Incubation Pitch / Mentorship Application / Event Partnership"
                    className="brand-input-field"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-mono tracking-wider text-[#58554F] font-semibold">
                      Message / Pitch Summary *
                    </label>
                    {errors.message && (
                      <span className="text-[11px] font-mono text-[#82111E] font-bold">
                        {errors.message}
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your startup concept, technical prototype stage, or partnership goals in detail..."
                    className="brand-input-field resize-none"
                    required
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-glitch group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#82111E] to-[#9E1B28] hover:from-[#9E1B28] hover:to-[#B82132] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 disabled:opacity-50"
                    data-cursor-text="Send"
                  >
                    <span>{submitting ? "Transmitting Data..." : "Transmit Proposal"}</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
