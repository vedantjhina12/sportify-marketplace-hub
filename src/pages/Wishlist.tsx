
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock wishlist data for demonstration
interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

const Wishlist = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 3,
      name: "Elite Tennis Racket",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1617083934551-ea81e8c49ab4",
      category: "Tennis",
      available: true
    },
    {
      id: 6,
      name: "Hiking Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1622260614153-03223fbf3c9d",
      category: "Outdoor",
      available: true
    },
    {
      id: 8,
      name: "Waterproof Fitness Tracker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1557166983-5939644582c8",
      category: "Fitness",
      available: false
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };

  const addToCart = (item: WishlistItem) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Save your favorite items to come back to them later.</p>
              <Link to="/">
                <Button className="bg-sport-blue hover:bg-sport-blue/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <Link to={`/product/${item.id}`}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-64 object-cover"
                      />
                    </Link>
                    <button 
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-red-500"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium text-gray-800 mb-1 truncate">{item.name}</h3>
                    </Link>
                    <p className="text-lg font-bold text-sport-blue mb-2">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                    
                    {item.available ? (
                      <Button 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                      </Button>
                    ) : (
                      <Button disabled className="w-full bg-gray-300">
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
