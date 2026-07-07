import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router';
const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WHY US', href: '/why-us' },
  { label: 'CONTACT', href: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 bg-white shadow-sm`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}/images/logo-icon.png`}
              alt="Al Fawaz International Travels"
              className="h-14 w-auto object-contain"
            />

            <img
              src={`${import.meta.env.BASE_URL}/images/company%20name.jpeg`}
              alt="Al Fawaz company name"
              className="h-14 w-auto object-contain max-w-[240px]"
            />
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `font-body font-medium text-[0.8125rem] tracking-[0.08em] uppercase transition-colors duration-200 relative pb-1 ${isActive
                  ? 'text-teal font-bold'
                  : 'text-charcoal hover:text-teal'
                  }`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right - Call Button (Desktop) + Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+96899490108"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-amber text-charcoal font-body font-semibold text-sm rounded-full hover:bg-amber-light transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={16} />
              <span>+968 9949 0108</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-teal transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-teal transition-all duration-500 lg:hidden ${mobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Close button in top-right */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={`${import.meta.env.BASE_URL}/images/logo-icon.png`}
              alt="Al Fawaz"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-none justify-center">
              <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.04em', color: 'white', lineHeight: 0.95 }}>
                AL FAWAZ
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '1px', color: 'white', lineHeight: 1 }}>
                INTERNATIONAL TRAVELS
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white hover:text-amber-light transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100%-72px)] gap-8">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `font-display text-2xl transition-colors duration-200 ${isActive ? 'text-amber-light' : 'text-white hover:text-amber-light'
                } ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="tel:+96899490108"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-amber text-charcoal font-body font-semibold rounded-full"
          >
            <Phone size={18} />
            <span>+968 9949 0108</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
