import React, { useState } from 'react';
import { Phone, Building2, CalendarCheck, X, Maximize2 } from 'lucide-react';

interface Branch {
  name: string;
  address: string;
  image: string;
  mapLink: string;
  isHeadOffice?: boolean;
}

const BranchCard: React.FC<{ branch: Branch; onImageClick: (img: string) => void }> = ({ branch, onImageClick }) => {
  // WhatsApp Message for specific branch
  const waLink = `https://wa.me/8801345200218?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি ${branch.name} -এ সিট বুকিং দিতে চাই।`)}`;

  return (
    <div className={`bg-white rounded-md md:rounded-lg p-2 md:p-4 border shadow-sm hover:shadow transition-all flex flex-row items-center gap-2 md:gap-5 ${branch.isHeadOffice ? 'border-teal-500 relative overflow-hidden' : 'border-gray-200'}`}>
      
      {/* Left: Text Information & Buttons */}
      <div className="flex-1 flex flex-col justify-between min-w-0 relative z-10 h-full py-1">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1 md:mb-1.5">
              <h4 className="text-xs md:text-lg font-bold text-gray-800 leading-tight">{branch.name}</h4>
              {branch.isHeadOffice && (
                  <span className="inline-flex items-center gap-1 bg-teal-600 text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                      <Building2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-yellow-300" />
                      হেড অফিস
                  </span>
              )}
          </div>
          <p className="text-gray-600 leading-relaxed text-[10px] md:text-sm font-medium whitespace-pre-line break-words mb-2 md:mb-3 line-clamp-3 md:line-clamp-none">
            {branch.address}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-auto">
          {/* Book Now Button (Yellow) */}
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 md:gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-[8px] md:text-sm font-bold px-1.5 py-0.5 md:px-4 md:py-2 rounded-md shadow-sm transition-colors border border-yellow-400"
          >
            <CalendarCheck className="w-2 h-2 md:w-4 md:h-4" />
            Book Now
          </a>

          {/* Location Button (Highlighted with Icon) */}
          <a 
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 md:gap-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200 text-gray-700 px-1.5 py-0.5 md:px-4 md:py-2 rounded-md shadow-sm hover:shadow transition-colors group"
            title="গুগল ম্যাপে দেখুন"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
              alt="Google Maps" 
              className="w-2 h-2 md:w-4 md:h-4 group-hover:scale-110 transition-transform"
            />
            <span className="text-[8px] md:text-sm font-bold group-hover:text-blue-600">Location</span>
          </a>
        </div>
      </div>

      {/* Right: Image Only */}
      <div className="w-20 md:w-40 shrink-0 self-center relative z-10">
        <div 
          className="aspect-[3/4] overflow-hidden rounded-md border border-gray-100 shadow-sm w-full group cursor-zoom-in relative"
          onClick={() => onImageClick(branch.image)}
        >
           <img 
            src={branch.image} 
            alt={branch.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
           />
           {/* Zoom Hint Overlay */}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/90 p-1 md:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm scale-75 group-hover:scale-100">
                <Maximize2 size={12} className="text-gray-700 md:w-[14px] md:h-[14px]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Branches: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'female' | 'male'>('female');
  
  React.useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && (customEvent.detail === 'female' || customEvent.detail === 'male')) {
        setSelectedType(customEvent.detail);
      }
    };
    window.addEventListener('switch-branches-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-branches-tab', handleSwitchTab);
  }, []);
  
  const femaleBranches: Branch[] = [
    {
      name: 'ফার্মগেট ব্রাঞ্চ',
      address: '17 ক, মরিচা গার্ডেন, পূর্ব রাজাবাজার।\n(ফার্মগেট মেট্রো স্টেশন সংলগ্ন)',
      image: 'https://drive.google.com/thumbnail?id=1J-7REyaotvGrroXIBz9lnw-b_RFyEe59&sz=w800',
      mapLink: 'https://maps.app.goo.gl/eWEwU9xLpkv3kd7v5',
      isHeadOffice: true
    },
    {
      name: 'পান্থপথ ব্রাঞ্চ',
      address: '57-1/4, পারভীন পাল, পান্থপথ।\n(রেটিনা আই হসপিটালের পাশের গলি)',
      image: 'https://drive.google.com/thumbnail?id=1WYXqp-9jo-7-Np3QUPIqFVnAC7Ju8gvJ&sz=w800',
      mapLink: 'https://maps.app.goo.gl/C6knCFoHQF2TFdpY8'
    },
    {
      name: 'গ্রীন রোড ব্রাঞ্চ',
      address: '153/1, সেঞ্চুরি আহমেদ ভিলা।\n(গ্রীন লাইফ হসপিটালের পাশের গলি)',
      image: 'https://drive.google.com/thumbnail?id=1mLE0ZbZdKw8LGdBTcAAmgV52Ps_MYuzc&sz=w800',
      mapLink: 'https://maps.app.goo.gl/8Gi4FpD4NtkmVC9F7'
    },
  ];

  const maleBranches: Branch[] = [
    {
      name: 'কাঠালবাগান ব্রাঞ্চ - ১',
      address: '11/8/C কাঠালবাগান ফ্রি স্কুল স্ট্রিট।\n(বসুন্ধরা শপিং সেন্টারের বিপরীত পাশে)',
      image: 'https://drive.google.com/thumbnail?id=15NJpXwJRPvbv_uyVbVhSlSFB6gbMBArx&sz=w800',
      mapLink: 'https://maps.app.goo.gl/xqBtrEdyYzW6BdMZ7'
    },
    {
      name: 'পান্থপথ/ধানমন্ডি ব্রাঞ্চ',
      address: '59 ফ্রি স্কুল স্ট্রিট, বক্স কালভার্ট রোড।\n(বসুন্ধরা শপিং সেন্টার ওভার ব্রিজের দক্ষিণ পাশে)',
      image: 'https://drive.google.com/thumbnail?id=1FZyIfhIqkfpN4CdIJruwMcfQUBihKhX2&sz=w800',
      mapLink: 'https://maps.app.goo.gl/wCJd4LDeseHZNB9JA'
    },
    {
      name: 'কাঠালবাগান ব্রাঞ্চ - ২',
      address: '88 কাঞ্চন টাওয়ার, কাঠালবাগান কাঁচা বাজার, গ্রীন রোড,গ্রীন লাইন হসপিটাল সংলগ্ন।',
      image: 'https://drive.google.com/thumbnail?id=1eXjycyN7Zs9wiBmuyp-gV7E8Jxplblbg&sz=w800',
      mapLink: 'https://maps.app.goo.gl/bYTpkU9bMnQ3Hp1C6'
    },
  ];

  return (
    <section id="branches" className="py-8 md:py-16 bg-white scroll-mt-20 md:scroll-mt-28 border-b border-gray-200">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-lg"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()} // Allow clicking image without closing
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-1 md:mb-3">আমাদের লোকেশন</h2>
          <div className="w-12 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          
          <p className="mt-2 md:mt-3 text-gray-600 text-[10px] md:text-sm font-medium max-w-2xl mx-auto">
            ঢাকার যাতায়াত সুবিধাসম্পন্ন প্রাইম লোকেশনগুলোতে আমাদের সুসজ্জিত ব্রাঞ্চসমূহ।
          </p>
          <div className="mt-4 md:mt-5 flex flex-col items-center gap-2">
             <a 
                href="tel:01750523734" 
                className="inline-flex items-center gap-1.5 md:gap-2 bg-yellow-400 text-gray-900 px-4 py-2 md:px-5 md:py-2.5 rounded-md font-bold shadow-sm hover:bg-yellow-500 transition-colors border border-yellow-400 text-xs md:text-sm"
              >
                <Phone size={14} className="fill-current md:w-[18px] md:h-[18px]" />
                স্টাফ: 01750523734
             </a>
             <p className="text-teal-600 text-[11px] md:text-base font-bold text-center">
               ছেলে এবং মেয়েদের জন্য আলাদা আলাদা বিল্ডিং
             </p>
          </div>
        </div>

        {/* Selection Tabs/Buttons */}
        <div className="max-w-md mx-auto flex gap-2 md:gap-4 mb-6 md:mb-8">
          <button 
            onClick={() => setSelectedType('female')}
            className={`flex-1 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all flex flex-row items-center justify-center gap-2 ${selectedType === 'female' ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-gray-200 bg-white hover:border-teal-200 hover:bg-gray-50'}`}
          >
            <div className={`p-1.5 md:p-2 rounded-full ${selectedType === 'female' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
                <circle cx="12" cy="7" r="4" />
                <path d="M12 11 L7 21 H17 Z" />
              </svg>
            </div>
            <span className={`text-sm md:text-base font-bold ${selectedType === 'female' ? 'text-teal-700' : 'text-gray-700'}`}>মহিলা হোস্টেল</span>
          </button>

          <button 
            onClick={() => setSelectedType('male')}
            className={`flex-1 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all flex flex-row items-center justify-center gap-2 ${selectedType === 'male' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20' : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'}`}
          >
            <div className={`p-1.5 md:p-2 rounded-full ${selectedType === 'male' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className={`text-sm md:text-base font-bold ${selectedType === 'male' ? 'text-indigo-700' : 'text-gray-700'}`}>পুরুষ হোস্টেল</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Female Branches Section */}
          {selectedType === 'female' && (
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Badge */}
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 md:px-6 md:py-1.5 rounded-md font-bold shadow-sm z-10 whitespace-nowrap text-[10px] md:text-sm">
                মহিলা হোস্টেল ব্রাঞ্চসমূহ
              </div>
              
              <div className="border border-teal-100 bg-teal-50/20 rounded-md md:rounded-lg p-2 md:p-6 pt-6 md:pt-8">
                <div className="flex justify-center mb-4 md:mb-5 mt-1">
                   <a 
                      href="tel:01714063178" 
                      className="inline-flex items-center gap-1.5 md:gap-2 bg-white text-teal-700 px-3 py-1 md:px-4 md:py-1.5 rounded-md font-bold shadow-sm border border-teal-200 hover:bg-teal-50 transition-colors text-[10px] md:text-sm"
                    >
                      <Phone size={12} className="fill-current md:w-[14px] md:h-[14px]" />
                      ইনচার্জ: 01714-063178
                   </a>
                </div>

                <div className="grid grid-cols-1 gap-2 md:gap-5">
                  {femaleBranches.map((branch, index) => (
                    <BranchCard key={index} branch={branch} onImageClick={setSelectedImage} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Male Branches Section */}
          {selectedType === 'male' && (
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Badge */}
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-1 md:px-6 md:py-1.5 rounded-md font-bold shadow-sm z-10 whitespace-nowrap text-[10px] md:text-sm">
                পুরুষ হোস্টেল ব্রাঞ্চসমূহ
              </div>

              <div className="border border-gray-200 bg-gray-50 rounded-md md:rounded-lg p-2 md:p-6 pt-6 md:pt-8">
                <div className="flex justify-center mb-4 md:mb-5 mt-1">
                   <a 
                      href="tel:01714063032" 
                      className="inline-flex items-center gap-1.5 md:gap-2 bg-white text-gray-800 px-3 py-1 md:px-4 md:py-1.5 rounded-md font-bold shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors text-[10px] md:text-sm"
                    >
                      <Phone size={12} className="fill-current md:w-[14px] md:h-[14px]" />
                      ইনচার্জ: 01714-063032
                   </a>
                </div>

                <div className="grid grid-cols-1 gap-2 md:gap-5">
                  {maleBranches.map((branch, index) => (
                    <BranchCard key={index} branch={branch} onImageClick={setSelectedImage} />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Branches;
