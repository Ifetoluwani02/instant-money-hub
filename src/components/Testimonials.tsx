import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Investment Manager",
    content:
      "The platform's intuitive interface and comprehensive tools have revolutionized how I manage my investments. Exceptional service!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Day Trader",
    content:
      "Real-time analytics and market insights have given me a competitive edge. Best investment platform I've used.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Financial Advisor",
    content:
      "My clients love the transparency and ease of use. The customer support team is always helpful and responsive.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied investors who trust our platform
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`p-6 transition-all duration-300 ${
                hoveredIndex === index
                  ? "shadow-xl transform -translate-y-1"
                  : "hover:shadow-lg"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-secondary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;