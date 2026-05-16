function Navbar() {
    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-emerald-400/10 bg-slate-950/75 px-6 py-4 text-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(45,212,191,0.35)]">
                Samay
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-inner shadow-white/5">
                <ul className="flex items-center gap-1 text-sm font-semibold text-slate-300">
                    <li className="group cursor-pointer rounded-full px-4 py-2 transition-all duration-300 hover:bg-emerald-400/10 hover:text-emerald-200 hover:shadow-[0_0_24px_rgba(52,211,153,0.18)]">
                        <a>Timer ⏰</a>
                    </li>
                    <li className="group cursor-pointer rounded-full px-4 py-2 transition-all duration-300 hover:bg-teal-400/10 hover:text-teal-200 hover:shadow-[0_0_24px_rgba(45,212,191,0.18)]">
                        <a>Stopwatch ⏳</a>
                    </li>
                </ul>
            </div>
            <div className="cursor-pointer rounded-full border border-emerald-300/20 bg-gradient-to-br from-emerald-300/15 via-teal-300/10 to-white/5 px-4 py-2 text-sm font-bold text-emerald-100 shadow-[0_0_28px_rgba(16,185,129,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_0_34px_rgba(16,185,129,0.24)]">
                History
            </div>
        </nav>
    )
}

export default Navbar
