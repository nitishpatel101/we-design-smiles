"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import VideoSection1 from "@/components/VideoSection1";
import VideoSection2 from "@/components/VideoSection2";
import VideoSection3 from "@/components/VideoSection3";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BookingForm from "@/components/BookingForm";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import { Sparkles, ArrowDown, Shield, Star, Award, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Sticky Navigation */}
      <Navigation />

      {/* Hero Welcome Banner */}
      <section
        id="home"
        className="relative pt-36 pb-20 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Cinematic Virtual Experience • Vadodara</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-tight">
          WE DESIGN{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            SMILES
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Experience our world-class clinic through an interactive frame-by-frame walkthrough. Scroll downward to control the cinematic camera flow.
        </p>

        {/* Hero Quick Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>NABH Accredited Clinic</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9 Star Rating (850+ Reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-teal-400" />
            <span>Swiss Guided Implants</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#walkthrough"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Start Virtual Tour</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#booking"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white border border-white/20 hover:border-cyan-400 hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Book Consultation</span>
          </a>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-16 flex flex-col items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest animate-bounce">
          <span>Scroll down to scrub frames</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* SECTION 1: Video 1 - Reception to Doctor's Chair Flow */}
      <VideoSection1
        videoFramePath="/videos/video_1_frames"
        totalFrames={240}
        overlayTitle="We Design Smiles - Professional Dental Care"
        overlayDescription="Your journey to perfect smiles starts here. Step into our welcoming reception, serene corridors, and modern ergonomic treatment suites."
      />

      {/* Interstitial Feature Highlight */}
      <section className="py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">0% Anxiety Protocols</h4>
              <p className="text-xs text-slate-400 mt-0.5">Gentle computerized anesthesia with soothing ambient soundscapes.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI Smile Preview</h4>
              <p className="text-xs text-slate-400 mt-0.5">Preview your transformed smile in realistic 3D before treatment begins.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Lifetime Implant Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Premium Swiss & German implants backed by international warranties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Video 2 - Treatment Chair to Results Gallery */}
      <VideoSection2
        videoFramePath="/videos/video_2_frames"
        totalFrames={240}
        overlayTitle="See Our Smile Transformations - Before & After Results"
        overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles. Glide from active dental artistry to our wall of verified patient smiles."
      />

      {/* SECTION 3: Video 3 - Clinic Continuity Flow */}
      <VideoSection3
        videoFramePath="/videos/video_3_frames"
        totalFrames={240}
        overlayTitle="Professional Clinic Design - Built for Your Comfort"
        overlayDescription="Every space designed for your peace of mind. Witness our calm patient waiting areas seamlessly connecting to bustling, sterile clinical wings."
      />

      {/* SECTION 4: Comprehensive Dental Services */}
      <ServicesSection />

      {/* SECTION 5: About Us & Lead Clinicians */}
      <AboutSection />

      {/* SECTION 6: VIP Booking Form */}
      <BookingForm />

      {/* SECTION 7: Prime Location & Google Map */}
      <LocationSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
