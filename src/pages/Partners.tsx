import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Partners = () => {
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
          <h1 className="text-4xl font-bold text-secondary">Our Partners</h1>
          <p className="mt-4 text-lg text-gray-600">
            Working together to revolutionize digital finance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="p-6 bg-gray-50 rounded-lg text-center">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Partner Company #{item}
              </h3>
              <p className="text-gray-600">
                Strategic partner in digital finance solutions.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;