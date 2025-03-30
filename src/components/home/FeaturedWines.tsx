
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wineApi } from '@/services/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon, Loader2 } from 'lucide-react';

const FeaturedWines = () => {
  const { data: wines = [], isLoading, error } = useQuery({
    queryKey: ['wines'],
    queryFn: wineApi.getAll,
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-wine-900">Featured Wines</h2>
            <Link to="/wines" className="text-wine-700 hover:text-wine-900 font-medium">
              View All
            </Link>
          </div>
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-wine-700" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-wine-900">Featured Wines</h2>
            <Link to="/wines" className="text-wine-700 hover:text-wine-900 font-medium">
              View All
            </Link>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">Unable to load featured wines. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredWines = wines.filter(wine => wine.available).slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-wine-900">Featured Wines</h2>
          <Link to="/wines" className="text-wine-700 hover:text-wine-900 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWines.map((wine) => (
            <Card key={wine.id} className="overflow-hidden">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={wine.imageUrl} 
                  alt={wine.name} 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-wine-700">
                  {wine.type}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{wine.winery}</p>
                  <h3 className="font-serif text-lg font-semibold text-wine-900">{wine.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(wine.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{wine.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-wine-900 font-bold text-lg">₹{wine.price}</p>
                    <p className="text-gray-500 text-xs">Min. Order: {wine.minOrderQuantity} units</p>
                  </div>
                  <Link to={`/wines/${wine.id}`}>
                    <Button size="sm" className="bg-wine-600 hover:bg-wine-700 text-white">
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWines;
