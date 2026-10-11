"use client";

import React from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface VideoOverlayProps {
  badge?: string;
  title: string;
  description: string;
  stepNumber?: string;
  onExploreClick?: () => void;
}

export default function VideoOverlay({
  badge,
  title,
  description,
  stepNumber,
  onExploreClick,
}: VideoOverlayProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-20 flex flex-col justify-end">
      {/* Soft gradient backdrop for maximum text legibility */}
      <div className="w-full bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-transparent pt-32 pb-8 px-6 sm:px-12 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badge}</span>
                {stepNumber && <span className="opacity-60">• {stepNumber}</span>}
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-light drop-shadow">
              {description}
            </p>
          </div>

          <div className="pointer-events-auto flex items-center gap-4">
            <a
              href="#booking"
              className="px-6 py-3 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Book Consultation
            </a>
          </div>
        </div>

        {/* Scroll indicator guidance */}
        <div className="mt-8 flex items-center justify-center gap-2 text-cyan-300/80 text-xs tracking-widest uppercase font-medium animate-pulse">
          <span>Scroll to scrub flow</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
