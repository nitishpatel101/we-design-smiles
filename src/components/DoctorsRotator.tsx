"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, Award, Stethoscope, RotateCw } from "lucide-react";

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
    experience: "14+ Years Invisible Alignment",
    procedures: [
      "Invisalign Clear Aligner Therapy",
      "Lingual Invisible Braces",
      "Accelerated Orthodontic Alignment",
      "Teen & Adult Bite Correction",
    ],
    description:
      "Diamond-certified Invisalign specialist. Uses 3D iTero digital scans and computer-calculated micro-movements to straighten teeth discreetly without traditional brackets.",
  },
  {
    id: 3,
    name: "Dr. Ananya Desai",
    role: "Microscopic Endodontist & Microsurgeon",
    degree: "BDS, MDS Conservative Dentistry",
    image: "/doctors/dr_ananya_desai.jpg",
    experience: "11+ Years Precision Endodontics",
    procedures: [
      "Single-Visit Microscopic Root Canal",
      "Ultrasonic 3D Canal Disinfection",
      "Gentle Dental Trauma Surgery",
      "Pain-Free Nerve Preservation",
    ],
    description:
      "Performs single-visit, zero-pain root canals utilizing high-magnification surgical microscopes and rotary ultrasonic instrumentation to preserve natural teeth for life.",
  },
  {
    id: 4,
    name: "Dr. Kabir Singhania",
    role: "Senior Oral & Maxillofacial Surgeon",
    degree: "BDS, MDS Maxillofacial • FIBOMS",
    image: "/doctors/dr_kabir_singhania.jpg",
    experience: "16+ Years Surgical Mastery",
    procedures: [
      "Painless Wisdom Tooth Extraction",
      "TMJ Disorders & Jaw Correction",
      "Advanced Bone Grafting & Sinus Lift",
      "Zygomatic Complex Implants",
    ],
    description:
      "Senior maxillofacial surgeon specializing in painless wisdom tooth extraction, complex bone augmentation, and advanced jaw surgery with zero post-operative discomfort.",
  },
  {
    id: 5,
    name: "Dr. Meera Krishnan",
    role: "Pediatric Dental Specialist & Pedodontist",
    degree: "BDS, MDS Pedodontics • Member IAPD",
    image: "/doctors/dr_meera_krishnan.jpg",
    experience: "10+ Years Gentle Child Dentistry",
    procedures: [
      "Fear-Free Child Dental Care",
      "Preventive Sealants & Fluoride",
      "Early Interceptive Orthodontics",
      "Conscious Sedation & Laughing Gas",
    ],
    description:
      "Dedicated to gentle, fear-free dental visits for children and teenagers. Creates a magical clinic experience while ensuring ideal jaw development and cavity-free teeth.",
  },
  {
    id: 6,
    name: "Dr. Vikramaditya Rathore",
    role: "Chief Periodontist & Laser Surgeon",
    degree: "BDS, MDS Periodontology • Dipl. Laser Surgery",
    image: "/doctors/dr_vikram_rathore.jpg",
    experience: "15+ Years Periodontal Health",
    procedures: [
      "Laser Gum Contouring & Esthetics",
      "Regenerative Periodontal Therapy",
      "Gummy Smile Laser Correction",
      "Peri-Implantitis Advanced Care",
    ],
    description:
      "Expert in laser gum sculpting and reversing periodontal disease without scalpels or stitches. Restores optimal pink gum aesthetics to frame radiant smile makeovers.",
  },
  {
    id: 7,
    name: "Dr. Sunaina Kashyap",
    role: "Cosmetic Restorative Dentist & Sedation Specialist",
    degree: "BDS, Fellowship Aesthetic Dentistry (Germany)",
    image: "/doctors/dr_sunaina_kashyap.jpg",
    experience: "12+ Years Restorative Artistry",
    procedures: [
      "Biomimetic Composite Veneers",
      "Full Mouth Tooth Wear Rebuilding",
      "Sleep Dentistry & Conscious Sedation",
      "Porcelain Inlays & Onlays",
    ],
    description:
      "Master of restorative dental artistry and gentle twilight sedation, rebuilding worn and damaged smiles to pristine biological strength with zero patient anxiety.",
  },
];

