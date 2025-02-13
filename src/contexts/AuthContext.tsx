
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  balance: number;
  totalEarnings: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
}

interface AuthContextType {
  user: User | null;
  transactions: Transaction[];
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateUserBalance: (amount: number, type: 'deposit' | 'withdraw') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This would normally be in a database
const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
    balance: 1000000,
    totalEarnings: 250000,
    totalDeposits: 750000,
    totalWithdrawals: 50000,
  },
  {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    isAdmin: false,
    balance: 10000,
    totalEarnings: 2500,
    totalDeposits: 7500,
    totalWithdrawals: 500,
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would hash the password and compare it properly
    if ((email === "admin@example.com" && password === "admin123") ||
        (email === "user@example.com" && password === "user123")) {
      setUser(foundUser);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const signup = (name: string, email: string, password: string) => {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast({
        title: "Signup Failed",
        description: "Email already exists",
        variant: "destructive",
      });
      return;
    }

    // Create new user
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      isAdmin: false,
      balance: 0,
      totalEarnings: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
    };

    users.push(newUser);
    setUser(newUser);
    toast({
      title: "Account Created",
      description: "Welcome to our platform!",
    });
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    toast({
      title: "Logged Out",
      description: "See you soon!",
    });
  };

  const updateUserBalance = (amount: number, type: 'deposit' | 'withdraw') => {
    if (!user) return;

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount,
      status: type === 'withdraw' ? 'pending' : 'completed',
      date: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);

    if (type === 'deposit') {
      setUser(prev => prev ? {
        ...prev,
        balance: prev.balance + amount,
        totalDeposits: prev.totalDeposits + amount,
      } : null);
    } else if (type === 'withdraw' && user.balance >= amount) {
      setUser(prev => prev ? {
        ...prev,
        balance: prev.balance - amount,
        totalWithdrawals: prev.totalWithdrawals + amount,
      } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      transactions, 
      login, 
      signup, 
      logout, 
      updateUserBalance 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
