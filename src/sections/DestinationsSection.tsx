import { useState, useRef, useEffect } from 'react';

const destinations = [
  {
    name: 'Salalah Heritage Tour',
    image: `${import.meta.env.BASE_URL}images/dest-salalah.jpg`,
    description: 'Explore the lush green landscapes of Salalah, visit ancient frankincense trails, and enjoy pristine beaches.',
  },
  {
    name: 'Maldives Beach Escape',
    image: `${import.meta.env.BASE_URL}images/dest-maldives.jpg`,
    description: 'Crystal-clear waters, overwater villas, and stunning coral reefs await you in this tropical paradise.',
  },
  {
    name: 'Dubai City Experience',
    image: `${import.meta.env.BASE_URL}images/dest-dubai.jpg`,
    description: 'From the towering Burj Khalifa to golden desert safaris, discover the glamour and adventure of Dubai.',
  },
  {
    name: 'Muscat Cultural Journey',
    image: `${import.meta.env.BASE_URL}images/dest-muscat.jpg`,
    description: 'Wander through ancient souks, visit the Grand Mosque, and savor authentic Omani cuisine daily.',
  },
  {
    name: 'Salalah Monsoon Special',
    image: `${import.meta.env.BASE_URL}images/dest-salalah.jpg`,
    description: 'Experience the magical Khareef season with misty mountains, waterfalls, and cool tropical breezes.',
  },
  {
    name: 'Maldives Honeymoon',
    image: `${import.meta.env.BASE_URL}images/dest-maldives.jpg`,
    description: 'Romantic sunsets, private island dining, and spa retreats designed for unforgettable honeymoon moments.',
  },
];

const CARDS_PER_VIEW = 3;

const DestinationsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW);

  useEffect(() => {
    const updateCardsPerView = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsPerView(1);
      else if (w < 960) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, destinations.length - cardsPerView);

  const goNext = () => {
    if (isTransitioning || currentIndex >= maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const goPrev = () => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const cardGap = 20;

  return (
    <section id="destinations" style={{ background: '#f8f9fa', padding: '4rem 0' }}>
      <style>{`
        .dest-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dest-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.15);
        }
        .dest-card:hover .dest-card-img {
          transform: scale(1.05);
        }
        .dest-read-more {
          display: inline-block;
          background: #1a2d50;
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 12px 28px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .dest-read-more:hover {
          background: #0d1b33;
        }
        .dest-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #1a2d50;
          background: white;
          color: #1a2d50;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .dest-nav-btn:hover:not(:disabled) {
          background: #1a2d50;
          color: white;
        }
        .dest-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            {/* <span style={{
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
              marginBottom: '0.8rem',
            }}>Popular Destinations</span> */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#1a2340',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Dream Destinations<br />
              <em style={{ color: '#C27D1E' }}>Await You</em>
            </h2>
          </div>
          <a href="#contact" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#1a2340',
            textDecoration: 'none',
            borderBottom: '1.5px solid #f59e0b',
            paddingBottom: '2px',
          }}>
            View All Destinations →
          </a>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Left Arrow */}
          <button
            className="dest-nav-btn"
            onClick={goPrev}
            disabled={currentIndex <= 0}
            aria-label="Previous destinations"
            style={{ position: 'absolute', left: '-22px', zIndex: 10 }}
          >
            ‹
          </button>

          {/* Cards Track */}
          <div style={{ overflow: 'hidden', flex: 1, borderRadius: '12px' }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                gap: `${cardGap}px`,
                transform: `translateX(calc(-${currentIndex} * (calc((100% - ${(cardsPerView - 1) * cardGap}px) / ${cardsPerView}) + ${cardGap}px)))`,
                transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {destinations.map((dest, i) => (
                <div
                  key={i}
                  className="dest-card"
                  style={{
                    flex: `0 0 calc((100% - ${(cardsPerView - 1) * cardGap}px) / ${cardsPerView})`,
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Image */}
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img
                      className="dest-card-img"
                      src={dest.image}
                      alt={dest.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.4rem 1.4rem 1.6rem' }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      color: '#1a2d50',
                      marginBottom: '0.7rem',
                      lineHeight: 1.3,
                    }}>
                      {dest.name}
                    </h3>

                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 400,
                      color: '#5a6577',
                      lineHeight: 1.6,
                      marginBottom: '1.2rem',
                    }}>
                      {dest.description}
                    </p>

                    {/* Divider */}
                    <div style={{
                      width: '100%',
                      height: '1px',
                      background: 'linear-gradient(to right, #ddd, #eee)',
                      marginBottom: '1.2rem',
                    }} />

                    {/* Read More Button */}
                    <a href="#contact" className="dest-read-more">
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="dest-nav-btn"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next destinations"
            style={{ position: 'absolute', right: '-22px', zIndex: 10 }}
          >
            ›
          </button>
        </div>

        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: currentIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: currentIndex === i ? '#1a2d50' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
