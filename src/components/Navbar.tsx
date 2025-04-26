
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, LogIn, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isSeller, setIsSeller] = useState(false); // For demo purposes
  const [cartCount, setCartCount] = useState(2); // Mock cart count
  const [wishlistCount, setWishlistCount] = useState(3); // Mock wishlist count

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
    
    // For demo, assume user is also a seller
    setIsSeller(loginStatus === "true");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const categoryLinks = [
    { name: "Running", path: "/category/running" },
    { name: "Football", path: "/category/football" },
    { name: "Basketball", path: "/category/basketball" },
    { name: "Tennis", path: "/category/tennis" },
    { name: "Fitness", path: "/category/fitness" },
    { name: "Outdoor", path: "/category/outdoor" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-sport-blue">Sportify</span>
          </Link>

          {/* Search - Hidden on mobile */}
          {!isMobile && (
            <div className="relative w-1/3 mx-4">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="pl-8 pr-4 py-2 w-full rounded-md border border-gray-200" 
              />
            </div>
          )}

          {/* Nav Links for Desktop */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {categoryLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-sm font-medium text-gray-600 hover:text-sport-blue transition-colors" 
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button onClick={toggleMenu} className="md:hidden">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            )}
            
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 relative">
              <Heart className="h-5 w-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {isSeller && (
                  <Link to="/seller-dashboard" className="p-2 rounded-full hover:bg-gray-100">
                    <Package className="h-5 w-5 text-gray-600" />
                  </Link>
                )}
                <Link to="/user-dashboard" className="p-2 rounded-full hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <nav className="bg-white border-t md:hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="relative w-full mb-4">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="pl-8 pr-4 py-2 w-full rounded-md border border-gray-200" 
              />
            </div>
            
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="block py-2 text-sm font-medium text-gray-600 hover:text-sport-blue"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              
              {isLoggedIn && (
                <>
                  <li>
                    <Link 
                      to="/user-dashboard"
                      className="block py-2 text-sm font-medium text-gray-600 hover:text-sport-blue"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  </li>
                  {isSeller && (
                    <li>
                      <Link 
                        to="/seller-dashboard"
                        className="block py-2 text-sm font-medium text-gray-600 hover:text-sport-blue"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Seller Dashboard
                      </Link>
                    </li>
                  )}
                </>
              )}
              
              <li>
                <Link 
                  to="/order-tracking"
                  className="block py-2 text-sm font-medium text-gray-600 hover:text-sport-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
