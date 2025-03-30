
import { useState } from 'react';
import { Wine } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, X } from 'lucide-react';

interface WineFiltersProps {
  onFilterChange: (filters: WineFilterOptions) => void;
  onReset: () => void;
}

export interface WineFilterOptions {
  search: string;
  priceRange: [number, number];
  types: string[];
  minRating: number;
}

const initialFilters: WineFilterOptions = {
  search: '',
  priceRange: [0, 5000],
  types: [],
  minRating: 0,
};

const WineFilters = ({ onFilterChange, onReset }: WineFiltersProps) => {
  const [filters, setFilters] = useState<WineFilterOptions>(initialFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const wineTypes = ['Red', 'White', 'Rosé', 'Sparkling'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeToggle = (type: string) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    const newFilters = { ...filters, types: updatedTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (value: number[]) => {
    const newFilters = { ...filters, minRating: value[0] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onReset();
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const filtersContent = (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-1">
          <Input 
            id="search"
            placeholder="Search wines..." 
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div>
        <Label>Price Range</Label>
        <div className="mt-2">
          <Slider 
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]} 
            max={5000} 
            step={100}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <Label>Wine Type</Label>
        <div className="mt-2 space-y-2">
          {wineTypes.map(type => (
            <div key={type} className="flex items-center">
              <Checkbox 
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <label 
                htmlFor={`type-${type}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label>Minimum Rating</Label>
        <div className="mt-2">
          <Slider 
            defaultValue={[filters.minRating]} 
            max={5} 
            step={0.5}
            onValueChange={handleRatingChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.minRating} ★</span>
            <span>5 ★</span>
          </div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={resetFilters}
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block">
        {filtersContent}
      </div>
      
      {/* Mobile Filters Toggle */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          onClick={toggleMobileFilters}
          className="mb-4 w-full"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            {filtersContent}
          </div>
        )}
      </div>
    </>
  );
};

export default WineFilters;
