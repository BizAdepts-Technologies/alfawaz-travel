import React from 'react';

export const sectionBase: React.CSSProperties = {
  padding: '6rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

export const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#c27d1e',
  background: 'rgba(245,158,11,0.1)',
  border: '1px solid rgba(245,158,11,0.25)',
  padding: '5px 14px',
  borderRadius: '40px',
  marginBottom: '1.2rem',
};

export const sectionTitle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 700,
  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
  color: '#1a2340',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: '1rem',
};
