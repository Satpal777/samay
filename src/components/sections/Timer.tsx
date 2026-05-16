import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { useHistory } from "../../hooks/useHistory";

const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const DEFAULT_HOURS = 0;
const DEFAULT_MINUTES = 5;
const DEFAULT_SECONDS = 0;

/** Quick-add presets shown as pill buttons */
const QUICK_ADD_PRESETS = [
  { label: "+30s", seconds: 30 },
  { label: "+1m", seconds: 60 },
  { label: "+5m", seconds: 300 },
  { label: "+10m", seconds: 600 },
] as const;

const MAX_TOTAL = MAX_HOURS * 3600 + MAX_MINUTES * 60 + MAX_SECONDS;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function totalToHms(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { h, m, s };
}

function hmsToTotal(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s;
}

/** A countdown timer with editable HH:MM:SS fields and quick-add presets */
export default function Timer() {
  const { addEntry } = useHistory();
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(
    hmsToTotal(DEFAULT_HOURS, DEFAULT_MINUTES, DEFAULT_SECONDS)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startDurationRef = useRef(0);

  const [inputH, setInputH] = useState(pad(DEFAULT_HOURS));
  const [inputM, setInputM] = useState(pad(DEFAULT_MINUTES));
  const [inputS, setInputS] = useState(pad(DEFAULT_SECONDS));

  const { h: runH, m: runM, s: runS } = totalToHms(remaining);

  // --- Timer engine ---

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
            const dur = startDurationRef.current;
            const { h, m, s } = totalToHms(dur);
            addEntry({
              type: "timer",
              duration: dur,
              display: `${pad(h)}:${pad(m)}:${pad(s)}`,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, remaining, clearTimer, addEntry]);

  // Sync input fields when timer stops
  useEffect(() => {
    if (!isRunning) {
      const { h, m, s } = totalToHms(remaining);
      setInputH(pad(h));
      setInputM(pad(m));
      setInputS(pad(s));
    }
  }, [isRunning, remaining]);

  // --- Input handlers ---

  const handleChange = useCallback(
    (field: "h" | "m" | "s") => (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
      if (field === "h") setInputH(raw);
      if (field === "m") setInputM(raw);
      if (field === "s") setInputS(raw);
    },
    []
  );

  const commitInput = useCallback(
    (field: "h" | "m" | "s") => (_e: FocusEvent<HTMLInputElement>) => {
      const rawH = field === "h" ? _e.target.value : inputH;
      const rawM = field === "m" ? _e.target.value : inputM;
      const rawS = field === "s" ? _e.target.value : inputS;

      const h = clamp(parseInt(rawH, 10) || 0, 0, MAX_HOURS);
      const m = clamp(parseInt(rawM, 10) || 0, 0, MAX_MINUTES);
      const s = clamp(parseInt(rawS, 10) || 0, 0, MAX_SECONDS);

      setInputH(pad(h));
      setInputM(pad(m));
      setInputS(pad(s));
      setRemaining(hmsToTotal(h, m, s));
    },
    [inputH, inputM, inputS]
  );

  // --- Actions ---

  const totalFromInputs = hmsToTotal(
    parseInt(inputH, 10) || 0,
    parseInt(inputM, 10) || 0,
    parseInt(inputS, 10) || 0
  );

  const handleToggle = useCallback(() => {
    if (!isRunning) {
      const h = clamp(parseInt(inputH, 10) || 0, 0, MAX_HOURS);
      const m = clamp(parseInt(inputM, 10) || 0, 0, MAX_MINUTES);
      const s = clamp(parseInt(inputS, 10) || 0, 0, MAX_SECONDS);
      const total = hmsToTotal(h, m, s);
      if (total === 0) return;
      setRemaining(total);
      startDurationRef.current = total;
    }
    setIsRunning((prev) => !prev);
  }, [isRunning, inputH, inputM, inputS]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    const def = hmsToTotal(DEFAULT_HOURS, DEFAULT_MINUTES, DEFAULT_SECONDS);
    setRemaining(def);
    setInputH(pad(DEFAULT_HOURS));
    setInputM(pad(DEFAULT_MINUTES));
    setInputS(pad(DEFAULT_SECONDS));
  }, []);

  const handleQuickAdd = useCallback(
    (addSeconds: number) => {
      if (isRunning) {
        setRemaining((prev) => Math.min(prev + addSeconds, MAX_TOTAL));
      } else {
        const clamped = Math.min(totalFromInputs + addSeconds, MAX_TOTAL);
        const { h, m, s } = totalToHms(clamped);
        setInputH(pad(h));
        setInputM(pad(m));
        setInputS(pad(s));
        setRemaining(clamped);
      }
    },
    [isRunning, totalFromInputs]
  );

  const canStart = !isRunning && totalFromInputs > 0;
  const isFinished = !isRunning && remaining === 0 && totalFromInputs === 0;

  const inputClass =
    "w-[4.5rem] bg-transparent text-center font-black tabular-nums tracking-tight text-white outline-none transition-colors focus:text-orange-400";
  const separatorClass = "text-white/30 font-black";
  const fontSize = "text-5xl sm:text-6xl";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white">

      {/* Time display */}
      <div
        className={`mt-4 flex items-center justify-center ${fontSize}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {isRunning ? (
          <>
            <span className="inline-block w-[4.5rem] text-center font-black tabular-nums">{pad(runH)}</span>
            <span className={`${separatorClass} animate-pulse`}>:</span>
            <span className="inline-block w-[4.5rem] text-center font-black tabular-nums">{pad(runM)}</span>
            <span className={`${separatorClass} animate-pulse`}>:</span>
            <span className="inline-block w-[4.5rem] text-center font-black tabular-nums">{pad(runS)}</span>
          </>
        ) : (
          <>
            <input
              type="text"
              inputMode="numeric"
              value={inputH}
              onChange={handleChange("h")}
              onBlur={commitInput("h")}
              onFocus={(e) => e.target.select()}
              className={`${inputClass} ${fontSize}`}
              aria-label="Hours"
              maxLength={2}
            />
            <span className={separatorClass}>:</span>
            <input
              type="text"
              inputMode="numeric"
              value={inputM}
              onChange={handleChange("m")}
              onBlur={commitInput("m")}
              onFocus={(e) => e.target.select()}
              className={`${inputClass} ${fontSize}`}
              aria-label="Minutes"
              maxLength={2}
            />
            <span className={separatorClass}>:</span>
            <input
              type="text"
              inputMode="numeric"
              value={inputS}
              onChange={handleChange("s")}
              onBlur={commitInput("s")}
              onFocus={(e) => e.target.select()}
              className={`${inputClass} ${fontSize}`}
              aria-label="Seconds"
              maxLength={2}
            />
          </>
        )}
      </div>

      {/* Labels */}
      <div className="mt-1 flex text-[10px] uppercase tracking-widest text-white/30">
        <span className="w-[4.5rem] text-center">hrs</span>
        <span className="w-3" />
        <span className="w-[4.5rem] text-center">min</span>
        <span className="w-3" />
        <span className="w-[4.5rem] text-center">sec</span>
      </div>

      {/* Quick-add presets */}
      <div className="mt-5 flex gap-2">
        {QUICK_ADD_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handleQuickAdd(preset.seconds)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleToggle}
          disabled={!canStart && !isRunning}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-40"
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

      {/* Finished indicator */}
      {isFinished && (
        <p className="mt-4 animate-pulse text-sm font-semibold text-orange-400">
          Time&apos;s up!
        </p>
      )}
    </div>
  );
}
