
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wineryApi, wineApi } from '@/services/api';
import { IWinery, IWine } from '@/api/types';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WineGrid from '@/components/wines/WineGrid';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Mail, Phone, Globe, ExternalLink } from 'lucide-react';

const WineryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch winery data
  const { data: winery, isLoading: isLoadingWinery, error: wineryError } = useQuery({
    queryKey: ['winery', id],
    queryFn: () => (id ? wineryApi.getById(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });
  
  // Fetch wines for this winery
  const { data: wines = [], isLoading: isLoadingWines } = useQuery({
    queryKey: ['wines', 'winery', id],
    queryFn: () => (id ? wineApi.getByWinery(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });
  
  if (isLoadingWinery) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">Loading winery information...</p>
        </div>
      </Layout>
    );
  }
  
  if (wineryError || !winery) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Winery not found</h1>
          <p className="mt-2 text-gray-500">The winery you are looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0">
          <img 
            src={winery.coverImageUrl} 
            alt={winery.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white mb-4">
              <img 
                src={winery.logoUrl} 
                alt={`${winery.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold">{winery.name}</h1>
            <p className="mt-2 flex items-center justify-center">
              <MapPin className="h-4 w-4 mr-1" />
              {winery.location.region}, {winery.location.country}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="wines" className="flex-1">Wines</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">Contact</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif font-semibold text-wine-900 mb-4">About {winery.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Established in {winery.established}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{winery.description}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </p>
                <div className="bg-cream-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-wine-900 mb-2">Wine Production Highlights</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Sustainable viticulture practices</li>
                    <li>State-of-the-art winemaking facilities</li>
                    <li>Annual production capacity of 100,000 cases</li>
                    <li>Exports to over 20 countries worldwide</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Wines Tab */}
          <TabsContent value="wines" className="mt-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-serif font-semibold text-wine-900 mb-6 text-center">
                Wines from {winery.name}
              </h2>
              {isLoadingWines ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading wines...</p>
                </div>
              ) : wines.length > 0 ? (
                <WineGrid wines={wines} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No wines available from this winery at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif font-semibold text-wine-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-wine-700 mr-3" />
                    <span className="text-gray-700">info@{winery.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-wine-700 mr-3" />
                    <span className="text-gray-700">+91 12345 67890</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-wine-700 mr-3" />
                    <a href="#" className="text-wine-700 hover:underline flex items-center">
                      www.{winery.name.toLowerCase().replace(/\s+/g, '')}.com
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-wine-700 mr-3 mt-1" />
                    <div>
                      <span className="text-gray-700 block">
                        {winery.name},<br />
                        Winery Road, {winery.location.region},<br />
                        {winery.location.country} - 422003
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-wine-900 mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                    <Button className="bg-wine-700 hover:bg-wine-800">Send Message</Button>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WineryPage;
