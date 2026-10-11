"use client";

import React from "react";
import { Sparkles, Calendar } from "lucide-react";

interface MinimalHeaderProps {
  onOpenBooking: () => void;
}

export default function MinimalHeader({ onOpenBooking }: MinimalHeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent backdrop-blur-[2px] py-6 px-6 sm:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-300 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-black tracking-wider text-white uppercase drop-shadow">
              WE DESIGN <span className="text-cyan-400">SMILES</span>
            </span>
          </div>
        </div>

        {/* Right Side: Book Consultant Button */}
        <div>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultant</span>
          </button>
        </div>
      </div>
    </header>
  );
}
