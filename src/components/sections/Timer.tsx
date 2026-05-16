import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_MINUTES = 5;
const SECONDS_PER_MINUTE = 60;
const DEFAULT_DURATION = DEFAULT_MINUTES * SECONDS_PER_MINUTE;

/** A countdown timer with start/pause and reset controls */
export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(DEFAULT_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minutes = Math.floor(remaining / SECONDS_PER_MINUTE);
  const seconds = String(remaining % SECONDS_PER_MINUTE).padStart(2, "0");

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, remaining, clearTimer]);

  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setRemaining(DEFAULT_DURATION);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
        Timer
      </p>

      <div
        className="mt-4 text-7xl font-black tabular-nums tracking-tight"
        aria-live="polite"
        aria-atomic="true"
      >
        {minutes}:{seconds}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={handleToggle}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
