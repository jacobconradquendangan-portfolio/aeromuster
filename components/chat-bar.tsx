"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Sheet from "@/components/sheet";
import { AlertTriangle, ArrowLeftIcon, PlusIcon, RobotIcon, SendIcon } from "@/components/icons";

type Message = { from: "bot" | "user"; text: string };

const quickPrompts = ["How do I evacuate?", "Where is Gate 7?", "Lost my bag", "Emergency hotlines"];

const replies: { match: RegExp; text: string }[] = [
  {
    match: /evac|fire|alarm|exit/i,
    text: "Leave your bags and follow the red exit route. Use the stairs, never the lifts. Assembly Area C is the open car park across from the terminal entrance. Open the Evacuation screen for the full procedure.",
  },
  {
    match: /gate|terminal|map|where|level|floor/i,
    text: "Gate 7 is on Level 2, Domestic Departures, near the north concourse. Open the Airport Emergency Map and switch between Levels 1–2 and Level 3 to see the exits closest to you.",
  },
  {
    match: /bag|lost|missing|found/i,
    text: "The Lost & Found counter is on Level 1, Arrivals, beside the information desk. Bring your baggage tag and a valid ID. For items left at security, ask the PNP desk on Level 2.",
  },
  {
    match: /phone|hotline|contact|call|police|medic|doctor|ambulance/i,
    text: "For a life-threatening emergency call 911. Airport police: 117. CRK operations: (045) 599-2888. The airport clinic is on Level 1 near Gate 3 — you can call any of them from the Services screen.",
  },
  {
    match: /flight|delay|airline|cancel/i,
    text: "I cannot access live flight data yet. Check the status boards in the departures hall or contact your airline directly. For disruption help, see the Recovery Plan screen.",
  },
  {
    match: /help|hello|hi|kumusta/i,
    text: "Hi, I'm AEROMUSTER Assistant. I can help with evacuation steps, terminal directions, emergency contacts and what to do after an incident. What do you need?",
  },
];

const fallback =
  "I can help with evacuations, terminal directions, emergency hotlines and post-incident recovery. Try asking “Where is the nearest exit?” or open the Emergency Map.";

function answer(input: string) {
  return replies.find((reply) => reply.match.test(input))?.text ?? fallback;
}

export default function ChatBar({ placeholder = "Ask AEROMUSTER" }: { placeholder?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 flex-1 items-center gap-3 rounded-full border border-white/30 bg-[linear-gradient(180deg,#e4d6d6,#cdbcbd)] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.6)] active:scale-[.995]"
        >
          <PlusIcon className="h-5 w-5 shrink-0 text-[#8d2029]" />
          <span className="font-display text-[16px] tracking-[0.04em] text-[#5c171d]">{placeholder}</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open AEROMUSTER assistant"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#ffb3b3]/35 bg-[linear-gradient(180deg,#4a0a13,#2a0509)] text-[#ffdada] active:scale-95"
        >
          <RobotIcon className="h-6 w-6" />
        </button>
      </div>
      <ChatSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function ChatSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi Jane, I'm the AEROMUSTER assistant. Ask me about exits, gates, hotlines or what to do during an emergency.",
    },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { from: "user", text: trimmed }]);
    setValue("");
    setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", text: answer(trimmed) }]);
    }, 500);
  }

  return (
    <Sheet open={open} onClose={onClose} title="AEROMUSTER Assistant" subtitle="Offline-ready safety guidance · CRK">
      <div className="flex h-[58dvh] flex-col">
        <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto pb-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                message.from === "bot"
                  ? "bg-white/[0.06] text-[#f0d3d3] ring-1 ring-white/10"
                  : "ml-auto ribbon text-white"
              }`}
            >
              {message.text}
              {message.from === "bot" && /Emergency Map|Evacuation|Services|Recovery Plan/.test(message.text) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.text.includes("Emergency Map") && (
                    <Link
                      href="/map"
                      className="rounded-full border border-[#ff6b6b]/40 px-2.5 py-1 text-[11px] font-semibold text-[#ffb3b3]"
                      onClick={onClose}
                    >
                      Open map
                    </Link>
                  )}
                  {message.text.includes("Evacuation") && (
                    <Link
                      href="/evacuation"
                      className="rounded-full border border-[#ff6b6b]/40 px-2.5 py-1 text-[11px] font-semibold text-[#ffb3b3]"
                      onClick={onClose}
                    >
                      Evacuation steps
                    </Link>
                  )}
                  {message.text.includes("Services") && (
                    <Link
                      href="/services"
                      className="rounded-full border border-[#ff6b6b]/40 px-2.5 py-1 text-[11px] font-semibold text-[#ffb3b3]"
                      onClick={onClose}
                    >
                      Hotlines
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto pb-3">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#e8c3c3] active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(value);
          }}
          className="flex items-center gap-2 border-t border-white/10 pt-3"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#e0b3b3]"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Type your question…"
            aria-label="Message AEROMUSTER"
            className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-[#160307] px-4 text-sm text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full ribbon text-white active:scale-95"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-center gap-1.5 pb-1 text-[10px] uppercase tracking-[0.12em] text-[#b98b8b]">
          <AlertTriangle className="h-3 w-3" />
          Call 911 in a life-threatening emergency
        </div>
      </div>
    </Sheet>
  );
}
