import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#whyus' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-teal-dark text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-8 pb-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-8">
          {/* Column 1 - Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}/images/logo-icon.png`}
                alt="Al Fawaz International Travels"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col leading-none justify-center">
                <span
                  className="uppercase text-white text-2xl sm:text-[1.75rem]"
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    lineHeight: 1,
                  }}
                >
                  AL FAWAZ
                </span>
                <span
                  className="uppercase text-white/80 text-xs sm:text-sm mt-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "1.3px",
                    lineHeight: 1,
                  }}
                >
                  INTERNATIONAL TRAVELS
                </span>
              </div>
            </div>
            <p className="text-white/70 font-body text-sm leading-relaxed max-w-xs">
              Al Fawaz International Travels — Your trusted travel partner since 1989.
              IATA-approved agency based in Salalah & Duqm, Oman.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/70 hover:text-white font-body text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber mt-0.5 shrink-0" />
                <p className="text-white/70 font-body text-sm">
                  Al Nahda Street, Opp. Old Police Station,<br />
                  Salalah, P.B No. 1242
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber shrink-0" />
                <div className="text-white/70 font-body text-sm">
                  <p>+968 2328 8974 (Office)</p>
                  <p>+968 9949 0108 (Mobile)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber mt-0.5 shrink-0" />
                <div className="text-white/70 font-body text-sm">
                  <p>gm@alfawaztravel.com</p>
                  <p>sales@alfawaztravel.com</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://wa.me/96899490108"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-whatsapp hover:border-whatsapp transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-amber hover:border-amber hover:text-charcoal transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-amber hover:border-amber hover:text-charcoal transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-amber hover:border-amber hover:text-charcoal transition-all duration-300"
                aria-label="X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 font-body text-xs">
            &copy; 2024 Al Fawaz International Travels. All rights reserved.
          </p>
          <p className="text-white/50 font-body text-xs tracking-wider">
            IATA Approved &middot; ATOL Protected
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
