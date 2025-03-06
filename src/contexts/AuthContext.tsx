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
    let isMounted = true;
    // Get initial session
    const initAuth = async () => {
      try {
        console.log("Initializing auth...");
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (isMounted) {
          console.log("Session found:", !!session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchUserProfile(session.user.id);
            await fetchTransactions(session.user.id);
          } else {
            console.log("No session found");
            setProfile(null);
            setTransactions([]);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        if (isMounted) {
          console.log("Auth initialization completed");
          setLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (isMounted) {
        setLoading(true);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
          await fetchTransactions(session.user.id);
        } else {
          setProfile(null);
          setTransactions([]);
        }
        
        setLoading(false);
        
        // Handle navigation
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard', { replace: true });
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth', { replace: true });
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for ID:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        throw error;
      }
      
      console.log("Fetched profile:", data);
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
      toast({
        title: "Error",
        description: "Failed to fetch user profile",
        variant: "destructive",
      });
      return null;
    }
  };

  const fetchTransactions = async (userId: string) => {
    try {
      console.log("Fetching transactions for user ID:", userId);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error.message);
        throw error;
      }
      
      console.log("Fetched transactions:", data?.length || 0);
      setTransactions(data || []);
      return data || [];
    } catch (error: any) {
      console.error('Error fetching transactions:', error.message);
      return [];
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Reset local state
      setUser(null);
      setProfile(null);
      setTransactions([]);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

      toast({
        title: type === 'deposit' ? "Deposit Successful" : "Withdrawal Submitted",
        description: type === 'deposit' 
          ? `$${amount} has been added to your account` 
          : `Your withdrawal request for $${amount} is being processed`,
      });
    } catch (error: any) {
      console.error(`Error updating balance:`, error);
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
