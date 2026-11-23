"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import {
  AlertTriangle,
  CheckIcon,
  ChevronDown,
  ChevronRight,
  MegaphoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { useApp } from "@/lib/app-context";
import type { AlertSeverity } from "@/lib/data";

const severityStyle: Record<AlertSeverity, string> = {
  critical: "border-[#ff3b45]/60 bg-[#ff3b45]/20 text-[#ffb3b3]",
  high: "border-[#ff8b5e]/50 bg-[#ff8b5e]/15 text-[#ffcb9e]",
  moderate: "border-[#f0b429]/50 bg-[#f0b429]/12 text-[#ffd97a]",
  info: "border-white/20 bg-white/[0.06] text-[#e6c0c0]",
};

export default function AlertsPage() {
  const { alerts, acknowledgeAlert } = useApp();
  const [expanded, setExpanded] = useState<string | null>(alerts[0]?.id ?? null);
  const openCount = alerts.filter((alert) => !alert.acknowledged).length;

  return (
    <main className="page-rise">
      <Header title="Alerts" subtitle="Official CRK notices" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <div className="card rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ff3b45]/15 text-[#ff7d7d]">
              <MegaphoneIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base uppercase tracking-[0.08em] text-[#ffd9d9]">
                {alerts.length} alerts · {openCount} awaiting acknowledgement
              </p>
              <p className="text-[11px] text-[#d8adad]">Sent by authorized airport personnel only</p>
            </div>
          </div>
          <p className="mt-2.5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-[10.5px] leading-relaxed text-[#c9a0a0]">
            <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Every alert here is a simulated prototype message. Nothing is pushed from a real airport
            system and no alert authorizes an evacuation on its own — follow marshals on the ground.
          </p>
        </div>

        {alerts.map((alert) => {
          const isOpen = expanded === alert.id;
          return (
            <div key={alert.id} className="card overflow-hidden rounded-2xl">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : alert.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 p-3.5 text-left"
              >
                <span className="tile mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#a5121e]">
                  <AlertTriangle className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] ${severityStyle[alert.severity]}`}
                    >
                      {alert.severity}
                    </span>
                    {alert.test && (
                      <span className="rounded border border-white/20 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.08em] text-[#e6c0c0]">
                        Test
                      </span>
                    )}
                    <span className="rounded border border-[#63d8a1]/35 bg-[#43c288]/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#8fe3bb]">
                      Official · simulated
                    </span>
                    {alert.acknowledged && (
                      <span className="flex items-center gap-1 text-[9.5px] uppercase tracking-[0.08em] text-[#63d8a1]">
                        <CheckIcon className="h-3 w-3" /> Ack
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[13px] font-semibold leading-snug text-[#ffe4e4]">
                    {alert.headline}
                  </span>
                  <span className="mt-1 block text-[10.5px] leading-relaxed text-[#c9a0a0]">
                    {alert.source} · {alert.issuedAt}
                  </span>
                  <span className="block text-[10.5px] text-[#c9a0a0]">Affected: {alert.area}</span>
                </span>
                <ChevronDown
                  className={`mt-1 h-4 w-4 shrink-0 text-[#e6c0c0] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="animate-[rise_.2s_ease-out] border-t border-white/10 px-3.5 py-3">
                  <p className="text-[12px] leading-relaxed text-[#e6c0c0]">{alert.instructions}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => acknowledgeAlert(alert.id)}
                      disabled={alert.acknowledged}
                      className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-[11.5px] font-semibold uppercase tracking-[0.08em] ${
                        alert.acknowledged
                          ? "border border-[#43c288]/40 bg-[#43c288]/10 text-[#8fe3bb]"
                          : "ribbon text-white active:scale-[.99]"
                      }`}
                    >
                      {alert.acknowledged ? (
                        <>
                          <CheckIcon className="h-4 w-4" /> Acknowledged
                        </>
                      ) : (
                        "Acknowledge alert"
                      )}
                    </button>
                    <Link
                      href={`/alerts/${alert.id}`}
                      className="flex h-10 items-center gap-1 rounded-xl border border-white/15 px-3 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#ffd9d9]"
                    >
                      Open <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <p className="mt-2 text-[10px] text-[#b98b8b]">
                    {alert.reached.toLocaleString()} devices reached · {alert.ackCount.toLocaleString()}{" "}
                    acknowledged (simulated)
                  </p>
                </div>
              )}
            </div>
          );
        })}

        <Link
          href="/admin/alerts"
          className="card flex items-center gap-3 rounded-2xl p-4 active:scale-[.99]"
        >
          <span className="tile grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#a5121e]">
            <ShieldCheckIcon className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-base uppercase tracking-[0.08em] text-[#ffd9d9]">
              Alert administrator
            </span>
            <span className="block text-[11px] text-[#d8adad]">
              Compose, test and publish simulated alerts
            </span>
          </span>
          <ChevronRight className="h-4 w-4 text-[#ffd9d9]" />
        </Link>
      </div>
    </main>
  );
}
