"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Header from "@/components/header";
import ChatBar from "@/components/chat-bar";
import Sheet from "@/components/sheet";
import NavSpotSheet from "@/components/nav-spot-sheet";
import TerminalPlan from "@/components/terminal-plan";
import { CheckIcon, ChevronDown, LayersIcon, MapPinIcon, ShieldCheckIcon } from "@/components/icons";
import {
  mapFloors,
  mapPins,
  navSpots,
  type FloorId,
  type MapPin,
  type MapPinKind,
  type NavSpot,
} from "@/lib/data";

type PinCategory = "gates" | "equipment" | "exits";

const pinCategory = (kind: MapPinKind): PinCategory =>
  kind === "gate"
    ? "gates"
    : kind === "extinguisher" || kind === "hose" || kind === "aed"
      ? "equipment"
      : "exits";

const filters: { id: PinCategory; label: string }[] = [
  { id: "gates", label: "Gates" },
  { id: "equipment", label: "Fire & first aid" },
  { id: "exits", label: "Exits & assembly" },
];

function SpotParamWatcher({ onSpot }: { onSpot: (id: string) => void }) {
  const params = useSearchParams();
  const spot = params.get("spot");

  useEffect(() => {
    if (spot) onSpot(spot);
  }, [spot, onSpot]);

  return null;
}

