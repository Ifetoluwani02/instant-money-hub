
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ActionDialog from "@/components/dashboard/ActionDialog";

const mockUser = {
  balance: 250000,
  earnings: 15000,
  deposits: 100000,
  withdrawals: 5000,
};

const Wallet = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const { toast } = useToast();

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

    if (selectedAction === "withdraw" && Number(amount) > mockUser.balance) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: selectedAction === "deposit" ? "Deposit Successful" : "Withdrawal Request Submitted",
      description: selectedAction === "deposit" 
        ? `$${amount} has been added to your account`
        : `Your withdrawal request for $${amount} is being processed`,
    });
    
    handleCloseDialog();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-6 bg-[#121214] border-white/10">
          <h2 className="text-lg font-semibold text-white mb-2">Balance</h2>
          <p className="text-2xl font-bold text-white">${mockUser.balance.toLocaleString()}</p>
        </Card>
        <Card className="p-6 bg-[#121214] border-white/10">
          <h2 className="text-lg font-semibold text-white mb-2">Total Earnings</h2>
          <p className="text-2xl font-bold text-white">${mockUser.earnings.toLocaleString()}</p>
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
