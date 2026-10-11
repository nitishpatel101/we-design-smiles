"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface FloatingCornerControlsProps {
  onOpenBooking: () => void;
}

export default function FloatingCornerControls({
  onOpenBooking,
}: FloatingCornerControlsProps) {
  return (
    /* Floating Bottom Left: Dark Capsule "BOOK NOW" Button */
    <div className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-40">
      <button
        onClick={onOpenBooking}
        className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-white bg-black/75 backdrop-blur-md border border-white/25 hover:border-[#dfbe76] hover:text-[#dfbe76] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#dfbe76] group-hover:rotate-12 transition-transform" />
        <span className="font-sans tracking-widest text-[10px] sm:text-[11px]">BOOK NOW</span>
      </button>
    </div>
  );
}
