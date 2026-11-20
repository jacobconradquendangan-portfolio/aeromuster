"use client";

import { useState } from "react";
import Header from "@/components/header";
import ChatBar from "@/components/chat-bar";
import Sheet from "@/components/sheet";
import { CheckIcon, ChevronDown, LayersIcon, MapPinIcon, ShieldCheckIcon } from "@/components/icons";

const floors = [
  {
    id: "12",
    label: "Level 1 & 2",
    short: "L1–2",
    src: "/img/crk-level12.png",
    alt: "Clark International Airport emergency map for Levels 1 and 2, showing exits, stairs and assembly routes",
    detail: "Arrivals, departures and the public transport bay. Primary exits open to the north and south curbside.",
  },
  {
    id: "3",
    label: "Level 3",
    short: "L3",
    src: "/img/crk-level3.png",
    alt: "Clark International Airport emergency map for Level 3, showing gates, stairs and evacuation routes",
    detail: "International departures, gates and the north concourse. Use the two stairwells west of Gate 7.",
  },
] as const;

type FloorId = (typeof floors)[number]["id"];

export default function MapPage() {
  const [floorId, setFloorId] = useState<FloorId>("12");
  const [pickerOpen, setPickerOpen] = useState(false);
  const floor = floors.find((item) => item.id === floorId) ?? floors[0];

  return (
    <main className="page-rise">
      <Header title="Airport Emergency Map" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <ChatBar />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#cfc7c7] shadow-[0_20px_50px_-24px_rgba(0,0,0,.95)]">
          <img
            src={floor.src}
            alt={floor.alt}
            width={1100}
            height={619}
            className="block h-auto w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex flex-1 items-center gap-2.5 rounded-xl border border-[#ffb3b3]/30 bg-[#240509]/90 px-3 py-2.5 text-left active:scale-95"
          >
            <LayersIcon className="h-5 w-5 shrink-0 text-[#ff8b8b]" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-sm uppercase leading-none tracking-[0.08em] text-[#ffd9d9]">
                {floor.label}
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-[#d3a8a8]">
                Change floor
              </span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-[#e6c0c0]" />
          </button>

          <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-3 text-[10px] uppercase tracking-[0.06em] text-[#ffd9d9]">
            <span className="h-1.5 w-6 rounded-full bg-[#e01d2a]" />
            Evacuation route
          </div>
        </div>

        <p className="px-1 text-[10.5px] leading-relaxed text-[#c9a0a0]">
          Full floor plan shown. Turn your phone sideways to read the gate labels more easily.
        </p>

        <div className="card rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-[#ff8b8b]" />
            <p className="font-display text-base uppercase tracking-[0.1em] text-[#ffd9d9]">
              You are here
            </p>
          </div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#e0b8b8]">
            Terminal 3, Level 3 · near the central escalators, west of Gate 7. The nearest
            emergency stairs are 40 m to your left.
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#43c288]/25 bg-[#43c288]/10 p-3">
            <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#63d8a1]" />
            <p className="text-[11px] leading-relaxed text-[#c9edd9]">
              This map is saved on your device and works without a signal. Follow marshals over the
              app if instructions differ.
            </p>
          </div>
        </div>
      </div>

      <Sheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Choose a floor"
        subtitle="Emergency exits and assembly routes"
      >
        <div className="space-y-2.5 pb-2">
          {floors.map((item) => {
            const active = item.id === floorId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFloorId(item.id);
                  setPickerOpen(false);
                }}
                className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition active:scale-[.99] ${
                  active
                    ? "border-[#ff5b63]/60 bg-[#ff3b45]/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold ${
                    active ? "bg-[#c20f1d] text-white" : "bg-[#e8dcdc] text-[#7a1d24]"
                  }`}
                >
                  {item.short}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-display text-lg uppercase tracking-[0.06em] text-[#ffd9d9]">
                    {item.label}
                    {active && <CheckIcon className="h-4 w-4 text-[#ff8b8b]" />}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-relaxed text-[#d8adad]">
                    {item.detail}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Sheet>
    </main>
  );
}
