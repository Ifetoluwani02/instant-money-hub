
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  up: boolean;
  delay?: number;
  isVisible?: boolean;
}

const StatCard = ({ label, value, icon: Icon, up, delay = 0, isVisible = true }: StatCardProps) => {
  return (
    <Card
      className={`p-4 lg:p-6 bg-[#121214] border-white/10 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
            {value}
          </h3>
        </div>
        <div className={`p-2 rounded-lg ${
          up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
