
const StatsBannerSection = () => (
  <section style={{ background: 'linear-gradient(135deg, #0d2a4a 0%, #1a4a7a 100%)', padding: '5rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
      {[
        { num: '35+', label: 'Years in Business', sub: 'Since 1989' },
        { num: '50,000+', label: 'Happy Travelers', sub: 'And counting' },
        { num: '120+', label: 'Destinations', sub: 'Worldwide' },
        { num: '24/7', label: 'Customer Support', sub: 'Always here for you' },
        { num: '98%', label: 'Satisfaction Rate', sub: 'Our pride' },
      ].map(({ num, label, sub }) => (
        <div key={label}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 700, color: '#f59e0b', lineHeight: 1 }}>{num}</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: 'white', marginTop: '8px' }}>{label}</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{sub}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBannerSection;
