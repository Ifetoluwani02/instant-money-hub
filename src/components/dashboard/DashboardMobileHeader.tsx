
import { Button } from "@/components/ui/button";
import { Menu, X, Bell } from "lucide-react";

interface DashboardMobileHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onActionClick: (action: string) => void;
}

const DashboardMobileHeader = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  onActionClick 
}: DashboardMobileHeaderProps) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#121214] border-b border-white/10 p-4">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <h2 className="text-lg font-bold text-white">Financial Dashboard</h2>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => onActionClick("notifications")}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardMobileHeader;
