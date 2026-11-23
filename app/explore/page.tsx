"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import ChatBar from "@/components/chat-bar";
import { ChevronRight, MapPinIcon, RouteIcon, XIcon } from "@/components/icons";
import { exploreSpots } from "@/lib/data";

export default function ExplorePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = exploreSpots.find((spot) => spot.id === selectedId) ?? null;

  return (
    <main className="page-rise">
      <Header align="center" right="avatar" />

      <div className="space-y-3 px-4 pt-4">
        <ChatBar />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1b2a2f] shadow-[0_18px_40px_-22px_rgba(0,0,0,.95)]">
          <div className="relative">
            <img
              src="/img/crk-vicinity.jpg"
              alt="Map of the area around Clark International Airport, showing Mabiga, Margot, Anunas and Malabañas"
              className="h-[430px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#220409]/10" />

            {exploreSpots.map((spot) => {
              const active = spot.id === selectedId;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedId(active ? null : spot.id)}
                  aria-label={spot.label}
                  aria-pressed={active}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                >
                  <span
                    className={`flex flex-col items-center transition-transform ${
                      active ? "scale-110" : "hover:scale-105"
                    }`}
                  >
                    <span
                      className={`whitespace-nowrap rounded-md border px-2 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.08em] shadow-lg ${
                        active
                          ? "border-white/70 bg-[#c20f1d] text-white"
                          : "border-[#5c0d14] bg-[#e8dcdc]/95 text-[#5c0d14]"
                      }`}
                    >
                      {spot.label}
                    </span>
                    <span
                      className={`-mt-px h-3 w-3 rotate-45 border-b border-r ${
                        active
                          ? "border-white/70 bg-[#c20f1d]"
                          : "border-[#5c0d14] bg-[#e8dcdc]/95"
                      }`}
                    />
                    <MapPinIcon
                      className={`mt-0.5 h-6 w-6 drop-shadow ${
                        active ? "text-[#ff3b45]" : "text-[#8f1420]"
                      }`}
                    />
                  </span>
                </button>
              );
            })}

            <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              CRK vicinity
            </div>
          </div>

          {selected ? (
            <div className="animate-[rise_.25s_ease-out] border-t border-white/10 bg-[#2b060c]/95 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ff3b45]/15 text-[#ff7d7d]">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg uppercase tracking-[0.06em] text-[#ffd9d9]">
                    {selected.label}
                  </h2>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#e0b8b8]">
                    {selected.description}
                  </p>
                  {selected.href && (
                    <Link
                      href={selected.href}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ff8b8b]"
                    >
                      Open details <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Hide details"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/5 text-[#e0b8b8]"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#2b060c]/80 px-4 py-3">
              <p className="text-[11px] leading-snug text-[#d8adad]">
                Tap a pin to see terminal, ARFF and clinic details.
              </p>
              <Link
                href="/map"
                className="shrink-0 rounded-full border border-[#ff6b6b]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#ffb3b3]"
              >
                Emergency map
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/navigate"
          className="card flex items-center gap-3 rounded-2xl p-3.5 active:scale-[.99]"
        >
          <span className="tile grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#a5121e]">
            <RouteIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] uppercase tracking-[0.06em] text-[#ffd9d9]">
              Gate & facility directions
            </span>
            <span className="block text-[11px] text-[#d8adad]">
              Routine navigation — not an evacuation route
            </span>
          </span>
          <ChevronRight className="h-4 w-4 text-[#ffd9d9]" />
        </Link>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/map"
            className="card rounded-xl px-3.5 py-3 active:scale-[.99]"
          >
            <p className="font-display text-base uppercase tracking-[0.08em] text-[#ffd0d0]">
              Floor plans
            </p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-[#d3a8a8]">Levels 1–3 exits</p>
          </Link>
          <Link
            href="/evacuation"
            className="card rounded-xl px-3.5 py-3 active:scale-[.99]"
          >
            <p className="font-display text-base uppercase tracking-[0.08em] text-[#ffd0d0]">
              Assembly areas
            </p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-[#d3a8a8]">Evacuation points</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
