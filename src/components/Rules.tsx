import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

const Rules: React.FC = () => {
  return (
    <section id="rules" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">প্রয়োজনীয় নিয়মাবলী</h2>
          <div className="w-16 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            হোস্টেলে ভর্তি ও বসবাসের জন্য কিছু গুরুতপূর্ণ নিয়ম দেওয়া হলো, যা সকলের জানা আবশ্যক।
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Admission Rules */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 text-teal-600 rounded-full">
                <Info size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">ভর্তির নির্দেশাবলী</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>ভর্তির জন্য অফিস হতে ১০০/- টাকা দিয়ে ভর্তি ফরম সংগ্রহ করতে হবে এবং তা যথারীতি পূরণ করে অফিসে জমা দিতে হবে। ভর্তি ফরমের সহিত অবশ্যই ছাত্রীর দুই কপি পাসপোর্ট সাইজের ছবি এবং অভিভাবকের এক কপি ছবি লাগবে।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>ছাত্রীদের আইডি কার্ড এবং অভিভাবকের পরিচয় পত্র ১০০/- টাকা দিয়ে অফিস হতে সংগ্রহ করতে হবে। ভর্তির সময় পিতা-মাতা, স্থানীয় অভিভাবকের মধ্যে কমপক্ষে ১ জনকে অবশ্যই সাথে আসতে হবে।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                <span>রমজান মাসে দ্রব্য মূল্য বৃদ্ধির জন্য অতিরিক্ত ১৫০০/- টাকা, যদি ভর্তি কোচিং হয় তবে ২০০০/- টাকা প্রদান করতে হবে।</span>
              </li>
            </ul>
          </motion.div>

          {/* Seat Leaving Rules */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">সিট ত্যাগ</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>৪৫ দিন পূর্বে ২ কপি আবেদন ফরম অফিসে জমা দিতে হবে এবং ইনচার্জ এর স্বাক্ষরসহ ১ কপি নিজের কাছে রাখতে হবে। উক্ত সময়ের পর জানালে পরবর্তী মাসের মোট চার্জ হতে ৫০০/- টাকা বাদে চার্জ প্রদান করতে হবে।</span>
              </li>
            </ul>
          </motion.div>

          {/* Allowed Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-full">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">যা সঙ্গে আনা যাবে</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>তালাসহ ট্রাঙ্ক, ব্যক্তিগত মার্জিত পোশাক, প্রসাধনী ও বইপত্র।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>৩০০০/= টাকা প্রদান করলে ছাত্রীদের ব্যবহারের জন্য নিম্নলিখিত জিনিস গুলো প্রতিষ্ঠান থেকে সরবরাহ করা হয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>তোষক - ১টি (৬ ফুট x ২.৫ ফুট), চাদর - ১টি, বালিশ - ১টি (কভারসহ), থালা - ১টি, বাটি - ৩টি বা (লাঞ্চ বক্স), জগ - ১টি, গ্লাস - ১টি, মগ - ১টি, বালতি - ১টি। নষ্ট করা যাবে না, নিজ দায়িত্বে অফিস ইনচার্জকে বুঝিয়ে দিতে হবে। ইচ্ছা করলে ছাত্র/ছাত্রীরা উক্ত মালপত্র নিজে ক্রয় করে আনতে পারবে।</span>
              </li>
            </ul>
          </motion.div>

          {/* Disallowed Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 text-red-600 rounded-full">
                <XCircle size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">যা সঙ্গে আনা যাবে না</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-start gap-2">
                <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <span>আয়রন, হিটার, ফ্যান, অবাঞ্ছিত কোন জিনিসপত্র, সোনার তৈরি ও মূল্যবান জিনিসপত্র। তালিকাভুক্ত জিনিস পত্র ছাড়া যদি কারও কাছে অন্য কোন জিনিসপত্র পাওয়া যায় তবে সেগুলো অফিসে আনা হবে এবং বাজেয়াপ্ত করা হবে। কিছু নষ্ট বা হারাইয়া গেলে কর্তৃপক্ষকে দায়ী করা যাবে না।</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Rules;
