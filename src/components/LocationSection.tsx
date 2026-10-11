"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation as NavigationIcon,
  CheckCircle,
  Car,
} from "lucide-react";

interface LocationSectionProps {
  address?: string;
  phone?: string;
  email?: string;
  hours?: { days: string; time: string }[];
  mapEmbedUrl?: string;
}

export default function LocationSection({
  address = "302, Platinum Heights, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007",
  phone = "+91 98765 43210",
  email = "care@wedesignsmiles.com",
  hours = [
    { days: "Monday - Friday", time: "09:00 AM - 08:00 PM" },
    { days: "Saturday", time: "09:00 AM - 06:00 PM" },
    { days: "Sunday", time: "10:00 AM - 02:00 PM (Emergency Only)" },
  ],
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14764.714571761662!2d73.1678!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8b0a701d5df%3A0xb15c4d008e0e0a5!2sAlkapuri%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
}: LocationSectionProps) {
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Alkapuri+Vadodara+Gujarat";

  return (
    <section id="location" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Sanctuary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Prime Central Location & Hours
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Conveniently situated in Vadodara's medical and commercial district with dedicated valet parking and barrier-free accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
                  Clinic Headquarters
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">
                  WE DESIGN SMILES
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Center for Advanced Aesthetic & Implant Dentistry
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-slate-400">
                    Address
                  </h4>
                  <p className="text-sm text-slate-200 mt-0.5 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-slate-400">
                    Direct Line & WhatsApp
                  </h4>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm text-cyan-300 hover:text-cyan-200 font-semibold block mt-0.5 transition-colors"
                  >
                    {phone}
                  </a>
                  <span className="text-[11px] text-slate-400">
                    24/7 Dental Emergency Response
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-slate-400">
                    Inquiries & Records
                  </h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-cyan-300 hover:text-cyan-200 font-semibold block mt-0.5 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="text-xs uppercase font-semibold text-slate-400 mb-2">
                    Operating Hours
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {hours.map((h, i) => (
                      <div key={i} className="flex justify-between text-slate-300">
                        <span>{h.days}:</span>
                        <span className="font-semibold text-white">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Free Valet Parking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                  <span>Wheelchair Accessible</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/20"
              >
                <NavigationIcon className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative min-h-[420px] flex flex-col">
            <iframe
              title="WE DESIGN SMILES Clinic Location"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[420px] flex-1 border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Top pill badge */}
            <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-white shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">Vadodara Center Open Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
