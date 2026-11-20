import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import AppFrame from "@/components/app-frame";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AEROMUSTER — Airport Emergency Services",
  description:
    "AEROMUSTER is the passenger safety companion for Clark International Airport: emergency maps, evacuation procedures, hotlines and recovery guidance.",
  applicationName: "AEROMUSTER",
  icons: { icon: "/img/logo.png", apple: "/img/logo.png" },
  appleWebApp: {
    capable: true,
    title: "AEROMUSTER",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a0509",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="font-sans">
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
