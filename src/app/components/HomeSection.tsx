import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectsSection } from './ProjectsSection';
import { ResumeSection } from './ResumeSection';
import { ContactSection } from './ContactSection';

const ALGERIAN = "'Algerian', serif";
const NAV_ITEMS = ['Home', 'Projects', 'Resume', 'Contact'];


export function HomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showCard, setShowCard] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          height: '100vh',
          width: '100vw',
          background: '#000',
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden',
          scrollSnapAlign: 'start',
        }}
      >
        {/* Card back — gentle infinite float, click scrolls to this section */}
        <motion.img
          src="/card-back.jpg"
          alt="card back"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          onClick={() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            height: '100vh',
            width: 'auto',
            display: 'block',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        />

        {/* Nav — stagger fade-up on view */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              onClick={() => {
                if (item === 'Home') setShowCard(true);
                if (item === 'Projects') setShowProjects(true);
                if (item === 'Resume') setShowResume(true);
                if (item === 'Contact') setShowContact(true);
              }}
              whileHover={{ scale: 1.35, color: '#FFD700' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                fontFamily: ALGERIAN,
                fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                color: '#fff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                padding: 0,
                transformOrigin: 'center',
              }}
            >
              — {item.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Intro card — slides in from right, flush right */}
        <AnimatePresence>
          {showCard && (
            <motion.img
              src="/Intro_card.jpg"
              alt="intro card"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ height: '100vh', width: 'auto', display: 'block', flexShrink: 0 }}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Projects overlay */}
      <AnimatePresence>
        {showProjects && (
          <ProjectsSection onBack={() => setShowProjects(false)} />
        )}
      </AnimatePresence>

      {/* Resume overlay */}
      <AnimatePresence>
        {showResume && (
          <ResumeSection onBack={() => setShowResume(false)} />
        )}
      </AnimatePresence>

      {/* Contact overlay */}
      <AnimatePresence>
        {showContact && (
          <ContactSection onBack={() => setShowContact(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
