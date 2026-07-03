import { useRef } from 'react';
import { sectionBase } from '@/lib/sharedStyles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const memories = [
  {
    title: 'Hidden family gems',
    image: `${import.meta.env.BASE_URL}/images/travel_family_memory.png`, // Family/travel image
  },
  {
    title: 'Discovering culture',
    image: `${import.meta.env.BASE_URL}/images/travel_food_memory.png`, // Food/culture image
  },
  {
    title: 'The family fun list',
    image: `${import.meta.env.BASE_URL}/images/travel_adventure_memory.png`, // Surfing/fun image
  },
  {
    title: 'Unforgettable adventures',
    image: `${import.meta.env.BASE_URL}/images/Unforgettable adventures.jpeg`, // Adventure image
  }
];

const MemoriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth > 768 ? 400 : current.clientWidth;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ background: '#FAFAFA', padding: '6rem 0', position: 'relative' }}>
      <div style={{ ...sectionBase, position: 'relative' }}>

        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#053045',
          marginBottom: '3rem',
          letterSpacing: '-0.02em'
        }}>
          Creating memories together
        </h2>

        {/* Carousel Container */}
        <div style={{ position: 'relative', margin: '0 -1rem' }}>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '1rem',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none' // IE
            }}
            className="hide-scrollbar"
          >
            {memories.map((memory, idx) => (
              <div
                key={idx}
                style={{
                  flex: '0 0 auto',
                  width: 'calc(100% - 2rem)',
                  maxWidth: '360px',
                  scrollSnapAlign: 'start',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  transition: 'transform 0.3s'
                }}
              >
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={memory.image}
                    alt={memory.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Card Body */}
                <div style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'stretch'
                }}>
                  {/* Thick teal border line */}
                  <div style={{ width: '4px', background: '#0A6B6B', marginRight: '1rem' }} />

                  {/* Title */}
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 400,
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {memory.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Absolute positioned outside the track */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-2rem',
              top: '40%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 10,
              color: '#374151'
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-2rem',
              top: '40%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 10,
              color: '#374151'
            }}
            aria-label="Next"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>

        </div>
      </div>

      {/* Hide scrollbar CSS injection */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .hide-scrollbar + button {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MemoriesSection;
