import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Insights = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary">Market Insights</h1>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed with our latest market analysis and trends
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  Market Analysis #{item}
                </h3>
                <p className="text-gray-600 mb-4">
                  Latest insights about market trends and investment opportunities.
                </p>
                <Button className="w-full">Read More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;