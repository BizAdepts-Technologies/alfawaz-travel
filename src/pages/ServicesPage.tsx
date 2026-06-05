import ServicesSection from '@/sections/ServicesSection';
import PageHeroSection from '@/sections/PageHeroSection';

const ServicesPage = () => {
  return (
    <>
      <PageHeroSection 
        title="Our Services" 
        subtitle="From flight bookings to full holiday packages, we handle every detail so you can simply enjoy the journey." 
      />
      <ServicesSection />
    </>
  );
};

export default ServicesPage;
