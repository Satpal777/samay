import { motion } from "motion/react";
import { DOCK_SPRING } from "../../constants/animations";
import type { DockApp } from "../../types/desktop";

interface DockItemProps {
  app: DockApp;
  isOpen: boolean;
  isActive: boolean;
  onOpen: () => void;
}

/** A single dock icon with hover magnification and active indicator */
export default function DockItem({
  app,
  isOpen,
  isActive,
  onOpen,
}: DockItemProps) {
  return (
    <div className="group relative flex flex-col items-center">
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.35, y: -14 }}
        whileTap={{ scale: 0.95 }}
        transition={DOCK_SPRING}
        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border bg-gradient-to-br ${app.gradient} shadow-lg transition ${isActive ? "border-white/70 ring-2 ring-white/30" : "border-white/20"}`}
        aria-label={`Open ${app.name}`}
      >
        <svg
          className="pointer-events-none h-6 w-6 text-white drop-shadow-md"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          {app.icon}
        </svg>
      </motion.button>

      {/* Tooltip */}
      <span
        className="absolute -top-10 hidden whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md group-hover:block"
        role="tooltip"
      >
        {app.name}
      </span>

      {/* Open indicator dot */}
      {isOpen && (
        <span
          className="mt-2 h-1 w-1 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
