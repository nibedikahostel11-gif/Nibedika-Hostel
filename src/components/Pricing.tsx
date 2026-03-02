import React from 'react';
import { CheckCircle2, Phone, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const commonFeatures = [
    "৩ বেলা স্বাস্থ্যকর খাবার",
    "ফ্রি হাই-স্পিড ওয়াইফাই",
    "২৪/৭ নিরাপত্তা ও সিসিটিভি",
    "ফিল্টার পানির সুব্যবস্থা",
    "জেনারেটর সুবিধা",
    "টাইলসকৃত পরিষ্কার রুম",
  ];

  const allPackages = [
    {
      title: "৪ সিট (ইকোনমি)",
      price: "৪,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "বাজেট ফ্রেন্ডলি"],
      highlight: false
    },
    {
      title: "৪ সিট (স্পেশাল)",
      price: "৫,১০০",
      period: "/মাস",
      features: [...commonFeatures, "উন্নত ভেন্টিলেশন"],
      highlight: false
    },
    {
      title: "৩ সিট (ইকোনমি)",
      price: "৫,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "পর্যাপ্ত আলো বাতাস"],
      highlight: false
    },
    {
      title: "৩ সিট (স্পেশাল)",
      price: "৬,১০০",
      period: "/মাস",
      features: [...commonFeatures, "সেমি-প্রাইভেট"],
      highlight: false
    },
    {
      title: "২ সিট (ইকোনমি)",
      price: "৬,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "শান্তিপূর্ণ পরিবেশ"],
      highlight: true
    },
    {
      title: "২ সিট (স্পেশাল)",
      price: "৭,১০০",
      period: "/মাস",
      features: [...commonFeatures, "প্রিমিয়াম ফিনিশিং"],
      highlight: false
    },
    {
      title: "সিঙ্গেল রুম (VIP)",
      price: "৮,১০০",
      period: "/মাস",
      features: [...commonFeatures, "সম্পূর্ণ ব্যক্তিগত প্রাইভেসি"],
      highlight: false
    },
    {
      title: "ডেইলি গেস্ট",
      price: "৩০০",
      period: "/দিন",
      features: [
        "৩ বেলা খাবার আলোচনা সাপেক্ষে",
        "স্বল্পমেয়াদী থাকার ব্যবস্থা",
        "নিরাপদ পরিবেশ",
        "ওয়াইফাই ও অন্যান্য সুবিধা",
      ],
      highlight: false,
      isDaily: true
    }
  ];

  const generateWhatsAppLink = (title: string, price: string) => {
    const message = `আসসালামু আলাইকুম, আমি "${title}" (${price} টাকা) প্যাকেজটি বুকিং দিতে চাই। বিস্তারিত জানাবেন প্লিজ?`;
    return `https://wa.me/8801345200218?text=${encodeURIComponent(message)}`;
  };

  const guardianWaLink = `https://wa.me/8801345200218?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি অভিভাবকদের জন্য ২৫০ টাকার প্যাকেজটি বুকিং দিতে চাই।")}`;

  return (
    <section id="pricing" className="py-6 md:py-24 bg-gray-50 scroll-mt-20 md:scroll-mt-28 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4 md:mb-12">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
            সাশ্রয়ী ভাড়ার তালিকা
          </h2>
          <div className="inline-block bg-teal-50 border border-teal-100/50 rounded-lg px-3 py-2 md:px-6 md:py-3 shadow-sm">
            <p className="text-[10px] md:text-sm text-teal-800/80 font-medium max-w-2xl mx-auto leading-relaxed">
              আমাদের প্রতিটি প্যাকেজে ৩ বেলা খাওয়া এবং অন্যান্য সকল ইউটিলিটি বিল অন্তর্ভুক্ত। <br className="hidden md:block" />
              <span className="text-amber-700 font-bold text-[10px] md:text-xs mt-1 inline-block bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shadow-sm">* তবে সিজনাল কোচিং টাইমে ভাড়া কিছুটা বৃদ্ধি পেয়ে থাকে।</span>
            </p>
          </div>
          <div className="w-12 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-3 md:mt-6"></div>
        </div>

        {/* Main Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-6 md:mb-16 max-w-7xl mx-auto">
          {allPackages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white rounded-md md:rounded-lg p-2 md:p-6 border flex flex-col h-full ${
                pkg.highlight 
                  ? 'border-teal-500 shadow-md relative' 
                  : 'border-gray-200 shadow-sm relative'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[8px] md:text-xs font-bold px-1.5 py-0.5 md:px-3 rounded-bl-md rounded-tr-md shadow-sm">
                  জনপ্রিয়
                </div>
              )}
              
              <h4 className="text-[11px] md:text-lg font-bold text-gray-800 mb-0.5 md:mb-2 leading-tight">{pkg.title}</h4>
              <div className="flex flex-wrap items-baseline mb-1.5 md:mb-4">
                <span className={`text-sm md:text-2xl font-bold ${pkg.isDaily ? 'text-gray-800' : 'text-teal-600'}`}>
                  ৳{pkg.price}
                </span>
                <span className="text-[8px] md:text-sm text-gray-500 font-medium ml-0.5">{pkg.period}</span>
              </div>
              
              <div className="flex-grow">
                <div className="h-px bg-gray-100 w-full mb-1.5 md:mb-4"></div>
                <ul className="space-y-0.5 md:space-y-3 mb-2 md:mb-6">
                  {pkg.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-1 md:gap-2 text-[8px] md:text-sm text-gray-600">
                      <CheckCircle2 className={`shrink-0 mt-0.5 w-2 h-2 md:w-4 md:h-4 ${pkg.isDaily ? 'text-yellow-500' : 'text-teal-500'}`} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href={generateWhatsAppLink(pkg.title, pkg.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2.5 rounded-md text-[9px] md:text-sm font-bold transition-colors mt-auto shadow-sm ${
                   pkg.highlight
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : pkg.isDaily 
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                }`}
              >
                <Phone className="w-2 h-2 md:w-4 md:h-4" />
                Book Now
              </a>
            </div>
          ))}
        </div>

        {/* Guardian Package Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-md md:rounded-lg p-3 md:p-8 text-center shadow-md border border-gray-800">
             <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-3">
                    <Star className="text-yellow-400 fill-yellow-400 w-3.5 h-3.5 md:w-6 md:h-6" />
                    <h3 className="text-sm md:text-2xl font-bold text-yellow-400">
                      অভিভাবকদের জন্য বিশেষ সুবিধা
                    </h3>
                </div>
                
                <p className="text-gray-300 text-[10px] md:text-base leading-relaxed max-w-2xl mb-3 md:mb-6">
                  মা অথবা মহিলা অভিভাবক মাত্র <span className="text-white font-bold text-xs md:text-xl mx-1">২৫০ টাকায়</span> (থাকা+খাবার) বর্ডারের সাথে থাকতে পারবেন।
                </p>

                <a 
                  href={guardianWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1.5 md:px-6 md:py-2.5 rounded-md font-bold text-[10px] md:text-sm transition-colors shadow-sm"
                >
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                  Book Now
                </a>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
