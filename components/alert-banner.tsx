"use client";

import Link from "next/link";
import { AlertTriangle, CheckIcon, ChevronRight } from "@/components/icons";
import { useApp } from "@/lib/app-context";
import type { AlertSeverity } from "@/lib/data";

const tone: Record<AlertSeverity, string> = {
  critical: "border-[#ff3b45]/60 bg-[#ff3b45]/20 text-[#ffb3b3]",
  high: "border-[#ff8b5e]/50 bg-[#ff8b5e]/15 text-[#ffcb9e]",
  moderate: "border-[#f0b429]/50 bg-[#f0b429]/12 text-[#ffd97a]",
  info: "border-white/25 bg-white/[0.08] text-[#e6c0c0]",
};

export default function AlertBanner() {
  const { alerts, acknowledgeAlert } = useApp();
  const alert = alerts.find((item) => !item.acknowledged) ?? alerts[0];
  if (!alert) return null;

  return (
    <div className="rounded-2xl border border-[#ff3b45]/40 bg-[linear-gradient(180deg,rgba(120,10,20,.55),rgba(60,6,14,.7))] p-3.5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ff3b45]/20 text-[#ff8b8b]">
          <AlertTriangle className="h-4 w-4" />
        </span>
        <span
          className={`rounded border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] ${tone[alert.severity]}`}
        >
          {alert.severity}
        </span>
        {alert.test && (
          <span className="rounded border border-white/25 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.08em] text-[#e6c0c0]">
            Test
          </span>
        )}
        <span className="ml-auto text-[9.5px] uppercase tracking-[0.08em] text-[#c9a0a0]">
          Official · simulated
        </span>
      </div>

      <p className="mt-2 text-[13px] font-semibold leading-snug text-[#ffe4e4]">{alert.headline}</p>
      <p className="mt-0.5 text-[10.5px] text-[#d8adad]">
        {alert.source} · {alert.issuedAt} · {alert.area}
      </p>

      <div className="mt-2.5 flex gap-2">
        <Link
          href={`/alerts/${alert.id}`}
          className="flex h-9 flex-1 items-center justify-center gap-1 rounded-xl bg-[#c20f1d] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white"
        >
          Read alert <ChevronRight className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => acknowledgeAlert(alert.id)}
          disabled={alert.acknowledged}
          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/20 px-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#ffe0e0] disabled:opacity-60"
        >
          {alert.acknowledged ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 text-[#63d8a1]" /> Ack
            </>
          ) : (
            "Acknowledge"
          )}
        </button>
      </div>
    </div>
  );
}
