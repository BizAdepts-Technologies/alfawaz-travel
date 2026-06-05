import AboutSection from '@/sections/AboutSection';
import StatsSection from '@/sections/StatsSection';
import PageHeroSection from '@/sections/PageHeroSection';
import TeamSection from '@/sections/TeamSection';

const AboutPage = () => {
  return (
    <>
      <PageHeroSection 
        title="About Us" 
        subtitle="Discover our story, our passion for travel, and why we've been the trusted choice for over three decades." 
      />
      <AboutSection />
      <TeamSection />
      <StatsSection />
    </>
  );
};

export default AboutPage;
