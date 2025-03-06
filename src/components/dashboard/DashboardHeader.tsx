
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  onActionClick: (action: string) => void;
  userName: string | null;
}

const DashboardHeader = ({ onActionClick, userName }: DashboardHeaderProps) => {
  return (
    <header className="hidden lg:block bg-[#121214] border-b border-white/10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {userName || 'User'}
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => onActionClick("notifications")}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          </Button>
          <Button 
            variant="destructive"
            onClick={() => onActionClick("logout")}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
