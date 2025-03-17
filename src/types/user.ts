
// Define shared user types to avoid circular dependencies
export interface UserProfile {
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

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  user_id: string;
  user_name?: string;
}
