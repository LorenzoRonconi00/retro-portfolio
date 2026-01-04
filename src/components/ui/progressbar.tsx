import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  isDeveloper: boolean;
}

export function ProgressBar({ progress, isDeveloper }: ProgressBarProps) {
  if (isDeveloper) {
    const filled = Math.round((progress / 100) * 10);
    const empty = 10 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    
    return (
      <div className="font-mono text-sm text-accent">
        [{bar}] {progress}%
      </div>
    );
  }

  return (
    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}