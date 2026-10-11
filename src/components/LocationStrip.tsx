"use client";

import React from "react";
import { MapPin, Phone, Clock, ExternalLink, Car, Navigation } from "lucide-react";

export default function LocationStrip() {
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Alkapuri+Vadodara+Gujarat";
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14764.714571761662!2d73.1678!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8b0a701d5df%3A0xb15c4d008e0e0a5!2sAlkapuri%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <section className="py-20 bg-slate-900/60 border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Vadodara Clinic Center</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Visit Our Clinic in Alkapuri
            </h3>
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Clinic Details */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-white/10 rounded-3xl p-7 flex flex-col justify-between shadow-xl">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono uppercase text-cyan-400">Address</span>
                <p className="text-sm text-slate-200 mt-1 font-medium leading-relaxed">
                  302, Platinum Heights, RC Dutt Road, Opp. Express Residency, Alkapuri, Vadodara, Gujarat 390007
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400">Direct Inquiries</span>
                  <a
                    href="tel:+919876543210"
                    className="block text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400">Consultation Timings</span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Mon - Sat: 9:00 AM - 8:00 PM <br />
                    Sunday: 10:00 AM - 2:00 PM (Emergency)
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                <Car className="w-4 h-4 text-cyan-400" />
                <span>Complimentary Valet Parking & Wheelchair Access</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-xl min-h-[360px]">
            <iframe
              title="Clinic Map Location"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[360px] border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
