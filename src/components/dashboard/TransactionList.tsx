
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onViewAll: () => void;
  showViewAll?: boolean;
}

const TransactionList = ({ transactions, onViewAll, showViewAll = true }: TransactionListProps) => {
  return (
    <div className="min-w-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-xl font-bold text-white">Recent Transactions</h2>
        {showViewAll && (
          <Button
            variant="outline"
            onClick={onViewAll}
            className="text-sm"
          >
            View All
          </Button>
        )}
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
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
