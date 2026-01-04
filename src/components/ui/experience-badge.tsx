import { motion } from 'framer-motion';

interface ExperienceBadgeProps {
  type: 'current' | 'duration';
  value?: string;
  isDeveloper: boolean;
}

export function ExperienceBadge({ type, value, isDeveloper }: ExperienceBadgeProps) {
  if (type === 'current') {
    return (
      <motion.span
        className={`
          inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full
          ${isDeveloper 
            ? 'bg-accent/20 text-accent border border-accent/40' 
            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }
        `}
        animate={isDeveloper ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
        {isDeveloper ? 'active' : 'Current'}
      </motion.span>
    );
  }

  return (
    <span
      className={`
        px-2 py-1 text-xs rounded-full
        ${isDeveloper 
          ? 'bg-primary/20 text-primary font-mono' 
          : 'bg-secondary text-muted-foreground'
        }
      `}
    >
      {isDeveloper ? `duration: "${value}"` : value}
    </span>
  );
}