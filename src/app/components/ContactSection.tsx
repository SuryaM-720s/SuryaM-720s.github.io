import { useState } from 'react';
import { motion } from 'motion/react';

const ALGERIAN = "'Algerian', serif";
const YOUR_EMAIL = 'suryamvvel@gmail.com';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SuryaM-720s',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/suryaprakash-m7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${YOUR_EMAIL}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

interface ContactSectionProps {
  onBack: () => void;
}

export function ContactSection({ onBack }: ContactSectionProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,215,0,0.05)',
    border: '1px solid rgba(255,215,0,0.3)',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

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
        padding: '2rem',
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

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5rem',
          width: '100%',
          maxWidth: '900px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left — title + socials */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div
            style={{
              fontFamily: ALGERIAN,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#FFD700',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
            }}
          >
            Get In<br />Touch
          </div>

          {/* Divider */}
          <div style={{ width: '60px', height: '2px', background: '#FFD700', opacity: 0.6 }} />

          {/* Social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontFamily: ALGERIAN,
                  letterSpacing: '0.06em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                {social.icon}
                {social.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: ALGERIAN,
              fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
              color: 'rgba(255,215,0,0.6)',
              letterSpacing: '0.08em',
              marginBottom: '0.25rem',
            }}
          >
            Send A Message
          </div>

          <input
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = '#FFD700')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)')}
          />

          <textarea
            placeholder="Your message"
            value={message}
            required
            rows={6}
            onChange={e => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#FFD700')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)')}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04, background: '#FFD700', color: '#000' }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              fontFamily: ALGERIAN,
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: '#FFD700',
              background: 'transparent',
              border: '1px solid #FFD700',
              borderRadius: '6px',
              padding: '0.75rem 2rem',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              alignSelf: 'flex-start',
            }}
          >
            Send
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
}
