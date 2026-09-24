"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Send, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#06070B] border-t border-white/8 pt-20 pb-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Giant Kinetic Brand Display */}
        <div className="pb-16 border-b border-white/8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLEGIATE VENTURE INCUBATOR</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white font-display uppercase">
              IGNITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300">VENTURES</span>
            </h2>
            <p className="text-gray-400 max-w-lg mt-3 text-sm sm:text-base leading-relaxed">
              Transforming undergraduate engineering breakthroughs into venture-backed technology companies.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
              Direct Founder Inquiries
            </span>
            <a
              href="mailto:ventures@ecell.org"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-white hover:text-cyan-400 transition-colors group"
            >
              <span>ventures@ecell.org</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/8 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs font-mono text-cyan-400/80">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <Link href="/#incubation" className="hover:text-cyan-400 transition-colors">
                  Incubation Sandbox
                </Link>
              </li>
              <li>
                <Link href="/#ventures" className="hover:text-cyan-400 transition-colors">
                  Portfolio Startups
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-400 transition-colors">
                  E-Summit 2026
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-400 transition-colors">
                  Hack2Build Sprint
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs font-mono text-cyan-400/80">
              Initiatives
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <Link href="/#pitch" className="hover:text-cyan-400 transition-colors">
                  Pre-Seed Seed Grants
                </Link>
              </li>
              <li>
                <Link href="/#pitch" className="hover:text-cyan-400 transition-colors">
                  Patent Filing Support
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-400 transition-colors">
                  Founder Mentorship
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  Institutional Legacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs font-mono text-cyan-400/80">
              Resources
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About E-Cell
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-400 transition-colors">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Pitch Deck Submission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Office Hours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs font-mono text-cyan-400/80">
              Founder Briefing
            </h4>
            <p className="text-gray-400 text-xs mb-3">
              Receive cohort application deadlines, seed grant updates, and angel pitch dates.
            </p>
            <div className="flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-1 focus-within:border-cyan-500/50">
              <input
                type="email"
                placeholder="founder@campus.edu"
                className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                aria-label="Subscribe"
                className="p-1.5 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} E-Cell. All rights reserved. Autonomous Student Venture Launchpad.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
              <span className="font-bold text-xs">in</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Twitter">
              <span className="font-bold text-xs">X</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="GitHub">
              <span className="font-bold text-xs">GH</span>
            </a>
            <a href="mailto:info@ecell.org" className="hover:text-cyan-400 transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
