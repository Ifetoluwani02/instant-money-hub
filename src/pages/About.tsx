import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
          <h1 className="text-4xl font-bold text-secondary">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Leading the future of digital finance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-secondary mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide accessible, secure, and innovative financial solutions for everyone.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-secondary mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most trusted platform for digital investments.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-secondary mb-3">Our Values</h3>
            <p className="text-gray-600">
              Security, Innovation, Transparency, and Customer Focus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;