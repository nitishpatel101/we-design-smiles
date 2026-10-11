"use client";

import React, { useState, useEffect } from "react";
import LuxuryHeader from "@/components/LuxuryHeader";
import CombinedScrubber from "@/components/CombinedScrubber";
import AreaOverlay from "@/components/AreaOverlay";
import FloatingCornerControls from "@/components/FloatingCornerControls";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState("01 • THE ARRIVAL & RECEPTION");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));

      if (progress < 0.28) {
        setCurrentChapter("01 • THE ARRIVAL & RECEPTION");
      } else if (progress < 0.55) {
        setCurrentChapter("02 • ERGONOMIC TREATMENT SUITE");
      } else if (progress < 0.82) {
        setCurrentChapter("03 • SMILE TRANSFORMATIONS GALLERY");
      } else {
        setCurrentChapter("04 • STERILE CLINICAL CONTINUITY");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950 font-sans relative">
      {/* Luxury Editorial Header matching Reference Image Style */}
      <LuxuryHeader
        onOpenBooking={() => setIsBookingOpen(true)}
        currentChapter={currentChapter}
      />

      {/* Fullscreen Video Scrubber (5000 frames, ultra-smooth) */}
      <CombinedScrubber
        videoSrc="/scrub_video.mp4"
        totalFrames={5000}
      />

      {/* Small subtle transparent area callouts updating with scroll */}
      <AreaOverlay />

      {/* Floating Corner Buttons matching Reference Image */}
      <FloatingCornerControls onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Comprehensive Clinic Footer at the bottom */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Appointment Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
