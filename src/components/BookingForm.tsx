"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const [today, setToday] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const t = new Date().toISOString().split("T")[0];
    const m = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    setToday(t);
    setMaxDate(m);
  }, []);

  const handleFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API call/EmailJS transmission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmittedData(data);
    if (onSubmit) onSubmit(data);
    reset();
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Appointment Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reserve Your Smile Consultation
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Take the first step toward the confident smile you deserve. Choose your convenient date and time with our specialist team.
          </p>
        </div>

        {submittedData ? (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Appointment Request Confirmed!
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
              Thank you, <strong className="text-cyan-300">{submittedData.fullName}</strong>. Our patient coordinator will contact you at <strong className="text-cyan-300">{submittedData.phone}</strong> or <strong className="text-cyan-300">{submittedData.email}</strong> shortly to confirm your slot for <span className="text-white font-medium">{submittedData.preferredDate}</span> at <span className="text-white font-medium">{submittedData.preferredTime}</span>.
            </p>

            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-400">Treatment:</span>
                <span className="text-white font-semibold">{submittedData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="text-white font-semibold">{submittedData.preferredDate} ({submittedData.preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clinic:</span>
                <span className="text-cyan-300 font-semibold">Vadodara Center of Dental Excellence</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedData(null)}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 uppercase tracking-wider"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: { value: 2, message: "Min 2 characters required" },
                      })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-rose-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Phone Number (10 Digits) <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit number",
                        },
                      })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-rose-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Preferred Service */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Treatment <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    {...register("service", { required: "Please select a service" })}
                    className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    defaultValue="Smile Transformation & Veneers"
                  >
                    <option value="Smile Transformation & Veneers">Cosmetic Smile Transformation & Veneers</option>
                    <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                    <option value="Dental Implants & All-on-4">Dental Implants & Full Mouth Restoration</option>
                    <option value="Invisalign & Clear Aligners">Invisalign & Clear Aligners</option>
                    <option value="Routine Preventive Care & Cleaning">Routine Cleaning & Comprehensive Checkup</option>
                    <option value="Microscopic Root Canal Therapy">Microscopic Root Canal Therapy</option>
                    <option value="Other Consultation">Specialist Dental Consultation</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Date <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      min={today}
                      max={maxDate}
                      defaultValue={today}
                      {...register("preferredDate", { required: "Date is required" })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-rose-400 text-xs mt-1">{errors.preferredDate.message}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Time Slot <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      {...register("preferredTime", { required: "Time slot is required" })}
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors"
                      defaultValue="10:00 AM - 11:30 AM"
                    >
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM (Popular)</option>
                      <option value="11:30 AM - 01:00 PM">11:30 AM - 01:00 PM</option>
                      <option value="02:30 PM - 04:00 PM">02:30 PM - 04:00 PM</option>
                      <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                      <option value="05:30 PM - 07:00 PM">05:30 PM - 07:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Additional Notes or Dental Concerns (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    maxLength={300}
                    placeholder="Tell us about any specific discomfort, previous treatments, or goals..."
                    {...register("message")}
                    className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Strict confidentiality • Zero consultation pressure • 100% painless care</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <span>Confirm Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
