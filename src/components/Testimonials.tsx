import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: "ফারিয়া ইসলাম",
    role: "বিশ্ববিদ্যালয় শিক্ষার্থী",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "নিবেদিকা হোস্টেলের পরিবেশ খুবই সুন্দর এবং নিরাপদ। আমি গত ২ বছর ধরে এখানে আছি, কখনো কোনো সমস্যায় পড়িনি। পড়াশোনার জন্য এর চেয়ে ভালো জায়গা আর হতে পারে না।",
    rating: 5
  },
  {
    name: "সুমাইয়া আক্তার",
    role: "ব্যাংকার",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "খাবারের মান নিয়ে আমি খুবই সন্তুষ্ট। আর এখানকার ম্যানেজমেন্ট যেকোনো প্রয়োজনে খুব দ্রুত সাড়া দেয়। কর্মজীবী নারীদের জন্য এটি একটি আদর্শ আবাসন।",
    rating: 5
  },
  {
    name: "নুসরাত জাহান",
    role: "মেডিকেল ভর্তি পরীক্ষার্থী",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "ফার্মগেট ব্রাঞ্চটি আমার কোচিং সেন্টারের খুব কাছে হওয়ায় যাতায়াতে অনেক সুবিধা হয়েছে। হোস্টেলের শান্ত পরিবেশ আমার প্রস্তুতিতে অনেক সাহায্য করেছে।",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-teal-50/50 scroll-mt-20 md:scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            আমাদের সম্পর্কে ছাত্রীদের মতামত
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            জেনে নিন আমাদের বর্তমান ও প্রাক্তন বর্ডাররা নিবেদিকা হোস্টেল সম্পর্কে কি বলছেন
          </p>
          <div className="w-16 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-4 md:mt-6"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative flex flex-col h-full"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-teal-100">
                <Quote size={40} className="fill-current" />
              </div>

              {/* Rating */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-grow italic relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-teal-600 text-xs md:text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
