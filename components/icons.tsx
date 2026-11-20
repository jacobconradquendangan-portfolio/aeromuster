import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M3.4 10.6 12 3.4l8.6 7.2" />
      <path d="M5.6 9.4V20.4h12.8V9.4" />
      <path d="M9.8 20.4v-5.2h4.4v5.2" />
    </svg>
  );
}

export function ExploreIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M9 4 3.6 5.9v14L9 18l6 2 5.4-1.9v-14L15 6 9 4Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function BellIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M18 9a6 6 0 1 0-12 0c0 4-1.4 5.4-2 6.4h16c-.6-1-2-2.4-2-6.4Z" />
      <path d="M10 19a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}

export function ProfileIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9.7" r="3" />
      <path d="M5.9 18.6a7 7 0 0 1 12.2 0" />
    </svg>
  );
}

export function GearIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.2 13.6a7.9 7.9 0 0 0 0-3.2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2.8-1.6L13.6 2h-3.2l-.4 2.5a8 8 0 0 0-2.8 1.6l-2.4-1-2 3.4 2 1.5a7.9 7.9 0 0 0 0 3.2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 2.8 1.6l.4 2.5h3.2l.4-2.5a8 8 0 0 0 2.8-1.6l2.4 1 2-3.4-2-1.5Z" />
    </svg>
  );
}

export function ChevronRight(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.3} {...p}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDown(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.3} {...p}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function AlertTriangle(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.2} {...p}>
      <path d="M12 3 2.6 20h18.8L12 3Z" />
      <path d="M12 9.2v4.6" />
      <circle cx="12" cy="17" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlusIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.2} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function RobotIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M12 2.8v2.4" />
      <circle cx="12" cy="2.4" r="1" fill="currentColor" stroke="none" />
      <rect x="4" y="5.6" width="16" height="13" rx="3.4" />
      <circle cx="9" cy="11.6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.6" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9.4 15.2h5.2M2.4 10v4M21.6 10v4" />
    </svg>
  );
}

export function PhoneIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M6.3 3h3.1l1.8 4.6-2.3 1.5a12.6 12.6 0 0 0 6 6l1.5-2.3L21 14.6v3.1A2.3 2.3 0 0 1 18.7 20 16.7 16.7 0 0 1 4 5.3 2.3 2.3 0 0 1 6.3 3Z" />
    </svg>
  );
}

export function CheckIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.6} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function XIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.2} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CameraIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M9 4h6l1.2 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.8L9 4Zm3 4.6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
    </svg>
  );
}

export function LogoutIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M14 3.6H6.4A1.4 1.4 0 0 0 5 5v14a1.4 1.4 0 0 0 1.4 1.4H14" />
      <path d="M17 8l4 4-4 4M10 12h11" />
    </svg>
  );
}

export function ShieldCheckIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M12 2.7 20 6v6.2c0 4.4-3.3 7.8-8 9.1-4.7-1.3-8-4.7-8-9.1V6l8-3.3Z" />
      <path d="m8.4 12 2.5 2.5 4.7-5" />
    </svg>
  );
}

export function MapPinIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MegaphoneIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M4 9.5h3.2L18 4.2a1 1 0 0 1 1.5.9v13.8a1 1 0 0 1-1.5.9L7.2 14.5H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z" />
      <path d="M7 15.4 8.7 21a1 1 0 0 0 1 .7h1.6a1 1 0 0 0 1-1.4l-1.5-4.3Z" opacity=".85" />
    </svg>
  );
}

export function SendIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M3.4 4.2 21 12 3.4 19.8 3.2 13.6 15 12 3.2 10.4 3.4 4.2Z" />
    </svg>
  );
}

export function ArrowLeftIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.1} {...p}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </svg>
  );
}

export function LayersIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.8l8.5 4.7 8.5-4.7" />
    </svg>
  );
}

/* ---------- Cream-tile feature glyphs ---------- */

export function EvacuationGlyph({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect x="7" y="7" width="50" height="50" rx="4" fill="none" stroke="#a9121e" strokeWidth="2.4" />
      <rect x="13" y="13" width="38" height="38" rx="2" fill="#bf1420" />
      <circle cx="35.5" cy="20.5" r="3.6" fill="#f0e2e2" />
      <path
        d="M31 26.5l5.6 1.8 5.9-4.2 2.4 3.1-7.1 5.3-4.8-1.9-3.6 7.1 5.4 5.6 6.6-2.2 1.2 3.6-8.6 2.7-7.8-8.2 2.2-6.4-3.4 4.4-3.2-2.4 5.8-7.9 3.4-.4Z"
        fill="#f4e8e8"
      />
    </svg>
  );
}

export function ServicesGlyph({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <circle cx="32" cy="32" r="24" fill="#bf1420" />
      <path
        d="M21.5 18.5c3.2 0 4.8 1.4 5.8 5.2l1.3 4.3c.4 1.4-.1 2.7-1.3 3.5l-3 2c2.7 5.3 6.7 9.3 12 12l2-3c.8-1.2 2.1-1.7 3.5-1.3l4.3 1.3c3.8 1 5.2 2.6 5.2 5.8 0 4.6-3.5 7.2-8.4 6.7C30.2 53 14.5 37.3 13.5 24.7 13 19.8 16.9 18.5 21.5 18.5Z"
        fill="#efe1e1"
      />
      <circle cx="45" cy="43" r="8.5" fill="#efe1e1" />
      <path d="M45 38.5v9M40.5 43h9" stroke="#bf1420" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function RecoveryGlyph({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <circle
        cx="32"
        cy="32"
        r="23"
        fill="none"
        stroke="#bf1420"
        strokeWidth="2.6"
        strokeDasharray="4.5 3.2"
        strokeLinecap="round"
      />
      <path d="M32 16.5 46 42.5H18L32 16.5Z" fill="#bf1420" />
      <path d="M32 26v7.6" stroke="#f2e6e6" strokeWidth="2.9" strokeLinecap="round" />
      <circle cx="32" cy="38" r="1.9" fill="#f2e6e6" />
      <path d="M43 45.5c2.6 2.4 4.3 4.6 5.4 7.4" stroke="#bf1420" strokeWidth="2.6" strokeLinecap="round" />
      <path d="m46.4 49.9 2.2 3.1 3.5-1.2" fill="none" stroke="#bf1420" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
