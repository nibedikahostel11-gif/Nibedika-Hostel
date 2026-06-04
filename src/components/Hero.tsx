import React, { useEffect, useState } from 'react';
import { Facebook, MessageCircle, MapPin, CreditCard, Star, ShieldCheck, List, Coffee, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'amenities' | 'branches' | null>(null);

  const whatsappMessage = encodeURIComponent("আসসালামু আলাইকুম, আমি নিবেদিকা হোস্টেল সম্পর্কে বিস্তারিত জানতে চাই।");
  const whatsappLink = `https://wa.me/8801345200218?text=${whatsappMessage}`;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 85; // Header height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAmenitiesSelect = (tab: 'services' | 'food') => {
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent('switch-amenities-tab', { detail: tab }));
    
    setTimeout(() => {
      const element = document.querySelector('#amenities');
      if (element) {
        const offset = 85; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleBranchesSelect = (type: 'female' | 'male') => {
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent('switch-branches-tab', { detail: type }));
    
    setTimeout(() => {
      const element = document.querySelector('#branches');
      if (element) {
        const offset = 85; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://drive.google.com/thumbnail?id=1OaLYB_-01C4Da_8XydaW7dwJlY6_nhum&sz=w1920"
          alt="Nibedika Hostel Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-900/55"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center mt-8 md:mt-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 md:mb-6"
          >
            <span className="inline-flex items-center gap-1 py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-gray-800/80 text-white text-[10px] sm:text-xs md:text-sm font-bold border border-gray-600 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400"></span>
              সর্বনিম্ন মাত্র ৪,৫০০ টাকা থেকে
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight drop-shadow-xl"
          >
            থাকা + খাওয়া <br />
            <span className="text-yellow-400">সবকিছু একসাথে!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-lg text-gray-100 mb-4 md:mb-10 leading-relaxed max-w-2xl mx-auto px-2 md:px-4 font-medium"
          >
            ছাত্র-ছাত্রী ও কর্মজীবী নারী-পুরুষের জন্য ঢাকার প্রাইম লোকেশনে আধুনিক ও নিরাপদ আবাসন ব্যবস্থা। ৩৫ বছরের অভিজ্ঞতায় আমরাই সেরা।
          </motion.p>

          {/* Navigation Buttons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-sm md:max-w-2xl px-2 md:px-0 mx-auto mt-2 md:mt-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 mb-4 md:mb-6">
              <button
                onClick={() => {
                  setModalType('amenities');
                  setIsModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <Star size={14} className="md:w-[18px] md:h-[18px] text-teal-600" />
                সেবা ও খাবার
              </button>
              <a
                href="#room-categories"
                onClick={(e) => scrollToSection(e, '#room-categories')}
                className="flex items-center justify-center gap-1.5 bg-[#FCD34D]/90 hover:bg-[#FCD34D] text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <CreditCard size={14} className="md:w-[18px] md:h-[18px]" />
                ভাড়া তালিকা
              </a>
              <button
                onClick={() => {
                  setModalType('branches');
                  setIsModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <MapPin size={14} className="md:w-[18px] md:h-[18px] text-teal-600" />
                আমাদের লোকেশন
              </button>
              <a
                href="#gallery"
                onClick={(e) => scrollToSection(e, '#gallery')}
                className="flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 md:w-[18px] md:h-[18px] text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ছবি গ্যালারী
              </a>
              <a
                href="#rules"
                onClick={(e) => scrollToSection(e, '#rules')}
                className="flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <ShieldCheck size={14} className="md:w-[18px] md:h-[18px] text-teal-600" />
                নিয়মাবলী
              </a>
              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, '#faq')}
                className="flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white text-gray-900 px-2 py-2.5 md:px-4 md:py-3 rounded-lg font-bold transition-all shadow-lg text-[11px] sm:text-xs md:text-base cursor-pointer"
              >
                <MessageCircle size={14} className="md:w-[18px] md:h-[18px] text-teal-600" />
                সাধারণ জিজ্ঞাসা
              </a>
            </div>

            {/* Social & Contact Buttons */}
            <div className="flex flex-row justify-center gap-2 w-full">
              <motion.a
                href="https://www.facebook.com/nibedikahostel"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-2 md:px-4 md:py-3 rounded-lg font-bold shadow-lg text-[10px] md:text-sm"
              >
                <Facebook size={14} className="md:w-[18px] md:h-[18px]" />
                ফেসবুক পেজ
              </motion.a>

              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
                className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-2 md:px-4 md:py-3 rounded-lg font-bold shadow-lg text-[10px] md:text-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 md:w-[18px] md:h-[18px] fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 md:mt-12 flex items-center justify-center gap-2.5 md:gap-6 text-white/90"
          >
            <div className="flex flex-col items-center">
              <div className="flex text-yellow-400 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={7} className="fill-current md:w-[12px] md:h-[12px]" />
                ))}
              </div>
              <span className="text-[7px] md:text-sm font-medium opacity-90">৩৫ বছরের অভিজ্ঞতা</span>
            </div>
            <div className="w-px h-4 md:h-8 bg-white/30"></div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={10} className="text-green-400 mb-0.5 md:w-[18px] md:h-[18px]" />
              <span className="text-[7px] md:text-sm font-medium opacity-90">100% নিরাপদ পরিবেশ</span>
            </div>
            <div className="w-px h-4 md:h-8 bg-white/30"></div>
            <div className="flex flex-col items-center">
              <svg className="w-2.5 h-2.5 md:w-[18px] md:h-[18px] text-blue-400 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-[7px] md:text-sm font-medium opacity-90">ছেলে এবং মেয়েদের জন্য আলাদা বিল্ডিং</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a 
        href="#amenities"
        onClick={(e) => scrollToSection(e, '#amenities')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-white/70 hover:text-white transition-colors z-20 cursor-pointer"
      >
        <span className="text-[10px] md:text-sm mb-2 font-medium tracking-wide">নিচে দেখুন</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.a>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                {modalType === 'amenities' ? 'আপনি কি দেখতে চান?' : 'কোন লোকেশনটি দেখতে চান?'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
              {modalType === 'amenities' && (
                <>
                  <button 
                    onClick={() => handleAmenitiesSelect('services')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <List size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-teal-700">সেবা তালিকা</h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-0.5">আমাদের হোস্টেলের সকল সুযোগ-সুবিধা</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleAmenitiesSelect('food')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <Coffee size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-orange-700">খাবার তালিকা</h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-0.5">আমাদের ৩ বেলার স্বাস্থ্যকর মেনু</p>
                    </div>
                  </button>
                </>
              )}

              {modalType === 'branches' && (
                <>
                  <p className="text-teal-600 text-xs md:text-sm font-bold text-center mb-1 md:mb-2 bg-teal-50 py-2 rounded-lg">
                    ছেলে এবং মেয়েদের জন্য আলাদা আলাদা বিল্ডিং।
                  </p>
                  <button 
                    onClick={() => handleBranchesSelect('female')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M12 11 L7 21 H17 Z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-teal-700">মেয়েদের জন্য</h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-0.5">ফার্মগেট, পান্থপথ ও গ্রীন রোড শাখা</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleBranchesSelect('male')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                         <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-indigo-700">ছেলেদের জন্য</h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-0.5">কাঠালবাগান ব্রাঞ্চ-১, পান্থপথ/ধানমন্ডি ও কাঠালবাগান ব্রাঞ্চ-২</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
