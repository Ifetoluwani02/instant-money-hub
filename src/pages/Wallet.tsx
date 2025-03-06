
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ActionDialog from "@/components/dashboard/ActionDialog";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle } from "lucide-react";

const Wallet = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [contactSupportFirst, setContactSupportFirst] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, transactions, updateUserBalance } = useAuth();

  if (!user || !profile) {
    navigate("/auth");
    return null;
  }

  const handleAction = (action: string) => {
    setContactSupportFirst(true);
    setSelectedAction(action);
  };

  const handleCloseDialog = () => {
    setSelectedAction(null);
    setAmount("");
    setSelectedPlan(null);
    setContactSupportFirst(false);
  };

  const handleContactSupport = () => {
    navigate("/support", { 
      state: { 
        subject: selectedAction === "deposit" ? "Deposit Request" : "Withdrawal Request",
        message: `I would like to request a ${selectedAction} of $${amount || "[amount]"}.`
      } 
    });
    handleCloseDialog();
  };

  const handleConfirmAction = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (selectedAction === "withdraw" && numAmount > profile.balance) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }

    updateUserBalance(numAmount, selectedAction as 'deposit' | 'withdraw');
    
    toast({
      title: selectedAction === "deposit" ? "Deposit Request Submitted" : "Withdrawal Request Submitted",
      description: `Your ${selectedAction} request for $${numAmount} is pending approval.`,
    });
    
    handleCloseDialog();
  };

  // Filter to only show completed transactions for display
  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const pendingTransactions = transactions.filter(t => t.status === 'pending');

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-6 bg-[#121214] border-white/10">
          <h2 className="text-lg font-semibold text-white mb-2">Balance</h2>
          <p className="text-2xl font-bold text-white">${profile.balance.toLocaleString()}</p>
        </Card>
        <Card className="p-6 bg-[#121214] border-white/10">
          <h2 className="text-lg font-semibold text-white mb-2">Total Earnings</h2>
          <p className="text-2xl font-bold text-white">${profile.total_earnings.toLocaleString()}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button
          className="bg-[#121214] border border-white/10 hover:bg-white/5"
          onClick={() => handleAction("deposit")}
        >
          Deposit Funds
        </Button>
        <Button
          className="bg-[#121214] border border-white/10 hover:bg-white/5"
          onClick={() => handleAction("withdraw")}
        >
          Withdraw
        </Button>
      </div>

      {pendingTransactions.length > 0 && (
        <Card className="p-6 bg-[#121214] border-white/10 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pending Transactions</h2>
          <div className="space-y-2">
            {pendingTransactions.map((tx) => (
              <div key={tx.id} className="p-3 border border-white/10 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-white capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">${tx.amount.toLocaleString()}</p>
                  <p className="text-sm text-yellow-500">Pending</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <ActionDialog
        isOpen={!!selectedAction && contactSupportFirst}
        action={selectedAction}
        amount={amount}
        selectedPlan={selectedPlan}
        onClose={handleCloseDialog}
        onConfirm={handleContactSupport}
        onAmountChange={setAmount}
        onPlanSelect={setSelectedPlan}
        confirmText="Contact Support"
        description={`Before submitting your ${selectedAction} request, please contact support with your details. This is required for verification purposes.`}
        showContactSupport={true}
      />

      <ActionDialog
        isOpen={!!selectedAction && !contactSupportFirst}
        action={selectedAction}
        amount={amount}
        selectedPlan={selectedPlan}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        onAmountChange={setAmount}
        onPlanSelect={setSelectedPlan}
      />
    </div>
  );
};

export default Wallet;
