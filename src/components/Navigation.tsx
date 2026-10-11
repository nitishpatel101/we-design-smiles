"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Calendar, Phone, Award } from "lucide-react";

interface NavigationProps {
  sections?: string[];
}

export default function Navigation({
  sections = ["home", "walkthrough", "transformations", "facility", "services", "about", "location", "booking"],
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Walkthrough", href: "#walkthrough", id: "walkthrough" },
    { label: "Transformations", href: "#transformations", id: "transformations" },
    { label: "Facility", href: "#facility", id: "facility" },
    { label: "Services", href: "#services", id: "services" },
    { label: "About Us", href: "#about", id: "about" },
    { label: "Location", href: "#location", id: "location" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3"
          : "bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="block text-base sm:text-lg font-black tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors">
              WE DESIGN <span className="text-cyan-400">SMILES</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-medium text-slate-400">
              Advanced Aesthetic Dentistry
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header CTA Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+91 98765 43210</span>
          </a>

          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, "#booking")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-base font-medium transition-colors py-1 ${
                  activeSection === link.id
                    ? "text-cyan-400 font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="#booking"
                onClick={(e) => handleLinkClick(e, "#booking")}
                className="w-full text-center py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 uppercase tracking-wider shadow-lg"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
