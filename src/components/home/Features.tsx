
import { QrCode, Globe, Truck, ShieldCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <QrCode className="h-12 w-12 text-wine-700" />,
      title: "AR-based Wine Labels",
      description: "Generate QR codes for interactive wine labels that enhance authenticity and brand storytelling."
    },
    {
      icon: <Globe className="h-12 w-12 text-wine-700" />,
      title: "Global Marketplace",
      description: "Connect directly with international buyers from across the globe, expanding your market reach."
    },
    {
      icon: <Truck className="h-12 w-12 text-wine-700" />,
      title: "Logistics Tracking",
      description: "End-to-end tracking of shipments with real-time updates and documentation management."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-wine-700" />,
      title: "Secure Transactions",
      description: "Integrated payment gateway with escrow option for safe and transparent transactions."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-wine-50 to-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-wine-900">Why Choose WineConnectPro?</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our B2B platform is designed specifically for wine exporters with features that streamline international trade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold text-wine-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
