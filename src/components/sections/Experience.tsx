import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { containerVariants, itemVariantsX } from '@/lib/animations';

const experiences = [
  {
    company: 'Osmosit',
    role: 'Full-stack Software Engineer',
    period: '2023 - Present',
    description: 'Web app development using React, Angular, TypeScript, PostgreSQL, Java, and Python.',
  },
  {
    company: 'Pucciufficio Srl',
    role: 'Back-end Developer',
    period: '2023',
    description: 'IT solutions with eSolver, SQL, and C#.',
  },
  {
    company: 'Vigamus Academy',
    role: 'C# Unity Developer',
    period: '2020 - 2021',
    description: "Developed scenes for the video game 'Dracula', focusing on math and physics programming.",
  },
];

export function Experience() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6" id="experience">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariantsX}>
          {isDeveloper ? (
            <h2 className="text-2xl md:text-3xl font-mono">
              <span className="text-accent">class</span>{' '}
              <span className="text-primary">Experience</span>{' '}
              <span className="text-accent">{'{'}</span>
            </h2>
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          )}
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`
            absolute left-[19px] top-0 bottom-0 w-px
            ${isDeveloper ? 'bg-primary/30' : 'bg-border'}
          `} />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                className="relative pl-12"
                variants={itemVariantsX}
              >
                {/* Timeline dot */}
                <div className={`
                  absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center
                  ${isDeveloper 
                    ? 'bg-card border-2 border-primary' 
                    : 'bg-secondary border-2 border-background'
                  }
                `}>
                  <Briefcase className={`w-4 h-4 ${isDeveloper ? 'text-primary' : ''}`} />
                </div>

                <motion.div
                  className={`
                    p-6 rounded-lg
                    ${isDeveloper 
                      ? 'bg-card border border-primary/30 hover:border-primary/60 transition-colors' 
                      : 'bg-card border border-border'
                    }
                  `}
                  whileHover={isDeveloper ? { 
                    boxShadow: '0 0 20px hsl(142 71% 45% / 0.2)'
                  } : {}}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className={`
                      text-lg font-semibold
                      ${isDeveloper ? 'text-primary' : ''}
                    `}>
                      {isDeveloper ? `this.company = "${exp.company}"` : exp.company}
                    </h3>
                    <span className={`
                      text-sm
                      ${isDeveloper ? 'font-mono text-accent' : 'text-muted-foreground'}
                    `}>
                      {isDeveloper ? `// ${exp.period}` : exp.period}
                    </span>
                  </div>
                  
                  <p className={`
                    text-sm mb-2
                    ${isDeveloper ? 'font-mono text-accent' : 'font-medium text-muted-foreground'}
                  `}>
                    {isDeveloper ? `role: "${exp.role}"` : exp.role}
                  </p>
                  
                  <p className={`
                    text-sm
                    ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                  `}>
                    {isDeveloper ? `// ${exp.description}` : exp.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-accent" variants={itemVariantsX}>
            <span>{'}'}</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
