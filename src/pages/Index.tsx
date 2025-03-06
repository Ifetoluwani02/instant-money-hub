
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InvestmentOptions from "@/components/InvestmentOptions";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import BackToTop from "@/components/BackToTop";
import WelcomePrompt from "@/components/WelcomePrompt";

const Index = () => {
  const [userName, setUserName] = useState<string>("");

  // Load saved name from localStorage on initial render
  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handlePromptSubmit = (name: string) => {
    setUserName(name);
  };

  return (
    <div className="min-h-screen bg-white">
      <WelcomePrompt onSubmit={handlePromptSubmit} />
      <Navbar />
      <main>
        <Hero userName={userName} />
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
