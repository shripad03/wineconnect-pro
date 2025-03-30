
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-wine-800 text-2xl font-serif font-bold">WineConnect</span>
            <span className="text-gold-500 text-sm ml-1">Pro</span>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-wine-700 font-medium">Home</Link>
              <Link to="/wines" className="text-foreground hover:text-wine-700 font-medium">Wines</Link>
              <Link to="/wineries" className="text-foreground hover:text-wine-700 font-medium">Wineries</Link>
              <Link to="/about" className="text-foreground hover:text-wine-700 font-medium">About</Link>
            </div>
          )}

          {/* Search bar - desktop only */}
          {!isMobile && (
            <div className="hidden md:flex relative items-center w-1/4">
              <Input 
                placeholder="Search wines..." 
                className="pl-10 pr-4 py-2 w-full rounded-full bg-muted"
              />
              <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              <Globe className="h-5 w-5 mr-2" />
              <span>EN</span>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-wine-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            <div className="relative mb-4">
              <Input 
                placeholder="Search wines..." 
                className="pl-10 pr-4 py-2 w-full rounded-full bg-muted"
              />
              <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            </div>
            <div className="space-y-3">
              <Link to="/" className="block text-foreground hover:text-wine-700 font-medium py-2" onClick={toggleMenu}>Home</Link>
              <Link to="/wines" className="block text-foreground hover:text-wine-700 font-medium py-2" onClick={toggleMenu}>Wines</Link>
              <Link to="/wineries" className="block text-foreground hover:text-wine-700 font-medium py-2" onClick={toggleMenu}>Wineries</Link>
              <Link to="/about" className="block text-foreground hover:text-wine-700 font-medium py-2" onClick={toggleMenu}>About</Link>
              <Link to="/login" className="block text-foreground hover:text-wine-700 font-medium py-2" onClick={toggleMenu}>Login / Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
