
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Truck, Star, Package, ZoomIn, ZoomOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Mock product data
const productData = {
  id: 1,
  name: "Pro Run Ultra Shoes",
  price: 129.99,
  description: "Experience ultimate comfort and performance with our Pro Run Ultra Shoes. Designed for serious runners who demand the best in cushioning, support, and durability.",
  rating: 4.5,
  reviews: 124,
  category: "Running",
  brand: "Sportify",
  colors: ["Black", "Blue", "Red"],
  sizes: ["7", "8", "9", "10", "11", "12"],
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
  ],
  features: [
    "Responsive cushioning for maximum energy return",
    "Breathable mesh upper keeps feet cool",
    "Durable rubber outsole for excellent traction",
    "Ergonomic design reduces strain during long runs",
    "Reflective elements for visibility in low light"
  ],
  specifications: {
    Weight: "10.2 oz (size 9)",
    Material: "Synthetic mesh, rubber outsole",
    Support: "Neutral",
    Heel_Drop: "10mm",
    Arch_Type: "Medium",
    Recommended_For: "Road running, training"
  }
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // States
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Handle Add to Cart
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${productData.name} (${selectedColor}, Size ${selectedSize}) x ${quantity} has been added to your cart.`,
    });
  };
  
  // Handle Buy Now
  const handleBuyNow = () => {
    // In a real app, this would add to cart and redirect to checkout
    handleAddToCart();
    // Navigate to checkout
    window.location.href = "/checkout";
  };
  
  // Handle Add to Wishlist
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${productData.name} has been removed from your wishlist` : `${productData.name} has been added to your wishlist`,
    });
  };

  // Handle zoom in/out
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(isZoomed ? 1 : 2.5);
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Calculate relative position inside the container (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    // Calculate the position of the zoomed image
    // This moves the image in the opposite direction of the mouse
    const x = (0.5 - relativeX) * 100;
    const y = (0.5 - relativeY) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Product Images */}
            <div>
              <div 
                className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative cursor-zoom-in"
                style={{ height: "500px" }}
                onClick={toggleZoom}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  if (isZoomed) toggleZoom();
                }}
              >
                <div 
                  className="w-full h-full transition-transform duration-200"
                  style={{ 
                    backgroundImage: `url(${productData.images[activeImage]})`,
                    backgroundPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
                    backgroundSize: isZoomed ? `${zoomLevel * 100}%` : 'contain',
                    backgroundRepeat: 'no-repeat',
                    transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)'
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md">
                  {isZoomed ? (
                    <ZoomOut className="h-5 w-5 text-gray-700" />
                  ) : (
                    <ZoomIn className="h-5 w-5 text-gray-700" />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {productData.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`border rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-sport-blue' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">{productData.brand}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{productData.category}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(productData.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : i < productData.rating 
                            ? "text-yellow-400 fill-yellow-400 opacity-50" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{productData.reviews} reviews</span>
                </div>
                
                <p className="text-2xl font-bold text-sport-blue mb-4">${productData.price.toFixed(2)}</p>
                
                <p className="text-gray-600 mb-6">{productData.description}</p>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
                <div className="flex gap-2">
                  {productData.colors.map(color => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color ? 'border-sport-blue' : 'border-transparent'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase(), 
                        boxShadow: selectedColor === color ? '0 0 0 2px rgba(14, 165, 233, 0.3)' : 'none' 
                      }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size: <span className="font-normal text-gray-600">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map(size => (
                    <button
                      key={size}
                      className={`w-12 h-10 rounded-md border flex items-center justify-center text-sm ${
                        selectedSize === size 
                          ? 'bg-sport-blue text-white border-sport-blue' 
                          : 'bg-white text-gray-800 border-gray-300 hover:border-sport-blue'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Quantity:</h3>
                <div className="flex h-10 w-32">
                  <button 
                    className="w-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <span className="flex-grow border-t border-b border-gray-300 flex items-center justify-center">
                    {quantity}
                  </span>
                  <button 
                    className="w-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-sport-blue text-sport-blue hover:bg-sport-blue hover:text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                
                <Button 
                  className="flex-1 bg-sport-blue hover:bg-blue-600"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`p-3 ${isWishlisted ? 'text-sport-red' : 'text-gray-600'}`}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-sport-red' : ''}`} />
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-sport-blue" /> 
                Free shipping on orders over $50
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent">
              <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sport-blue data-[state=active]:bg-transparent">
                Features
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sport-blue data-[state=active]:bg-transparent">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sport-blue data-[state=active]:bg-transparent">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="py-6">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Package className="h-5 w-5 mt-1 text-sport-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="py-6">
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(productData.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 border-b font-medium">{key.replace('_', ' ')}</td>
                        <td className="py-3 px-4 border-b">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="py-6">
              <h3 className="text-xl font-bold mb-4">Shipping & Returns</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Shipping Policy</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Free standard shipping on orders over $50</li>
                    <li>Standard shipping (5-7 business days): $4.99</li>
                    <li>Express shipping (2-3 business days): $9.99</li>
                    <li>Next-day shipping (order before 2pm): $19.99</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Return Policy</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>30-day return policy for unworn and unused items</li>
                    <li>Free returns on all orders</li>
                    <li>Items must be in original packaging with tags attached</li>
                    <li>Refunds will be processed within 10-14 business days</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
