import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { ScrollIndicator } from '../ui/scroll-indicator';
import { useToast } from '@/hooks/use-toast';
import meProImage from '@/assets/me_pro.png';
import meDevImage from '@/assets/me_dev.png';

const socialLinks = [
  { icon: Github, href: 'https://github.com/LorenzoRonconi00', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lorenzo-ronconi-74606a1a1/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:lorenzoronconi60@gmail.com', label: 'Email', type: 'email' },
];

const taglineText = "Bridging the gap between solid engineering and creative development.";

export function Hero() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const { displayedText, isComplete } = useTypingEffect(taglineText, 30);
  const { toast } = useToast();

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('lorenzoronconi60@gmail.com');
    toast({ title: 'Email copied to clipboard' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className={`
              relative
              ${isDeveloper ? 'w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56' : 'w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60'}
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isDeveloper ? (
              <>
                {/* Dev Mode */}
                <motion.div
                  className="relative w-full h-full"
                  style={{ imageRendering: 'pixelated' }}
                  whileHover={{
                    filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.6))',
                  }}
                >
                  <img
                    src={meDevImage}
                    alt="Lorenzo Ronconi - Avatar"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </>
            ) : (
              <>
                {/* Pro Mode */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-border shadow-2xl"
                  whileHover={{
                    borderColor: 'rgba(var(--primary), 0.5)',
                  }}
                >
                  <img
                    src={meProImage}
                    alt="Lorenzo Ronconi"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Rotating Ring Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ scale: 1.1 }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

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
              ? 'text-4xl md:text-6xl lg:text-7xl text-glow neon-flicker'
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
            '// Full-Stack Software Engineer | Angular, Spring Boot & Web Applications'
          ) : (
            'Full-Stack Software Engineer | Angular, Spring Boot & Web Applications'
          )}
        </motion.p>

        {/* Typing Animation Tagline */}
        <motion.p
          className={`
            text-base md:text-lg mb-10 max-w-2xl mx-auto min-h-[3rem]
            ${isDeveloper ? 'text-muted-foreground font-mono' : 'text-muted-foreground'}
          `}
          variants={itemVariants}
        >
          {isDeveloper ? (
            <span>
              <span className="text-primary">const</span> tagline =
              <span className="text-accent">
                {' "'}
                {displayedText}
                {!isComplete && <span className="cursor-blink">|</span>}
                {'"'}
              </span>
            </span>
          ) : (
            <span>
              "{displayedText}"
              {!isComplete && <span className="animate-pulse">|</span>}
            </span>
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
              target={link.type === 'email' ? undefined : '_blank'}
              rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
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
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator isDeveloper={isDeveloper} />
    </section>
  );
}