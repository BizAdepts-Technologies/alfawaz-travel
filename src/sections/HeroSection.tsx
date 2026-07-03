import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.15}s`;
      (el as HTMLElement).classList.add('animate-in');
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100dvh',
        paddingTop: 'calc(72px + 2rem)',
        paddingBottom: '4rem',
        background: 'linear-gradient(160deg, #032828 0%, #054545 40%, #0A6B6B 70%, #0F8B8B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
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

        @keyframes globe-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-plane-1 {
          0% { transform: translate(-120px, 60px) rotate(-20deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(calc(100vw + 120px), -120px) rotate(-20deg); opacity: 0; }
        }

        @keyframes float-plane-2 {
          0% { transform: translate(calc(100vw + 80px), 80px) rotate(160deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, -60px) rotate(160deg); opacity: 0; }
        }

        @keyframes float-plane-3 {
          0% { transform: translate(-80px, 0px) rotate(-10deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(calc(100vw + 80px), -80px) rotate(-10deg); opacity: 0; }
        }

        @keyframes orbit-ring {
          from { transform: rotateX(75deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateZ(360deg); }
        }

        @keyframes globe-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(232, 145, 42, 0.3); }
          50% { box-shadow: 0 0 60px rgba(232, 145, 42, 0.6), 0 0 100px rgba(232, 145, 42, 0.2); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-in {
          animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes globe-spin-bg {
          from { background-position: 0 0; }
          to { background-position: -760px 0; }
        }

        @keyframes float-card-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        @keyframes float-card-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-2deg); }
        }

        @keyframes float-plane-1 {
          0% { transform: translate(-120px, 60px) rotate(-20deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(calc(100vw + 120px), -120px) rotate(-20deg); opacity: 0; }
        }

        @keyframes float-plane-2 {
          0% { transform: translate(calc(100vw + 80px), 80px) rotate(160deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, -60px) rotate(160deg); opacity: 0; }
        }

        @keyframes float-plane-3 {
          0% { transform: translate(-80px, 0px) rotate(-10deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(calc(100vw + 80px), -80px) rotate(-10deg); opacity: 0; }
        }

        .plane-1 { animation: float-plane-1 14s linear infinite 1s; position: absolute; top: 18%; left: 0; z-index: 10; }
        .plane-2 { animation: float-plane-2 18s linear infinite 6s; position: absolute; top: 65%; left: 0; z-index: 10; }
        .plane-3 { animation: float-plane-3 22s linear infinite 3s; position: absolute; top: 38%; left: 0; z-index: 10; }

        .cta-btn {
          background: linear-gradient(135deg, #E8912A, #F0A84A);
          color: white;
          border: none;
          padding: 18px 48px;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 60px;
          text-decoration: none;
          display: inline-block;
          animation: pulse-glow 2.5s ease-in-out infinite;
          transition: transform 0.2s;
        }
        .cta-btn:hover { transform: scale(1.05); }

        .scroll-dot {
          width: 6px; height: 6px; background: rgba(255,255,255,0.6);
          border-radius: 50%;
          animation: scroll-bounce 1.8s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(12px); opacity: 1; }
        }
      `}</style>

      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
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

      {/* Cartoon Airplane 1 */}
      <div className="plane-1">
        <svg width="80" height="40" viewBox="0 0 80 40">
          <g>
            <ellipse cx="38" cy="20" rx="30" ry="9" fill="#FFD166" stroke="#E8A020" strokeWidth="1.5" />
            <ellipse cx="66" cy="20" rx="8" ry="6" fill="#FF6B35" stroke="#E8A020" strokeWidth="1.5" />
            <ellipse cx="10" cy="20" rx="6" ry="4" fill="#FFD166" stroke="#E8A020" strokeWidth="1" />
            <path d="M35 20 L45 4 L55 8 L45 20Z" fill="#06D6A0" stroke="#048A68" strokeWidth="1.2" />
            <path d="M35 20 L45 36 L55 32 L45 20Z" fill="#06D6A0" stroke="#048A68" strokeWidth="1.2" />
            <path d="M10 20 L6 8 L14 14Z" fill="#118AB2" stroke="#07607D" strokeWidth="1" />
            <circle cx="52" cy="18" r="3.5" fill="#E8F4FD" stroke="#118AB2" strokeWidth="1" />
            <circle cx="43" cy="17" r="3" fill="#E8F4FD" stroke="#118AB2" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Cartoon Airplane 2 */}
      <div className="plane-2">
        <svg width="70" height="35" viewBox="0 0 70 35" style={{ transform: 'scaleX(-1)' }}>
          <ellipse cx="33" cy="17" rx="26" ry="8" fill="#EF476F" stroke="#C0305A" strokeWidth="1.5" />
          <ellipse cx="57" cy="17" rx="7" ry="5" fill="#FF9F1C" stroke="#C0305A" strokeWidth="1.5" />
          <ellipse cx="9" cy="17" rx="5" ry="3.5" fill="#EF476F" stroke="#C0305A" strokeWidth="1" />
          <path d="M30 17 L39 4 L47 7 L40 17Z" fill="#8338EC" stroke="#5B1DB5" strokeWidth="1.2" />
          <path d="M30 17 L39 30 L47 27 L40 17Z" fill="#8338EC" stroke="#5B1DB5" strokeWidth="1.2" />
          <path d="M9 17 L5 7 L12 12Z" fill="#3A86FF" stroke="#1A63D5" strokeWidth="1" />
          <circle cx="46" cy="15" r="3" fill="#E8F4FD" stroke="#3A86FF" strokeWidth="1" />
          <circle cx="38" cy="15" r="2.5" fill="#E8F4FD" stroke="#3A86FF" strokeWidth="1" />
        </svg>
      </div>

      {/* Cartoon Airplane 3 */}
      <div className="plane-3">
        <svg width="50" height="26" viewBox="0 0 50 26">
          <ellipse cx="24" cy="13" rx="19" ry="6" fill="#A8DADC" stroke="#6BA3A5" strokeWidth="1.2" />
          <ellipse cx="41" cy="13" rx="6" ry="4" fill="#457B9D" stroke="#6BA3A5" strokeWidth="1.2" />
          <path d="M22 13 L28 3 L34 6 L29 13Z" fill="#E63946" stroke="#B02535" strokeWidth="1" />
          <path d="M22 13 L28 23 L34 20 L29 13Z" fill="#E63946" stroke="#B02535" strokeWidth="1" />
          <circle cx="33" cy="11" r="2.2" fill="white" stroke="#457B9D" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Main Layout */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>

        {/* Left: Text Content */}
        <div style={{ flex: '1 1 380px', minWidth: '280px', transform: 'translateY(-30px)', }}>

          <h1
            data-animate
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Explore the
            <br />
            <span style={{ color: '#E8912A', fontStyle: 'italic' }}>World</span> with
            <br />
            Al Fawaz
          </h1>

          <p
            data-animate
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              maxWidth: '420px',
              marginBottom: '2.5rem',
            }}
          >
            Your trusted travel partner in Oman crafting extraordinary journeys, seamless flights, and unforgettable experiences since 1989.
          </p>

          <div data-animate style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact" className="cta-btn">
              Plan Your Journey
            </a>
            <a
              href="#services"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.25)',
                paddingBottom: '2px',
                transition: 'color 0.2s',
                letterSpacing: '0.04em',
              }}
            >
              Our Services →
            </a>
          </div>

          {/* Trust badges */}
          {/* <div data-animate style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { num: '35+', label: 'Years Experience' },
              { num: '50K+', label: 'Happy Travelers' },
              { num: '120+', label: 'Destinations' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#E8912A', lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Right: Realistic Globe & Floating Cards */}
        <div data-animate style={{ flex: '1 1 420px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '480px' }}>

          {/* Orbital rings */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-240px', marginLeft: '-240px', width: '480px', height: '480px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', transform: 'rotateX(60deg) rotateY(15deg)', animation: 'globe-spin 25s linear infinite' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-280px', marginLeft: '-280px', width: '560px', height: '560px', border: '1px dashed rgba(232, 145, 42, 0.25)', borderRadius: '50%', transform: 'rotateX(75deg) rotateY(-15deg)', animation: 'globe-spin 35s linear infinite reverse' }} />

          {/* Top Cartoon Scenery (Mountains, Trees, Bags, Traveler) */}
          <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', zIndex: 30, animation: 'float-card-1 4s ease-in-out infinite' }}>
            <svg width="200" height="120" viewBox="0 0 200 120" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
              {/* Land / Island base */}
              <path d="M 20 100 Q 100 120 180 100 Q 195 90 170 85 Q 100 70 30 85 Q 5 90 20 100 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />

              {/* Mountains */}
              <path d="M 40 85 L 70 30 L 100 85 Z" fill="#95A5A6" stroke="#7F8C8D" strokeWidth="1.5" />
              <path d="M 70 85 L 110 20 L 150 85 Z" fill="#BDC3C7" stroke="#95A5A6" strokeWidth="1.5" />
              {/* Snow caps */}
              <path d="M 70 30 L 82 50 L 70 45 L 60 55 Z" fill="#ECF0F1" />
              <path d="M 110 20 L 125 45 L 110 40 L 95 50 Z" fill="#ECF0F1" />

              {/* Palm Tree */}
              <path d="M 160 85 Q 165 60 175 40" fill="none" stroke="#D35400" strokeWidth="4" />
              <path d="M 170 40 Q 150 30 140 45" fill="none" stroke="#27AE60" strokeWidth="3" />
              <path d="M 170 40 Q 165 20 175 10" fill="none" stroke="#27AE60" strokeWidth="3" />
              <path d="M 170 40 Q 185 25 195 40" fill="none" stroke="#27AE60" strokeWidth="3" />
              <path d="M 170 40 Q 190 50 180 65" fill="none" stroke="#27AE60" strokeWidth="3" />

              {/* Suitcase */}
              <rect x="35" y="65" width="24" height="30" rx="4" fill="#E67E22" stroke="#D35400" strokeWidth="1.5" />
              <rect x="35" y="70" width="24" height="20" fill="#F39C12" />
              <rect x="42" y="58" width="10" height="7" fill="none" stroke="#D35400" strokeWidth="2" />
              <circle cx="39" cy="95" r="3" fill="#34495E" />
              <circle cx="55" cy="95" r="3" fill="#34495E" />

              {/* Cartoon Girl/Guy (Traveler) */}
              <g transform="translate(90, 50)">
                {/* Body/Shirt */}
                <path d="M 0 15 Q 10 10 20 15 L 25 35 L -5 35 Z" fill="#3498DB" />
                {/* Backpack */}
                <rect x="-10" y="12" width="12" height="20" rx="3" fill="#E74C3C" />
                {/* Head */}
                <circle cx="10" cy="5" r="8" fill="#FAD7A1" />
                {/* Hair */}
                <path d="M 2 5 Q 10 -5 18 5 Q 10 0 2 5 Z" fill="#2C3E50" />
                <path d="M 0 5 Q 10 -8 20 5 A 10 10 0 0 0 0 5" fill="#2C3E50" />
                {/* Legs */}
                <rect x="2" y="35" width="5" height="15" fill="#2980B9" />
                <rect x="13" y="35" width="5" height="15" fill="#2980B9" />
                {/* Shoes */}
                <rect x="0" y="48" width="8" height="4" rx="2" fill="#34495E" />
                <rect x="11" y="48" width="8" height="4" rx="2" fill="#34495E" />
                {/* Arms */}
                <path d="M 0 18 Q -10 25 -5 35" fill="none" stroke="#FAD7A1" strokeWidth="3" strokeLinecap="round" />
                <path d="M 20 18 Q 30 20 28 10" fill="none" stroke="#FAD7A1" strokeWidth="3" strokeLinecap="round" />
                {/* Camera */}
                <rect x="25" y="6" width="8" height="6" rx="1" fill="#7F8C8D" />
                <circle cx="29" cy="9" r="2" fill="#2C3E50" />
              </g>
            </svg>
          </div>

          {/* Realistic Earth Globe */}
          <div style={{
            position: 'relative',
            width: 'min(100%, 380px)',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            boxShadow: 'inset -30px -30px 50px rgba(0,0,0,0.85), inset 15px 15px 35px rgba(255,255,255,0.35), 0 0 60px rgba(10,107,107,0.5)',
            background: `url("${import.meta.env.BASE_URL}/images/glob.png")`,
            backgroundSize: '760px 100%',
            animation: 'globe-spin-bg 45s linear infinite',
            transform: 'rotate(15deg)'
          }}>
            {/* Atmospheric glow overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(255,255,255,0.1)',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Floating Glassmorphic Card 1 */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '-2%',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '16px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'float-card-1 6s ease-in-out infinite',
            zIndex: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #E8912A, #F0A84A)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(232, 145, 42, 0.4)' }}>✈️</div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>Next Flight</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'white', fontWeight: 600, lineHeight: 1.1 }}>Dubai (DXB)</div>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphic Card 2 */}
          <div style={{
            position: 'absolute',
            bottom: '22%',
            left: '-6%',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '16px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'float-card-2 7s ease-in-out infinite 1s',
            zIndex: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #06D6A0, #048A68)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(6, 214, 160, 0.4)' }}>🌴</div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>Trending</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'white', fontWeight: 600, lineHeight: 1.1 }}>Maldives</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}>
          <div className="scroll-dot" style={{ margin: '-3px auto 0' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;