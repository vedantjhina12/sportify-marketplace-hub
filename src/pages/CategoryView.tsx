
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { FilterIcon, SlidersHorizontal } from "lucide-react";

// Mock products data for demonstration
const products = {
  running: [
    {
      id: 1,
      name: "Pro Run Ultra Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      rating: 5,
      category: "Running"
    },
    {
      id: 7,
      name: "Performance Running Shorts",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4",
      rating: 4,
      category: "Running"
    }
  ],
  football: [
    {
      id: 4,
      name: "Training Soccer Ball",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      rating: 4,
      category: "Football"
    },
    {
      id: 9,
      name: "Professional Football Cleats",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1511886929837-354d827aae26",
      rating: 5,
      category: "Football"
    }
  ],
  basketball: [
    {
      id: 2,
      name: "Competition Basketball",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
      rating: 4,
      category: "Basketball"
    },
    {
      id: 10,
      name: "Basketball Jersey",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      rating: 4,
      category: "Basketball"
    }
  ],
  tennis: [
    {
      id: 3,
      name: "Elite Tennis Racket",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1617083934551-ea81e8c49ab4",
      rating: 5,
      category: "Tennis"
    },
    {
      id: 11,
      name: "Tennis Ball Set",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1519341510417-86e0d1c32a4d",
      rating: 4,
      category: "Tennis"
    }
  ],
  fitness: [
    {
      id: 5,
      name: "Adjustable Dumbbells",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1638536532686-d610adcd5e67",
      rating: 5,
      category: "Fitness"
    },
    {
      id: 8,
      name: "Waterproof Fitness Tracker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1557166983-5939644582c8",
      rating: 5,
      category: "Fitness"
    }
  ],
  outdoor: [
    {
      id: 6,
      name: "Hiking Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1622260614153-03223fbf3c9d",
      rating: 4,
      category: "Outdoor"
    },
    {
      id: 12,
      name: "Camping Tent",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1464822759563-404ec5c05498",
      rating: 4,
      category: "Outdoor"
    }
  ]
};

const CategoryView = () => {
  const { category } = useParams();
  const categoryProducts = category ? products[category as keyof typeof products] : [];
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{categoryTitle} Products</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Sort
              </Button>
            </div>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium text-gray-600">No products found</h2>
              <p className="text-gray-500 mt-2">Try searching for a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryView;
