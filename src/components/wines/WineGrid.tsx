
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IWine } from '@/api/types';
import WineCard from './WineCard';
import { useToast } from '@/components/ui/use-toast';
import { wineApi } from '@/services/api';
import { Loader2 } from 'lucide-react';

interface WineGridProps {
  wines?: IWine[];
  showAll?: boolean;
}

const WineGrid = ({ wines: propWines, showAll = false }: WineGridProps) => {
  const { toast } = useToast();
  
  // Only fetch wines if none are provided as props
  const { data: fetchedWines, isLoading } = useQuery({
    queryKey: ['wines'],
    queryFn: wineApi.getAll,
    enabled: !propWines,
  });

  const wines = propWines || fetchedWines || [];

  const handleAddToCart = (wine: IWine) => {
    toast({
      title: "Added to Cart",
      description: `${wine.name} has been added to your cart.`,
      duration: 3000,
    });
    // In a real app, this would add the wine to the cart in state or context
  };

  if (isLoading && !propWines) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-wine-700" />
        <span className="ml-2 text-wine-700">Loading wines...</span>
      </div>
    );
  }

  const displayWines = showAll ? wines : wines.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayWines.length > 0 ? (
        displayWines.map((wine) => (
          <WineCard 
            key={wine.id} 
            wine={wine} 
            onAddToCart={handleAddToCart} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No wines found matching your criteria</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters for more results</p>
        </div>
      )}
    </div>
  );
};

export default WineGrid;
