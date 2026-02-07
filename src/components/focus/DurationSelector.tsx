import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DurationSelectorProps {
  selectedDuration: number;
  onSelect: (minutes: number) => void;
}

const presets = [25, 45, 60];

export const DurationSelector = ({ selectedDuration, onSelect }: DurationSelectorProps) => {
  const [isCustom, setIsCustom] = useState(() => !presets.includes(selectedDuration));
  const [customValue, setCustomValue] = useState(() => {
    const saved = localStorage.getItem("focus-custom-duration");
    return saved ? saved : "";
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const isPresetSelected = presets.includes(selectedDuration) && !isCustom;

  useEffect(() => {
    if (isCustom && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCustom]);

  const handleCustomClick = () => {
    setIsCustom(true);
    if (customValue) {
      const parsed = parseInt(customValue, 10);
      if (parsed >= 1 && parsed <= 180) {
        onSelect(parsed);
      }
    }
  };

  const handlePresetClick = (minutes: number) => {
    setIsCustom(false);
    onSelect(minutes);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCustomValue(value);
    
    const parsed = parseInt(value, 10);
    if (parsed >= 1 && parsed <= 180) {
      localStorage.setItem("focus-custom-duration", value);
      onSelect(parsed);
    }
  };

  const handleCustomBlur = () => {
    if (!customValue || parseInt(customValue, 10) < 1) {
      setIsCustom(false);
      if (!presets.includes(selectedDuration)) {
        onSelect(25);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        {presets.map((minutes) => (
          <motion.button
            key={minutes}
            onClick={() => handlePresetClick(minutes)}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
              relative py-3 px-2 text-lg sm:text-xl font-extralight tracking-tight
              transition-colors duration-500
              ${isPresetSelected && selectedDuration === minutes 
                ? "text-foreground" 
                : "text-muted-foreground/50 hover:text-muted-foreground"
              }
            `}
          >
            {minutes}
            {isPresetSelected && selectedDuration === minutes && (
              <motion.div
                layoutId="duration-indicator"
                className="absolute -bottom-1 left-0 right-0 h-px bg-foreground/30"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
          </motion.button>
        ))}
        <span className="text-sm text-muted-foreground/40 font-light">min</span>
      </div>

      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCustom ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={customValue}
                onChange={handleCustomChange}
                onBlur={handleCustomBlur}
                placeholder="0"
                className="
                  w-16 bg-transparent border-0 border-b border-foreground/20
                  text-center text-lg font-extralight text-foreground
                  placeholder:text-muted-foreground/30
                  focus:outline-none focus:border-foreground/40
                  transition-colors duration-500
                  py-2
                "
              />
              <span className="text-sm text-muted-foreground/40 font-light">min</span>
            </motion.div>
          ) : (
            <motion.button
              key="button"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={handleCustomClick}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-500 tracking-wide"
            >
              or set your own
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
