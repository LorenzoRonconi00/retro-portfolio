import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Plane, Home, Users } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';
import { ProjectImage } from '../ui/project-image';
import { ProjectStatusBadge } from '../ui/project-status-badge';
import travelImg from '@/assets/travel.png';
import roomlyImg from '@/assets/roomly.png';
import itsImg from '@/assets/its.png';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'ITS Platform',
    devTitle: 'its_platform',
    description: 'Web platform (Angular + Parse). Management for student groups and procedural website generation.',
    icon: Users,
    tags: ['Angular', 'Parse', 'TypeScript'],
    githubUrl: 'https://github.com/LorenzoRonconi00?tab=repositories',
    image: itsImg,
    status: 'completed' as const,
  },
  {
    title: 'Travel Planner',
    devTitle: 'travel_planner',
    description: 'Desktop app (Electron, AI, Supabase). Generates travel itineraries with PDF export and Gemini 2.0 integration.',
    icon: Plane,
    tags: ['Electron', 'AI', 'Supabase', 'Gemini 2.0'],
    githubUrl: 'https://github.com/LorenzoRonconi00/TravelPlanner',
    image: travelImg,
    status: 'completed' as const,
  },
  {
    title: 'Roomly',
    devTitle: 'roomly',
    description: 'Mobile app (Flutter, Dart). Household management, chores, and expense tracking.',
    icon: Home,
    tags: ['Flutter', 'Dart', 'Mobile'],
    githubUrl: 'https://github.com/LorenzoRonconi00?tab=repositories',
    image: roomlyImg,
    status: 'ongoing' as const,
  },
];

export function Projects() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6" id="projects">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12 flex items-center justify-between" variants={itemVariants}>
          <div>
            {isDeveloper ? (
              <h2 className="text-2xl md:text-3xl font-mono">
                <span className="text-primary">const</span>{' '}
                <span className="text-foreground">projects</span>{' '}
                <span className="text-accent">=</span>{' '}
                <span className="text-accent">[</span>
              </h2>
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            )}
          </div>

          <motion.a
            href="https://github.com/LorenzoRonconi00?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
            ${isDeveloper
                ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 font-mono'
                : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
              }
          `}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDeveloper ? 'view_all()' : 'View All'}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
              >
                <motion.div
                  className={`
                  relative overflow-hidden rounded-lg transition-all duration-300
                  ${isDeveloper
                      ? 'bg-card border-2 border-primary/40 hover:border-primary'
                      : 'bg-card border border-border hover:shadow-2xl'
                    }
                `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={isDeveloper ? {
                    boxShadow: '0 0 40px rgba(147, 51, 234, 0.3)',
                  } : { y: -8 }}
                >
                  {isDeveloper && (
                    <div className="bg-primary/20 px-4 py-2 border-b border-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="font-mono text-xs text-primary">
                            {project.devTitle}.exe
                          </span>
                        </div>
                        <ProjectStatusBadge status={project.status} isDeveloper={true} />
                      </div>
                    </div>
                  )}

                  <div>
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      isDeveloper={isDeveloper}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`
                        p-3 rounded-lg
                        ${isDeveloper ? 'bg-primary/20 text-primary' : 'bg-secondary'}
                      `}>
                          <project.icon className="w-6 h-6" />
                        </div>

                        {!isDeveloper && (
                          <ProjectStatusBadge status={project.status} isDeveloper={false} />
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                          p-2 rounded-md transition-colors
                          ${isDeveloper
                              ? 'hover:bg-primary/20 text-muted-foreground hover:text-primary'
                              : 'hover:bg-secondary text-muted-foreground'
                            }
                        `}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>

                    <h3 className={`
                    text-lg font-semibold mb-3
                    ${isDeveloper ? 'text-primary font-mono' : ''}
                  `}>
                      {isDeveloper ? `> ${project.title}` : project.title}
                    </h3>

                    <p className={`
                    text-sm mb-4 leading-relaxed
                    ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                  `}>
                      {isDeveloper ? `/* ${project.description} */` : project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className={`
                          px-3 py-1 text-xs rounded-full
                          ${isDeveloper
                              ? 'bg-accent/20 text-accent font-mono border border-accent/30'
                              : 'bg-secondary text-foreground hover:bg-accent/20'
                            }
                        `}
                          whileHover={{ scale: 1.05 }}
                        >
                          {isDeveloper ? `#${tag}` : tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {isDeveloper && hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.1, 0, 0.05, 0],
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)',
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {isDeveloper && (
          <motion.div className="mt-8 font-mono text-accent" variants={itemVariants}>
            <span>]</span>;
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
