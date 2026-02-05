import { motion } from "framer-motion";
import { FadeIn } from "../ui/FadeIn";

interface SessionCompleteProps {
  intention: string;
  duration: number;
  onReset: () => void;
}

export const SessionComplete = ({ intention, duration, onReset }: SessionCompleteProps) => {
  return (
    <div className="text-center">
      <FadeIn>
        <p className="text-sm tracking-wide text-muted-foreground/60 mb-6">
          Session complete
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="heading-lg text-foreground mb-8 text-balance">
          Well done.
        </h2>
      </FadeIn>

      {intention && (
        <FadeIn delay={0.2}>
          <p className="body-base max-w-sm mx-auto mb-4">
            {intention}
          </p>
        </FadeIn>
      )}

      <FadeIn delay={0.3}>
        <p className="text-sm text-muted-foreground/50 mb-16">
          {duration} minutes of focus
        </p>
      </FadeIn>

      <FadeIn delay={0.4}>
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-3 text-foreground group"
        >
          <span className="text-sm font-medium tracking-wide">Begin again</span>
          <span className="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
        </motion.button>
      </FadeIn>
    </div>
  );
};
