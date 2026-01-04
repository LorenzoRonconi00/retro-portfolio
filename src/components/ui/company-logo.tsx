import { motion } from 'framer-motion';

interface CompanyLogoProps {
  company: string;
  isDeveloper: boolean;
}

export function CompanyLogo({ company, isDeveloper }: CompanyLogoProps) {
  const initials = company
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-violet-500',
  ];

  const colorIndex = company.length % colors.length;
  const gradient = colors[colorIndex];

  return (
    <motion.div
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white
        bg-gradient-to-br ${gradient}
        ${isDeveloper ? 'border-2 border-primary/40' : 'shadow-md'}
      `}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-sm">{initials}</span>
    </motion.div>
  );
}