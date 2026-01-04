import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { containerVariants, itemVariantsX } from '@/lib/animations';
import { CompanyLogo } from '../ui/company-logo';
import { ExperienceBadge } from '../ui/experience-badge';
import { calculateDuration } from '@/lib/experience-utils';
import { ExternalLink } from 'lucide-react';

const experiences = [
  {
    company: 'Osmosit',
    role: 'Full-stack Software Engineer',
    period: '2023 - Present',
    startDate: '2023-10',
    endDate: 'present',
    description: 'Web app development using React, Angular, TypeScript, PostgreSQL, Java, and Python.',
    techs: ['React', 'Angular', 'TypeScript', 'PostgreSQL', 'Java', 'Python'],
    link: 'https://www.osmosit.com/',
  },
  {
    company: 'Pucciufficio Srl',
    role: 'Back-end Developer',
    period: '2023',
    startDate: '2023-07',
    endDate: '2023-10',
    description: 'IT solutions with eSolver, SQL, and C#.',
    techs: ['SQL', 'C#', 'eSolver'],
    link: 'https://www.pucciufficio.com/',
  },
  {
    company: 'Vigamus Academy',
    role: 'C# Unity Developer',
    period: '2020 - 2021',
    startDate: '2020-10',
    endDate: '2021-04',
    description: "Developed scenes for the video game 'Dracula', focusing on math and physics programming.",
    techs: ['Unity', 'C#'],
    link: 'https://www.vigamusacademy.com/',
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
          <div className={`
        absolute left-6 top-0 bottom-0 w-0.5
        ${isDeveloper
              ? 'bg-gradient-to-b from-primary via-accent to-primary/20'
              : 'bg-gradient-to-b from-primary/50 to-border'
            }
      `} />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isCurrent = exp.endDate.toLowerCase() === 'present';
              const duration = calculateDuration(exp.startDate, exp.endDate);

              return (
                <motion.div
                  key={exp.company}
                  className="relative pl-16"
                  variants={itemVariantsX}
                >
                  <div className={`
                absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center
                ${isDeveloper
                      ? 'bg-card border-2 border-primary'
                      : 'bg-background border-4 border-background shadow-lg'
                    }
                ${isCurrent && isDeveloper ? 'animate-pulse' : ''}
              `}>
                    {isDeveloper && isCurrent ? (
                      <div className="w-3 h-3 bg-accent rounded-full animate-ping absolute" />
                    ) : null}
                    <Briefcase className={`w-5 h-5 ${isDeveloper ? 'text-primary' : 'text-muted-foreground'} relative z-10`} />
                  </div>

                  <motion.div
                    className={`
                  p-6 rounded-lg
                  ${isDeveloper
                        ? 'bg-card border border-primary/30 hover:border-primary/60'
                        : 'bg-card border border-border hover:shadow-xl'
                      }
                  transition-all
                `}
                    whileHover={{
                      y: -4,
                      ...(isDeveloper ? { boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' } : {})
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <CompanyLogo company={exp.company} isDeveloper={isDeveloper} />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className={`
                        text-lg font-semibold
                        ${isDeveloper ? 'text-primary font-mono' : ''}
                      `}>
                            {isDeveloper ? `"${exp.company}"` : exp.company}
                          </h3>
                          {isCurrent && <ExperienceBadge type="current" isDeveloper={isDeveloper} />}
                          {exp.link && (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                            inline-flex items-center gap-1 text-xs transition-colors
                            ${isDeveloper ? 'text-accent hover:text-primary' : 'text-muted-foreground hover:text-primary'}
                          `}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <p className={`
                      text-sm mb-2
                      ${isDeveloper ? 'font-mono text-accent' : 'font-medium text-muted-foreground'}
                    `}>
                          {isDeveloper ? `role: "${exp.role}"` : exp.role}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className={`
                        ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                      `}>
                            {isDeveloper ? `// ${exp.period}` : exp.period}
                          </span>
                          <ExperienceBadge type="duration" value={duration} isDeveloper={isDeveloper} />
                        </div>
                      </div>
                    </div>

                    <p className={`
                  text-sm mb-4
                  ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                `}>
                      {isDeveloper ? `/* ${exp.description} */` : exp.description}
                    </p>

                    {exp.techs && exp.techs.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {isDeveloper && (
                          <span className="font-mono text-xs text-muted-foreground mr-2">
                            stack:
                          </span>
                        )}
                        {exp.techs.map((tech) => (
                          <span
                            key={tech}
                            className={`
                          px-2 py-1 text-xs rounded-md
                          ${isDeveloper
                                ? 'bg-primary/10 text-primary border border-primary/30 font-mono'
                                : 'bg-secondary text-foreground'
                              }
                        `}
                          >
                            {isDeveloper ? `"${tech}"` : tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
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
