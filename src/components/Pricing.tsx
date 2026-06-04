import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Phone, 
  BedSingle, 
  Users, 
  Building2, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Settings,
  Info,
  Fan,
  MapPin,
  X
} from 'lucide-react';

const roomCategories = [
  {
    id: 1,
    title: '১ সিটের রুম',
    subtitle: 'বোর্ড পার্টিশন',
    price: '৬,১০০ / ৭,১০০ / ৮,১০০',
    description: 'এ রুমের ভেতরে থাকবে ১টি খাট, ১টি টেবিল, ১টি চেয়ার। আর কিছুই স্পেস থাকবে না, তবে আপনি কাপড় রাখার নিজস্ব সেলফ রাখতে পারবেন। একাই ব্যবহার করবেন।',
    features: ['বোর্ড পার্টিশন', '১টি খাট, টেবিল ও চেয়ার', 'কাপড় রাখার নিজস্ব স্পেস'],
    icon: BedSingle,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-600',
    image: 'https://lh3.googleusercontent.com/d/17XDTD-ufqp5NyBwGaLHpdlNf6u2DMdZd'
  },
  {
    id: 2,
    title: '২ সিটের রুম',
    subtitle: 'বোর্ড পার্টিশন',
    price: '৬,১০০ / ৭,১০০ / ৮,১০০',
    description: 'এ রুমের ভেতরে থাকবে ২টি খাট, ২টি টেবিল, ২টি চেয়ার। আর কিছুই স্পেস থাকবে না, তবে আপনারা কাপড় রাখার সেলফ রাখতে পারবেন। ২ জন ব্যবহার করবেন।',
    features: ['বোর্ড পার্টিশন', '২টি খাট, টেবিল ও চেয়ার', 'কাপড় রাখার নিজস্ব স্পেস'],
    icon: Users,
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    iconBg: 'bg-teal-100 text-teal-600',
    image: 'https://lh3.googleusercontent.com/d/1vRSST8ghuEPaake1hNAdiUllGmq5feyv'
  },
  {
    id: 3,
    title: '৩ সিটের রুম',
    subtitle: 'ওয়ালের রুম',
    price: '৬,১০০ / ৭,১০০ / ৮,১০০',
    description: 'অ্যাটাচ বাথ অথবা বেলকনি যেকোনো একটি থাকে সাধারণত। রুমে ৩টি খাট, ৩টি টেবিল, ৩টি চেয়ার থাকবে এবং কাপড় রাখার নিজস্ব সেলফ রাখতে পারবেন। ৩ জন ব্যবহার করবেন।',
    features: ['পাকা দেয়াল (ওয়াল)', 'অ্যাটাচ বাথ / বেলকনি (যেকোনো একটি)', '৩টি খাট, টেবিল ও চেয়ার'],
    icon: Building2,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-600',
    image: 'https://lh3.googleusercontent.com/d/14tObXtSoiz4x1B4u8q5ilGMa-n0Rs84N'
  },
  {
    id: 4,
    title: '৪ সিটের রুম',
    subtitle: 'ওয়ালের রুম',
    price: '৬,১০০ / ৭,১০০ / ৮,১০০',
    description: 'অ্যাটাচ বাথ এবং বেলকনি দুইটিই থাকে সাধারণত। রুমে ৪টি খাট, ৪টি টেবিল, ৪টি চেয়ার থাকবে এবং কাপড় রাখার নিজস্ব সেলফ রাখতে পারবেন। ৪ জন ব্যবহার করবেন।',
    features: ['পাকা দেয়াল (ওয়াল)', 'অ্যাটাচ বাথ এবং বেলকনি', '৪টি খাট, টেবিল ও চেয়ার'],
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
    image: 'https://lh3.googleusercontent.com/d/1W7aXHM9_niVWLOBKysFjJZJMvykMUhAh'
  }
];

const monthlyPackages = [
  {
    type: 'regular',
    title: 'সাধারণ ছাত্র/ছাত্রী (রেগুলার)',
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-600',
    options: ['৪,৫০০/-', '৫,৫০০/-', '৬,৫০০/-', '৭,৫০০/-', '৮,১০০/-'],
    admission: '২,০০০ - ৩,০০০/-',
    bedding: '২,০০০/-'
  },
  {
    type: 'coaching',
    title: 'কোচিং ছাত্র/ছাত্রী',
    icon: BookOpen,
    gradient: 'from-amber-500 to-orange-600',
    options: ['৭,৫০০/-', '৮,৫০০/-', '৯,৫০০/-', '১০,০০০/-', '১২,৫০০/-', '১৩,৫০০/-', '১৪,০০০/-'],
    admission: '৭,০০০ - ১০,০০০/-',
    bedding: '২,০০০/-'
  }
];

const shortPackages = [
  { title: '১ দিনের প্যাকেজ', price: '৩৫০ - ৪০০ টাকা', days: 1, delay: 0.1 },
  { title: '৩ দিনের প্যাকেজ', price: '১,০৫০ - ১,২০০ টাকা', days: 3, delay: 0.2 },
  { title: '৭ দিনের প্যাকেজ', price: '২,১০০ - ২,৮০০ টাকা', days: 7, delay: 0.3 },
  { title: '১৪ দিনের প্যাকেজ', price: '৪,০০০ - ৫,০০০ টাকা', days: 14, delay: 0.4 }
];

