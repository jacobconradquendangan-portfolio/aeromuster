"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, ExploreIcon, HomeIcon, ProfileIcon, AlertTriangle } from "@/components/icons";
import SosOverlay from "@/components/sos-overlay";
import { useApp } from "@/lib/app-context";

const links = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/explore", label: "Explore", Icon: ExploreIcon },
  null,
  { href: "/notifications", label: "Notification", Icon: BellIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { unread, openSos } = useApp();

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 border-t border-[#ff3b45]/25 bg-[#240509]/95 px-1 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2 backdrop-blur-md"
      >
        <div className="grid grid-cols-5 items-end">
          {links.map((item, index) => {
            if (!item) {
              return (
                <div key="sos-slot" className="relative h-full">
                  <button
                    type="button"
                    onClick={() => openSos()}
                    aria-label="Send an emergency assistance request"
                    className="fab-ring absolute -top-[52px] left-1/2 grid h-[76px] w-[76px] -translate-x-1/2 place-items-center rounded-full border border-white/15 active:scale-95"
                  >
                    <span className="absolute inset-0 animate-[sos-pulse_2.6s_ease-out_infinite] rounded-full bg-[#ff2a36]/40" />
                    <span className="fab-glow relative grid h-[58px] w-[58px] place-items-center rounded-full">
                      <AlertTriangle className="h-8 w-8 text-[#fff0ee]" />
                    </span>
                  </button>
                </div>
              );
            }

            const active = pathname === item.href;
            const { Icon } = item;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center gap-1 rounded-xl pb-1 pt-1.5 transition-colors ${
                  active ? "text-[#ff3f47]" : "text-[#ffdada]"
                }`}
              >
                <span className="relative">
                  <Icon className="h-[26px] w-[26px]" />
                  {item.href === "/notifications" && unread > 0 && (
                    <span className="absolute -right-1.5 -top-1 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-[#ff3b45] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-[#240509]">
                      {unread}
                    </span>
                  )}
                </span>
                <span className="font-display text-[12px] uppercase leading-none tracking-[0.06em]">
                  {item.label}
                </span>
                {active && index !== 0 && (
                  <span className="absolute -top-px h-[2px] w-8 rounded-full bg-[#ff3f47]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      <SosOverlay />
    </>
  );
}
