"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DynamicAmbientBackground from "@/components/layout/DynamicAmbientBackground";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ProspectusModal from "@/components/ui/ProspectusModal";
import PitchModal from "@/components/ui/PitchModal";

export default function PersistentShell({ children }: { children: React.ReactNode }) {
  const [prospectusOpen, setProspectusOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col bg-[#08090D] overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-300">
        {/* Seamless Dynamic Ambient Background */}
        <DynamicAmbientBackground />

        {/* Global Navigation Bar */}
        <Navbar
          onOpenProspectus={() => setProspectusOpen(true)}
          onOpenPitch={() => setPitchOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Global Interactive Modals */}
        <ProspectusModal isOpen={prospectusOpen} onClose={() => setProspectusOpen(false)} />
        <PitchModal isOpen={pitchOpen} onClose={() => setPitchOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
