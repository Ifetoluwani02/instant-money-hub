
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  kyc_status: string;
  is_admin: boolean;
  balance: number;
  total_earnings: number;
  total_deposits: number;
  total_withdrawals: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  transactions: Transaction[];
  loading: boolean;
  logout: () => Promise<void>;
  updateUserBalance: (amount: number, type: 'deposit' | 'withdraw') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        fetchTransactions(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
        await fetchTransactions(session.user.id);
      } else {
        setProfile(null);
        setTransactions([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  const fetchTransactions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data);
    } catch (error: any) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/auth');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserBalance = async (amount: number, type: 'deposit' | 'withdraw') => {
    if (!user || !profile) return;

    const newBalance = type === 'deposit' 
      ? profile.balance + amount 
      : profile.balance - amount;

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          balance: newBalance,
          total_deposits: type === 'deposit' ? profile.total_deposits + amount : profile.total_deposits,
          total_withdrawals: type === 'withdraw' ? profile.total_withdrawals + amount : profile.total_withdrawals,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount,
          status: type === 'deposit' ? 'completed' : 'pending',
        });

      if (transactionError) throw transactionError;

      // Refresh profile and transactions
      await fetchUserProfile(user.id);
      await fetchTransactions(user.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      transactions, 
      loading, 
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
