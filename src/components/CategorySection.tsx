
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Running",
    image: "/placeholder.svg",
    slug: "running"
  },
  {
    id: 2,
    name: "Football",
    image: "/placeholder.svg",
    slug: "football"
  },
  {
    id: 3,
    name: "Basketball",
    image: "/placeholder.svg",
    slug: "basketball"
  },
  {
    id: 4,
    name: "Tennis",
    image: "/placeholder.svg",
    slug: "tennis"
  },
  {
    id: 5,
    name: "Fitness",
    image: "/placeholder.svg",
    slug: "fitness"
  },
  {
    id: 6,
    name: "Outdoor",
    image: "/placeholder.svg",
    slug: "outdoor"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end justify-center p-4">
                  <h3 className="text-white font-medium text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
