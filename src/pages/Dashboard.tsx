
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Import refactored components
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMobileHeader from "@/components/dashboard/DashboardMobileHeader";
import MobileOverlay from "@/components/dashboard/MobileOverlay";
import ChatButton from "@/components/dashboard/ChatButton";
import ChatPanel from "@/components/dashboard/ChatPanel";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { LoadingState, ErrorState } from "@/components/dashboard/DashboardStates";
import { useSidebarItems } from "@/components/dashboard/SidebarItems";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, profile, loading, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();
  const sidebarItems = useSidebarItems();
  
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

  // Show simplified loading state instead of spinner
  if (loading) {
    return <LoadingState />;
  }

  // Show error if no profile data
  if (!profile) {
    return <ErrorState />;
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
        <DashboardContent 
          profile={profile}
          onActionClick={handleActionClick}
        />
      </div>

      {/* Chat button and panel */}
      <ChatButton isOpen={isChatOpen} toggleChat={toggleChat} />
      <ChatPanel isOpen={isChatOpen} />
    </div>
  );
};

export default Dashboard;
