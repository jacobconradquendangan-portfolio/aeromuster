"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import {
  AlertTriangle,
  CheckIcon,
  ChevronDown,
  ChevronRight,
  ClipboardIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { useApp } from "@/lib/app-context";
import {
  recoveryAftermath,
  recoveryPlans,
  type AftermathStatus,
  type RecoveryPlan,
} from "@/lib/data";

const phaseTone: Record<string, string> = {
  before: "border-[#63d8a1]/35 bg-[#43c288]/10 text-[#c9edd9]",
  during: "border-[#ff3b45]/45 bg-[#ff3b45]/12 text-[#ffd0d0]",
  after: "border-[#f0b429]/35 bg-[#f0b429]/10 text-[#ffd9a8]",
};

const statusTone: Record<AftermathStatus, string> = {
  Open: "border-[#63d8a1]/40 bg-[#43c288]/10 text-[#a9f0cc]",
  Partial: "border-[#f0b429]/40 bg-[#f0b429]/10 text-[#ffd9a8]",
  Closed: "border-[#ff3b45]/50 bg-[#ff3b45]/12 text-[#ffb3b3]",
  Info: "border-white/20 bg-white/[0.06] text-[#e6c0c0]",
};

export default function RecoveryPage() {
  const { openSos } = useApp();
  const [planId, setPlanId] = useState<RecoveryPlan["id"]>("earthquake");
  const [openPhase, setOpenPhase] = useState<string | null>("during");
  const [afterOpen, setAfterOpen] = useState(false);
  const plan = recoveryPlans.find((item) => item.id === planId) ?? recoveryPlans[0];
  const aftermath = recoveryAftermath[plan.id];

  return (
    <main className="page-rise">
      <Header title="Recovery plan" subtitle="After the incident" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {recoveryPlans.map((item) => {
            const active = item.id === planId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPlanId(item.id);
                  setOpenPhase("during");
                  setAfterOpen(false);
                }}
                aria-pressed={active}
                className={`flex-1 shrink-0 rounded-2xl border p-3 text-left transition ${
                  active
                    ? "border-[#ff5b63]/60 bg-[#ff3b45]/12"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span
                  className={`block font-display text-[15px] uppercase leading-tight tracking-[0.06em] ${
                    active ? "text-[#ffd9d9]" : "text-[#e0b8b8]"
                  }`}
                >
                  {item.title}
                </span>
                <span className="mt-1 block text-[10px] leading-snug text-[#c9a0a0]">
                  {item.summary}
                </span>
              </button>
            );
          })}
        </div>

        <div className="card rounded-2xl p-4">
          <p className="font-display text-[19px] uppercase tracking-[0.08em] text-[#ffe4e4]">
            {plan.title} recovery
          </p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#d8adad]">{plan.objective}</p>
        </div>

        <section className="rounded-2xl bg-[#7d0a14] p-4 text-white">
          <p className="flex items-center gap-2 font-display text-base uppercase tracking-[0.1em]">
            <AlertTriangle className="h-4 w-4" /> Right now
          </p>
          <ol className="mt-2 space-y-2.5">
            {plan.rightNow.map((step, index) => (
              <li key={step} className="flex gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20 font-display text-[11px] font-semibold">
                  {index + 1}
                </span>
                <span className="text-[12px] leading-relaxed text-white/90">{step}</span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => openSos(plan.id === "medical" ? "medical" : undefined)}
            className="mt-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#8d0b16] active:scale-[.99]"
          >
            <ShieldCheckIcon className="h-4 w-4" />
            {plan.id === "medical" ? "Request medical help" : "Open SOS request"}
          </button>
        </section>

        <div className="space-y-2">
          {plan.phases.map((phase) => {
            const isOpen = openPhase === phase.id;
            return (
              <div key={phase.id} className="card overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] ${phaseTone[phase.id]}`}
                  >
                    {phase.label.split(" — ")[0]}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-display text-[15px] uppercase tracking-[0.05em] text-[#ffd9d9]">
                    {phase.label.split(" — ")[1] ?? phase.label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#e6c0c0] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="animate-[rise_.2s_ease-out] space-y-3 border-t border-white/10 px-3.5 py-3">
                    {phase.items.map((item) => (
                      <li key={`${phase.id}-${item.area}`} className="border-l border-white/10 pl-3">
                        <p className="text-[12.5px] font-semibold text-[#ffe4e4]">{item.area}</p>
                        <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#d8adad]">
                          {item.action}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.06em] text-[#ff9c9c]">
                          {item.responsible}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <section className="card rounded-2xl p-4">
          <p className="flex items-center gap-2 font-display text-base uppercase tracking-[0.1em] text-[#ffd9d9]">
            <CheckIcon className="h-4 w-4" /> AEROMUSTER in this plan
          </p>
          <ul className="mt-2.5 space-y-2">
            {plan.integration.map((item) => (
              <li key={item} className="flex gap-2 text-[11.5px] leading-relaxed text-[#e6c0c0]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8b8b]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card overflow-hidden rounded-2xl">
          <button
            type="button"
            onClick={() => setAfterOpen(!afterOpen)}
            aria-expanded={afterOpen}
            className="flex w-full items-start gap-3 p-4 text-left"
          >
            <span className="tile mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#a5121e]">
              <CheckIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-base uppercase tracking-[0.08em] text-[#ffd9d9]">
                After the emergency
              </span>
              <span className="mt-1 block text-[11.5px] leading-relaxed text-[#c9a0a0]">
                {aftermath.summary}
              </span>
            </span>
            <ChevronDown
              className={`mt-1 h-4 w-4 shrink-0 text-[#e6c0c0] transition-transform ${
                afterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {afterOpen && (
            <div className="animate-[rise_.2s_ease-out] space-y-4 border-t border-white/10 px-4 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff9c9c]">
                  Service updates
                </p>
                <ul className="mt-2 space-y-2.5">
                  {aftermath.updates.map((update) => (
                    <li key={update.id} className="border-l border-white/10 pl-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-[0.08em] text-[#c9a0a0]">
                          {update.label}
                        </span>
                        <span
                          className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${statusTone[update.status]}`}
                        >
                          {update.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12.5px] font-semibold leading-snug text-[#ffe4e4]">
                        {update.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#d8adad]">
                        {update.body}
                      </p>
                      <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.06em] text-[#b98b8b]">
                        {update.updated}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff9c9c]">
                  Rebooking & travel
                </p>
                <ul className="mt-2 space-y-2">
                  {aftermath.rebooking.map((item) => (
                    <li key={item} className="flex gap-2 text-[11.5px] leading-relaxed text-[#e6c0c0]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8b8b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff9c9c]">
                  Where to get help or file a report
                </p>
                <ul className="mt-2 space-y-2">
                  {aftermath.help.map((help) => (
                    <li key={help.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="flex items-start gap-2 text-[12.5px] font-semibold text-[#ffe4e4]">
                        <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
                        {help.name}
                      </p>
                      <p className="mt-0.5 pl-6 text-[10px] uppercase tracking-[0.06em] text-[#c9a0a0]">
                        {help.place}
                      </p>
                      <p className="mt-1 pl-6 text-[11.5px] leading-relaxed text-[#d8adad]">
                        {help.detail}
                      </p>
                      {help.href ? (
                        <Link
                          href={help.href}
                          className="mt-2 ml-6 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#ffd0d0]"
                        >
                          {help.href === "/navigate" ? "Directions" : "Hotlines"}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      ) : help.sos ? (
                        <button
                          type="button"
                          onClick={() => openSos(help.sos)}
                          className="mt-2 ml-6 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#ffd0d0]"
                        >
                          Request help
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff9c9c]">
                  Responsible personnel
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {aftermath.responsible.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-2 py-0.5 text-[10px] text-[#e6c0c0]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[9.5px] leading-relaxed text-[#b98b8b]">
                Simulated updates for this prototype — confirm real status with airport staff or your
                airline.
              </p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="tel:5550199"
            className="card flex items-center gap-2.5 rounded-2xl p-3.5 active:scale-[.99]"
          >
            <span className="tile grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#a5121e]">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[13px] uppercase tracking-[0.04em] text-[#ffd9d9]">
                Call 555-0199
              </span>
              <span className="block text-[10px] text-[#d8adad]">Mock assistance line</span>
            </span>
          </a>
          <Link
            href="/services"
            className="card flex items-center gap-2.5 rounded-2xl p-3.5 active:scale-[.99]"
          >
            <span className="tile grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#a5121e]">
              <ClipboardIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 font-display text-[13px] uppercase tracking-[0.04em] text-[#ffd9d9]">
                Services <ChevronRight className="h-3 w-3" />
              </span>
              <span className="block text-[10px] text-[#d8adad]">All hotlines</span>
            </span>
          </Link>
        </div>

        <p className="px-1 pb-2 text-[10.5px] leading-relaxed text-[#b98b8b]">
          Adapted from the airport recovery plan (earthquake, bomb threat, serious injury). Keep your
          boarding pass, baggage tags and any incident reference for airline and insurance claims.
          This is prototype content, not an approved airport procedure.
        </p>
      </div>
    </main>
  );
}
