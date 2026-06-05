import { useState, useEffect } from 'react';

type Season = 'winter' | 'summer' | 'monsoon';

interface Package {
  name: string;
  image: string;
  days: number;
  season: Season;
}

const packages: Package[] = [
  // Summer (departures outbound from Oman)
  { name: 'Maldives Beach Retreat — Departures from Oman', image: '/images/seasonal/Maldives Summer.jpeg', days: 6, season: 'summer' },
  { name: 'Dubai City & Desert Safari — From Muscat', image: '/images/seasonal/Dubai Summer.jpeg', days: 5, season: 'summer' },
  { name: 'Muscat Heritage & Coastal (Short Escape)', image: '/images/seasonal/Muscat Summer.jpeg', days: 4, season: 'summer' },
  { name: 'Salalah Summer & Beaches — Outbound Options', image: '/images/seasonal/Salalah Summer.jpeg', days: 7, season: 'summer' },
  // Winter (ideal outbound windows)
  { name: 'Dubai Winter Festival — Fly from Oman', image: '/images/seasonal/Dubai Winter.jpeg', days: 5, season: 'winter' },
  { name: 'Muscat Winter Cultural Journey', image: '/images/seasonal/Muscat Winter.jpeg', days: 4, season: 'winter' },
  { name: 'Maldives Romantic Winter Getaway — Depart from Oman', image: '/images/seasonal/Maldives winter.jpeg', days: 6, season: 'winter' },
  { name: 'Salalah Winter & Desert Escapes', image: '/images/seasonal/Salalah Winter.jpeg', days: 5, season: 'winter' },
  // Monsoon / Khareef (seasonal outbound highlights)
  { name: 'Salalah Khareef & Monsoon Tour — Departures from Oman', image: '/images/seasonal/Salalah Monsoon.jpeg', days: 8, season: 'monsoon' },
  { name: 'Maldives Monsoon Diving Special — From Oman', image: '/images/seasonal/Maldives Monsoon.jpeg', days: 5, season: 'monsoon' },
  { name: 'Muscat Monsoon Coastal Escape', image: '/images/seasonal/Muscat Monsoon.jpeg', days: 4, season: 'monsoon' },
  { name: 'Dubai Monsoon City Break — Short Flights', image: '/images/seasonal/Dubai Monsoon.jpeg', days: 3, season: 'monsoon' },
];

const seasonConfig: Record<Season, { label: string; icon: string; heading: string; description: string }> = {
  winter: {
    label: 'Winter',
    icon: '❄️',
    heading: 'Winter Outbound — AL FAWAZ guides departures from Oman',
    description: 'Cozy desert nights, cultural city tours and warm island getaways — we arrange outbound winter travel from Oman with complete care.',
  },
  summer: {
    label: 'Summer',
    icon: '☀️',
    heading: 'Summer Escapes — Outbound from Oman with AL FAWAZ',
    description: 'Sun, sea, and city adventures — AL FAWAZ will organise flights, transfers and visas for outbound summer travel tailored to your needs.',
  },
  monsoon: {
    label: 'Monsoon',
    icon: '🌧️',
    heading: 'Monsoon & Khareef Specials — Depart from Oman',
    description: 'Enjoy lush landscapes and Khareef season highlights; we create seasonal outbound itineraries from Oman for nature lovers and explorers.',
  },
};

const CARDS_PER_VIEW = 3;

const SeasonalPackagesSection = () => {
  const [activeSeason, setActiveSeason] = useState<Season>('summer');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW);

  const filteredPackages = packages.filter(p => p.season === activeSeason);
  const config = seasonConfig[activeSeason];

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 700) setCardsPerView(1);
      else if (w < 1050) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeSeason]);

  const maxIndex = Math.max(0, filteredPackages.length - cardsPerView);
  const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const cardGap = 18;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0 3.5rem' }}>
      <style>{`
        .sp-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.15);
        }
        .sp-card:hover .sp-card-img {
          transform: scale(1.06);
        }
        .sp-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 50px;
          border: 1.5px solid rgba(10,107,107,0.25);
          background: white;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #1a2340;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .sp-tab:hover {
          border-color: #0A6B6B;
          background: rgba(10,107,107,0.05);
        }
        .sp-tab.active {
          background: #0A6B6B;
          border-color: #0A6B6B;
          color: white;
        }
        .sp-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .sp-nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.4);
          border-color: white;
        }
        .sp-nav-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
      `}</style>

      {/* Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("/images/seasonal-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(5,69,69,0.5) 0%, rgba(10,107,107,0.35) 40%, rgba(194,125,30,0.3) 100%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          color: 'white',
          textAlign: 'center',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em',
        }}>
          Not sure when or where? AL FAWAZ guides outbound travel from Oman
        </h2>

        {/* Season Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(Object.keys(seasonConfig) as Season[]).map(season => (
            <button
              key={season}
              className={`sp-tab${activeSeason === season ? ' active' : ''}`}
              onClick={() => setActiveSeason(season)}
            >
              <span style={{ fontSize: '1rem' }}>{seasonConfig[season].icon}</span>
              {seasonConfig[season].label}
            </button>
          ))}
        </div>

        {/* Content Area: Glassmorphic container */}
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '24px',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>

          {/* Left: Text */}
          <div style={{ flex: '0 0 260px', minWidth: '220px' }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              color: 'white',
              lineHeight: 1.3,
              marginBottom: '0.8rem',
            }}>
              {config.heading}
            </h3>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
            }}>
              {config.description}
            </p>
          </div>

          {/* Right: Carousel */}
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>

            {/* Nav Arrows */}
            <button
              className="sp-nav-btn"
              onClick={goPrev}
              disabled={currentIndex <= 0}
              aria-label="Previous packages"
              style={{ position: 'absolute', left: '-16px', top: '40%', zIndex: 10 }}
            >
              ‹
            </button>
            <button
              className="sp-nav-btn"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next packages"
              style={{ position: 'absolute', right: '-16px', top: '40%', zIndex: 10 }}
            >
              ›
            </button>

            {/* Cards Track */}
            <div style={{ overflow: 'hidden', borderRadius: '14px' }}>
              <div style={{
                display: 'flex',
                gap: `${cardGap}px`,
                transform: `translateX(calc(-${currentIndex} * (calc((100% - ${(cardsPerView - 1) * cardGap}px) / ${cardsPerView}) + ${cardGap}px)))`,
                transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}>
                {filteredPackages.map((pkg, i) => (
                  <div
                    key={`${activeSeason}-${i}`}
                    className="sp-card"
                    style={{
                      flex: `0 0 calc((100% - ${(cardsPerView - 1) * cardGap}px) / ${cardsPerView})`,
                      background: 'rgba(255,255,255,0.92)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Package Image */}
                    <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                      <img
                        className="sp-card-img"
                        src={pkg.image}
                        alt={pkg.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>

                    {/* Package Info */}
                    <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
                      <h4 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#1a2340',
                        lineHeight: 1.35,
                        marginBottom: '0.7rem',
                        minHeight: '2.4em',
                      }}>
                        {pkg.name}
                      </h4>

                      {/* Duration Row */}
                      <div style={{
                        borderTop: '1px solid #eee',
                        paddingTop: '0.6rem',
                      }}>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          color: '#6b7280',
                        }}>
                          {pkg.days} Days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalPackagesSection;
