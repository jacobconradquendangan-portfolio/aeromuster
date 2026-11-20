import Link from "next/link";
import Header from "@/components/header";
import { AlertTriangle, ChevronRight, EvacuationGlyph, MapPinIcon } from "@/components/icons";
import { evacuationSteps } from "@/lib/data";

export default function EvacuationPage() {
  return (
    <main className="page-rise">
      <Header title="AEROMUSTER" right="settings" />

      <div className="px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="tile grid h-[92px] w-[92px] place-items-center rounded-2xl shadow-[0_16px_30px_-16px_rgba(0,0,0,.9)]">
            <EvacuationGlyph className="h-16 w-16" />
          </div>
          <h1 className="mt-3 font-display text-[26px] font-semibold uppercase tracking-[0.16em] text-[#ff6a6a]">
            Evacuation
          </h1>
        </div>

        <div className="ribbon mt-4 rounded-full py-1.5 text-center">
          <h2 className="font-display text-[17px] font-semibold uppercase tracking-[0.1em] text-white">
            Evacuation procedure
          </h2>
        </div>

        <div className="panel-light mt-3 rounded-2xl p-4">
          <ol className="space-y-4">
            {evacuationSteps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#a5121e] font-display text-[12px] font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold leading-snug text-[#3a0a0f]">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-[#5c2a2f]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex gap-3 rounded-xl bg-[#a5121e] p-3.5 text-white">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-display text-sm uppercase tracking-[0.1em]">Assembly Area C</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/85">
                Open car park across from the main terminal entrance. Marshals will take a headcount
                by flight.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/map"
          className="card mt-3 flex items-center gap-3 rounded-2xl p-4 active:scale-[.99]"
        >
          <span className="tile grid h-11 w-11 shrink-0 place-items-center rounded-xl">
            <MapPinIcon className="h-6 w-6 text-[#a5121e]" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-base uppercase tracking-[0.08em] text-[#ffd9d9]">
              View evacuation route
            </span>
            <span className="block text-[11px] text-[#d8adad]">Open the floor plan for your level</span>
          </span>
          <ChevronRight className="h-4 w-4 text-[#ffd9d9]" />
        </Link>

        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[#d8adad]">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff8b8b]" />
          Always follow airport marshals and uniformed personnel. This guide is general information,
          not a substitute for their instructions.
        </p>
      </div>
    </main>
  );
}
