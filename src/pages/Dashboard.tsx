
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
  ChevronRight,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual data from your backend
const mockUser = {
  isAdmin: true,
  name: "John Doe",
  balance: 250000,
  earnings: 15000,
  deposits: 100000,
  withdrawals: 5000,
};

const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 5000,
    status: "completed",
    date: "2024-02-20",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 2000,
    status: "pending",
    date: "2024-02-19",
  },
];

const mockInvestmentPlans = [
  { id: 1, name: "Starter", minAmount: 1000, roi: "10%" },
  { id: 2, name: "Growth", minAmount: 5000, roi: "15%" },
  { id: 3, name: "Premium", minAmount: 10000, roi: "20%" },
];

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAction = (action: string) => {
    setSelectedAction(action);
  };

  const handleCloseDialog = () => {
    setSelectedAction(null);
    setAmount("");
    setSelectedPlan(null);
  };

  const handleConfirmAction = () => {
    switch (selectedAction) {
      case "deposit":
        if (!amount) {
          toast({
            title: "Error",
            description: "Please enter an amount",
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Deposit Successful",
          description: `$${amount} has been added to your account`,
        });
        break;

      case "withdraw":
        if (!amount) {
          toast({
            title: "Error",
            description: "Please enter an amount",
            variant: "destructive",
          });
          return;
        }
        if (Number(amount) > mockUser.balance) {
          toast({
            title: "Error",
            description: "Insufficient funds",
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Withdrawal Request Submitted",
          description: `Your withdrawal request for $${amount} is being processed`,
        });
        break;

      case "plans":
        if (!selectedPlan) {
          toast({
            title: "Error",
            description: "Please select an investment plan",
            variant: "destructive",
          });
          return;
        }
        const plan = mockInvestmentPlans.find(p => p.id === selectedPlan);
        if (Number(amount) < (plan?.minAmount || 0)) {
          toast({
            title: "Error",
            description: `Minimum investment for this plan is $${plan?.minAmount}`,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Investment Successful",
          description: `You have invested $${amount} in the ${plan?.name} plan`,
        });
        break;

      case "manage-users":
        // Admin action for managing users
        toast({
          title: "User Management",
          description: "Opening user management dashboard...",
        });
        break;

      case "approve-withdrawals":
        // Admin action for approving withdrawals
        toast({
          title: "Pending Withdrawals",
          description: "Loading withdrawal requests...",
        });
        break;

      case "update-plans":
        // Admin action for updating investment plans
        toast({
          title: "Investment Plans",
          description: "Opening plan management interface...",
        });
        break;

      default:
        toast({
          title: "Action Triggered",
          description: `${selectedAction} action executed`,
        });
    }
    handleCloseDialog();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#121214] border-r border-white/10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-8">
            Financial Dashboard
          </h2>
          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: Wallet, label: "Wallet" },
              { icon: History, label: "History" },
              { icon: UserCircle, label: "Profile" },
              { icon: HelpCircle, label: "Support" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => handleAction(item.label.toLowerCase())}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        {/* Header */}
        <header className="bg-[#121214] border-b border-white/10 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {mockUser.name}
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

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(mockUser.isAdmin ? [
              { label: "Total Balance", value: "$2.5M", icon: Wallet, up: true },
              { label: "Total Users", value: "50K+", icon: Users, up: true },
              { label: "Monthly Growth", value: "+15%", icon: ArrowUpRight, up: true },
              { label: "Pending Withdrawals", value: "25", icon: ArrowDownRight, up: false },
            ] : [
              { label: "Account Balance", value: `$${mockUser.balance.toLocaleString()}`, icon: Wallet, up: true },
              { label: "Total Earnings", value: `$${mockUser.earnings.toLocaleString()}`, icon: ArrowUpRight, up: true },
              { label: "Total Deposits", value: `$${mockUser.deposits.toLocaleString()}`, icon: ArrowUpRight, up: true },
              { label: "Total Withdrawals", value: `$${mockUser.withdrawals.toLocaleString()}`, icon: ArrowDownRight, up: false },
            ]).map((stat, index) => (
              <Card
                key={stat.label}
                className={`p-6 bg-[#121214] border-white/10 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    stat.up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Transactions */}
          <Card className="p-6 bg-[#121214] border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
              <Button
                variant="outline"
                onClick={() => handleAction("view all")}
                className="text-sm"
              >
                View All
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-white/10">
                    <TableCell className="text-white">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </TableCell>
                    <TableCell className="text-white">
                      ${tx.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      {new Date(tx.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(mockUser.isAdmin ? [
              { label: "Manage Users", action: "manage-users" },
              { label: "Approve Withdrawals", action: "approve-withdrawals" },
              { label: "Update Plans", action: "update-plans" },
            ] : [
              { label: "Deposit Funds", action: "deposit" },
              { label: "Withdraw", action: "withdraw" },
              { label: "Investment Plans", action: "plans" },
            ]).map((action) => (
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

      {/* Action Dialogs */}
      <Dialog open={!!selectedAction} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="bg-[#121214] text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedAction?.charAt(0).toUpperCase() + selectedAction?.slice(1)}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedAction === "plans" 
                ? "Choose an investment plan and enter the amount" 
                : selectedAction === "deposit" || selectedAction === "withdraw" 
                  ? "Enter the amount" 
                  : "Complete the action below"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {(selectedAction === "deposit" || selectedAction === "withdraw" || selectedAction === "plans") && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium text-gray-200">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-[#1A1A1C] border-white/10"
                />
              </div>
            )}

            {selectedAction === "plans" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Select Plan
                </label>
                <div className="grid gap-2">
                  {mockInvestmentPlans.map((plan) => (
                    <Button
                      key={plan.id}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <span>{plan.name}</span>
                      <span className="ml-auto">Min: ${plan.minAmount}</span>
                      <span className="ml-2">ROI: {plan.roi}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Dashboard;

