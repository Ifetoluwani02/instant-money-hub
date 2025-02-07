import { Card } from "@/components/ui/card";
import {
  Bitcoin,
  BarChart3,
  DollarSign,
  LineChart,
  Gem,
  Factory,
} from "lucide-react";
import { useState } from "react";

const options = [
  {
    title: "Cryptocurrencies",
    description: "Trade popular cryptocurrencies with ease",
    icon: Bitcoin,
  },
  {
    title: "Crypto Indices",
    description: "Diversified crypto investment portfolios",
    icon: BarChart3,
  },
  {
    title: "Stocks",
    description: "Access global stock markets",
    icon: DollarSign,
  },
  {
    title: "ETFs",
    description: "Diversified investment funds",
    icon: LineChart,
  },
  {
    title: "Metals",
    description: "Trade precious metals securely",
    icon: Gem,
  },
  {
    title: "Commodities",
    description: "Access raw materials markets",
    icon: Factory,
  },
];

const InvestmentOptions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100" id="platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl mb-6">
            Investment Options
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover our comprehensive range of investment opportunities designed to help you achieve your financial goals
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option, index) => (
            <Card
              key={option.title}
              className={`p-8 transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm border-gray-200/50 ${
                hoveredIndex === index
                  ? "shadow-xl transform -translate-y-1"
                  : "hover:shadow-lg"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl transition-colors duration-300 ${
                  hoveredIndex === index 
                    ? "bg-primary/10" 
                    : "bg-gray-100"
                }`}>
                  <option.icon className={`h-8 w-8 transition-colors duration-300 ${
                    hoveredIndex === index 
                      ? "text-primary" 
                      : "text-gray-700"
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{option.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOptions;