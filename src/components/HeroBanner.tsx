"use client";

import React from "react";
import { Sparkles, ArrowDown, ShieldCheck, Star, Award, Calendar } from "lucide-react";

interface HeroBannerProps {
  onOpenBooking: () => void;
}

export default function HeroBanner({ onOpenBooking }: HeroBannerProps) {
  const scrollToTour = () => {
    const el = document.getElementById("tour");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-16 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative z-20">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-6 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Vadodara Center of Dental Excellence</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-tight">
        WE DESIGN{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
          SMILES
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
        Where world-class aesthetic artistry meets 100% painless dental precision. Explore our state-of-the-art facility below through an interactive 3D camera flow.
      </p>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>NABH Accredited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>4.9 / 5.0 (850+ Google Reviews)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Swiss Straumann Implants</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={scrollToTour}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <span>Start Clinic Tour</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenBooking}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold text-white border border-white/20 hover:border-cyan-400 hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Book Consultation</span>
        </button>
      </div>

      {/* Tour Guidance */}
      <div className="mt-12 flex items-center gap-2 text-cyan-400/90 text-[11px] font-mono uppercase tracking-widest animate-pulse">
        <span>Scroll to scrub walkthrough</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
}
