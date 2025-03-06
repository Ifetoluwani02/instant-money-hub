import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-white pt-24 pb-16 sm:pt-32 lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md mx-auto lg:max-w-none lg:mx-0 lg:col-start-1">
            <div className="mt-20 lg:mt-24">
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="block">Invest in Your</span>
                <span className="block text-primary">Financial Future</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Access global markets with our comprehensive investment platform.
                Trade cryptocurrencies, stocks, ETFs, and more with confidence.
              </p>
              <div className="mt-10 flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:m-0 lg:relative">
            <div className="max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-gray-50 h-[600px] animate-fadeIn">
                  {/* Placeholder for investment chart/graph */}
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