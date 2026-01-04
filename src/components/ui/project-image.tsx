import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  isDeveloper: boolean;
}

export function ProjectImage({ src, alt, isDeveloper }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`
        w-full h-32 flex items-center justify-center
        ${isDeveloper 
          ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40' 
          : 'bg-gradient-to-br from-primary/10 to-accent/10'
        }
      `}>
        <span className={`
          text-4xl font-bold
          ${isDeveloper ? 'text-primary font-mono' : 'text-muted-foreground'}
        `}>
          {alt.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-32 overflow-hidden group">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain bg-background"
        onError={() => setImageError(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        style={isDeveloper ? { imageRendering: 'crisp-edges' } : {}}
      />
      
      <div className={`
        absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100
        ${isDeveloper 
          ? 'bg-gradient-to-t from-primary/80 via-primary/40 to-transparent' 
          : 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
        }
      `} />

      {isDeveloper && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: [0, 0.3, 0, 0.3, 0],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="h-0.5 w-full bg-accent absolute top-0 animate-scan" />
        </motion.div>
      )}
    </div>
  );
}