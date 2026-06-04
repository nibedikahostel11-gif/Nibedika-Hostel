import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Branches', href: '#branches' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#footer' },
  ];

  const logoUrl = "https://drive.google.com/thumbnail?id=1uz9QaBPFZMproVL4pJyQPvquVBoYXTtX&sz=s200";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-sm py-1' 
            : 'bg-white/90 shadow-sm py-2'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14 gap-4">
            {/* Logo */}
            <div className="flex-1 flex items-center justify-start min-w-0">
              <a href="#home" onClick={scrollToTop} className="flex items-center gap-2 group cursor-pointer shrink-0">
                <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className="w-8 h-8 object-cover rounded-full border border-gray-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col hidden sm:flex">
                  <span className="font-bold text-sm lg:text-base text-gray-800 leading-none whitespace-nowrap">
                    Nibedika <span className="text-teal-600">Hostel</span>
                  </span>
                  <span className="text-[8px] lg:text-[9px] text-gray-500 tracking-wider font-medium whitespace-nowrap">Best Hostel in Dhaka</span>
                </div>
              </a>
            </div>

            {/* Desktop Center Menu */}
            <nav className="hidden md:flex items-center justify-center flex-[2] gap-1 lg:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      const offset = 85; // Header height offset
                      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="text-gray-700 hover:text-teal-600 px-2 py-2 text-[13px] lg:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions / Mobile Toggle */}
            <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
              <a 
                href="tel:01345200218" 
                className="hidden sm:flex items-center gap-2 bg-[#FCD34D] hover:bg-yellow-500 text-gray-900 px-3 lg:px-4 py-2 rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                <Phone size={14} className="md:size-4 fill-current text-gray-900" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">HOTLINE</span>
              </a>

              <div className="flex items-center gap-2 md:hidden">
                <a 
                  href="tel:01345200218" 
                  className="flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-md transition-colors bg-[#FCD34D] text-gray-900 shadow-sm"
                >
                  <Phone size={14} className="fill-current" />
                </a>
                <button
                  onClick={() => setIsOpen(true)}
                  className="transition-colors focus:outline-none p-1 text-gray-800 hover:text-teal-600"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <div className="flex items-center gap-3">
                <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-gray-800 leading-none">
                    Nibedika <span className="text-teal-400">Hostel</span>
                  </span>
                  <span className="text-[10px] text-gray-500 tracking-wider font-medium">Best Hostel in Dhaka</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none p-1"
              >
                <X size={28} />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col bg-gray-50/50">
             <div className="space-y-2 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                        const el = document.querySelector(link.href);
                        if(el) {
                            const offset = el.getBoundingClientRect().top + window.scrollY - 85;
                            window.scrollTo({top: offset, behavior: 'smooth'});
                        }
                    }, 100);
                  }}
                  className="block text-gray-700 hover:text-teal-600 px-2 py-3 text-base font-medium transition-colors border-b border-gray-100 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
