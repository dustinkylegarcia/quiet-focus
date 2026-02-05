import { FadeIn } from "./ui/FadeIn";

export const Footer = () => {
  return (
    <footer className="py-12 md:py-16">
      <div className="section-divider mb-12 md:mb-16" />
      
      <div className="container">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              stillness — a practice in presence
            </p>
            
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()}
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};