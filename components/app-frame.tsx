"use client";

import { AppProvider } from "@/lib/app-context";
import BottomNav from "@/components/bottom-nav";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="relative flex min-h-dvh w-full justify-center bg-[#0c0204]">
        {/* Fixed artwork tuned to the app column, so it stays put while pages scroll */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 left-1/2 z-0 w-full max-w-[440px] -translate-x-1/2 overflow-hidden bg-[#26060b]"
        >
          <div
            className="absolute inset-0 bg-cover bg-top opacity-95"
            style={{ backgroundImage: "url(/img/bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1d0408]/55 via-[#2a0509]/75 to-[#3b070d]/70" />
          <div className="fire-glow absolute inset-x-0 bottom-0 h-72" />
          <div className="ember absolute bottom-24 left-[12%] h-2 w-2 animate-pulse rounded-full opacity-70" />
          <div className="ember absolute bottom-40 right-[18%] h-1.5 w-1.5 animate-pulse rounded-full opacity-60" />
          <div className="ember absolute bottom-56 left-[68%] h-1 w-1 animate-pulse rounded-full opacity-50" />
        </div>

        <div className="relative z-10 flex min-h-dvh w-full max-w-[440px] flex-col border-x border-white/5">
          <div className="flex-1 pb-32">{children}</div>
          <BottomNav />
        </div>
      </div>
    </AppProvider>
  );
}
