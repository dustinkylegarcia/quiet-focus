import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TimerDisplay } from "@/components/focus/TimerDisplay";
import { DurationSelector } from "@/components/focus/DurationSelector";
import { IntentionInput } from "@/components/focus/IntentionInput";
import { SessionComplete } from "@/components/focus/SessionComplete";
import { useFocusSession } from "@/hooks/useFocusSession";

const Focus = () => {
  const {
    state,
    intention,
    setIntention,
    selectedDuration,
    setSelectedDuration,
    timeRemaining,
    progress,
    startSession,
    resetSession,
  } = useFocusSession();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8">
        <div className="container flex items-center justify-between">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-500"
          >
            ← Back
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl">
          {state === "complete" ? (
            <SessionComplete
              intention={intention}
              duration={selectedDuration}
              onReset={resetSession}
            />
          ) : state === "active" ? (
            <div className="text-center">
              <TimerDisplay timeRemaining={timeRemaining} progress={progress} />
              
              {intention && (
                <FadeIn delay={0.2}>
                  <p className="body-base mt-12 text-center max-w-sm mx-auto">
                    {intention}
                  </p>
                </FadeIn>
              )}

              <FadeIn delay={0.3}>
                <motion.button
                  onClick={resetSession}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-16 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-500"
                >
                  End session
                </motion.button>
              </FadeIn>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              <FadeIn>
                <h1 className="heading-lg text-foreground text-center text-balance">
                  Focus session
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <DurationSelector
                  selectedDuration={selectedDuration}
                  onSelect={setSelectedDuration}
                />
              </FadeIn>

              <IntentionInput value={intention} onChange={setIntention} />

              <FadeIn delay={0.2} className="text-center">
                <motion.button
                  onClick={startSession}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded hover:bg-primary/90 transition-colors duration-500"
                >
                  Begin
                </motion.button>
              </FadeIn>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Focus;
