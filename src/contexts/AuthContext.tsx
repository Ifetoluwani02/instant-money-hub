import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { UserProfile, Transaction } from "@/types/user";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  transactions: Transaction[];
  allTransactions: Transaction[];
  loading: boolean;
  logout: () => Promise<void>;
  updateUserBalance: (amount: number, type: 'deposit' | 'withdraw') => Promise<void>;
  approveTransaction: (transactionId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
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
            
            const profileData = await fetchUserProfile(session.user.id);
            if (profileData?.is_admin) {
              await fetchAllTransactions();
            }
            
            if (location.pathname === '/auth') {
              console.log("User is authenticated and on auth page, redirecting to dashboard");
              navigate('/dashboard', { replace: true });
            }
          } else {
            console.log("No session found");
            setProfile(null);
            setTransactions([]);
            setAllTransactions([]);
            
            if (location.pathname.match(/^\/dashboard|^\/wallet|^\/history|^\/profile|^\/support|^\/users/)) {
              console.log("Unauthenticated user on protected route, redirecting to auth");
              navigate('/auth', { replace: true });
            }
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (isMounted) {
        setLoading(true);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profileData = await fetchUserProfile(session.user.id);
          await fetchTransactions(session.user.id);
          
          if (profileData?.is_admin) {
            await fetchAllTransactions();
          }
        } else {
          setProfile(null);
          setTransactions([]);
          setAllTransactions([]);
        }
        
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session) {
          console.log("User signed in, redirecting to dashboard");
          navigate('/dashboard', { replace: true });
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out, redirecting to auth");
          navigate('/auth', { replace: true });
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

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

  const fetchAllTransactions = async () => {
    try {
      console.log("Fetching all transactions for admin");
      
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (transactionsError) {
        console.error('Error fetching all transactions:', transactionsError.message);
        throw transactionsError;
      }

      const userIds = new Set(transactionsData.map(tx => tx.user_id));
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', Array.from(userIds));
        
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError.message);
        throw profilesError;
      }
      
      const userNameMap = new Map();
      profilesData.forEach(profile => {
        userNameMap.set(profile.id, profile.full_name || 'Unknown User');
      });
      
      const formattedTransactions = transactionsData.map(tx => ({
        ...tx,
        user_name: userNameMap.get(tx.user_id) || 'Unknown User'
      }));
      
      console.log("Fetched all transactions:", formattedTransactions.length || 0);
      setAllTransactions(formattedTransactions);
      return formattedTransactions;
    } catch (error: any) {
      console.error('Error fetching all transactions:', error.message);
      return [];
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setTransactions([]);
      setAllTransactions([]);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/auth', { replace: true });
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

    try {
      const { error: transactionError, data: transactionData } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount,
          status: 'pending',
        })
        .select();

      if (transactionError) throw transactionError;

      await fetchTransactions(user.id);
      
      if (profile.is_admin) {
        await fetchAllTransactions();
      }

      toast({
        title: type === 'deposit' ? "Deposit Request Submitted" : "Withdrawal Request Submitted",
        description: `Your ${type} request for $${amount} has been submitted and is pending approval.`,
      });
    } catch (error: any) {
      console.error(`Error creating ${type} request:`, error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const approveTransaction = async (transactionId: string) => {
    if (!user || !profile || !profile.is_admin) {
      toast({
        title: "Error",
        description: "Only administrators can approve transactions",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: transactionData, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

      if (fetchError) throw fetchError;

      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', transactionData.user_id)
        .single();

      if (userError) throw userError;

      const newBalance = transactionData.type === 'deposit' 
        ? userData.balance + transactionData.amount 
        : userData.balance - transactionData.amount;

      if (transactionData.type === 'withdraw' && newBalance < 0) {
        toast({
          title: "Error",
          description: "User has insufficient balance for this withdrawal",
          variant: "destructive",
        });
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          balance: newBalance,
          total_deposits: transactionData.type === 'deposit' 
            ? userData.total_deposits + transactionData.amount 
            : userData.total_deposits,
          total_withdrawals: transactionData.type === 'withdraw' 
            ? userData.total_withdrawals + transactionData.amount 
            : userData.total_withdrawals,
        })
        .eq('id', transactionData.user_id);

      if (profileError) throw profileError;

      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          status: 'completed',
        })
        .eq('id', transactionId);

      if (updateError) throw updateError;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: transactionData.user_id,
          title: transactionData.type === 'deposit' ? 'Deposit Approved' : 'Withdrawal Approved',
          message: `Your ${transactionData.type} request for $${transactionData.amount} has been approved.`,
          type: transactionData.type,
        });

      if (notificationError) {
        console.error('Error creating notification:', notificationError);
      }

      await fetchAllTransactions();

      toast({
        title: "Transaction Approved",
        description: `The ${transactionData.type} for $${transactionData.amount} has been approved.`,
      });
    } catch (error: any) {
      console.error('Error approving transaction:', error);
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
      allTransactions,
      loading, 
      logout,
      updateUserBalance,
      approveTransaction
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
