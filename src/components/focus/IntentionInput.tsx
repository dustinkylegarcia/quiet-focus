import { FadeIn } from "../ui/FadeIn";

interface IntentionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const IntentionInput = ({ value, onChange }: IntentionInputProps) => {
  return (
    <FadeIn delay={0.1} className="w-full max-w-md mx-auto">
      <label className="block text-xs text-muted-foreground/60 mb-4 text-center tracking-wide">
        What will you focus on?
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your intention..."
        maxLength={100}
        className="
          w-full bg-transparent border-0 border-b border-border
          text-center text-lg sm:text-xl font-light text-foreground
          placeholder:text-muted-foreground/30
          focus:outline-none focus:border-foreground/30
          transition-colors duration-500
          py-4
        "
      />
    </FadeIn>
  );
};
