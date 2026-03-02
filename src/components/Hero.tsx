import { Facebook, MessageCircle, MapPin, CreditCard, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
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

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
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
      <div className="container mx-auto px-4 z-10 relative text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 md:mb-6"
          >
            <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full bg-gray-800/80 text-white text-[7px] md:text-sm font-bold border border-gray-600 backdrop-blur-sm">
              <span className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-yellow-400"></span>
              সর্বনিম্ন মাত্র ৪,৫০০ টাকা থেকে
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-5xl lg:text-6xl font-bold text-white mb-1.5 md:mb-4 leading-tight drop-shadow-xl"
          >
            থাকা + খাওয়া <br />
            <span className="text-yellow-400">সবকিছু একসাথে!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[8px] md:text-lg text-gray-100 mb-3 md:mb-10 leading-relaxed max-w-xl mx-auto px-4 font-medium"
          >
            ছাত্র-ছাত্রী ও কর্মজীবী নারী-পুরুষের জন্য ঢাকার প্রাইম লোকেশনে আধুনিক ও নিরাপদ আবাসন ব্যবস্থা। ৩৫ বছরের অভিজ্ঞতায় আমরাই সেরা।
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-1.5 w-full max-w-sm md:max-w-md px-6 md:px-4"
          >
            {/* Row 1: Facebook */}
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
              className="w-auto min-w-[140px] md:min-w-[200px] flex items-center justify-center gap-1 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold shadow-lg text-[8px] md:text-sm"
            >
              <Facebook size={10} className="md:w-[16px] md:h-[16px]" />
              আমাদের ফেসবুক পেজ
            </motion.a>

            {/* Row 2: Branches & Pricing */}
            <div className="flex gap-1.5 w-full justify-center max-w-[220px] md:max-w-[280px]">
              <a
                href="#branches"
                onClick={(e) => scrollToSection(e, '#branches')}
                className="flex-1 flex items-center justify-center gap-1 bg-white hover:bg-gray-100 text-gray-900 px-2 py-1.5 md:px-2 md:py-2 rounded-full font-bold transition-all shadow-lg text-[8px] md:text-sm whitespace-nowrap cursor-pointer"
              >
                <MapPin size={9} className="md:w-[14px] md:h-[14px]" />
                আমাদের ব্রাঞ্চসমূহ
              </a>
              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, '#pricing')}
                className="flex-1 flex items-center justify-center gap-1 bg-[#FCD34D] hover:bg-[#fbbf24] text-gray-900 px-2 py-1.5 md:px-2 md:py-2 rounded-full font-bold transition-all shadow-lg text-[8px] md:text-sm whitespace-nowrap cursor-pointer"
              >
                <CreditCard size={9} className="md:w-[14px] md:h-[14px]" />
                আমাদের ভাড়া তালিকা
              </a>
            </div>

            {/* Row 3: WhatsApp */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-auto min-w-[140px] md:min-w-[200px] flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-lg text-[8px] md:text-sm mt-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3 md:w-4 md:h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.a>
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
              <span className="text-[7px] md:text-sm font-medium opacity-90">100% Safe Environment</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
