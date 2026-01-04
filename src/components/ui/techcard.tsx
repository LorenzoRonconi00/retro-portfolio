import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TechCardProps {
  name: string;
  level: number;
  years: number;
  icon?: LucideIcon;
  isDeveloper: boolean;
  isLearning?: boolean;
}

export function TechCard({ name, level, years, icon: Icon, isDeveloper, isLearning = false }: TechCardProps) {
  if (isDeveloper) {
    const filled = Math.round((level / 100) * 10);
    const empty = 10 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);

    return (
      <motion.div
        className="bg-card border border-primary/40 p-4 rounded-md font-mono text-sm hover:border-primary transition-all group"
        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          <span className="text-foreground">{name}</span>
          {isLearning && <span className="text-accent text-xs">// learning</span>}
        </div>
        <div className="text-accent text-xs mb-1 leading-none">
          level: <span className="inline-block align-middle" style={{ lineHeight: '1' }}>[{bar}]</span> {level}%
        </div>
        <div className="text-muted-foreground text-xs">
          exp: {years}y
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 hover:shadow-lg transition-all group"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {isLearning && (
              <span className="px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                Learning
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Proficiency</span>
          <span>{level}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {years} year{years !== 1 ? 's' : ''} experience
        </div>
      </div>
    </motion.div>
  );
}