"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Shield, Eye, Layers } from "lucide-react";

interface AreaInfo {
  tag: string;
  title: string;
  desc: string;
  pills: { label: string; icon: string }[];
}

export default function AreaOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const p = Math.min(1, Math.max(0, scrollY / docHeight));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine current area based on progress
  let currentArea: AreaInfo;

  if (progress < 0.28) {
    currentArea = {
      tag: "ZONE 01 • MAIN ENTRY",
      title: "Executive Reception & Patient Lounge",
      desc: "Designed for immediate tranquility • Zero-anxiety hospitality and warm welcoming decor",
      pills: [
        { label: "Private Concierge Desk", icon: "✨" },
        { label: "Acoustic Noise-Canceling Architecture", icon: "🌿" },
        { label: "Relaxing Natural Lighting", icon: "☀️" },
      ],
    };
  } else if (progress < 0.58) {
    currentArea = {
      tag: "ZONE 02 • CLINICAL OPERATORY",
      title: "Ergonomic Treatment Suite",
      desc: "Hospital-grade surgical lighting • Whisper-quiet electric motors & computerized painless anesthesia",
      pills: [
        { label: "Memory Foam Ergonomic Chair", icon: "💺" },
        { label: "Single-Visit 3D Digital Scans", icon: "🔍" },
        { label: "100% Painless Precision Protocol", icon: "💉" },
      ],
    };
  } else if (progress < 0.82) {
    currentArea = {
      tag: "ZONE 03 • SMILE GALLERY",
      title: "Patient Transformations & Results Wall",
      desc: "Documented porcelain veneer cases, smile makeovers, and life-changing patient outcomes",
      pills: [
        { label: "Custom Porcelain Veneers", icon: "💎" },
        { label: "Digital Smile Design (DSD 3D)", icon: "📐" },
        { label: "Verified Clinical Case Studies", icon: "📋" },
      ],
    };
  } else {
    currentArea = {
      tag: "ZONE 04 • FACILITY CONTINUITY",
      title: "Corridors & Sterile Infrastructure",
      desc: "Seamless connectivity connecting consultation areas to sterile surgical operation wings",
      pills: [
        { label: "Hospital-Grade Class-B Autoclaves", icon: "🛡️" },
        { label: "7-Stage Biological Decontamination", icon: "🧪" },
        { label: "NABH Accreditation Standards", icon: "🏥" },
      ],
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Upper-Left: Subtle Transparent Architectural Area Callout (below header) */}
      <div className="mt-28 max-w-sm sm:max-w-md transition-all duration-700 ease-out">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl text-white/90">
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#dfbe76] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe76] animate-pulse" />
            <span>{currentArea.tag}</span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold tracking-wide text-white/95">
            {currentArea.title}
          </h3>

          <p className="text-[11px] text-slate-300/75 mt-1 leading-relaxed font-light">
            {currentArea.desc}
          </p>
        </div>
      </div>

      {/* Center-Right / Bottom: Small Floating Transparent Feature Pills */}
      <div className="mb-24 flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start sm:self-center transition-all duration-500">
        {currentArea.pills.map((pill, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide bg-black/40 backdrop-blur-md border border-white/10 text-slate-200/85 shadow-lg"
          >
            <span className="text-xs">{pill.icon}</span>
            <span>{pill.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
