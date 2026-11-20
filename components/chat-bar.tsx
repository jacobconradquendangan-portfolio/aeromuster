"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Sheet from "@/components/sheet";
import { AlertTriangle, ArrowLeftIcon, PlusIcon, RobotIcon, SendIcon } from "@/components/icons";
import { emergencyServices, governmentServices } from "@/lib/data";

type ChatLink = { href: string; label: string };

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
};

type Intent = {
  id: string;
  patterns: RegExp[];
  reply: string;
  links?: ChatLink[];
  suggestions?: string[];
  followUp?: string;
};

const quickPrompts = ["Nearest exit", "Medical help", "Where is Gate 7?", "Lost baggage"];

const mapLink: ChatLink = { href: "/map", label: "Open map" };
const evacuationLink: ChatLink = { href: "/evacuation", label: "Evacuation steps" };
const servicesLink: ChatLink = { href: "/services", label: "Hotlines" };
const recoveryLink: ChatLink = { href: "/recovery", label: "Recovery plan" };

const allServices = [...emergencyServices, ...governmentServices];

function hotlineFor(slug: string): string {
  return allServices.find((service) => service.slug === slug)?.phoneLabel ?? "the hotline";
}

function numberList(slugs: string[]): string {
  return slugs
    .map((slug) => {
      const service = allServices.find((item) => item.slug === slug);
      return service ? `${service.short} ${service.phoneLabel}` : null;
    })
    .filter((entry): entry is string => entry !== null)
    .join(" · ");
}

const SOS_SUGGESTIONS = ["Medical help", "Evacuation steps", "Hotlines"];

