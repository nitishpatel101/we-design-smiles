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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fcfaf7] border border-[#ded5c6] rounded-3xl p-5 sm:p-8 shadow-2xl text-[#1c1916] max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => {
            setSubmitted(null);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-[#786b59] hover:text-[#1c1916] rounded-full bg-[#ebe4d8] hover:bg-[#ded5c6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#dfbe76]/20 text-[#8c6b22] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#b88f30]/35">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">Consultation Booked!</h3>
            <p className="text-sm text-[#5c5243] max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold text-[#1c1916]">{submitted.fullName}</span>. Our team will contact you at <span className="font-semibold text-[#8c6b22]">{submitted.phone}</span> to confirm your appointment for <span className="font-semibold text-[#1c1916]">{submitted.date}</span> at <span className="font-semibold text-[#1c1916]">{submitted.time}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#b88f30] to-[#cfa94c] text-white hover:brightness-105 uppercase tracking-wider shadow-md shadow-[#b88f30]/25"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-serif font-bold tracking-tight mb-1 uppercase text-[#1c1916]">
              Book VIP Consultation
            </h3>
            <p className="text-xs text-[#786b59] mb-6 font-mono">
              WE DESIGN SMILES • Priority Appointment Request
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8c7b65] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#1c1916] outline-none"
                  />
                </div>
                {errors.fullName && (
                  <span className="text-rose-500 text-[11px]">{errors.fullName.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8c7b65] absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Valid 10 digits" },
                      })}
                      className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#1c1916] outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-rose-500 text-[11px]">{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8c7b65] absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="Email address"
                      {...register("email", { required: "Email is required" })}
                      className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#1c1916] outline-none"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-rose-500 text-[11px]">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                  Service / Consultation
                </label>
                <select
                  {...register("service")}
                  defaultValue="Smile Transformation"
                  className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl px-3 py-2.5 text-sm text-[#1c1916] outline-none"
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
                  <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8c7b65] absolute left-3 top-3" />
                    <input
                      type="date"
                      min={today}
                      defaultValue={today}
                      {...register("date")}
                      className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#1c1916] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono font-semibold text-[#5c5243] mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8c7b65] absolute left-3 top-3" />
                    <select
                      {...register("time")}
                      defaultValue="10:00 AM - 12:00 PM"
                      className="w-full bg-[#f4efe6] border border-[#ded5c6] focus:border-[#b88f30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#1c1916] outline-none"
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
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#b88f30] via-[#cfa94c] to-[#b88f30] hover:brightness-105 transition-all shadow-lg shadow-[#b88f30]/25 cursor-pointer"
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
