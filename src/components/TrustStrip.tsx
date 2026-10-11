"use client";

import React from "react";
import { ShieldCheck, Star, Award, HeartPulse } from "lucide-react";

export default function TrustStrip() {
  const stats = [
    {
      icon: Award,
      value: "15+ Years",
      title: "Clinical Practice",
      sub: "Senior Specialist Dentists",
    },
    {
      icon: Star,
      value: "4.9 / 5.0",
      title: "Patient Rating",
      sub: "850+ Verified Google Reviews",
    },
    {
      icon: HeartPulse,
      value: "18,000+",
      title: "Smiles Designed",
      sub: "Veneers, Implants & Aligners",
    },
    {
      icon: ShieldCheck,
      value: "100% Sterile",
      title: "Hospital Standards",
      sub: "NABH Accredited & ISO Certified",
    },
  ];

  return (
    <section className="py-14 bg-slate-950 border-t border-white/10 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col items-center text-center group hover:border-cyan-400/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
