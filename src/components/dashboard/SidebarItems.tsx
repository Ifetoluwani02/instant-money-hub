
import { ReactNode } from "react";
import { 
  Home, 
  Wallet, 
  History, 
  Users, 
  Settings,
  HelpCircle 
} from "lucide-react";

export const useSidebarItems = () => {
  // Define sidebar items
  const sidebarItems = [
    { icon: <Home className="w-5 h-5 mr-3" />, label: "Dashboard" },
    { icon: <Wallet className="w-5 h-5 mr-3" />, label: "Wallet" },
    { icon: <History className="w-5 h-5 mr-3" />, label: "History" },
    { icon: <Users className="w-5 h-5 mr-3" />, label: "Users" },
    { icon: <Settings className="w-5 h-5 mr-3" />, label: "Settings" },
    { icon: <HelpCircle className="w-5 h-5 mr-3" />, label: "Support" },
  ];

  return sidebarItems;
};
