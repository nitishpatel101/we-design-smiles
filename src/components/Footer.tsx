"use client";

import React from "react";
import { Sparkles, Phone, Mail, MapPin, Heart, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                WE DESIGN <span className="text-cyan-400">SMILES</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Vadodara’s flagship multi-specialty cosmetic dental institution. Pioneering digital dentistry, biomimetic restorations, and compassionate anxiety-free care.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400">
              <Shield className="w-4 h-4" />
              <span>ISO 9001:2015 & NABH Medical Dental Standards Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Interactive Tours</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#walkthrough" className="hover:text-cyan-400 transition-colors">
                  Video 1: Reception to Chair
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-cyan-400 transition-colors">
                  Video 2: Results Gallery
                </a>
              </li>
              <li>
                <a href="#facility" className="hover:text-cyan-400 transition-colors">
                  Video 3: Clinic Continuity
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Treatment Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Specialties</h4>
            <ul className="space-y-2 text-xs">
              <li>Porcelain Veneers & Lumineers</li>
              <li>Invisalign & Clear Aligners</li>
              <li>Swiss Dental Implants</li>
              <li>Laser In-Office Whitening</li>
              <li>Microscopic Root Canals</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Concierge</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:care@wedesignsmiles.com" className="hover:text-white transition-colors">
                  care@wedesignsmiles.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Alkapuri, Vadodara, Gujarat 390007</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 WE DESIGN SMILES Dental Clinic. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for healthy, confident smiles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
