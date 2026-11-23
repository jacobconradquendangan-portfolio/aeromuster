"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import Sheet from "@/components/sheet";
import {
  AlertTriangle,
  ChevronRight,
  MapPinIcon,
  RouteIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { navGroups, navSpots, type NavGroup, type NavSpot } from "@/lib/data";

export default function NavigatePage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<NavGroup | "All">("All");
  const [selected, setSelected] = useState<NavSpot | null>(null);

  const term = query.trim().toLowerCase();
  const spots = navSpots.filter((spot) => {
    const inGroup = group === "All" || spot.group === group;
    const matches =
      !term ||
      spot.name.toLowerCase().includes(term) ||
      spot.landmark.toLowerCase().includes(term) ||
      spot.level.toLowerCase().includes(term) ||
      spot.group.toLowerCase().includes(term);
    return inGroup && matches;
  });

  return (
    <main className="page-rise">
      <Header title="Navigate" subtitle="Terminal 3 wayfinding" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <div className="rounded-2xl border border-[#43c288]/30 bg-[#43c288]/10 p-3.5">
          <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.1em] text-[#c9edd9]">
            <RouteIcon className="h-4 w-4" /> Routine navigation
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#c9edd9]">
            These are walking directions to gates and facilities — <span className="font-semibold">not</span>{" "}
            an evacuation route. In an emergency use the red exits on the Emergency Map.
          </p>
          <Link
            href="/map"
            className="mt-2.5 inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#a5121e] px-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white"
          >
            <MapPinIcon className="h-4 w-4" /> Emergency map
          </Link>
        </div>

        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a0a0]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search gate, washroom, clinic…"
            aria-label="Search gates and facilities"
            className="h-11 w-full rounded-xl border border-white/12 bg-[#160307] pl-9 pr-3 text-[13px] text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {navGroups.map((item) => {
            const active = item === group;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setGroup(item)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[10.5px] uppercase tracking-[0.06em] ${
                  active
                    ? "border-[#ff6b6b]/60 bg-[#ff3b45]/15 text-[#ffd0d0]"
                    : "border-white/12 bg-white/[0.03] text-[#c9a0a0]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {spots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelected(spot)}
              className="card flex w-full items-center gap-3 rounded-2xl p-3.5 text-left active:scale-[.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e8dcdc] font-display text-[13px] font-bold text-[#7a1d24]">
                {spot.group === "Gates" ? spot.name.replace("Gate ", "") : spot.level.replace("Level ", "L")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[17px] uppercase tracking-[0.06em] text-[#ffd9d9]">
                  {spot.name}
                </span>
                <span className="block truncate text-[11px] text-[#d8adad]">
                  {spot.level} · {spot.landmark}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.08em] text-[#b98b8b]">
                  {spot.walk}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#ffd9d9]" />
            </button>
          ))}

          {spots.length === 0 && (
            <div className="card rounded-2xl p-5 text-center">
              <AlertTriangle className="mx-auto h-7 w-7 text-[#ff8b8b]" />
              <p className="mt-2 text-[12.5px] text-[#e6c0c0]">
                No match for “{query}”. Try “gate”, “clinic”, “lost” or “taxi”.
              </p>
            </div>
          )}
        </div>

        <p className="flex items-start gap-2 px-1 text-[10.5px] leading-relaxed text-[#b98b8b]">
          <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Directions use terminal landmarks only — no GPS or indoor positioning. Signage and marshals
          always take precedence.
        </p>
      </div>

      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        subtitle={`${selected?.level ?? ""} · ${selected?.walk ?? ""}`}
      >
        {selected && (
          <div className="pb-2">
            <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-relaxed text-[#e6c0c0]">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
              {selected.landmark}
            </p>

            <p className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#d3a8a8]">
              Step-by-step
            </p>
            <ol className="mt-2 space-y-3">
              {selected.directions.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#a5121e] font-display text-[12px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-[#e6c0c0]">{step}</p>
                </li>
              ))}
            </ol>

            <Link
              href="/map"
              className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ff6b6b]/40 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#ffb3b3]"
            >
              <AlertTriangle className="h-4 w-4" /> Emergency exits instead
            </Link>

            <p className="mt-3 text-[10.5px] leading-relaxed text-[#b98b8b]">
              Routine navigation only. Evacuation routes are shown on the Emergency Map and can differ
              from this path.
            </p>
          </div>
        )}
      </Sheet>
    </main>
  );
}
