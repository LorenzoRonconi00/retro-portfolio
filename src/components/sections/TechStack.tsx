import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { containerVariants, itemVariants, scaleVariants } from '@/lib/animations';
import { useState } from 'react';
import { TechCard } from '../ui/techcard';
import { CategoryTabs } from '../ui/category-tabs';
import {
  Code2, Globe, Database, Wrench,
  Box, Smartphone, Monitor
} from 'lucide-react';

const techCategories = [
  {
    name: 'Frontend',
    devName: 'client',
    techs: [
      { name: 'React', level: 90, years: 3, icon: Code2 },
      { name: 'Next.js', level: 85, years: 3, icon: Globe },
      { name: 'Angular', level: 90, years: 3, icon: Code2 },
      { name: 'Tailwind', level: 95, years: 3, icon: Monitor },
      { name: 'Three.js', level: 60, years: 1, icon: Box },
      { name: 'Motion.dev', level: 80, years: 2, icon: Code2 },
    ],
  },
  {
    name: 'Backend',
    devName: 'server',
    techs: [
      { name: 'Python', level: 85, years: 4, icon: Code2 },
      { name: 'Java', level: 75, years: 4, icon: Code2 },
      { name: 'Node.js', level: 80, years: 2, icon: Globe },
      { name: 'Express', level: 75, years: 2, icon: Globe },
      { name: 'C#', level: 70, years: 5, icon: Code2 },
    ],
  },
  {
    name: 'Database',
    devName: 'data',
    techs: [
      { name: 'PostgreSQL', level: 80, years: 3, icon: Database },
      { name: 'MongoDB', level: 85, years: 3, icon: Database },
      { name: 'MySQL', level: 70, years: 3, icon: Database },
      { name: 'Firebase', level: 80, years: 2, icon: Database },
      { name: 'Supabase', level: 85, years: 3, icon: Database },
    ],
  },
  {
    name: 'Other',
    devName: 'tools',
    techs: [
      { name: 'Unity', level: 85, years: 6, icon: Box },
      { name: 'Flutter/Dart', level: 60, years: 1, icon: Smartphone },
      { name: 'Electron', level: 80, years: 1, icon: Monitor },
      { name: 'Prisma', level: 70, years: 2, icon: Database },
    ],
  },
];

const learningTechs = [
  { name: 'Flutter/Dart', level: 60, years: 1, icon: Smartphone, isLearning: true },
  { name: 'Three.js', level: 60, years: 1, icon: Box, isLearning: true },
];

export function TechStack() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(techCategories[0].name);
  const activeCategoryData = techCategories.find(cat => cat.name === activeCategory);

  return (
    <section ref={ref} className="py-24 px-6" id="tech">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariants}>
          {isDeveloper ? (
            <h2 className="text-2xl md:text-3xl font-mono">
              <span className="text-primary">const</span>{' '}
              <span className="text-foreground">techStack</span>{' '}
              <span className="text-accent">=</span>{' '}
              <span className="text-accent">{'{'}</span>
            </h2>
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold">Tech Stack</h2>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <CategoryTabs
            categories={techCategories.map(cat => isDeveloper ? cat.devName : cat.name)}
            activeCategory={isDeveloper ? activeCategoryData?.devName || '' : activeCategory}
            onCategoryChange={(cat) => {
              const category = techCategories.find(c =>
                isDeveloper ? c.devName === cat : c.name === cat
              );
              if (category) setActiveCategory(category.name);
            }}
            isDeveloper={isDeveloper}
          />
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeCategoryData?.techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TechCard
                name={tech.name}
                level={tech.level}
                years={tech.years}
                icon={tech.icon}
                isDeveloper={isDeveloper}
              />
            </motion.div>
          ))}
        </motion.div>

        {learningTechs.length > 0 && (
          <motion.div className="mt-12" variants={itemVariants}>
            <div className="mb-4">
              {isDeveloper ? (
                <span className="font-mono text-sm text-muted-foreground">
                  <span className="text-primary">learning</span>
                  <span className="text-accent">: [</span>
                </span>
              ) : (
                <h3 className="text-xl font-medium text-muted-foreground flex items-center gap-2">
                  Currently Learning
                </h3>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningTechs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TechCard
                    name={tech.name}
                    level={tech.level}
                    years={tech.years}
                    icon={tech.icon}
                    isDeveloper={isDeveloper}
                    isLearning={true}
                  />
                </motion.div>
              ))}
            </div>
            {isDeveloper && (
              <span className="font-mono text-sm text-accent">]</span>
            )}
          </motion.div>
        )}

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-accent" variants={itemVariants}>
            <span>{'}'}</span>;
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
