"use client";

import React, { useState } from "react";
import { X, Download, Printer, CheckCircle2, ShieldCheck, Award, Zap, Layers } from "lucide-react";
import Button from "@/components/ui/Button";

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProspectusModal({ isOpen, onClose }: ProspectusModalProps) {
  const [activeTab, setActiveTab] = useState<"roadmap" | "grants" | "syndicate" | "criteria">("roadmap");

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0C14] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#08090D] rounded-[11px] flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                E-CELL 2026 FOUNDER PROSPECTUS
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Official Incubation Handbook & Venture Guidelines • Cohort 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.05] border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 border-b border-white/10 bg-black/40 overflow-x-auto">
          {[
            { id: "roadmap", label: "Incubation Roadmap", icon: Layers },
            { id: "grants", label: "Seed Grants & Sandbox", icon: Zap },
            { id: "syndicate", label: "Angel Syndicate", icon: Award },
            { id: "criteria", label: "Eligibility & Deadlines", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-gray-300">
          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">The 4-Stage Incubation Architecture</h4>
                <p className="text-xs text-gray-400">
                  Our structured venture framework takes technical student teams from dorm-room hypotheses to venture-backed seed rounds in 16 weeks.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold">PHASE 01 • WEEKS 1-4</div>
                  <h5 className="font-semibold text-white">Problem Validation & Customer Discovery</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Unstructured customer interviews, TAM/SAM sizing, unit economics modeling, and competitive moat definition.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
                  <div className="text-xs font-mono text-indigo-400 font-bold">PHASE 02 • WEEKS 5-8</div>
                  <h5 className="font-semibold text-white">Rapid Prototyping & Sandbox Grant</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Access to 3D printers, PCB milling stations, GPU cloud clusters, and up to ₹50,000 for low-fidelity MVP parts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold">PHASE 03 • WEEKS 9-12</div>
                  <h5 className="font-semibold text-white">Pilot Deployment & Traction</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Closed-beta customer launches, conversion tracking, feedback synthesis, and legal patent filings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold">PHASE 04 • WEEKS 13-16</div>
                  <h5 className="font-semibold text-white">Angel Syndicate Pitch Day</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Closed-door pitch presentations to 30+ institutional angels and early-stage venture funds for up to ₹50L seed allocation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "grants" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Financial & Infrastructure Grants</h4>
                <p className="text-xs text-gray-400">
                  Every accepted cohort startup is granted non-dilutive prototype funds and enterprise compute credits.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-semibold text-white text-xs">Non-Dilutive Prototype Capital (₹50,000 - ₹5,00,000)</h6>
                    <p className="text-xs text-gray-400">
                      Equity-free funding directly allocated to bill-of-materials, hosting, sensor components, and patent drafting fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-semibold text-white text-xs">$100,000+ Cloud Infrastructure Credits</h6>
                    <p className="text-xs text-gray-400">
                      Full tier access to AWS Activate, Google Cloud for Startups, OpenAI API credits, and GitHub Enterprise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-semibold text-white text-xs">24/7 DeepTech Prototyping Sandbox</h6>
                    <p className="text-xs text-gray-400">
                      High-end stereolithography 3D printers, digital oscilloscopes, CNC cutting, and laser machining.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-semibold text-white text-xs">Zero-Cost Company Incorporation & IP Protection</h6>
                    <p className="text-xs text-gray-400">
                      Free legal counsel for Private Limited registration, founders' agreements, cap table structure, and provisional patent filing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "syndicate" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Investor Syndicate & Angel Network</h4>
                <p className="text-xs text-gray-400">
                  Our startups pitch directly to high-conviction angel syndicates, micro-VCs, and seasoned tech founders.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-indigo-950/30 border border-cyan-500/20 space-y-3">
                <div className="text-xs font-mono text-cyan-400">TERM SHEET PRINCIPLES</div>
                <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
                  <li><strong>Founder-First Cap Table:</strong> Student founders retain &gt;85% equity post-seed.</li>
                  <li><strong>Standardized SAFE Agreements:</strong> Simple agreements for future equity with standardized valuation caps.</li>
                  <li><strong>Active Advisory Board:</strong> Angels commit at least 2 hours of monthly mentorship per team.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "criteria" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Cohort 2026 Deadlines & Requirements</h4>
                <p className="text-xs text-gray-400">
                  Applications are open to current undergraduate and postgraduate students with a demonstrable technical prototype or validated thesis.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <span className="text-gray-400">Early Application Deadline:</span>
                  <span className="font-mono text-cyan-400 font-semibold">OCTOBER 15, 2026</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <span className="text-gray-400">Cohort Induction & Grant Allocation:</span>
                  <span className="font-mono text-indigo-400 font-semibold">NOVEMBER 01, 2026</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <span className="text-gray-400">Demo Day & Syndicate Pitch:</span>
                  <span className="font-mono text-emerald-400 font-semibold">FEBRUARY 20, 2027</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <span className="text-xs text-gray-500 font-mono">E-CELL • ENTREPRENEURSHIP CELL</span>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={handlePrint} icon={<Download className="w-3.5 h-3.5" />}>
              Download / Print PDF
            </Button>
            <Button size="sm" variant="primary" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
