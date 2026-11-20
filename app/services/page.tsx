"use client";

import { useState } from "react";
import Header from "@/components/header";
import Sheet from "@/components/sheet";
import { ChevronRight, PhoneIcon, ServicesGlyph, ShieldCheckIcon } from "@/components/icons";
import { emergencyServices, governmentServices, type Service } from "@/lib/data";

export default function ServicesPage() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <main className="page-rise">
      <Header title="AEROMUSTER" right="settings" />

      <div className="px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="tile grid h-[92px] w-[92px] place-items-center rounded-2xl shadow-[0_16px_30px_-16px_rgba(0,0,0,.9)]">
            <ServicesGlyph className="h-16 w-16" />
          </div>
          <h1 className="mt-3 font-display text-[26px] font-semibold uppercase tracking-[0.16em] text-[#ff6a6a]">
            Services
          </h1>
        </div>

        <ServiceSection
          title="Emergency services"
          items={emergencyServices}
          onSelect={setSelected}
        />
        <ServiceSection
          title="Government authorities"
          items={governmentServices}
          onSelect={setSelected}
        />

        <p className="mt-5 text-[11px] leading-relaxed text-[#d8adad]">
          For anything life-threatening, call 911 first. Facility and airline enquiries are handled
          by CRK Terminal Operations.
        </p>
      </div>

      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.short ?? ""}
        subtitle={selected?.name}
      >
        {selected && (
          <div className="pb-2">
            <div className="tile grid h-28 w-full place-items-center rounded-2xl p-4">
              <img
                src={selected.logo}
                alt={`${selected.name} logo`}
                className="max-h-20 w-auto max-w-[70%] object-contain"
              />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[#e6c0c0]">{selected.role}</p>

            <dl className="mt-4 space-y-2 text-[12px]">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                <dt className="text-[#d3a8a8]">Hotline</dt>
                <dd className="font-semibold text-[#ffe0e0]">{selected.phoneLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                <dt className="text-[#d3a8a8]">Availability</dt>
                <dd className="font-semibold text-[#ffe0e0]">{selected.hours}</dd>
              </div>
            </dl>

            <a
              href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`}
              className="ribbon mt-4 flex h-13 items-center justify-center gap-2 rounded-2xl py-3.5 font-display text-base font-semibold uppercase tracking-[0.1em] text-white active:scale-[.99]"
            >
              <PhoneIcon className="h-5 w-5" /> Call {selected.phoneLabel}
            </a>

            <p className="mt-3 flex items-start gap-2 text-[10.5px] leading-relaxed text-[#b98b8b]">
              <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Numbers are verified for CRK Terminal 3. Mobile networks may be congested during an
              incident — keep trying or use the SOS button.
            </p>
          </div>
        )}
      </Sheet>
    </main>
  );
}

function ServiceSection({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: Service[];
  onSelect: (service: Service) => void;
}) {
  return (
    <section className="mt-5">
      <div className="ribbon rounded-full py-1.5 text-center">
        <h2 className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-white">
          {title}
        </h2>
      </div>
      <div className="card mt-2.5 grid grid-cols-3 gap-2.5 rounded-2xl p-2.5">
        {items.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service)}
            className="tile relative flex aspect-square flex-col items-center justify-center rounded-xl p-2 shadow-[0_6px_14px_-8px_rgba(0,0,0,.8)] transition active:scale-95"
          >
            <img
              src={service.logo}
              alt={`${service.name} logo`}
              className="h-[62%] w-auto max-w-full object-contain"
            />
            <span className="absolute bottom-1.5 left-0 right-0 truncate px-1 text-center font-display text-[10px] font-semibold uppercase tracking-[0.06em] text-[#5c171d]">
              {service.short}
            </span>
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-[#a5121e]/90 text-white">
              <ChevronRight className="h-2.5 w-2.5" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
