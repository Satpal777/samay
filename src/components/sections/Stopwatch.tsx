import { useCallback, useEffect, useRef, useState } from "react";

/** A stopwatch with start/pause, lap, and reset controls */
export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearStopwatch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 10);
      }, 10);
    }
    return clearStopwatch;
  }, [isRunning, clearStopwatch]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
  };

  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleLap = useCallback(() => {
    setLaps((prev) => [elapsed, ...prev]);
  }, [elapsed]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
        Stopwatch
      </p>

      <div
        className="mt-4 text-6xl font-black tabular-nums tracking-tight"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatTime(elapsed)}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={handleToggle}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        {elapsed > 0 && isRunning && (
          <button
            onClick={handleLap}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Lap
          </button>
        )}
        {elapsed > 0 && !isRunning && (
          <button
            onClick={handleReset}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Reset
          </button>
        )}
      </div>

      {laps.length > 0 && (
        <div className="mt-6 max-h-32 w-full max-w-xs overflow-auto">
          <ul className="space-y-1">
            {laps.map((lap, i) => (
              <li
                key={`lap-${laps.length - i}`}
                className="flex justify-between rounded-lg bg-white/5 px-4 py-1.5 text-xs"
              >
                <span className="text-white/50">
                  Lap {laps.length - i}
                </span>
                <span className="tabular-nums font-semibold">
                  {formatTime(lap)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
