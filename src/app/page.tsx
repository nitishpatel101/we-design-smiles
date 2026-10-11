"use client";

import React, { useState } from "react";
import MinimalHeader from "@/components/MinimalHeader";
import CombinedScrubber from "@/components/CombinedScrubber";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 font-sans relative">
      {/* Top Header: Left = Brand Logo, Right = Book Consultant button */}
      <MinimalHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Fullscreen Clean Video Scrubber (Combined 3-in-1 video, 900 frames 1080p) */}
      <CombinedScrubber
        folderPath="/videos/combined_frames"
        totalFrames={900}
      />

      {/* Complete Footer at the very bottom with Contact No, WhatsApp, Address, Timings, etc. */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Consultation Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
