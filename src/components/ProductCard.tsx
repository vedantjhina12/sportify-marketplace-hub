
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const ProductCard = ({ id, name, price, image, rating, category }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${name} has been removed from your wishlist` : `${name} has been added to your wishlist`,
      duration: 2000,
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
      duration: 2000,
    });
  };

  // Generate stars for rating
  const stars = Array(5).fill(0).map((_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
  ));

  return (
    <Link to={`/product/${id}`} className="group product-card">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300"
          />
          
          {/* Category Tag */}
          <span className="absolute top-2 left-2 bg-sport-black/75 text-white text-xs px-2 py-1 rounded-md">
            {category}
          </span>
          
          {/* Quick Actions */}
          <div className="absolute top-2 right-2">
            <button 
              className={`p-2 rounded-full ${isWishlisted ? 'bg-sport-red text-white' : 'bg-white/80 hover:bg-white'} transition-colors`}
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex">{stars}</div>
          </div>
          
          <h3 className="font-medium text-gray-800 mb-1 truncate">{name}</h3>
          <p className="text-lg font-bold text-sport-blue">${price.toFixed(2)}</p>
          
          <Button 
            variant="outline" 
            className="w-full mt-3 border-sport-blue text-sport-blue hover:bg-sport-blue hover:text-white flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
