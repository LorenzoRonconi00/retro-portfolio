import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { containerVariants, itemVariants, scaleVariants } from '@/lib/animations';

const techCategories = [
  {
    name: 'Frontend',
    devName: 'client',
    techs: ['React', 'Next.js', 'Angular', 'Tailwind', 'Three.js', 'Motion.dev'],
  },
  {
    name: 'Backend',
    devName: 'server',
    techs: ['Python', 'Java', 'Node.js', 'Express', 'C#'],
  },
  {
    name: 'Database',
    devName: 'data',
    techs: ['Relational DB', 'NoSQL DB'],
  },
  {
    name: 'Other',
    devName: 'tools',
    techs: ['Unity', 'Flutter/Dart', 'Electron'],
  },
];

export function TechStack() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6" id="tech">
      <motion.div
        className="max-w-4xl mx-auto"
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

        <div className="space-y-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div key={category.name} variants={itemVariants}>
              <div className="mb-4">
                {isDeveloper ? (
                  <span className="font-mono text-sm">
                    <span className="text-muted-foreground ml-4">{category.devName}:</span>{' '}
                    <span className="text-accent">[</span>
                  </span>
                ) : (
                  <h3 className="text-lg font-medium text-muted-foreground">{category.name}</h3>
                )}
              </div>
              
              <motion.div 
                className={`flex flex-wrap gap-3 ${isDeveloper ? 'ml-8' : ''}`}
                variants={containerVariants}
              >
                {category.techs.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={`
                      px-4 py-2 rounded-md text-sm transition-all cursor-default
                      ${isDeveloper 
                        ? 'bg-card border border-primary/40 font-mono hover:border-primary hover:retro-glow' 
                        : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                      }
                    `}
                    variants={scaleVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {isDeveloper ? `"${tech}"${index < category.techs.length - 1 ? ',' : ''}` : tech}
                  </motion.span>
                ))}
              </motion.div>

              {isDeveloper && (
                <span className="font-mono text-sm text-accent ml-4">
                  ]{categoryIndex < techCategories.length - 1 ? ',' : ''}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-accent" variants={itemVariants}>
            <span>{'}'}</span>;
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
