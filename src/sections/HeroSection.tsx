import { useEffect, useRef, type ReactNode } from 'react';

const getImgUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const IMAGES = {
  dunes: getImgUrl('/images/dest-dubai.jpg'),
  mountain: getImgUrl('/images/service-tours.jpg'),
  center: getImgUrl('/images/dest-salalah.jpg'),
  coast: getImgUrl('/images/dest-muscat.jpg'),
  forest: getImgUrl('/images/Unforgettable adventures.jpeg'),
};

type Pillar = {
  key: string;
  img: string;
  icon: ReactNode;
  caption?: { title: string; subtitle: string };
};

const IconWrap = ({ children }: { children: ReactNode }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F7A54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const FootprintsIcon = () => (
  <IconWrap>
    <>
      <path d="M4 16c-.5 1.5 0 3 2 3s3-1 3-3-1-4-1-6c0-1.5.5-3 2-3s2.5 1.5 2 3c-.5 2 0 4.5 0 6.5 0 2 1.5 3.5 3.5 3.5s3-1.5 2.5-3.5" />
      <circle cx="6.5" cy="7.5" r="1" fill="#1F7A54" />
      <circle cx="16.5" cy="4.5" r="1" fill="#1F7A54" />
    </>
  </IconWrap>
);

const MountainIcon = () => (
  <IconWrap>
    <path d="M3 19l6-10 4 6 2-3 6 7H3z" />
  </IconWrap>
);

const TentIcon = () => (
  <IconWrap>
    <>
      <path d="M4 19l8-14 8 14z" />
      <path d="M9 19l3-6 3 6" />
    </>
  </IconWrap>
);

const KayakIcon = () => (
  <IconWrap>
    <>
      <path d="M2 16c3-3 17-3 20 0" />
      <path d="M4 20l16-16" />
    </>
  </IconWrap>
);

const CameraIcon = () => (
  <IconWrap>
    <>
      <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </>
  </IconWrap>
);

const pillars: (Pillar & { size: 'outer' | 'inner' | 'center' })[] = [
  { key: 'dunes', img: IMAGES.dunes, size: 'outer', icon: <FootprintsIcon /> },
  { key: 'mountain', img: IMAGES.mountain, size: 'inner', icon: <MountainIcon /> },
  {
    key: 'center',
    img: IMAGES.center,
    size: 'center',
    icon: <TentIcon />,
    caption: { title: 'Unforgettable Adventures', subtitle: "Discover the breathtaking beauty of Oman and beyond." },
  },
  { key: 'coast', img: IMAGES.coast, size: 'inner', icon: <KayakIcon /> },
  { key: 'forest', img: IMAGES.forest, size: 'outer', icon: <CameraIcon /> },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.15 + i * 0.08}s`;
      (el as HTMLElement).classList.add('animate-in');
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hs-hero"
      style={{
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #DFF4E7 0%, #E7F7ED 100%)',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 'calc(90px + 2vh)', // Reduced padding to move everything higher up
        paddingBottom: '0.5rem',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* Use clamp to ensure it scales flawlessly on all desktop sizes without scrolling */
        .hs-hero {
          --w-outer: clamp(50px, 6vw, 90px);
          --h-outer: clamp(300px, 60vh, 550px);
          --w-inner: clamp(60px, 7vw, 100px);
          --h-inner: clamp(260px, 52vh, 460px);
          --w-center: clamp(260px, 28vw, 380px);
          --h-center: clamp(260px, 52vh, 460px);
          --heading-size: clamp(2rem, 3vw, 2.8rem);
          --body-size: clamp(0.8rem, 1vw, 0.95rem);
          --row-gap: clamp(15px, 2vw, 30px);
          --row-pad: clamp(40px, 4vw, 60px);
          --row-mt: 2rem; /* Clean normal margin */
          --nudge: 0vh; 
          --side-inset: clamp(1.5rem, 3vw, 3rem);
        }

        .hs-shift {
          /* Cleaned up unnecessary transforms */
          width: 100%;
          z-index: 1;
        }

        .hs-pillar { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .hs-pillar:hover { transform: translateY(-6px); }

        .hs-badge { transition: transform 0.25s ease; }
        .hs-badge:hover { transform: translateX(-50%) scale(1.08); }

        .hs-play { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hs-play:hover { transform: scale(1.08); box-shadow: 0 10px 24px rgba(15, 60, 40, 0.25); }

        .hs-cta { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hs-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(20, 86, 58, 0.35); }

        .hs-social a { transition: transform 0.2s ease, background 0.2s ease; }
        .hs-social a:hover { transform: translateY(-2px); background: #1F7A54; }
        .hs-social a:hover svg { stroke: #fff; }

        @media (max-width: 1080px) {
          .hs-hero {
            --w-outer: 60px; --h-outer: 320px;
            --w-inner: 70px; --h-inner: 280px;
            --w-center: 280px; --h-center: 280px;
            --row-pad: 30px; --side-inset: 1.5rem;
          }
        }

        @media (max-width: 860px) {
          .hs-hero {
            --w-outer: 44px; --h-outer: 220px;
            --w-inner: 54px; --h-inner: 190px;
            --w-center: 220px; --h-center: 190px;
            --heading-size: clamp(1.6rem, 4vw, 2rem);
            --body-size: 0.8rem;
            --row-gap: 12px; --row-pad: 20px; --side-inset: 1rem; --nudge: 0px;
            --row-mt: 1rem; /* Reset negative margin on mobile */
          }
          .hs-social-sidebar { transform: scale(0.85); transform-origin: bottom left; }
          .hs-right-controls { transform: scale(0.85); transform-origin: bottom right; }
        }

        @media (max-width: 600px) {
          .hs-hero { height: auto !important; max-height: none !important; min-height: auto !important; padding-bottom: 3.5rem !important; }
          .hs-shift { transform: none; padding-top: 0; }
          .hs-hero {
            --w-outer: 40px; --h-outer: 200px;
            --w-inner: 44px; --h-inner: 176px;
            --w-center: 100%; --h-center: 190px;
            --row-gap: 8px; --row-pad: 16px;
            --outer-shift: 0px;
          }
          .hs-pillar-row { flex-wrap: wrap !important; row-gap: 16px !important; }
          .hs-pillar-col.is-center { order: -1; flex-basis: 100% !important; max-width: 420px !important; margin: 0 auto 8px; }
          .hs-social-sidebar { display: none !important; }
          .hs-right-controls { position: static !important; flex-direction: row !important; justify-content: center !important; margin: 1.5rem auto 0 !important; transform: none !important; }
        }
      `}</style>

      <div className="hs-shift" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* Left social sidebar (moved to first pillar) */}

        {/* Right controls moved to last pillar */}
        {/* Main content */}
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
          <div data-animate style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 900,
                fontSize: 'var(--heading-size)',
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                color: '#14231C',
                margin: 0,
              }}
            >
              Let&rsquo;s Travel the World with Us.
            </h1>
            <p
              style={{
                marginTop: '1rem',
                fontSize: 'var(--body-size)',
                lineHeight: 1.6,
                color: '#5B6A61',
                maxWidth: '540px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Your trusted travel partner in Oman crafting extraordinary journeys, seamless flights, and unforgettable experiences since 1989.
            </p>
          </div>

          {/* Pillar image row */}
          <div
            className="hs-pillar-row"
            data-animate
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--row-gap)',
              marginTop: 'var(--row-mt)',
              padding: '0 var(--row-pad)',
              zIndex: 1,
            }}
          >
            {pillars.map((p) => {
              const wVar = p.size === 'center' ? 'var(--w-center)' : `var(--w-${p.size})`;
              const hVar = p.size === 'center' ? 'var(--h-center)' : `var(--h-${p.size})`;
              return (
                <div
                  key={p.key}
                  className={`hs-pillar-col${p.caption ? ' is-center' : ''}`}
                  style={{
                    position: 'relative',
                    flex: p.caption ? '1 1 auto' : `0 0 ${wVar}`,
                    width: p.caption ? undefined : wVar,
                    maxWidth: p.caption ? '500px' : wVar,
                    minWidth: p.caption ? '200px' : undefined,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2.5rem',
                    transform: p.size === 'outer' ? 'translateY(var(--outer-shift, -10vh))' : p.size === 'inner' ? 'translateY(0)' : 'translateY(0)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: p.caption ? 'auto' : undefined }}>
                    <div
                      className="hs-pillar"
                      style={{
                        width: '100%',
                        height: hVar,
                        borderRadius: p.caption ? '40px' : '999px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 18px 36px rgba(20,60,40,0.16)',
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.caption ? p.caption.title : p.key}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />

                      {p.caption ? (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            padding: '16px 20px 20px',
                            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 80%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              minWidth: '36px',
                              borderRadius: '50%',
                              background: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            }}
                          >
                            <span style={{ transform: 'scale(0.9)' }}>{p.icon}</span>
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>{p.caption.title}</div>
                            <div
                              style={{
                                color: 'rgba(255,255,255,0.85)',
                                fontSize: '0.7rem',
                                lineHeight: 1.3,
                                marginTop: '3px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {p.caption.subtitle}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.3) 100%)',
                          }}
                        />
                      )}
                    </div>

                    {!p.caption && (
                      <div
                        className="hs-badge"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translate(-50%, 50%)',
                          width: 'clamp(40px, 5vw, 52px)',
                          height: 'clamp(40px, 5vw, 52px)',
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 18px rgba(20,60,40,0.18)',
                          zIndex: 3,
                        }}
                      >
                        {p.icon}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
