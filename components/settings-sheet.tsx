"use client";

import { useState } from "react";
import Link from "next/link";
import Sheet from "@/components/sheet";
import { useApp } from "@/lib/app-context";
import {
  BellIcon,
  ChevronRight,
  ClipboardIcon,
  LogoutIcon,
  MapPinIcon,
  ShieldCheckIcon,
  AlertTriangle,
} from "@/components/icons";

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left active:scale-[.99]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8dcdc] text-[#a5121e]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#ffe4e4]">{label}</span>
        <span className="block text-[11px] leading-snug text-[#d3a8a8]">{description}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#e01d2a]" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function SettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, toggleSetting, role, setRole, resetDemoData } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Sheet open={open} onClose={onClose} title="Settings" subtitle="AEROMUSTER · Clark International Airport">
      <div className="space-y-2.5">
        <Toggle
          label="Emergency alerts"
          description="Push advisories and evacuation notices for CRK."
          checked={settings.alerts}
          onChange={() => toggleSetting("alerts")}
          icon={<BellIcon className="h-5 w-5" />}
        />
        <Toggle
          label="Larger text"
          description="Increase text size across the app."
          checked={settings.largeText}
          onChange={() => toggleSetting("largeText")}
          icon={<ShieldCheckIcon className="h-5 w-5" />}
        />
      </div>

      <div className="mt-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#d3a8a8]">
          View as
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {(
            [
              { id: "passenger", label: "Passenger" },
              { id: "admin", label: "Alert administrator" },
            ] as const
          ).map((item) => {
            const active = role === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setRole(item.id)}
                className={`rounded-xl border px-2.5 py-2.5 text-left text-[11.5px] font-semibold transition ${
                  active
                    ? "border-[#ff5b63]/60 bg-[#ff3b45]/15 text-[#ffe0d0]"
                    : "border-white/10 bg-white/[0.03] text-[#e0b8b8]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#b98b8b]">
          The paper defines three roles: passenger or tourist, authorized alert administrator, and
          designated assistance recipient. The recipient is your saved emergency contact.
        </p>
        <Link
          href="/admin/alerts"
          onClick={onClose}
          className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[12px] font-semibold text-[#ffe4e4]"
        >
          <span className="flex items-center gap-2">
            <ClipboardIcon className="h-4 w-4 text-[#ff9c9c]" /> Alert administrator console
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-[#e6c0c0]" />
        </Link>
        <Link
          href="/alerts"
          onClick={onClose}
          className="mt-1.5 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[12px] font-semibold text-[#ffe4e4]"
        >
          <span className="flex items-center gap-2">
            <BellIcon className="h-4 w-4 text-[#ff9c9c]" /> Passenger alert list
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-[#e6c0c0]" />
        </Link>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-[#ffd9d9]">
          <MapPinIcon className="h-4 w-4" />
          <span className="text-sm font-semibold">Offline safety content</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#d3a8a8]">
          The Emergency Map, Evacuation steps, Navigate directory and Alert list are cached after the
          first visit, so the floor plans stay available when the terminal network is down.
        </p>
      </div>

      <div className="mt-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-[#ffd9d9]">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-semibold">Prototype scope</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#d3a8a8]">
          Simulated environment only. The app is not connected to airport alarms, emergency dispatch,
          live flight data or indoor positioning, and no real emergency is triggered from it. All maps,
          alerts and hotlines are fictional placeholders that must be validated by airport management
          before any real-world pilot.
        </p>
      </div>

      <div className="mt-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-[#ffd9d9]">
          <ShieldCheckIcon className="h-4 w-4" />
          <span className="text-sm font-semibold">Your data</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#d3a8a8]">
          Consistent with RA 10173 (Data Privacy Act), only what you type into an SOS request is kept,
          and only in this browser session — name, contact and profile details come from the mock
          profile. Location is simulated, never read from the device. Nothing is uploaded, and
          everything is deleted when you reset or close the app.
        </p>
        <button
          type="button"
          onClick={() => {
            if (!confirmReset) {
              setConfirmReset(true);
              return;
            }
            resetDemoData();
            setConfirmReset(false);
          }}
          className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[#ff6b6b]/40 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ffb3b3]"
        >
          <LogoutIcon className="h-3.5 w-3.5" />
          {confirmReset ? "Tap again to confirm reset" : "Reset demo data"}
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-[#b98b8b]">
        AEROMUSTER v1.0 · Passenger safety companion
        <br />
        Demo build — hotlines are fictional and nothing here dials a real emergency service.
      </p>
    </Sheet>
  );
}
