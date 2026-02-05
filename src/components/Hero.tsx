import { FadeIn } from "./ui/FadeIn";

export const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center pt-20 md:pt-0">
      <div className="container">
        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <p className="text-sm tracking-wide text-muted-foreground mb-6 md:mb-8">
              Digital minimalism
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="heading-xl text-foreground mb-8 md:mb-10 text-balance">
              Less noise.<br />
              More presence.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.35}>
            <p className="body-lg max-w-md mb-10 md:mb-14">
              Reclaim your attention. Cultivate focus.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <a
              href="#philosophy"
              className="inline-flex items-center gap-3 text-foreground group"
            >
              <span className="text-sm font-medium tracking-wide">Begin</span>
              <span className="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-primary transition-all duration-400" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};