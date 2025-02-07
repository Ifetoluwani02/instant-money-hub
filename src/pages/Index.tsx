import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InvestmentOptions from "@/components/InvestmentOptions";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <InvestmentOptions />
        <Testimonials />
        <Newsletter />
        <BackToTop />
      </main>
    </div>
  );
};

export default Index;