/** Shared easing curve used across the MacBook entrance animations */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Default inset for windowed (non-fullscreen) app windows */
export const WINDOW_INSET = "15%";

/** Animation variants for app windows */
export const WINDOW_VARIANTS = {
  initial: {
    opacity: 0,
    scale: 0.5,
    y: 200,
    top: "15%",
    bottom: "15%",
    left: "15%",
    right: "15%",
  },
  minimized: {
    opacity: 0,
    scale: 0.4,
    y: 400,
    x: 0,
    top: "15%",
    bottom: "15%",
    left: "15%",
    right: "15%",
    transition: { type: "spring" as const, bounce: 0.1, duration: 0.4 },
  },
  fullscreen: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    top: "0%",
    bottom: "0%",
    left: "0%",
    right: "0%",
    borderRadius: 0,
    transition: { type: "spring" as const, bounce: 0.1, duration: 0.5 },
  },
  normal: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    top: "15%",
    bottom: "15%",
    left: "15%",
    right: "15%",
    borderRadius: 24,
    transition: { type: "spring" as const, bounce: 0.2, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
} as const;

/** Spring config for dock icon hover/tap */
export const DOCK_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 20,
};
