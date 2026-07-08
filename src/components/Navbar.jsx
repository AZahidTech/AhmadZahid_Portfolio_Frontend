import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isMainPage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Experience', href: 'experience' },
    { name: 'Skills', href: 'skills' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!isMainPage) return;

      // Active section tracking
      const sections = navLinks.map(link => document.getElementById(link.href));
      const scrollPosition = window.scrollY + 120; // offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (isMainPage) {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-darkBg/90 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'} py-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            {isMainPage ? (
              <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2 focus:outline-none">
                <img
                  className="h-10 w-10 rounded-full border-2 border-tealGlow shadow-[0_0_12px_rgba(0,230,180,0.4)] transition-all duration-300 hover:scale-105"
                  src="/ahmad_profile.png"
                  alt="Ahmad Zahid Logo"
                />
              </button>
            ) : (
              <RouterLink to="/" className="flex items-center space-x-2">
                <img
                  className="h-10 w-10 rounded-full border-2 border-tealGlow shadow-[0_0_12px_rgba(0,230,180,0.4)] transition-all duration-300 hover:scale-105"
                  src="/ahmad_profile.png"
                  alt="Ahmad Zahid Logo"
                />
              </RouterLink>
            )}
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-8">
              {isMainPage ? (
                navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-tealGlow ${activeSection === link.href ? 'text-tealGlow font-semibold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </button>
                ))
              ) : (
                <RouterLink to="/" className="text-gray-400 hover:text-tealGlow px-3 py-2 text-sm font-medium transition-colors">
                  Back to Portfolio
                </RouterLink>
              )}
            </div>
          </div>

          {/* Right Spacer or Dashboard Link */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <RouterLink
                to="/admin/dashboard"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-tealGlow/10 hover:bg-tealGlow text-tealGlow hover:text-darkBg border border-tealGlow/25 hover:border-transparent text-sm font-semibold transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </RouterLink>
            ) : (
              <div className="w-10 h-10"></div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-darkBg/95 backdrop-blur-lg border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {isMainPage ? (
              <>
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`block w-full px-3 py-3 text-base font-medium transition-colors hover:text-tealGlow hover:bg-white/5 rounded-md ${activeSection === link.href ? 'text-tealGlow bg-white/5' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </button>
                ))}
                {isAuthenticated && (
                  <RouterLink
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-3 text-base font-bold text-tealGlow hover:bg-tealGlow/10 rounded-md mt-2 border border-tealGlow/20 flex items-center justify-center space-x-2"
                  >
                    <LayoutDashboard className="h-4.5 w-4.5" />
                    <span>Dashboard</span>
                  </RouterLink>
                )}
              </>
            ) : (
              <RouterLink
                to="/"
                className="block px-3 py-3 text-base font-medium text-gray-400 hover:text-tealGlow"
                onClick={() => setIsOpen(false)}
              >
                Back to Portfolio
              </RouterLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
