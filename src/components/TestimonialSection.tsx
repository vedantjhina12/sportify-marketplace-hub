
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Professional Runner",
    image: "/placeholder.svg",
    rating: 5,
    testimonial: "The quality of running gear from Sportify has been instrumental in my training. The shoes provide incredible support and comfort during long runs."
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Fitness Instructor",
    image: "/placeholder.svg",
    rating: 5,
    testimonial: "I recommend Sportify equipment to all my clients. The durability and performance of their products is unmatched in the fitness industry."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Basketball Coach",
    image: "/placeholder.svg",
    rating: 4,
    testimonial: "My team has been using Sportify basketballs for the past season, and the consistent performance has helped improve our practice sessions significantly."
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-sport-lightgray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic flex-grow">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
