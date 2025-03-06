
import { LucideIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

interface StatProps {
  label: string;
  value: string;
  icon: LucideIcon;
  up: boolean;
}

interface StatsGridProps {
  stats: StatProps[];
  isVisible: boolean;
}

const StatsGrid = ({ stats, isVisible }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          up={stat.up}
          delay={index * 100}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
