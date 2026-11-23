"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckIcon,
  ChevronRight,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  XIcon,
} from "@/components/icons";
import { useApp } from "@/lib/app-context";
import {
  emergencyContactName,
  sosCategories,
  sosDefaultLocation,
  sosStatusLabels,
  type SosRequest,
  type SosStatus,
} from "@/lib/data";

type Step = "category" | "details" | "review" | "result";

const timeline: SosStatus[] = ["received", "acknowledged", "assigned"];

export default function SosOverlay() {
  const {
    sosOpen,
    sosCategoryId,
    closeSos,
    createSosRequest,
    sosRequests,
  } = useApp();

  const [step, setStep] = useState<Step>("category");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(sosDefaultLocation);
  const [notifyContact, setNotifyContact] = useState(true);
  const [created, setCreated] = useState<SosRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sosOpen) return;
    setError(null);
    setCreated(null);
    if (sosCategoryId) {
      setCategoryId(sosCategoryId);
      setStep("details");
    } else {
      setCategoryId(null);
      setStep("category");
    }
    setDescription("");
    setLocation(sosDefaultLocation);
    setNotifyContact(true);
  }, [sosOpen, sosCategoryId]);

  useEffect(() => {
    if (!sosOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSos();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sosOpen, closeSos]);

  if (!sosOpen) return null;

  const category = sosCategories.find((item) => item.id === categoryId) ?? null;
  const live = created
    ? sosRequests.find((request) => request.id === created.id) ?? created
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Emergency assistance request"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      <div className="absolute inset-0 bg-[#250004]/90 backdrop-blur-sm" onClick={closeSos} aria-hidden />
      <div className="relative flex max-h-[94dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-t-3xl border border-[#ff3b45]/35 bg-[linear-gradient(180deg,#4b0810,#25050a)] text-center shadow-[0_-24px_80px_rgba(0,0,0,.9)] sm:rounded-3xl">
        <button
          type="button"
          onClick={closeSos}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/5 text-[#ffc9c9]"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+22px)] pt-6 text-left">
          {step !== "result" && (
            <>
              <div className="grid h-16 w-16 place-items-center rounded-full border border-[#ff3b45]/40 bg-[#ff3b45]/12">
                <AlertTriangle className="h-8 w-8 text-[#ff8b8b]" />
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.12em] text-[#ffdcda]">
                {step === "category" && "What is happening?"}
                {step === "details" && "Tell us what you need"}
                {step === "review" && "Review your request"}
              </h2>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[#e0b3b3]">
                {step === "category" && "Choose a category — each one routes to a different airport desk."}
                {step === "details" && "Your description and location go into the request reference."}
                {step === "review" && "This demo simulates submission. Nothing is transmitted."}
              </p>
            </>
          )}

          {step === "category" && (
            <div className="mt-4 space-y-2">
              {sosCategories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategoryId(item.id);
                    setStep("details");
                    setError(null);
                  }}
                  className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left active:scale-[.99]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#ff3b45]/15 text-[#ff9c9c]">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-[#ffe4e4]">{item.label}</span>
                    <span className="block text-[10.5px] text-[#d8adad]">{item.desk}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-[0.06em] text-[#ff9c9c]">
                      Routes to {item.routedTo}
                    </span>
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[#e6c0c0]" />
                </button>
              ))}
            </div>
          )}

          {step === "details" && category && (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-[12.5px] font-semibold text-[#ffe4e4]">{category.label}</p>
                <p className="text-[10.5px] text-[#d8adad]">{category.note}</p>
                <button
                  type="button"
                  onClick={() => setStep("category")}
                  className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#ff9c9c]"
                >
                  Change category
                </button>
              </div>

              <label className="block">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#d8adad]">
                  What do you need? *
                </span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  maxLength={220}
                  placeholder="e.g. Passenger collapsed near Gate 7, not responding."
                  className="mt-1 h-[86px] w-full resize-none rounded-xl border border-white/12 bg-[#160307] px-3 py-2.5 text-[13px] leading-relaxed text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
                />
                <span className="mt-0.5 block text-right text-[10px] text-[#b98b8b]">
                  {description.length}/220
                </span>
              </label>

              <label className="block">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#d8adad]">
                  Location
                </span>
                <span className="relative mt-1 flex items-center">
                  <MapPinIcon className="pointer-events-none absolute left-3 h-4 w-4 text-[#ff9c9c]" />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="h-11 w-full rounded-xl border border-white/12 bg-[#160307] pl-9 pr-3 text-[12.5px] text-[#ffe6e6] focus:border-[#ff6b6b]/60 focus:outline-none"
                  />
                </span>
                <span className="mt-1 flex items-center gap-2 text-[10px] text-[#b98b8b]">
                  Prefilled from your simulated position — no GPS is used.
                  <button
                    type="button"
                    onClick={() => setLocation(sosDefaultLocation)}
                    className="underline"
                  >
                    Reset
                  </button>
                </span>
              </label>

              <button
                type="button"
                role="switch"
                aria-checked={notifyContact}
                onClick={() => setNotifyContact((current) => !current)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-semibold text-[#ffe4e4]">
                    Notify my emergency contact
                  </span>
                  <span className="block text-[10.5px] leading-snug text-[#d3a8a8]">
                    {emergencyContactName} is the designated assistance recipient for this request.
                  </span>
                </span>
                <span
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    notifyContact ? "bg-[#e01d2a]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      notifyContact ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>

              {error && (
                <p className="flex items-start gap-2 rounded-xl border border-[#ff3b45]/40 bg-[#ff3b45]/10 p-2.5 text-[11px] leading-relaxed text-[#ffc0c0]">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  if (description.trim().length < 8) {
                    setError("Add a short description (at least 8 characters) so the desk knows what to bring.");
                    return;
                  }
                  setError(null);
                  setStep("review");
                }}
                className="ribbon flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-display text-base font-semibold uppercase tracking-[0.1em] text-white active:scale-[.99]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "review" && category && (
            <div className="mt-4 space-y-3">
              <dl className="space-y-2 text-[12px]">
                {[
                  ["Category", category.label],
                  ["Routed to", category.routedTo],
                  ["Description", description],
                  ["Location", location],
                  ["Emergency contact", notifyContact ? emergencyContactName : "Not notified"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <dt className="text-[10px] uppercase tracking-[0.08em] text-[#c9a0a0]">{label}</dt>
                    <dd className="mt-0.5 text-[12.5px] text-[#ffe4e4]">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="flex items-start gap-2 rounded-xl border border-[#43c288]/25 bg-[#43c288]/10 p-3 text-[10.5px] leading-relaxed text-[#c9edd9]">
                <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Consent: this information is shared with {category.routedTo} for this request only.
                Location is simulated, and nothing leaves this device in the prototype.
              </p>

              <button
                type="button"
                onClick={() => {
                  const request = createSosRequest({
                    categoryId: category.id,
                    description,
                    location,
                    notifyContact,
                  });
                  setCreated(request);
                  setStep("result");
                }}
                className="ribbon flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-display text-base font-semibold uppercase tracking-[0.1em] text-white active:scale-[.99]"
              >
                <ShieldCheckIcon className="h-4 w-4" /> Send request (simulated)
              </button>

              <button
                type="button"
                onClick={() => setStep("details")}
                className="w-full py-1 text-[11px] uppercase tracking-[0.12em] text-[#cf9d9d]"
              >
                Back to details
              </button>
            </div>
          )}

          {step === "result" && live && (
            <div className="text-center">
              <div className="mx-auto mt-1 grid h-20 w-20 place-items-center rounded-full bg-[#1f7a4d]/20 ring-1 ring-[#43c288]/60">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2aa06a] text-white">
                  <CheckIcon className="h-8 w-8" />
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-[#d9ffe9]">
                Request received
              </h2>
              <p className="mx-auto mt-1.5 max-w-[300px] text-[12px] leading-relaxed text-[#e6c5c5]">
                {live.routedTo} has the request for {live.categoryLabel.toLowerCase()}. A marshal is
                being dispatched to your location in this simulation.
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left">
                <p className="flex items-center justify-between gap-2 text-[11.5px] text-[#ffe4e4]">
                  <span className="font-semibold">Reference {live.ref}</span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9.5px] uppercase tracking-[0.06em] text-[#c9a0a0]">
                    {sosStatusLabels[live.status]}
                  </span>
                </p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-[#d8adad]">
                  {live.categoryLabel} · {live.location} · {live.createdAt}
                </p>
                <p className="mt-1 line-clamp-2 text-[10.5px] italic leading-relaxed text-[#c9a0a0]">
                  “{live.description}”
                </p>
              </div>

              <ol className="mt-3 space-y-2 text-left">
                {timeline.map((status) => {
                  const index = timeline.indexOf(status);
                  const current = timeline.indexOf(
                    live.status === "cancelled" ? "received" : live.status,
                  );
                  const done = index <= current;
                  return (
                    <li key={status} className="flex items-center gap-2.5">
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                          done ? "bg-[#2aa06a] text-white" : "border border-white/20 text-[#b98b8b]"
                        }`}
                      >
                        {done ? <CheckIcon className="h-3 w-3" /> : index + 1}
                      </span>
                      <span
                        className={`text-[11.5px] ${done ? "text-[#d9ffe9]" : "text-[#b98b8b]"}`}
                      >
                        {sosStatusLabels[status]}
                        {status === "received" && " · " + live.createdAt}
                        {status !== "received" && !done && " · simulated next"}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {live.status === "cancelled" && (
                <p className="mt-2 text-[10.5px] uppercase tracking-[0.1em] text-[#ff9c9c]">
                  Request cancelled
                </p>
              )}

              <a
                href="tel:5550199"
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b6b]/40 text-[12px] font-semibold text-[#ffb3b3]"
              >
                <PhoneIcon className="h-4 w-4" /> Call 555-0199 (mock line)
              </a>

              <Link
                href="/profile"
                onClick={closeSos}
                className="mt-2 flex h-10 w-full items-center justify-center rounded-xl text-[11px] uppercase tracking-[0.12em] text-[#cf9d9d]"
              >
                My assistance requests
              </Link>

              <button
                type="button"
                onClick={closeSos}
                className="mt-1 w-full py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#e6c0c0]"
              >
                Close
              </button>
            </div>
          )}

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[9.5px] uppercase tracking-[0.12em] text-[#b98b8b]">
            <AlertTriangle className="h-3 w-3" /> Demo build · request is simulated
          </p>
        </div>
      </div>
    </div>
  );
}
