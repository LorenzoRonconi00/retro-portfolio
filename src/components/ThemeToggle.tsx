import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export function ThemeToggle() {
  const { mode, toggleMode, isTransitioning } = useTheme();
  const isDeveloper = mode === 'developer';

  const soundRef = useRef<HTMLAudioElement | null>(null);

  if (!soundRef.current) {
    soundRef.current = new Audio('/sounds/retro-power-on.mp3');
    soundRef.current.volume = 0.3; // volume
  }

  const handleToggle = () => {
    soundRef.current?.play().catch(e => console.log('Audio play failed:', e));

    toggleMode();
  };

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full
        transition-all duration-300 disabled:opacity-50
        ${isDeveloper
          ? 'bg-card border-2 border-primary retro-glow font-mono text-sm'
          : 'bg-card border border-border shadow-lg'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDeveloper ? (
        <>
          <span className="text-accent">&gt;_</span>
          <span className="text-foreground">DEV</span>
          <motion.div
            className="w-2 h-4 bg-primary cursor-blink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </>
      ) : (
        <>
          <span className="text-muted-foreground text-sm font-medium">PRO</span>
          <div className="relative w-12 h-6 bg-secondary rounded-full">
            <motion.div
              className="absolute top-1 w-4 h-4 bg-foreground rounded-full"
              animate={{ left: isDeveloper ? '28px' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </>
      )}
    </motion.button>
  );
}