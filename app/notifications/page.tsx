"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { ChevronDown, MegaphoneIcon, ShieldCheckIcon } from "@/components/icons";
import { announcements } from "@/lib/data";
import { useApp } from "@/lib/app-context";

const categoryStyles: Record<string, string> = {
  Emergency: "bg-[#ff3b45]/15 text-[#ff8b8b] border-[#ff6b6b]/40",
  Advisory: "bg-[#ffb347]/12 text-[#ffcb85] border-[#ffb347]/35",
  Notice: "bg-white/[0.06] text-[#e6c0c0] border-white/15",
};

export default function NotificationsPage() {
  const { notices, markAllRead, unread } = useApp();
  const [expanded, setExpanded] = useState<string | null>("n1");

  useEffect(() => {
    const timer = setTimeout(markAllRead, 2000);
    return () => clearTimeout(timer);
  }, [markAllRead]);

  return (
    <main className="page-rise">
      <Header align="center" right="avatar" />

      <div className="space-y-3 px-4 pt-4">
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_40px_-22px_rgba(0,0,0,.95)]">
          <img
            src="/img/crk-hero.jpg"
            alt="Clark International Airport façade"
            className="h-[132px] w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between gap-2 px-1">
          <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.12em] text-[#ffd9d9]">
            Notifications
          </h1>
          <span className="rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-[#e6c0c0]">
            {unread > 0 ? `${unread} new` : "All read"}
          </span>
        </div>

        <div className="space-y-2.5">
          {notices.map((notice) => {
            const isOpen = expanded === notice.id;
            return (
              <div
                key={notice.id}
                className={`card overflow-hidden rounded-2xl transition ${
                  notice.read ? "opacity-90" : "ring-1 ring-[#ff3b45]/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : notice.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <span className="tile grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#a5121e]">
                    <MegaphoneIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      {!notice.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff3b45]" />}
                      <span className="truncate text-[12.5px] font-semibold text-[#ffe4e4]">
                        {notice.title}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-[#c9a0a0]">
                      <span
                        className={`rounded border px-1.5 py-0.5 ${categoryStyles[notice.category]}`}
                      >
                        {notice.category}
                      </span>
                      {notice.time}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#e6c0c0] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="animate-[rise_.2s_ease-out] border-t border-white/10 px-3.5 py-3 text-[12px] leading-relaxed text-[#e0b8b8]">
                    {notice.body}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center py-1">
          <ChevronDown className="h-5 w-5 text-[#b98b8b]" />
        </div>

        <div className="ribbon rounded-full py-1.5 text-center">
          <h2 className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-white">
            General announcements
          </h2>
        </div>

        <div className="panel-light rounded-2xl p-4">
          <div className="space-y-3.5">
            {announcements.map((item, index) => (
              <div key={item.id} className={index > 0 ? "border-t border-[#3d1016]/15 pt-3.5" : ""}>
                <p className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-[#3a0a0f]">
                  <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a5121e]" />
                  {item.title}
                </p>
                <p className="mt-1 pl-5.5 text-[11.5px] leading-relaxed text-[#5c2a2f]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
