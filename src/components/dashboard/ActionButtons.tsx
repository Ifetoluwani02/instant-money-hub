
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  buttons: {
    label: string;
    action: string;
  }[];
  onActionClick: (action: string) => void;
}

const ActionButtons = ({ buttons, onActionClick }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-8">
      {buttons.map((action) => (
        <Button
          key={action.label}
          className="bg-[#121214] border border-white/10 hover:bg-white/5"
          onClick={() => onActionClick(action.action)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
