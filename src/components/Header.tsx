import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="text-foreground font-medium tracking-tight">
          stillness
        </a>
        
        <div className="flex items-center gap-6">
          <a 
            href="#philosophy" 
            className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
          >
            Philosophy
          </a>
          <ThemeToggle />
        </div>
      </nav>
      
      <div className="section-divider" />
    </motion.header>
  );
};