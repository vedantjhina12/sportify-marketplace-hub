
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedBanner = () => {
  return (
    <section className="py-16 bg-sport-blue text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Edition Athletic Collection</h2>
            <p className="text-lg mb-6 text-blue-100">
              Elevate your performance with our limited edition professional-grade gear designed for champions.
            </p>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Advanced moisture-wicking technology
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Competition-grade materials
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Endorsed by professional athletes
              </li>
            </ul>
            <Link to="/special-collection">
              <Button size="lg" className="bg-white text-sport-blue hover:bg-blue-50">
                Shop The Collection
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/placeholder.svg" 
                alt="Athletic Collection" 
                className="rounded-lg shadow-xl object-cover w-full aspect-[4/3]"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full transform -translate-x-4 -translate-y-4 rounded-lg bg-blue-300 opacity-50 -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
