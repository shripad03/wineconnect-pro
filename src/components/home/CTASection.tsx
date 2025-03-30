
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-wine-800 to-wine-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Connect with Global Wine Buyers?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Join WineConnectPro today and showcase your wines to importers, distributors, and retailers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-wine-900 hover:bg-cream-100">
                Register as Buyer
              </Button>
            </Link>
            <Link to="/seller-register">
              <Button size="lg" variant="outline" className="border-white text-white bg-wine-900">
                Register as Seller
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
