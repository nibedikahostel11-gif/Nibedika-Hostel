import React from 'react';
import { Phone } from 'lucide-react';

const Footer: React.FC = () => {
  // Using the thumbnail endpoint which is more reliable for embedding images
  const logoUrl = "https://drive.google.com/thumbnail?id=1uz9QaBPFZMproVL4pJyQPvquVBoYXTtX&sz=s200";
  
  // WhatsApp Automation Message
  const waMessage = encodeURIComponent("আসসালামু আলাইকুম, আমি নিবেদিকা হোস্টেল সম্পর্কে বিস্তারিত জানতে চাই।");

  return (
    <footer id="footer" className="bg-gray-900 text-white pt-8 pb-6 md:pt-16 md:pb-8 border-t-4 border-teal-500 scroll-mt-20 md:scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-6 md:mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
               <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className="w-8 h-8 md:w-14 md:h-14 object-cover rounded-full shadow-lg border-2 border-gray-700"
                  referrerPolicy="no-referrer"
               />
               <div className="flex flex-col">
                <span className="font-bold text-lg md:text-2xl tracking-wide leading-none">
                  Nibedika <span className="text-teal-400">Hostel</span>
                </span>
                <span className="text-[10px] md:text-sm text-gray-400 mt-0.5 md:mt-1">Best Hostel in Dhaka</span>
               </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4 md:mb-6 text-xs md:text-base">
              ৩৫ বছরের বিশ্বস্ত সেবায় আমরা প্রদান করছি নিরাপদ, পরিষ্কার ও মনোরম আবাসন ব্যবস্থা। ছাত্র ও কর্মজীবী নারীদের জন্য ঢাকার বুকে একটি নিরাপদ আশ্রয়।
            </p>
            <div className="flex gap-3 md:gap-4">
               {/* Facebook Button */}
               <a 
                 href="https://www.facebook.com/share/18CHRCGha7/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-white p-2 md:p-2.5 rounded-full hover:scale-110 transition-transform duration-300"
                 aria-label="Facebook"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-[#1877F2]">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                 </svg>
               </a>
               
               {/* WhatsApp Button */}
               <a 
                 href={`https://wa.me/8801345200218?text=${waMessage}`}
                 target="_blank"
                 rel="noopener noreferrer" 
                 className="bg-white p-2 md:p-2.5 rounded-full hover:scale-110 transition-transform duration-300"
                 aria-label="WhatsApp"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                 </svg>
               </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">যোগাযোগ করুন</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-2 md:gap-3">
                <div className="bg-teal-600 text-white p-1.5 md:p-2 rounded-full">
                   <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">হটলাইন / বুকিং</p>
                  <a href="tel:01345200218" className="font-bold text-base md:text-lg hover:text-teal-400">01345-200218</a>
                </div>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <div className="bg-gray-800 text-gray-300 p-1.5 md:p-2 rounded-full">
                   <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">মেয়েদের হোস্টেল ইনচার্জ</p>
                  <p className="font-medium text-sm md:text-base">01714-063178</p>
                </div>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <div className="bg-gray-800 text-gray-300 p-1.5 md:p-2 rounded-full">
                   <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">ছেলেদের হোস্টেল ইনচার্জ</p>
                  <p className="font-medium text-sm md:text-base">01714-063032</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">গুরুত্বপূর্ণ এলাকা</h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {['ফার্মগেট', 'পান্থপথ', 'গ্রীন রোড', 'রাজাবাজার', 'কাঠালবাগান', 'ধানমন্ডি'].map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm hover:bg-teal-600 hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-6 md:mt-8">
               <h4 className="font-bold mb-1 md:mb-2 text-teal-400 text-sm md:text-base">অফিস সময়:</h4>
               <p className="text-gray-400 text-xs md:text-base">সকাল ৯:০০ - রাত ৯:০০</p>
               <p className="text-gray-400 text-[10px] md:text-sm mt-0.5 md:mt-1">(পরিদর্শনের জন্য আগে যোগাযোগ করুন)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
          <p className="text-gray-500 text-xs md:text-sm mb-1 md:mb-2 flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Nibedika Hostel. All rights reserved.</span>
            <span className="text-gray-700">|</span>
            <a href="/admin" className="hover:text-teal-400 transition-colors">Admin Panel</a>
          </p>
          <p className="text-gray-600 text-[10px] md:text-xs flex items-center justify-center gap-1">
            Created by{' '}
            <a 
              href="https://jubayersardar.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-500 font-semibold tracking-wide hover:text-teal-400 hover:underline transition-colors"
            >
              Jubayer Sardar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
