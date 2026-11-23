"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Sheet from "@/components/sheet";
import {
  AlertTriangle,
  BellIcon,
  CameraIcon,
  CheckIcon,
  ChevronRight,
  ClipboardIcon,
  LogoutIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { useApp } from "@/lib/app-context";
import { sosStatusLabels, type SosStatus } from "@/lib/data";

const statusTone: Record<SosStatus, string> = {
  received: "border-[#ffb347]/40 bg-[#ffb347]/10 text-[#ffd97a]",
  acknowledged: "border-[#63d8a1]/35 bg-[#43c288]/10 text-[#8fe3bb]",
  assigned: "border-[#63d8a1]/50 bg-[#43c288]/18 text-[#a9f0cc]",
  cancelled: "border-white/15 bg-white/[0.04] text-[#b98b8b]",
};

const personal = [
  { label: "Address", value: "Block 1, Lot 2, JD Street, Pasay City, Philippines" },
  { label: "Email", value: "janedoe2000@gmail.com" },
  { label: "Contact Number", value: "0999 121 2233" },
];

const contact = [
  { label: "Contact Person", value: "John Doe" },
  { label: "Relationship", value: "Brother" },
  { label: "Contact Number", value: "0999 121 2233" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { sosRequests, cancelSosRequest } = useApp();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  return (
    <main className="page-rise">
      <Header align="center" right="settings" />

      <div className="space-y-3 px-4 pt-5">
        <div className="card relative overflow-hidden rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src="/img/avatar.jpg"
                alt="Jane Doe"
                className="h-[92px] w-[92px] rounded-full border-2 border-[#ffb3b3]/40 object-cover shadow-[0_0_22px_rgba(255,60,60,.25)]"
              />
              <span className="ribbon absolute -bottom-1 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-[#2a0509] text-white">
                <CameraIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate font-display text-[26px] font-semibold uppercase leading-none tracking-[0.02em] text-[#ffe4e4]">
                  Jane Doe, 24
                </h1>
                <span
                  aria-label="Verified passenger"
                  className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#1d9bf0] text-white"
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
              </div>
              <div className="relative mt-2.5 h-2 w-full max-w-[150px] overflow-hidden rounded-full bg-[#5a3a12]">
                <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#f0b429,#ffd97a)]" />
              </div>
              <p className="mt-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-[#e9c9a0]">
                Profile 82% complete
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
            <span className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.1em] text-[#d8adad]">
              <ShieldCheckIcon className="h-3.5 w-3.5" /> Verified via eGovPH
            </span>
            <span className="font-display text-[15px] uppercase tracking-[0.16em] text-[#ffe4e4]">
              Profile
            </span>
          </div>
        </div>

        <div className="ribbon rounded-full py-1.5 text-center">
          <h2 className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-white">
            Personal information
          </h2>
        </div>
        <div className="card space-y-2 rounded-2xl p-4">
          {personal.map((row) => (
            <div key={row.label} className="flex gap-2 text-[12.5px] leading-relaxed">
              <span className="shrink-0 font-semibold text-[#ffe4e4]">{row.label}:</span>
              <span className="min-w-0 text-[#e6c0c0]">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="ribbon rounded-full py-1.5 text-center">
          <h2 className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-white">
            Emergency contact
          </h2>
        </div>
        <div className="card space-y-2 rounded-2xl p-4">
          {contact.map((row) => (
            <div key={row.label} className="flex gap-2 text-[12.5px] leading-relaxed">
              <span className="shrink-0 font-semibold text-[#ffe4e4]">{row.label}:</span>
              <span className="min-w-0 flex-1 text-[#e6c0c0]">{row.value}</span>
              {row.label === "Contact Number" && (
                <a
                  href="tel:09991212233"
                  aria-label="Call emergency contact"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#3f0b12] text-[#ff8b8b]"
                >
                  <PhoneIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="ribbon rounded-full py-1.5 text-center">
          <h2 className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-white">
            My assistance requests
          </h2>
        </div>
        {sosRequests.length === 0 ? (
          <div className="card rounded-2xl p-4">
            <p className="text-[12px] leading-relaxed text-[#d8adad]">
              No SOS requests yet. Use the red button on any screen to report an incident; the request
              reference and its status appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sosRequests.map((request) => (
              <div key={request.id} className="card rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display text-[15px] uppercase tracking-[0.04em] text-[#ffe4e4]">
                      {request.categoryLabel}
                    </p>
                    <p className="text-[10.5px] text-[#c9a0a0]">
                      Ref {request.ref} · {request.createdAt}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.06em] ${statusTone[request.status]}`}
                  >
                    {sosStatusLabels[request.status]}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-[#d8adad]">
                  “{request.description}”
                </p>
                <p className="mt-1 text-[10.5px] text-[#b98b8b]">
                  {request.routedTo} · {request.location}
                  {request.notifyContact ? " · contact notified" : ""}
                </p>
                {request.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={() => cancelSosRequest(request.id)}
                    className="mt-2 rounded-lg border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#e6c0c0]"
                  >
                    Cancel request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <p className="flex items-start gap-2 px-1 text-[10.5px] leading-relaxed text-[#b98b8b]">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Requests and status changes are simulated in this prototype. Nothing is transmitted to an
          airport desk.
        </p>

        <div className="card overflow-hidden rounded-2xl">
          <Link
            href="/alerts"
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 active:bg-white/[0.03]"
          >
            <span className="flex items-center gap-2 font-display text-[17px] uppercase tracking-[0.08em] text-[#ffe4e4]">
              <BellIcon className="h-5 w-5 text-[#ff9c9c]" /> Alerts
            </span>
            <ChevronRight className="h-4 w-4 text-[#ffc9c9]" />
          </Link>
          <Link
            href="/admin/alerts"
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 active:bg-white/[0.03]"
          >
            <span className="flex items-center gap-2 font-display text-[17px] uppercase tracking-[0.08em] text-[#ffe4e4]">
              <ClipboardIcon className="h-5 w-5 text-[#ff9c9c]" /> Administrator console
            </span>
            <ChevronRight className="h-4 w-4 text-[#ffc9c9]" />
          </Link>
          <a
            href="https://e.gov.ph"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 active:bg-white/[0.03]"
          >
            <span className="font-display text-[17px] uppercase tracking-[0.08em] text-[#ffe4e4]">
              eGovPH
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              <span className="text-[#2f6fd0]">e</span>
              <span className="text-[#d9a400]">Gov</span>
              <span className="text-[#c8102e]">PH</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-white/[0.03]"
          >
            <span className="font-display text-[17px] uppercase tracking-[0.08em] text-[#ffe4e4]">
              Logout
            </span>
            <LogoutIcon className="h-5 w-5 text-[#ffc9c9]" />
          </button>
        </div>

        <p className="px-1 text-[10.5px] leading-relaxed text-[#b98b8b]">
          Your emergency profile is shared with CRK security only when you send an SOS request. Data
          stays in this browser session under RA 10173 — reset it from Settings.
        </p>
      </div>

      <Sheet open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Log out?" subtitle="AEROMUSTER">
        <p className="text-[13px] leading-relaxed text-[#e0b8b8]">
          Emergency maps and hotlines stay available without an account. You will need to sign in
          again with eGovPH to send SOS alerts.
        </p>
        <button
          type="button"
          onClick={() => {
            setLogoutOpen(false);
            setSignedOut(true);
            setTimeout(() => router.push("/"), 1400);
          }}
          className="ribbon mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-display text-base uppercase tracking-[0.1em] text-white"
        >
          <LogoutIcon className="h-4 w-4" /> Log out
        </button>
        <button
          type="button"
          onClick={() => setLogoutOpen(false)}
          className="mt-2 w-full rounded-2xl border border-white/15 py-3 text-sm text-[#e6c0c0]"
        >
          Stay signed in
        </button>
      </Sheet>

      {signedOut && (
        <div className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+14px)] z-[70] flex justify-center px-4">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#1b0408]/95 px-4 py-2.5 text-[12px] text-[#ffe4e4] shadow-2xl backdrop-blur">
            <CheckIcon className="h-4 w-4 text-[#4ade80]" /> Signed out — emergency tools remain available
          </div>
        </div>
      )}
    </main>
  );
}
