
import { useState, useEffect, useMemo } from 'react';
import { wines, Wine } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import WineFilters, { WineFilterOptions } from '@/components/wines/WineFilters';
import WineGrid from '@/components/wines/WineGrid';

const WinesPage = () => {
  const [filteredWines, setFilteredWines] = useState<Wine[]>(wines);
  const [activeFilters, setActiveFilters] = useState<WineFilterOptions>({
    search: '',
    priceRange: [0, 5000],
    types: [],
    minRating: 0,
  });

  // Apply filters to wines
  const applyFilters = (filters: WineFilterOptions) => {
    setActiveFilters(filters);
    
    const filtered = wines.filter(wine => {
      // Search filter
      const searchMatch = filters.search === '' || 
        wine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        wine.winery.toLowerCase().includes(filters.search.toLowerCase()) ||
        wine.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        wine.varietal.toLowerCase().includes(filters.search.toLowerCase());
      
      // Price range filter
      const priceMatch = wine.price >= filters.priceRange[0] && wine.price <= filters.priceRange[1];
      
      // Wine type filter
      const typeMatch = filters.types.length === 0 || filters.types.includes(wine.type);
      
      // Rating filter
      const ratingMatch = wine.rating >= filters.minRating;
      
      return searchMatch && priceMatch && typeMatch && ratingMatch;
    });
    
    setFilteredWines(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      search: '',
      priceRange: [0, 5000],
      types: [],
      minRating: 0,
    });
    setFilteredWines(wines);
  };

  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-wine-900">Explore Our Wines</h1>
            <p className="text-gray-600 mt-2">Discover premium wines from Nashik's finest vineyards</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-1/4">
            <WineFilters onFilterChange={applyFilters} onReset={resetFilters} />
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                <span className="font-medium">{filteredWines.length}</span> 
                {' '}wines found
              </p>
              {/* We could add sorting options here in a future iteration */}
            </div>
            
            <WineGrid wines={filteredWines} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WinesPage;
