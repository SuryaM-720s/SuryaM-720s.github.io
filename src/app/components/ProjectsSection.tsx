import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ALGERIAN = "'Algerian', serif";

const PROJECTS = [
  {
    id: 'threadoku',
    src: '/threadoku.jpg',
    alt: 'Threadoku',
    link: 'https://github.com/SuryaM-720s/Threadoku',
    tech: ['C++', 'JavaScript', 'WebAssembly', 'Emscripten', 'CPR', 'nlohmann/json'],
  },
  {
    id: 'paper_keys',
    src: '/paper_keys.jpg',
    alt: 'PaperKeys',
    link: 'https://github.com/joel-koshy/Paper-Piano',
    tech: ['ReactJS', 'JavaScript', 'MediaPipe'],
  },
  {
    id: 'style_me',
    src: '/style_me.jpg',
    alt: 'Style.me',
    link: null,
    tech: ['Python', 'JavaScript', 'Selenium', 'OpenAI API', 'Pinterest API'],
  },
  {
    id: 'diagn_ai',
    src: '/diagn_ai.jpg',
    alt: 'DiagnAI',
    link: null,
    tech: ['Python', 'HTML/CSS', 'JavaScript', 'Anthropic API'],
  },
  {
    id: 'secret_society',
    src: '/secret_society.jpg',
    alt: 'Secret Society',
    link: 'https://github.com/SuryaM-720s/SecretSociety',
    tech: ['Python', 'TCP Sockets', 'Threading', 'JSON'],
  },
];

const DEAL_X = ['280%', '140%', '0', '-140%', '-280%'];
const DEAL_DELAY = [0.15, 0.07, 0, 0.07, 0.15];

interface ProjectsSectionProps {
  onBack: () => void;
}

export function ProjectsSection({ onBack }: ProjectsSectionProps) {
  const [summoned, setSummoned] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoveredProject = PROJECTS.find(p => p.id === hoveredId);

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

      <AnimatePresence mode="wait">
        {!summoned ? (
          <motion.div
            key="pre"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            <motion.button
              onClick={() => setSummoned(true)}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              whileHover={{ scale: 1.06, background: '#FFD700', color: '#000' }}
              style={{
                fontFamily: ALGERIAN,
                fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                color: '#FFD700',
                background: 'transparent',
                border: '1px solid #FFD700',
                borderRadius: '6px',
                padding: '0.6rem 1.8rem',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              SUMMON EXODIA
            </motion.button>

            <motion.img
              src="/style_me.jpg"
              alt="Style.me"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                display: 'block',
                height: 'clamp(320px, 75vh, 700px)',
                width: 'auto',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                cursor: 'default',
                flexShrink: 0,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="summoned"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5vw',
              padding: '0 2vw',
              width: '100%',
              overflow: 'visible',
            }}
          >
            {PROJECTS.map((project, i) => {
              const card = (
                <motion.div
                  key={project.id}
                  initial={{ x: DEAL_X[i], opacity: i === 2 ? 1 : 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: DEAL_DELAY[i], ease: [0.25, 0.46, 0.45, 0.94] }}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  style={{
                    width: 'clamp(160px, 18.5vw, 365px)',
                    aspectRatio: '619 / 922',
                    flexShrink: 0,
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                    cursor: project.link ? 'pointer' : 'default',
                    transformOrigin: i === 0 ? 'left center' : i === 4 ? 'right center' : 'center center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={project.src}
                    alt={project.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </motion.div>
              );

              return project.link ? (
                <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <React.Fragment key={project.id}>{card}</React.Fragment>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech stack — bottom center, appears on card hover */}
      <AnimatePresence>
        {hoveredProject && summoned && (
          <motion.div
            key={hoveredProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: 0,
              right: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 55,
            }}
          >
            {hoveredProject.tech.map(tag => (
              <span
                key={tag}
                style={{
                  background: '#000',
                  color: '#FFD700',
                  border: '1px solid #FFD700',
                  borderRadius: '999px',
                  padding: '6px 20px',
                  fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  fontFamily: ALGERIAN,
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
