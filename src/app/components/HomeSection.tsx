import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectsSection } from './ProjectsSection';
import { ResumeSection } from './ResumeSection';
import { ContactSection } from './ContactSection';

const ALGERIAN = "'Algerian', serif";
const NAV_ITEMS = ['Home', 'Projects', 'Resume', 'Contact'];

// Monster types with conservative max offsets so we never hit the fallback
const MONSTER_TYPES: { type: string; max: number }[] = [
  { type: 'Effect Monster',           max: 4500 },
  { type: 'Normal Monster',           max: 400  },
  { type: 'Fusion Monster',           max: 900  },
  { type: 'Synchro Monster',          max: 600  },
  { type: 'XYZ Monster',              max: 500  },
  { type: 'Pendulum Effect Monster',  max: 250  },
  { type: 'Ritual Effect Monster',    max: 80   },
  { type: 'Synchro Tuner Monster',    max: 50   },
  { type: 'Flip Effect Monster',      max: 80   },
  { type: 'Union Effect Monster',     max: 50   },
  { type: 'Gemini Monster',           max: 50   },
  { type: 'Spirit Monster',           max: 50   },
];

async function fetchRandomMonster(): Promise<string | null> {
  const shuffled = [...MONSTER_TYPES].sort(() => Math.random() - 0.5);
  for (const { type, max } of shuffled) {
    try {
      const offset = Math.floor(Math.random() * max);
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${encodeURIComponent(type)}&num=1&offset=${offset}`
      );
      if (!res.ok) continue;
      const json = await res.json();
      if (json.error) continue;
      const img: string | undefined = json.data?.[0]?.card_images?.[0]?.image_url;
      if (img) return img;
    } catch {
      continue;
    }
  }
  return null;
}

function preloadImage(src: string): Promise<void> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

type FlipPhase = 'idle' | 'collapsing' | 'collapsed' | 'expanding';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export function HomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const [showCard, setShowCard] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [cardSrc, setCardSrc] = useState('/card-back.jpg');
  const [phase, setPhase] = useState<FlipPhase>('idle');
  const [fetchedSrc, setFetchedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== 'collapsed' || fetchedSrc === null) return;
    preloadImage(fetchedSrc).then(() => {
      setCardSrc(fetchedSrc);
      setFetchedSrc(null);
      setPhase('expanding');
    });
  }, [phase, fetchedSrc]);

  const handleCardClick = () => {
    const rect = sectionRef.current?.getBoundingClientRect();
    const isInView = rect ? rect.top < window.innerHeight * 0.5 : true;
    if (!isInView) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (phase !== 'idle') return;
    setPhase('collapsing');
    if (cardSrc === '/card-back.jpg') {
      fetchRandomMonster().then(url => setFetchedSrc(url ?? '/card-back.jpg'));
    } else {
      setFetchedSrc('/card-back.jpg');
    }
  };

  const handleAnimationComplete = () => {
    if (phase === 'collapsing') setPhase('collapsed');
    else if (phase === 'expanding') setPhase('idle');
  };

  const isFlipping = phase !== 'idle';

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          height: '100vh',
          width: '100vw',
          background: '#000',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'stretch',
          justifyContent: isMobile ? 'center' : undefined,
          gap: isMobile ? '1rem' : undefined,
          overflow: 'hidden',
          position: 'relative',
          scrollSnapAlign: 'start',
        }}
      >
        {/* Card — top on mobile, left on desktop */}
        <motion.div
          style={{ flexShrink: 0, display: 'flex', cursor: 'pointer' }}
          animate={{ scaleX: phase === 'collapsing' || phase === 'collapsed' ? 0 : 1 }}
          transition={{ duration: 0.22, ease: phase === 'collapsing' ? 'easeIn' : 'easeOut' }}
          onAnimationComplete={handleAnimationComplete}
          onClick={handleCardClick}
        >
          <motion.img
            src={cardSrc}
            alt="card"
            draggable="false"
            animate={isFlipping ? { y: 0 } : { y: [0, -14, 0] }}
            transition={
              isFlipping
                ? { duration: 0.1 }
                : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }
            style={{
              height: isMobile ? 'clamp(220px, 42vh, 380px)' : '100vh',
              width: 'auto',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Nav */}
        <div
          style={{
            flex: isMobile ? undefined : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '1.2rem' : '2.5rem',
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              onClick={() => {
                if (item === 'Home') setShowCard(true);
                if (item === 'Projects') setShowProjects(true);
                if (item === 'Resume') setShowResume(true);
                if (item === 'Contact') setShowContact(true);
              }}
              whileHover={{ scale: 1.35, color: '#FFD700', transition: { type: 'spring', stiffness: 600, damping: 20 } }}
              style={{
                fontFamily: ALGERIAN,
                fontSize: isMobile ? 'clamp(1.4rem, 6vw, 2rem)' : 'clamp(1.2rem, 2.5vw, 2rem)',
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

        {/* Desktop intro card — slides from right */}
        <AnimatePresence>
          {showCard && !isMobile && (
            <motion.img
              src="/Intro_card.jpg"
              alt="intro card"
              draggable="false"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ height: '100vh', width: 'auto', display: 'block', flexShrink: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Mobile intro card — centered overlay, tap to dismiss */}
        <AnimatePresence>
          {showCard && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowCard(false)}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.8)',
                zIndex: 5,
                cursor: 'pointer',
              }}
            >
              <motion.img
                src="/Intro_card.jpg"
                alt="intro card"
                draggable="false"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ height: 'min(72vh, 520px)', width: 'auto', display: 'block' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {showProjects && <ProjectsSection onBack={() => setShowProjects(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showResume && <ResumeSection onBack={() => setShowResume(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showContact && <ContactSection onBack={() => setShowContact(false)} />}
      </AnimatePresence>
    </>
  );
}
