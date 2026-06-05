import React, { useEffect, useState } from 'react';

const team = [
  { name: 'Nizamudheen', image: 'https://i.pravatar.cc/500?img=12' },
  { name: 'Haneefa', image: 'https://i.pravatar.cc/500?img=32' },
  { name: 'Roshan Abdul Jaleel', image: 'https://i.pravatar.cc/500?img=47' },
  { name: 'Irfan Noufal', image: 'https://i.pravatar.cc/500?img=52' },
  //   { name: 'Moosa Muringekal', image: 'https://i.pravatar.cc/500?img=66' },
];

const CARDS_PER_VIEW = 4;

const TeamSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 700) setCardsPerView(1);
      else if (w < 1050) setCardsPerView(2);
      else if (w < 1280) setCardsPerView(3);
      else setCardsPerView(CARDS_PER_VIEW);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, team.length - cardsPerView);

  const goNext = () => setCurrentIndex((p) => Math.min(p + 1, maxIndex));
  const goPrev = () => setCurrentIndex((p) => Math.max(p - 1, 0));

  const gap = 22;

  return (
    <section id="team" className="section-padding bg-cream">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-8">
          <h2 className="section-title">
            <span className="mr-3">MEET</span>
            <span className="text-teal">OUR TEAM</span>
          </h2>
        </div>

        <div className="relative">
          {/* Navigation */}
          <button
            aria-label="Previous team"
            onClick={goPrev}
            disabled={currentIndex <= 0}
            className="hidden md:flex items-center justify-center test-nav-btn"
            style={{ position: 'absolute', left: '-18px', top: '38%', zIndex: 10 }}
          >
            ‹
          </button>
          <button
            aria-label="Next team"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="hidden md:flex items-center justify-center test-nav-btn"
            style={{ position: 'absolute', right: '-18px', top: '38%', zIndex: 10 }}
          >
            ›
          </button>

          <div style={{ overflow: 'hidden', borderRadius: '14px' }}>
            <div
              style={{
                display: 'flex',
                gap: `${gap}px`,
                transform: `translateX(calc(-${currentIndex} * (calc((100% - ${(cardsPerView - 1) * gap}px) / ${cardsPerView}) + ${gap}px)))`,
                transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {team.map((m) => (
                <div
                  key={m.name}
                  style={{
                    flex: `0 0 calc((100% - ${(cardsPerView - 1) * gap}px) / ${cardsPerView})`,
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 6px 24px rgba(10,107,107,0.06)',
                  }}
                >
                  <div style={{ width: '100%', height: '340px', overflow: 'hidden' }}>
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  <div style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#1a2340', fontSize: '0.95rem', letterSpacing: '0.02em' }}>{m.name.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .test-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(10,107,107,0.25);
          background: white;
          color: #054545;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(10,107,107,0.06);
        }
        .test-nav-btn:hover:not(:disabled) {
          background: #054545;
          color: white;
          border-color: #054545;
        }
        .test-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
      `}</style>
    </section>
  );
};

export default TeamSection;
