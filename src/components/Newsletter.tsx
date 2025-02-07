import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });

    setEmail("");
    setLoading(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest market insights and
            investment opportunities
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <Mail className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;