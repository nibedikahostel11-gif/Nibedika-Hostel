import { useState, useEffect } from 'react';
import { Wifi, ShieldCheck, Utensils, Zap, Wind, Droplets, Map, Home, List, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const features = [
  {
    icon: <Utensils size={24} />,
    title: "৩ বেলা স্বাস্থ্যকর খাবার",
    description: "মাছ, মাংস ও ডিমসহ প্রতিদিনের মেনু"
  },
  {
    icon: <Wifi size={24} />,
    title: "ফ্রি হাই-স্পিড ওয়াইফাই",
    description: "সারাক্ষণ ইন্টারনেট সুবিধা"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "২৪/৭ নিরাপত্তা",
    description: "সিসিটিভি ও গার্ড দ্বারা নিয়ন্ত্রিত"
  },
  {
    icon: <Droplets size={24} />,
    title: "বিশুদ্ধ পানি",
    description: "ফিল্টার পানির সুব্যবস্থা"
  },
  {
    icon: <Zap size={24} />,
    title: "বিদ্যুৎ ও জেনারেটর",
    description: "নিরবচ্ছিন্ন বিদ্যুৎ ব্যবস্থা"
  },
  {
    icon: <Home size={24} />,
    title: "টাইলসকৃত রুম",
    description: "আরামদায়ক ও আধুনিক পরিবেশ"
  },
  {
    icon: <Wind size={24} />,
    title: "এসি / নন-এসি",
    description: "আপনার পছন্দ মত রুম নিন"
  },
  {
    icon: <Map size={24} />,
    title: "সহজ যাতায়াত",
    description: "লোকেশনগুলো মেইন রোডের কাছে"
  }
];

const foodMenu = [
  { day: 'শনি', breakfast: 'ময়দার রুটি/ভাত ও সবজি/ভর্তা', lunch: 'ভাত, ডাল, ডিম ভুনা, ভাজি/ভর্তা', dinner: 'ভাত, ডাল, বড় মাছ ভুনা/ভর্তা, সবজি/ভাজি/ভর্তা' },
  { day: 'রবি', breakfast: 'ময়দার রুটি/ভাত ও সবজি/ভাজি/ভর্তা', lunch: 'ভাত, ডাল, মুরগির মাংসের ভুনা, সবজি/ভর্তা', dinner: 'ভাত, ডাল, ডিম ভুনা, ভাজি/ভর্তা' },
  { day: 'সোম', breakfast: 'ময়দার রুটি/ভাত ও বুটের ডাল/ভর্তা', lunch: 'ভাত, ডাল, ডিম ভুনা, ভাজি/ভর্তা', dinner: 'ভাত, ডাল, বড় মাছ ভুনা/ভর্তা, সবজি/ভাজি/ভর্তা' },
  { day: 'মঙ্গল', breakfast: 'খিচুড়ি, ভাজি/ডিম', lunch: 'ভাত, ডাল, মুরগির মাংসের ভুনা, সবজি', dinner: 'ভাত, ডাল, মুড়ি ঘন্ট, ভাজি/ছোট মাছ' },
  { day: 'বুধ', breakfast: 'ময়দার রুটি/ভাত ও বুটের ডাল/ভর্তা', lunch: 'ভাত, ডাল, ডিম ভুনা, ভাজি/ভর্তা', dinner: 'ভাত, ডাল, বড় মাছ ভুনা/ভর্তা, সবজি/ভাজি/ভর্তা' },
  { day: 'বৃহঃ', breakfast: 'ময়দার রুটি/ভাত ও সবজি/ভাজি/ভর্তা', lunch: 'ভাত, ডাল, মাছ, সবজি/ভর্তা', dinner: 'ভাত, ডাল, ডিম/মাংস ভুনা, ভাজি/ভর্তা' },
  { day: 'শুক্র', breakfast: 'খিচুড়ি, ভাজি/ডিম', lunch: 'ভাত, ডাল, মুরগির মাংসের ভুনা, সবজি/পোলাও', dinner: 'ভাত, ডাল, নিরামিষ শাক ও ভর্তা' },
];

export default function Amenities() {
  const [activeTab, setActiveTab] = useState<'services' | 'food'>('services');

  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && (customEvent.detail === 'services' || customEvent.detail === 'food')) {
        setActiveTab(customEvent.detail);
      }
    };
    window.addEventListener('switch-amenities-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-amenities-tab', handleSwitchTab);
  }, []);

  return (
    <section id="amenities" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">কেন আমাদের বেছে নিবেন?</h2>
          <div className="w-16 md:w-20 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          
          {/* Tab Selection */}
          <div className="max-w-md mx-auto flex gap-2 md:gap-4 mt-6 md:mt-8">
            <button 
              onClick={() => setActiveTab('services')}
              className={`flex-1 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all flex flex-row items-center justify-center gap-2 ${activeTab === 'services' ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-gray-200 bg-white hover:border-teal-200 hover:bg-gray-50'}`}
            >
              <div className={`p-1.5 md:p-2 rounded-full ${activeTab === 'services' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600'}`}>
                <List size={16} className="md:w-5 md:h-5" />
              </div>
              <span className={`text-sm md:text-base font-bold ${activeTab === 'services' ? 'text-teal-700' : 'text-gray-700'}`}>সেবা সমূহ</span>
            </button>
            <button 
              onClick={() => setActiveTab('food')}
              className={`flex-1 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all flex flex-row items-center justify-center gap-2 ${activeTab === 'food' ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20' : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-gray-50'}`}
            >
              <div className={`p-1.5 md:p-2 rounded-full ${activeTab === 'food' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                <Coffee size={16} className="md:w-5 md:h-5" />
              </div>
              <span className={`text-sm md:text-base font-bold ${activeTab === 'food' ? 'text-orange-700' : 'text-gray-700'}`}>খাবার তালিকা</span>
            </button>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <AnimatePresence mode="wait">
          {activeTab === 'services' ? (
            <motion.div 
              key="services"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-3 md:p-6 rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-all text-center group flex flex-col items-center h-full"
                >
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-2 md:mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xs md:text-lg font-bold text-gray-800 mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-[9px] md:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="food"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-gray-100 shadow-md"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      <th className="p-3 md:p-4 text-xs md:text-base font-bold text-center border-r border-teal-500">দিন</th>
                      <th className="p-3 md:p-4 text-xs md:text-base font-bold text-center border-r border-teal-500">সকাল</th>
                      <th className="p-3 md:p-4 text-xs md:text-base font-bold text-center border-r border-teal-500">দুপুর</th>
                      <th className="p-3 md:p-4 text-xs md:text-base font-bold text-center">রাত</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodMenu.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}>
                        <td className="p-2 md:p-4 text-[10px] md:text-sm font-bold text-teal-700 bg-teal-50/50 text-center border-r border-gray-100">{item.day}</td>
                        <td className="p-2 md:p-4 text-[10px] md:text-sm text-gray-600 text-center border-r border-gray-100">{item.breakfast}</td>
                        <td className="p-2 md:p-4 text-[10px] md:text-sm text-gray-600 text-center border-r border-gray-100">{item.lunch}</td>
                        <td className="p-2 md:p-4 text-[10px] md:text-sm text-gray-600 text-center">{item.dinner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-50 p-3 md:p-4 text-center">
                <p className="text-[10px] md:text-sm text-gray-600 italic">
                  * মৌসুমি শাক-সবজি ও বাজার অনুযায়ী মেনু কিছুটা পরিবর্তন হতে পারে।
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
