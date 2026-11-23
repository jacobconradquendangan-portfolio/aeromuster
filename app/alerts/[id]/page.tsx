"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import {
  AlertTriangle,
  CheckIcon,
  ChevronRight,
  EvacuationGlyph,
  MapPinIcon,
  RouteIcon,
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

export default function AlertDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { alerts, acknowledgeAlert } = useApp();
  const alert = alerts.find((item) => item.id === id);

  if (!alert) {
    return (
      <main className="page-rise">
        <Header title="Alert" right="settings" />
        <div className="px-4 pt-6">
          <div className="card rounded-2xl p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#ff8b8b]" />
            <p className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-[#ffd9d9]">
              Alert not found
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#d8adad]">
              This alert may have expired or been replaced. Open the alert list for the current
              notices.
            </p>
            <Link
              href="/alerts"
              className="ribbon mt-4 inline-flex h-10 items-center rounded-xl px-4 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white"
            >
              All alerts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-rise">
      <Header title="Alert detail" subtitle={alert.source} right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <div className="card rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${severityStyle[alert.severity]}`}
            >
              {alert.severity} severity
            </span>
            <span className="rounded border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[#e6c0c0]">
              Official · simulated
            </span>
            {alert.test && (
              <span className="rounded border border-[#f0b429]/40 bg-[#f0b429]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[#ffd97a]">
                Test alert
              </span>
            )}
          </div>

          <h1 className="mt-2.5 font-display text-[22px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#ffe4e4]">
            {alert.headline}
          </h1>

          <dl className="mt-3 space-y-1.5 text-[11.5px]">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 uppercase tracking-[0.08em] text-[#c9a0a0]">Type</dt>
              <dd className="text-[#e6c0c0]">{alert.kindLabel}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 uppercase tracking-[0.08em] text-[#c9a0a0]">Issued</dt>
              <dd className="text-[#e6c0c0]">{alert.issuedAt}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 uppercase tracking-[0.08em] text-[#c9a0a0]">Area</dt>
              <dd className="text-[#e6c0c0]">{alert.area}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 uppercase tracking-[0.08em] text-[#c9a0a0]">Authority</dt>
              <dd className="text-[#e6c0c0]">{alert.source}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-xl bg-[#7d0a14] p-3.5 text-white">
            <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.1em]">
              <ShieldCheckIcon className="h-4 w-4" /> Instructions
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/90">{alert.instructions}</p>
          </div>

          <button
            type="button"
            onClick={() => acknowledgeAlert(alert.id)}
            disabled={alert.acknowledged}
            className={`mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[12px] font-semibold uppercase tracking-[0.08em] ${
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
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/evacuation" className="card rounded-2xl p-3.5 active:scale-[.99]">
            <span className="tile grid h-10 w-10 place-items-center rounded-xl">
              <EvacuationGlyph className="h-8 w-8" />
            </span>
            <span className="mt-2 block font-display text-base uppercase tracking-[0.06em] text-[#ffd9d9]">
              Evacuation
            </span>
            <span className="block text-[10.5px] text-[#d8adad]">Steps and assembly area</span>
          </Link>
          <Link href="/map" className="card rounded-2xl p-3.5 active:scale-[.99]">
            <span className="tile grid h-10 w-10 place-items-center rounded-xl text-[#a5121e]">
              <MapPinIcon className="h-5 w-5" />
            </span>
            <span className="mt-2 block font-display text-base uppercase tracking-[0.06em] text-[#ffd9d9]">
              Emergency map
            </span>
            <span className="block text-[10.5px] text-[#d8adad]">Exits for your level</span>
          </Link>
          <Link href="/navigate" className="card rounded-2xl p-3.5 active:scale-[.99]">
            <span className="tile grid h-10 w-10 place-items-center rounded-xl text-[#a5121e]">
              <RouteIcon className="h-5 w-5" />
            </span>
            <span className="mt-2 block font-display text-base uppercase tracking-[0.06em] text-[#ffd9d9]">
              Navigation
            </span>
            <span className="block text-[10.5px] text-[#d8adad]">Gates and facilities</span>
          </Link>
          <Link href="/recovery" className="card rounded-2xl p-3.5 active:scale-[.99]">
            <span className="tile grid h-10 w-10 place-items-center rounded-xl text-[#a5121e]">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <span className="mt-2 block font-display text-base uppercase tracking-[0.06em] text-[#ffd9d9]">
              Recovery plan
            </span>
            <span className="block text-[10.5px] text-[#d8adad]">After the incident</span>
            <ChevronRight className="mt-1 h-3 w-3 text-[#ffd9d9]" />
          </Link>
        </div>

        <p className="flex items-start gap-2 px-1 text-[10.5px] leading-relaxed text-[#b98b8b]">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Simulated alert for prototype evaluation. In a real incident always follow airport marshals
          and uniformed personnel over this app.
        </p>
      </div>
    </main>
  );
}
