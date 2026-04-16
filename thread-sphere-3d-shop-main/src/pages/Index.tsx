import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionSection from "@/components/CollectionSection";
import AboutSection from "@/components/AboutSection";
import FabricQuality from "@/components/FabricQuality";
import StoreLocator from "@/components/StoreLocator";
import CustomerReviews from "@/components/CustomerReviews";
import ContactFooter from "@/components/ContactFooter";
import CartSidebar from "@/components/CartSidebar";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <CartSidebar />
    <HeroSection />
    <FeaturedProducts />
    <CollectionSection />
    <AboutSection />
    <FabricQuality />
    <StoreLocator />
    <CustomerReviews />
    <ContactFooter />
  </div>
);

export default Index;
