"use client";

import React from "react";
import { Award, ShieldCheck, HeartHandshake, Star, Users, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "18,000+", label: "Smiles Designed" },
    { value: "99.8%", label: "Clinical Success Rate" },
    { value: "4.9 / 5", label: "Patient Rating (850+ Reviews)" },
  ];

  const doctors = [
    {
      name: "Dr. Aryan Sharma",
      degree: "BDS, MDS - Prosthodontics & Oral Implantology",
      role: "Lead Aesthetic & Implant Specialist",
      experience: "15+ Years Clinical Practice • Fellow ICOI (USA)",
      bio: "Renowned expert in full-arch rehabilitation, digital smile architecture, and minimally invasive ceramic veneers.",
    },
    {
      name: "Dr. Priya Patel",
      degree: "BDS, Certified Invisible Aligner Specialist",
      role: "Cosmetic Dentist & Orthodontics",
      experience: "11+ Years Clinical Practice • Invisalign Diamond Provider",
      bio: "Specializing in harmonic smile balance, laser periodontal contouring, and comfortable adolescent & adult orthodontics.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>About WE DESIGN SMILES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Where Compassion Meets Clinical Perfection
            </h2>
            <p className="text-slate-300 leading-relaxed font-light text-base sm:text-lg">
              Founded on the belief that visiting the dentist should be an anxiety-free, therapeutic experience, <strong>WE DESIGN SMILES</strong> brings European dental protocols and state-of-the-art digital robotics to Vadodara.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              From our silent electric handpieces and whisper-quiet clinical suites to our calibrated 3D face scanners, every detail of our clinic has been sculpted to guarantee absolute comfort, painless procedures, and lifetime durability.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hospital-Grade Sterilization</h4>
                  <p className="text-xs text-slate-400 mt-1">Class-B Autoclaves & 7-Stage Biological Monitoring</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
                <HeartHandshake className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Pain Commitment</h4>
                  <p className="text-xs text-slate-400 mt-1">Computerized painless anesthesia & sedation options</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Meet Our Master Clinicians</span>
            </h3>

            {doctors.map((doc, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {doc.name}
                    </h4>
                    <span className="text-xs text-cyan-400 font-semibold block">
                      {doc.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-white/5 font-mono">
                    {doc.degree}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2 italic">
                  {doc.experience}
                </p>
                <p className="text-xs text-slate-300/90 leading-relaxed font-light">
                  {doc.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Numerical Credibility Strip */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-slate-900/40 border border-white/5">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
