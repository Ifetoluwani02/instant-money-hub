
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  items: {
    icon: ReactNode;
    label: string;
  }[];
  onItemClick: (label: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
}

const Sidebar = ({ items, onItemClick, isMobile = false, isOpen = true }: SidebarProps) => {
  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-[#121214] border-r border-white/10 z-40 transition-transform duration-300 ease-in-out ${
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
    }`}>
      <div className="p-6 pt-20 lg:pt-6">
        <h2 className="text-xl font-bold text-white mb-8 hidden lg:block">
          Financial Dashboard
        </h2>
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.label}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => onItemClick(item.label.toLowerCase())}
            >
              {item.icon}
              {item.label}
              <ChevronRight className="w-4 h-4 ml-auto" />
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
