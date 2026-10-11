"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import WalkthroughStage from "@/components/WalkthroughStage";
import TrustStrip from "@/components/TrustStrip";
import LocationStrip from "@/components/LocationStrip";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BookingModal from "@/components/BookingModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 font-sans relative">
      {/* Header with Brand (Left) and Book Consultant (Right) */}
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Hero Welcome & Clinic Trust */}
      <HeroBanner onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Interactive 361-Frame Cinematic Clinic Tour */}
      <WalkthroughStage
        folderPath="/videos/combined_frames"
        totalFrames={361}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Clinic Credentials & Statistics */}
      <TrustStrip />

      {/* Vadodara Location & Google Map Embed */}
      <LocationStrip />

      {/* Comprehensive Clinic Directory Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Floating Quick WhatsApp & Phone Hotline */}
      <FloatingActions />

      {/* Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
