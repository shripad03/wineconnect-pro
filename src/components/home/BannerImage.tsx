
import React from 'react';
import { Grape } from 'lucide-react';

const BannerImage = () => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-wine-900 to-wine-700 opacity-90">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?vineyard,winery')] mix-blend-overlay bg-cover bg-center opacity-75"></div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center h-full text-white p-6 text-center">
        <Grape className="w-16 h-16 mb-4" />
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">WineConnectPro</h2>
        <p className="text-lg md:text-xl max-w-2xl">
          Connecting Nashik Valley Wineries with Global Buyers
        </p>
      </div>
    </div>
  );
};

export default BannerImage;
