import { useTheme } from '@/contexts/ThemeContext';

export function GridBackground() {
  const { mode } = useTheme();
  
  if (mode !== 'developer') return null;

  return (
    <>
      <div className="grid-background" />
      <div className="crt-overlay" />
    </>
  );
}
