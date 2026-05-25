import { motion } from 'motion/react';

const ALGERIAN = "'Algerian', serif";

export function IntroSection() {
  return (
    <section
      style={{
        height: '100vh',
        width: '100vw',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* IT'S TIME TO — slides in from left */}
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
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

      {/* DUEL — slides in from right */}
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        style={{
          fontFamily: ALGERIAN,
          fontSize: '28vw',
          color: '#FFD700',
          lineHeight: 0.85,
          whiteSpace: 'nowrap',
          WebkitTextStroke: '6px #000',
          userSelect: 'none',
        }}
      >
        Duel
      </motion.div>
    </section>
  );
}
