import { motion } from 'motion/react';

const ALGERIAN = "'Algerian', serif";

const PROJECTS = [
  {
    id: 'threadoku',
    src: '/threadoku.jpg',
    alt: 'Threadoku',
    link: 'https://github.com/SuryaM-720s/Threadoku',
  },
  {
    id: 'style_me',
    src: '/style_me.jpg',
    alt: 'Style.me',
    link: null,
  },
  {
    id: 'secret_society',
    src: '/secret_society.jpg',
    alt: 'Secret Society',
    link: 'https://github.com/SuryaM-720s/SecretSociety',
  },
  {
    id: 'paper_keys',
    src: '/paper_keys.jpg',
    alt: 'PaperKeys',
    link: 'https://github.com/joel-koshy/Paper-Piano',
  },
  {
    id: 'diagn_ai',
    src: '/diagn_ai.jpg',
    alt: 'DiagnAI',
    link: null,
  },
];

// Pentagon: top-left, top-center (apex), top-right, bottom-left, bottom-right
const POSITIONS = [
  { left: '17%', top: '4%'  }, // Threadoku
  { left: '50%', top: '0%'  }, // Style.me (apex)
  { left: '83%', top: '4%'  }, // Secret Society
  { left: '33%', top: '50%' }, // PaperKeys
  { left: '67%', top: '50%' }, // DiagnAI
];

interface ProjectsSectionProps {
  onBack: () => void;
}

export function ProjectsSection({ onBack }: ProjectsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '2rem',
          fontFamily: ALGERIAN,
          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
          color: '#FFD700',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          zIndex: 60,
        }}
      >
        ← BACK
      </motion.button>

      {/* Pentagon layout */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {PROJECTS.map((project, i) => {
          const pos = POSITIONS[i];
          const imgEl = (
            <motion.img
              key={project.id}
              src={project.src}
              alt={project.alt}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.08 }}
              style={{
                display: 'block',
                height: 'clamp(280px, 44vh, 460px)',
                width: 'auto',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                cursor: project.link ? 'pointer' : 'default',
              }}
            />
          );

          const wrapperStyle: React.CSSProperties = {
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            transform: 'translateX(-50%)',
            zIndex: 1,
          };

          return project.link ? (
            <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" style={wrapperStyle}>
              {imgEl}
            </a>
          ) : (
            <div key={project.id} style={wrapperStyle}>{imgEl}</div>
          );
        })}
      </div>
    </motion.section>
  );
}
