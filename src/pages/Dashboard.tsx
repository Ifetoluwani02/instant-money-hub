
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Wallet, 
  CircleDollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Home,
  History,
  Users,
  Settings,
  HelpCircle
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMobileHeader from "@/components/dashboard/DashboardMobileHeader";
import MobileOverlay from "@/components/dashboard/MobileOverlay";
import ActionButtons from "@/components/dashboard/ActionButtons";
import ChatButton from "@/components/dashboard/ChatButton";
import ChatPanel from "@/components/dashboard/ChatPanel";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, profile, loading, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Handle action button clicks
  const handleActionClick = (action: string) => {
    switch (action) {
      case "deposit":
        toast({
          title: "Deposit",
          description: "Please contact support to make a deposit",
        });
        toggleChat();
        break;
      case "withdraw":
        toast({
          title: "Withdraw",
          description: "Please contact support to request a withdrawal",
        });
        toggleChat();
        break;
      case "transfer":
        toast({
          title: "Transfer",
          description: "Transfer feature coming soon",
        });
        break;
      case "notifications":
        toast({
          title: "Notifications",
          description: "You have no new notifications",
        });
        break;
      case "Logout":
        logout();
        break;
      default:
        break;
    }
  };
  
  // Check if we should open chat from navigation state
  useEffect(() => {
    if (location.state?.openChat) {
      setIsChatOpen(true);
      // Clear the state to avoid reopening on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Define sidebar items
  const sidebarItems = [
    { icon: <Home className="w-5 h-5 mr-3" />, label: "Dashboard" },
    { icon: <Wallet className="w-5 h-5 mr-3" />, label: "Wallet" },
    { icon: <History className="w-5 h-5 mr-3" />, label: "History" },
    { icon: <Users className="w-5 h-5 mr-3" />, label: "Users" },
    { icon: <Settings className="w-5 h-5 mr-3" />, label: "Settings" },
    { icon: <HelpCircle className="w-5 h-5 mr-3" />, label: "Support" },
  ];

  // Define action buttons
  const actionButtons = [
    { label: "Make a Deposit", action: "deposit" },
    { label: "Withdraw Funds", action: "withdraw" },
    { label: "Transfer Money", action: "transfer" },
  ];

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

  // Show simplified loading state instead of spinner
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0B] text-white justify-center items-center">
        <div className="text-lg">Loading your dashboard...</div>
      </div>
    );
  }

  // Show error if no profile data
  if (!profile) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0B] text-white justify-center items-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Profile not found</h1>
          <p className="text-gray-400">There was an error loading your profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white">
      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar 
        items={sidebarItems} 
        onItemClick={handleActionClick}
      />}

      {/* Mobile menu overlay */}
      <MobileOverlay 
        isVisible={isMobileMenuOpen} 
        onClose={toggleMobileMenu} 
      />

      {/* Main content area */}
      <div className="flex-1">
        {/* Mobile header */}
        {isMobile && (
          <DashboardMobileHeader 
            isSidebarOpen={isMobileMenuOpen}
            toggleSidebar={toggleMobileMenu}
            onActionClick={handleActionClick}
          />
        )}

        {/* Desktop header */}
        {!isMobile && <DashboardHeader 
          onActionClick={handleActionClick}
          userName={profile?.full_name || (user?.email ? user.email.split('@')[0] : "User")}
        />}

        {/* Main dashboard content */}
        <main className="p-4 md:p-8">
          <StatsGrid 
            stats={stats}
            isVisible={true}
          />
          
          <ActionButtons 
            buttons={actionButtons}
            onActionClick={handleActionClick}
          />
        </main>
      </div>

      {/* Chat button and panel */}
      <ChatButton isOpen={isChatOpen} toggleChat={toggleChat} />
      <ChatPanel isOpen={isChatOpen} />
    </div>
  );
};

export default Dashboard;
