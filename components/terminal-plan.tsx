"use client";

import { ChevronRight, MapPinIcon } from "@/components/icons";
import type { MapFloor, MapPin } from "@/lib/data";

function markerText(pin: MapPin): string {
  switch (pin.kind) {
    case "gate":
      return pin.name.replace("Gate ", "");
    case "extinguisher":
      return "E";
    case "hose":
      return "H";
    case "aed":
      return "A";
    default:
      return "";
  }
}

function markerClass(pin: MapPin, isSelected: boolean): string {
  const shape =
    pin.kind === "gate"
      ? "h-6 w-6 rounded-md bg-[#a5121e] text-[11px] font-bold text-white border-white/60"
      : pin.kind === "extinguisher" || pin.kind === "hose"
        ? "h-5 w-5 rounded-full bg-[#e0912a] text-[9px] font-bold text-[#3a1b00] border-white/70"
        : pin.kind === "aed"
          ? "h-5 w-5 rounded-full bg-[#f7efec] text-[9px] font-bold text-[#a5121e] border-[#a5121e]/50"
          : "h-5 w-5 rounded-full bg-[#2f8f5b] text-white border-white/70";

  return `relative grid place-items-center border shadow-[0_2px_6px_rgba(0,0,0,.35)] transition ${shape}${
    isSelected ? " ring-2 ring-white ring-offset-1 ring-offset-[#28060b]" : ""
  }`;
}

export default function TerminalPlan({
  floor,
  pins,
  selectedId,
  highlightId,
  onPinSelect,
}: {
  floor: MapFloor;
  pins: MapPin[];
  selectedId?: string | null;
  highlightId?: string | null;
  onPinSelect: (pin: MapPin) => void;
}) {
  return (
    <div className="relative select-none">
      <img
        src={floor.src}
        alt={floor.alt}
        width={floor.width}
        height={floor.height}
        draggable={false}
        className="block h-auto w-full"
      />

      {pins.map((pin) => {
        const isSelected = selectedId === pin.id || highlightId === pin.id;
        const isHighlighted = highlightId === pin.id;
        return (
          <button
            key={pin.id}
            type="button"
            data-pin-id={pin.id}
            onClick={() => onPinSelect(pin)}
            aria-label={pin.note ? `${pin.name}. ${pin.note}` : pin.name}
            aria-pressed={isSelected}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 active:scale-95 ${
              isSelected ? "z-10" : "z-0"
            }`}
            style={{ left: `${pin.point.x}%`, top: `${pin.point.y}%` }}
          >
            {isHighlighted && (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 m-auto h-8 w-8 rounded-lg border-2 border-[#ff3b45]/70 shadow-[0_0_10px_rgba(255,59,69,.55)]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 m-auto h-6 w-6 animate-ping rounded-md border-2 border-[#ff3b45]"
                />
              </>
            )}
            <span className={markerClass(pin, isSelected)}>
              {pin.kind === "exit" && <ChevronRight className="h-3 w-3" />}
              {pin.kind === "assembly" && <MapPinIcon className="h-3 w-3" />}
              {pin.kind !== "exit" && pin.kind !== "assembly" && markerText(pin)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
