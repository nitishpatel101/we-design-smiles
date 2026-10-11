"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, Award, ShieldCheck, Stethoscope } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  role: string;
  degree: string;
  image: string;
  experience: string;
  procedures: string[];
  description: string;
}

interface DoctorsRotatorProps {
  onOpenBooking: () => void;
}

const DOCTORS: Doctor[] = [
  {
    id: 0,
    name: "Dr. Aryan Sharma",
    role: "Chief Prosthodontist & Implant Surgeon",
    degree: "BDS, MDS • Fellow ICOI (USA)",
    image: "/doctors/dr_aryan_sharma.jpg",
    experience: "15+ Years Clinical Excellence",
    procedures: [
      "Swiss Straumann Dental Implants",
      "Full Arch All-on-4 Rehabilitation",
      "Computer-Guided 3D Implantology",
      "Biomimetic Tooth Replacements",
    ],
    description:
      "Specializes in permanent tooth replacement and full-mouth rehabilitation. Pioneers computerized guided surgery ensuring 100% painless implant placement with lifetime warranties.",
  },
  {
    id: 1,
    name: "Dr. Priya Patel",
    role: "Lead Aesthetic & Digital Smile Designer",
    degree: "BDS, MSc Cosmetic Dentistry (UK)",
    image: "/doctors/dr_priya_patel.jpg",
    experience: "12+ Years Aesthetic Artistry",
    procedures: [
      "Custom Porcelain Veneers & Lumineers",
      "Digital Smile Design (DSD 3D)",
      "In-Office Laser Teeth Whitening",
      "Minimally Invasive Composite Bonding",
    ],
    description:
      "Master of facial aesthetics and natural smile proportions. Crafts ultra-thin, stain-resistant porcelain veneers that recreate radiant, natural Hollywood-standard smiles.",
  },
  {
    id: 2,
    name: "Dr. Rohit Mehta",
    role: "Specialist Orthodontist & Aligner Expert",
    degree: "BDS, MDS Orthodontics • Invisalign Diamond",
    image: "/doctors/dr_rohit_mehta.jpg",
    experience: "10+ Years Orthodontic Care",
    procedures: [
      "Invisalign Clear Aligners",
      "Accelerated Orthodontics",
      "Discreet Ceramic Braces",
      "Complex Bite & Jaw Alignment",
    ],
    description:
      "Certified Invisalign Diamond Provider specializing in invisible teeth straightening for working adults and teenagers without metal brackets or dietary restrictions.",
  },
  {
    id: 3,
    name: "Dr. Ananya Desai",
    role: "Microscopic Endodontist & Microsurgeon",
    degree: "BDS, MDS Conservative Dentistry",
    image: "/doctors/dr_ananya_desai.jpg",
    experience: "9+ Years Microsurgical Expertise",
    procedures: [
      "Painless Single-Visit Root Canals",
      "Zeiss Microscope-Guided Therapy",
      "Bioceramic Tooth Preservations",
      "Emergency Dental Trauma Care",
    ],
    description:
      "Performs high-magnification root canal treatments under surgical microscopes, saving severely damaged teeth painlessly in a single 45-minute session.",
  },
];

export default function DoctorsRotator({ onOpenBooking }: DoctorsRotatorProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll-driven 3D circular rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the section is in view, calculate scroll progress through the section
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalDistance));

        // Rotate 360 degrees across the scroll distance
        const angle = progress * 360;
        setRotationAngle(angle);

        // Calculate which doctor is closest to front (every 90 degrees)
        const idx = Math.round(angle / 90) % 4;
        setActiveIndex((idx + 4) % 4);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotateTo = (index: number) => {
    setActiveIndex(index);
    setRotationAngle(index * 90);
  };

  const activeDoc = DOCTORS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative z-30 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-32 text-white overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-[#dfbe76] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Clinicians • Vadodara</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white uppercase font-normal">
            Meet Our Specialist Doctors
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
            Scroll down to rotate through our master dentists in 3D circular motion. Each doctor brings international training and precision technology.
          </p>
        </div>

        {/* 3D Circular Carousel Stage */}
        <div className="relative min-h-[560px] flex items-center justify-center perspective-[1400px]">
          <div
            className="relative w-full max-w-[340px] sm:max-w-[380px] h-[520px] transition-transform duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${-rotationAngle}deg)`,
            }}
          >
            {DOCTORS.map((doc, idx) => {
              const baseAngle = idx * 90;
              const isFront = activeIndex === idx;

              return (
                <div
                  key={doc.id}
                  onClick={() => rotateTo(idx)}
                  className={`absolute inset-0 rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 bg-slate-950/90 shadow-2xl flex flex-col justify-end p-6 select-none ${
                    isFront
                      ? "border-amber-400/60 shadow-[0_0_40px_rgba(223,190,118,0.25)] ring-2 ring-[#dfbe76]/40"
                      : "border-white/10 opacity-40 hover:opacity-75"
                  }`}
                  style={{
                    transform: `rotateY(${baseAngle}deg) translateZ(360px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Doctor Portrait Image */}
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top filter brightness-[0.92] contrast-[1.05]"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />

                  {/* Gradient Backdrop over image bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  {/* Card Content Overlay */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {doc.role.split("&")[0]}
                    </span>

                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {doc.name}
                    </h3>

                    <p className="text-xs text-amber-200/90 font-mono">
                      {doc.degree}
                    </p>

                    <p className="text-[11px] text-slate-300 line-clamp-2 font-light">
                      {doc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Doctor Full Identity Card below the 3D Ring */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Quick Profile Snapshot */}
            <div className="md:col-span-5 space-y-3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-amber-500/10 text-[#dfbe76] border border-amber-500/20">
                <Award className="w-3.5 h-3.5" />
                <span>{activeDoc.experience}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeDoc.name}
              </h3>

              <p className="text-xs text-amber-300 font-mono font-medium">
                {activeDoc.role}
              </p>

              <p className="text-xs text-slate-400">
                {activeDoc.degree}
              </p>

              <p className="text-xs text-slate-300/90 leading-relaxed font-light pt-2">
                {activeDoc.description}
              </p>
            </div>

            {/* Specialization & Procedures list */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#dfbe76]" />
                <span>What {activeDoc.name} Does:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeDoc.procedures.map((proc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe76] shrink-0" />
                    <span>{proc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider text-[#1a1407] bg-gradient-to-r from-[#dfbe76] to-[#ecd08e] hover:from-[#ebd08e] hover:to-[#f5dfa6] transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation With {activeDoc.name.split(" ")[1]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Rotation Controls (Dots & Arrows) */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => rotateTo((activeIndex - 1 + 4) % 4)}
            className="w-11 h-11 rounded-full bg-black/60 border border-white/10 hover:border-[#dfbe76] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="Previous Doctor"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {DOCTORS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => rotateTo(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === i
                    ? "w-8 bg-[#dfbe76]"
                    : "w-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
                title={d.name}
              />
            ))}
          </div>

          <button
            onClick={() => rotateTo((activeIndex + 1) % 4)}
            className="w-11 h-11 rounded-full bg-black/60 border border-white/10 hover:border-[#dfbe76] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="Next Doctor"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
