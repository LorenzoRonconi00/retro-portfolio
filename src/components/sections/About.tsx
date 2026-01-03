import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';
import { GraduationCap, User } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

export function About() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6" id="about">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariants}>
          {isDeveloper ? (
            <h2 className="text-2xl md:text-3xl font-mono">
              <span className="text-accent">function</span>{' '}
              <span className="text-primary">aboutMe</span>
              <span className="text-muted-foreground">()</span>{' '}
              <span className="text-accent">{'{'}</span>
            </h2>
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className={`
              p-6 rounded-lg
              ${isDeveloper 
                ? 'bg-card border border-primary/30' 
                : 'bg-card border border-border'
              }
            `}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                p-2 rounded-md
                ${isDeveloper ? 'bg-primary/20 text-primary' : 'bg-secondary'}
              `}>
                <User className="w-5 h-5" />
              </div>
              {isDeveloper ? (
                <span className="font-mono text-sm text-muted-foreground">
                  // bio.description
                </span>
              ) : (
                <span className="font-medium">Bio</span>
              )}
            </div>
            <p className={`
              leading-relaxed
              ${isDeveloper ? 'font-mono text-sm' : 'text-muted-foreground'}
            `}>
              {isDeveloper ? (
                <span>
                  <span className="text-primary">return</span>{' '}
                  <span className="text-accent">"</span>
                  Full-stack developer with experience in designing and developing software solutions. 
                  Highly motivated, continuously learning, and driven by a strong passion for programming—especially 
                  front-end development and game development.
                  <span className="text-accent">"</span>;
                </span>
              ) : (
                'Full-stack developer with experience in designing and developing software solutions. Highly motivated, continuously learning, and driven by a strong passion for programming—especially front-end development and game development.'
              )}
            </p>
          </motion.div>

          <motion.div
            className={`
              p-6 rounded-lg
              ${isDeveloper 
                ? 'bg-card border border-accent/30' 
                : 'bg-card border border-border'
              }
            `}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                p-2 rounded-md
                ${isDeveloper ? 'bg-accent/20 text-accent' : 'bg-secondary'}
              `}>
                <GraduationCap className="w-5 h-5" />
              </div>
              {isDeveloper ? (
                <span className="font-mono text-sm text-muted-foreground">
                  // education.current
                </span>
              ) : (
                <span className="font-medium">Education</span>
              )}
            </div>
            <div className={isDeveloper ? 'font-mono text-sm' : ''}>
              <p className={`font-medium ${isDeveloper ? 'text-primary' : ''}`}>
                {isDeveloper ? 'degree: ' : ''}Bachelor's Degree in Computer Science
              </p>
              <p className={`${isDeveloper ? 'text-accent' : 'text-muted-foreground'}`}>
                {isDeveloper ? 'institution: ' : ''}University of Perugia
              </p>
              <p className="text-muted-foreground mt-2">
                {isDeveloper ? 'status: "2021 - Ongoing"' : '2021 - Ongoing'}
              </p>
            </div>
          </motion.div>
        </div>

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-muted-foreground" variants={itemVariants}>
            <span className="text-accent">{'}'}</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
