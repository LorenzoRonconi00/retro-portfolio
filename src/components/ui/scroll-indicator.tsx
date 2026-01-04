import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  isDeveloper: boolean;
}

export function ScrollIndicator({ isDeveloper }: ScrollIndicatorProps) {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className="absolute bottom-4 md:bottom-10 left-0 right-0 flex justify-center cursor-pointer z-10"
      onClick={scrollToNext}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {isDeveloper ? (
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="text-muted-foreground font-mono text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-primary">scroll</span>
            <span className="text-accent">()</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-accent" />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1.5">
            <motion.div
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs text-muted-foreground">Scroll</span>
        </motion.div>
      )}
    </motion.div>
  );
}