"use client";

import Link from "next/link";
import { AlertTriangle, ChevronRight, LayersIcon, MapPinIcon } from "@/components/icons";
import type { NavSpot } from "@/lib/data";

export default function NavSpotSheet({
  spot,
  context,
}: {
  spot: NavSpot;
  context: "navigate" | "map";
}) {
  if (context === "map") {
    return (
      <div className="pb-2">
        <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-relaxed text-[#e6c0c0]">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
          {spot.landmark}
        </p>

        <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#ff6b6b]/25 bg-[#ff3b45]/10 p-3 text-[11.5px] leading-relaxed text-[#f3cfcf]">
          <LayersIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
          Marked on the {spot.level} emergency plan. In an evacuation, follow the red exit routes
          instead of the walking directions.
        </p>

        <Link
          href={`/navigate?spot=${spot.id}`}
          className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ff6b6b]/40 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#ffb3b3]"
        >
          Full directions
          <ChevronRight className="h-4 w-4" />
        </Link>

        <p className="mt-3 text-[10.5px] leading-relaxed text-[#b98b8b]">
          Routine navigation only. Evacuation routes are shown on the Emergency Map and can differ
          from this path.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-2">
      <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-relaxed text-[#e6c0c0]">
        <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
        {spot.landmark}
      </p>

      <p className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#d3a8a8]">
        Step-by-step
      </p>
      <ol className="mt-2 space-y-3">
        {spot.directions.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#a5121e] font-display text-[12px] font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-[12.5px] leading-relaxed text-[#e6c0c0]">{step}</p>
          </li>
        ))}
      </ol>

      {spot.point && (
        <Link
          href={`/map?spot=${spot.id}`}
          className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ff6b6b]/40 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#ffb3b3]"
        >
          <MapPinIcon className="h-4 w-4" /> Show on map
        </Link>
      )}

      <Link
        href="/map"
        className="mt-2.5 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/12 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#e6c0c0]"
      >
        <AlertTriangle className="h-4 w-4" /> Emergency exits instead
      </Link>

      <p className="mt-3 text-[10.5px] leading-relaxed text-[#b98b8b]">
        Routine navigation only. Evacuation routes are shown on the Emergency Map and can differ
        from this path.
      </p>
    </div>
  );
}
