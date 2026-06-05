import { ArrowRight } from 'lucide-react';

const CTASection = () => (
  <section
    id="cta"
    style={{
      position: 'relative',
      minHeight: '600px',
      background: 'url("/images/solo_travel_cta.png") center/cover no-repeat',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    {/* Dark gradient overlay on the left to make text readable */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
      pointerEvents: 'none'
    }} />

    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 3rem'
    }}>
      <div style={{ maxWidth: '540px' }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }}>
          Ready to explore<br />Oman's hidden gems?
        </h2>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '480px'
        }}>
          Get ready for an unforgettable adventure with Al Fawaz Travels – with everything at your fingertips, from the best local restaurants and convenient transport, to the most stunning sights in Salalah, Duqm, and beyond.
        </p>

        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            color: '#2d1b36',
            padding: '14px 32px',
            borderRadius: '40px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Plan your trip
          <ArrowRight size={20} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
