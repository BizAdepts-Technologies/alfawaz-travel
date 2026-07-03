import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Ahmed Al Balushi',
    initials: 'A',
    color: '#0A6B6B',
    stars: 5,
    image: `${import.meta.env.BASE_URL}/images/dest-dubai.jpg`,
    avatar: `${import.meta.env.BASE_URL}/images/testimonials/ahmed-al-balushi.svg`,
    quote: 'Al Fawaz has been my go-to agency for years. They got me an amazing last-minute deal to Istanbul — truly unmatched service and attention to detail!',
  },
  {
    name: 'Fatima Al Rashdi',
    initials: 'F',
    color: '#C27D1E',
    stars: 5,
    image: `${import.meta.env.BASE_URL}/images/dest-maldives.jpg`,
    avatar: `${import.meta.env.BASE_URL}/images/testimonials/fatima-al-rashdi.svg`,
    quote: 'Booked a complete Maldives package for our family of 6. Everything was perfectly arranged — hotels, transfers, and activities. Zero stress!',
  },
  {
    name: 'Khalid Nasser',
    initials: 'K',
    color: '#054545',
    stars: 5,
    image: `${import.meta.env.BASE_URL}/images/dest-muscat.jpg`,
    avatar: `${import.meta.env.BASE_URL}/images/testimonials/khalid-nasser.svg`,
    quote: 'We rely on Al Fawaz for all our company travel. Their dedicated corporate desk saves us time and money every single month.',
  },
  {
    name: 'Sara Mohammed',
    initials: 'S',
    color: '#0A6B6B',
    stars: 5,
    image: `${import.meta.env.BASE_URL}/images/dest-salalah.jpg`,
    avatar: `${import.meta.env.BASE_URL}/images/testimonials/sara-mohammed.svg`,
    quote: 'The Salalah monsoon trip was magical! Every detail was taken care of, from hotel to sightseeing. Highly recommend their local tour packages.',
  },
  {
    name: 'Omar Al Hinai',
    initials: 'O',
    color: '#C27D1E',
    stars: 5,
    image: `${import.meta.env.BASE_URL}/images/dest-dubai.jpg`,
    avatar: `${import.meta.env.BASE_URL}/images/testimonials/omar-al-hinai.svg`,
    quote: 'I recently completed a trip organized by Al Fawaz and it was a truly wonderful experience. Professional team and seamless planning!',
  },
];

const CARDS_PER_VIEW = 3;

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

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

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const toggleExpand = (i: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const cardGap = 20;
  const maxChars = 120;

  return (
    <section style={{ background: 'linear-gradient(135deg, #fdf6ef 0%, #fef0e4 50%, #fdf6ef 100%)', padding: '4rem 0' }}>
      <style>{`
        .test-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .test-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }
        .test-card:hover .test-card-img {
          transform: scale(1.05);
        }
        .test-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(10,107,107,0.3);
          background: white;
          color: #054545;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .test-nav-btn:hover:not(:disabled) {
          background: #054545;
          color: white;
          border-color: #054545;
        }
        .test-nav-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .test-read-more {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #C27D1E;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .test-read-more:hover {
          color: #a56510;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>

          {/* Left: Quote Text */}
          <div style={{ flex: '0 0 280px', minWidth: '240px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#1a2340',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}>
              Dear travelers,{' '}
              <span style={{ color: '#5a6577' }}>we are grateful for being a part of your lifetime</span>{' '}
              <em style={{ color: '#C27D1E', fontStyle: 'italic' }}>memories!</em>
            </h2>
          </div>

          {/* Right: Carousel */}
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>

            {/* Navigation Arrows */}
            <button
              className="test-nav-btn"
              onClick={goPrev}
              disabled={currentIndex <= 0}
              aria-label="Previous"
              style={{ position: 'absolute', left: '-18px', top: '38%', zIndex: 10 }}
            >
              ‹
            </button>
            <button
              className="test-nav-btn"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next"
              style={{ position: 'absolute', right: '-18px', top: '38%', zIndex: 10 }}
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
                {testimonials.map((t, i) => {
                  const isExpanded = expandedCards.has(i);
                  const needsTruncation = t.quote.length > maxChars;
                  const displayQuote = isExpanded || !needsTruncation
                    ? t.quote
                    : t.quote.slice(0, maxChars) + '...';

                  return (
                    <div
                      key={i}
                      className="test-card"
                      style={{
                        flex: `0 0 calc((100% - ${(cardsPerView - 1) * cardGap}px) / ${cardsPerView})`,
                        background: 'white',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                      }}
                    >
                      {/* Travel Image */}
                      <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                        <img
                          className="test-card-img"
                          src={t.avatar || t.image}
                          alt={`Avatar of ${t.name}`}
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
                      <div style={{ padding: '1.2rem 1.3rem 1.4rem' }}>
                        {/* Avatar + Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.7rem' }}>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: t.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: 'white',
                            flexShrink: 0,
                          }}>
                            {t.initials}
                          </div>
                          <span style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: '#1a2340',
                          }}>
                            {t.name}
                          </span>
                        </div>

                        {/* Stars */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.6rem' }}>
                          <span style={{ fontSize: '1rem', color: '#f59e0b', letterSpacing: '2px' }}>
                            {'★'.repeat(t.stars)}
                          </span>
                          <span style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: '#6b7280',
                          }}>
                            {t.stars}
                          </span>
                        </div>

                        {/* Quote */}
                        <p style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '0.82rem',
                          fontWeight: 400,
                          color: '#5a6577',
                          lineHeight: 1.6,
                          marginBottom: '0.6rem',
                          minHeight: '3.2em',
                        }}>
                          {displayQuote}
                        </p>

                        {/* Read More */}
                        {needsTruncation && (
                          <button
                            className="test-read-more"
                            onClick={() => toggleExpand(i)}
                          >
                            {isExpanded ? 'Show Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
