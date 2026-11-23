"use client";

import { useEffect, type ReactNode } from "react";
import { XIcon } from "@/components/icons";

export default function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 animate-[fade-in_.2s_ease-out] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-[92dvh] w-full max-w-[440px] animate-[sheet-in_.3s_cubic-bezier(.2,.8,.2,1)] flex-col rounded-t-3xl border-t border-white/10 bg-[#28060b] shadow-[0_-24px_60px_rgba(0,0,0,.85)] ${className}`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/25" />
        <div className="flex items-start gap-3 px-5 pb-3 pt-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.08em] text-[#ffd9d9]">
              {title}
            </h2>
            {subtitle && <p className="mt-0.5 text-xs text-[#e0b3b3]">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-[#ffd9d9] active:scale-95"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+20px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
