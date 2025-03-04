
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  const navItems = [
    { name: "Platform", href: "#platform" },
    { name: "About", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Insights", href: "/insights" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-secondary">
                Instant Share Finance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
            {loading ? (
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="ml-4"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    navigate("/auth");
                    window.scrollTo(0, 0);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary transition-colors"
              aria-expanded="false"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
          {loading ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded mx-3 mt-4"></div>
          ) : user ? (
            <Button 
              className="w-full bg-primary hover:bg-primary/90 mt-4"
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex flex-col space-y-2 px-3 pt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  navigate("/auth");
                  setIsOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
