import { useState, useEffect, useCallback, useRef } from "react";

export type SessionState = "idle" | "active" | "complete";

interface FocusSession {
  intention: string;
  duration: number;
  startedAt: number;
  completedAt?: number;
}

interface UseFocusSessionReturn {
  state: SessionState;
  intention: string;
  setIntention: (value: string) => void;
  selectedDuration: number;
  setSelectedDuration: (minutes: number) => void;
  timeRemaining: number;
  progress: number;
  startSession: () => void;
  resetSession: () => void;
}

const STORAGE_KEY = "stillness-focus-session";

export const useFocusSession = (): UseFocusSessionReturn => {
  const [state, setState] = useState<SessionState>("idle");
  const [intention, setIntention] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSeconds = selectedDuration * 60;
  const progress = state === "idle" ? 0 : ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  // Load saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const session: FocusSession = JSON.parse(saved);
        if (session.completedAt) {
          // Show completed state
          setIntention(session.intention);
          setSelectedDuration(session.duration);
          setState("complete");
        } else {
          // Resume active session
          const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
          const remaining = session.duration * 60 - elapsed;
          if (remaining > 0) {
            setIntention(session.intention);
            setSelectedDuration(session.duration);
            setTimeRemaining(remaining);
            setState("active");
          } else {
            // Session completed while away
            setIntention(session.intention);
            setSelectedDuration(session.duration);
            setTimeRemaining(0);
            setState("complete");
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ ...session, completedAt: Date.now() })
            );
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (state === "active" && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setState("complete");
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              const session = JSON.parse(saved);
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ ...session, completedAt: Date.now() })
              );
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state, timeRemaining]);

  const startSession = useCallback(() => {
    const session: FocusSession = {
      intention: intention.trim(),
      duration: selectedDuration,
      startedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setTimeRemaining(selectedDuration * 60);
    setState("active");
  }, [intention, selectedDuration]);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState("idle");
    setIntention("");
    setTimeRemaining(selectedDuration * 60);
  }, [selectedDuration]);

  return {
    state,
    intention,
    setIntention,
    selectedDuration,
    setSelectedDuration: (minutes: number) => {
      setSelectedDuration(minutes);
      if (state === "idle") {
        setTimeRemaining(minutes * 60);
      }
    },
    timeRemaining,
    progress,
    startSession,
    resetSession,
  };
};
