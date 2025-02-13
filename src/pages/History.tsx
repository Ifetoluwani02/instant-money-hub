
import { useState } from "react";
import { Card } from "@/components/ui/card";
import TransactionList from "@/components/dashboard/TransactionList";
import { useAuth } from "@/contexts/AuthContext";

const History = () => {
  const [transactions] = useState([]);
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Transaction History</h1>
      
      <Card className="p-4 lg:p-6 bg-[#121214] border-white/10">
        <TransactionList
          transactions={transactions}
          onViewAll={() => {}}
          showViewAll={false}
        />
      </Card>
    </div>
  );
};

export default History;
