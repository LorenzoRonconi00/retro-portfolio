import { motion } from 'framer-motion';

interface ProjectStatusBadgeProps {
  status: 'ongoing' | 'completed' | 'archived';
  isDeveloper: boolean;
}

export function ProjectStatusBadge({ status, isDeveloper }: ProjectStatusBadgeProps) {
  const statusConfig = {
    ongoing: {
      label: isDeveloper ? 'in_progress' : 'Ongoing',
      color: isDeveloper 
        ? 'bg-accent/20 text-accent border-accent/40' 
        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      animate: true,
    },
    completed: {
      label: isDeveloper ? 'completed' : 'Completed',
      color: isDeveloper 
        ? 'bg-primary/20 text-primary border-primary/40' 
        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      animate: false,
    },
    archived: {
      label: isDeveloper ? 'archived' : 'Archived',
      color: isDeveloper 
        ? 'bg-muted text-muted-foreground border-muted-foreground/40' 
        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      animate: false,
    },
  };

  const config = statusConfig[status];

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full
        ${config.color}
        ${isDeveloper ? 'font-mono border' : ''}
      `}
      animate={config.animate ? { opacity: [0.7, 1, 0.7] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {config.animate && (
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
      )}
      {config.label}
    </motion.span>
  );
}