export default function MapPage() {
  const [floorId, setFloorId] = useState<FloorId>("12");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selected, setSelected] = useState<MapPin | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState<Record<PinCategory, boolean>>({
    gates: true,
    equipment: true,
    exits: true,
  });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const centerRef = useRef<{ x: number; y: number } | null>(null);

  const floor = mapFloors.find((item) => item.id === floorId) ?? mapFloors[0];

  const zoomBy = (delta: number) => {
    const next = Math.min(3, Math.max(1, +(zoom + delta).toFixed(1)));
    if (next === zoom) return;
    const el = scrollerRef.current;
    const plan = el?.firstElementChild as HTMLElement | null;
    const marker = highlightId
      ? (el?.querySelector(`[data-pin-id="${highlightId}"]`) as HTMLElement | null)
      : null;
    if (marker && plan) {
      const mark = marker.getBoundingClientRect();
      const box = plan.getBoundingClientRect();
      centerRef.current = {
        x: (mark.left + mark.width / 2 - box.left) / box.width,
        y: (mark.top + mark.height / 2 - box.top) / box.height,
      };
    } else if (el) {
      centerRef.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      };
    } else {
      centerRef.current = null;
    }
    setZoom(next);
  };

  useEffect(() => {
    const center = centerRef.current;
    if (!center) return;
    centerRef.current = null;
    // The browser applies the new percentage width a tick after React commits, so
    // wait for layout before centering, otherwise the scroll offset is clamped to the old width.
    const timer = setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const planWidth = el.clientWidth * zoom;
      const planHeight = planWidth * (floor.height / floor.width);
      el.scrollLeft = center.x * planWidth - el.clientWidth / 2;
      el.scrollTop = center.y * planHeight - el.clientHeight / 2;
    }, 100);
    return () => clearTimeout(timer);
  }, [zoom, floor.height, floor.width]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
    };
    try {
      el.setPointerCapture(event.pointerId);
    } catch {
      /* synthetic pointers cannot be captured; dragging still works */
    }
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el) return;
    el.scrollLeft = drag.left - (event.clientX - drag.x);
    el.scrollTop = drag.top - (event.clientY - drag.y);
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const openSpot = useCallback((id: string) => {
    const spot = navSpots.find((item) => item.id === id);
    if (!spot?.floor) return;
    const pin = mapPins.find((item) => item.spotId === spot.id);
    if (!pin) return;
    setFloorId(spot.floor);
    setSelected(null);
    setSheetOpen(false);
    setHighlightId(pin.id);
    setZoom(1);
    scrollerRef.current?.scrollTo({ left: 0, top: 0 });
  }, []);

  const selectedSpot: NavSpot | null =
    selected?.spotId ? (navSpots.find((spot) => spot.id === selected.spotId) ?? null) : null;

  const highlightPin =
    mapPins.find((pin) => pin.id === highlightId && pin.floor === floorId) ?? null;

  const pins = mapPins.filter(
    (pin) => pin.floor === floorId && visible[pinCategory(pin.kind)],
  );

  return (
    <main className="page-rise">
      <Suspense fallback={null}>
        <SpotParamWatcher onSpot={openSpot} />
      </Suspense>

      <Header title="Airport Emergency Map" right="settings" />

      <div className="space-y-3 px-4 pt-4">
        <ChatBar />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#e9dfdc] shadow-[0_20px_50px_-24px_rgba(0,0,0,.95)]">
          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ aspectRatio: "1000 / 640" }}
            className={`no-scrollbar overflow-auto overscroll-contain ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div style={{ width: `${zoom * 100}%`, minWidth: "100%" }}>
              <TerminalPlan
                floor={floor}
                pins={pins}
                selectedId={selected?.id ?? null}
                highlightId={highlightId}
                onPinSelect={(pin) => {
                  setSelected(pin);
                  setSheetOpen(true);
                  setHighlightId(null);
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#c3a9a3]/50 bg-[#fdf8f5] px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => zoomBy(-0.5)}
                disabled={zoom <= 1}
                aria-label="Zoom out"
                className="grid h-8 w-8 place-items-center rounded-md border border-[#7a1d24]/25 bg-white text-base leading-none text-[#7a1d24] disabled:opacity-35 active:scale-95"
              >
                −
              </button>
              <span className="w-11 text-center text-[10.5px] font-semibold tabular-nums text-[#7a1d24]">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(0.5)}
                disabled={zoom >= 3}
                aria-label="Zoom in"
                className="grid h-8 w-8 place-items-center rounded-md border border-[#7a1d24]/25 bg-white text-base leading-none text-[#7a1d24] disabled:opacity-35 active:scale-95"
              >
                +
              </button>
            </div>
            <p className="text-[9.5px] uppercase tracking-[0.1em] text-[#8f5b60]">
              Zoom · drag to pan
            </p>
          </div>
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

        <div className="flex flex-wrap gap-1.5">
          {filters.map((filter) => {
            const active = visible[filter.id];
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  setVisible((current) => ({ ...current, [filter.id]: !current[filter.id] }))
                }
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[10.5px] uppercase tracking-[0.06em] ${
                  active
                    ? "border-[#ff6b6b]/60 bg-[#ff3b45]/15 text-[#ffd0d0]"
                    : "border-white/12 bg-white/[0.03] text-[#c9a0a0]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {highlightPin && (
          <div className="flex items-start gap-2 rounded-xl border border-[#ff6b6b]/35 bg-[#ff3b45]/10 p-3 text-[11.5px] leading-relaxed text-[#ffd9d9]">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
            <span>
              <span className="font-semibold">{highlightPin.name}</span> is highlighted on the{" "}
              {floor.label} plan. Tap the pin to open its location card.
            </span>
          </div>
        )}

        <p className="px-1 text-[10.5px] leading-relaxed text-[#c9a0a0]">
          Tap a numbered gate or a safety marker for its location.{" "}
          <span className="text-[#ffb3b3]">E</span> extinguisher ·{" "}
          <span className="text-[#ffb3b3]">H</span> hose reel ·{" "}
          <span className="text-[#ffb3b3]">A</span> AED
        </p>

        <div className="card rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-[#ff8b8b]" />
            <p className="font-display text-base uppercase tracking-[0.1em] text-[#ffd9d9]">
              You are here
            </p>
          </div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#e0b8b8]">
            {floorId === "12"
              ? "Terminal 3, Level 2 · central concourse, near Gate 7. The nearest emergency stairs are 40 m towards the main hall."
              : "Your position is on the Level 1 & 2 plan — near Gate 7, central concourse. On this floor, the nearest exits are the north pier stairwells."}
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#43c288]/25 bg-[#43c288]/10 p-3">
            <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#63d8a1]" />
            <p className="text-[11px] leading-relaxed text-[#c9edd9]">
              This map is saved on your device and works without a signal. Safety-equipment
              positions are simulated for this prototype — follow marshals over the app if
              instructions differ.
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
          {mapFloors.map((item) => {
            const active = item.id === floorId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFloorId(item.id);
                  setSelected(null);
                  setSheetOpen(false);
                  setHighlightId(null);
                  setZoom(1);
                  setPickerOpen(false);
                  scrollerRef.current?.scrollTo({ left: 0, top: 0 });
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

      {selectedSpot ? (
        <Sheet
          open={sheetOpen}
          onClose={() => {
            setSheetOpen(false);
            setSelected(null);
          }}
          title={selectedSpot.name}
          subtitle={`${selectedSpot.level} · ${selectedSpot.walk}`}
        >
          <NavSpotSheet spot={selectedSpot} context="map" />
        </Sheet>
      ) : (
        <Sheet
          open={sheetOpen && selected !== null}
          onClose={() => {
            setSheetOpen(false);
            setSelected(null);
          }}
          title={selected?.name ?? ""}
          subtitle={selected ? floor.label : undefined}
        >
          {selected && (
            <div className="pb-2">
              {selected.nearest && (
                <p className="mb-2 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-relaxed text-[#e6c0c0]">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8b8b]" />
                  <span>
                    <span className="text-[#d3a8a8]">Nearest landmark:</span> {selected.nearest}
                  </span>
                </p>
              )}
              <div className="rounded-xl border border-[#e0912a]/30 bg-[#e0912a]/10 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f0c487]">
                  Simulated position
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#f3d9b4]">{selected.note}</p>
              </div>
              <p className="mt-3 flex items-start gap-2 text-[10.5px] leading-relaxed text-[#b98b8b]">
                <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Equipment locations are simulated for this prototype. Confirm with airport signage or
                a marshal before relying on them.
              </p>
            </div>
          )}
        </Sheet>
      )}

    </main>
  );
}
