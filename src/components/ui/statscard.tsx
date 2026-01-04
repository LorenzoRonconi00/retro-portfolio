import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  isDeveloper: boolean;
}

export function StatsCard({ label, value, isDeveloper }: StatsCardProps) {
  if (isDeveloper) {
    return (
      <div className="text-sm font-mono">
        <span className="text-primary">const</span>{' '}
        <span className="text-foreground">{label}</span> ={' '}
        <span className="text-accent">{value}</span>;
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}