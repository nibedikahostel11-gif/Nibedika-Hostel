import { Wifi, ShieldCheck, Utensils, Zap, Wind, Droplets, Map, Home } from 'lucide-react';
import { motion } from 'motion/react';

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

export default function Amenities() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">কেন আমাদের বেছে নিবেন?</h2>
          <div className="w-16 md:w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white p-3 md:p-6 rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-all text-center group flex flex-col items-center h-full"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-2 md:mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xs md:text-lg font-bold text-gray-800 mb-1 md:mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-[9px] md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
