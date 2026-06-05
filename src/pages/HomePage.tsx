import HeroSection from '@/sections/HeroSection';
import DestinationsSection from '@/sections/DestinationsSection';
import SeasonalPackagesSection from '@/sections/SeasonalPackagesSection';
import MemoriesSection from '@/sections/MemoriesSection';
import StatsBannerSection from '@/sections/StatsBannerSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTASection from '@/sections/CTASection';

const HomePage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: white; }
      `}</style>
      <HeroSection />
      <DestinationsSection />
      <SeasonalPackagesSection />
      <MemoriesSection />
      <StatsBannerSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;