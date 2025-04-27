
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const newArrivals = [
  {
    id: 7,
    name: "Performance Running Shorts",
    price: 34.99,
    image: "/placeholder.svg",
    rating: 4,
    category: "Running"
  },
  {
    id: 8,
    name: "Waterproof Fitness Tracker",
    price: 79.99,
    image: "/placeholder.svg",
    rating: 5,
    category: "Fitness"
  },
  {
    id: 9,
    name: "Professional Football Cleats",
    price: 89.99,
    image: "/placeholder.svg",
    rating: 5,
    category: "Football"
  }
];

const NewArrivals = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;
