import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle, Users, Globe, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: CheckCircle,
    title: 'IATA Approved Agency',
    description: 'Fully certified and recognized by the International Air Transport Association.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Dedicated professionals with decades of combined travel industry experience.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Strong partnerships with leading airlines, hotels, and transport providers worldwide.',
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Every journey is tailored to your unique preferences and needs.',
  },
];

const destinations = [
  { image: `${import.meta.env.BASE_URL}/images/dest-salalah.jpg`, name: 'Salalah' },
  { image: `${import.meta.env.BASE_URL}/images/dest-muscat.jpg`, name: 'Muscat' },
  { image: `${import.meta.env.BASE_URL}/images/dest-dubai.jpg`, name: 'Dubai' },
  { image: `${import.meta.env.BASE_URL}/images/dest-maldives.jpg`, name: 'Maldives' },
];

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Features entrance
    if (featuresRef.current) {
      const featureItems = featuresRef.current.querySelectorAll('.feature-item');
      gsap.from(featureItems, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Destination images entrance
    if (collageRef.current) {
      const images = collageRef.current.querySelectorAll('.dest-img');
      gsap.from(images, {
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: collageRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    // CTA banner entrance
    if (bannerRef.current) {
      gsap.from(bannerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="whyus" className="section-padding bg-cream">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Row 1: Features + Destination Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left - Features */}
          <div ref={featuresRef}>
            <span className="feature-item section-label block mb-3">WHY AL FAWAZ</span>
            <h2 className="feature-item section-title mb-8">
              The Al Fawaz Difference
            </h2>

            <div className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="feature-item flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-charcoal mb-1">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm text-charcoal-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Destination Collage */}
          <div className="relative">
            {/* Decorative amber border frame behind */}
            <div className="absolute inset-0 border-4 border-amber rounded-2xl transform translate-x-3 translate-y-3 z-0" />

            <div
              ref={collageRef}
              className="relative z-10 grid grid-cols-2 gap-2 rounded-2xl overflow-hidden transform -rotate-2"
            >
              {destinations.map((dest) => (
                <div key={dest.name} className="dest-img relative group overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2">
                    <span className="font-body font-medium text-sm text-white">{dest.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: CTA Banner */}
        <div
          ref={bannerRef}
          className="mt-16 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A6B6B 0%, #054545 100%)' }}
        >
          <div className="px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-white mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="font-body text-white/85">
                Let our experts craft your perfect travel experience.
              </p>
            </div>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="btn-primary shrink-0"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
