
import { Link } from 'react-router-dom';
import { IWine } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon, ShoppingCart } from 'lucide-react';

interface WineCardProps {
  wine: IWine;
  onAddToCart: (wine: IWine) => void;
}

const WineCard = ({ wine, onAddToCart }: WineCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={wine.imageUrl} 
          alt={wine.name} 
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-wine-700">
          {wine.type}
        </Badge>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm text-gray-500">{wine.winery}</p>
          <Link to={`/wines/${wine.id}`}>
            <h3 className="font-serif text-lg font-semibold text-wine-900 hover:text-wine-700 transition-colors">
              {wine.name}
            </h3>
          </Link>
          <div className="flex items-center mt-1 mb-2">
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
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{wine.description}</p>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="inline-block px-2 py-1 bg-muted rounded-md mr-2">{wine.varietal}</span>
            <span>{wine.region}, {wine.country}</span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-wine-900 font-bold text-lg">₹{wine.price}</p>
            <p className="text-gray-500 text-xs">Min. Order: {wine.minOrderQuantity} units</p>
          </div>
          <Button 
            size="sm" 
            className="bg-wine-600 hover:bg-wine-700 text-white" 
            onClick={() => onAddToCart(wine)}
            disabled={!wine.available}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {wine.available ? 'Add' : 'Sold Out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WineCard;
