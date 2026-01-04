import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isDeveloper: boolean;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange, isDeveloper }: CategoryTabsProps) {
  if (isDeveloper) {
    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                px-4 py-2 rounded-md font-mono text-sm transition-all
                ${isActive 
                  ? 'bg-primary/20 border border-primary text-primary' 
                  : 'bg-card border border-primary/30 text-muted-foreground hover:border-primary/60'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && <span className="text-accent">{'> '}</span>}
              {category}
              {isActive && <span className="text-accent">{'()'}</span>}
            </motion.button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-3 font-medium transition-all relative
              ${isActive 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}