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

      {/* Fullscreen Video Scrubber (Combined 3-in-1 video, 361 frames) */}
      <CombinedScrubber
        folderPath="/videos/combined_frames"
        totalFrames={361}
      />

      {/* Footer at the very bottom */}
      <Footer />

      {/* Booking Modal on demand */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
