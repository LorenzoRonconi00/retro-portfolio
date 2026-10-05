import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Navbar } from '@/components/Navbar';
import { GridBackground } from '@/components/GridBackground';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { TechStack } from '@/components/sections/TechStack';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

const Index = () => {
  return (
    <ThemeProvider>
      <GridBackground />
      <ThemeToggle />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
};

export default Index;
