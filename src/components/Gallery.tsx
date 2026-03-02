import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "https://drive.google.com/thumbnail?id=1jZSPOIiB6-WnpndR3JuBKjERKTx0ebZl&sz=w1000",
    "https://drive.google.com/thumbnail?id=1O0FcLtv-60SzrhmArzO4kHCCeEQ6BXPD&sz=w1000",
    "https://drive.google.com/thumbnail?id=1-olRuQ_mOShxydZpuRX9BsqJdG6oVsKJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1GUAadgvzSmZFIpdtgqbzOSWbbiXc6s1A&sz=w1000",
    "https://drive.google.com/thumbnail?id=1pOvrS80BbcbQ0JKM7qXW0jq773k_b5pS&sz=w1000",
    "https://drive.google.com/thumbnail?id=1UMiXfx6Xvs5f-dMf9dzoH1ei361fhhwJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ewvgHNxs88qmJBPP7FrfqOR-LvoBzRsg&sz=w1000",
    "https://drive.google.com/thumbnail?id=1wI8wUBFqJr8wjpoHAuHulyQJGmi0xkVE&sz=w1000",
    "https://drive.google.com/thumbnail?id=1avvk7_icSkIPKTFBr6S0RXsP21tPq71P&sz=w1000",
    "https://drive.google.com/thumbnail?id=1lxq78JAmcwFSNei9Lq8YKvhWAhdxCr91&sz=w1000",
    "https://drive.google.com/thumbnail?id=1mQCkhDFA_ZIobuCb-a6FENOIlui7YDlx&sz=w1000",
    "https://drive.google.com/thumbnail?id=1OaLYB_-01C4Da_8XydaW7dwJlY6_nhum&sz=w1000",
    "https://drive.google.com/thumbnail?id=1jmRCb0TB_7gmTaNburdF3q3aeQTfL52m&sz=w1000",
    "https://drive.google.com/thumbnail?id=1HEf3-d0_DE2y2mMTSloMLt9ajRIbyFVq&sz=w1000",
    "https://drive.google.com/thumbnail?id=1uohqpwKO0ElUG_mjIsUzOfISbPdmoEr3&sz=w1000",
    "https://drive.google.com/thumbnail?id=1rorPU9puHxx9sNaJ8yA0DGP4ClXs7il2&sz=w1000",
    "https://drive.google.com/thumbnail?id=1VRfdW25HG_7t-NEZjTxx9okaj0eA6Bjb&sz=w1000",
    "https://drive.google.com/thumbnail?id=1dMb6c2opjRMZnf28tUwRrzlGPks1BRVo&sz=w1000",
    "https://drive.google.com/thumbnail?id=1kYBcJt2m0DtXcYP0gX2NzoEIlZyItJw2&sz=w1000",
    "https://drive.google.com/thumbnail?id=1S0IAFN56x5cLqZQO2KQng2UF33xSpGP3&sz=w1000",
    "https://drive.google.com/thumbnail?id=1V8Dv8z4XJUjN3D7Ne-7OhbANKK0nMNLH&sz=w1000",
    "https://drive.google.com/thumbnail?id=1c59YRW6ppjOtgOifjH_UtHeeeni0Z7T4&sz=w1000"
  ];

  return (
    <section id="gallery" className="py-12 md:py-24 bg-white scroll-mt-20 md:scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            আমাদের গ্যালারি
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            নিবেদিকা ভিআইপি হোস্টেলের পরিবেশ, রুম, ডাইনিং এবং অন্যান্য সুবিধার কিছু স্থিরচিত্র।
          </p>
          <div className="w-16 md:w-24 h-1 bg-teal-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {images.map((imgUrl, index) => (
            <div 
              key={index} 
              className="break-inside-avoid relative group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
              onClick={() => setSelectedImage(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`Gallery Image ${index + 1}`}
                className="w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setSelectedImage(null)}
            ></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
