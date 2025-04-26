
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import TrendingProducts from "@/components/TrendingProducts";
import FeaturedBanner from "@/components/FeaturedBanner";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <CategorySection />
        <TrendingProducts />
        <FeaturedBanner />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
