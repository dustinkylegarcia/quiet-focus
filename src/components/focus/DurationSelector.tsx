import { motion } from "framer-motion";

interface DurationSelectorProps {
  selectedDuration: number;
  onSelect: (minutes: number) => void;
}

const durations = [25, 45, 60];

export const DurationSelector = ({ selectedDuration, onSelect }: DurationSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-8 sm:gap-12">
      {durations.map((minutes) => (
        <motion.button
          key={minutes}
          onClick={() => onSelect(minutes)}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={`
            relative py-3 px-2 text-lg sm:text-xl font-extralight tracking-tight
            transition-colors duration-500
            ${selectedDuration === minutes 
              ? "text-foreground" 
              : "text-muted-foreground/50 hover:text-muted-foreground"
            }
          `}
        >
          {minutes}
          {selectedDuration === minutes && (
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
  );
};
