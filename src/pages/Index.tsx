
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedWineries from '@/components/home/FeaturedWineries';
import FeaturedWines from '@/components/home/FeaturedWines';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import { useQuery } from '@tanstack/react-query';
import { wineApi, wineryApi } from '@/services/api';

const Index = () => {
  // Pre-fetch wines and wineries data for the home page
  const { isLoading: isLoadingWines } = useQuery({
    queryKey: ['wines'],
    queryFn: wineApi.getAll,
  });

  const { isLoading: isLoadingWineries } = useQuery({
    queryKey: ['wineries', 'featured'],
    queryFn: wineryApi.getFeatured,
  });

  // We'll let the individual components handle loading states
  return (
    <Layout>
      <Hero />
      <FeaturedWineries />
      <FeaturedWines />
      <Features />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
