import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Header from './Header';
import Hero from './Hero';
import Amenities from './Amenities';
import Pricing from './Pricing';
import Branches from './Branches';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // WhatsApp Automation Message
  const waMessage = encodeURIComponent("আসসালামু আলাইকুম, আমি নিবেদিকা হোস্টেল সম্পর্কে বিস্তারিত জানতে চাই।");

  // Force scroll to top on mount
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle Scroll to toggle Top Button visibility
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 300;
      if (isNearBottom) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white text-gray-800"
    >
      <Header />
      <main>
        <Hero />
        <Amenities />
        <Pricing />
        <Branches />
        <Gallery />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />

      {/* Scroll to Top Button (Bottom Left) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-gray-800 text-white p-2.5 rounded shadow hover:bg-gray-700 transition-colors duration-200"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <a
          href={`https://wa.me/8801345200218?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 md:w-8 md:h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          WhatsApp করুন
        </span>
      </div>
    </motion.div>
  );
};

export default HomePage;
