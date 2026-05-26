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
    id: 'paper_keys',
    src: '/paper_keys.jpg',
    alt: 'PaperKeys',
    link: 'https://github.com/joel-koshy/Paper-Piano',
  },
  {
    id: 'style_me',
    src: '/style_me.jpg',
    alt: 'Style.me',
    link: null,
  },
  {
    id: 'diagn_ai',
    src: '/diagn_ai.jpg',
    alt: 'DiagnAI',
    link: null,
  },
  {
    id: 'secret_society',
    src: '/secret_society.jpg',
    alt: 'Secret Society',
    link: 'https://github.com/SuryaM-720s/SecretSociety',
  },
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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

      {/* Horizontal card row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5vw',
          padding: '0 2vw',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        {PROJECTS.map((project, i) => {
          const imgEl = (
            <motion.img
              key={project.id}
              src={project.src}
              alt={project.alt}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              style={{
                display: 'block',
                height: 'clamp(320px, 75vh, 700px)',
                width: 'auto',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                cursor: project.link ? 'pointer' : 'default',
                flexShrink: 0,
              }}
            />
          );

          return project.link ? (
            <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">
              {imgEl}
            </a>
          ) : (
            <div key={project.id}>{imgEl}</div>
          );
        })}
      </div>
    </motion.section>
  );
}
