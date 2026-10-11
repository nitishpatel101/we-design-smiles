"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar } from "lucide-react";

interface LuxuryHeaderProps {
  onOpenBooking: () => void;
  currentChapter?: string;
}

export default function LuxuryHeader({
  onOpenBooking,
  currentChapter = "01 • THE ARRIVAL & RECEPTION",
}: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 px-6 sm:px-10 py-5 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-white/10 shadow-xl"
          : "bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
        {/* Left Side: Editorial Luxury Branding */}
        <div className="space-y-1">
          {/* Chapter Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 border border-white/20 text-slate-200 backdrop-blur-md mb-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe76] animate-pulse" />
            <span>{currentChapter}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif tracking-wider text-white uppercase drop-shadow font-normal">
            WE DESIGN SMILES
          </h1>
          <p className="text-[10px] tracking-widest uppercase font-medium text-amber-200/90 font-mono">
            AESTHETIC & IMPLANT DENTAL CLINIC
          </p>
          <p className="text-[9px] tracking-widest uppercase text-slate-400 font-mono hidden sm:block">
            FLAGSHIP CLINIC • ALKAPURI, VADODARA
          </p>
        </div>

        {/* Right Side: Golden Capsule Button (Exactly matching reference image) */}
        <div className="pt-1">
          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-[#1a1407] bg-gradient-to-r from-[#dfbe76] via-[#ebd08e] to-[#dfbe76] hover:from-[#ebd08e] hover:to-[#f5dfa6] shadow-[0_4px_25px_rgba(223,190,118,0.35)] border border-[#fcedc2] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Delicate Sparkle / Flower icon */}
            <Sparkles className="w-3.5 h-3.5 text-[#1a1407] group-hover:rotate-12 transition-transform" />
            <span className="font-sans font-extrabold tracking-wider">BOOK CONSULTATION</span>
          </button>
        </div>
      </div>
    </header>
  );
}
