import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    "প্রতিদিন মাছ, মাংস, ডিম সহ সুস্বাদু খাবার ৩বেলা",
    "নিরাপদ ও পরিষ্কার পরিবেশ",
    "ওয়াইফাই, ফিল্টার পানি, কিচেন, ফ্রিজ",
    "পড়ালেখার জন্য নিরিবিরি পরিবেশ",
    "রেগুলার রুম সার্ভিস",
    "রুমে রুমে খাবার সরবরাহ",
    "ওয়াশিং মেশিন",
    "মাসে ২ বার পোলাও-মাংস"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-teal-50 border border-teal-100 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-xl">
              <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-teal-600" />
            </div>
            আমাদের হোস্টেলে থাকলে আপনি পাবেন:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className="p-1 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-teal-500 shrink-0" />
                </div>
                <span className="text-sm md:text-[15px] font-medium text-gray-700 leading-snug">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
