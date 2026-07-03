import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !imageRef.current) return;

    // Text entrance
    const textEls = textRef.current.querySelectorAll('.animate-in');
    gsap.from(textEls, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Image reveal
    gsap.from(imageRef.current, {
      clipPath: 'inset(100% 0 0 0)',
      scale: 1.1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-cream"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div ref={textRef}>
            <span className="animate-in section-label block mb-3">
              ABOUT US
            </span>
            <h2 className="animate-in section-title mb-6">
              Your Journey, Our Passion
            </h2>
            <p className="animate-in font-body text-lg text-charcoal-light leading-[1.7] mb-6">
              We are pleased to introduce AL FAWAZ International Travels, a leading IATA-approved
              travel agency that has been shaping the travel industry since 1989. With a dedicated
              management team boasting extensive experience, we are committed to providing
              exceptional travel services to our esteemed clients.
            </p>
            <p className="animate-in font-body text-lg text-charcoal-light leading-[1.7] mb-6">
              At AL FAWAZ International Travels, we recognize the significance of travel in enriching
              lives and creating unforgettable experiences. Our mission is to make every journey
              extraordinary, tailored to the unique preferences and needs of each traveler.
            </p>
            <p className="animate-in font-body text-lg text-charcoal-light leading-[1.7] mb-8">
              Over the years, our agency has established a solid reputation for reliability, integrity,
              and excellence. We have cultivated strong partnerships with renowned airlines, hotels,
              and transportation providers worldwide.
            </p>
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="animate-in btn-secondary"
            >
              Get in Touch
            </a>
          </div>

          {/* Image Column */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-amber rounded-full z-0" />
            <div className="absolute -left-4 top-1/3 w-2 h-28 bg-teal z-0" />

            <div ref={imageRef} className="relative z-10 rounded-2xl overflow-hidden shadow-image">
              <img
                src={`${import.meta.env.BASE_URL}images/about-building.jpg`}
                alt="Al Fawaz International Travels Office"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
