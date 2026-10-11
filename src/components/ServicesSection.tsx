"use client";

import React from "react";
import {
  Sparkles,
  Smile,
  Shield,
  Layers,
  Zap,
  HeartPulse,
  Check,
  ArrowUpRight,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Smile,
      title: "Digital Smile Design",
      subtitle: "Custom Porcelain Veneers & Lumineers",
      description:
        "AI-guided facial symmetry mapping and hand-crafted porcelain laminates that produce natural, radiant, Hollywood-grade smiles.",
      features: ["3D Virtual Trial Smile", "Minimal tooth reduction", "Stain-resistant ceramics"],
      time: "2 - 3 Sessions",
      popular: true,
    },
    {
      icon: Zap,
      title: "Laser Teeth Whitening",
      subtitle: "In-Office Phillips Zoom! Power Bleach",
      description:
        "Light-activated professional whitening that brightens teeth up to 8 shades in a single relaxing 45-minute appointment with zero sensitivity.",
      features: ["Up to 8 shades whiter", "Enamel-safe desensitizer", "Instant results"],
      time: "45 Minutes",
      popular: false,
    },
    {
      icon: Layers,
      title: "Dental Implants & All-on-4",
      subtitle: "Swiss Titanium & Zirconia Implants",
      description:
        "Permanent, life-like tooth replacements engineered with Straumann Swiss implants and computer-guided 3D surgical templates.",
      features: ["Lifetime manufacturer warranty", "Same-day teeth option", "Natural bite force"],
      time: "Same-Day Guided",
      popular: false,
    },
    {
      icon: Sparkles,
      title: "Invisalign & Clear Aligners",
      subtitle: "Discreet Orthodontic Straightening",
      description:
        "Custom-molded transparent aligners that gently reposition teeth without metal brackets, wires, or dietary restrictions.",
      features: ["Nearly invisible aligners", "3D iTero digital scans", "Removable for dining"],
      time: "6 - 14 Months",
      popular: true,
    },
    {
      icon: HeartPulse,
      title: "Microscopic Endodontics",
      subtitle: "Painless Single-Visit Root Canals",
      description:
        "High-magnification surgical microscope therapy ensuring 100% canal disinfection, preserving your natural tooth without pain.",
      features: ["Rotary nickel-titanium tech", "Single painless session", "Permanent tooth save"],
      time: "60 Minutes",
      popular: false,
    },
    {
      icon: Shield,
      title: "VIP Preventative Spa",
      subtitle: "Ultrasonic Scaling & Air-Flow Polishing",
      description:
        "Gentle biofilm removal, oral cancer screening, remineralization treatments, and comprehensive digital wellness diagnostics.",
      features: ["Painless ultrasonic scaling", "Air-Flow glycine polishing", "Fluoride enamel shield"],
      time: "30 Minutes",
      popular: false,
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/50 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Artistry Meets Dental Science
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Every procedure is planned using 3D digital simulation and carried out with micro-precision for unmatched aesthetics and lasting durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 bg-slate-900/90 border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group shadow-xl backdrop-blur-sm ${
                  item.popular
                    ? "border-cyan-500/40 shadow-cyan-500/10"
                    : "border-white/10 hover:border-cyan-400/30"
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                    Signature Choice
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-medium text-cyan-300/80 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 mt-3 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between text-xs border-t border-white/5">
                  <span className="text-slate-400">Duration: <strong className="text-slate-200">{item.time}</strong></span>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold group/link"
                  >
                    <span>Reserve</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
