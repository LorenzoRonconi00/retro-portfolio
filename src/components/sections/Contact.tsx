import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { containerVariants, itemVariants } from '@/lib/animations';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'lorenzoronconi60@gmail.com', href: 'mailto:lorenzoronconi60@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+39 3318389305', href: 'tel:+393318389305' },
  { icon: MapPin, label: 'Location', value: 'Perugia, Italy', href: null },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/LorenzoRonconi00', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lorenzo-ronconi-74606a1a1/', label: 'LinkedIn' },
];

export function Contact() {
  const { mode } = useTheme();
  const isDeveloper = mode === 'developer';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mrgwqjgv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: isDeveloper ? '> Message sent!' : 'Message sent!',
          description: isDeveloper
            ? 'console.log("I\'ll get back to you soon!")'
            : "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 px-6" id="contact">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariants}>
          {isDeveloper ? (
            <h2 className="text-2xl md:text-3xl font-mono">
              <span className="text-accent">async function</span>{' '}
              <span className="text-primary">contact</span>
              <span className="text-muted-foreground">()</span>{' '}
              <span className="text-accent">{'{'}</span>
            </h2>
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className={`
                    p-3 rounded-lg
                    ${isDeveloper ? 'bg-primary/20 text-primary' : 'bg-secondary'}
                  `}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}`}>
                      {isDeveloper ? `// ${info.label}` : info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className={`
                          font-medium transition-colors
                          ${isDeveloper ? 'text-primary hover:text-accent font-mono' : 'hover:text-primary'}
                        `}
                      >
                        {isDeveloper ? `"${info.value}"` : info.value}
                      </a>
                    ) : (
                      <p className={`font-medium ${isDeveloper ? 'text-primary font-mono' : ''}`}>
                        {isDeveloper ? `"${info.value}"` : info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className={`text-sm mb-4 ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}`}>
                {isDeveloper ? '// social_links' : 'Connect with me'}
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 rounded-lg transition-colors
                      ${isDeveloper
                        ? 'border border-primary/40 hover:bg-primary hover:text-primary-foreground'
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
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`
                  block text-sm mb-2
                  ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                `}>
                  {isDeveloper ? 'name:' : 'Name'}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`
                    ${isDeveloper
                      ? 'font-mono bg-card border-primary/40 focus:border-primary'
                      : ''
                    }
                  `}
                  placeholder={isDeveloper ? '"Your name"' : 'Your name'}
                />
              </div>

              <div>
                <label className={`
                  block text-sm mb-2
                  ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                `}>
                  {isDeveloper ? 'email:' : 'Email'}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`
                    ${isDeveloper
                      ? 'font-mono bg-card border-primary/40 focus:border-primary'
                      : ''
                    }
                  `}
                  placeholder={isDeveloper ? '"your@email.com"' : 'your@email.com'}
                />
              </div>

              <div>
                <label className={`
                  block text-sm mb-2
                  ${isDeveloper ? 'font-mono text-muted-foreground' : 'text-muted-foreground'}
                `}>
                  {isDeveloper ? 'message:' : 'Message'}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className={`
                    resize-none
                    ${isDeveloper
                      ? 'font-mono bg-card border-primary/40 focus:border-primary'
                      : ''
                    }
                  `}
                  placeholder={isDeveloper ? '// Your message here...' : 'Your message...'}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !isFormValid}
                className={`
                  w-full gap-2
                  ${isDeveloper
                    ? 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground retro-glow font-mono'
                    : ''
                  }
                `}
              >
                <Send className="w-4 h-4" />
                {isSubmitting
                  ? (isDeveloper ? 'sending...' : 'Sending...')
                  : (isDeveloper ? 'await send()' : 'Send Message')
                }
              </Button>
            </form>
          </motion.div>
        </div>

        {isDeveloper && (
          <motion.div className="mt-12 font-mono text-accent" variants={itemVariants}>
            <span>{'}'}</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
