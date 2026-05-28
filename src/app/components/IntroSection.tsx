import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';

const ALGERIAN = "'Algerian', serif";
const CLIP_START = 54;
const CLIP_END = 71.7;

export function IntroSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const audio = new Audio('/ygo-theme.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      if (clipTimeoutRef.current) clearTimeout(clipTimeoutRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Stop audio when section scrolls out of view
  useEffect(() => {
    const section = sectionRef.current as HTMLElement | null;
    if (!section) return;

    let root: Element | null = null;
    let el = section.parentElement;
    while (el && el !== document.body) {
      const oy = getComputedStyle(el).overflowY;
      if (oy === 'scroll' || oy === 'auto' || oy === 'overlay') { root = el; break; }
      el = el.parentElement;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (clipTimeoutRef.current) { clearTimeout(clipTimeoutRef.current); clipTimeoutRef.current = null; }
          audioRef.current?.pause();
        }
      },
      { threshold: 0.3, root }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleDuelClick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (clipTimeoutRef.current) {
      clearTimeout(clipTimeoutRef.current);
      clipTimeoutRef.current = null;
    }
    audio.currentTime = CLIP_START;
    audio.play().catch(() => {});
    clipTimeoutRef.current = setTimeout(
      () => audio.pause(),
      (CLIP_END - CLIP_START) * 1000
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: 'calc(100vh - 90px)',
        width: '100vw',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        scrollSnapAlign: 'start',
      }}
    >
      {/* IT'S TIME TO — slides in from left */}
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: '-100vw', opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        style={{
          fontFamily: ALGERIAN,
          fontSize: '6vw',
          color: '#000080',
          letterSpacing: '0.06em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        It's Time To
      </motion.div>

      {/* DUEL — slides in from right, scales up on hover, plays audio on click */}
      <motion.div
        initial={{ x: '100vw', opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: '100vw', opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        whileHover={{ scale: 1.12, textShadow: '0 0 40px rgba(255,215,0,0.6)', WebkitTextStroke: '0px #000' }}
        whileTap={{ scale: 0.97 }}
        onClick={handleDuelClick}
        style={{
          fontFamily: ALGERIAN,
          fontSize: '28vw',
          color: '#FFD700',
          lineHeight: 0.85,
          whiteSpace: 'nowrap',
          WebkitTextStroke: '6px #000',
          userSelect: 'none',
          cursor: 'pointer',
        }}
      >
        Duel
      </motion.div>
    </section>
  );
}