const intents: Intent[] = [
  {
    id: "sos",
    patterns: [/\bsos\b/, /\bhelp me\b/, /\bin danger\b/, /\bunsafe\b/, /being attacked/, /\battacked\b/],
    reply:
      "Tap the red SOS button — it sits on every screen. In this demo build it only simulates the alert: it shows your terminal level and a reference number, but nothing is transmitted or dialled. If someone is hurt, say that first when you reach a marshal.",
    links: [servicesLink],
    suggestions: SOS_SUGGESTIONS,
    followUp:
      "While you wait, move away from the immediate danger if you can, stay on a lit concourse and keep your phone in hand. Marshals are picked out by their red vests.",
  },
  {
    id: "fire",
    patterns: [/fire/, /smoke/, /burning/, /flames?/, /\barff\b/],
    reply:
      "Pull the nearest fire alarm, then leave by the closest red exit — stairs only, never the lifts. Close doors behind you and gather at Assembly Area C, the open car park across from the terminal entrance. ARFF and BFP crews respond through the emergency line.",
    links: [evacuationLink, servicesLink],
    suggestions: ["Evacuation steps", "Medical help", "Hotlines"],
    followUp:
      "If smoke is thick, stay low and breathe through fabric. Never go back for bags, and do not re-enter until a marshal gives the all-clear.",
  },
  {
    id: "earthquake",
    patterns: [/earthquake/, /tremor/, /\bshake/, /aftershock/],
    reply:
      "Drop, cover and hold on under sturdy furniture, away from glass and ceiling fittings. Once the shaking stops, follow the marshals out by the stairs and gather at Assembly Area C. Expect aftershocks before re-entry.",
    links: [evacuationLink],
    suggestions: ["Evacuation steps", "Medical help", "Hotlines"],
  },
  {
    id: "evacuation",
    patterns: [/evacuat/, /\bevac\b/, /\bexits?\b/, /\bescape\b/, /assembly area/, /leave the (?:terminal|building)/],
    reply:
      "Leave your bags, follow the red exit signs and use the stairs — never the lifts or escalators. Assembly Area C is the open car park across from the terminal entrance. Airport marshals give the all-clear there.",
    links: [evacuationLink, mapLink],
    suggestions: ["Where is Gate 7?", "Medical help", "Hotlines"],
    followUp:
      "Exits are numbered by level on the Emergency Map: open it and pick Levels 1–2 or Level 3 to see the two closest to you.",
  },
  {
    id: "medical",
    patterns: [/medical/, /\bclinic\b/, /first aid/, /\bdoctors?\b/, /\bnurses?\b/, /ambulance/, /\binjur/, /\bhurt\b/, /\bsick\b/, /\bfaint/, /unconscious/, /\bbleed/, /chest pain/, /allerg/, /\bhospital\b/],
    reply: `The airport clinic is on Level 1 near Gate 3 and is staffed 24 hours. Sit the person down, keep them warm and call a marshal or the emergency line, ${hotlineFor("crk")}. In this demo build that number is a placeholder and no call is placed.`,
    links: [servicesLink],
    suggestions: ["Hotlines", "Nearest exit", "Recovery plan"],
    followUp:
      "If the person is unconscious or not breathing, say so immediately when you reach staff — they will bring a defibrillator and stretcher to you.",
  },
  {
    id: "police",
    patterns: [/\bpolice\b/, /\bpnp\b/, /security/, /stolen/, /\btheft\b/, /robb/, /\bfight\b/, /harass/, /assault/, /pickpocket/],
    reply: `The PNP Airport Police Station is on Level 2 near the north concourse and is staffed 24 hours. Report theft, threats or a fight there, and note the time, level and what was taken. The mock police line in this demo is ${hotlineFor("pnp")}.`,
    links: [servicesLink],
    suggestions: ["Lost baggage", "Hotlines", "Nearest exit"],
  },
  {
    id: "suspicious",
    patterns: [/suspicious/, /unattended/, /unclaimed/, /\bbomb\b/, /explosive/, /\bpackage\b/, /threat/],
    reply:
      "Don't touch it and don't use your phone right next to it — move at least 30 metres away. Tell the nearest marshal or security officer and point out exactly where the item is. Leave the area clear for the ARFF and PNP teams.",
    links: [servicesLink],
    suggestions: ["Hotlines", "Evacuation steps", "Nearest exit"],
  },
  {
    id: "lost-person",
    patterns: [
      /lost (?:my )?(?:child|kid|son|daughter|baby|wife|husband|friend|parent|mother|father)/,
      /separated/,
      /missing person/,
      /can'?t find (?:my )?(?:child|kid|son|daughter|wife|husband|friend|parent)/,
    ],
    reply:
      "Tell the nearest marshal or the PNP desk on Level 2 immediately, with a description and their last known location. Ask the information desk on Level 1, Arrivals, to page them over the public address system.",
    links: [servicesLink],
    suggestions: ["Lost baggage", "Hotlines", "Nearest exit"],
  },
  {
    id: "baggage",
    patterns: [/\bbags?\b/, /baggage/, /luggage/, /lost (?:and )?found/, /lost property/, /suitcase/, /left (?:my|it) (?:at|on)/],
    reply:
      "Lost & Found is on Level 1, Arrivals, beside the information desk. Bring your baggage tag and a valid ID; for items left at security, ask the PNP desk on Level 2. Report a missing checked bag to your airline's baggage desk before you leave the terminal.",
    links: [servicesLink],
    suggestions: ["Hotlines", "Where is Gate 7?", "Recovery plan"],
  },
  {
    id: "gate",
    patterns: [/\bgates?\b/, /terminal/, /concourse/, /\bfloors?\b/, /\blevels?\b/, /where (?:is|are|can i)/, /\bmap\b/, /directions?/, /arrivals/, /departures/],
    reply:
      "Gate 7 is on Level 2, Domestic Departures, near the north concourse. The Emergency Map shows Levels 1–2 and Level 3 with the nearest exits in red — switch floors just under the plan.",
    links: [mapLink],
    suggestions: ["Nearest exit", "Hotlines", "Evacuation steps"],
    followUp:
      "Arrivals, Lost & Found and the clinic are all on Level 1; Level 3 holds the international departures hall and the north exits.",
  },
  {
    id: "hotlines",
    patterns: [/hotline/, /phone (?:number|line)/, /contact (?:number|details)/, /\bnumber for\b/, /\bcall\b/, /\bdial\b/, /\bemergency\b/],
    reply: `Emergency services: ${numberList(["pnp", "crk", "bfp"])}. Government authorities: ${numberList(["caap", "bi", "dot"])}. Every number here is a fake placeholder in this demo build, so none of them reaches a real agency — the full list is on Services.`,
    links: [servicesLink],
    suggestions: ["Medical help", "Nearest exit", "Are these numbers real?"],
  },
  {
    id: "flight",
    patterns: [/\bflights?\b/, /delay/, /cancel/, /airline/, /boarding/, /check[- ]?in/, /departure time/, /status board/, /gate change/],
    reply:
      "I can't read live flight data. Check the status boards in the departures hall or your airline's app. If a delay or cancellation strands you, the Recovery Plan screen covers rebooking, accommodation and your passenger rights.",
    links: [recoveryLink],
    suggestions: ["Recovery plan", "Hotlines", "Lost baggage"],
  },
  {
    id: "recovery",
    patterns: [/recovery/, /after (?:an )?incident/, /rebook/, /stranded/, /compensation/, /passenger rights/, /missed connection/],
    reply:
      "The Recovery Plan screen walks you through the first hours after an incident: report and reference number, airline rebooking, accommodation, and the assistance desk on Level 1, Arrivals. Keep your boarding pass and any incident reference with you.",
    links: [recoveryLink, servicesLink],
    suggestions: ["Hotlines", "Lost baggage", "Where is Gate 7?"],
  },
  {
    id: "facilities",
    patterns: [/toilet/, /washroom/, /restroom/, /bathroom/, /\bwifi\b/, /wi-fi/, /charg/, /socket/, /\batm\b/, /\bcash\b/, /money chang/, /\bfood\b/, /\brestaurants?\b/, /\bcafe\b/, /\bwater\b/, /prayer/, /smoking/, /\btaxi\b/, /parking/, /\bbus\b/],
    reply:
      "Most facilities are on Level 1: washrooms near Arrivals and Departures, charging points and the information desk in the main hall, and ATMs and currency exchange on the landside concourse. Prayer rooms and the smoking area are outside the secured area.",
    links: [mapLink],
    suggestions: ["Where is Gate 7?", "Nearest exit", "Hotlines"],
  },
  {
    id: "accessibility",
    patterns: [/wheelchair/, /accessib/, /disabled/, /\bpwd\b/, /pregnan/, /elderly/, /special (?:assistance|needs)/, /mobility/],
    reply:
      "Wheelchairs and staff assistance are free — request them at any information desk or through your airline at least 48 hours before departure. Lifts are the step-free route between levels; during an evacuation staff guide you to the nearest refuge point.",
    links: [servicesLink],
    suggestions: ["Nearest exit", "Hotlines", "Where is Gate 7?"],
  },
  {
    id: "app",
    patterns: [/\bapp\b/, /profile/, /notification/, /settings/, /large text/, /offline/, /download/, /language/, /account/, /log ?out/],
    reply:
      "The Emergency Map, Evacuation steps and hotlines keep working offline once you've opened them. Use the gear icon for text size and notifications, and the Profile screen for your saved emergency contact.",
    links: [mapLink],
    suggestions: ["Nearest exit", "Hotlines", "Where is Gate 7?"],
  },
  {
    id: "mock",
    patterns: [/\bmock\b/, /\bdemo\b/, /\bfake\b/, /real (?:number|hotline)/, /numbers? real/, /(?:numbers|hotlines) (?:real|fake)/, /does (?:this|it) (?:work|dial)/, /555/, /not dial/],
    reply:
      "This is a demo build: every hotline shown is a made-up number and none of them belongs to a real agency. The SOS flow, dispatch messages and reference numbers are simulated end to end — nothing is sent from your device.",
    links: [servicesLink],
    suggestions: ["Hotlines", "How does SOS work?", "Evacuation steps"],
  },
  {
    id: "greeting",
    patterns: [/^(?:hi|hello|hey|yo|good (?:morning|afternoon|evening)|kumusta|kamusta)\b/],
    reply:
      "Hi Jane — I'm the AEROMUSTER assistant. I can walk you through an evacuation, point you to gates and facilities, find the right hotline or help after an incident. What do you need?",
    suggestions: ["Nearest exit", "Medical help", "Where is Gate 7?", "Hotlines"],
  },
  {
    id: "thanks",
    patterns: [/thank/, /salamat/, /appreciate/, /^ty\b/],
    reply:
      "Anytime. The SOS button and the Emergency Map stay one tap away if anything changes.",
    suggestions: ["Nearest exit", "Hotlines", "Recovery plan"],
  },
  {
    id: "bye",
    patterns: [/\bbye\b/, /goodbye/, /see you/, /that'?s all/],
    reply:
      "Take care. The Emergency Map, Evacuation steps and Services are still one tap away if you need them.",
    suggestions: ["Nearest exit", "Hotlines", "Evacuation steps"],
  },
  {
    id: "capabilities",
    patterns: [/^help\b/, /what can you do/, /who are you/, /what do you know/],
    reply:
      "I answer from this app's built-in safety guide: evacuation steps, gates and levels, facilities, hotlines, post-incident recovery and how the SOS alert works. I can't see live flights, CCTV or a real operator — this is a demo build.",
    suggestions: ["Nearest exit", "Medical help", "Hotlines", "Are these numbers real?"],
  },
];

const fallback: Omit<Intent, "id" | "patterns"> = {
  reply:
    "I don't have that in the offline guide. I can help with evacuations, exits, gates, medical help, lost items, hotlines, flight disruptions, accessibility and the SOS alert — or open the Emergency Map for the nearest way out.",
  links: [mapLink, servicesLink],
  suggestions: ["Nearest exit", "Medical help", "Hotlines", "Where is Gate 7?"],
};

function pickIntent(input: string): Intent | null {
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.patterns.reduce((total, pattern) => (pattern.test(input) ? total + 1 : total), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best;
}

function initialMessage(): Message {
  return {
    id: 0,
    from: "bot",
    text: "Hi Jane, I'm the AEROMUSTER assistant. Ask me about exits, gates, hotlines or what to do during an emergency.",
    suggestions: ["Nearest exit", "Medical help", "Where is Gate 7?", "Hotlines"],
  };
}

const ackPattern = /^(?:yes|yeah|yep|ok(?:ay)?|sure|more|go on|and|then|next)[\s!?.,]*$/;

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
  const [messages, setMessages] = useState<Message[]>([initialMessage()]);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const lastIntent = useRef<Intent | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  function respond(raw: string): Omit<Intent, "id" | "patterns"> {
    const input = raw
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();

    if (ackPattern.test(input) && lastIntent.current?.followUp) {
      return { reply: lastIntent.current.followUp, links: lastIntent.current.links };
    }

    const intent = pickIntent(input);
    lastIntent.current = intent;
    return intent ?? fallback;
  }

  function send(raw: string) {
    const text = raw.trim().slice(0, 280);
    if (!text || thinking) return;

    setValue("");
    setMessages((current) => [...current, { id: nextId.current++, from: "user", text }]);
    setThinking(true);

    const result = respond(text);
    const delay = Math.min(1100, 420 + result.reply.length * 5);
    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          from: "bot",
          text: result.reply,
          links: result.links,
          suggestions: result.suggestions,
        },
      ]);
      setThinking(false);
    }, delay);
    timers.current.push(timer);
  }

  function reset() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    lastIntent.current = null;
    setThinking(false);
    setValue("");
    setMessages([initialMessage()]);
  }

  return (
    <Sheet open={open} onClose={onClose} title="AEROMUSTER Assistant" subtitle="Offline safety guide · not a live operator">
      <div className="flex h-[58dvh] flex-col">
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-white/15 px-2.5 py-1 text-[10.5px] text-[#e0b3b3] active:scale-95"
          >
            New chat
          </button>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="no-scrollbar flex-1 space-y-3 overflow-y-auto pb-3"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                message.from === "bot"
                  ? "bg-white/[0.06] text-[#f0d3d3] ring-1 ring-white/10"
                  : "ml-auto ribbon text-white"
              }`}
            >
              {message.text}
              {message.from === "bot" && ((message.links?.length ?? 0) > 0 || (message.suggestions?.length ?? 0) > 0) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.links?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="rounded-full border border-[#ff6b6b]/40 px-2.5 py-1 text-[11px] font-semibold text-[#ffb3b3]"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {message.suggestions?.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#e8c3c3] active:scale-95"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {thinking && (
            <div
              role="status"
              aria-label="Assistant is typing"
              className="flex w-[62px] items-center justify-center gap-1 rounded-2xl bg-white/[0.06] px-3 py-3.5 ring-1 ring-white/10"
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ff9c9c]"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}
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
            maxLength={280}
            className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-[#160307] px-4 text-sm text-[#ffe6e6] placeholder:text-[#a97c7c] focus:border-[#ff6b6b]/60 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={thinking}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full ribbon text-white active:scale-95 disabled:opacity-50"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-center gap-1.5 pb-1 text-[10px] uppercase tracking-[0.12em] text-[#b98b8b]">
          <AlertTriangle className="h-3 w-3" />
          Demo build · hotlines are fictional
        </div>
      </div>
    </Sheet>
  );
}
