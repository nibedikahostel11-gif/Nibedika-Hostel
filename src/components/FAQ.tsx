import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "বুকিংয়ের জন্য কী কী ডকুমেন্ট প্রয়োজন?",
    answer: "বুকিংয়ের জন্য আপনার জাতীয় পরিচয়পত্র (NID) অথবা জন্ম নিবন্ধনের ফটোকপি, ২ কপি পাসপোর্ট সাইজ ছবি এবং অভিভাবকের সম্মতিপত্র প্রয়োজন।"
  },
  {
    question: "ভাড়ার সাথে কি বিল অন্তর্ভুক্ত?",
    answer: "হ্যাঁ, ভাড়ার সাথে গ্যাস, পানি, বিদ্যুৎ, জেনারেটর এবং ওয়াইফাই বিল অন্তর্ভুক্ত। তবে এসি রুমের ক্ষেত্রে বিদ্যুৎ বিল আলাদা মিটারে হিসেব করা হয়।"
  },
  {
    question: "গেট বন্ধ হওয়ার সময় কখন?",
    answer: "নিরাপত্তার স্বার্থে রাত ১০:৩০ মিনিটের মধ্যে হোস্টেলে প্রবেশ করতে হয়। বিশেষ প্রয়োজনে অভিভাবকের অনুমতি সাপেক্ষে বিলম্ব করা যেতে পারে।"
  },
  {
    question: "খাবারের মেনু কেমন?",
    answer: "আমরা প্রতিদিন সুষম ও স্বাস্থ্যকর খাবার পরিবেশন করি। সপ্তাহে ৩ দিন মাছ, ২ দিন মাংস এবং ১ দিন ডিম/ভর্তা-ভাজি থাকে। সকালে রুটি/খিচুড়ি/পরোটা থাকে।"
  },
  {
    question: "গেস্ট পলিসি কী?",
    answer: "মহিলা হোস্টেলে মা বা বোন এবং পুরুষ হোস্টেলে বাবা বা ভাই গেস্ট হিসেবে থাকতে পারেন। এর জন্য ৩০০ টাকা/দিন চার্জ প্রযোজ্য।"
  },
  {
    question: "সিকিউরিটি মানি কত?",
    answer: "ভর্তির সময় ১ মাসের ভাড়ার সমপরিমাণ টাকা সিকিউরিটি মানি হিসেবে জমা দিতে হয়, যা হোস্টেল ছাড়ার সময় ফেরতযোগ্য (শর্ত সাপেক্ষে)।"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-teal-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">সচরাচর জিজ্ঞাসা</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">
            আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর।
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 flex items-center gap-3">
                    <HelpCircle size={20} className="text-teal-500" />
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus size={20} className="text-teal-500" />
                  ) : (
                    <Plus size={20} className="text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
