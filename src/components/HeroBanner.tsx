import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-sport-black to-gray-800 text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Gear Up for <span className="text-sport-blue">Greatness</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-lg">
              Discover premium sports equipment that helps you perform at your best. 
              Shop our latest collection of professional-grade gear.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-sport-blue hover:bg-blue-600 text-white">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/new-arrivals">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-sport-black">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative max-w-md mx-auto md:ml-auto md:mr-0">
              <div className="relative z-10">
                <img 
                  src="/placeholder.svg" 
                  alt="Sports Equipment" 
                  className="rounded-lg shadow-xl"
                  width="600"
                  height="400"
                />
              </div>
              <div className="absolute top-0 right-0 w-full h-full transform translate-x-4 translate-y-4 rounded-lg bg-sport-blue opacity-20 -z-0"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 hero-pattern transform rotate-12 translate-x-1/4"></div>
    </section>
  );
};

export default HeroBanner;
