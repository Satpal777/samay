import { useHistory } from "../../hooks/useHistory";

/** Displays completed timer and stopwatch sessions from localStorage */
export default function History() {
  const { entries, clearHistory } = useHistory();

  if (entries.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white">
        <svg
          className="h-12 w-12 text-white/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
        <p className="mt-4 text-lg font-bold text-white/40">
          No sessions yet
        </p>
        <p className="mt-1 text-sm text-white/25">
          Complete a timer or stopwatch session to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-black/20 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {entries.length} session{entries.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={clearHistory}
          className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/40 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
        >
          Clear All
        </button>
      </div>

      {/* Scrollable list */}
      <ul className="flex-1 space-y-2 overflow-auto px-4 pb-4">
        {entries.map((entry) => {
          const date = new Date(entry.completedAt);
          const timeStr = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const dateStr = date.toLocaleDateString([], {
            month: "short",
            day: "numeric",
          });

          const isTimer = entry.type === "timer";

          return (
            <li
              key={entry.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 transition hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${isTimer ? "from-orange-400 to-red-500" : "from-blue-400 to-indigo-600"}`}
                >
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    {isTimer ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6l4 2"
                        />
                        <circle cx="12" cy="13" r="8" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Info */}
                <div>
                  <p className="text-sm font-bold capitalize">
                    {entry.type}
                  </p>
                  <p className="text-[11px] text-white/35">
                    {dateStr} · {timeStr}
                    {entry.laps != null && entry.laps > 0 && (
                      <span> · {entry.laps} lap{entry.laps !== 1 ? "s" : ""}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <span className="text-lg font-black tabular-nums tracking-tight">
                {entry.display}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
