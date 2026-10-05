import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { containerVariants, itemVariants, scaleVariants } from '@/lib/animations';
import { useState } from 'react';
import { TechCard } from '../ui/techcard';
import { CategoryTabs } from '../ui/category-tabs';
import {
  Code2, Globe, Database, Wrench,
  Box, Monitor
} from 'lucide-react';

type Tech = { name: string; icon: typeof Code2 };

const techCategories: { name: string; devName: string; techs: Tech[] }[] = [
  {
    name: 'Frontend',
    devName: 'client',
    techs: [
      { name: 'Angular', icon: Code2 },
      { name: 'React', icon: Code2 },
      { name: 'Next.js', icon: Globe },
      { name: 'TypeScript', icon: Code2 },
      { name: 'Tailwind CSS', icon: Monitor },
      { name: 'Three.js', icon: Box },
    ],
  },
  {
    name: 'Backend',
    devName: 'server',
    techs: [
      { name: 'Java', icon: Code2 },
      { name: 'Spring Boot', icon: Code2 },
      { name: 'JPA/Hibernate', icon: Database },
      { name: 'Python', icon: Code2 },
      { name: 'Node.js', icon: Globe },
      { name: 'Express', icon: Globe },
      { name: 'C#', icon: Code2 },
      { name: 'OAuth2 / Keycloak', icon: Globe },
      { name: 'SOAP / REST integrations', icon: Globe },
    ],
  },
  {
    name: 'Database',
    devName: 'data',
    techs: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Supabase', icon: Database },
      { name: 'Prisma', icon: Database },
    ],
  },
  {
    name: 'Tools',
    devName: 'tools',
    techs: [
      { name: 'Docker', icon: Wrench },
      { name: 'GitLab CI', icon: Wrench },
      { name: 'JUnit / Mockito', icon: Wrench },
      { name: 'Vitest', icon: Wrench },
      { name: 'SonarQube', icon: Wrench },
      { name: 'Electron', icon: Monitor },
      { name: 'Unity', icon: Box },
    ],
  },
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
                icon={tech.icon}
                isDeveloper={isDeveloper}
              />
            </motion.div>
          ))}
        </motion.div>

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-accent" variants={itemVariants}>
            <span>{'}'}</span>;
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
