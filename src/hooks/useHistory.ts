import { useCallback, useSyncExternalStore } from "react";
import type { SessionLog } from "../types/history";

const STORAGE_KEY = "samay_history";
const MAX_ENTRIES = 50;

/** Subscribers for useSyncExternalStore */
const listeners = new Set<() => void>();

/** Cached snapshot to maintain referential equality between calls */
let cachedSnapshot: SessionLog[] = [];
let cachedRaw: string | null = null;

function notifyListeners() {
  // Invalidate cache so next getSnapshot reads fresh data
  cachedRaw = null;
  listeners.forEach((fn) => fn());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): SessionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Only re-parse if the raw string actually changed
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSnapshot = raw ? (JSON.parse(raw) as SessionLog[]) : [];
    }
    return cachedSnapshot;
  } catch {
    return cachedSnapshot;
  }
}

function saveEntries(entries: SessionLog[]) {
  const json = JSON.stringify(entries);
  localStorage.setItem(STORAGE_KEY, json);
  // Update cache immediately so getSnapshot returns the new value
  cachedRaw = json;
  cachedSnapshot = entries;
  notifyListeners();
}

/**
 * Shared hook for reading and writing session history to localStorage.
 * Uses useSyncExternalStore so all mounted History components
 * update instantly when Timer or Stopwatch logs a session.
 */
export function useHistory() {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const addEntry = useCallback((entry: Omit<SessionLog, "id" | "completedAt">) => {
    const current = getSnapshot();
    const newEntry: SessionLog = {
      ...entry,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...current].slice(0, MAX_ENTRIES);
    saveEntries(updated);
  }, []);

  const clearHistory = useCallback(() => {
    saveEntries([]);
  }, []);

  return { entries, addEntry, clearHistory } as const;
}
