import { Card } from "@/components/ui/card";
import {
  Bitcoin,
  BarChart3,
  DollarSign,
  LineChart,
  Gem,
  Factory,
} from "lucide-react";

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
  return (
    <section className="py-16 bg-gray-50" id="platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            Investment Options
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our wide range of investment opportunities
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <Card
              key={option.title}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{option.description}</p>
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