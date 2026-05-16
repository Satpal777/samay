/** Placeholder for the History feature — shows session history */
export default function History() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
        History
      </p>
      <p className="mt-4 text-3xl font-black">No sessions yet</p>
      <p className="mt-2 text-sm text-white/40">
        Complete a timer or stopwatch session to see it here.
      </p>
    </div>
  );
}
