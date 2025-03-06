
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const History = () => {
  const { user, profile, transactions, allTransactions, approveTransaction } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const isAdmin = profile?.is_admin || false;
  const displayTransactions = isAdmin ? allTransactions : transactions;

  const filteredTransactions = displayTransactions.filter(tx => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // For admins, search by user name or type
    if (isAdmin) {
      return (
        tx.user_name?.toLowerCase().includes(lowerSearchTerm) ||
        tx.type.toLowerCase().includes(lowerSearchTerm) ||
        tx.status.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // For normal users, search by type or status
    return (
      tx.type.toLowerCase().includes(lowerSearchTerm) ||
      tx.status.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const handleApproveTransaction = (txId: string) => {
    approveTransaction(txId);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isAdmin ? "All User Transactions" : "Transaction History"}
      </h1>
      
      <Card className="p-4 lg:p-6 bg-[#121214] border-white/10">
        <div className="mb-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A1A1C] border-white/10"
          />
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                {isAdmin && (
                  <TableHead className="text-gray-400">User</TableHead>
                )}
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                {isAdmin && (
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={isAdmin ? 6 : 4} 
                    className="text-center text-gray-400 py-8"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-white/10">
                    {isAdmin && (
                      <TableCell className="text-white">{tx.user_name}</TableCell>
                    )}
                    <TableCell className="text-white capitalize">{tx.type}</TableCell>
                    <TableCell className="text-white">${tx.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'completed' 
                            ? 'bg-green-500/10 text-green-500' 
                            : tx.status === 'pending' 
                              ? 'bg-yellow-500/10 text-yellow-500' 
                              : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        {tx.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveTransaction(tx.id)}
                            className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default History;
