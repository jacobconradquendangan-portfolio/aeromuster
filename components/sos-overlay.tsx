"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckIcon, PhoneIcon, ShieldCheckIcon, XIcon } from "@/components/icons";

type Phase = "confirm" | "sending" | "sent";

export default function SosOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("confirm");

  useEffect(() => {
    if (open) setPhase("confirm");
  }, [open]);

  useEffect(() => {
    if (phase !== "sending") return;
    const timer = setTimeout(() => setPhase("sent"), 1700);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Emergency alert"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      <div className="absolute inset-0 bg-[#250004]/90 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-[420px] animate-[sheet-in_.32s_cubic-bezier(.2,.8,.2,1)] rounded-t-3xl border border-[#ff3b45]/35 bg-[linear-gradient(180deg,#4b0810,#25050a)] p-6 pb-[calc(env(safe-area-inset-bottom)+26px)] text-center shadow-[0_-24px_80px_rgba(0,0,0,.9)] sm:rounded-3xl sm:pb-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/5 text-[#ffc9c9]"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {phase === "confirm" && (
          <>
            <div className="relative mx-auto mt-2 grid h-24 w-24 place-items-center">
              <span className="absolute inset-0 animate-[sos-pulse_2s_ease-out_infinite] rounded-full bg-[#ff2a36]/35" />
              <span className="fab-glow relative grid h-20 w-20 place-items-center rounded-full">
                <AlertTriangle className="h-11 w-11 text-[#fff0ee]" />
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.14em] text-[#ffdcda]">
              Emergency alert
            </h2>
            <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-[#f0bfbf]">
              This sends your location and profile to CRK airport security and the ARFF station.
              Use it only for a real emergency.
            </p>

            <a
              href="tel:911"
              className="ribbon mt-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl font-display text-xl font-semibold uppercase tracking-[0.1em] text-white active:scale-[.99]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call 911 now
            </a>
            <button
              type="button"
              onClick={() => setPhase("sending")}
              className="mt-2.5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b6b]/50 bg-[#ff3b45]/10 font-display text-sm uppercase tracking-[0.12em] text-[#ffb3b3] active:scale-[.99]"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              Send SOS to CRK security
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2 text-xs uppercase tracking-[0.16em] text-[#cf9d9d]"
            >
              Cancel
            </button>
          </>
        )}

        {phase === "sending" && (
          <div className="py-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-[#ff5a5a]/60">
              <span className="h-8 w-8 animate-[spin_1s_linear_infinite] rounded-full border-2 border-[#ff7070] border-t-transparent" />
            </div>
            <h2 className="mt-5 font-display text-2xl uppercase tracking-[0.14em] text-[#ffdcdc]">
              Broadcasting alert
            </h2>
            <p className="mt-2 text-sm text-[#e6b3b3]">Sharing your terminal location…</p>
          </div>
        )}

        {phase === "sent" && (
          <div className="py-6">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#1f7a4d]/20 ring-1 ring-[#43c288]/60">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2aa06a] text-white">
                <CheckIcon className="h-8 w-8" />
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.14em] text-[#d9ffe9]">
              Alert received
            </h2>
            <p className="mx-auto mt-2 max-w-[290px] text-[13px] leading-relaxed text-[#e6c5c5]">
              CRK Security has your location. A marshal is being dispatched to the terminal. Stay
              where you are and keep your phone on.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left text-[11px] leading-relaxed text-[#d8adad]">
              <p className="font-semibold text-[#ffd9d9]">Reference AERO-2026-1148</p>
              Terminal 3 · Departures, Level 3 · reported 07:30
            </div>
            <a
              href="tel:911"
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b6b]/40 text-sm font-semibold text-[#ffb3b3]"
            >
              <PhoneIcon className="h-4 w-4" /> Call 911
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2 text-xs uppercase tracking-[0.16em] text-[#cf9d9d]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
