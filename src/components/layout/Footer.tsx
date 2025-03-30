
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wine-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">WineConnect<span className="text-gold-400">Pro</span></h3>
            <p className="text-gray-300 text-sm">
              Connecting Nashik wine exporters with global buyers through our B2B marketplace platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/wines" className="text-gray-300 hover:text-white">Wines</Link></li>
              <li><Link to="/wineries" className="text-gray-300 hover:text-white">Wineries</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-300 hover:text-white">Register as Buyer</Link></li>
              <li><Link to="/seller-register" className="text-gray-300 hover:text-white">Register as Seller</Link></li>
              <li><Link to="/logistics" className="text-gray-300 hover:text-white">Logistics</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300 text-sm">
              <p>Wine Connect</p>
              <p>Nashik, Maharashtra</p>
              <p>India - 422003</p>
              <p className="mt-2">Email: info@wineconnect.pro</p>
              <p>Phone: +91 98230 00000</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-wine-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} WineConnectPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
