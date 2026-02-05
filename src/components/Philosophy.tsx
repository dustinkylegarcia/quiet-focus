import { FadeIn, FadeInStagger, FadeInChild } from "./ui/FadeIn";

const principles = [
  {
    number: "01",
    title: "Intention over impulse",
    description: "Every interaction begins with purpose. Technology serves you, not the other way around.",
  },
  {
    number: "02", 
    title: "Space to think",
    description: "Silence is not emptiness. In the quiet, clarity emerges naturally.",
  },
  {
    number: "03",
    title: "Depth over breadth",
    description: "Choose fewer things. Engage with them fully. This is where meaning lives.",
  },
];

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 lg:py-40">
      <div className="container">
        <FadeIn>
          <p className="text-sm tracking-wide text-muted-foreground mb-4">
            Philosophy
          </p>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <h2 className="heading-lg text-foreground mb-16 md:mb-24 max-w-2xl text-balance">
            Attention is finite. Guard it well.
          </h2>
        </FadeIn>
        
        <div className="section-divider mb-12 md:mb-16" />
        
        <FadeInStagger className="space-y-0" staggerDelay={0.15}>
          {principles.map((principle, index) => (
            <FadeInChild key={principle.number}>
              <article className="group">
                <div className="grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14">
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-xs text-muted-foreground/60 font-light">
                      {principle.number}
                    </span>
                  </div>
                  
                  <div className="col-span-10 md:col-span-4 lg:col-span-3">
                    <h3 className="text-foreground font-medium tracking-tight">
                      {principle.title}
                    </h3>
                  </div>
                  
                  <div className="col-span-10 col-start-3 md:col-span-6 md:col-start-6 lg:col-span-5 lg:col-start-6">
                    <p className="body-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
                
                {index < principles.length - 1 && (
                  <div className="section-divider" />
                )}
              </article>
            </FadeInChild>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
};