
import { useState } from 'react';
import { IWine } from '@/api/types';
import WineCard from './WineCard';
import { useToast } from '@/components/ui/use-toast';

interface WineGridProps {
  wines: IWine[];
}

const WineGrid = ({ wines }: WineGridProps) => {
  const { toast } = useToast();

  const handleAddToCart = (wine: IWine) => {
    toast({
      title: "Added to Cart",
      description: `${wine.name} has been added to your cart.`,
      duration: 3000,
    });
    // In a real app, this would add the wine to the cart in state or context
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wines.length > 0 ? (
        wines.map((wine) => (
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
