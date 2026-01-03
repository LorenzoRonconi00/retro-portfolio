import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/lib/animations';

const socialLinks = [
  { icon: Github, href: 'https://github.com/LorenzoRonconi00', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lorenzo-ronconi-74606a1a1/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:lorenzoronconi60@gmail.com', label: 'Email', type: 'email' },
];

export function Hero() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('lorenzoronconi60@gmail.com');
    alert('Email copiata negli appunti!');
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isDeveloper && (
          <motion.div
            className="mb-6 text-muted-foreground font-mono text-sm"
            variants={itemVariants}
          >
            <span className="text-accent">&gt;</span> system.boot()
            <span className="cursor-blink ml-1">_</span>
          </motion.div>
        )}

        <motion.h1
          className={`
            font-bold tracking-tight mb-6
            ${isDeveloper
              ? 'text-4xl md:text-6xl lg:text-7xl text-glow'
              : 'text-5xl md:text-7xl lg:text-8xl'
            }
          `}
          variants={itemVariants}
        >
          {isDeveloper ? (
            <>
              <span className="text-accent">&lt;</span>
              Lorenzo Ronconi
              <span className="text-accent">/&gt;</span>
            </>
          ) : (
            'Lorenzo Ronconi'
          )}
        </motion.h1>

        <motion.p
          className={`
            text-lg md:text-xl mb-4
            ${isDeveloper ? 'text-accent font-mono' : 'text-muted-foreground'}
          `}
          variants={itemVariants}
        >
          {isDeveloper ? (
            '// Software Engineer | Front-end & Web Applications'
          ) : (
            'Software Engineer | Front-end & Web Applications'
          )}
        </motion.p>

        <motion.p
          className={`
            text-base md:text-lg mb-10 max-w-2xl mx-auto
            ${isDeveloper ? 'text-muted-foreground font-mono' : 'text-muted-foreground'}
          `}
          variants={itemVariants}
        >
          {isDeveloper ? (
            <span>
              <span className="text-primary">const</span> tagline =
              <span className="text-accent"> "Bridging the gap between solid engineering and creative development."</span>
            </span>
          ) : (
            '"Bridging the gap between solid engineering and creative development."'
          )}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className={`
              gap-2 px-8
              ${isDeveloper
                ? 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground retro-glow'
                : ''
              }
            `}
            asChild
          >
            <a href="/cv-lorenzo-ronconi.pdf" download="CV-Lorenzo-Ronconi.pdf">
              <Download className="w-4 h-4" />
              {isDeveloper ? 'download_cv.pdf' : 'Download CV'}
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          variants={itemVariants}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.type === 'email' ? '#' : link.href}
              onClick={link.type === 'email' ? handleEmailClick : undefined}
              target={link.type === 'link' ? '_blank' : undefined}
              rel={link.type === 'link' ? 'noopener noreferrer' : undefined}
              className={`
      p-3 rounded-full transition-colors
      ${isDeveloper
                  ? 'border border-primary hover:bg-primary hover:text-primary-foreground'
                  : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                }
    `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {isDeveloper && (
          <motion.div
            className="mt-16 text-muted-foreground font-mono text-xs"
            variants={itemVariants}
          >
            <span className="text-primary">scroll</span>
            <span className="text-accent">()</span>
            <span className="text-muted-foreground"> // to explore</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
