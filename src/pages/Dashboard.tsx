
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { useMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const location = useLocation();
  
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

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0B] text-white justify-center items-center">
        <div className="animate-pulse">Loading...</div>
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
      {!isMobile && <Sidebar />}

      {/* Mobile menu overlay */}
      <MobileOverlay isOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Main content area */}
      <div className="flex-1">
        {/* Mobile header */}
        {isMobile && (
          <DashboardMobileHeader 
            toggleMobileMenu={toggleMobileMenu} 
            isMobileMenuOpen={isMobileMenuOpen} 
          />
        )}

        {/* Desktop header */}
        {!isMobile && <DashboardHeader />}

        {/* Main dashboard content */}
        <main className="p-4 md:p-8">
          <StatsGrid 
            balance={profile.balance} 
            earnings={profile.total_earnings} 
            deposits={profile.total_deposits} 
            withdrawals={profile.total_withdrawals} 
          />
          
          <ActionButtons />
        </main>
      </div>

      {/* Chat button and panel */}
      <ChatButton isOpen={isChatOpen} toggleChat={toggleChat} />
      <ChatPanel isOpen={isChatOpen} />
    </div>
  );
};

export default Dashboard;
