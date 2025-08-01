
import Navbar from "@/components/landingPage/Navbar";
import Hero from "@/components/landingPage/Hero";
import ProductSection  from "@/components/landingPage/ProductSection";
import BlogSection  from "@/components/landingPage/PlatformSection";
import ContactSection  from "@/components/landingPage/ContactSection";
import Footer  from "@/components/landingPage/Footer";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Navbar />
   
      <Hero />
      <ProductSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