export default function DoctorsRotator({ onOpenBooking }: DoctorsRotatorProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);

  const numDoctors = DOCTORS.length;
  const angleStep = 360 / numDoctors; // 45 degrees per doctor for 8 doctors
  const cylinderRadius = 380; // 380px radius for balanced 3D spacing

  // Silky Smooth RAF Lerp Loop for 3D Carousel Rotation
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const target = targetAngleRef.current;
      const current = currentAngleRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        currentAngleRef.current = current + diff * 0.14;
        setRotationAngle(currentAngleRef.current);

        // Normalize angle to find which doctor is front-facing
        const positiveAngle = ((currentAngleRef.current % 360) + 360) % 360;
        const rawIndex = Math.round(positiveAngle / angleStep) % numDoctors;
        setActiveIndex(rawIndex);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [angleStep, numDoctors]);

  // Handle Scroll Progress through the Pinned Track
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = trackHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Perform a full 360-degree round rotation across the pinned track
      targetAngleRef.current = progress * 360;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Direct manual rotation when clicking arrows, dots, or cards
  const rotateTo = (index: number) => {
    setActiveIndex(index);
    targetAngleRef.current = index * angleStep;
  };

  const activeDoc = DOCTORS[activeIndex];

  return (
    <div
      ref={trackRef}
      className="relative w-full h-[380vh] bg-gradient-to-b from-[#b09e85] via-[#ede7dc] to-[#f4efe6]"
    >
      {/* Sticky Fullscreen Pinned Viewport with top padding to clear fixed header */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 px-4 sm:px-8 overflow-hidden select-none z-30">
        {/* Warm Ambient clinic cove glow matching video palette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#dfbe76]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/70 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header: Positioned clearly above the 3D stage with zero overlap */}
        <div className="text-center max-w-2xl mx-auto shrink-0 relative z-40 mb-1 sm:mb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest bg-[#dfbe76]/25 border border-[#b88f30]/40 text-[#8c6b22] mb-1.5 shadow-sm">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Interactive 360° Showcase • 8 Specialist Doctors</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight text-[#1c1916] uppercase font-normal drop-shadow-sm">
            Meet Our Specialist Doctors
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-[#574c3e] font-light">
            Scroll down to rotate through each specialist in 360° circular motion. Click any doctor to view full details.
          </p>
        </div>

        {/* Center Stage: Calibrated 3D Cylindrical Carousel */}
        <div className="relative h-[280px] sm:h-[300px] flex items-center justify-center perspective-[1400px] z-20 my-auto">
          {/* Cylinder Pivot Container: translateZ(-R) keeps front card at Z=0 (no explosive zoom towards camera) */}
          <div
            className="relative w-[210px] sm:w-[230px] h-[260px] sm:h-[280px] transition-transform ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${cylinderRadius}px) rotateY(${-rotationAngle}deg)`,
            }}
          >
            {DOCTORS.map((doc, idx) => {
              const baseAngle = idx * angleStep;
              const isFront = activeIndex === idx;

              return (
                <div
                  key={doc.id}
                  onClick={() => rotateTo(idx)}
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 bg-white shadow-xl flex flex-col justify-end p-3.5 sm:p-4 select-none ${
                    isFront
                      ? "border-2 border-[#b88f30] shadow-[0_20px_50px_-10px_rgba(184,143,48,0.45)] ring-4 ring-[#dfbe76]/50 opacity-100 z-30"
                      : "border border-[#ded5c6] opacity-30 hover:opacity-65 shadow-md"
                  }`}
                  style={{
                    transform: `rotateY(${baseAngle}deg) translateZ(${cylinderRadius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Doctor Portrait Image */}
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                    sizes="230px"
                    priority={idx === 0}
                  />

                  {/* Clean bottom gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1916] via-[#1c1916]/70 to-transparent" />

                  {/* Minimalist Card Overlay for clean, unobstructed portrait */}
                  <div className="relative z-10 space-y-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono uppercase tracking-wider bg-[#dfbe76]/35 text-[#ecd08e] border border-[#dfbe76]/45 font-bold">
                      {doc.role.split("&")[0]}
                    </span>

                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                      {doc.name}
                    </h3>

                    <p className="text-[10px] sm:text-[11px] text-[#dfbe76] font-mono leading-tight">
                      {doc.degree}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Panel: Clean Active Doctor Full Profile & Controls */}
        <div className="relative z-30 max-w-4xl w-full mx-auto shrink-0 mt-1 sm:mt-2">
          <div className="rounded-2xl sm:rounded-3xl bg-white/95 border border-[#ded5c6] p-4 sm:p-5 shadow-xl shadow-[#87755b]/12 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5 items-center">
              {/* Profile Snapshot with generous spacing */}
              <div className="md:col-span-5 space-y-1.5 border-b md:border-b-0 md:border-r border-[#ded5c6] pb-2.5 md:pb-0 md:pr-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#dfbe76]/20 text-[#8c6b22] border border-[#b88f30]/35 font-bold">
                    <Award className="w-3 h-3 text-[#b88f30]" />
                    <span>{activeDoc.experience}</span>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#8c6b22] bg-[#f4efe6] px-2 py-0.5 rounded-md border border-[#ded5c6]">
                    0{activeIndex + 1} / 0{numDoctors}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#1c1916] tracking-tight">
                  {activeDoc.name}
                </h3>

                <p className="text-xs text-[#8c6b22] font-mono font-medium">
                  {activeDoc.role}
                </p>

                <p className="text-[10px] sm:text-[11px] text-[#706352] font-mono">
                  {activeDoc.degree}
                </p>

                <p className="text-[11px] text-[#574c3e] leading-relaxed pt-0.5 line-clamp-2">
                  {activeDoc.description}
                </p>
              </div>

              {/* Procedures & Action */}
              <div className="md:col-span-7 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {activeDoc.procedures.map((proc, i) => (
                    <div
                      key={i}
                      className="p-1.5 sm:p-2 rounded-xl bg-[#f7f3eb] border border-[#e3dacd] text-[10px] sm:text-[11px] text-[#1c1916] flex items-center gap-1.5 hover:border-[#b88f30] hover:bg-white transition-all shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b88f30] shrink-0" />
                      <span className="truncate">{proc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                  <button
                    onClick={onOpenBooking}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#b88f30] via-[#cfa94c] to-[#b88f30] hover:brightness-105 transition-all shadow-md shadow-[#b88f30]/25 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation with {activeDoc.name.split(" ")[1]}</span>
                  </button>

                  {/* Manual Arrow & Dots Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => rotateTo((activeIndex - 1 + numDoctors) % numDoctors)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#ded5c6] hover:border-[#b88f30] text-[#1c1916] hover:text-[#b88f30] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                      title="Previous Doctor"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex items-center gap-1 px-1">
                      {DOCTORS.map((d, i) => (
                        <button
                          key={d.id}
                          onClick={() => rotateTo(i)}
                          className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                            activeIndex === i
                              ? "w-5 sm:w-6 bg-[#b88f30]"
                              : "w-1.5 sm:w-2 bg-[#d4c8b6] hover:bg-[#a89b88]"
                          }`}
                          title={d.name}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => rotateTo((activeIndex + 1) % numDoctors)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#ded5c6] hover:border-[#b88f30] text-[#1c1916] hover:text-[#b88f30] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                      title="Next Doctor"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Rotation Progress Bar */}
          <div className="mt-2 flex items-center justify-center gap-2.5 text-[9px] sm:text-[10px] font-mono text-[#786b59]">
            <span>360° ROUND ROTATION</span>
            <div className="w-32 sm:w-40 h-1 bg-[#dfd6c7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#b88f30] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span>{Math.round(scrollProgress * 100)}% COMPLETE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
