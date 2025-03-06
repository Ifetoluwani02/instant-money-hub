
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  userName?: string;
}

const Hero = ({ userName }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Navigate to auth page with signup mode pre-selected
    navigate("/auth?mode=signup");
    setLoading(false);
  };

  const getPersonalizedGreeting = () => {
    if (userName) {
      return (
        <>
          <span className="block mb-2">Welcome back, {userName}!</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Invest in Your Financial Future</span>
        </>
      );
    }
    
    return (
      <>
        <span className="block mb-2">Invest in Your</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Financial Future</span>
      </>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-24 pb-16 sm:pt-32 lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            className={`max-w-md mx-auto lg:max-w-none lg:mx-0 lg:col-start-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mt-10 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
                {getPersonalizedGreeting()}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                Access global markets with our comprehensive investment platform.
                Trade cryptocurrencies, stocks, ETFs, and more with confidence.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  onClick={handleGetStarted}
                  disabled={loading}
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto hover:bg-secondary/5 transition-all duration-300"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`mt-12 lg:m-0 lg:relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white">
                <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 h-[400px] sm:h-[500px] lg:h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
