
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { wineries } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedWineries = () => {
  const featuredWineries = wineries.filter(winery => winery.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayCount = 3;

  const nextSlide = () => {
    if (currentIndex + displayCount < featuredWineries.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(featuredWineries.length - displayCount);
    }
  };

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-wine-900">Featured Wineries</h2>
          <Link to="/wineries" className="text-wine-700 hover:text-wine-900 font-medium">
            View All
          </Link>
        </div>
        
        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {featuredWineries.map((winery) => (
                <div key={winery.id} className="w-full md:w-1/3 flex-shrink-0 p-3">
                  <Card className="overflow-hidden h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={winery.coverImageUrl} 
                        alt={winery.name} 
                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-300 flex-shrink-0">
                          <img 
                            src={winery.logoUrl} 
                            alt={`${winery.name} logo`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-serif text-xl font-semibold text-wine-900">{winery.name}</h3>
                          <p className="text-sm text-gray-600">
                            {winery.location.region}, {winery.location.country} • Est. {winery.established}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-3 mb-4">{winery.description}</p>
                      <Link to={`/wineries/${winery.id}`}>
                        <Button className="w-full bg-wine-600 hover:bg-wine-700 text-white">
                          View Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {featuredWineries.length > displayCount && (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white shadow-lg rounded-full hidden md:flex"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white shadow-lg rounded-full hidden md:flex"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWineries;
