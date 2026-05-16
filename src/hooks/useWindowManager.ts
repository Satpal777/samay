import { useCallback, useMemo, useState } from "react";
import type { DockAppName, WindowState } from "../types/desktop";

const BASE_Z_INDEX = 10;

/**
 * Manages the window lifecycle for the macOS-style desktop.
 * Handles open, close, minimize, fullscreen, and focus operations.
 */
export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeZ, setActiveZ] = useState(BASE_Z_INDEX);

  const getNextZ = useCallback(() => {
    const next = activeZ + 1;
    setActiveZ(next);
    return next;
  }, [activeZ]);

  const openApp = useCallback(
    (name: DockAppName) => {
      const nextZ = getNextZ();
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === name);
        if (existing) {
          return prev.map((w) =>
            w.id === name ? { ...w, isMinimized: false, zIndex: nextZ } : w
          );
        }
        return [
          ...prev,
          { id: name, isMinimized: false, isFullscreen: false, zIndex: nextZ },
        ];
      });
    },
    [getNextZ]
  );

  const closeApp = useCallback((name: DockAppName) => {
    setWindows((prev) => prev.filter((w) => w.id !== name));
  }, []);

  const toggleMinimize = useCallback((name: DockAppName) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === name ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
  }, []);

  const toggleFullscreen = useCallback(
    (name: DockAppName) => {
      const nextZ = getNextZ();
      setWindows((prev) =>
        prev.map((w) =>
          w.id === name
            ? { ...w, isFullscreen: !w.isFullscreen, zIndex: nextZ }
            : w
        )
      );
    },
    [getNextZ]
  );

  const focusApp = useCallback(
    (name: DockAppName) => {
      const nextZ = getNextZ();
      setWindows((prev) =>
        prev.map((w) => (w.id === name ? { ...w, zIndex: nextZ } : w))
      );
    },
    [getNextZ]
  );

  const hasFullscreenWindow = useMemo(
    () => windows.some((w) => w.isFullscreen && !w.isMinimized),
    [windows]
  );

  return {
    windows,
    activeZ,
    hasFullscreenWindow,
    openApp,
    closeApp,
    toggleMinimize,
    toggleFullscreen,
    focusApp,
  } as const;
}
