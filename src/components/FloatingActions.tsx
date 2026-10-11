"use client";

import React from "react";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingActions() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=Hello%20WE%20DESIGN%20SMILES,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment.";

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all group"
        title="Chat on WhatsApp (+91 98765 43210)"
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919876543210"
        aria-label="Direct Phone Call"
        className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all group"
        title="Direct Line (+91 98765 43210)"
      >
        <Phone className="w-5 h-5 text-slate-950" />
      </a>
    </div>
  );
}
