"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowUpRight, FileText } from "lucide-react";
import Button from "@/components/ui/Button";

interface NavbarProps {
  onOpenProspectus?: () => void;
  onOpenPitch?: () => void;
}

export default function Navbar({ onOpenProspectus, onOpenPitch }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Incubation", href: "/#incubation" },
    { label: "Ventures", href: "/#ventures" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3.5 px-4 sm:px-8 flex justify-center ${
          scrolled ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <div
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-[#090A0F]/85 backdrop-blur-2xl border border-white/12 shadow-2xl shadow-cyan-950/20"
              : "bg-[#090A0F]/50 backdrop-blur-xl border border-white/8"
          }`}
        >
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] flex items-center justify-center overflow-hidden shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#08090D] rounded-[7px] flex items-center justify-center font-bold text-sm tracking-tighter text-white group-hover:scale-105 transition-transform">
                E<span className="text-cyan-400">C</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-wider text-white flex items-center gap-1.5 font-display">
                E-CELL
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400/80 font-mono -mt-1 uppercase">
                Venture Cell
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10 shadow-sm shadow-cyan-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenProspectus}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prospectus</span>
            </button>

            <Button
              size="sm"
              variant="primary"
              onClick={onOpenPitch}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Pitch Startup
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg bg-white/[0.04] border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 md:hidden bg-[#0A0C14]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProspectus?.();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-gray-200 bg-white/[0.06] border border-white/10"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Download 2026 Prospectus
            </button>

            <Button
              size="md"
              variant="primary"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPitch?.();
              }}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Pitch Your Startup
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