const Pricing: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const generateWhatsAppLink = (title: string, price?: string) => {
    let message = `আসসালামু আলাইকুম, আমি "${title}" প্যাকেজটি বুকিং দিতে চাই। বিস্তারিত জানাবেন প্লিজ?`;
    if (price) message = `আসসালামু আলাইকুম, আমি "${title}" (${price} টাকা) প্যাকেজটি বুকিং দিতে চাই। বিস্তারিত জানাবেন প্লিজ?`;
    return `https://wa.me/8801345200218?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="pricing" className="py-12 md:py-24 bg-gray-50/50 scroll-mt-20 md:scroll-mt-28 border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold border-gray-900 mb-4 tracking-tight"
          >
            প্যাকেজ ও <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">রুম বিস্তারিত</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            আমাদের হোস্টেলে সাধারণত ৪ ধরনের সিট রয়েছে। সম্পূর্ণ টাইলস এবং আধুনিক ফ্লাট লিফট সুবিধা সহ। ১ সিট, ২ সিট, ৩ সিট এবং ৪ সিটের পাশাপাশি AC / Non-AC রুমের সুবিধা রয়েছে।
          </motion.p>
        </div>

        <div className="space-y-24">

          {/* MONTHLY PACKAGES SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-bold text-gray-900">মাসিক চার্জ (থাকা ও খাওয়াসহ)</h3>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>
            
            <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-4 md:p-6 mb-8 text-center shadow-sm max-w-4xl mx-auto">
              <p className="text-teal-800 font-medium text-sm md:text-base">
                <Info className="inline-block w-5 h-5 mr-1.5 -pl-1 mb-0.5" /> 
                আমাদের প্রতিটি মাসিক প্যাকেজে থাকা ও ৩ বেলা খাওয়া অন্তর্ভুক্ত।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-10 max-w-5xl mx-auto">
              {monthlyPackages.map((pkg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className={`h-2 md:h-2.5 w-full bg-gradient-to-r ${pkg.gradient}`}></div>
                  
                  <div className="p-3 md:p-10 flex flex-col h-full">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className={`p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${pkg.gradient} text-white shadow-md`}>
                        <pkg.icon className="w-6 h-6 md:w-10 md:h-10" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-[13px] md:text-2xl font-bold tracking-tight text-gray-900 leading-tight">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-6 flex-grow">
                      <div className="bg-gray-50/80 rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-100 shadow-inner">
                          <h4 className="text-[11px] md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-center md:text-left">
                            <Settings className="w-3 h-3 md:w-4 md:h-4 text-teal-600" /> <span className="whitespace-nowrap">প্যাকেজ অপশন:</span>
                          </h4>
                          <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2">
                            {pkg.options.map(opt => (
                              <span key={opt} className="bg-white border border-gray-200 text-gray-800 font-bold px-1.5 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-sm shadow-sm md:rounded-lg">
                                {opt}
                              </span>
                            ))}
                          </div>
                      </div>

                      <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
                          <div className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm gap-0.5 md:gap-0">
                            <span className="text-gray-500 md:text-gray-600 font-medium text-[9px] md:text-sm text-center md:text-left">সার্ভিস চার্জ (এককালীন)</span>
                            <span className="font-bold text-gray-900 text-[11px] md:text-base text-center md:text-right">{pkg.admission}</span>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm gap-0.5 md:gap-0">
                            <span className="text-gray-500 md:text-gray-600 font-medium text-[9px] md:text-sm text-center md:text-left">বিছানা সহ মালপত্র</span>
                            <span className="font-bold text-gray-900 text-[11px] md:text-base text-center md:text-right">{pkg.bedding}</span>
                          </div>
                      </div>
                    </div>

                    <a 
                      href={generateWhatsAppLink(pkg.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 md:gap-2 w-full py-2 md:py-4 text-white font-bold rounded-lg md:rounded-xl transition-all shadow-md hover:shadow-lg mt-4 md:mt-8 bg-gradient-to-r ${pkg.gradient} text-xs md:text-base`}
                    >
                      <Phone className="w-3.5 h-3.5 md:w-5 md:h-5" />
                      বুকিং করুন
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ROOM CATEGORIES SECTION */}
          <section id="room-categories">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-gray-900">সিট / রুম ক্যাটাগরি</h3>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 rounded-r-xl rounded-l-md p-4 md:p-5 mb-8 flex items-start md:items-center gap-3 text-amber-900 shadow-md">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-amber-600 shrink-0 mt-0.5 md:mt-0" />
              <p className="font-semibold text-sm md:text-[15px]">
                ভাড়ার ভিন্নতার কারণ নির্ভর করে <span className="bg-amber-200/70 px-1.5 py-0.5 rounded text-amber-950 font-bold mx-0.5">location</span> ও <span className="bg-amber-200/70 px-1.5 py-0.5 rounded text-amber-950 font-bold mx-0.5">রুমের কোয়ালিটি</span> এর উপর।
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {roomCategories.map((room, idx) => (
                <motion.div 
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all flex flex-col h-full group overflow-hidden"
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {room.image ? (
                    <div 
                      className="relative h-28 md:h-36 mb-4 -mx-3 md:-mx-6 -mt-3 md:-mt-6 overflow-hidden rounded-t-2xl md:rounded-t-3xl cursor-pointer group/image"
                      onClick={() => setSelectedImage(room.image as string)}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 flex items-center justify-center transition-colors duration-300">
                        <span className="opacity-0 group-hover/image:opacity-100 bg-white/90 text-gray-900 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full transition-opacity duration-300 transform translate-y-2 group-hover/image:translate-y-0">
                          ছবিটি বড় করে দেখুন
                        </span>
                      </div>
                      <div className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${room.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10`}>
                        <room.icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${room.iconBg} flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <room.icon className="w-5 h-5 md:w-7 md:h-7" />
                    </div>
                  )}
                  
                  <h3 className="text-sm md:text-xl font-bold text-gray-900 leading-tight">{room.title}</h3>
                  <p className={`text-[10px] md:text-xs font-semibold mt-1 inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full ${room.color} mb-2 md:mb-4`}>
                    {room.subtitle}
                  </p>
                  
                  <div className="mb-2 md:mb-4 bg-indigo-50/50 p-2 md:p-3 rounded-lg md:rounded-xl border border-indigo-50">
                    <span className="text-indigo-600 font-medium text-[9px] md:text-xs block mb-0.5">মাসিক ভাড়া শুরু</span>
                    <div className="text-[13px] md:text-xl font-bold text-indigo-900 leading-tight flex items-baseline gap-1">
                      ৳{room.price}
                      <span className="text-[9px] md:text-sm font-medium text-indigo-500">/ মাস</span>
                    </div>
                  </div>

                  <p className="text-[11px] md:text-sm text-gray-600 mb-3 md:mb-6 leading-snug md:leading-relaxed flex-grow">
                    {room.description}
                  </p>

                  <div className="mt-auto">
                    <div className="space-y-1.5 md:space-y-2.5 mb-3 md:mb-6 bg-gray-50 p-2 md:p-4 rounded-lg md:rounded-xl">
                      {room.features.map((feature, i) => (
                        <div key={i} className="flex items-start text-[10px] md:text-sm text-gray-700">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mr-1 md:mr-2 mt-0.5 shrink-0" />
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a 
                      href={generateWhatsAppLink(room.title, room.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-3 bg-gray-900 hover:bg-teal-700 text-white rounded-lg md:rounded-xl text-[11px] md:text-sm font-semibold transition-colors"
                    >
                      <Phone className="w-3 h-3 md:w-4 md:h-4" />
                      বিস্তারিত জানুন
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="inline-flex items-center bg-white px-5 py-2.5 rounded-full text-sm font-medium border border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2" /> ১ সিট / ২ সিট / ৩ সিট / ৪ সিট
              </span>
              <span className="inline-flex items-center bg-white px-5 py-2.5 rounded-full text-sm font-medium border border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Fan className="w-4 h-4 text-teal-600 mr-2" /> AC / Non-AC রুম
              </span>
            </div>
          </section>

          {/* SHORT PACKAGES SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-bold text-gray-900">স্বল্প সময়ের প্যাকেজ</h3>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl md:rounded-2xl p-3 md:p-8 mb-6 md:mb-10 text-center shadow-sm max-w-4xl mx-auto flex flex-col items-center">
              <Clock className="w-6 h-6 md:w-10 md:h-10 text-amber-500 mb-2 md:mb-3" />
              <p className="text-amber-800 text-xs md:text-lg font-medium leading-snug md:leading-normal">টেস্ট পরীক্ষা, ভর্তি পরীক্ষা বা যেকোনো কাজে অল্প দিনের জন্য থাকার সবচেয়ে সাশ্রয়ী ব্যবস্থা।</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
              {shortPackages.map((pkg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: pkg.delay, type: 'spring', stiffness: 100 }}
                  className="bg-white border p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all border-gray-100 flex flex-col items-center text-center group"
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-teal-50 rounded-xl md:rounded-2xl flex items-center justify-center text-teal-600 font-bold text-sm md:text-xl mb-2 md:mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    {pkg.days}
                  </div>
                  <h4 className="text-gray-500 font-semibold text-[11px] md:text-sm mb-1.5 md:mb-2 leading-tight">{pkg.title}</h4>
                  <div className="text-[13px] md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-6 bg-gray-50 w-full py-1.5 md:py-2 rounded-lg md:rounded-xl">
                    {pkg.price}
                  </div>
                  <a 
                    href={generateWhatsAppLink(pkg.title, pkg.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full py-2 md:py-3 px-2 md:px-4 bg-gray-900 hover:bg-teal-700 text-white rounded-lg md:rounded-xl text-[11px] md:text-sm font-semibold transition-colors flex justify-center items-center gap-1.5 md:gap-2 shadow-md"
                  >
                    <Phone className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> <span className="whitespace-nowrap">বুক করুন</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Room Full View"
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain bg-black/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pricing;
