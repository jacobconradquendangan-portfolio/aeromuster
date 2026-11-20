"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialNotices, type Notice } from "@/lib/data";

type Settings = { alerts: boolean; largeText: boolean };

type AppState = {
  notices: Notice[];
  unread: number;
  markAllRead: () => void;
  settings: Settings;
  toggleSetting: (key: keyof Settings) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [settings, setSettings] = useState<Settings>({ alerts: true, largeText: false });

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", settings.largeText);
  }, [settings.largeText]);

  const markAllRead = useCallback(() => {
    setNotices((list) => list.map((notice) => ({ ...notice, read: true })));
  }, []);

  const toggleSetting = useCallback((key: keyof Settings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  const unread = notices.filter((notice) => !notice.read).length;

  const value = useMemo(
    () => ({ notices, unread, markAllRead, settings, toggleSetting }),
    [notices, unread, markAllRead, settings, toggleSetting],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
