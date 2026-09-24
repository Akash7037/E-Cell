"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Award, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 mt-auto border-t border-[#121316]/10 bg-[#EFE8DC]/95 backdrop-blur-xl text-[#121316]">
      {/* Brand accent sweep line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#82111E] via-[#D48B28] to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#121316]/10">
          {/* Column 1 & 2: Brand & Affiliations */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#82111E] text-white flex items-center justify-center font-display font-extrabold text-sm shadow-sm">
                VSB
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-[#121316] block">
                  ENTREPRENEURSHIP CELL
                </span>
                <span className="text-[11px] font-mono text-[#82111E] tracking-wider uppercase font-semibold">
                  VSB College of Engineering Technical Campus
                </span>
              </div>
            </div>

            <p className="text-sm text-[#58554F] max-w-md leading-relaxed">
              Empowering student founders, deep-tech researchers, and innovative problem solvers.
              Where vision meets venture, translating campus engineering prototypes into scalable market enterprises.
            </p>

            {/* Accreditations Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#121316]/10 rounded-full text-xs text-[#121316] shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#D48B28]" />
                <span className="font-medium">NAAC A+ Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#121316]/10 rounded-full text-xs text-[#121316] shadow-xs">
                <Shield className="w-3.5 h-3.5 text-[#82111E]" />
                <span className="font-medium">NBA Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#121316]/10 rounded-full text-xs text-[#121316] shadow-xs">
                <span className="font-medium">Autonomous Institution</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#82111E] font-bold font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 group">
                  <span>Home Overview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 group">
                  <span>Mission & Story</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 group">
                  <span>20 Leadership & Team Leads</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 group">
                  <span>Events & INNOVATEX</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#58554F] hover:text-[#82111E] transition-colors flex items-center gap-1 group">
                  <span>Apply for Incubation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Programs */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#82111E] font-bold font-mono">
              Initiatives
            </h4>
            <ul className="space-y-2.5 text-sm text-[#58554F]">
              <li>IIT Bombay NEC Track</li>
              <li>Autonomous Startup Credits</li>
              <li>Seed Prototype Grants</li>
              <li>Patent & IP Guidance Desk</li>
              <li>AI Venture Laboratory</li>
              <li>Women In Venture Forum</li>
            </ul>
          </div>

          {/* Column 5: Campus Address */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#82111E] font-bold font-mono">
              Campus Headquarters
            </h4>
            <div className="space-y-2.5 text-sm text-[#58554F]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#82111E] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Innovation Block, VSB College of Engineering Technical Campus, Coimbatore - 642 109, Tamil Nadu, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D48B28] shrink-0" />
                <a href="mailto:ecell@vsbcetc.edu.in" className="hover:text-[#82111E] transition-colors font-mono">
                  ecell@vsbcetc.edu.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#58554F] shrink-0" />
                <span className="font-mono">+91 422 236 3700</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A857C]">
          <div>
            © {new Date().getFullYear()} E-Cell VSBCETC Coimbatore. Where vision meets venture. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-[#82111E] transition-colors btn-glitch focus:outline-none font-medium"
            >
              Back to Top ↑
            </button>
            <Link
              href="/admin"
              className="opacity-50 hover:opacity-100 hover:text-[#82111E] transition-all font-mono"
              data-cursor-text="Admin"
            >
              System Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
