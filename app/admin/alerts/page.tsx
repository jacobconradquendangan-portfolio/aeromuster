"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import AlertConsole from "@/components/alert-console";
import { AlertTriangle, ClipboardIcon, ShieldCheckIcon } from "@/components/icons";
import { useApp } from "@/lib/app-context";
import { demoPasscode } from "@/lib/data";

export default function AdminAlertsPage() {
  const { role, setRole } = useApp();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (role !== "admin") {
    return (
      <main className="page-rise">
        <Header title="Administrator" subtitle="Alert Center" right="settings" />

        <div className="px-4 pt-6">
          <div className="flex flex-col items-center">
            <div className="tile grid h-[92px] w-[92px] place-items-center rounded-2xl shadow-[0_16px_30px_-16px_rgba(0,0,0,.9)]">
              <ShieldCheckIcon className="h-14 w-14 text-[#a5121e]" />
            </div>
            <h1 className="mt-3 font-display text-[24px] font-semibold uppercase tracking-[0.14em] text-[#ff6a6a]">
              Alert administrator
            </h1>
            <p className="mt-1 max-w-[300px] text-center text-[12px] leading-relaxed text-[#d8adad]">
              Only authorized airport personnel can publish alerts to passengers.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (code.trim().toUpperCase() !== demoPasscode) {
                setError("Wrong demo passcode. This is a prototype gate, not real authentication.");
                return;
              }
              setError(null);
              setRole("admin");
            }}
            className="card mt-5 space-y-3 rounded-2xl p-4"
          >
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
                Administrator passcode
              </span>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="AERO-DEMO"
                autoComplete="off"
                className="mt-1.5 h-11 w-full rounded-xl border border-white/12 bg-[#160307] px-3 text-[14px] tracking-[0.14em] text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
              />
            </label>

            <p className="flex items-start gap-2 rounded-xl border border-[#f0b429]/30 bg-[#f0b429]/10 p-2.5 text-[10.5px] leading-relaxed text-[#ffd9a8]">
              <ClipboardIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Demo passcode <span className="font-semibold">AERO-DEMO</span>. The gate exists to show
              the authorized-administrator role; it stores nothing and protects nothing.
            </p>

            {error && (
              <p className="flex items-start gap-2 rounded-xl border border-[#ff3b45]/40 bg-[#ff3b45]/10 p-2.5 text-[11.5px] leading-relaxed text-[#ffc0c0]">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              className="ribbon flex h-11 w-full items-center justify-center gap-2 rounded-xl font-display text-sm font-semibold uppercase tracking-[0.1em] text-white active:scale-[.99]"
            >
              <ShieldCheckIcon className="h-4 w-4" /> Unlock console
            </button>
          </form>

          <Link
            href="/alerts"
            className="mt-3 block text-center text-[11px] uppercase tracking-[0.12em] text-[#c9a0a0]"
          >
            Back to passenger alerts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-rise">
      <Header title="Alert Center" subtitle="Signed in as M. Santos · administrator" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#43c288]/30 bg-[#43c288]/10 px-3.5 py-2.5">
          <p className="text-[11px] leading-snug text-[#c9edd9]">
            <span className="font-semibold">Administrator role active.</span> Passenger screens see
            these alerts immediately.
          </p>
          <button
            type="button"
            onClick={() => setRole("passenger")}
            className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#e6c0c0]"
          >
            Exit role
          </button>
        </div>

        <AlertConsole />

        <Link
          href="/alerts"
          className="block pb-2 text-center text-[11px] uppercase tracking-[0.12em] text-[#c9a0a0]"
        >
          View as passenger
        </Link>
      </div>
    </main>
  );
}
