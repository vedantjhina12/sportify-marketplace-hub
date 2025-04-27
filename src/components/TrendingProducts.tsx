
import { useState } from "react";
import ProductCard from "./ProductCard";

// Update existing product data with new images
const products = [
  {
    id: 1,
    name: "Pro Run Ultra Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: 5,
    category: "Running"
  },
  {
    id: 2,
    name: "Competition Basketball",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    rating: 4,
    category: "Basketball"
  },
  {
    id: 3,
    name: "Elite Tennis Racket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1617083934551-ea81e8c49ab4",
    rating: 5,
    category: "Tennis"
  },
  {
    id: 4,
    name: "Training Soccer Ball",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    rating: 4,
    category: "Football"
  },
  {
    id: 5,
    name: "Adjustable Dumbbells",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1638536532686-d610adcd5e67",
    rating: 5,
    category: "Fitness"
  },
  {
    id: 6,
    name: "Hiking Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1622260614153-03223fbf3c9d",
    rating: 4,
    category: "Outdoor"
  },
  {
    id: 7,
    name: "Performance Running Shorts",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4",
    rating: 4,
    category: "Running"
  },
  {
    id: 8,
    name: "Waterproof Fitness Tracker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1557166983-5939644582c8",
    rating: 5,
    category: "Fitness"
  }
];

const TrendingProducts = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Running", "Basketball", "Tennis", "Football", "Fitness", "Outdoor"];

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold mb-6 md:mb-0">Trending Products</h2>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeFilter === filter 
                    ? "bg-sport-blue text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-colors`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
