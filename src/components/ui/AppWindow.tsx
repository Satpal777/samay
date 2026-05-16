import { motion } from "motion/react";
import type { RefObject } from "react";
import { WINDOW_VARIANTS } from "../../constants/animations";
import type { DockAppName, WindowState } from "../../types/desktop";
import History from "../sections/History";
import Stopwatch from "../sections/Stopwatch";
import Timer from "../sections/Timer";
import WindowControls from "./WindowControls";

/** Maps app names to their component. Keeps rendering logic declarative. */
const APP_COMPONENTS: Record<DockAppName, React.FC> = {
  Timer,
  Stopwatch,
  History,
};

interface AppWindowProps {
  window: WindowState;
  screenRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
  onFocus: () => void;
}

/** A draggable, resizable macOS-style application window */
export default function AppWindow({
  window: w,
  screenRef,
  onClose,
  onMinimize,
  onFullscreen,
  onFocus,
}: AppWindowProps) {
  const isDraggable = !w.isFullscreen && !w.isMinimized;

  const animateState = w.isMinimized
    ? WINDOW_VARIANTS.minimized
    : w.isFullscreen
      ? WINDOW_VARIANTS.fullscreen
      : WINDOW_VARIANTS.normal;

  const AppContent = APP_COMPONENTS[w.id];

  return (
    <motion.div
      drag={isDraggable}
      dragConstraints={screenRef}
      dragElastic={0}
      dragMomentum={false}
      onPointerDown={onFocus}
      initial={WINDOW_VARIANTS.initial}
      animate={animateState}
      exit={WINDOW_VARIANTS.exit}
      style={{ zIndex: w.zIndex }}
      className={`absolute flex flex-col overflow-hidden border border-white/20 bg-black/35 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${w.isMinimized ? "pointer-events-none" : ""}`}
      role="dialog"
      aria-label={`${w.id} application window`}
    >
      {/* Title bar */}
      <header className="flex h-11 shrink-0 cursor-grab items-center justify-between border-b border-white/10 bg-white/10 px-4 active:cursor-grabbing">
        <WindowControls
          onClose={onClose}
          onMinimize={onMinimize}
          onFullscreen={onFullscreen}
        />

        <span className="select-none text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          {w.id}
        </span>

        {/* Spacer to center the title */}
        <div className="w-14" aria-hidden="true" />
      </header>

      {/* App content area */}
      <div
        className="flex-1 overflow-auto p-5"
        onPointerDown={(e) => e.stopPropagation()}
        style={{ cursor: "default" }}
      >
        <AppContent />
      </div>
    </motion.div>
  );
}
