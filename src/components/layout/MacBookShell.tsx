import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "../../constants/animations";

interface MacBookShellProps {
  children: ReactNode;
}

/** The physical MacBook Pro hardware shell — bezel, hinge, base, and shadows */
export default function MacBookShell({ children }: MacBookShellProps) {
  return (
    <motion.div
      className="relative flex w-full max-w-6xl flex-col items-center [perspective:2400px]"
      initial={{ y: 28, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[26rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#831C91]/20 blur-[130px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-1/2 top-[58%] h-[16rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#FF70BF]/10 blur-[110px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      />

      {/* Lid / Display */}
      <motion.div
        className="relative z-20 aspect-[1.55] w-full max-w-[60rem] origin-bottom rounded-t-[2rem] rounded-b-xl border-[5px] border-[#c9c9ce] bg-[#050507] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_70px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(0,0,0,0.9)] [backface-visibility:hidden] [transform-style:preserve-3d] sm:rounded-t-[2.6rem] sm:p-6"
        initial={{ y: 18, opacity: 0, rotateX: -4 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
      >
        {/* Bezel inner shadow */}
        <div
          className="absolute inset-0 rounded-t-[1.7rem] rounded-b-lg shadow-[inset_0_1px_3px_rgba(255,255,255,0.22),inset_0_-1px_3px_rgba(0,0,0,0.8)] sm:rounded-t-[2.25rem]"
          aria-hidden="true"
        />

        {/* Camera notch */}
        <div
          className="absolute left-1/2 top-2 z-30 h-4 w-28 -translate-x-1/2 rounded-b-2xl bg-[#050507] sm:h-5 sm:w-36"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-black bg-[#15171d] shadow-[inset_0_0_2px_rgba(125,211,252,0.9)]" />
        </div>

        {/* Screen content slot */}
        {children}

        {/* Brand label */}
        <div className="absolute bottom-2 left-0 flex w-full justify-center">
          <span className="text-[0.62rem] font-bold tracking-[0.28em] text-[#8d8d92]">
            Samay
          </span>
        </div>
      </motion.div>

      {/* Hinge + Base */}
      <LaptopBase />
    </motion.div>
  );
}

/** The bottom half — hinge, trackpad cutout, and shadows */
function LaptopBase() {
  return (
    <div className="relative z-30 -mt-[0.42rem] flex w-full max-w-[66rem] flex-col items-center [transform-style:preserve-3d]">
      {/* Hinge shadow */}
      <motion.div
        className="pointer-events-none absolute -top-5 left-1/2 z-20 h-7 w-[78%] -translate-x-1/2 rounded-full bg-black/60 blur-md"
        initial={{ opacity: 0, scaleX: 0.75 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      />

      {/* Hinge bar */}
      <div className="relative z-30 h-5 w-full overflow-hidden rounded-t-2xl border-t border-white bg-[#f0f0f2] shadow-[0_-8px_18px_rgba(255,255,255,0.14),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-7px_10px_rgba(135,135,142,0.28)]">
        <div className="absolute left-1/2 top-0 h-[0.32rem] w-[56%] -translate-x-1/2 rounded-b-full bg-zinc-500/18 blur-[1px]" />
        <div className="absolute left-8 top-0 h-full w-32 rounded-tl-2xl bg-white/65 blur-sm" />
        <div className="absolute right-8 top-0 h-full w-32 rounded-tr-2xl bg-zinc-400/15 blur-sm" />
      </div>

      {/* Base / palm rest */}
      <div className="relative h-9 w-full overflow-hidden rounded-b-[2.2rem] border-t border-white/55 bg-[#d2d2d7] shadow-[0_24px_50px_rgba(0,0,0,0.82),inset_0_1px_0_rgba(255,255,255,0.86),inset_0_-17px_20px_rgba(86,86,94,0.28)]">
        <div className="absolute inset-x-0 top-0 h-3 bg-white/38" />
        <div className="absolute left-1/2 top-0 h-3.5 w-40 -translate-x-1/2 rounded-b-xl bg-[#9f9fa6] shadow-[inset_0_2px_6px_rgba(48,48,54,0.58),0_1px_0_rgba(255,255,255,0.42)]" />
        <div className="absolute bottom-1 left-20 right-20 h-px rounded-full bg-white/45 blur-[1px]" />
      </div>

      {/* Drop shadows */}
      <motion.div
        className="absolute top-[75%] h-9 w-[86%] rounded-full bg-black/80 blur-xl"
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[95%] h-24 w-[96%] rounded-full bg-black/55 blur-3xl"
        initial={{ opacity: 0, scaleX: 0.65 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.15, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      />
    </div>
  );
}
