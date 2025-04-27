
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock products data for demonstration
const products = [
  {
    id: 1,
    name: "Pro Run Ultra Shoes",
    price: 129.99,
    image: "/placeholder.svg",
    rating: 5,
    category: "Running"
  },
  {
    id: 2,
    name: "Competition Basketball",
    price: 49.99,
    image: "/placeholder.svg",
    rating: 4,
    category: "Basketball"
  },
  {
    id: 3,
    name: "Elite Tennis Racket",
    price: A199.99,
    image: "/placeholder.svg",
    rating: 5,
    category: "Tennis"
  },
  {
    id: 4,
    name: "Training Soccer Ball",
    price: 39.99,
    image: "/placeholder.svg",
    rating: 4,
    category: "Football"
  },
  {
    id: 5,
    name: "Adjustable Dumbbells",
    price: 149.99,
    image: "/placeholder.svg",
    rating: 5,
    category: "Fitness"
  },
  {
    id: 6,
    name: "Hiking Backpack",
    price: 89.99,
    image: "/placeholder.svg",
    rating: 4,
    category: "Outdoor"
  }
];

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
