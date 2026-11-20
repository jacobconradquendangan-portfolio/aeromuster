"use client";

import Sheet from "@/components/sheet";
import { useApp } from "@/lib/app-context";
import { ShieldCheckIcon, MapPinIcon, BellIcon } from "@/components/icons";

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
  const { settings, toggleSetting } = useApp();

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

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-[#ffd9d9]">
          <MapPinIcon className="h-4 w-4" />
          <span className="text-sm font-semibold">Offline emergency maps</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#d3a8a8]">
          Floor plans for Levels 1, 2 and 3 are stored on your device after the first visit, so they
          are available even when the terminal network is down.
        </p>
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-[#b98b8b]">
        AEROMUSTER v1.0 · Passenger safety companion
        <br />
        Demo build — hotlines are fictional and nothing here dials a real emergency service.
      </p>
    </Sheet>
  );
}
