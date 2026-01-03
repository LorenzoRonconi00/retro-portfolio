import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ThemeMode = 'professional' | 'developer';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('professional');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMode = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setMode((prev) => (prev === 'professional' ? 'developer' : 'professional'));
    }, 250);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'developer') {
      root.classList.add('developer');
    } else {
      root.classList.remove('developer');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isTransitioning }}>
      {children}
      {isTransitioning && <div className="screen-flash" />}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
