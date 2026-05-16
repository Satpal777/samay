export interface SessionLog {
  id: string;
  type: "timer" | "stopwatch";
  /** Duration in seconds for timer, milliseconds for stopwatch */
  duration: number;
  /** Formatted duration string for display */
  display: string;
  /** ISO timestamp of when the session was completed */
  completedAt: string;
  /** Number of laps (stopwatch only) */
  laps?: number;
}
