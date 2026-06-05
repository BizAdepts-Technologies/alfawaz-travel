import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  useGSAP(() => {
    // Form entrance
    if (formRef.current) {
      const formEls = formRef.current.querySelectorAll('.animate-in');
      gsap.from(formEls, {
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
    }

    // Info card entrance
    if (infoRef.current) {
      gsap.from(infoRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-cream-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left - Contact Form */}
          <div ref={formRef}>
            <span className="animate-in section-label block mb-3">GET IN TOUCH</span>
            <h2 className="animate-in section-title mb-2">
              Let's Plan Your Next Adventure
            </h2>
            <p className="animate-in font-body text-sm text-warm-gray mb-8">
              Fill in the details below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="animate-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white border border-teal/20 rounded-xl font-body text-sm text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white border border-teal/20 rounded-xl font-body text-sm text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white border border-teal/20 rounded-xl font-body text-sm text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white border border-teal/20 rounded-xl font-body text-sm text-charcoal focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Service</option>
                  <option value="flights">Air Tickets</option>
                  <option value="tours">Tour Packages</option>
                  <option value="hotels">Hotel Booking</option>
                  <option value="hajj">Hajj & Umrah</option>
                  <option value="visa">Visa Services</option>
                  <option value="insurance">Travel Insurance</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-5 py-3.5 bg-white border border-teal/20 rounded-xl font-body text-sm text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all resize-none"
              />

              <button type="submit" className="btn-secondary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Contact Info Card */}
          <div ref={infoRef}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              {/* Manager Info */}
              <div className="mb-8">
                <span className="section-label text-sage block mb-2">GENERAL MANAGER</span>
                <h3 className="font-display font-semibold text-2xl text-charcoal mb-1">
                  Zainudheen K
                </h3>
                <p className="font-body text-sm text-warm-gray">
                  Al Fawaz International Travels
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-teal mt-0.5 shrink-0" />
                  <p className="font-body text-sm text-charcoal-light">
                    Al Nahda Street, Opp. Old Police Station,<br />
                    Salalah, P.B No. 1242
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-teal mt-0.5 shrink-0" />
                  <div className="font-body text-sm text-charcoal-light">
                    <p>+968 2328 8974 (Office)</p>
                    <p>+968 9949 0108 (Mobile)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-teal mt-0.5 shrink-0" />
                  <div className="font-body text-sm text-charcoal-light">
                    <p>gm@alfawaztravel.com</p>
                    <p>sales@alfawaztravel.com</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/96899490108"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-whatsapp rounded-2xl p-5 text-center transition-all duration-300 hover:bg-whatsapp-dark hover:-translate-y-0.5 mb-6"
                style={{ boxShadow: '0 4px 16px rgba(37, 211, 102, 0.2)' }}
              >
                <MessageCircle size={32} className="text-white mx-auto mb-2" />
                <span className="font-body font-semibold text-white text-base block">
                  Chat on WhatsApp
                </span>
                <span className="font-body text-xs text-white/85">
                  Get instant assistance
                </span>
              </a>

              {/* Office Hours */}
              <div className="flex items-center gap-2 text-sage">
                <Clock size={16} />
                <span className="font-body text-xs tracking-[0.1em] uppercase">
                  Open Saturday — Thursday, 8:00 AM — 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
