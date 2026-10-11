"use client";

import React from "react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Heart,
  Calendar,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  onOpenBooking?: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const whatsappNumber = "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20WE%20DESIGN%20SMILES,%20I%20would%20like%20to%20book%20a%20consultation.`;

  return (
    <footer className="relative z-30 bg-slate-950 text-slate-300 border-t border-white/10 pt-16 pb-12">
      {/* Top CTA Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-teal-950/60 border border-cyan-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Transform Your Smile Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Experience Painless Dental Care?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Schedule your 3D digital smile consultation with our specialists in Alkapuri, Vadodara.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 relative z-10">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Accreditation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="block text-lg font-black tracking-wider text-white uppercase">
                  WE DESIGN <span className="text-cyan-400">SMILES</span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-medium text-slate-400">
                  Dental Center of Excellence
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Vadodara’s premier aesthetic dentistry institution specializing in Digital Smile Design, Swiss Dental Implants, Invisible Aligners, and painless laser treatments.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>NABH Accredited & ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Hospital-Grade 7-Stage Biological Sterilization</span>
              </div>
            </div>

            {/* Doctors in charge */}
            <div className="pt-2 border-t border-white/5 text-xs text-slate-400 space-y-1">
              <div className="text-white font-semibold">Senior Clinicians:</div>
              <div>• Dr. Aryan Sharma (BDS, MDS - Prosthodontist & Implantologist)</div>
              <div>• Dr. Priya Patel (BDS - Cosmetic Dentist & Aligners)</div>
            </div>
          </div>

          {/* Column 2: Specialties & Treatments (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Clinical Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Porcelain Veneers & Lumineers</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Digital Smile Design (DSD 3D)</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Swiss Straumann Dental Implants</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Invisalign Clear Aligners</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• In-Office Laser Teeth Whitening</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Painless Microscopic Root Canal</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Full Mouth Rehabilitation</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">• Pediatric & Preventive Care</li>
            </ul>
          </div>

          {/* Column 3: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Contact & Emergency
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Main Line / Appointments:</span>
                  <a href="tel:+919876543210" className="text-white font-semibold hover:text-cyan-300 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">WhatsApp Consultation:</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    +91 98765 43210 (Chat Now)
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Official Email:</span>
                  <a href="mailto:care@wedesignsmiles.com" className="text-white font-semibold hover:text-cyan-300 transition-colors">
                    care@wedesignsmiles.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400">Clinic Address:</span>
                  <span className="text-slate-300 leading-relaxed block">
                    302, Platinum Heights, RC Dutt Road, Opp. Express Residency, Alkapuri, Vadodara, Gujarat 390007
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Timings (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Clinic Timings
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <span className="block text-white font-semibold">Mon - Fri:</span>
                <span>09:00 AM - 08:00 PM</span>
              </div>
              <div>
                <span className="block text-white font-semibold">Saturday:</span>
                <span>09:00 AM - 06:00 PM</span>
              </div>
              <div>
                <span className="block text-amber-300 font-semibold">Sunday:</span>
                <span>10:00 AM - 02:00 PM</span>
                <span className="block text-[11px] text-slate-500">(Emergency Only)</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Valet Parking Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Medical Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 WE DESIGN SMILES. All rights reserved. Registered under Gujarat Dental Council.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for healthy, radiant smiles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
