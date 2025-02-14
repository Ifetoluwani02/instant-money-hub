
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ActionDialog from "@/components/dashboard/ActionDialog";
import { useAuth } from "@/contexts/AuthContext";

const Wallet = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, updateUserBalance } = useAuth();

  if (!user || !profile) {
    navigate("/auth");
    return null;
  }

  const handleAction = (action: string) => {
    setSelectedAction(action);
  };

  const handleCloseDialog = () => {
    setSelectedAction(null);
    setAmount("");
    setSelectedPlan(null);
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
      title: selectedAction === "deposit" ? "Deposit Successful" : "Withdrawal Request Submitted",
      description: selectedAction === "deposit" 
        ? `$${numAmount} has been added to your account`
        : `Your withdrawal request for $${numAmount} is being processed`,
    });
    
    handleCloseDialog();
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <ActionDialog
        isOpen={!!selectedAction}
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
