"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Phone } from "lucide-react";

interface LuxuryHeaderProps {
  currentChapter?: string;
  onOpenBooking?: () => void;
}

export default function LuxuryHeader({
  currentChapter = "01 • THE ARRIVAL & RECEPTION",
}: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

        {/* Right Side: 3 Stacked Circular Glass Action Icons moved to Top-Right */}
        <div className="flex items-center gap-2.5 pt-1">
          {/* Sound Toggle Icon */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#dfbe76] hover:border-[#dfbe76]/50 flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
            title={isMuted ? "Sound: Off" : "Sound: On"}
            aria-label="Sound Toggle"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#dfbe76]" />
            )}
          </button>

          {/* Instagram Social Icon */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#dfbe76] hover:border-[#dfbe76]/50 flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            title="Follow on Instagram"
            aria-label="Instagram Link"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* Direct Phone Call Icon */}
          <a
            href="tel:+919876543210"
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#dfbe76] hover:border-[#dfbe76]/50 flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            title="Direct Phone Call (+91 98765 43210)"
            aria-label="Phone Call Link"
          >
            <Phone className="w-4 h-4 text-slate-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
