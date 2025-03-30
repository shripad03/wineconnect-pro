import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wineApi } from '@/services/api';
import { IWine } from '@/api/types';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, ShoppingCart, Truck, Shield, Star, ChevronLeft, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import WineGrid from '@/components/wines/WineGrid';

const WineDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const { toast } = useToast();
  
  // Fetch wine details
  const { data: wine, isLoading: isLoadingWine, error: wineError } = useQuery({
    queryKey: ['wine', id],
    queryFn: () => (id ? wineApi.getById(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });
  
  // Fetch related wines when wine data is available
  const { data: relatedWines = [] } = useQuery({
    queryKey: ['wines', 'related', wine?.wineryId, wine?.type],
    queryFn: () => {
      if (!wine) return Promise.resolve([]);
      // Get wines from the same winery or of the same type
      return wineApi.filter({ 
        wineryId: wine.wineryId, 
        type: wine.type,
        exclude: wine.id 
      });
    },
    enabled: !!wine,
  });
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (wine) {
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${wine.name} has been added to your cart.`,
        duration: 3000,
      });
      // In a real app, this would add the wine to the cart in state or context
    }
  };
  
  if (isLoadingWine) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">Loading wine details...</p>
        </div>
      </Layout>
    );
  }
  
  if (wineError || !wine) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Wine not found</h1>
          <p className="mt-2 text-gray-500">The wine you are looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/wines" className="inline-flex items-center text-wine-700 hover:text-wine-900">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Wines
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Wine Image */}
            <div className="relative h-96 md:h-full">
              <img 
                src={wine.imageUrl} 
                alt={wine.name} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-wine-700">
                {wine.type}
              </Badge>
            </div>
            
            {/* Wine Details */}
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <Link to={`/wineries/${wine.wineryId}`} className="text-sm text-wine-700 hover:underline">
                  {wine.winery}
                </Link>
                <h1 className="text-3xl font-serif font-bold text-wine-900 mt-1">{wine.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(wine.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{wine.rating} rating</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{wine.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Varietal</h3>
                  <p className="text-gray-800">{wine.varietal}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Year</h3>
                  <p className="text-gray-800">{wine.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Region</h3>
                  <p className="text-gray-800">{wine.region}, {wine.country}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Min. Order</h3>
                  <p className="text-gray-800">{wine.minOrderQuantity} units</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price per Unit</h3>
                  <p className="text-3xl font-bold text-wine-900">₹{wine.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className={`font-semibold ${wine.available ? 'text-green-600' : 'text-red-600'}`}>
                    {wine.available ? 'In Stock' : 'Sold Out'}
                  </p>
                </div>
              </div>
              
              {wine.available && (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                    <input 
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min={wine.minOrderQuantity}
                      step={1}
                      className="w-20 p-2 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                  
                  <Button 
                    className="bg-wine-700 hover:bg-wine-800 w-full py-6 text-lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <QrCode className="h-5 w-5 mr-2" />
                    Generate QR Code
                  </Button>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-start mb-2">
                      <Truck className="h-5 w-5 text-wine-700 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">International shipping available with full export documentation</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-wine-700 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">Secure payments with buyer protection</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="border-t border-gray-200 p-6">
            <Tabs defaultValue="details">
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="tasting" className="flex-1">Tasting Notes</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <h3 className="text-xl font-serif font-semibold text-wine-900 mb-3">Wine Details</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Varietal</td>
                          <td className="py-3 text-gray-800">{wine.varietal}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Type</td>
                          <td className="py-3 text-gray-800">{wine.type}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Vintage</td>
                          <td className="py-3 text-gray-800">{wine.year}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Region</td>
                          <td className="py-3 text-gray-800">{wine.region}, {wine.country}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Alcohol Content</td>
                          <td className="py-3 text-gray-800">13.5%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-sm font-medium text-gray-500">Bottle Size</td>
                          <td className="py-3 text-gray-800">750ml</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-sm font-medium text-gray-500">Tags</td>
                          <td className="py-3">
                            <div className="flex flex-wrap gap-2">
                              {wine.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-cream-50">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-wine-900 mb-3">Winery Information</h3>
                    <p className="text-gray-700 mb-4">
                      This wine is produced by {wine.winery}, one of the premier wineries in Nashik, India. The winery follows sustainable practices and combines traditional methods with modern technology.
                    </p>
                    <Link to={`/wineries/${wine.wineryId}`}>
                      <Button variant="outline">
                        Visit Winery Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tasting" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-serif font-semibold text-wine-900 mb-4">Tasting Notes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-cream-50 p-4 rounded-lg">
                      <h4 className="font-medium text-wine-800 mb-2">Appearance</h4>
                      <p className="text-gray-700">Deep ruby red with brilliant clarity and medium-high viscosity.</p>
                    </div>
                    <div className="bg-cream-50 p-4 rounded-lg">
                      <h4 className="font-medium text-wine-800 mb-2">Nose</h4>
                      <p className="text-gray-700">Intense aromas of black cherry, blackcurrant, and vanilla with subtle notes of tobacco and spice.</p>
                    </div>
                    <div className="bg-cream-50 p-4 rounded-lg">
                      <h4 className="font-medium text-wine-800 mb-2">Palate</h4>
                      <p className="text-gray-700">Full-bodied with firm tannins, balanced acidity, and flavors of dark fruits, chocolate, and oak.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Finish</h4>
                    <p className="text-gray-700">
                      Long and smooth with lingering notes of dark fruit, spice, and subtle earthiness. The tannins are well-integrated, providing structure without harshness.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Food Pairing</h4>
                    <p className="text-gray-700 mb-3">
                      This wine pairs exceptionally well with:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Grilled red meats and game</li>
                      <li>Aged hard cheeses</li>
                      <li>Rich tomato-based pasta dishes</li>
                      <li>Dark chocolate desserts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg flex items-start">
                    <Info className="h-5 w-5 text-wine-700 mr-3 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Our wines are evaluated by a panel of expert sommeliers to provide accurate and consistent tasting notes across our entire collection.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-serif font-semibold text-wine-900 mb-4">Shipping & Export Information</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Minimum Order Quantity</h4>
                    <p className="text-gray-700">
                      The minimum order quantity for this wine is {wine.minOrderQuantity} units (bottles/cases depending on the product).
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Export Documentation</h4>
                    <p className="text-gray-700 mb-3">
                      We provide all necessary export documentation, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Certificate of Origin</li>
                      <li>Commercial Invoice</li>
                      <li>Packing List</li>
                      <li>Health Certificates</li>
                      <li>Export Permits</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Shipping Methods</h4>
                    <p className="text-gray-700 mb-3">
                      We offer the following shipping options:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-md p-3">
                        <h5 className="font-medium text-gray-800">Sea Freight</h5>
                        <p className="text-sm text-gray-600">Estimated delivery: 30-45 days</p>
                        <p className="text-sm text-gray-600">Suitable for large orders</p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3">
                        <h5 className="font-medium text-gray-800">Air Freight</h5>
                        <p className="text-sm text-gray-600">Estimated delivery: 5-10 days</p>
                        <p className="text-sm text-gray-600">Premium shipping option</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-cream-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-wine-800 mb-2">Temperature Controlled</h4>
                    <p className="text-gray-700">
                      All our shipments are temperature-controlled to ensure the quality and integrity of the wine during transit, regardless of destination.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-wine-800 mb-2">Customs & Import Duties</h4>
                    <p className="text-gray-700">
                      Import duties, taxes, and customs clearance are the responsibility of the buyer and vary by country of destination. We can provide guidance on these requirements for major markets.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Wines Section */}
        {relatedWines.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-semibold text-wine-900 mb-6">You May Also Like</h2>
            <WineGrid wines={relatedWines} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WineDetailPage;
