import type { DockApp } from "../types/desktop";

export const DOCK_APPS: DockApp[] = [
  {
    name: "Timer",
    gradient: "from-orange-400 to-red-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
      />
    ),
  },
  {
    name: "Stopwatch",
    gradient: "from-blue-400 to-indigo-600",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="13" r="8" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 2h4m-2 0v3"
        />
      </>
    ),
  },
  {
    name: "History",
    gradient: "from-emerald-400 to-teal-600",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
      </>
    ),
  },
];
