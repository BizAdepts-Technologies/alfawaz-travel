import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plane, MapPin, Hotel, Moon, FileText, Shield } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: '/images/service-flights.jpg',
    icon: Plane,
    title: 'Air Ticket Reservation',
    description:
      'Let us take care of your airline reservation, ensuring a smooth and hassle-free travel experience. We work with all major airlines to offer you a wide selection of flights, ensuring comfort and convenience to your destination.',
  },
  {
    image: '/images/service-tours.jpg',
    icon: MapPin,
    title: 'Tour Packages',
    description:
      'Experience the world through our carefully crafted tour packages. Whether you desire cultural exploration, adventure-filled journeys, or luxurious getaways, we have a wide selection to suit your interests.',
  },
  {
    image: '/images/service-hotels.jpg',
    icon: Hotel,
    title: 'Hotel Booking',
    description:
      "Our agency partners with a vast network of hotels worldwide. Whether you're looking for budget-friendly options or luxury accommodations, we assist in finding the perfect hotel within your budget.",
  },
  {
    image: '/images/service-hajj.jpg',
    icon: Moon,
    title: 'Hajj & Umrah Packages',
    description:
      'We specialize in providing hassle-free Umrah and Hajj packages. Our services include visa assistance, accommodation arrangements, and transportation coordination for a smooth religious journey.',
  },
  {
    image: '/images/service-visa.jpg',
    icon: FileText,
    title: 'Visa Services',
    description:
      'We offer visa assistance for various destinations. Our team guides you through the application process, ensuring you have all necessary documentation for a successful visa application.',
  },
  {
    image: '/images/service-insurance.jpg',
    icon: Shield,
    title: 'Travel Insurance',
    description:
      'Your safety matters to us. We provide travel insurance options to protect you from unexpected events. Our team helps you choose the right coverage for peace of mind throughout your travels.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !gridRef.current) return;

    // Header entrance
    const headerEls = headerRef.current.querySelectorAll('.animate-in');
    gsap.from(headerEls, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Cards entrance
    const cards = gridRef.current.querySelectorAll('.service-card');
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-cream-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="animate-in section-label block mb-3">WHAT WE OFFER</span>
          <h2 className="animate-in section-title">Comprehensive Travel Services</h2>
        </div>

        {/* Service Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <ServiceCard
                image={service.image}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
