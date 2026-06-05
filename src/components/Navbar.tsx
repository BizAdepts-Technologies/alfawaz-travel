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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled || location.pathname !== '/'
            ? 'bg-teal/95 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-icon.png"
              alt="Al Fawaz International Travels"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:block font-display font-semibold text-white text-lg">
              AL FAWAZ
            </span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `font-body font-medium text-[0.8125rem] tracking-[0.08em] uppercase transition-colors duration-200 relative pb-1 ${
                  isActive
                    ? 'text-amber-light'
                    : 'text-white/80 hover:text-amber-light'
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
              className="lg:hidden p-2 text-white hover:text-amber-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-teal transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `font-display text-2xl transition-colors duration-200 ${
                isActive ? 'text-amber-light' : 'text-white hover:text-amber-light'
              } ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
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
