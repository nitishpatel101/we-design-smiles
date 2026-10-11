"use client";

import React from "react";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-30 bg-slate-950 text-slate-400 border-t border-white/10 py-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Left */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="text-base font-black tracking-wider text-white uppercase">
            WE DESIGN <span className="text-cyan-400">SMILES</span>
          </span>
        </div>

        {/* Center Quick Contact */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Alkapuri, Vadodara, Gujarat</span>
          </div>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+91 98765 43210</span>
          </a>
          <a
            href="mailto:care@wedesignsmiles.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>care@wedesignsmiles.com</span>
          </a>
        </div>

        {/* Copyright Right */}
        <div className="text-xs text-slate-500">
          © 2026 WE DESIGN SMILES. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
