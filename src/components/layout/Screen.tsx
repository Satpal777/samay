import { AnimatePresence, motion } from "motion/react";
import type { RefObject } from "react";
import bgImg from "../../assets/bg.png";
import type { WindowState } from "../../types/desktop";
import AppWindow from "../ui/AppWindow";
import Dock from "../ui/Dock";
import type { DockAppName } from "../../types/desktop";

interface ScreenProps {
  screenRef: RefObject<HTMLDivElement | null>;
  windows: WindowState[];
  activeZ: number;
  hasFullscreenWindow: boolean;
  onOpenApp: (name: DockAppName) => void;
  onCloseApp: (name: DockAppName) => void;
  onMinimize: (name: DockAppName) => void;
  onFullscreen: (name: DockAppName) => void;
  onFocus: (name: DockAppName) => void;
}

/** The inner screen area of the MacBook — wallpaper, windows, and dock */
export default function Screen({
  screenRef,
  windows,
  activeZ,
  hasFullscreenWindow,
  onOpenApp,
  onCloseApp,
  onMinimize,
  onFullscreen,
  onFocus,
}: ScreenProps) {
  return (
    <div
      ref={screenRef}
      className="relative z-20 h-full overflow-hidden rounded-lg border border-white/10 bg-[#0c0b12] shadow-[inset_0_0_28px_rgba(0,0,0,0.85)] [transform:translateZ(2px)]"
    >
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.2 }}
      >
        {/* Wallpaper */}
        <img
          src={bgImg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        />

        {/* Application windows */}
        <AnimatePresence>
          {windows.map((w) => (
            <AppWindow
              key={w.id}
              window={w}
              screenRef={screenRef}
              onClose={() => onCloseApp(w.id)}
              onMinimize={() => onMinimize(w.id)}
              onFullscreen={() => onFullscreen(w.id)}
              onFocus={() => onFocus(w.id)}
            />
          ))}
        </AnimatePresence>

        {/* Dock */}
        <Dock
          windows={windows}
          activeZ={activeZ}
          hasFullscreenWindow={hasFullscreenWindow}
          onOpenApp={onOpenApp}
        />
      </motion.div>
    </div>
  );
}
