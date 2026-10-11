"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Phone, Sparkles } from "lucide-react";

interface FloatingCornerControlsProps {
  onOpenBooking: () => void;
}

export default function FloatingCornerControls({
  onOpenBooking,
}: FloatingCornerControlsProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <>
      {/* Floating Bottom Left: Dark Capsule "BOOK NOW" Button (Matching reference) */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={onOpenBooking}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-black/75 backdrop-blur-md border border-white/25 hover:border-[#dfbe76] hover:text-[#dfbe76] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#dfbe76] group-hover:rotate-12 transition-transform" />
          <span className="font-sans tracking-widest text-[11px]">BOOK NOW</span>
        </button>
      </div>

      {/* Floating Bottom Right: 3 Stacked Circular Glass Action Icons (Matching reference) */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5">
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

        {/* Instagram Social Icon (SVG) */}
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
    </>
  );
}
