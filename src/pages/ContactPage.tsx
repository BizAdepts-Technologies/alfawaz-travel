import ContactSection from '@/sections/ContactSection';
import PageHeroSection from '@/sections/PageHeroSection';

const ContactPage = () => {
  return (
    <>
      <PageHeroSection 
        title="Contact Us" 
        subtitle="Ready to start your next adventure? Our experts are here to help you plan the perfect trip." 
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;
