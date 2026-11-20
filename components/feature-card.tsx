"use client";

import Link from "next/link";
import { ChevronRight } from "@/components/icons";

export default function FeatureCard({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="card group flex min-h-[86px] items-stretch overflow-hidden rounded-2xl transition active:scale-[.99]"
    >
      <div className="tile grid w-[84px] shrink-0 place-items-center py-3">{icon}</div>
      <div className="flex flex-1 items-center justify-between gap-2 px-4">
        <span className="font-display text-[21px] font-medium uppercase tracking-[0.12em] text-[#ffd0d0] transition group-hover:text-white">
          {label}
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-[#ffd9d9]" />
      </div>
    </Link>
  );
}
