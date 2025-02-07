import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/auth");
    setLoading(false);
  };

  return (
    <div className="relative bg-white pt-24 pb-16 sm:pt-32 lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            className={`max-w-md mx-auto lg:max-w-none lg:mx-0 lg:col-start-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mt-10 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
                <span className="block">Invest in Your</span>
                <span className="block text-primary mt-2">Financial Future</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-500">
                Access global markets with our comprehensive investment platform.
                Trade cryptocurrencies, stocks, ETFs, and more with confidence.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
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
                  className="w-full sm:w-auto"
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
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-gray-50 h-[400px] sm:h-[500px] lg:h-[600px]">
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