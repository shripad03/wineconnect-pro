
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wineApi } from '@/services/api';
import { IWine } from '@/api/types';
import Layout from '@/components/layout/Layout';
import WineFilters, { WineFilterOptions } from '@/components/wines/WineFilters';
import WineGrid from '@/components/wines/WineGrid';
import { Loader2 } from 'lucide-react';

const WinesPage = () => {
  const [activeFilters, setActiveFilters] = useState<WineFilterOptions>({
    search: '',
    priceRange: [0, 5000],
    types: [],
    minRating: 0,
  });

  // Fetch wines with React Query
  const { data: wines = [], isLoading, error } = useQuery({
    queryKey: ['wines'],
    queryFn: wineApi.getAll,
  });

  // Apply filters to wines
  const applyFilters = (filters: WineFilterOptions) => {
    setActiveFilters(filters);
  };

  // Filter wines based on active filters
  const filteredWines = wines.filter(wine => {
    // Search filter
    const searchMatch = activeFilters.search === '' || 
      wine.name.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      wine.winery.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      wine.description.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      wine.varietal.toLowerCase().includes(activeFilters.search.toLowerCase());
    
    // Price range filter
    const priceMatch = wine.price >= activeFilters.priceRange[0] && wine.price <= activeFilters.priceRange[1];
    
    // Wine type filter
    const typeMatch = activeFilters.types.length === 0 || activeFilters.types.includes(wine.type);
    
    // Rating filter
    const ratingMatch = wine.rating >= activeFilters.minRating;
    
    return searchMatch && priceMatch && typeMatch && ratingMatch;
  });

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      search: '',
      priceRange: [0, 5000],
      types: [],
      minRating: 0,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-wine-700" />
          <span className="ml-2 text-lg">Loading wines...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Wines</h2>
          <p className="text-gray-600">
            There was a problem fetching the wine listings. Please try again later.
          </p>
        </div>
      </Layout>
    );
  }

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
