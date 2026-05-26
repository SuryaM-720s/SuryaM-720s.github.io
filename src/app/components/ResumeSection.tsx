import { motion } from 'motion/react';

const ALGERIAN = "'Algerian', serif";
const RESUME_PATH = '/resume.pdf';

interface ResumeSectionProps {
  onBack: () => void;
}

export function ResumeSection({ onBack }: ResumeSectionProps) {
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
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 1.5rem 3rem',
      }}
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        style={{
          position: 'fixed',
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

      {/* Header */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontFamily: ALGERIAN,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#FFD700',
            letterSpacing: '0.06em',
          }}
        >
          Resume
        </div>

        {/* Download button */}
        <a
          href={RESUME_PATH}
          download="Surya_Prakash_Murugavvel_Resume.pdf"
          style={{
            fontFamily: ALGERIAN,
            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            color: '#FFD700',
            border: '1px solid #FFD700',
            borderRadius: '6px',
            padding: '0.5rem 1.2rem',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#FFD700';
            (e.currentTarget as HTMLAnchorElement).style.color = '#000';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.color = '#FFD700';
          }}
        >
          ↓ DOWNLOAD
        </a>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '1px',
          background: 'linear-gradient(90deg, #FFD700, rgba(255,215,0,0.1))',
          marginBottom: '2rem',
        }}
      />

      {/* PDF Preview */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          border: '1px solid rgba(255,215,0,0.25)',
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#111',
          boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
        }}
      >
        <object
          data={RESUME_PATH}
          type="application/pdf"
          style={{ width: '100%', height: '850px', display: 'block', border: 'none' }}
        >
          <div
            style={{
              height: '850px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              color: '#FFD700',
              fontFamily: ALGERIAN,
            }}
          >
            <p>Your browser can't preview PDFs inline.</p>
            <a
              href={RESUME_PATH}
              download="Surya_Prakash_Murugavvel_Resume.pdf"
              style={{
                color: '#FFD700',
                border: '1px solid #FFD700',
                borderRadius: '6px',
                padding: '0.5rem 1.2rem',
                textDecoration: 'none',
                fontFamily: ALGERIAN,
                letterSpacing: '0.06em',
              }}
            >
              ↓ DOWNLOAD
            </a>
          </div>
        </object>
      </div>
    </motion.section>
  );
}
