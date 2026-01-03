import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Plane, Home, Users } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const projects = [
  {
    title: 'Travel Planner',
    devTitle: 'travel_planner',
    description: 'Desktop app (Electron, AI, Supabase). Generates travel itineraries with PDF export and Gemini 2.0 integration.',
    icon: Plane,
    tags: ['Electron', 'AI', 'Supabase', 'Gemini 2.0'],
    githubUrl: 'https://github.com/LorenzoRonconi00/TravelPlanner',
  },
  {
    title: 'Roomly (Ongoing)',
    devTitle: 'roomly (ongoing)',
    description: 'Mobile app (Flutter, Dart). Household management, chores, and expense tracking.',
    icon: Home,
    tags: ['Flutter', 'Dart', 'Mobile'],
    githubUrl: 'https://github.com/LorenzoRonconi00?tab=repositories',
  },
  {
    title: 'ITS Platform',
    devTitle: 'its_platform',
    description: 'Web platform (Angular + Parse). Management for student groups and procedural website generation.',
    icon: Users,
    tags: ['Angular', 'Parse', 'TypeScript'],
    githubUrl: 'https://github.com/LorenzoRonconi00?tab=repositories',
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
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariants}>
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`
                relative overflow-hidden rounded-lg transition-all duration-300
                ${isDeveloper 
                  ? 'bg-card border-2 border-primary/40 hover:border-primary' 
                  : 'bg-card border border-border hover:shadow-lg'
                }
              `}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={isDeveloper ? {
                boxShadow: '0 0 30px hsl(142 71% 45% / 0.3)',
              } : {}}
            >
              {/* Retro cartridge header for Developer mode */}
              {isDeveloper && (
                <div className="bg-primary/20 px-4 py-2 border-b border-primary/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-xs text-primary">
                      {project.devTitle}.exe
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-3 rounded-lg
                    ${isDeveloper ? 'bg-primary/20 text-primary' : 'bg-secondary'}
                  `}>
                    <project.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex gap-2">
                    <a
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
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h3 className={`
                  text-lg font-semibold mb-2
                  ${isDeveloper ? 'text-primary font-mono' : ''}
                `}>
                  {isDeveloper ? `> ${project.title}` : project.title}
                </h3>

                <p className={`
                  text-sm mb-4 leading-relaxed
                  ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                `}>
                  {isDeveloper ? `// ${project.description}` : project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`
                        px-2 py-1 text-xs rounded
                        ${isDeveloper 
                          ? 'bg-accent/20 text-accent font-mono border border-accent/30' 
                          : 'bg-secondary text-muted-foreground'
                        }
                      `}
                    >
                      {isDeveloper ? `#${tag}` : tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glitch effect overlay on hover in Developer mode */}
              {isDeveloper && hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.1, 0, 0.05, 0],
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(142 71% 45% / 0.1), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                />
              )}
            </motion.div>
          ))}
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
