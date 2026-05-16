import { DOCK_APPS } from "../../constants/dock-apps";
import type { DockAppName, WindowState } from "../../types/desktop";
import DockItem from "./DockItem";

interface DockProps {
  windows: WindowState[];
  activeZ: number;
  hasFullscreenWindow: boolean;
  onOpenApp: (name: DockAppName) => void;
}

/** macOS-style application dock with magnification effect */
export default function Dock({
  windows,
  activeZ,
  hasFullscreenWindow,
  onOpenApp,
}: DockProps) {
  return (
    <nav
      className={`absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300 ${hasFullscreenWindow ? "pointer-events-none translate-y-24 opacity-0" : "translate-y-0 opacity-100"}`}
      aria-label="Application dock"
    >
      {DOCK_APPS.map((app) => {
        const isOpen = windows.some((w) => w.id === app.name);
        const isActive = windows.some(
          (w) =>
            w.id === app.name && w.zIndex === activeZ && !w.isMinimized
        );

        return (
          <DockItem
            key={app.name}
            app={app}
            isOpen={isOpen}
            isActive={isActive}
            onOpen={() => onOpenApp(app.name)}
          />
        );
      })}
    </nav>
  );
}
