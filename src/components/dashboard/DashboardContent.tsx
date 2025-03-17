
import { UserProfile } from "@/integrations/supabase/types";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ActionButtons from "@/components/dashboard/ActionButtons";

interface DashboardContentProps {
  profile: UserProfile | null;
  onActionClick: (action: string) => void;
}

const DashboardContent = ({ profile, onActionClick }: DashboardContentProps) => {
  // Define action buttons
  const actionButtons = [
    { label: "Make a Deposit", action: "deposit" },
    { label: "Withdraw Funds", action: "withdraw" },
    { label: "Transfer Money", action: "transfer" },
  ];

  return (
    <main className="p-4 md:p-8">
      <DashboardStats profile={profile} />
      
      <ActionButtons 
        buttons={actionButtons}
        onActionClick={onActionClick}
      />
    </main>
  );
};

export default DashboardContent;
