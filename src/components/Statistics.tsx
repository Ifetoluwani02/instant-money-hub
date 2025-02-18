import { Users, TrendingUp, Award, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
    },
    {
      icon: TrendingUp,
      value: "$2B+",
      label: "Assets Managed",
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Success Rate",
    },
    {
      icon: Globe2,
      value: "24/7",
      label: "Global Support",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center transition-all duration-700 delay-${
                index * 100
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-primary/5 p-4 rounded-2xl mb-6">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/80">
                {stat.value}
              </div>
              <div className="text-gray-600 text-center font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;