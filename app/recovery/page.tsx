import Link from "next/link";
import Header from "@/components/header";
import { ChevronRight, PhoneIcon, RecoveryGlyph, ShieldCheckIcon } from "@/components/icons";
import { recoverySteps } from "@/lib/data";

export default function RecoveryPage() {
  return (
    <main className="page-rise">
      <Header title="AEROMUSTER" right="settings" />

      <div className="px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="tile grid h-[92px] w-[92px] place-items-center rounded-2xl shadow-[0_16px_30px_-16px_rgba(0,0,0,.9)]">
            <RecoveryGlyph className="h-16 w-16" />
          </div>
          <h1 className="mt-3 font-display text-[26px] font-semibold uppercase tracking-[0.16em] text-[#ff6a6a]">
            Recovery plan
          </h1>
        </div>

        <div className="ribbon mt-4 rounded-full py-1.5 text-center">
          <h2 className="font-display text-[17px] font-semibold uppercase tracking-[0.1em] text-white">
            Guidelines
          </h2>
        </div>

        <div className="panel-light mt-3 rounded-2xl p-4">
          <ol className="space-y-4">
            {recoverySteps.map((step, index) => (
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

          <div className="mt-5 rounded-xl bg-[#7d0a14] p-3.5 text-white">
            <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.1em]">
              <ShieldCheckIcon className="h-4 w-4" /> Assistance desk
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-white/85">
              Level 1, Arrivals · open 24/7. Ask for the passenger recovery officer on duty.
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a
            href="tel:5550199"
            className="card flex items-center gap-2.5 rounded-2xl p-3.5 active:scale-[.99]"
          >
            <span className="tile grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#a5121e]">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-sm uppercase tracking-[0.06em] text-[#ffd9d9]">
                Call 555-0199
              </span>
              <span className="block text-[10px] text-[#d8adad]">Mock emergency line</span>
            </span>
          </a>
          <Link
            href="/services"
            className="card flex items-center gap-2.5 rounded-2xl p-3.5 active:scale-[.99]"
          >
            <span className="tile grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#a5121e]">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1 font-display text-sm uppercase tracking-[0.06em] text-[#ffd9d9]">
                Services <ChevronRight className="h-3 w-3" />
              </span>
              <span className="block text-[10px] text-[#d8adad]">All hotlines</span>
            </span>
          </Link>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-[#d8adad]">
          Keep your boarding pass, baggage tags and receipts. They are required for airline claims
          and insurance.
        </p>
      </div>
    </main>
  );
}
