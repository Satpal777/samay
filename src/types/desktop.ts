import type { ReactNode } from "react";

export type DockAppName = "Timer" | "Stopwatch" | "History";

export interface DockApp {
  name: DockAppName;
  gradient: string;
  icon: ReactNode;
}

export interface WindowState {
  id: DockAppName;
  isMinimized: boolean;
  isFullscreen: boolean;
  zIndex: number;
}
