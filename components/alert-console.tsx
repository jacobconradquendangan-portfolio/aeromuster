"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckIcon,
  ClipboardIcon,
  MegaphoneIcon,
  SendIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { useApp } from "@/lib/app-context";
import {
  alertKinds,
  alertSeverities,
  type AirportAlert,
  type AlertKind,
  type AlertSeverity,
} from "@/lib/data";

const severityTone: Record<AlertSeverity, string> = {
  critical: "border-[#ff3b45]/60 bg-[#ff3b45]/20 text-[#ffb3b3]",
  high: "border-[#ff8b5e]/50 bg-[#ff8b5e]/15 text-[#ffcb9e]",
  moderate: "border-[#f0b429]/50 bg-[#f0b429]/12 text-[#ffd97a]",
  info: "border-white/20 bg-white/[0.06] text-[#e6c0c0]",
};

export default function AlertConsole() {
  const { alerts, adminLog, publishAlert } = useApp();
  const [kind, setKind] = useState<AlertKind>("drill");
  const [severity, setSeverity] = useState<AlertSeverity>("high");
  const [area, setArea] = useState("Terminal 3 · Level 3");
  const [headline, setHeadline] = useState("");
  const [instructions, setInstructions] = useState("");
  const [source, setSource] = useState("CRK Airport Operations");
  const [test, setTest] = useState(true);
  const [published, setPublished] = useState<AirportAlert | null>(null);
  const [error, setError] = useState<string | null>(null);

  const latest = published ?? alerts[0] ?? null;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    send("publish");
  }

  function send(mode: "test" | "publish") {
    if (headline.trim().length < 6) {
      setError("Give the alert a headline of at least 6 characters.");
      return;
    }
    if (instructions.trim().length < 20) {
      setError("Instructions need at least 20 characters so passengers know what to do.");
      return;
    }
    setError(null);
    const isTest = mode === "test" ? true : test;
    const alert = publishAlert({
      kind,
      severity,
      headline,
      instructions,
      area,
      source,
      test: isTest,
    });
    setPublished(alert);
    setHeadline("");
    setInstructions("");
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[#ff8b5e]/35 bg-[#ff8b5e]/10 p-3.5">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ffcb9e]">
          <ShieldCheckIcon className="h-4 w-4" /> Prototype console
        </p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#f0cdb8]">
          Alerts published here only update this browser session. No push notification, radio call or
          airport system is contacted.
        </p>
      </div>

      <form onSubmit={submit} className="card space-y-4 rounded-2xl p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Alert type
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {alertKinds.map((item) => {
              const active = item.id === kind;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setKind(item.id);
                    setSource(item.defaultSource);
                  }}
                  className={`rounded-xl border px-2.5 py-2 text-left text-[11.5px] font-semibold transition ${
                    active
                      ? "border-[#ff5b63]/60 bg-[#ff3b45]/15 text-[#ffe0d0]"
                      : "border-white/10 bg-white/[0.03] text-[#e0b8b8]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Severity
          </p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {alertSeverities.map((item) => {
              const active = item.id === severity;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  title={item.note}
                  onClick={() => setSeverity(item.id)}
                  className={`rounded-xl border px-1 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em] transition ${
                    active ? severityTone[item.id] : "border-white/10 bg-white/[0.03] text-[#c9a0a0]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#b98b8b]">
            {alertSeverities.find((item) => item.id === severity)?.note}
          </p>
        </div>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Affected area
          </span>
          <input
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/12 bg-[#160307] px-3 text-[13px] text-[#ffe6e6] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Headline
          </span>
          <input
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
            placeholder="e.g. Evacuate Level 3 — smoke reported near Gate 9"
            maxLength={90}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/12 bg-[#160307] px-3 text-[13px] text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Instructions
          </span>
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            rows={4}
            maxLength={600}
            placeholder="Tell passengers what to do, where to go and what to avoid."
            className="mt-1.5 w-full resize-none rounded-xl border border-white/12 bg-[#160307] px-3 py-2.5 text-[13px] leading-relaxed text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d8adad]">
            Issuing authority
          </span>
          <input
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/12 bg-[#160307] px-3 text-[13px] text-[#ffe6e6] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
        </label>

        <button
          type="button"
          role="switch"
          aria-checked={test}
          onClick={() => setTest((current) => !current)}
          className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e8dcdc] text-[#a5121e]">
            <ClipboardIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-semibold text-[#ffe4e4]">Test alert</span>
            <span className="block text-[10.5px] leading-snug text-[#d3a8a8]">
              Marks the alert as a drill and shows the test badge to passengers.
            </span>
          </span>
          <span
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              test ? "bg-[#e01d2a]" : "bg-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                test ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>

        {error && (
          <p className="flex items-start gap-2 rounded-xl border border-[#ff3b45]/40 bg-[#ff3b45]/10 p-2.5 text-[11.5px] leading-relaxed text-[#ffc0c0]">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => send("test")}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#ff8b5e]/50 bg-[#ff8b5e]/12 font-display text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#ffcb9e] active:scale-[.99]"
          >
            <SendIcon className="h-4 w-4" /> Send as test
          </button>
          <button
            type="submit"
            className="ribbon flex h-12 items-center justify-center gap-2 rounded-2xl font-display text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white active:scale-[.99]"
          >
            <MegaphoneIcon className="h-4 w-4" /> Publish (simulated)
          </button>
        </div>
        <p className="px-1 text-[10px] leading-relaxed text-[#b98b8b]">
          Send as test always carries the test badge. Publish respects the Test alert switch above.
        </p>
      </form>

      {latest && (
        <section className="card rounded-2xl p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 font-display text-base uppercase tracking-[0.1em] text-[#ffd9d9]">
              <MegaphoneIcon className="h-4 w-4" /> Delivery status
            </p>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[9.5px] uppercase tracking-[0.1em] text-[#e6c0c0]">
              {latest.test ? "Test" : "Live"}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-[12.5px] font-semibold text-[#ffe4e4]">
            {latest.headline}
          </p>

          <div className="mt-3 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.1em] text-[#d3a8a8]">
                <span>Devices reached</span>
                <span className="text-[#ffe0e0]">{latest.reached.toLocaleString()}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-[#43c288]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.1em] text-[#d3a8a8]">
                <span>Acknowledged</span>
                <span className="text-[#ffe0e0]">
                  {latest.ackCount.toLocaleString()} ·{" "}
                  {Math.round((latest.ackCount / Math.max(1, latest.reached)) * 100)}%
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#ffb347]"
                  style={{ width: `${Math.min(100, (latest.ackCount / Math.max(1, latest.reached)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 flex items-start gap-2 text-[10.5px] leading-relaxed text-[#b98b8b]">
            <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-[#63d8a1]" />
            Delivery, acknowledgement counts and timestamps are simulated for the evaluation.
          </p>
        </section>
      )}

      <section className="card rounded-2xl p-4">
        <p className="flex items-center gap-2 font-display text-base uppercase tracking-[0.1em] text-[#ffd9d9]">
          <ClipboardIcon className="h-4 w-4" /> Activity log
        </p>
        <ol className="mt-3 space-y-3">
          {adminLog.map((entry) => (
            <li key={entry.id} className="border-l border-white/10 pl-3">
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#c9a0a0]">{entry.at}</p>
              <p className="mt-0.5 text-[12.5px] font-semibold text-[#ffe4e4]">{entry.action}</p>
              <p className="text-[11px] leading-relaxed text-[#d8adad]">{entry.detail}</p>
              <p className="text-[10px] text-[#b98b8b]">{entry.actor}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
