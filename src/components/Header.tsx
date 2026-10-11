"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Phone, MapPin } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
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
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5"
          : "bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left Side: Brand Logo & Clinic Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-300 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="block text-base sm:text-lg font-black tracking-wider text-white uppercase drop-shadow">
              WE DESIGN <span className="text-cyan-400">SMILES</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-slate-400">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Alkapuri, Vadodara</span>
            </div>
          </div>
        </div>

        {/* Right Side: Phone + Book Consultant Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+919876543210"
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+91 98765 43210</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultant</span>
          </button>
        </div>
      </div>
    </header>
  );
}
