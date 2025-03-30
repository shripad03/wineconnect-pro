
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wine, CartItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItemComponent = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
  const { wine, quantity } = item;
  
  const handleQuantityIncrease = () => {
    onQuantityChange(wine.id, quantity + 1);
  };
  
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(wine.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    onRemove(wine.id);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={wine.imageUrl} 
          alt={wine.name} 
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              <Link to={`/wines/${wine.id}`} className="hover:text-wine-700">
                {wine.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{wine.winery}</p>
            <p className="mt-1 text-sm text-gray-500">{wine.year} • {wine.type}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">₹{wine.price}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={handleQuantityIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-red-500"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
            <span className="ml-1">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
