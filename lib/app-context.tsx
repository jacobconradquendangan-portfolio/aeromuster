"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  alertKinds,
  initialNotices,
  seededAdminLog,
  seededAlerts,
  sosCategories,
  type AdminLogEntry,
  type AirportAlert,
  type AlertKind,
  type AlertSeverity,
  type Notice,
  type Role,
  type SosRequest,
  type SosStatus,
} from "@/lib/data";

type Settings = { alerts: boolean; largeText: boolean };

export type NewAlertInput = {
  kind: AlertKind;
  severity: AlertSeverity;
  headline: string;
  instructions: string;
  area: string;
  source: string;
  test: boolean;
};

export type NewSosInput = {
  categoryId: string;
  description: string;
  location: string;
  notifyContact: boolean;
};

type SosState = { open: boolean; categoryId?: string };

type AppState = {
  notices: Notice[];
  unread: number;
  markAllRead: () => void;
  settings: Settings;
  toggleSetting: (key: keyof Settings) => void;
  alerts: AirportAlert[];
  adminLog: AdminLogEntry[];
  publishAlert: (input: NewAlertInput) => AirportAlert;
  acknowledgeAlert: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  sosRequests: SosRequest[];
  createSosRequest: (input: NewSosInput) => SosRequest;
  cancelSosRequest: (id: string) => void;
  sosOpen: boolean;
  sosCategoryId?: string;
  openSos: (categoryId?: string) => void;
  closeSos: () => void;
  resetDemoData: () => void;
};

const AppContext = createContext<AppState | null>(null);

const defaultSettings: Settings = { alerts: true, largeText: false };

function stamp(): string {
  const now = new Date();
  return `Today · ${now.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
}

function reference(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `AERO-${year}-${suffix}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [alerts, setAlerts] = useState<AirportAlert[]>(seededAlerts);
  const [adminLog, setAdminLog] = useState<AdminLogEntry[]>(seededAdminLog);
  const [role, setRole] = useState<Role>("passenger");
  const [sosRequests, setSosRequests] = useState<SosRequest[]>([]);
  const [sosState, setSosState] = useState<SosState>({ open: false });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", settings.largeText);
  }, [settings.largeText]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const markAllRead = useCallback(() => {
    setNotices((list) => list.map((notice) => ({ ...notice, read: true })));
  }, []);

  const toggleSetting = useCallback((key: keyof Settings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts((list) =>
      list.map((alert) =>
        alert.id === id && !alert.acknowledged
          ? { ...alert, acknowledged: true, ackCount: Math.min(alert.reached, alert.ackCount + 1) }
          : alert,
      ),
    );
  }, []);

  const publishAlert = useCallback((input: NewAlertInput): AirportAlert => {
    const kind = alertKinds.find((item) => item.id === input.kind);
    const alert: AirportAlert = {
      id: `alert-${Date.now()}`,
      kind: input.kind,
      kindLabel: kind?.label ?? "Alert",
      severity: input.severity,
      headline: input.headline.trim(),
      instructions: input.instructions.trim(),
      area: input.area.trim() || "Terminal 3",
      source: input.source.trim() || kind?.defaultSource || "CRK Airport Operations",
      issuedAt: stamp(),
      test: input.test,
      acknowledged: false,
      reached: input.test ? 1480 : 2130,
      ackCount: 0,
    };

    setAlerts((list) => [alert, ...list]);
    setAdminLog((log) => [
      {
        id: `log-${Date.now()}`,
        at: alert.issuedAt,
        actor: "M. Santos · Alert administrator",
        action: input.test ? "Sent test alert" : "Published alert",
        detail: `${alert.headline} · ${alert.area}`,
      },
      ...log,
    ]);
    setNotices((list) => [
      {
        id: `n-${alert.id}`,
        title: alert.headline,
        body: alert.instructions,
        time: "Just now",
        category: alert.severity === "info" ? "Notice" : "Emergency",
        read: false,
      },
      ...list,
    ]);
    return alert;
  }, []);

  const scheduleStatus = useCallback((id: string, status: SosStatus, delay: number) => {
    const timer = window.setTimeout(() => {
      setSosRequests((list) =>
        list.map((request) =>
          request.id === id && request.status !== "cancelled" ? { ...request, status } : request,
        ),
      );
    }, delay);
    timers.current.push(timer);
  }, []);

  const createSosRequest = useCallback(
    (input: NewSosInput): SosRequest => {
      const category = sosCategories.find((item) => item.id === input.categoryId) ?? sosCategories[5];
      const request: SosRequest = {
        id: `sos-${Date.now()}`,
        ref: reference(),
        categoryId: category.id,
        categoryLabel: category.label,
        routedTo: category.routedTo,
        description: input.description.trim(),
        location: input.location.trim() || "Terminal 3",
        notifyContact: input.notifyContact,
        createdAt: stamp(),
        status: "received",
      };
      setSosRequests((list) => [request, ...list]);
      scheduleStatus(request.id, "acknowledged", 4200);
      scheduleStatus(request.id, "assigned", 9500);
      return request;
    },
    [scheduleStatus],
  );

  const cancelSosRequest = useCallback((id: string) => {
    setSosRequests((list) =>
      list.map((request) =>
        request.id === id ? { ...request, status: "cancelled" as const } : request,
      ),
    );
  }, []);

  const openSos = useCallback((categoryId?: string) => {
    setSosState({ open: true, categoryId });
  }, []);

  const closeSos = useCallback(() => {
    setSosState((current) => ({ ...current, open: false }));
  }, []);

  const resetDemoData = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setNotices(initialNotices);
    setAlerts(seededAlerts);
    setAdminLog(seededAdminLog);
    setSettings(defaultSettings);
    setRole("passenger");
    setSosRequests([]);
    setSosState({ open: false });
  }, []);

  const unread = notices.filter((notice) => !notice.read).length;

  const value = useMemo(
    () => ({
      notices,
      unread,
      markAllRead,
      settings,
      toggleSetting,
      alerts,
      adminLog,
      publishAlert,
      acknowledgeAlert,
      role,
      setRole,
      sosRequests,
      createSosRequest,
      cancelSosRequest,
      sosOpen: sosState.open,
      sosCategoryId: sosState.categoryId,
      openSos,
      closeSos,
      resetDemoData,
    }),
    [
      notices,
      unread,
      markAllRead,
      settings,
      toggleSetting,
      alerts,
      adminLog,
      publishAlert,
      acknowledgeAlert,
      role,
      sosRequests,
      createSosRequest,
      cancelSosRequest,
      sosState,
      openSos,
      closeSos,
      resetDemoData,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
