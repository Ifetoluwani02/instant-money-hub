
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  History,
  UserCircle,
  HelpCircle,
  MessageCircle,
  Bell,
  Menu,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import StatCard from "@/components/dashboard/StatCard";
import TransactionList from "@/components/dashboard/TransactionList";
import Sidebar from "@/components/dashboard/Sidebar";
import ActionDialog from "@/components/dashboard/ActionDialog";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user, profile, transactions, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
    setIsVisible(true);
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const handleAction = (action: string) => {
    if (action === "manage-users" && profile?.is_admin) {
      navigate("/users");
      return;
    }
    setSelectedAction(action);
  };

  const handleCloseDialog = () => {
    setSelectedAction(null);
    setAmount("");
    setSelectedPlan(null);
  };

  const handleConfirmAction = () => {
    if (!amount && ["deposit", "withdraw", "plans"].includes(selectedAction || "")) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Action Submitted",
      description: "Your request has been submitted and is being processed",
    });
    
    handleCloseDialog();
  };

  const sidebarItems = [
    { icon: <LayoutDashboard className="w-5 h-5 mr-3" />, label: "Dashboard" },
    { icon: <Wallet className="w-5 h-5 mr-3" />, label: "Wallet" },
    { icon: <History className="w-5 h-5 mr-3" />, label: "History" },
    { icon: <UserCircle className="w-5 h-5 mr-3" />, label: "Profile" },
    { icon: <HelpCircle className="w-5 h-5 mr-3" />, label: "Support" },
  ];

  const stats = profile?.is_admin ? [
    { label: "Total Balance", value: "$0", icon: Wallet, up: true },
    { label: "Total Users", value: "0", icon: Users, up: true },
    { label: "Monthly Growth", value: "0%", icon: ArrowUpRight, up: true },
    { label: "Pending Withdrawals", value: "0", icon: ArrowDownRight, up: false },
  ] : [
    { label: "Account Balance", value: `$${profile?.balance || 0}`, icon: Wallet, up: true },
    { label: "Total Earnings", value: `$${profile?.total_earnings || 0}`, icon: ArrowUpRight, up: true },
    { label: "Total Deposits", value: `$${profile?.total_deposits || 0}`, icon: ArrowUpRight, up: true },
    { label: "Total Withdrawals", value: `$${profile?.total_withdrawals || 0}`, icon: ArrowDownRight, up: false },
  ];

  const actionButtons = profile?.is_admin ? [
    { label: "Manage Users", action: "manage-users" },
    { label: "Approve Withdrawals", action: "approve-withdrawals" },
    { label: "Update Plans", action: "update-plans" },
  ] : [
    { label: "Deposit Funds", action: "deposit" },
    { label: "Withdraw", action: "withdraw" },
    { label: "Investment Plans", action: "plans" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] relative">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#121214] border-b border-white/10 p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h2 className="text-lg font-bold text-white">Financial Dashboard</h2>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => handleAction("notifications")}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          </Button>
        </div>
      </div>

      <Sidebar
        items={sidebarItems}
        onItemClick={(label) => {
          handleAction(label);
          if (isMobile) setIsSidebarOpen(false);
        }}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
      />

      <main className={`transition-all duration-300 ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <header className="hidden lg:block bg-[#121214] border-b border-white/10 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {profile.full_name || 'User'}
            </h1>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => handleAction("notifications")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
            </Button>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6 mt-16 lg:mt-0">
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

          <Card className="p-4 lg:p-6 bg-[#121214] border-white/10 overflow-x-auto">
            <TransactionList
              transactions={transactions}
              onViewAll={() => navigate("/history")}
            />
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {actionButtons.map((action) => (
              <Button
                key={action.label}
                className="bg-[#121214] border border-white/10 hover:bg-white/5"
                onClick={() => handleAction(action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </main>

      <ActionDialog
        isOpen={!!selectedAction}
        action={selectedAction}
        amount={amount}
        selectedPlan={selectedPlan}
        plans={[]}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        onAmountChange={setAmount}
        onPlanSelect={setSelectedPlan}
      />

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
