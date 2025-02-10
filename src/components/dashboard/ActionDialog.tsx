
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Plan {
  id: number;
  name: string;
  minAmount: number;
  roi: string;
}

interface ActionDialogProps {
  isOpen: boolean;
  action: string | null;
  amount: string;
  selectedPlan: number | null;
  plans?: Plan[];
  onClose: () => void;
  onConfirm: () => void;
  onAmountChange: (value: string) => void;
  onPlanSelect?: (planId: number) => void;
}

const ActionDialog = ({
  isOpen,
  action,
  amount,
  selectedPlan,
  plans,
  onClose,
  onConfirm,
  onAmountChange,
  onPlanSelect,
}: ActionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#121214] text-white border-white/10 w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {action?.charAt(0).toUpperCase() + action?.slice(1)}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {action === "plans" 
              ? "Choose an investment plan and enter the amount" 
              : action === "deposit" || action === "withdraw" 
                ? "Enter the amount" 
                : "Complete the action below"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {(action === "deposit" || action === "withdraw" || action === "plans") && (
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-gray-200">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="bg-[#1A1A1C] border-white/10"
              />
            </div>
          )}

          {action === "plans" && plans && onPlanSelect && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Select Plan
              </label>
              <div className="grid gap-2">
                {plans.map((plan) => (
                  <Button
                    key={plan.id}
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => onPlanSelect(plan.id)}
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
