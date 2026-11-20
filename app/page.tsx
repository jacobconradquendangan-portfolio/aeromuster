import Link from "next/link";
import Header from "@/components/header";
import ChatBar from "@/components/chat-bar";
import FeatureCard from "@/components/feature-card";
import {
  EvacuationGlyph,
  MapPinIcon,
  RecoveryGlyph,
  ServicesGlyph,
} from "@/components/icons";

export default function HomePage() {
  return (
    <main className="page-rise">
      <Header subtitle="Airport Emergency Services" />

      <div className="space-y-4 px-4 pt-4">
        <ChatBar />

        <Link
          href="/map"
          className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_40px_-22px_rgba(0,0,0,.95)] active:scale-[.995]"
        >
          <img
            src="/img/hero-airport.jpg"
            alt="Clark International Airport terminal at sunset"
            className="h-[188px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#220409] via-[#220409]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-3.5 pb-3">
            <MapPinIcon className="h-5 w-5 shrink-0 text-[#ffd9a8]" />
            <span className="font-display text-[21px] font-semibold uppercase leading-none tracking-[0.06em] text-[#ff6a5f] drop-shadow-[0_2px_6px_rgba(0,0,0,.8)]">
              Airport Emergency Map
            </span>
          </div>
          <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ffe0e0] backdrop-blur">
            Offline
          </span>
        </Link>

        <div className="space-y-3">
          <FeatureCard href="/evacuation" label="Evacuation" icon={<EvacuationGlyph />} />
          <FeatureCard href="/services" label="Services" icon={<ServicesGlyph />} />
          <FeatureCard href="/recovery" label="Recovery Plan" icon={<RecoveryGlyph />} />
        </div>

        <div className="card flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3f0b12]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
            <span className="absolute inset-0 animate-[sos-pulse_3s_ease-out_infinite] rounded-full border border-[#4ade80]/50" />
          </span>
          <p className="text-[11px] leading-snug text-[#e6c0c0]">
            <span className="font-semibold text-[#ffe0e0]">All systems normal.</span> CRK Terminal 3
            is operating. Emergency maps are cached on your device.
          </p>
        </div>
      </div>

      <p className="pb-2 pt-6 text-center text-[10px] uppercase tracking-[0.18em] text-[#b98b8b]">
        Clark International Airport · Pampanga
      </p>
    </main>
  );
}
