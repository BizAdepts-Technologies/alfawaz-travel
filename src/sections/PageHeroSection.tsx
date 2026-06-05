import React, { useEffect, useRef } from 'react';

interface PageHeroSectionProps {
  title: string;
  subtitle: string;
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({ title, subtitle }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.1 + i * 0.15}s`;
      (el as HTMLElement).classList.add('animate-in');
    });
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '60vh',
        background: 'linear-gradient(160deg, #032828 0%, #054545 40%, #0A6B6B 70%, #0F8B8B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '2rem',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .hero-star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-in {
          animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="hero-star"
          style={{
            width: `${Math.random() * 2.5 + 1}px`,
            height: `${Math.random() * 2.5 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Main Layout */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1
          data-animate
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.05,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          {title}
        </h1>
        <p
          data-animate
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHeroSection;
