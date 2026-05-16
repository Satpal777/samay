import { useState } from "react"

function Timer() {
  const [start,setStarted] = useState(false);
  const [timer, setTimer] = useState(5 * 60); 
  const minutes = Math.floor(timer / 60);
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl bg-black/20 text-white'>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Timer</p>
      <div className="mt-4 text-7xl font-black tabular-nums tracking-tight">
        {minutes}:{seconds}
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => setStarted((value) => !value)}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85"
        >
          {start ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => setTimer(5 * 60)}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Timer
