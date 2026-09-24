"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo3DScene from "@/components/3d/Logo3DScene";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#F7F3E9]/90 backdrop-blur-md border-b border-[#121316]/10 shadow-[0_10px_30px_rgba(45,35,25,0.06)]"
            : "py-5 bg-transparent border-b border-[#121316]/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand with 3D Medallion (Hands Cradling Cap) */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus:outline-none"
            data-cursor-text="Home"
          >
            <div className="relative flex items-center justify-center p-1 rounded-full bg-white shadow-sm border border-[#121316]/10 group-hover:border-[#82111E]/40 transition-colors">
              <Logo3DScene variant="header" className="w-10 h-10 sm:w-11 sm:h-11" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#121316] group-hover:text-[#82111E] transition-colors">
                  E-CELL
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#82111E]/10 border border-[#82111E]/20 text-[#82111E] rounded font-bold">
                  VSBCETC
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-[#58554F] font-medium">
                Where Vision Meets Venture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-lg border border-[#121316]/10 shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 btn-glitch ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#82111E] to-[#9E1B28] shadow-[0_4px_12px_rgba(130,17,30,0.25)]"
                      : "text-[#58554F] hover:text-[#121316] hover:bg-[#EFE8DC]/60"
                  }`}
                  data-cursor-text="Go"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-mono bg-white/70 border border-[#121316]/10 rounded-full text-[#58554F]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>IIT Bombay NEC Track</span>
            </div>

            <Link
              href="/contact"
              className="btn-glitch group relative inline-flex items-center gap-1.5 px-5 py-2 text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-[#82111E] to-[#9E1B28] hover:from-[#9E1B28] hover:to-[#B82132] rounded-full border border-[#82111E]/30 shadow-[0_4px_15px_rgba(130,17,30,0.25)] transition-all duration-200"
              data-cursor-text="Pitch"
            >
              <span>Apply for Incubation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/contact"
              className="btn-glitch px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold text-white bg-[#82111E] rounded-full"
            >
              Apply
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#121316] hover:text-[#82111E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#F7F3E9]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between px-6 pt-24 pb-8 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white border border-[#121316]/10 rounded-full text-[#58554F] w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>NEC IIT Bombay Partner</span>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-display font-bold py-2 border-b border-[#121316]/10 flex items-center justify-between ${
                    isActive ? "text-[#82111E]" : "text-[#121316]"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-50" />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-[#121316]/10">
          <Link
            href="/contact"
            className="w-full block py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#82111E] to-[#9E1B28] rounded-xl shadow-lg btn-glitch"
          >
            Apply for Incubation
          </Link>
          <div className="text-center text-xs text-[#58554F]">
            VSB College of Engineering Technical Campus • Autonomous
          </div>
        </div>
      </div>
    </>
  );
}
