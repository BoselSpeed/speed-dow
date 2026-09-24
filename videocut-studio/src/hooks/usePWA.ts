"use client";

import { useState, useEffect, useCallback } from "react";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  preventDefault(): void;
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOffline: boolean;
  needsUpdate: boolean;
  promptInstall: (() => Promise<void>) | null;
}

export function usePWA(): PWAState {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [promptInstall, setPromptInstall] = useState<(() => Promise<void>) | null>(null);

  const registerServiceWorker = useCallback(async () => {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      return registration;
    } catch {
      // ignore
    }
  }, []);

  const checkIfInstalled = useCallback(() => {
    if (typeof window === "undefined") return false;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    return isStandalone || isIOSStandalone;
  }, []);

  const handleOfflineStatus = useCallback(() => {
    setIsOffline(!navigator.onLine);
  }, []);

  const handleInstallPrompt = useCallback((e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    setPromptInstall(async () => {
      await e.prompt();
      const result = await e.userChoice;
      if (result.outcome === "accepted") {
        setIsInstallable(false);
      }
    });
    setIsInstallable(true);
  }, []);

  const handleAppInstalled = useCallback(() => {
    setIsInstalled(true);
    setIsInstallable(false);
  }, []);

  const checkForUpdates = useCallback(async () => {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting || registration.installing) {
        setNeedsUpdate(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const install = useCallback(async () => {
    if (promptInstall) {
      await promptInstall();
      setPromptInstall(null);
    }
  }, [promptInstall]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsInstalled(checkIfInstalled());
    handleOfflineStatus();
    window.addEventListener("online", handleOfflineStatus);
    window.addEventListener("offline", handleOfflineStatus);
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    void registerServiceWorker();
    const interval = setInterval(checkForUpdates, 60000);
    return () => {
      window.removeEventListener("online", handleOfflineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearInterval(interval);
    };
  }, [checkIfInstalled, handleInstallPrompt, handleOfflineStatus, handleAppInstalled, registerServiceWorker, checkForUpdates]);

  return {
    isInstalled,
    isInstallable,
    isOffline,
    needsUpdate,
    promptInstall: install,
  };
}
