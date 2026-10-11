"use client";

import React, { useEffect, useState } from "react";

interface AreaInfo {
  tag: string;
  title: string;
  desc: string;
  pills: string[];
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

  let currentArea: AreaInfo;

  if (progress < 0.28) {
    currentArea = {
      tag: "ZONE 01 • ARRIVAL",
      title: "Executive Reception & Patient Sanctuary",
      desc: "Tranquil arrival lounge designed for immediate comfort and anxiety-free hospitality.",
      pills: ["Private Concierge", "Noise-Canceling Architecture", "Warm Natural Light"],
    };
  } else if (progress < 0.58) {
    currentArea = {
      tag: "ZONE 02 • CLINICAL OPERATORY",
      title: "Ergonomic Treatment Suite",
      desc: "Hospital-grade overhead lighting, whisper-quiet electric handpieces and computerized painless anesthesia.",
      pills: ["Ergonomic Memory-Foam Chair", "3D Digital Scanners", "100% Painless Protocol"],
    };
  } else if (progress < 0.82) {
    currentArea = {
      tag: "ZONE 03 • RESULTS GALLERY",
      title: "Smile Transformations & Results Wall",
      desc: "Documented porcelain veneer cases, smile restorations, and verified patient transformations.",
      pills: ["Porcelain Veneers & Lumineers", "Digital Smile Design", "Verified Outcomes"],
    };
  } else {
    currentArea = {
      tag: "ZONE 04 • FACILITY CONTINUITY",
      title: "Corridors & Sterile Infrastructure",
      desc: "Seamless connectivity connecting consultation areas to sterile surgical operation wings.",
      pills: ["Class-B Autoclaves", "7-Stage Sterilization", "NABH Hospital Standards"],
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-12 select-none">
      {/* Upper-Left: 100% PURE TRANSPARENT TEXT (No box, no border, no background) */}
      <div className="mt-28 max-w-lg transition-all duration-700 ease-out">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-300/90 mb-1 drop-shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{currentArea.tag}</span>
        </div>

        <h3 className="text-base sm:text-xl font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {currentArea.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-200/90 mt-1.5 leading-relaxed font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
          {currentArea.desc}
        </p>

        {/* Small Transparent Pill Tags (No background, just pure transparent floating text with subtle dot) */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-wider text-slate-300/90">
          {currentArea.pills.map((pill, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              <span className="text-amber-400 opacity-75">•</span>
              <span>{pill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Empty bottom spacer to allow footer interaction */}
      <div />
    </div>
  );
}
