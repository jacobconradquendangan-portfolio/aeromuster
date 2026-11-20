"use client";

import Link from "next/link";
import { useState } from "react";
import { GearIcon } from "@/components/icons";
import SettingsSheet from "@/components/settings-sheet";

type Props = {
  title?: string;
  subtitle?: string;
  align?: "start" | "center";
  right?: "tools" | "settings" | "avatar" | "none";
};

export default function Header({
  title = "AEROMUSTER",
  subtitle,
  align = "start",
  right = "tools",
}: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const centered = align === "center";

  return (
    <>
      <header className="header-grad sticky top-0 z-30">
        <div className="relative flex items-center justify-between gap-3 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+10px)]">
          {centered ? (
            <span className="h-9 w-9" aria-hidden />
          ) : (
            <Link
              href="/"
              aria-label="AEROMUSTER home"
              className="grid h-10 w-10 shrink-0 place-items-center"
            >
              <img
                src="/img/logo.png"
                alt=""
                className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(255,60,60,0.5)]"
              />
            </Link>
          )}

          <div
            className={
              centered
                ? "absolute left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap"
                : "flex min-w-0 flex-1 items-center gap-2.5"
            }
          >
            {centered && (
              <img
                src="/img/logo.png"
                alt=""
                className="h-8 w-8 object-contain drop-shadow-[0_0_12px_rgba(255,60,60,0.5)]"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-display text-[19px] font-semibold uppercase leading-none tracking-[0.2em] text-[#ff4a53]">
                {title}
              </p>
              {subtitle && (
                <p className="mt-1 truncate font-display text-[10px] uppercase tracking-[0.16em] text-[#eababa]">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {(right === "tools" || right === "settings") && (
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                aria-label="Open settings"
                className="grid h-9 w-9 place-items-center rounded-full text-[#ff8f8f] transition active:scale-90"
              >
                <GearIcon className="h-[22px] w-[22px]" />
              </button>
            )}
            {(right === "tools" || right === "avatar") && (
              <Link
                href="/profile"
                aria-label="Open profile"
                className="h-9 w-9 overflow-hidden rounded-full border border-[#ffb3b3]/40 shadow-[0_0_14px_rgba(255,70,70,0.35)]"
              >
                <img src="/img/avatar.jpg" alt="Jane Doe" className="h-full w-full object-cover" />
              </Link>
            )}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#ff3b45]/60 to-transparent" />
      </header>
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
