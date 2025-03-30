
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://source.unsplash.com/random/1920x1080/?vineyard,wine" 
          alt="Indian vineyard" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Global Access to India's Finest Wines
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Connect directly with Nashik's premier wineries and discover exceptional wines for your global market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/wines">
              <Button size="lg" className="bg-wine-700 hover:bg-wine-800 text-white">
                Explore Wines
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Register as Buyer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
