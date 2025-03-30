
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedWineries from '@/components/home/FeaturedWineries';
import FeaturedWines from '@/components/home/FeaturedWines';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Index = () => {
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
