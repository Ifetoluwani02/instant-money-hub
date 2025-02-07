import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InvestmentOptions from "@/components/InvestmentOptions";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <InvestmentOptions />
      </main>
    </div>
  );
};

export default Index;