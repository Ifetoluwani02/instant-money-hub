
import { ReactNode } from "react";
import { CircleDollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { UserProfile } from "@/types/user";

interface DashboardStatsProps {
  profile: UserProfile | null;
}

const DashboardStats = ({ profile }: DashboardStatsProps) => {
  // Define stats with icons
  const stats = [
    { 
      label: "Current Balance", 
      value: profile?.balance ? `$${profile.balance.toFixed(2)}` : "$0.00", 
      icon: CircleDollarSign, 
      up: true 
    },
    { 
      label: "Total Earnings", 
      value: profile?.total_earnings ? `$${profile.total_earnings.toFixed(2)}` : "$0.00", 
      icon: ArrowUpRight, 
      up: true 
    },
    { 
      label: "Total Deposits", 
      value: profile?.total_deposits ? `$${profile.total_deposits.toFixed(2)}` : "$0.00", 
      icon: ArrowUpRight, 
      up: true 
    },
    { 
      label: "Total Withdrawals", 
      value: profile?.total_withdrawals ? `$${profile.total_withdrawals.toFixed(2)}` : "$0.00", 
      icon: ArrowDownRight, 
      up: false 
    },
  ];

  return (
    <StatsGrid 
      stats={stats}
      isVisible={true}
    />
  );
};

export default DashboardStats;
