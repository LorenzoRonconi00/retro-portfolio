import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TechCardProps {
  name: string;
  icon?: LucideIcon;
  isDeveloper: boolean;
}

export function TechCard({ name, icon: Icon, isDeveloper }: TechCardProps) {
  if (isDeveloper) {
    return (
      <motion.div
        className="bg-card border border-primary/40 p-4 rounded-md font-mono text-sm hover:border-primary transition-all"
        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' }}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          <span className="text-foreground">{name}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 hover:shadow-lg transition-all group"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <span className="font-medium">{name}</span>
      </div>
    </motion.div>
  );
}