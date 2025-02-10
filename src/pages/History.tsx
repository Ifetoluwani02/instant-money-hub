
import { Card } from "@/components/ui/card";
import TransactionList from "@/components/dashboard/TransactionList";

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

const History = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Transaction History</h1>
      
      <Card className="p-4 lg:p-6 bg-[#121214] border-white/10">
        <TransactionList
          transactions={mockTransactions}
          onViewAll={() => {}}
          showViewAll={false}
        />
      </Card>
    </div>
  );
};

export default History;
