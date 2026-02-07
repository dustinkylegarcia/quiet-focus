import { FadeIn } from "./ui/FadeIn";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-32 md:py-44 lg:py-56 bg-secondary/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="heading-md text-foreground mb-6 text-balance">
              Try it now
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <p className="body-base mb-10 md:mb-14 max-w-sm mx-auto">
              Nothing to sign up for.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to="/focus"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded hover:bg-primary/90 transition-colors duration-500"
              >
                Start a session
              </Link>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xs text-muted-foreground/60 mt-6">
              Always free.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};