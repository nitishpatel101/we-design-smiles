"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [today, setToday] = useState("");
  const [submitted, setSubmitted] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(data);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Close button */}
        <button
          onClick={() => {
            setSubmitted(null);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Consultation Booked!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
              Thank you, <span className="text-cyan-400">{submitted.fullName}</span>. Our team will contact you at <span className="text-cyan-400">{submitted.phone}</span> to confirm your appointment for <span className="text-white font-medium">{submitted.date}</span> at <span className="text-white font-medium">{submitted.time}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-1">
              Book Consultant
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              WE DESIGN SMILES • Priority Appointment Request
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>
                {errors.fullName && (
                  <span className="text-rose-400 text-[11px]">{errors.fullName.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Valid 10 digits" },
                      })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-rose-400 text-[11px]">{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="Email address"
                      {...register("email", { required: "Email is required" })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-rose-400 text-[11px]">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Service / Consultation
                </label>
                <select
                  {...register("service")}
                  defaultValue="Smile Transformation"
                  className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option value="Smile Transformation">Cosmetic Smile Transformation & Veneers</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Laser Whitening">Laser Teeth Whitening</option>
                  <option value="Invisalign">Invisalign & Clear Aligners</option>
                  <option value="General Consultation">Specialist Dental Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="date"
                      min={today}
                      defaultValue={today}
                      {...register("date")}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <select
                      {...register("time")}
                      defaultValue="10:00 AM - 12:00 PM"
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none"
                    >
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
